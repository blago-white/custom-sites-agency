const circle = document.getElementById('circle');

document.addEventListener('mousemove', function(ev){
    circle.style.transform = 'translateY('+(ev.clientY-50)+'px)';
    circle.style.transform += 'translateX('+(ev.clientX-50)+'px)';
},false);