from flaskApp import app
from flask import jsonify, request, render_template
from .pbft import requestHandler as rh

messageData = { }


@app.route('/node', methods=['GET', 'POST'])
def node():

    # POST request
    if request.method == 'POST':
        print('Incoming..')
        rh.getNodeData(request.get_json())
        return 'OK', 200

    # GET request
    else:
        message = {'greeting':'Hello from Flask!'}
        return jsonify(message)  # serialize and use JSON headers

@app.route('/msg', methods=['GET', 'POST'])
def msg():

    # POST request
    if request.method == 'POST':
        print('Incoming..')
        rh.getMsgData(request.get_json())
        return 'OK', 200

    # GET request
    else:
        message = {'greeting':'Hello from Flask!'}
        return jsonify(message)  # serialize and use JSON headers


@app.route("/")
def introPage():
    messageData = rh.parseJSONfile()
    return render_template('intro.html')


@app.route("/pbft.html")
def pbftPage():
    messageData = rh.parseJSONfile()
    return render_template('pbft.html')
