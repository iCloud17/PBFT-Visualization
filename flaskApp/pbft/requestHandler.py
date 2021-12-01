def getNodeData(json):
    '''
    json = {
        "phase": phaseId,
        "node": nodeId
    }
    '''
    print("node json object", json)
    # jsonObj = {
    #     allMessagesReceivedForThatPhase: True
    # }
    # return jsonObj

def getMsgData(json):
    '''
    json = {
        "phase": phaseId,
        "src": src,
        "dest": dest
    }
    '''
    print("msg json object", json)
    # jsonObj = {
    #     allMessageData: True,
    # }
    # return jsonObj

def startPBFT(json):
    '''
    json = {
        message: 'msg',
        nodes: numberOfNodes,
        requests: numberOfRequests,
        retry_times: numberOfRetries,
        sync_interval: sync_interval,
        ckpt_interval: ckpt_interval
    }
    network_timeout = 1000;
    '''
    #change the yaml file
    #change trial.sh messages where message 1 = message and rest are sample message i
    #call run.sh
    return

def parseJSONfile():
    return

def makeByzantine():
    return