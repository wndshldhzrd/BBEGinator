from flask import after_this_request, jsonify
from app import app

@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

@app.route('/getJSON')
def getJSON(): 
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    jsonResp = {'jack': 4098, 'sape': 4139}
    print(jsonResp)
    return jsonify(jsonResp)