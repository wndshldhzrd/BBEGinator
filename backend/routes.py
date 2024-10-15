import json
from flask import Flask, after_this_request, jsonify, request

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def landing():
    return "hello"

@app.route("/searchMonster/<string:info>")
def searchMonster(info):
    
    @after_this_request
    def add_header(response):
         response.headers.add('Access-Control-Allow-Origin', '*')
         return response
    
    testDict = json.loads(info)
    print(testDict)

    return jsonify({"Lol":"Lmao"})