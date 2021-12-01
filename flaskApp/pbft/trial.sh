#!/bin/sh

curl -vLX POST --data '{ "id":"(0, 0)", "client_url":"http://localhost:20001/reply","timestamp":1636603823.3013964,"data":"Hello World"}' http://localhost:30000/request

sleep 5

# curl -vLX POST --data '{ "id":"(0, 1)", "client_url":"http://localhost:20001/reply","timestamp":1636604044.3153493,"data":"kalyan"}' http://localhost:30000/request

# sleep 5

# curl -vLX POST --data '{ "id":"(0, 2)", "client_url":"http://localhost:20001/reply","timestamp":1636604244.3153493,"data":"rajat"}' http://localhost:30000/request

# sleep 5

# curl -vLX POST --data '{ "id":"(0, 3)", "client_url":"http://localhost:20001/reply","timestamp":1636604444.3153493,"data":"helloWorld!"}' http://localhost:30000/request

# sleep 5

# curl -vLX POST --data '{ "id":"(0, 4)", "client_url":"http://localhost:20001/reply","timestamp":1636604844.3153493,"data":"helloWorld"}' http://localhost:30000/request

# sleep 5

# curl -vLX POST --data '{ "id":"(0, 5)", "client_url":"http://localhost:20001/reply","timestamp":1636605044.3153493,"data":"helloWorld"}' http://localhost:30000/request

# #!/bin/sh

# curl -vLX POST --data '{ "id":"(0, 6)", "client_url":"http://localhost:20001/reply","timestamp":1636605223.3013964,"data":"baadal1"}' http://localhost:30000/request

# sleep 5

# curl -vLX POST --data '{ "id":"(0, 7)", "client_url":"http://localhost:20001/reply","timestamp":1636605444.3153493,"data":"kalyan1"}' http://localhost:30000/request

# sleep 5

# curl -vLX POST --data '{ "id":"(0, 8)", "client_url":"http://localhost:20001/reply","timestamp":1636605644.3153493,"data":"rajat1"}' http://localhost:30000/request

# sleep 5

# curl -vLX POST --data '{ "id":"(0, 9)", "client_url":"http://localhost:20001/reply","timestamp":1636605844.3153493,"data":"helloWorld!1"}' http://localhost:30000/request

# sleep 5

# curl -vLX POST --data '{ "id":"(0, 10)", "client_url":"http://localhost:20001/reply","timestamp":1636606044.3153493,"data":"helloWorld22"}' http://localhost:30000/request

# sleep 5

# curl -vLX POST --data '{ "id":"(0, 11)", "client_url":"http://localhost:20001/reply","timestamp":1636606244.3153493,"data":"helloWorld23"}' http://localhost:30000/request