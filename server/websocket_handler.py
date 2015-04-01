# This module handles (websocket) communication with the client (Android) application
# TODO: Replace stubs
# TODO: Check command list in design doc --> complete & update docs as needed

# TODO: Clean-up imports?
import os
import base64
import uuid
import json
import datetime
import time
import random

import threading

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.schedulers.tornado import TornadoScheduler
from tornado import websocket

from tornado.web import asynchronous
from tornado import gen

import schedule

import motor

import pymongo

class dataStream(object):
	# ass self history
	def __init__(self,channels, space, space_id, space_size, db, ws):
		self.channels = channels
		self.space = space
		self.space_id = space_id
		self.space_size = space_size 

		# self.db = db
		self.ws = ws

		self.scheduler = TornadoScheduler()
		self.scheduler.start()
		self.stream_job = None

		self.current = {}
		self.sensors = {}
		self.averages = {}

		self.stop = False

		self.db = pymongo.MongoClient('localhost', 27017).test

		self.channel_name_map = {
			"moisture": "m",
			"temperature": "t",
		}

			
				# self.stream_job = sched.add_job(self.some_job, 'interval', seconds=2)
	@gen.coroutine
	def startStream(self):
		for channel in self.channels:
			channel_id = self.channel_name_map[channel]
			# time = 

			if self.space == 'region':
				self.sensors[channel_id] = []
				# get region sensors by looking up all sensors in region
				self.sensor_list = []

				cursor = self.db.sensors.find({'region' : self.space_id})

				# Lookup and store all sensor id's
				for document in cursor.to_list(length=self.space_size):
					print "1"
					# Left as ObjectID object as opposed to string as there may be useful metadata
					self.sensors[channel_id].append(document['_id'])
					self.sensors[document['_id']] = {'latest': None}
					self.averages[document['_id']] = []


				# Pull data for all sensors
				for sensor_id in self.sensors[channel_id]:
					
					cursor = self.db.measurements.find({'deviceId' : str(sensor_id)}).sort([("_id", 1)])

					# db.test.find({"number": {"$gt": 1}}).sort([("number", 1), ("date", -1)])

					for document in cursor.to_list(length=10):
						print document['_id'].generation_time

						self.averages[sensor_id].append(document)

						if self.sensors[sensor_id]['latest'] == None:
							self.sensors[sensor_id]['latest'] = document['_id'].generation_time

						elif self.sensors[sensor_id]['latest'] < document['_id'].generation_time:
							self.sensors[sensor_id]['latest'] = document['_id'].generation_time							

					#db.collection.find( { field: { $gt: value1, $lt: value2 } } );
				
				# we now have lists for the last 10 values of each sensor
				for x in range(0,10):
					sum = 0;
					for sensor in self.averages:
						if x < len(self.averages[sensor]):
							sum += self.averages[sensor][x][channel_id]

					if(sum > 0):
						avg = sum/self.space_size

						print avg

						# str(document['_id'].generation_time.strftime("%H:%M:%S"))
						data = {'time' : "", 'data' : avg}
						msg = {'message_type': 'stream_data', 'stream' : 'moisture', 'stream_data' : data}
						self.ws.write_message(json.dumps(msg))

				# Bootstrapping done, schedule and run job

				# print self.averages
				# print self.sensors

				# self.stream_job = threading.Thread(target = self.runStream, args = (self.channels, self.space, self.sensors, self.db, self.ws))
				# self.stream_job.daemon = True
				# self.stream_job.start()
    # 			self.stream_job.join()
    			# print "thread finished...exiting"


		self.scheduler.add_job((lambda: self.runStream(db=self.db,
			channels=self.channels,
			channel_name_map=self.channel_name_map,
			sensors=self.sensors,
			space=self.space)), 'interval', seconds=2)

		# schedule.every(0.5).minutes.do(self.runStream)
		# schedule.run_pending()

	def bam(self,b,e):
		print 'rawer'


	@gen.coroutine
	def runStream(self, db, channels, channel_name_map, sensors, space):	
	
		print 
		print 
		print 
		print 
		print 


		
		for channel in channels:
			channel_id = channel_name_map[channel]
				# time = 
			if space == 'region':
					# Pull data for all sensors
				print "1"
				sum = 0
				count = 0
			
				for sensor_id in sensors:
					print "2"
						
					cursor = db.measurements.find({'deviceId' : str(sensor_id)}).sort([("_id", -1)])
					# .limit(10).to_list(length=10, callback=rawr)
					# .limit(1).to_list(length=1, callback=self.bam)
			
					# .limit(10)
            # .to_list(length=10, self._got_messages))

					for document in (yield cursor.to_list(length=1)):
						# print "3"
						# if self.sensors[sensor_id]['latest'] < document['_id'].generation_time:
					# 		# self.sensors[sensor_id]['latest'] = document['_id'].generation_time
					# 	print document
					# 	print
						
						sum += document[channel_id]
						# print sum
				
				# print
				print sum
				# print

				# print "4"
				# if(sum > 0):
				# 	avg = sum/self.space_size

				# 	print
				# 	print avg
				# 	print 
				# 		# str(document['_id'].generation_time.strftime("%H:%M:%S"))
				# 	data = {'time' : "", 'data' : avg}
				# 	msg = {'message_type': 'stream_data', 'stream' : 'moisture', 'stream_data' : data}
				# 	self.ws.write_message(json.dumps(msg))



					


		



