from tornado.web import RequestHandler
from tornado.web import asynchronous
from tornado import gen

import motor

class HeartbeatHandler(RequestHandler):

	def set_default_headers(self):
		# TODO: use something like --> origin = self.settings["origin"] || "http://localhost:8000"
		origin = "*"
		self.set_header("Access-Control-Allow-Origin", origin)

	@asynchronous
	@gen.coroutine
	def get(self):
		# Use motor to get region count
		client = motor.MotorClient('mongodb://localhost:27017')
		db = client["csci5221"]
		working_collection = db["regions"]
		
		count = yield working_collection.find().count()
		
		self.write({'status' : 'online', 'region_count' : count})
