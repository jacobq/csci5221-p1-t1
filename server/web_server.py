# This module is the core of the application. It connects to MongoDB, creates an HTTP(S) server, and sets up Tornado

import os
import ssl
import sys
import logging
import datetime

from tornado import ioloop,web,httpserver
import motor

from heartbeat_handler import HeartbeatHandler
from collect_handler import CollectHandler
from db_stats_handler import DBStatsHandler
from websocket_handler import WebsocketHandler
from version_handler import VersionHandler
 
settings = {
	"template_path": os.path.join(os.path.dirname(__file__), "templates"),
	"static_path": os.path.join(os.path.dirname(__file__), "static"),
	"certificate_path": os.path.join(os.path.dirname(__file__), os.pardir, os.pardir, "certs"),
	"httpPort": 80,
	"httpsPort" : 443,
	"debug": True # triggers automatic reloading of this app when the source changes
}

class IndexHandler(web.RequestHandler):
	def get(self):
		self.set_header('Content-Type', 'text/plain; charset="utf-8"')
		self.write("Yes, the server is running. Current time is: " + datetime.datetime.now().isoformat())

		
def create_server(application):
	# First, try HTTPS / TLS / SSL configuration
	# In case of error (e.g. unreadable private key) then use unencrypted HTTP on the httpPort
	settings["port"] = settings["httpsPort"]
	try:
		ssl_ctx = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
		ssl_ctx.load_cert_chain(os.path.join(settings["certificate_path"], "csci5221.webcontrollable.com.crt.bundle"))
		ssl_ctx.set_ciphers("ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK");
		server = httpserver.HTTPServer(application, ssl_options=ssl_ctx)
	except ValueError:
		logging.warning("Failed to set up HTTPS server. Will try plain-old HTTP instead now.")
		settings["port"] = settings["httpPort"]
		server = httpserver.HTTPServer(application)
	return server
	
def create_application():
	return web.Application([
		(r'/', IndexHandler),
		(r'/heartbeat', HeartbeatHandler),
		(r'/collect/?', CollectHandler),
		(r'/db_stats', DBStatsHandler),		
		(r'/ws', WebsocketHandler),
		(r'/version/?', VersionHandler)
	],**settings)
		
if __name__ == "__main__":
	# Enable all levels of logging
	logging.getLogger().setLevel(logging.INFO)

	# Connect to MongoDB
	db = motor.MotorClient('localhost', 27017).csci5221
	settings.update({"db": db})
	
	application = create_application()
	server = create_server(application)
	
	logging.info("About to listen on port %s" % settings["port"])
	server.listen(settings["port"])
	ioloop.IOLoop.instance().start()
	
