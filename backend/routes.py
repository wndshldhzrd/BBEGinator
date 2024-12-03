import json
import mgetter
import export_monster
import algorithm
from flask import Flask, after_this_request, jsonify, request
app = Flask(__name__)

#NOTE: CHANGES MADE HERE AND PUSHED TO THE GITHUB WILL NOT UPDATE THE ACTUAL BACKEND
#OF THE WEBSITE, AFTER YOU HAVE PUSHED YOUR CODE PLEASE TALK TO ME (ZEV) AND I WILL
#PUSH IT TO THE SERVER WHICH IS ACTUALLY RUNNING OUR BACKEND CODE. CHECK THE README.MD
#FILE LOCATED IN THE BACKEND DIRECTORY FOR HOW TO TEST YOUR CODE LOCALLY, TALK TO ME IF
#YOU ARE HAVING ANY ISSUES TESTING IT.

#basically pointless, purely for my own convenience and amusement
@app.route('/')
@app.route('/index')
def landing():
    return "hello"
    
#api call for searching for monsters by their stats
#check the searchMonster function in frontend/js/script.js to see how the front end call is being made to the backend
#check mgetter.py to see the call the backend will make to open5e
@app.route("/searchMonster/<string:params>")
def searchMonster(params):
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', "*")
        return response

    payload = json.loads(params)
    mgetter.getMonsters("no", payload)
    output = open("output.json").read()
    #print(output)
    print("mgetter done")

    return jsonify(output)

#takes a json file and returns a .monster output for it
@app.route("/exportMonster", methods = ['POST', 'OPTIONS'])
def exportMonster():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', "*")
        response.headers.add('Access-Control-Allow-Methods', "POST, OPTIONS") #allow our request method (POST) and preflight (OPTIONS)
        response.headers.add('Access-Control-Allow-Headers', "Content-Type")  #allow our request header (Content-Type)
        return response

    #DO NOT TOUCH THIS--handles preflight request
    if request.method == 'OPTIONS':
        #jsonify adds in status=ok and whatnot, so we 
        #use jsonify({}) as our return value for convenience
        return jsonify({})

    fileContents = request.get_json()
    output = export_monster.export(fileContents)
    print("export done")
    return jsonify(output)

#api call for getting a recommended list of monsters based on the stats of the entire party
#check the getRecommendedMonsters function in frontend/js/script.js to see how the front end call is being made to the backend
@app.route("/getRecommendation", methods = ['POST', 'OPTIONS'])
def getRecommendation():
      
    #boilerplate code don't touch this  
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', "*")
        response.headers.add('Access-Control-Allow-Methods', "POST, OPTIONS") #allow our request method (POST) and preflight (OPTIONS)
        response.headers.add('Access-Control-Allow-Headers', "Content-Type")  #allow our request header (Content-Type)
        return response

    #DO NOT TOUCH THIS--handles preflight request
    if request.method == 'OPTIONS':
        #jsonify adds in status=ok and whatnot, so we 
        #use jsonify({}) as our return value for convenience
        return jsonify({})

    params = request.get_json()
    partyData = params["party"]
    difficulty = params["diff"]
    monCount = params["count"]
    isBoss = params["isBoss"]

    mgetter.getMonsters()
    monsters = jsonify(open("output.json").read())

    print("Difficulty", difficulty)

    recList = algorithm.Algorithm(partyData, difficulty, monsters, "no lair", monCount, isBoss)

    #this is what gets passed back to the front end to be displayed, preferably pass us
    #a json of .monsters with the key being the monster name and the entry being the rest of the .monster file
    return jsonify(recList)