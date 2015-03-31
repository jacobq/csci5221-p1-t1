db.measurements.drop();
db.sensors.drop();
db.sensor_types.drop();
db.regions.drop();

db.regions.insert([{
	id: 1,
	name: "Corn field",
	shape: {
		"type": "polygon",
		"vertices": [{
			"x": 0,
			"y": 0
		}, {
			"x": 500,
			"y": 2000
		}]
	}
}, {
	id: 2,
	name: "Wheat field",
	shape: {
		"type": "polygon",
		"vertices": [{
			"x": 0,
			"y": 0
		}, {
			"x": 1000,
			"y": 700
		}]
	}
}, {
	id: 3,
	name: "Flower beds by house",
	shape: {
		"type": "polygon",
		"vertices": [{
			"x": 0,
			"y": 0
		}, {
			"x": 8,
			"y": 8
		}]
	}
}]);