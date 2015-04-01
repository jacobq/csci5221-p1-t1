import requests
import json
import time

import generate_simulated_data as sim


if __name__ == "__main__":
    seconds_between_submissions = 300
    context = sim.create_context()
    while True:
        post = json.dumps(sim.generate_submission(context, n=2, seconds=150), indent=4, separators=(',', ': '))
        #print post
        r = requests.post("https://csci5221.web-controllable.com/collect", data=post, verify=False)
        print(r.status_code, r.reason, time.ctime())
        time.sleep(seconds_between_submissions)

