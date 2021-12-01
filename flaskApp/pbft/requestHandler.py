import time
import subprocess
import os
import json
import ast

def getNodeData(json_data):
    output_list = []
    count = 0 
    root_path = os.getcwd()+'/flaskApp/pbft/'
    for root,dirs,files in os.walk(root_path):
        for d in dirs:
            os.chmod(os.path.join(root,d),0o777)
        for f in files:
            os.chmod(os.path.join(root,f),0o777)

    os.chdir(root_path)
    myfile_path = os.getcwd() + '/my_file.txt'
    with open(myfile_path, "r") as file:
        os.chmod(myfile_path,0o777)
        for each_line in file.readlines():
            if each_line.startswith("{"):
                output_list.append(json.loads(each_line))
    for each_dict in output_list:
        if each_dict['destination']==json_data['destination'] and each_dict['type']==json_data['type']:
            while each_dict["time_stamp"] <= time.time():
                count=+1
            print(count)
            return


def getMsgData(json_data):
    
    output_list = []

    root_path = os.getcwd()+'/flaskApp/pbft/'
    for root,dirs,files in os.walk(root_path):
        for d in dirs:
            os.chmod(os.path.join(root,d),0o777)
        for f in files:
            os.chmod(os.path.join(root,f),0o777)

    os.chdir(root_path)
    myfile_path = os.getcwd() + '/my_file.txt'
    with open(myfile_path, "r") as file:
        os.chmod(myfile_path,0o777)
        for each_line in file.readlines():
            if each_line.startswith("{"):
                output_list.append(json.loads(each_line))
    
    os.chdir('../../')


    for each_dict in output_list:
        if json_data['phase'] == 'reply':

            data = {
                "data": each_dict['data'], 
                "destination": 'client', 
                "source":  json_data['src'], 
                "type": "reply"
                }
            return data

        elif each_dict['source'] == json_data['src'] and each_dict['destination'] == json_data['dest'] and each_dict['type'] == json_data['phase']:
            return each_dict


    
def parseJSONfile():
    return


def runPBFTAlgo(json):

    #Create trial.sh
    

    root_path = os.getcwd()+'/flaskApp/pbft/'

    for root,dirs,files in os.walk(root_path):
        for d in dirs:
            os.chmod(os.path.join(root,d),0o777)
        for f in files:
            os.chmod(os.path.join(root,f),0o777)

    os.chdir(root_path)

    subprocess.call(os.getcwd() + '/clean.sh')
    
    path=os.getcwd()+'/dynamic_trial.sh'

    with open(path, mode='a+', encoding='utf-8') as post_data:
        os.chmod(path,0o777)
        post_data.write('#!/bin/sh\n')
        for i in range(int(json['request'])):
            post_request = '{ "id":"(0, %s)", "client_url":"http://localhost:20030/reply","timestamp":%s,"data":"%s"}' % (i, time.time(), json['msg'][i])
            request_string = 'curl -vLX POST --data \'' + post_request + '\' http://localhost:30001/request\n'
            post_data.write("\n"+request_string+"\nsleep 5\n")
    
    port_numbers = 30000
    yaml_path = os.getcwd()+'/pbft.yaml'
    with open(yaml_path, mode='a+', encoding='utf-8') as create_yaml:
        os.chmod(yaml_path,0o777)
        create_yaml.write('nodes:')
        for i in range(int(json['replicas'])):
            create_yaml.write('\n    - host: localhost\n      port: %d'%(port_numbers+i+1))
        create_yaml.write('\n\nclients:\n    - host: localhost\n      port: 20030')
        create_yaml.write('\n\nloss%: 0')
        create_yaml.write('\n\nckpt_interval: %d'%(int(json['ckpt'])))
        create_yaml.write('\n\nretry_times_before_view_change: 2\n\nsync_interval: 5\n\nmisc:\n    network_timeout: 100')

    #Run the PBFT script
    
    subprocess.call(os.getcwd() + '/run.sh')
    os.chdir('../../')
    print("OS CWD =======", os.getcwd())

def runSendRequest(json):
    subprocess.call(os.path.abspath(os.getcwd())+'/flaskApp/pbft/dynamic_trial.sh')
        

if __name__== "__main__":
    json_data = {'source':0,
    'destination':1,
    'type':"prepare"}
    runPBFTAlgo(json_data)
    #getMsgData(json_data)