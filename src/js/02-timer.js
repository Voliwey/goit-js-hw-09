import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtnEl = document.querySelector('button[data-start]');
const inputEl = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtnEl.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] - new Date() > 0) {
            startBtnEl.disabled = false;
        } else {
            Notiflix.Notify.failure('Please choose a date in the future');
        }
    },
};
const fp = flatpickr('#datetime-picker', options);

const timer = {
    start() {
        const dateFuture = new Date(inputEl.value);

        const timerId = setInterval(() => {
            const datePresent = new Date();

            if (dateFuture - datePresent < 1000) {
                this.stop(timerId);
            }

            const convertResult = convertMs(dateFuture - datePresent);

            updateTextContent(convertResult);
        }, 1000);
    },
    stop(id) {
        clearInterval(id);
    },
};

startBtnEl.addEventListener('click', onClickStartBtn);

function onClickStartBtn() {
    inputEl.disabled = true;
    startBtnEl.disabled = true;
    timer.start();
}

function updateTextContent({ days, hours, minutes, seconds }) {
    secondsEl.textContent = seconds;
    minutesEl.textContent = minutes;
    hoursEl.textContent = hours;
    daysEl.textContent = days;
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(
        Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
