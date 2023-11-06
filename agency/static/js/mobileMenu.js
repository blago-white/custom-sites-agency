let expanded = false;
const mobileMenu = document.getElementsByClassName('small-main-text')[0];

function rotateArrow(arrow) {
    arrow.style.transform = expanded ? "rotate(0deg)" : "rotate(180deg)";
}

function expandMenu(event) {
    rotateArrow(event.target)

    if (!expanded) {
        mobileMenu.style.background = '#242424';
        mobileMenu.style.mixBlendMode = 'normal';
        document.getElementById('mobile-menu-list').style.display = 'flex';
        setTimeout(
            () => {
                document.getElementById('mobile-header-top-text').style.opacity = '.0';
                document.getElementById('mobile-menu-list').style.opacity = '1';
                document.getElementsByClassName('secondary-mobile-menu-text')[0].style.opacity = '0';
            },
            '500'
        )
    } else {
        setTimeout(
            () => {
                mobileMenu.style.background = 'transparent';
                mobileMenu.style.mixBlendMode = 'exclusion';
                document.getElementById('mobile-menu-list').style.display = 'none';
            }, '500'
        )
        setTimeout(
            () => {
                document.getElementById('mobile-header-top-text').style.opacity = '1';
                document.getElementById('mobile-menu-list').style.opacity = '0';
                document.getElementsByClassName('secondary-mobile-menu-text')[0].style.opacity = '1';
            },
            '50'
        )
    }

    setTimeout(
        () => {
            mobileMenu.style.height = expanded ? '1.2ch' : 'calc(100vh + 1px)';
            expanded = !expanded;
        }, '500'
    )

    if (!expanded) {
        mobileMenu.animate(
            [{'height': 'calc(100vh + 1px)'}],
            {'duration': 500, 'easing': 'ease'}
        )
    } else {
        console.log(123);
        mobileMenu.animate(
            [{'height': '1.2ch'}],
            {'duration': 500, 'easing': 'ease'}
        )
    }
}