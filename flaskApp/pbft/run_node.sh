#!/bin/bash
rm *.blockchain
for i in {0..3}
do
	python3 ./node.py -i $i -lf True &
done


