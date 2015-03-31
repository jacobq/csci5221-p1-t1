# This module is responsible for receiving and storing incoming sensor/measurement data

import json
import datetime
import logging
from tornado import gen
from tornado.web import RequestHandler
from tornado.web import asynchronous

# Example of expected form of input data:
#{
#    "definitions": {
#        "types": [{
#            "id": 1,
#            "name": "Temperature & moisture sensing probe",
#            "channels": [{
#                "name": "t",
#                "description": "Temperature in hundredths of degrees Celcius",
#                "type": "integer"
#            }, {
#                "name": "m",
#                "description": "Moisture content in hundredths of percentage points",
#                "type": "integer"
#            }]
#        }],
#        "devices": [{
#                "id": 1,
#                "type": 1,
#                "region": 1,
#                "location": {
#                    "x": 0,
#                    "y": 0
#                }
#            }, {
#                "id": 2,
#                "type": 1,
#                "region": 1,
#                "location": {
#                    "x": 1,
#                    "y": 0
#                }
#            }
#        ]
#    },
#    "measurements": [{
#            "deviceId": 1,
#            "data": [{
#                    "time": "2015-02-11T18:59:29.729240",
#                    "t": 2200,
#                    "m": 2000
#                }, {
#                    "time": "2015-02-11T19:00:03.659181",
#                    "t": 2201,
#                    "m": 2000
#                }
#            ]
#        }, {
#            // ...
#        }
#    ]
#}


def is_message_structure_ok(data):
	if not data.has_key("definitions"):
		logging.info("Missing definitions")
		return False
		
	if not data["definitions"].has_key("types"):
		logging.info("Missing definitions.types")
		return False

	if not isinstance(data["definitions"]["types"], list):
		logging.info("definitions.types must be a sequence/array/list")
		return False

	for type in data["definitions"]["types"]:
		if not type.has_key("id"):
			logging.info("Missing definitions.type[].id")
			return False
			
	if not data.has_key("measurements"):
		logging.info("Missing measurements")
		return False
		
	return True

	
@gen.coroutine	
def add_new_sensor_information(data, db):
	# If a new type of sensor is being used then add it to the sensor_types collection
	for type in data["definitions"]["types"]:
		try:
			results = yield db.sensor_types.find_one({"id": type["id"]})
		except Exception, e:
			logging.warning(e.getMessage())
		if results is None:
			logging.info("Inserting record for sensor type: " + json.dumps(type))
			db.sensor_types.insert(type)

	# If a new sensor/device is being used then add it to the sensors collection
	for sensor in data["definitions"]["devices"]:
		try:
			results = yield db.sensors.find_one({"id": sensor["id"]})
		except Exception, e:
			logging.warning(e.getMessage())
		if results is None:
			logging.info("Inserting record for sensor: " + json.dumps(sensor))
			db.sensors.insert(sensor)

			
class CollectHandler(RequestHandler):
	@asynchronous
	def post(self):	
		db = self.settings['db']
		try: 
			data = json.loads(self.request.body)
		except ValueError:
			self.send_error(500, reason="Could not parse received data as JSON")
		if not is_message_structure_ok(data):
			self.send_error(500, reason="Invalid data received")
		add_new_sensor_information(data, db)
		
		def cb(result, error):
			self.write({"status": "success" if error is None else "error"})
			self.finish()
		
		for deviceMeasurements in data["measurements"]:
			deviceId = deviceMeasurements["deviceId"]
			for measurement in deviceMeasurements["data"]:
				measurement["deviceId"] = deviceId
				measurement["time"] = datetime.datetime.strptime(measurement["time"], "%Y-%m-%dT%H:%M:%S.%fZ")
			db.measurements.insert(deviceMeasurements["data"], callback=cb)
		