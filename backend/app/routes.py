from app import app

@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

@app.route('/getJSON')
def getJSON(): 
    print("happen")
    return {
        "username": "Bob Bobert",
        "email": "Bob@Bobert.org",
        "picture": "Bob's Tinder Profile",
    }