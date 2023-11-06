import { renderDialog } from "./dialog.js";

const TariffsDetails = {
    1: ['LANDING', 'A landing page is a simple one-page website that represents something, a product or service, or in general specifically you <h2>DEADLINES</h2> From 3 to 14 days'],
    2: ['CUSTOM', 'If your desires do not fit into the framework, you have come to the right place, just tell us your desires and we will immediately proceed to the realization of your dream, the price may vary greatly, we will tell you the final cost when we agree on the site <h2>DEADLINES</h2> From 3 to 21 days'],
    3: ['COMMERCE', 'Nowadays, all the money is on the Internet, I will help you set up a revenue stream in your hands <h2>DEADLINES</h2> From 7 to 21 days']
};

function renderDialogByDialogId(id) {
    renderDialog(TariffsDetails[id][0], TariffsDetails[id][1])
}

window.renderDialogByDialogId = renderDialogByDialogId;
