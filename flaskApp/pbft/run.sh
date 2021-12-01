#!/bin/sh

./run_node.sh
sleep 2
./run_client.sh
sleep 2
./dynamic_trial.sh

sleep 5
pkill -9 python