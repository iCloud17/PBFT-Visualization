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
        const colors = ['#2364AA', '#EA7317', '#358600', '#3DA5D9', '#FEC601'];

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
            let idcr = true;
            let pos = 1;
            blockchain.innerHTML = '<div id="bcLabel">Blockchain</div>';
            for(let i = 0; i < data.data.length; i++) {
                console.log('for data ', data.data[i]);
                let div = document.createElement('div');
                div.className = 'block';
                data.data[i].previous_hash = `<span style='background-color: ${colors[i%colors.length]};'>${data.data[i].previous_hash}</span>`;
                data.data[i].hash = `<span style='background-color: ${colors[(i+1)%colors.length]};'>${data.data[i].hash}</span>`;
                div.innerHTML = JSON.stringify( {
                    "index": data.data[i].index, 
                    "hash": data.data[i].hash,
                    "previous_hash": data.data[i].previous_hash,
                    "timestamp": data.data[i].timestamp,
                    "transactions": data.data[i].transactions
                }, null, 2);
                // div.appendChild(pre);
                
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

        //#region Arrow Functions--------------------------
        
        function getArrowWidth(from, to) {
            let dist = Math.sqrt(Math.pow((to.y - from.y), 2) + Math.pow((to.x - from.x), 2));
            // console.log('dist', from, to, dist);
            return dist;
        }

        function getArrowAngle(from, to) {
            // angle in degrees
            let angleDeg = Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI;
            return angleDeg;
        }

        //Wrapper function to get objects regarding the position locations of element
        function getObj(id) {
            let element = tbody.querySelector(id);
            let obj = {
                x: element.getBoundingClientRect().left - ttable.getBoundingClientRect().left + (element.offsetWidth/2),
                y: element.getBoundingClientRect().top - ttable.getBoundingClientRect().top + (element.offsetHeight/2)
            };
            return obj;
        }

        function drawArrow(b1, b2) {
            let blocks = blockchain.querySelectorAll('.block');
            
            //Get from point and to point positions
            let from = getObj(`#pbftTable #corner${x1}${y1}`);
            let to = getObj(`#pbftTable #corner${x2}${y2}`);
            // console.log(from, to);
            //Create Arrow
            let arrow = document.createElement('div');
            arrow.className = 'arrow';
            //Add class according to whichever phase it is to change colors in css
            arrow.innerHTML = `<div class="${phases[y1]} line"><div class="msgBall"></div></div><div class="head ${phases[y1]}"></div>`;
            let line = arrow.querySelector('.line');
            let head = arrow.querySelector('.head');
            let dist = getArrowWidth(from, to);
            line.style.width = `${dist}px`;
            arrow.style.left = `${from.x}px`;
            //Add to table first so that we can compute offsetHeights correctly
            ttable.appendChild(arrow);
            let ball = arrow.querySelector('.msgBall');
            ball.style.animationDelay = `${Math.random() * 2}s`;
            arrow.style.top = `${from.y - head.offsetHeight}px`;
            arrow.style.left = `${from.x}px`;
            
            arrow.style.transformOrigin = '0% 50%';
            arrow.style.transform = `rotate(${getArrowAngle(from, to)}deg)`;

            arrow.style.width = `${line.offsetWidth + head.offsetWidth}px`;
            line.style.width = `${dist - head.offsetWidth}px`;
            
            line.addEventListener('click', () => {getMsgData(y1, x1, x2, parseMsgData);});
            head.addEventListener('click', () => {getMsgData(y1, x1, x2, parseMsgData);});
        }

        //#endregion

    });
}());