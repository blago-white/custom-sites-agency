const sectionDetails = document.getElementById('secdetails');

const selectors = document.getElementById('about-selectors').children;

const sectionsDetails = {
    1: `In our digital agency, payment is made in the safest way -
        <span>after each stage of the work is completed</span>,
        an invoice is sentto you for payment, that is, at any stage <span>you can refuse payment</span>,
        you will receive more detailed information by ordering a consultation`,
    2: `<span>We are</span> a digital agency <span>focused on helping businesses</span>,
        appeared recently, in 2022, we really know how to make websites
        <br><span>IP Loginov</span><br>INN 312348585325<br>OGRN 323310000063180`,
    3: `<a href="mailto:example@example.com">example@example.com</a><br>
        <span style="cursor: pointer;" onclick="location.href = '#main'">order consultation, its
        free</span>`
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