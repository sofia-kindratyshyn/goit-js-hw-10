import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const input = document.getElementById('datetime-picker');
const button = document.querySelector('button');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let userSelectedDate;

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    if (userSelectedDate < Date.now()) {
      button.disabled = true;
      iziToast.error({
        position: 'topCenter',
        message: 'Please choose a date in the future',
      });
    } else {
      button.disabled = false;
      button.classList.add('active');
    }
  },
});

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

function addLeadingZero(value) {
  value = String(value);
  if (value.length < 2) {
    return value.padStart(2, '0');
  } else {
    return value;
  }
}

button.addEventListener('click', onHandleClick);

function onHandleClick() {
  button.classList.remove('active');
  if (userSelectedDate < Date.now()) {
    iziToast.error({
      position: 'topCenter',
      message: 'Please choose a date in the future',
    });
    button.disabled = true;
  }

  const intervalId = setInterval(countDownFunc, 1000);
  countDownFunc();

  function countDownFunc() {
    let timeLeft = userSelectedDate - Date.now();
    let newTimeLeft = (timeLeft -= 1000);
    let { days, hours, minutes, seconds } = convertMs(newTimeLeft);
    setTimerDisplay(days, hours, minutes, seconds);
    button.disabled = true;
    input.disabled = true;

    if (timeLeft <= 0) {
      clearInterval(intervalId);
      setTimerDisplay(0, 0, 0, 0);
      button.disabled = false;
      input.disabled = false;
      return;
    }
  }

  function setTimerDisplay(d, h, m, s) {
    days.textContent = addLeadingZero(d);
    hours.textContent = addLeadingZero(h);
    minutes.textContent = addLeadingZero(m);
    seconds.textContent = addLeadingZero(s);
  }
}
