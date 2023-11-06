import { setDialogTextHTML, changeDialogDisplay, truncateDialogHTML, toggleDarkDialogTheme } from "./dialog.js";

const HTMLOrderForm = "<form><span id='order-form-text'><span>GET<img src='/static/img/filled-arrow.png' id='submit-order'></span>CONSULTATION</span><div><img src='/static/img/arrow.png'><div contenteditable='true' id='mailform' oninput='onInputEmail(this, event)'>your email</div><img src='/static/img/arrow.png' style='transform: rotate(180deg)'></div></form>";

function orderSite() {
    toggleDarkDialogTheme();
    truncateDialogHTML();
    setDialogTextHTML(HTMLOrderForm);
    changeDialogDisplay();
    document.getElementById('submit-order').addEventListener('click', (event) => {onOrderSiteSubmit(event)})
}

function onInputEmail(element, event) {
    element.style.width = "auto";

    if (element.innerHTML.length > 29) {
        element.innerHTML = element.innerHTML.slice(1, 41);
    }

    if (element.innerHTML.includes("@") && element.innerHTML.length > 4) {
        document.getElementById('submit-order').style.opacity = 1;
        document.getElementById('order-form-text').style = 'color: #242424!important';
    } else {
        document.getElementById('submit-order').style.opacity = 0;
        document.getElementById('order-form-text').style = '';
    }

    if (event.data == " ") {
        element.innerHTML = element.innerHTML.replace(/&nbsp;/g, "");
    }
}

function onOrderSiteSubmit(event) {
    changeDialogDisplay();

    var formdata = new FormData();
    formdata.append("email", document.getElementById('mailform').innerHTML);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    try {
        fetch("#", requestOptions);
    } catch {
        changeDialogDisplay();
        document.getElementById('mailform').style.color = "red";
        document.getElementById('mailform').innerHTML = 'error';
    }

}

window.orderSite = orderSite;
window.onInputEmail = onInputEmail;
