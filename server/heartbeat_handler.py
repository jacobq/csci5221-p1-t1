from tornado.web import RequestHandler

class HeartbeatHandler(RequestHandler):
	def check_origin(self, origin):
		return True

	def set_default_headers(self):
		# TODO: use something like --> origin = self.settings["origin"] || "http://localhost:8000"
		origin = "*"
		self.set_header("Access-Control-Allow-Origin", origin)

	def get(self):
		self.write({'status' : 'online'})