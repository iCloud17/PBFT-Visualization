<<<<<<< HEAD
#!/bin/bash
rm *.blockchain
for i in {0..5}
do
	python3 ./node.py -i $i -lf True &
done


=======
#!/bin/bash
rm *.blockchain
for i in {0..5}
do
	python3 ./node.py -i $i -lf True &
done


>>>>>>> 03fc4c028e966133c339ad7e372339ade101b927
