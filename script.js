(function () {
	'use strict';

	console.log("reading js");

	window.addEventListener('load', function() {
        
        const btn = document.querySelector('button');
        const table = document.querySelector('table');
        const tbody = table.querySelector('tbody');
        let rowCount = 1;

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

        btn.addEventListener('click', function(event) {
            let newRow = tbody.insertRow();
            let cols = 6;
            for(let i = 0; i < cols; i++) {
                let newCell = newRow.insertCell();
                // newCell.textContent = `${i + 1}`;
                if(i == cols - 1) {
                    newCell.className = 'lastCol';
                } else if(i == 0) {
                    newCell.textContent = '';
                    let dv = document.createElement('div');
                    dv.textContent = `Replica ${rowCount}`;
                    dv.className = 'node';
                    newCell.appendChild(dv);
                }
                addCorner(newCell, rowCount, i);
            }
            rowCount++;
            // console.log(rowCount);
        });


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

        function getObj(id) {
            let element = tbody.querySelector(id);
            // console.log('ew', element.getBoundingClientRect().left, element.offsetWidth, 'eh', element.getBoundingClientRect().top, element.offsetHeight);
            let obj = {
                x: element.getBoundingClientRect().left - table.getBoundingClientRect().left + (element.offsetWidth/2),
                y: element.getBoundingClientRect().top - table.getBoundingClientRect().top + (element.offsetHeight/2)
            };
            return obj;
        }

        function drawArrow(x1, y1, x2, y2) {
            let from = getObj(`#corner${x1}${y1}`);
            let to = getObj(`#corner${x2}${y2}`);
            // console.log('from', from, 'to', to);
            let arrow = document.createElement('div');
            arrow.className = 'arrow';
            arrow.innerHTML = '<div class="line"></div><div class="head"></div>';
            let line = arrow.querySelector('.line');
            let head = arrow.querySelector('.head');
            // console.log('line', line);
            line.style.width = `${getArrowWidth(from, to)}px`;
            arrow.style.left = `${from.x}px`;
            // console.log('aoh', arrow.offsetHeight);
            table.appendChild(arrow);
            // console.log(head.offsetHeight, head.offsetWidth);
            
            arrow.style.top = `${from.y - head.offsetHeight}px`;
            arrow.style.left = `${from.x}px`;
            
            arrow.style.transformOrigin = '0% 50%';
            arrow.style.transform = `rotate(${getArrowAngle(from, to)}deg)`;

            arrow.style.width = `${line.offsetWidth + head.offsetWidth}px`;
            line.style.width = `${getArrowWidth(from, to) - head.offsetWidth}px`;
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