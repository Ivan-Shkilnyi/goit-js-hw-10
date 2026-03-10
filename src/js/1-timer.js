import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Елементи DOM
const startBtn = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');
const refs = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let intervalId = null;

// Ініціалізація flatpickr
flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const now = new Date();
        const pickedDate = selectedDates[0];

        if (!pickedDate) return;

        if (pickedDate <= now) {
            startBtn.disabled = true;
            userSelectedDate = null;

            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topRight',
            });

            return;
        }

        userSelectedDate = pickedDate;
        startBtn.disabled = false;
    },
});

// Запуск таймера
startBtn.addEventListener("click", () => {
    if (!userSelectedDate) return;

    // Блокуємо input та кнопку Start
    startBtn.disabled = true;
    dateInput.disabled = true;

    intervalId = setInterval(() => {
        const now = new Date();
        const diff = userSelectedDate - now;

        if (diff <= 0) {
            clearInterval(intervalId);
            updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            dateInput.disabled = false; // після завершення можна вибрати нову дату
            return;
        }

        const time = convertMs(diff);
        updateTimer(time);
    }, 1000);
});

// Функція convertMs (дано)
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

// Функція для додавання провідного нуля
function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

// Оновлення DOM
function updateTimer({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}