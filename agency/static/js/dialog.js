const dialog = document.getElementById('dialog');
const dialogHeader = document.getElementById('dialog-window-header');
const dialogText = document.getElementById('dialog-window-text');

let renderedNow = false;

export function renderDialog(header, text) {
    disableDarkDialogTheme();

    if (renderedNow) {
        changeDialogDisplay();
    } else {
        console.log(header, text);
        setDialogHTML(header, text);
        changeDialogDisplay();
    }

    console.log(renderedNow);
}

export function toggleDarkDialogTheme() {
    dialog.classList.toggle('dark');
}

function disableDarkDialogTheme() {
    dialog.classList.remove('dark');
}

export function setDialogHTML(header, text) {
    setDialogHeaderHTML(header);
    setDialogTextHTML(text);
}

export function truncateDialogHTML() {
    setDialogHeaderHTML('');
    setDialogTextHTML('');
}

export function setDialogHeaderHTML(header) {
    dialogHeader.innerHTML = header;
}

export function setDialogTextHTML(text) {
    dialogText.innerHTML = text;
}

export function changeDialogDisplay() {
    document.body.classList.toggle('nonscroll');
    dialog.classList.toggle('hidden');

    renderedNow = !renderedNow;
}

window.changeDialogDisplay = changeDialogDisplay;