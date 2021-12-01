#!/bin/sh

./run_node.sh
sleep 5
./run_client.sh
sleep 10
./dynamic_trial.sh

sleep 5
pkill -9 python