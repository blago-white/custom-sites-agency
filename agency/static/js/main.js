import { expanding } from "./mobileMenu.js";

const secondContentWrapper = document.getElementsByClassName('second-content-wrapper')[0];
const thirdContentWrapper = document.getElementsByClassName('third-content-wrapper')[0];

let colorValue = 36;

const aspectRatio = window.outerWidth / window.outerHeight;

const secondSectionBlurDivider = aspectRatio > 12/9 ? 25 : 50;

function onScroll(event) {
    if (expanding()) {
        return;
    }

    const scrollTopHeight = document.documentElement.scrollTop;
    const mainSectionHeight = document.getElementsByClassName('main-content-wrapper')[0].offsetHeight;
    const secondSectionHeight = document.getElementById('prices').parentElement.offsetHeight;
    const thirdSectionHeight = document.getElementById('about').offsetHeight;
    const processedHeight = 0;

    if (scrollTopHeight > processedHeight) {
        if (scrollTopHeight > 0 && scrollTopHeight < mainSectionHeight) {
            document.getElementsByClassName('main-content-wrapper')[0].style.filter = "blur(" + (
                    (scrollTopHeight - processedHeight) / 25
                ) + "px)";

            secondContentWrapper.style.boxShadow = "0px 0px " + (scrollTopHeight - processedHeight) + "px #dbdbdb";
        } else {
            document.getElementsByClassName('main-content-wrapper')[0].style.filter = "blur(0px)";
            secondContentWrapper.style.boxShadow = "0px 0px 0px #dbdbdb";
        }

        if (scrollTopHeight > secondSectionHeight) {
            const thirdSectionScrollDelta = scrollTopHeight - secondSectionHeight;

            secondContentWrapper.parentElement.style.filter = "blur(" + ((
                (thirdSectionScrollDelta / secondSectionBlurDivider)
            ) - 1) + "px)";

            thirdContentWrapper.style.boxShadow = "0px 0px " + (
                thirdSectionScrollDelta
            ) + "px #202020" + ", 0px 0px " + (thirdSectionScrollDelta) + "px #202020";
        } else {
            secondContentWrapper.parentElement.style.filter = "";
        }
    }
}

document.addEventListener('scroll', onScroll)
