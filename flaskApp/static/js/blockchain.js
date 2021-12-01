(function() {
    window.addEventListener('load', function() {
        fetch('/getPBFTdata').then(function (response) { // At this point, Flask has printed our JSON
            return response.json();
        }).then(function (data) {
            
            console.log('GET response: ', data);
            // Should be 'OK' if everything was successful
            loadPage(data);
        });

        const vNav = document.querySelector('#verNavBar ul');
        const blockchain = document.getElementById('blockchain');
        let curReplica = 0;
        function loadPage(data) {
            for(let i = 1; i <= data.replicas; i++) {
                let replica = document.createElement('li');
                let atag = document.createElement('a');
                replica.appendChild(atag);
                atag.innerText = `Replica ${i} Blockchain`;
                replica.addEventListener('click', function() {
                    loadBlockchain(i);
                    vNav.children[i - 1].children[0].className = 'active';
                    vNav.children[curReplica].children[0].className = '';
                    curReplica = i - 1;
                });
                vNav.appendChild(replica);
            }
            console.log(vNav.children);
            vNav.children[curReplica].children[0].className = 'active';
            loadBlockchain(0);
        }

        function loadBlockchain(replicaIdx) {
            // Send the same request
            fetch('/getBlock', {

                // Specify the method
                method: 'POST',
            
                // JSON
                headers: {
                    'Content-Type': 'application/json'
                },
            
                // A JSON payload
                body: JSON.stringify({
                    "node": replicaIdx
                })
            }).then(function (response) { // At this point, Flask has printed our JSON
                return response.json();
            }).then(function (data) {
            
                console.log('POST response: ', data);
                // Should be 'OK' if everything was successful
                parseData(data);
            });
        }

        function parseData(data) {
            let size = 3;
            let idcr = true;
            let pos = 1;
            blockchain.innerHTML = '<div id="bcLabel">Blockchain</div>';
            for(let i = 0; i < data.data.length; i++) {
                console.log('for data ', data.data[i]);
                let div = document.createElement('div');
                div.className = 'block';
                let pre = document.createElement('pre');
                pre.innerText = JSON.stringify(data.data[i], null, 2);
                div.appendChild(pre);
                if(idcr) {
                    div.style.gridColumn = `${pos} / ${++pos}`;
                } else {
                    div.style.gridColumn = `${pos - 1} / ${pos--}`;
                }
                if(pos == 1)
                    idcr = true;
                else if(pos == 4)
                    idcr = false;
                blockchain.appendChild(div);
            }
        }
    });
}());