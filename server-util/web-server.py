# To install dependencies run:
#   pip install tornado
#   pip install pymongo

import os
import sys
from cStringIO import StringIO
from tornado import ioloop,web,httpserver
from pymongo import MongoClient
from update import check_for_update
 
settings = {
	"template_path": os.path.join(os.path.dirname(__file__), "templates"),
	"static_path": os.path.join(os.path.dirname(__file__), "static"),
	"certificate_path": os.path.join(os.path.dirname(__file__), os.pardir, os.pardir, "certs"),
	"port" : 443,
	"debug": True # triggers automatic reloading of this app when the source changes
}

class IndexHandler(web.RequestHandler):
	def get(self):
		self.write({"status": "success", "url": self.request.uri})

class VersionHandler(web.RequestHandler):
	def get(self):
		self.set_header('Content-Type', 'text/plain; charset="utf-8"')
		old_stdout = sys.stdout
		sys.stdout = output_capture = StringIO()
		check_for_update()
		self.write(output_capture.getvalue())
		sys.stdout = old_stdout

class MongoHandler(web.RequestHandler):
	def get(self):
		result = {"status": "success", "url": self.request.uri}
		self.write(result)

		
def create_server(application):
	# HTTPS / TLS / SSL configuration
	# Python 3.x way:
	#ssl_ctx = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
	#ssl_ctx.load_cert_chain(os.path.join(settings["certificate_path"], "csci5221.webcontrollable.com.crt"),
	#						os.path.join(settings["certificate_path"], "csci5221.webcontrollable.com.private.key"))
	#server = httpserver.HTTPServer(application, ssl_options=ssl_ctx)

	# Python 2.x way:
	server = httpserver.HTTPServer(application, ssl_options={
		"certfile": os.path.realpath(os.path.join(settings["certificate_path"], "csci5221.webcontrollable.com.crt")),
		"keyfile": os.path.realpath(os.path.join(settings["certificate_path"], "csci5221.webcontrollable.com.private.key")),
		"ca_certs": os.path.realpath(os.path.join(settings["certificate_path"], "ca_certs"))
	})
	return server
		
		
def create_application():
	return web.Application([
		(r'/', IndexHandler),
		(r'/version', VersionHandler),
		(r'/mongo', MongoHandler)
	],**settings)
		
if __name__ == "__main__":
	application = create_application()
	server = create_server(application)
	
	print "About to listen on port %s" % settings["port"]
	server.listen(settings["port"])
	ioloop.IOLoop.instance().start()