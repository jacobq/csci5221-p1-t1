# This module is responsible for receiving and storing incoming sensor/measurement data
# It expects to receive input data as the body of an HTTP POST request in a form like this:
#{
#	"regions": [{
#			"id": 1,
#			"name": "Corn field",
#			"shape": {
#				"type": "polygon",
#				"vertices": [{
#					"x": 0,
#					"y": 0
#				}, {
#					"x": 500,
#					"y": 2000
#				}]
#			}
#		}, {
#			"id": 2,
#			"name": "Wheat field",
#			"shape": {
#				"type": "polygon",
#				"vertices": [{
#					"x": 0,
#					"y": 0
#				}, {
#					"x": 1000,
#					"y": 700
#				}]
#			}
#		}, {
#			"id": 3,
#			"name": "Flower beds by house",
#			"shape": {
#				"type": "polygon",
#				"vertices": [{
#					"x": 0,
#					"y": 0
#				}, {
#					"x": 8,
#					"y": 8
#				}]
#			}
#		}
#	],
#	"sensor_types": [{
#			"id": 1,
#			"name": "Temperature & moisture sensing probe",
#			"channels": [{
#					"name": "t",
#					"description": "Temperature in hundredths of degrees Celsius",
#					"type": "integer"
#				}, {
#					"name": "m",
#					"description": "Moisture content in hundredths of percentage points",
#					"type": "integer"
#				}
#			]
#		}
#	],
#	"measurements": [{
#			"sensor_type": 1,
#			"region": 1,
#			"location": {
#				"x": 0,
#				"y": 0
#			},
#			"data": [{
#					"time": "2015-02-11T18:59:29.729240",
#					"t": 2200,
#					"m": 2000
#				}, {
#					"time": "2015-02-11T19:00:03.659181",
#					"t": 2201,
#					"m": 2000
#				}
#			]
#		}, {
#			"sensor_type": 1,
#			"region": 1,
#			"location": {
#				"x": 1,
#				"y": 0
#			},
#			"data": [{
#					"time": "2015-02-11T18:59:29.729240",
#					"t": 2200,
#					"m": 2000
#				}, {
#					"time": "2015-02-11T19:00:03.659181",
#					"t": 2201,
#					"m": 2000
#				}
#			]
#		}
#	]
#}

import json
import logging
import time
from datetime import datetime
from tornado import gen
from tornado.web import RequestHandler,asynchronous
#from tornado.concurrent import Future

def is_message_structure_ok(data):
	for key in ["regions", "sensor_types", "measurements"]:
		if not data.has_key(key):
			logging.info("Missing root-level key: " + key)
			return False
	return True


@gen.coroutine	
def add_new_regions(regions, db):
	region_map = {}
	for region in regions:
		local_region_id = region["id"];
		del region["id"]
		try:
			match = yield db.regions.find_one({"name": region["name"]})
		except Exception, e:
			logging.warning(e.getMessage())
		if match is None:
			#logging.info("Adding new region: " + json.dumps(region))
			region_id = yield db.regions.insert(region)
		else:
			#logging.info("Found matching region: ", match)
			region_id = match["_id"]
		region_map[local_region_id] = region_id
	raise gen.Return(region_map) 
	
@gen.coroutine
def add_new_sensor_types(sensor_types, db):
	sensor_type_map = {}
	for sensor_type in sensor_types:
		local_sensor_type_id = sensor_type["id"]
		del sensor_type["id"]
		try:
			match = yield db.sensor_types.find_one({"name": sensor_type["name"]})
		except Exception, e:
			logging.warning(e.getMessage())
		if match is None:
			#logging.info("Inserting record for sensor type: " + json.dumps(sensor_type))
			sensor_type_id = yield db.sensor_types.insert(sensor_type)
		else:
			#logging.info("Found matching sensor_type: ", match)
			sensor_type_id = match["_id"]
		sensor_type_map[local_sensor_type_id] = sensor_type_id
	raise gen.Return(sensor_type_map) 

			
class CollectHandler(RequestHandler):
	@gen.coroutine
	def post(self):	
		db = self.settings['db']
		try: 
			post_data = json.loads(self.request.body)
		except ValueError:
			self.send_error(500, reason="Could not parse received data as JSON")
		if not is_message_structure_ok(post_data):
			self.send_error(500, reason="Invalid data received")
		region_map = yield add_new_regions(post_data["regions"], db)
		sensor_type_map = yield add_new_sensor_types(post_data["sensor_types"], db)		
		
		
		for measurement in post_data["measurements"]:
			region_id = region_map[measurement["region"]]
			sensor_type_id = sensor_type_map[measurement["sensor_type"]]
			x = measurement["location"]["x"]
			y = measurement["location"]["y"]
			sensor = yield db.sensors.find_one({"region": region_id, "location.x": x, "location.y": y})
			if sensor is None:
				sensor_id = yield db.sensors.insert({"region": region_id, "sensor_type_id": sensor_type_id, "location": {"x": x, "y": y}})
			else:
				sensor_id = sensor["_id"]
			for point in measurement["data"]:
				point["sensor_id"] = sensor_id
				#point["time"] = int(time.mktime(datetime.strptime(point["time"], "%Y-%m-%dT%H:%M:%S.%f").timetuple()))
				point["time"] = datetime.strptime(point["time"], "%Y-%m-%dT%H:%M:%S.%f").isoformat()
			db.measurements.insert(measurement["data"])
		self.write({"status": "success"})
		#self.finish()