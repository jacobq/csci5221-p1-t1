from tornado import gen
from tornado.web import RequestHandler

class DBStatsHandler(RequestHandler):
	@gen.coroutine
	def get(self):
		db = self.settings['db']
		regions = yield db.regions.find().count()
		sensor_types = yield db.sensor_types.find().count()
		sensors = yield db.sensors.find().count()
		measurements = yield db.measurements.find().count()
		self.write({"regions": regions, "sensor_types": sensor_types, "sensors": sensors, "measurements": measurements})