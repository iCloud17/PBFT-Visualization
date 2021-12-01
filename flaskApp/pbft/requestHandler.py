import time
import subprocess
import os
import json
import ast

def getNodeData(json_data):
    output_list = []
    count = 0 
    with open("my_file.txt", "r") as file:
        for each_line in file.readlines():
            if each_line.startswith("{"):
                output_list.append(json.loads(each_line))
    for each_dict in output_list:
        if each_dict['destination']==json_data['destination'] and each_dict['type']==json_data['type']:
            while each_dict["time_stamp"] <= time.time():
                count=+1
            return
    


def getMsgData(json_data):
    output_list = []
    with open("my_file.txt", "r") as file:
        for each_line in file.readlines():
            if each_line.startswith("{"):
                output_list.append(json.loads(each_line))
    for each_dict in output_list:
        if each_dict['source'] == json_data['source'] and each_dict['destination'] == json_data['destination'] and each_dict['type'] == json_data['type']:
            return
            
def runPBFTAlgo(json):
    
    #Create trial.sh
    with open('dynamic_trial.sh', mode='a+', encoding='utf-8') as post_data:
        os.chmod('dynamic_trial.sh',0o0777)
        post_data.write('#!/bin/sh\n')
        for i in range(json['no_of_messages']):
            post_request = '{ "id":"(0, %s)", "client_url":"http://localhost:20030/reply","timestamp":%s,"data":"%s"}' % (i, time.time(), json['message'][i])
            request_string = 'curl -vLX POST --data \'' + post_request + '\' http://localhost:30001/request\n'
            post_data.write("\n"+request_string+"\nsleep 5\n")
    
    port_numbers = 30000
    
    with open('pbft.yaml', mode='a+', encoding='utf-8') as create_yaml:
        create_yaml.write('nodes:')
        for i in range(json['no_of_nodes']):
            create_yaml.write('\n    - host: localhost\n      port: %d'%(port_numbers+i+1))
        create_yaml.write('\n\nclients:\n    - host: localhost\n      port: 20030')
        create_yaml.write('\n\nloss%: 0')
        create_yaml.write('\n\nckpt_interval: %d'%(json['ckpt_interval']))
        create_yaml.write('\n\nretry_times_before_view_change: 2\n\nsync_interval: 5\n\nmisc:\n    network_timeout: 100')

    #Run the PBFT script

    subprocess.call(os.path.abspath(os.getcwd())+'/run.sh')

def runSendRequest(json):
    subprocess.call(os.path.abspath(os.getcwd())+'/dynamic_trial.sh')
        

if __name__== "__main__":
    json_data = {'source':0,
    'destination':1,
    'type':"prepare"}
    runPBFTAlgo(json_data)
    #getMsgData(json_data)