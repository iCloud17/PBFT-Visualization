#!/bin/sh

PID=`ps -ef | grep ./node.py | grep -v grep | awk '{print $2}'`
if [[ "" !=  "$PID" ]]; then
  echo "killing $PID"
  kill -9 $PID
fi

PID=`ps -ef | grep ./client_app.py | grep -v grep | awk '{print $2}'`
if [[ "" !=  "$PID" ]]; then
  echo "killing $PID"
  kill -9 $PID
fi

rm -rf \$node_0.blockchain
rm -rf \$node_1.blockchain
rm -rf \$node_2.blockchain
rm -rf \$node_3.blockchain
rm -rf \$node_4.blockchain
rm -rf \$node_5.blockchain

rm -rf \$node_0.log
rm -rf \$node_1.log
rm -rf \$node_2.log
rm -rf \$node_3.log
rm -rf \$node_4.log
rm -rf \$node_5.log

rm -rf node_0.log
rm -rf node_1.log
rm -rf node_2.log
rm -rf node_3.log
rm -rf node_4.log
rm -rf node_5.log

rm -rf my_file.json

rm -rf dynamic_trial.sh

rm -rf pbft.yaml

rm -rf my_file.txt

sudo rm -rf __pycache__