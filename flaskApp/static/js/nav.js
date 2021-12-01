(function() {
    "use strict";
    window.addEventListener('load', function() {
        console.log('loadded js');
        const vnavs = document.querySelectorAll('.vnavbar a');
        let activeNav = [0, 0];
        const hnavs = document.querySelectorAll('.hnavbar a');
        function checkClick(navs, idx) {
            navs.forEach((nav, i) => {
                console.log(nav);
                nav.addEventListener('click', function() {
                    console.log('clicked', nav, nav.className, activeNav[idx]);
                    nav.className = 'active';
                    navs[activeNav[idx]].className = '';
                    activeNav[idx] = i;
                });
            });
        }
        checkClick(vnavs, 0);
        checkClick(hnavs, 1);
    });
}());