(function () {
	'use strict';

	console.log("reading js");

	window.addEventListener('load', function() {
        
        //------Initializations------
        const btn = document.querySelector('button');
        const table = document.querySelector('table');
        const tbody = table.querySelector('tbody');
        const phases = ['request', 'preprepare', 'prepare', 'commit', 'reply'];
        let rowCount = 1;

        //------Add clickable intersection points between nodes and phase ends------
        function addCorner(element, x, y) {
            let dv = document.createElement('div');
            dv.className = 'corner';
            dv.id = `corner${x}${y}`;
            element.appendChild(dv);
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

        initCorners();

        //-----------Add Rows/Replicas to the graph-----------
        btn.addEventListener('click', function(event) {
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
        });


        //-----------------Arrow Functions-----------------
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
                x: element.getBoundingClientRect().left - table.getBoundingClientRect().left + (element.offsetWidth/2),
                y: element.getBoundingClientRect().top - table.getBoundingClientRect().top + (element.offsetHeight/2)
            };
            return obj;
        }

        function drawArrow(x1, y1, x2, y2) {
            //Get from point and to point positions
            let from = getObj(`#corner${x1}${y1}`);
            let to = getObj(`#corner${x2}${y2}`);
            
            //Create Arrow
            let arrow = document.createElement('div');
            arrow.className = 'arrow';
            arrow.innerHTML = `<div class="${phases[y1]} line"><div class="msgBall"></div></div><div class="head ${phases[y1]}"></div>`;
            let line = arrow.querySelector('.line');
            let head = arrow.querySelector('.head');
            let dist = getArrowWidth(from, to);
            line.style.width = `${dist}px`;
            arrow.style.left = `${from.x}px`;
            //Add to table first so that we can compute offsetHeights correctly
            table.appendChild(arrow);
            
            arrow.style.top = `${from.y - head.offsetHeight}px`;
            arrow.style.left = `${from.x}px`;
            
            arrow.style.transformOrigin = '0% 50%';
            arrow.style.transform = `rotate(${getArrowAngle(from, to)}deg)`;

            arrow.style.width = `${line.offsetWidth + head.offsetWidth}px`;
            line.style.width = `${dist - head.offsetWidth}px`;
        }


        const form = document.querySelector('form');
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            let x1 = Number(form.querySelector('#location1x').value);
            let y1 = Number(form.querySelector('#location1y').value);
            let x2 = Number(form.querySelector('#location2x').value);
            let y2 = Number(form.querySelector('#location2y').value);
            
            drawArrow(x1, y1, x2, y2)
        });


    });

})();