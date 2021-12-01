
#!/bin/sh

./run_node.sh
sleep 15 
./run_client.sh

sleep 500
pkill -9 python

