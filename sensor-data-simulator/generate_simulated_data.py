from datetime import datetime
from datetime import timedelta
from numpy import random # python -m pip install numpy
import json

# Define time span and interval for simulated measurements 
dt = timedelta(seconds=3600)
startTime = datetime.now()
endTime = startTime + timedelta(days=1)

# Define how temperature vs. time data will be generated
# FIXME: This is purely random right now -- doesn't use time or location
def getTemperature(time, location):
	mean = 2200
	stdev = 50
	return random.normal(mean, stdev, 1)[0]

# Define devices / locations
devices = []
numberOfRows = 3
numberOfColumns = 3
for i in range(numberOfRows):
	for j in range(numberOfColumns):
		devices.append({'id': i*numberOfColumns+j,
						'location': {'x': i, 'y': j}})
print("Device location information: " +
	json.dumps({'deviceInfo': devices}, indent=4, separators=(',', ': ')))

# Generate sample data 
dataForEachDevice = []
for device in devices:
	data = []
	currentTime = startTime
	while currentTime < endTime:
		point = {'time': currentTime.isoformat()}
		point['t'] = getTemperature(currentTime, device['location'])
		data.append(point)
		currentTime += dt
	dataForEachDevice.append({'id': device['id'], 'data': data})

print("Simulated measurements for each device over time:\n" +
	json.dumps({'devices': dataForEachDevice}, indent=4, separators=(',', ': ')))

