const startBtn = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');

const refs = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

let intervalId;

startBtn.addEventListener('click', () => {
    const selectedDate = new Date(dateInput.value).getTime();

    intervalId = setInterval(() => {
        const now = Date.now();
        const diff = selectedDate - now;

        if (diff <= 0) {
            clearInterval(intervalId);
            updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

        const time = convertMs(diff);
        updateTimer(time);
    }, 1000);
});

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor((ms % hour) / minute);
    const seconds = Math.floor((ms % minute) / second);

    return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
    refs.days.textContent = String(days).padStart(2, '0');
    refs.hours.textContent = String(hours).padStart(2, '0');
    refs.minutes.textContent = String(minutes).padStart(2, '0');
    refs.seconds.textContent = String(seconds).padStart(2, '0');
}