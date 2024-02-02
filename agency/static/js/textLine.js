const line = document.getElementById('text-line');
const line2 = document.getElementById('text-line-2');


function moveLine(event) {
    line.style.transform = `translateX(${document.documentElement.scrollTop/4-1200}px)`;
    line2.style.transform = `translateX(-${document.documentElement.scrollTop/4}px)`;
}


document.addEventListener('scroll', moveLine);
