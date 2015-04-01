import csv
import datetime

# This function maps any arbitrary date to a specific "hour of the year"
# by masking out everything except month, day, and hour.
# Note that we make no accommodations for leap-year
def convert_date(date):
    return date.replace(year=2010,minute=0,second=0,microsecond=0).isoformat()

model = {}
# This data is based on NOAA 2010 hourly measurements at MSP airport (see spreadsheets for more information)
with open('weather_model_msp.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        date = convert_date(datetime.datetime.strptime(row['Date'], "%m/%d/%y %I:%M %p"))
        model[date] = {
            "temperature": {
                "mean": float(row['Avg T']),
                "stdev": float(row['StDev T'])
            },
            "dew_point": {
                "mean": float(row['Avg DP']),
                "stdev": float(row['StDev DP'])
            }
        }

def get_models_for_datetime(date):
    return model[convert_date(date)]

if __name__ == "__main__":
    n = datetime.datetime.now()
    print("Looking up weather model for today, %s: %s" % (n.isoformat(), get_models_for_datetime(n)))
