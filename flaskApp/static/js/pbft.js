(function () {
	'use strict';

	console.log("reading js");

	window.addEventListener('load', function() {
        
        //------Initializations------
        const btn = document.querySelector('#pbftTable button');
        const ttable = document.querySelector('#pbftTable table');
        const tbody = ttable.querySelector('#pbftTable tbody');
        const phases = ['request', 'preprepare', 'prepare', 'commit', 'reply'];
        let rowCount = 1;

        //#region Clickable corners------------------------
        //------Add clickable intersection points between Replica and phase ends------

        function addCorner(element, x, y) {
            let dv = document.createElement('div');
            dv.className = 'corner';
            dv.id = `corner${x}${y}`;
            element.appendChild(dv);
            dv.addEventListener('click', function() {
                getNodeData(y, x, parseNodeData);
            });
        }

        function initCorners() {
            const rows = tbody.querySelectorAll('tr');
            for(let i = 0; i < rows.length; i++) {
                let cells = rows[i].querySelectorAll('td');
                for(let j = 0; j < cells.length; j++) {
                    addCorner(cells[j], i, j)
                }
            }
        }

        function parseNodeData(data) {
            console.log('NodeDat', data);
        }

        initCorners();

        //#endregion

        //#region Add Replicas-----------------------------
        function addReplicas() {
            let newRow = tbody.insertRow();
            let cols = 6;
            for(let j = 0; j < cols; j++) {
                let newCell = newRow.insertCell();
                if(j == cols - 1) {
                    newCell.className = 'lastCol';
                } else if(j == 0) {
                    newCell.textContent = '';
                    let dv = document.createElement('div');
                    dv.textContent = `Replica ${rowCount}`;
                    dv.className = 'node';
                    newCell.appendChild(dv);
                }
                addCorner(newCell, rowCount, j);
            }
            rowCount++;
            // console.log(rowCount);
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

        function drawArrow(x1, y1, x2, y2) {
            //Get from point and to point positions
            let from = getObj(`#pbftTable #corner${x1}${y1}`);
            let to = getObj(`#pbftTable #corner${x2}${y2}`);
            console.log(from, to);
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

        function parseMsgData(data) {
            console.log('msgDat', data);
        }

        //#endregion

        //#region Create Table-----------------------------
        let nreplicas = 4;
        let logData;
        getTableLogs();

        function createTable() {
            for(let i = 0; i < logData.replicas; i++) {
                addReplicas();
            }
            for(let i = 0; i < logData.data.length; i++) {
                let src = logData.data[i].source;
                let dest = logData.data[i].dest;
                let phaseT = logData.data[i].type;
                let phaseId = 0;
                for(let j = 0; j < phases.length; j++) {
                    if(phases[j] === phaseT) {
                        phaseId = j;
                        break;
                    }
                }
                drawArrow(src, phaseId, dest, phaseId + 1);
            }
        }
        // for(let i = 0; i < nreplicas; i++) {
        //     addReplicas();
        // }
        // drawArrow(0, 0, 1, 1);
        // for(let i = 2; i <= nreplicas; i++) {
        //     drawArrow(1, 1, i, 2);
        // }
        // for(let i = 1; i <= nreplicas; i++) {
        //     for(let j = 1; j <= nreplicas; j++) {
        //         if(i != j)
        //             drawArrow(i, 2, j, 3);
        //     }
        // }
        // for(let i = 1; i <= nreplicas; i++) {
        //     for(let j = 1; j <= nreplicas; j++) {
        //         if(i != j)
        //             drawArrow(i, 3, j, 4);
        //     }
        // }
        // for(let i = 1; i <= nreplicas; i++) {
        //     drawArrow(i, 4, 0, 5);
        // }

        //#endregion

        //#region Requests---------------------------------
        function getTableLogs() {
            fetch('/getLogs').then(function (response) { // At this point, Flask has printed our JSON
                return response.json();
            }).then(function (json) {
            
                console.log('GET response: ', json);
                // Should be 'OK' if everything was successful
                logData = json;
                createTable();
            });
        }
        
        function reformatReq(nodeId) {
            if(nodeId == 0) {
                return 'client';
            } else {
                return --nodeId;
            }
        }

        function reformatJson(val) {
            if(isNaN(val)) {
                val = 0;
            } else {
                val += 1;
            }
            return val;
        }

        function getNodeData(phaseId = 0, nodeId = 0, parseData) {
            
            // Send the same request
            fetch('/node', {

                // Specify the method
                method: 'POST',
            
                // JSON
                headers: {
                    'Content-Type': 'application/json'
                },
            
                // A JSON payload
                body: JSON.stringify({
                    "phase": phases[phaseId],
                    "node": reformatReq(nodeId)
                })
            }).then(function (response) { // At this point, Flask has printed our JSON
                return response.text();
            }).then(function (text) {
            
                console.log('POST response: ');
                // Should be 'OK' if everything was successful
                parseData(text);
            });
        }

        function getMsgData(phaseId = 0, src = 0, dest = 0, parseData) {
            console.log(phases[phaseId], src, dest);
            // Send the same request
            fetch('/msg', {

                // Specify the method
                method: 'POST',
            
                // JSON
                headers: {
                    'Content-Type': 'application/json'
                },
            
                // A JSON payload
                body: JSON.stringify({
                    "phase": phases[phaseId],
                    "src": reformatReq(src),
                    "dest": reformatReq(dest)
                })
            }).then(function (response) { // At this point, Flask has printed our JSON
                return response.json();
            }).then(function (json) {
                json.source = reformatJson(json.source);
                json.destination = reformatJson(json.destination);
                console.log('POST response: ', json);
                // Should be 'OK' if everything was successful
                parseData(json);
            });
        }
        //#endregion

    });

})();