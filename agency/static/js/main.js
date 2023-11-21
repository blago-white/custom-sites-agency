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
    const processedHeight = mainSectionHeight * .6;

    if (scrollTopHeight > processedHeight) {
        document.getElementsByClassName('main-content-wrapper')[0].style.filter = "blur(" + (
                (scrollTopHeight - processedHeight) / 25
            ) + "px)";

        secondContentWrapper.style.boxShadow = "0px 0px " + (scrollTopHeight - processedHeight) + "px #dbdbdb";
    } else {
        document.getElementsByClassName('main-content-wrapper')[0].style.filter = "blur(0px)";
        secondContentWrapper.style.boxShadow = "0px 0px 0px #dbdbdb";
    }
}

document.addEventListener('scroll', onScroll)
