import json
from flask import Flask, after_this_request, jsonify, request
app = Flask(__name__)


#NOTE: CHANGES MADE HERE AND PUSHED TO THE GITHUB WILL NOT UPDATE THE ACTUAL BACKEND
#OF THE WEBSITE, AFTER YOU HAVE PUSHED YOUR CODE PLEASE TALK TO ME (ZEV) AND I WILL
#PUSH IT TO THE SERVER WHICH IS ACTUALLY RUNNING OUR BACKEND CODE

#basically pointless, purely for my own convenience and amusement
@app.route('/')
@app.route('/index')
def landing():
    return "hello"

#api call for searching for monsters by their stats
#check the searchMonster function in frontend/script.js to see how the front end call is being made to the backend
#check mgetter.py to see the call the backend will make to open5e
@app.route("/searchMonster/<string:info>")
def searchMonster(info):
    
    #boilerplate code don't touch this
    @after_this_request
    def add_header(response):
         response.headers.add('Access-Control-Allow-Origin', '*')
         return response
    
    #turning the passed in string into a json which then turns into a python dictionary
    #feel free to rename this variable and do with it as you need
    testDict = json.loads(info)
    print(testDict)

    #this is what gets passed back to the front end to be displayed, preferably pass us
    #a json of .monsters with the key being the monster name and the entry being the rest of the .monster file
    return jsonify({"Lol":"Lmao"})

#api call for getting a recommended list of monsters based on the stats of the entire party
@app.route("getRecommendation/<string:info>")
def getRecommendation(info):
      
    #boilerplate code don't touch this  
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    #turning the passed in string into a json which then turns into a python dictionary
    #feel free to rename this variable and do with it as you need
    testDict = json.loads(info)
    print(testDict)

    #this is what gets passed back to the front end to be displayed, preferably pass us
    #a json of .monsters with the key being the monster name and the entry being the rest of the .monster file
    return jsonify({"Lol":"Lmao"})