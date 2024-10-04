from flask import Flask, after_this_request, jsonify, request

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def landing():
    return "hello"

@app.route('/getMonster/<int:sizeNumber>')
def getMonster(sizeNumber):

    #boilerplate code, dont touch this
    @after_this_request
    def add_header(response):
         response.headers.add('Access-Control-Allow-Origin', '*')
         return response
    
    #converting the passed in size to a string
    sizes = ["tiny", "small", "medium", "large", "huge", "gargantuan"]
    if sizeNumber < 0 or sizeNumber >= len(sizes):
        return jsonify({})

    jsonResp = {'size': sizes[sizeNumber]}
    print(jsonResp)
    return jsonify(jsonResp)

@app.route("/testRoute", methods=['POST', 'GET'])
def testRoute():

    #boilerplate code, dont touch this
    @after_this_request
    def add_header(response):
         response.headers.add('Access-Control-Allow-Origin', '*')
         return response
    
    if request.method == 'POST':
        return request.json
    return jsonify({'goodbye':'world'})