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

from apscheduler.schedulers.background import BackgroundScheduler
from tornado import websocket

from tornado.web import asynchronous
from tornado import gen

import motor

class WebsocketHandler(websocket.WebSocketHandler):

	
	def some_job(self):
		print time.strftime("%H:%M:%S")
		data = {'time' : str(time.strftime("%H:%M:%S")), 'data' : random.randint(100,200)}
		msg = {'message_type': 'stream_data', 'stream' : 'moisture', 'stream_data' : data}
		self.write_message(json.dumps(msg))

	def check_origin(self, origin):
		return True
    
	def open(self):
		print "WebSocket opened"

	def on_message(self, message):

		data = json.loads(message)

		if(data['message_type'] == 'getRegionList'):
			self.getRegionList()

		elif(data['message_type'] == 'startStreamingData'):
			print "stream start"
			# Determine stream type
			if(data['stream_data'] == 'moisture'):

				# Initital
				data = {'time' : str(time.strftime("%H:%M:%S")), 'data' : random.randint(100,200)}
				msg = {'message_type': 'stream_data', 'stream' : 'moisture', 'stream_data' : data}
				self.write_message(json.dumps(msg))
				
				sched = BackgroundScheduler()
				sched.start()

				self.stream_job = sched.add_job(self.some_job, 'interval', seconds=2)
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
	
	@asynchronous
	@gen.coroutine
	def getRegionList(self): 
		# print "getRegionList"

		# Get reigons from database
		region_list = []
		
		db = self.settings['db']
		
		cursor = db.regions.find()

		# for document in (yield cursor.to_list(length=100)):
		# 	# Change ObjectID to string
		# 	document['id'] = str(document['_id'])

		# 	# Remove ObjectID object
		# 	del document['_id']

		# 	# Append region to region list
		# 	region_list.append(document)
			

		region_1 = {}

		region_1['id'] = 1
		region_1['type'] = 'rectangle'
		region_1['channels'] = ['moisture']
		region_1['name'] = ['Region 1']
		region_1['parameters'] = { 'nw' : {'x' : 0, 'y' : 0}, 'se' : {'x' : 10, 'y' : 10} }

		region_2 = {}

		region_2['id'] = 2
		region_2['type'] = 'rectangle'
		region_2['channels'] = ['moisture']
		region_2['name'] = ['Region 2']
		region_2['parameters'] = { 'nw' : {'x' : 0, 'y' : 0}, 'se' : {'x' : 10, 'y' : 10} }

		region_list.append(region_1)
		region_list.append(region_2)

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
