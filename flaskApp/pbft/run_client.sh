#!/bin/sh
for i in  0 1 
do
   python3 ./client_app.py -id $i -nm 20 & 
done
