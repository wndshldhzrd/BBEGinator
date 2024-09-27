from flask import Flask, after_this_request, jsonify

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello from Flask!'

@app.route('/getJSON')
def getJSON():
    @after_this_request
    def add_header(response):
         response.headers.add('Access-Control-Allow-Origin', '*')
         return response

    jsonResp = {'jack': 4098, 'sape': 4139}
    print(jsonResp)
    return jsonify(jsonResp)