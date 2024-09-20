import json
import requests





url = 'https://api.open5e.com/v1/monsters/'
try:
    response = requests.get(url)
    response.raise_for_status()  
    data = response.json()
    with open('data.json', 'w') as json_file:
        json.dump(data, json_file)
    print('Data has been written to data.json')
except requests.exceptions.RequestException as e:
    print(f'An error occurred: {e}')