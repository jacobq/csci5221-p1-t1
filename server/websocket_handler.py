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

import motor

import pymongo
import bson

class dataStream(object):
	# ass self history
	def __init__(self,scheduler, channels, space, space_id, space_size, db, ws):
		self.channels = channels
		self.space = space
		self.space_id = space_id
		self.space_size = space_size 

		# self.db = db
		self.ws = ws

		self.scheduler = scheduler
		self.stream_jobs = None

		self.current = {}
		self.sensors = {}
		self.averages = {}

		self.stop = False

		self.db = pymongo.MongoClient('localhost', 27017).csci5221

		self.channel_name_map = {
			"moisture": "m",
			"temperature": "t",
		}

	def startStream(self):
		print "ss 1"
		for channel in self.channels:
			channel_id = self.channel_name_map[channel]
			# time = 
			print "ss 2"
			if self.space == 'region':
				self.sensors[channel_id] = []

				# get region sensors by looking up all sensors in region
				self.sensor_list = []

				cursor = self.db.sensors.find({'region' : bson.ObjectId(self.space_id)}).limit(self.space_size)
				print "3"
				
				# Lookup and store all sensor id's
				for document in cursor:
					
					# Left as ObjectID object as opposed to string as there may be useful metadata
					self.sensors[channel_id].append(document['_id'])
					self.sensors[document['_id']] = {'latest': None}
					self.averages[document['_id']] = []


				# Pull data for all sensors
				for sensor_id in self.sensors[channel_id]:
					
					cursor = self.db.measurements.find({'sensor_id' : sensor_id}).sort([("_id", 1)]).limit(10)

					for document in cursor:
						print document['_id'].generation_time

						self.averages[sensor_id].append(document)

						if self.sensors[sensor_id]['latest'] == None:
							self.sensors[sensor_id]['latest'] = document['_id'].generation_time

						elif self.sensors[sensor_id]['latest'] < document['_id'].generation_time:
							self.sensors[sensor_id]['latest'] = document['_id'].generation_time							
	
				# we now have lists for the last 10 values of each sensor
				for x in range(0,10):
					sum = 0;
					for sensor in self.averages:
						if x < len(self.averages[sensor]):
							sum += self.averages[sensor][x][channel_id]

					if(sum > 0):
						avg = sum/self.space_size

						data = {'time' : "", 'data' : avg}
						msg = {'message_type': 'stream_data', 'stream' : 'moisture', 'stream_data' : data}
						self.ws.write_message(json.dumps(msg))

		self.stream_job = self.scheduler.add_job(self.runStream, 'interval', seconds=5)

	def runStream(self):	
		
		for channel in self.channels:
			channel_id = self.channel_name_map[channel]


			if self.space == 'region':
				
				sum = 0
			
				for sensor_id in self.sensors:
					cursor = self.db.measurements.find({'sensor_id' :sensor_id}).sort([("_id", -1)]).limit(1)

					for document in cursor:
						
						sum += document[channel_id]

				avg = sum/self.space_size

				data = {'time' : "", 'data' : avg}
				msg = {'message_type': 'stream_data', 'stream' : 'moisture', 'stream_data' : data}
				self.ws.write_message(json.dumps(msg))

	def stopStream(self):
		self.stream_job.remove()

class WebsocketHandler(websocket.WebSocketHandler):

	def check_origin(self, origin):
		return True
    
	def open(self):
		self.scheduler = TornadoScheduler()
		self.scheduler.start()

		print "WebSocket opened"

	@gen.coroutine
	def on_message(self, message):

		data = json.loads(message)

		if(data['message_type'] == 'getRegionList'):
			self.getRegionList()

		elif(data['message_type'] == 'startStreamingData'):
			self.stream = dataStream(self.scheduler, data['stream_channels'], data['space'], data['space_id'],data['space_size'], self.settings['db'], self)
			self.stream.startStream()
			
		elif(data['message_type'] == 'stopStreamingData'):
			print "stream stop"
			self.streamStream.remove()

		elif(data['message_type'] == 'heatmap_bounds'):
			print "getHeatmapBounds"
			# Extract region id

			self.write_message(json.dumps(self.getHeatmapBounds(data['region_id'])))

	def on_close(self):
		print "WebSocket closed"
		self.stream.stopStream()
	
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

			count = yield db.sensors.find({"region" : document['_id']}).count()

			# Remove ObjectID object
			del document['_id']

			

			print count

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