class WebsocketHandler(websocket.WebSocketHandler):

	# @gen.coroutine
	def some_job(self):
		db = self.settings['db']

		# n = db.measurements.find().sort({'$natural': -1})

		# print n

		print time.strftime("%H:%M:%S")
		data = {'time' : str(time.strftime("%H:%M:%S")), 'data' : random.randint(100,200)}
		msg = {'message_type': 'stream_data', 'stream' : 'moisture', 'stream_data' : data}
		self.write_message(json.dumps(msg))

	def check_origin(self, origin):
		return True
    
	def open(self):
		print "WebSocket opened"

	@gen.coroutine
	def on_message(self, message):

		data = json.loads(message)

		if(data['message_type'] == 'getRegionList'):
			self.getRegionList()

		elif(data['message_type'] == 'startStreamingData'):
			stream = dataStream(data['stream_channels'], data['space'], data['space_id'],data['space_size'], self.settings['db'], self)
			stream.startStream()
			



			# for document in (yield cursor.to_list(length=100)):
			# .sort({'$natural': -1})

			# db.test.find({"number": {"$gt": 1}}).sort([("number", 1), ("date", -1)])

			
			# Determine stream type
			# Need region
			# space = data['space']
			# space_id = data['space_id']
# 
			# # if(data['stream_data'] == 'moisture'):
			# 	# if space == 'region':
			# 		# do region stream
					



			# 	db = self.settings['db']
			# 	print "2"

				

			# 	cursor = db.measurements.find({'region' : space_id}).sort([("number", 1), ("date", -1)])

			# 	print "3"
			# 	for document in (yield cursor.to_list(length=2)):

			# 		data = {'time' : str(document['_id'].generation_time.strftime("%H:%M:%S")), 'data' : document['m']}
			# 		msg = {'message_type': 'stream_data', 'stream' : 'moisture', 'stream_data' : data}
			# 		self.write_message(json.dumps(msg))

			# 		print document

				# Initital
				# data = {'time' : str(time.strftime("%H:%M:%S")), 'data' : random.randint(100,200)}
				# msg = {'message_type': 'stream_data', 'stream' : 'moisture', 'stream_data' : data}
				# self.write_message(json.dumps(msg))
				
				# sched = BackgroundScheduler()
				# sched.start()

				# self.stream_job = sched.add_job(self.some_job, 'interval', seconds=2)
				# job.remove()
				# sched.add_interval_job(some_job, seconds = 10)


				# sched.shutdown()

		elif(data['message_type'] == 'stopStreamingData'):
			print "stream stop"
			self.stream_job.remove()

		elif(data['message_type'] == 'heatmap_bounds'):
			print "getHeatmapBounds"
			# Extract region id
		
			
			self.write_message(json.dumps(self.getHeatmapBounds(data['region_id'])))


			

			

		# print message

		# print json.loads(message)['test']



		# data = json.loads(message)

		# print data

		# if(data.request_type == 'regions'):
			# if(data.request == 'list'):
				# self.write_message([{'region_id' : 'region_1', 'region_name' : 'Region 1', 'status' : 'Good', 'sensor_count' : 24, 'location' : 'Lino Lakes'}])
		

		# else:
		# self.write_message(u"You said: " + message)

	def on_close(self):
		print "WebSocket closed"
		self.stream_job.remove()
	
	# @asynchronous
	@gen.coroutine
	def getRegionList(self): 
		# print "getRegionList"

		# Get reigons from database
		region_list = []
		
		db = self.settings['db']
		
		cursor = db.regions.find()

		for document in (yield cursor.to_list(length=100)):
			# Change ObjectID to string
			document['id'] = str(document['_id'])

			# Remove ObjectID object
			del document['_id']

			count = yield db.sensors.find({"region" : document['id']}).count()

			document['sensor_count'] = count

			# print document

			# Append region to region list
			region_list.append(document)
			

		# region_1 = {}

		# region_1['id'] = 1
		# region_1['type'] = 'rectangle'
		# region_1['channels'] = ['moisture']
		# region_1['name'] = ['Region 1']
		# region_1['parameters'] = { 'nw' : {'x' : 0, 'y' : 0}, 'se' : {'x' : 10, 'y' : 10} }

		# region_2 = {}

		# region_2['id'] = 2
		# region_2['type'] = 'rectangle'
		# region_2['channels'] = ['moisture']
		# region_2['name'] = ['Region 2']
		# region_2['parameters'] = { 'nw' : {'x' : 0, 'y' : 0}, 'se' : {'x' : 10, 'y' : 10} }

		# region_list.append(region_1)
		# region_list.append(region_2)

		self.write_message(json.dumps({'message_type': 'getRegionList_Response', 'region_list' : region_list}))

	def getHeatmapBounds(self, region_id): 
		region_bounds = {}

		region_bounds['date'] = ['12/31/14', '1/1/15']
		region_bounds['time'] = {'12/31/14': ['0:15', '0:20', '0:25']}
			
			# These lists can easily be built from min/max bounds with range
		region_bounds['x'] = [1,2,3,4,5,6,7,8,9,10]
		region_bounds['y'] = [1,2,3,5,6,7,8,9,10]
		
		msg = {'message_type': 'heatmap_bounds_Response', 'heatmap_bounds' : region_bounds}

		return msg
