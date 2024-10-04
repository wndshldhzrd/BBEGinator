from flask import Flask, after_this_request, jsonify, request

app = Flask(__name__)

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
def conf_services():
    if request.method == "POST":
        app.logger.warning(request.values.get('new_freq'))
    return {"goodbye":"world"}