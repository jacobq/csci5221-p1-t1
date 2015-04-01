from datetime import datetime,timedelta
from numpy.random import normal
import random
import copy
import json
import logging

from weather_model import get_models_for_datetime
from region_information import get_regions
from sensor_types import get_sensor_types

# convert dew point (deg C) to relative humidity using known temperature (deg C)
# using rough approximation described here:
# http://climate.envsci.rutgers.edu/pdf/LawrenceRHdewpointBAMS.pdf
def compute_relative_humidity_from_dew_point(temperature, dew_point):
    return 100 - 5*(float(temperature) - float(dew_point))

# use time and sensor location to generate measurement using model
def get_measurements(time, region, location):
    model = get_models_for_datetime(time)

    t_mean = model["temperature"]["mean"]
    t_stdev = model["temperature"]["stdev"]
    t = normal(t_mean, t_stdev, 1)[0]

    m_mean = compute_relative_humidity_from_dew_point(t_mean, model["dew_point"]["mean"])
    m_stdev = model["dew_point"]["stdev"] / model["dew_point"]["mean"] # convert to percentage points
    m = normal(m_mean, m_stdev, 1)[0]

    # TODO: (future enhancement) Model region + location (e.g. shady spots, hot spots, valleys, etc.)

    return {"t": t, "m": m}

def create_rectangular_sensors(sensor_placement, bounds):
    sensors = []
    x = sensor_placement["start"]["x"]
    dx = sensor_placement["spacing"]["x"]
    y = sensor_placement["start"]["y"]
    dy = sensor_placement["spacing"]["y"]
    while y > bounds["min_y"] and y < bounds["max_y"]:
        while x > bounds["min_x"] and x < bounds["max_x"]:
            sensors.append({
                "location": {
                    "x": x,
                    "y": y
                }
            })
            x += dx
        x = sensor_placement["start"]["x"]
        y += dy

    return sensors


def create_hexagonal_sensors(sensor_placement, bounds):
    sensors = []
    x = sensor_placement["start"]["x"]
    dx = sensor_placement["spacing"]["x"]
    y = sensor_placement["start"]["y"]
    dy = sensor_placement["spacing"]["y"]
    odd_row = True
    while y > bounds["min_y"] and y < bounds["max_y"]:
        while x > bounds["min_x"] and x < bounds["max_x"]:
            sensors.append({
                "location": {
                    "x": x,
                    "y": y
                }
            })
            x += dx
        x = sensor_placement["start"]["x"]
        if odd_row:
            x += dx/2
        odd_row = not odd_row
        y += dy

    return sensors


def create_random_sensors(sensor_placement, bounds):
    sensors = []
    x0 = bounds["min_x"]
    y0 = bounds["min_y"]
    range_x = bounds["max_x"] - bounds["min_x"]
    range_y = bounds["max_y"] - bounds["min_y"]
    for i in range(sensor_placement["total"]):
        sensors.append({
            "location": {
                "x": random.randint(bounds["min_x"], bounds["max_x"]),
                "y": random.randint(bounds["min_y"], bounds["max_y"])
            }
        })
    return sensors


def create_sensors(sensor_placement, bounds):
    if sensor_placement["pattern"] == "rectangular":
        return create_rectangular_sensors(sensor_placement, bounds)
    elif sensor_placement["pattern"] == "hexagonal":
        return create_hexagonal_sensors(sensor_placement, bounds)
    elif sensor_placement["pattern"] == "random":
        return create_random_sensors(sensor_placement, bounds)
    else:
        raise Exception("Unknown sensor_placement pattern: " + sensor_placement["pattern"])

def create_context():
    post_body_template = {"regions": [], "sensor_types": get_sensor_types(), "measurements": []}

    # Create sensor (locations)
    regions = get_regions()
    for region in regions:
        if region['shape']['type'] != "polygon" or len(region['shape']['vertices']) != 2:
            logging.warning("Encountered unsupported shape")
            continue
        vertices = region['shape']['vertices']
        bounds = {}
        bounds["min_x"] = min(vertices[0]["x"], vertices[1]["x"])
        bounds["max_x"] = max(vertices[0]["x"], vertices[1]["x"])
        bounds["min_y"] = min(vertices[0]["y"], vertices[1]["y"])
        bounds["max_y"] = max(vertices[0]["y"], vertices[1]["y"])

        region["sensors"] = create_sensors(region["sensor_placement"], bounds)

        # Write to
        r = {}
        r["id"] = region["id"]
        r["name"] = region["name"]
        r["shape"] = copy.deepcopy(region["shape"])
        post_body_template["regions"].append(r)

    return {"post_body_template": post_body_template, "regions": regions}

def generate_submission(context, **kwargs):
    n = 2
    dt = timedelta(seconds=120)
    if kwargs is not None:
        for key, value in kwargs.iteritems():
            if key == "n":
                n = value
            elif key == "seconds":
                dt = timedelta(seconds=value)

    regions = context["regions"]
    post_body = copy.deepcopy(context["post_body_template"])
    for region in regions:
        for sensor in region["sensors"]:
            data = []
            time = datetime.now() - (n-1)*dt
            for i in range(n):
                point = {'time': time.isoformat()}
                point.update(get_measurements(time, region, sensor['location']))
                data.append(point)
                time += dt
            post_body["measurements"].append({'sensor_type': 1, "region": region["id"], 'location': sensor["location"], 'data': data})

    #print("Result:\n" +
    #    json.dumps(post_body, indent=4, separators=(',', ': ')))

    return post_body

if __name__ == "__main__":
    context = create_context()
    print json.dumps(generate_submission(context), indent=4, separators=(',', ': '))