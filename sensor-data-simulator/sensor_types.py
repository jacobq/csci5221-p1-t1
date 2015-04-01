def get_sensor_types():
    return [{
		"id": 1,
		"name": "Temperature & moisture sensing probe",
		"channels": [{
			"name": "t",
			"description": "Temperature in hundredths of degrees Celsius",
			"type": "integer"
		}, {
			"name": "m",
			"description": "Moisture content in hundredths of percentage points",
			"type": "integer"
		}]
	}]