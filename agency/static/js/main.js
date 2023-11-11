const secondContentWrapper = document.getElementsByClassName('second-content-wrapper')[0];

function onScroll (event) {
    const scrollTopHeight = document.documentElement.scrollTop;
    const fullElementHeight = document.getElementsByClassName('main-content-wrapper')[0].offsetHeight;
    const elementHeight = fullElementHeight * .4;

    if (scrollTopHeight >= elementHeight) {
        console.log(scrollTopHeight);
        const colorValue = 36 + 183 * Math.min((scrollTopHeight - elementHeight) / 500, 1);
        document.body.style.background = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
    } else {
        document.body.style.background = "#242424";
    }

    if (scrollTopHeight >= fullElementHeight) {
        secondContentWrapper.style.opacity = "1";
    } else {
        if (secondContentWrapper.style.opacity == "1") {
            secondContentWrapper.style.opacity = "0";
        }
    }
}

document.addEventListener('scroll', onScroll)
