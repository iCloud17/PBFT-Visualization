#!/bin/sh

curl -vLX POST --data '{ "id":"(0, 0)", "client_url":"http://localhost:20030/reply","timestamp":1638354559.9010725,"data":"Hello World!"}' http://localhost:30001/request

sleep 5

curl -vLX POST --data '{ "id":"(0, 1)", "client_url":"http://localhost:20030/reply","timestamp":1638354559.9011016,"data":"sample message 1"}' http://localhost:30001/request

sleep 5

curl -vLX POST --data '{ "id":"(0, 2)", "client_url":"http://localhost:20030/reply","timestamp":1638354559.9011126,"data":"sample message 2"}' http://localhost:30001/request

sleep 5
