from cStringIO import StringIO
from tornado.web import RequestHandler
from update import check_for_update

class VersionHandler(RequestHandler):
	def get(self):
		self.set_header('Content-Type', 'text/plain; charset="utf-8"')
		old_stdout = sys.stdout
		sys.stdout = output_capture = StringIO()
		check_for_update()
		self.write(output_capture.getvalue())
		sys.stdout = old_stdout