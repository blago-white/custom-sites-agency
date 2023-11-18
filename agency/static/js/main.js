const secondContentWrapper = document.getElementsByClassName('second-content-wrapper')[0];
const thirdContentWrapper = document.getElementsByClassName('third-content-wrapper')[0];

let colorValue = 36;

const aspectRatio = window.outerWidth / window.outerHeight;

const absoluteSecondSectionHeight = window.innerHeight* (aspectRatio > 12/9 ? 1.5 : 2.25)
console.log(aspectRatio);

function onScroll (event) {
    const scrollTopHeight = document.documentElement.scrollTop;
    const mainSectionHeight = document.getElementsByClassName('main-content-wrapper')[0].offsetHeight;
    const secondSectionHeight = document.getElementById('prices').parentElement.offsetHeight;
    const thirdSectionHeight = document.getElementById('about').offsetHeight;
    const processedHeight = mainSectionHeight * .4;

    if (scrollTopHeight >= processedHeight) {
        if (scrollTopHeight > absoluteSecondSectionHeight) {
            colorValue = 219 - 36 * (Math.min((scrollTopHeight - secondSectionHeight * .8) / 100, 5.08));
        } else {
            colorValue = 36 + 183 * Math.min((scrollTopHeight - processedHeight) / 500, 1);
        }
        document.body.style.background = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
    } else {
        document.body.style.background = "#242424";
    }

    if (scrollTopHeight >= mainSectionHeight) {
        if (scrollTopHeight <= window.innerHeight*1.5) {
            secondContentWrapper.style.opacity = "1";
        } else {secondContentWrapper.style.opacity = "0"}
    } else {
        if (secondContentWrapper.style.opacity == "1") {
            secondContentWrapper.style.opacity = "0";
        }
    }

    if (scrollTopHeight >= secondSectionHeight) {
        thirdContentWrapper.style.opacity = "1";
    } else {
        thirdContentWrapper.style.opacity = "0";
    }
}

document.addEventListener('scroll', onScroll)
