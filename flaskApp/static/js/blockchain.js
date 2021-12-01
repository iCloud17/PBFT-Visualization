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
        let blocks;
        let curReplica = 0;
        const colors = ['#2364AA', '#EA7317', '#358600', '#3DA5D9', '#FEC601'];
        const phases = ['request', 'preprepare', 'prepare', 'commit', 'reply'];
        let drawnArrows = false;

        blockchain.addEventListener('mouseenter', function() {
            blockchain.classList.add('hovering');
            if(!drawnArrows) {
                setTimeout(function () {
                    if(blockchain.classList.contains('hovering')) {
                        setTimeout(drawAllArrows, 1900);
                    }
                }, 100);
            }
        });

        blockchain.addEventListener('mouseleave', function() {
            blockchain.classList.remove('hovering');
            if(drawnArrows) {
                setTimeout(function () {
                    if(!blockchain.classList.contains('hovering')) {
                        removeAllArrows();
                    }
                }, 100);
            }
        });

        //#region parsing data

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
                row = (Math.floor(i / 3)) + 1;
                div.style.gridRow = `${row} / ${row + 1}`;
                if(pos == 1)
                    idcr = true;
                else if(pos == 4)
                    idcr = false;
                blockchain.appendChild(div);
            }
            blocks = blockchain.querySelectorAll('.block');
            blocks.forEach(block => {
                block.addEventListener('mouseenter', function() {
                    blockchain.classList.add('hovering');
                })
                block.addEventListener('mouseleave', function() {
                    blockchain.classList.remove('hovering');
                })
            })
        }

        //#endregion

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

        function getRightMid(parent, element) {
            let obj = {
                x: element.getBoundingClientRect().left + element.offsetWidth - parent.getBoundingClientRect().left,
                y: element.getBoundingClientRect().top - parent.getBoundingClientRect().top + (element.offsetHeight/2)
            };
            return obj;
        }

        function getLeftMid(parent, element) {
            let obj = {
                x: element.getBoundingClientRect().left - parent.getBoundingClientRect().left,
                y: element.getBoundingClientRect().top - parent.getBoundingClientRect().top + (element.offsetHeight/2)
            };
            return obj;
        }

        function getTopMid(parent, element) {
            let obj = {
                x: element.getBoundingClientRect().left + (element.offsetWidth / 2) - parent.getBoundingClientRect().left,
                y: element.getBoundingClientRect().top - parent.getBoundingClientRect().top
            };
            return obj;
        }

        function getBottomMid(parent, element) {
            let obj = {
                x: element.getBoundingClientRect().left + (element.offsetWidth / 2) - parent.getBoundingClientRect().left,
                y: element.getBoundingClientRect().top - parent.getBoundingClientRect().top + element.offsetHeight
            };
            return obj;
        }

        function drawAllArrows() {
            for(let i = 1; i < blocks.length; i++) {
                drawArrow(i - 1, i, phases[i%phases.length]);
            }
            drawnArrows = true;
        }

        function removeAllArrows() {
            blockchain.querySelectorAll('.arrow').forEach(arrow => {
                blockchain.removeChild(arrow);
            });
            drawnArrows = false;
        }

        function drawArrow(b1, b2, phase) {
            console.log('drawArrow!');
            let rowb1 = Math.floor(b1 / 3);
            let rowb2 = Math.floor(b2 / 3);
            let from, to;
            if(rowb1 == rowb2) {
                //side to side
                if(rowb1 % 2 == 0) {
                    //left to right
                    from = getRightMid(blockchain, blocks[b1]);
                    to = getLeftMid(blockchain, blocks[b2]);
                } else {
                    //right to left
                    from = getLeftMid(blockchain, blocks[b1]);
                    to = getRightMid(blockchain, blocks[b2]);
                }
            } else {
                // top bottom arrow
                from = getBottomMid(blockchain, blocks[b1]);
                to = getTopMid(blockchain, blocks[b2]);
            }
            
            //Create Arrow
            let arrow = document.createElement('div');
            arrow.className = 'arrow';
            //Add class according to whichever phase it is to change colors in css
            arrow.innerHTML = `<div class="${phase} line"><div class="msgBall"></div></div><div class="head ${phase}"></div>`;
            let line = arrow.querySelector('.line');
            let head = arrow.querySelector('.head');
            let dist = getArrowWidth(from, to);
            line.style.width = `${dist}px`;
            arrow.style.left = `${from.x}px`;
            //Add to table first so that we can compute offsetHeights correctly
            blockchain.appendChild(arrow);
            let ball = arrow.querySelector('.msgBall');
            ball.style.animationDelay = `${Math.random() * 2}s`;
            arrow.style.top = `${from.y - head.offsetHeight}px`;
            arrow.style.left = `${from.x}px`;
            
            arrow.style.transformOrigin = '0% 50%';
            arrow.style.transform = `rotate(${getArrowAngle(from, to)}deg)`;

            arrow.style.width = `${line.offsetWidth + head.offsetWidth}px`;
            line.style.width = `${dist - head.offsetWidth}px`;
        }

        //#endregion

    });
}());