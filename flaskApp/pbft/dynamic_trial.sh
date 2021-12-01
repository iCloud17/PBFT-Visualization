#!/bin/sh

curl -vLX POST --data '{ "id":"(0, 0)", "client_url":"http://localhost:20030/reply","timestamp":1638355432.8699434,"data":"Hello World!"}' http://localhost:30001/request

sleep 5

curl -vLX POST --data '{ "id":"(0, 1)", "client_url":"http://localhost:20030/reply","timestamp":1638355432.8699698,"data":"sample message 1"}' http://localhost:30001/request

sleep 5

curl -vLX POST --data '{ "id":"(0, 2)", "client_url":"http://localhost:20030/reply","timestamp":1638355432.8699782,"data":"sample message 2"}' http://localhost:30001/request

sleep 5
