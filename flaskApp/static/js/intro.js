(function() {
    "use strict";

    //#region Requests---------------------------------
    function runningPBFT(msg = 'Hello World', replicas = 4, request = 10, retries = 2, sync = 5, ckpt = 1) {
        let msgList = [msg];
        for(let i = 1; i < request; i++) {
            msgList.push(`sample message ${i}`);
        }
        // Send the same request
        fetch('/startPBFT', {

            // Specify the method
            method: 'POST',
        
            // JSON
            headers: {
                'Content-Type': 'application/json'
            },
        
            // A JSON payload
            body: JSON.stringify({
                "msg": msgList, 
                "replicas": replicas, 
                "request": request, 
                "retries":retries, 
                "sync": sync, 
                "ckpt": ckpt
            })
        }).then(function (response) { // At this point, Flask has printed our JSON
            return response.text();
        }).then(function (text) {
        
            console.log('POST response: ');
            // Should be 'OK' if everything was successful
            console.log(text);
        });
    }

    const form = document.getElementById('pbftInputs');
    const inputs = form.querySelectorAll('input');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value,inputs[5].value);
        runningPBFT(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value,inputs[5].value);
    });
}());