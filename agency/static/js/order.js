import { setDialogTextHTML,
         setDialogHTML,
         changeDialogDisplay,
         truncateDialogHTML,
         toggleDarkDialogTheme,
         toggleToxicDialogTheme } from "./dialog.js";

const HTMLOrderForm = `<form>
    <span id='order-form-text'>
        <span>GET<img src='/static/img/filled-arrow.png' id='submit-order'></span>CONSULTATION</span>
        <div><img src='/uploads/img/arrow.png'>
            <div style='width: auto' contenteditable='true' id='mailform' oninput='onInputEmail(this, event)'>
                your email
            </div>
            <img src='/uploads/img/arrow.png' style='transform: rotate(180deg)'>
        </div>
    </form>`;

let tariffId;

function orderSite(id) {
    toggleDarkDialogTheme();
    truncateDialogHTML();
    setDialogTextHTML(HTMLOrderForm);
    changeDialogDisplay();

    tariffId = id;
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

function onSendOrderRequestSuccess(emailAddres) {
    toggleToxicDialogTheme();
    setDialogHTML("THANK<span style='color: var(--bg-color);padding-left: 0px;'>YOU</span>", "<h3>" + emailAddres + "</h3>We will contact you in the next fewminutes, check your mailbox");
}

async function onOrderSiteSubmit(event, tariffIdFromElement) {
    var formdata = new FormData();
    formdata.append("email", document.getElementById('mailform').innerHTML);
    formdata.append("tariff", tariffId || tariffIdFromElement);

    var requestOptions = {
      method: 'POST',
      headers: {'X-CSRFToken': Cookies.get('csrftoken')},
      body: formdata,
      mode: 'same-origin'
    };

    const response = await fetch("/order/", requestOptions);

    const result = await response;
    const jsonResponse = await result.json();

    if (result.status == 429) {
        setErrorMessage("Too many request, try later (~ 1 day)")
    } else if (result.status == 400) {
        setErrorMessage(jsonResponse.customer ? (
            jsonResponse.customer.email ? jsonResponse.customer.email : result
        ) : jsonResponse.detail)
    } else if (result.status == 201) {
        onSendOrderRequestSuccess(jsonResponse.customer.email);
        tariffId = undefined;
    }
}

function setErrorMessage(message) {
    document.getElementById('mailform').style.color = "crimson";
    document.getElementById('mailform').innerHTML = message;
}

window.orderSite = orderSite;
window.onInputEmail = onInputEmail;
