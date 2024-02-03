let freezed = false;

const circle = document.getElementById('circle');

const orderButton =  document.getElementsByClassName('contact-button-top')[0];

document.addEventListener('mousemove', function(ev){
    if (freezed) {
        return
    }

    circle.style.transform = `translateY(${ev.clientY}px) translateY(-10vh)`;
    circle.style.transform += `translateX(${ev.clientX}px) translateX(-10vh)`;
},false);

orderButton.addEventListener('mouseover', function(e) {
    circle.style.transform += "scale(0)";

    freezed = true;
})

orderButton.addEventListener('mouseout', function(e) {
    circle.style.transform += "scale(1)";

    freezed = false;
})
