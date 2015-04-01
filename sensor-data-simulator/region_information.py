# Note: the "sensor_placement" portions are used for simulation only
def get_regions():
    return [{
        "id": 1,
        "name": "Corn field",
        "shape": {
            "type": "polygon",
            "vertices": [{
                "x": 0,
                "y": 0
            }, {
                "x": 500,
                "y": 2000
            }]
        },
        "sensor_placement": {
            "pattern": "hexagonal",
            "start": {
                "x": 100,
                "y": 100
            },
            "spacing": {
                "x": 200,
                "y": 200
            }
        }
    }, {
        "id": 2,
        "name": "Wheat field",
        "shape": {
            "type": "polygon",
            "vertices": [{
                "x": 0,
                "y": 0
            }, {
                "x": 1000,
                "y": 700
            }]
        },
        "sensor_placement": {
            "pattern": "rectangular",
            "start": {
                "x": 50,
                "y": 50
            },
            "spacing": {
                "x": 100,
                "y": 100
            }
        }
    }, {
        "id": 3,
        "name": "Flower beds by house",
        "shape": {
            "type": "polygon",
            "vertices": [{
                "x": 0,
                "y": 0
            }, {
                "x": 16,
                "y": 16
            }]
        },
        "sensor_placement": {
            "pattern": "random",
            "total": 5
        }
    }]