const landing = document.getElementById('landing');
const commerce = document.getElementById('commerce');
const custom = document.getElementById('custom');

function onHoverOffer(event) {
    event.currentTarget.classList.toggle('list-item-hovered');
}

[landing, commerce, custom].forEach((item) => item.addEventListener('mouseover', onHoverOffer));
[landing, commerce, custom].forEach((item) => item.addEventListener('mouseout', onHoverOffer));
