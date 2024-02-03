const steps = document.getElementById('steps-scroll');
const numbers = document.getElementById('steps-numbers').children;
const texts = document.getElementById('steps-text').children;
const itemLine = document.getElementById('item-line');


function scrollStep(event) {
    console.log(event);
    window.scroll(0, 100);
}


function onScroll(event) {
    const position = texts[1].getBoundingClientRect();

    Array.prototype.forEach.call(numbers, number => {
        console.log(number.offsetHeight);

        const position = number.getBoundingClientRect();

        const centerPosition = itemLine.getBoundingClientRect().top;
        console.log(centerPosition);

        const deltaToCenter = Math.abs(centerPosition - position.top);

        number.style.transform = `scale(${
            Math.min(1.7, Math.max(0.8, Math.abs((deltaToCenter*1.5 - centerPosition)*1.5)/400))
        })`;

        number.style.opacity = `${1/(deltaToCenter/100)}`;
    });

    Array.prototype.forEach.call(texts, text => {
        const position = text.getBoundingClientRect();
        const centerPosition = itemLine.getBoundingClientRect().top;

        const deltaToCenter = Math.abs(centerPosition - position.top);

        text.style.transform = `scale(${
            Math.min(1.7, Math.max(1, Math.abs((deltaToCenter*1.5 - (window.outerHeight / 2 * .9))*1.5)/600))
        })`;

        text.style.opacity = `${1/(deltaToCenter/100)}`;
    });
}


steps.addEventListener('scroll', onScroll);
