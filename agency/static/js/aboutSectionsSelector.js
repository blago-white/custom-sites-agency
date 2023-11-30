const sectionDetails = document.getElementById('secdetails');

const selectors = document.getElementById('about-selectors').children;

console.log(gettext('PAYMENT'));

const sectionsDetails = {
    1: gettext('PAYMENT'),
    2: gettext('ABOUT'),
    3: gettext('CONTACTS')
}

function setSectionDetails(sectionid, selector) {
    sectionDetails.classList.add("section-details-hidden");
    dropActiveSections()
    selector.classList.add('active-about-section');
    setTimeout(() => {
        sectionDetails.innerHTML = sectionsDetails[sectionid];
        sectionDetails.classList.remove("section-details-hidden")
    }, 200)
}

function dropActiveSections() {
    for (let i = 0; i < selectors.length; i++) {
        selectors[i].classList.remove('active-about-section')
    }
}

function setInitialAboutSection() {
    setSectionDetails(1, selectors[0])
}