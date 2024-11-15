import json
import requests


def get_data(url, payload):
    response = requests.get(url, payload)
    return response.json()

def write_to_json(data, filename="output.json"):
    with open(filename, 'w') as f:
        json.dump(data['results'], f)
        f.write('\n')


def getMonsters(params):
    
    payload = params
    url = 'https://api.open5e.com/v1/monsters/'
    filename = "output.json"
    while True:
        try:
            data = get_data(url, payload)
            if data['next']:
                write_to_json(data, filename)
                url = data['next']
                
            else:
                write_to_json(data, filename)
                break
        except Exception as e:
            print(f"An error occurred: {e}")
            break