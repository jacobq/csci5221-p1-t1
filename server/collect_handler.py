# This module is responsible for receiving and storing incoming sensor/measurement data

import json
import logging
from tornado import gen
from tornado.web import RequestHandler

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
#                "name": "Probe 1",
#                "region": 1,
#                "location": {
#                    "x": 0,
#                    "y": 0
#                }
#            }, {
#                "id": 2,
#                "type": 1,
#                "name": "Probe 2",
#                "region": 1,
#                "location": {
#                    "x": 1,
#                    "y": 0
#                }
#            }
#        ]
#    },
#    "measurements": [{
#            "id": 1,
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
#            "id": 2,
#            "data": []
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
	for type in data["definitions"]["types"]:
		try:
			results = yield db.sensors.find_one({"id": type["id"]})
		except Exception, e:
			logging.warning(e.getMessage())
		if results is None:
			logging.info("Inserting record for sensor: " + json.dumps(type))
			db.sensors.insert(type)


#@gen.coroutine
#def is_message_consistent_with_db(data, db):
#	for type in data["definitions"]["types"]:
#		try:
#			match = yield db.sensors.find_one({"id": type["id"]})
#			logging.info("Match is: " + match)
#		except Exception, e:
#			logging.warn(e.getMessage())
#		if match.count() < 1:
#			logging.info("Missing sensor information")
#			return False
#		if match["name"] != type["name"]:
#			logging.info("Name mismatch")
#			return False
#
#		if len(match["channels"]) != len(type["channels"]):
#			logging.info("Different numbers of channels")
#			return False
#			
#		for channel in type["channels"]:
#			if channel["name"] :
#				logging.info("Name mismatch")
#				return False
#
#	return True

	
class CollectHandler(RequestHandler):
	def post(self):	
		db = self.settings['db']
		try: 
			data = json.loads(self.request.body)
		except ValueError:
			self.send_error(500, reason="Could not parse received data as JSON")
		if not is_message_structure_ok(data):
			self.send_error(500, reason="Invalid data received")
		add_new_sensor_information(data, db)
		#if not is_message_consistent_with_db(data, db):
		#	self.send_error(500, reason="Received data was not consistent with database")
		
		# TODO: Add locations & sensor IDs regions collection
		
		db.measurements.insert(data["measurements"])
		self.write({"status": "success", "numberOfMeasurementsSaved": len(data["measurements"])})
		