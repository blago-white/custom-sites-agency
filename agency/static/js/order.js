import { setDialogTextHTML, changeDialogDisplay, truncateDialogHTML, toggleDarkDialogTheme } from "./dialog.js";

const HTMLOrderForm = "<form><span id='order-form-text'><span>GET<img src='/static/img/filled-arrow.png' id='submit-order'></span>CONSULTATION</span><div><img src='/static/img/arrow.png'><div contenteditable='true' id='mailform' oninput='onInputEmail(this, event)'>your email</div><img src='/static/img/arrow.png' style='transform: rotate(180deg)'></div></form>";

function orderSite() {
    toggleDarkDialogTheme();
    truncateDialogHTML();
    setDialogTextHTML(HTMLOrderForm);
    changeDialogDisplay();
    document.getElementById('submit-order').addEventListener('click', (event) => {onOrderSiteSubmit(event)})
}

function mailaddresIsValid(addres) {
    if ((!addres.includes("@")) || (!addres.split(".")[addres.split(".").length-1])) {
        return false;
    }

    var re = /^\S+@\S+\.\S+$/;

    return re.test(addres);
}

function onInputEmail(element, event) {
    element.style.width = "auto";
    document.getElementById('mailform').style.color = "";

    if (element.innerHTML.length > 29) {
        element.innerHTML = element.innerHTML.slice(1, 30);
    }

    if (mailaddresIsValid(element.innerHTML)) {
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
    var formdata = new FormData();
    formdata.append("email", document.getElementById('mailform').innerHTML);

    var requestOptions = {
      method: 'POST',
      headers: {'X-CSRFToken': Cookies.get('csrftoken')},
      body: formdata,
      mode: 'same-origin'
    };

    fetch("/order/", requestOptions).then(
        (result) => {return result.json()}
    ).then((response) => {
        const result = response;
        const status = response.customer.email == document.getElementById('mailform').innerHTML;

        console.log(response);

        if (!status) {
            document.getElementById('mailform').style.color = "crimson";
            document.getElementById('mailform').innerHTML = result.customer.email;
        } else {
            document.getElementById('mailform').style.color = "#D2FF02";
            document.getElementById('mailform').innerHTML = result.customer.email;
        }
    })
}

window.orderSite = orderSite;
window.onInputEmail = onInputEmail;
