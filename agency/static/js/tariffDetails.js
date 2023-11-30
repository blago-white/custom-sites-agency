import { renderDialog } from "./dialog.js";

const TariffsDetails = {
    1: ['LANDING', gettext("LandingDetails")],
    2: ['CUSTOM', gettext("CustomDetails")],
    3: ['COMMERCE', gettext("CommerceDetails")]
};

function renderDialogByDialogId(id) {
    renderDialog(TariffsDetails[id][0], TariffsDetails[id][1])
}

window.renderDialogByDialogId = renderDialogByDialogId;
