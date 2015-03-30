import os

import base64
import uuid

import json

import datetime

import time

import random

from apscheduler.schedulers.background import BackgroundScheduler

# print(base64.b64encode(uuid.uuid4().bytes + uuid.uuid4().bytes))

import tornado.ioloop
import tornado.web
import tornado.options
import tornado.ioloop
import tornado.websocket
from tornado.options import define, options

settings = {'debug': True, 
            'static_path': os.path.join(os.getcwd(), 'static'),
            'cookie_secret' : base64.b64encode(uuid.uuid4().bytes + uuid.uuid4().bytes),
            }

class MainHandler(tornado.web.RequestHandler):
	def get(self):
		self.write('bam')

class HeartbeatHandler(tornado.web.RequestHandler):
	def check_origin(self, origin):
		return True

	def set_default_headers(self):
		self.set_header("Access-Control-Allow-Origin", "http://localhost:8000")

	def get(self):
		self.write({'status' : 'online'})

class RegionsHandler(tornado.web.RequestHandler):
	def set_default_headers(self):
		self.set_header("Access-Control-Allow-Origin", "http://localhost:8000")

	def get(self):
		# Here we need to pull the regions information from the database.

		self.write([{'region_id' : 'region_1', 'region_name' : 'Region 1', 'status' : 'Good', 'sensor_count' : 24, 'location' : 'Lino Lakes'}])


class WebSocket(tornado.websocket.WebSocketHandler):
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
			# Get Region list
			# region_list = 
			self.write_message(json.dumps(self.getRegionList()))

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

	def getRegionList(self): 
		print "getRegionList"
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

		return {'test':'test', 'message_type': 'getRegionList_Response', 'region_list' : [ region_1, region_2 ]}

	def getHeatmapBounds(self, region_id): 
		region_bounds = {}

		region_bounds['date'] = ['12/31/14', '1/1/15']
		region_bounds['time'] = {'12/31/14': ['0:15', '0:20', '0:25']}
			
			# These lists can easily be built from min/max bounds with range
		region_bounds['x'] = [1,2,3,4,5,6,7,8,9,10]
		region_bounds['y'] = [1,2,3,5,6,7,8,9,10]
		
		msg = {'message_type': 'heatmap_bounds_Response', 'heatmap_bounds' : region_bounds}

		return msg

handlers = [
    (r"/", MainHandler),
	(r"/heartbeat", HeartbeatHandler),
	(r"/ws", WebSocket),
]

if __name__ == "__main__":

	application = tornado.web.Application(handlers, **settings)
	application.listen(8888)
	tornado.ioloop.IOLoop.instance().start()
    

    # application.listen(8888)
    # tornado.ioloop.IOLoop.instance().start()