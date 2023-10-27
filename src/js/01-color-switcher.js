const bodyEl = document.querySelector('body');
const startBtnEl = document.querySelector('button[data-start]');
const stoptBtnEl = document.querySelector('button[data-stop]');

let timerId = null;

function ClickBtnStart() {
    startBtnEl.disabled = true;

    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

startBtnEl.addEventListener('click', ClickBtnStart);


function ClickBtnStop() {
    clearInterval(timerId);
    startBtnEl.disabled = false;
}

stoptBtnEl.addEventListener('click', ClickBtnStop);


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

