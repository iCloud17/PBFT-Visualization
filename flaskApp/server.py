from flaskApp import app
from flask import jsonify, request, render_template
from .pbft import requestHandler as rh

messageData = { }
pbftData = {}


@app.route('/node', methods=['GET', 'POST'])
def node():

    # POST request
    if request.method == 'POST':
        print('Incoming..')
        return rh.getNodeData(request.get_json())

    # GET request
    else:
        message = {'greeting':'Hello from Flask!'}
        return jsonify(message)  # serialize and use JSON headers

@app.route('/msg', methods=['GET', 'POST'])
def msg():

    # POST request
    if request.method == 'POST':
        print('Incoming..')
        return rh.getMsgData(request.get_json())

    # GET request
    else:
        message = {'greeting':'Hello from Flask!'}
        return jsonify(message)  # serialize and use JSON headers


@app.route("/")
def introPage():
    return render_template('intro.html')


@app.route("/pbft.html")
def pbftPage():
    return render_template('pbft.html')

@app.route("/startPBFT", methods=['GET', 'POST'])
def startPBFT():
    # POST request
    if request.method == 'POST':
        pbftData = request.get_json()
        print('Incoming..',request.get_json())
        rh.runPBFTAlgo(request.get_json())
        return 'OK', 200

    # GET request
    else:
        message = {'greeting':'Hello from Flask!'}
        return jsonify(message)  # serialize and use JSON headers

@app.route("/getLogs", methods=['GET'])
def getLogs():
    if request.method == 'GET':
        return 'OK'