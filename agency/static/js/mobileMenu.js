let expanded = false;
let expandingNow = false;
const mobileMenu = document.getElementsByClassName('small-main-text')[0];


export function expanding() {
    return expandingNow
}

function rotateArrow(arrow) {
    arrow.style.transform = expanded ? "rotate(0deg)" : "rotate(180deg)";
}

function expandMenu(event) {
    rotateArrow(event.target)

    expandingNow = true;

    if (!expanded) {
        mobileMenu.style.background = 'rgb(36, 36, 36, .8)';
        mobileMenu.style.mixBlendMode = 'normal';
        mobileMenu.style.backdropFilter = "blur(.4em)";
        mobileMenu.style['-webkit-backdrop-filter'] = 'blur(.4em)';
        document.getElementById('mobile-menu-list').style.display = 'flex';
        setTimeout(
            () => {
                document.getElementById('mobile-header-top-text').style.opacity = '.0';
                document.getElementById('mobile-menu-list').style.opacity = '1';
                document.getElementsByClassName('copyright-mark')[0].style.opacity = '1';
            },
            '500'
        )
    } else {
        setTimeout(
            () => {
                mobileMenu.style.background = 'transparent';
                mobileMenu.style.mixBlendMode = 'exclusion';
                mobileMenu.style.backdropFilter = "blur(0px)";
                mobileMenu.style['-webkit-backdrop-filter'] = 'blur(0px)';
                document.getElementById('mobile-menu-list').style.display = 'none';
            }, '500'
        )
        setTimeout(
            () => {
                document.getElementById('mobile-header-top-text').style.opacity = '1';
                document.getElementById('mobile-menu-list').style.opacity = '0';
                document.getElementsByClassName('copyright-mark')[0].style.opacity = '0';
            },
            '50'
        )
    }

    setTimeout(
        () => {
            mobileMenu.style.height = expanded ? '1.2ch' : 'calc(100vh + 1px)';

            expanded = !expanded;
            expandingNow = false;
        }, '450'
    )

    if (!expanded) {
        mobileMenu.animate(
            [{'height': 'calc(100vh + 1px)'}],
            {'duration': 500, 'easing': 'ease'}
        )
    } else {
        mobileMenu.animate(
            [{'height': '1.2ch'}],
            {'duration': 500, 'easing': 'ease'}
        )
    }
}

window.expandMenu = expandMenu;