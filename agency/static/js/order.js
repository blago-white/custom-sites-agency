import { setDialogTextHTML,
         setDialogHTML,
         changeDialogDisplay,
         truncateDialogHTML,
         toggleDarkDialogTheme,
         toggleToxicDialogTheme } from "./dialog.js";

const HTMLOrderForm = `<form id='order-form' onsubmit='return false;'>
        <span id='order-form-text'>
            <span>${gettext('GetEvent')}
            </span>${gettext('GetEventObject')}
        </span>

        <span class='form-description'>
            ${gettext('OrderFormDesscription')}
        </span>

        <div style='height: 1.75em;'>
            <div class='form-field' id='mailform'>
                <label>${gettext("EmailPlaceholder")}</label>
                <input id='email-input' type="email" name="email"/>
            </div>
        </div>
        <button id='submit-order'>${gettext('OrderFormButton')}</button>
    </form>`;

let tariffId;

function orderSite(id) {
    toggleDarkDialogTheme();
    truncateDialogHTML();
    setDialogTextHTML(HTMLOrderForm);
    changeDialogDisplay();

    tariffId = id;
    document.getElementById('submit-order').addEventListener('click', (event) => {onOrderSiteSubmit(event)})
    document.getElementById('submit-order').addEventListener('mouseover', (event) => {
        document.getElementsByClassName('dialog-container')[0].style.border = '5px solid var(--toxic-green-color)'
    })
    document.getElementById('submit-order').addEventListener('mouseout', (event) => {
        document.getElementsByClassName('dialog-container')[0].style.border = '0px'
    })
}

function onSendOrderRequestSuccess(emailAddres) {
    ym(95683576,'reachGoal','email');
    toggleToxicDialogTheme();
    setDialogHTML(gettext('Thanks'), `${gettext('ThanksInfo')}`);
}

async function onOrderSiteSubmit(event, tariffIdFromElement) {
    var formdata = new FormData(document.getElementById('order-form'));
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
    document.getElementById('email-input').style.color = "crimson";
    document.getElementById('email-input').value = message;
}

window.orderSite = orderSite;
window.onInputEmail = onInputEmail;
