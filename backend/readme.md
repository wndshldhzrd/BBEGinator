# Useful resources for learning Flask
The main guide I followed for all of the set up:
https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world

Random SO post that I followed to send data between flask and javascript:
https://stackoverflow.com/questions/57891275/simple-fetch-get-request-in-javascript-to-a-flask-server

# Setup
1) Make sure you have a version of python 3.12 installed
2) Open a terminal and cd into the backend folder
3) Run from the terminal python3 -m venv venv (try py or python instead of python3 if you get an error)
4) Run from the terminal venv\Scripts\activate (use source venv/bin/activate if on linux)
5) Run from the terminal pip install -r requirements.txt
6) if that does not work instead run pip install flask and then pip install python-dotenv
7) You are now done!

# To Run Locally
## Windows:
1) venv\Scripts\activate (if you are not already in your venv)
2) flask run (optional ->) --port [port number you want to host on]
3) To stop the server press ctrl + c on the commpand line
4) To exit the venv run deactivate on the command line

## Linux:
1) source venv/bin/activate (if you are not already in your venv)
2) flask run (optional ->) --port [port number you want to host on]
3) To stop the server press ctrl + c on the command line
4) To exit the venv run deactivate on the command line

## Potential Error
If the console complains about MY_APP not being defined then run
export FLASK_APP=routes.py in the backend folder from the command line

# For Deployment (PLEASE READ)
The above instructions are only for testing the python locally but do not 
actually update the api we have running over at https://zevce.pythonanywhere.com/ .
When we have python code thats ready to deploy live please talk to me (Zev/Vutsrq)
and I will update the pythonanywhere code with the new Python code. 