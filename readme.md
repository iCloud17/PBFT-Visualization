This project is built using https://github.com/soumyaxyz/Python-PBFT-Blockchain as a basis! We have added upon the work by providing a visualization of the data flow process and a simple UI to actually understand whats going on, and see the value changes and decisions made by nodes given certain messages.

To run, first make sure the requirements are set up: 

`pip install -r requirements.txt` 

The recommended way to run the app is run the following commands:
```
export FLASK_APP=run.py
export FLASK_ENV=development
flask run
 ```

The alternative way to run the app is to run:

`python3 run.py`

Hope you have a clearer understanding of PBFT!