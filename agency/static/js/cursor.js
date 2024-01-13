const circle = document.getElementById('circle');

//document.addEventListener('mousemove', function(ev){
//    circle.style.transform = 'translateY('+(ev.clientY-400)+'px)';
//    circle.style.transform += 'translateX('+(ev.clientX-700)+'px)';
//},false);
document.addEventListener('mousemove', function(ev){
    circle.style.transform = 'translateY('+(ev.clientY-350)+'px)';
    circle.style.transform += 'translateX('+(ev.clientX-350)+'px)';
},false);