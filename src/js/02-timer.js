'use strict';
import Notiflix from 'notiflix';
// Opisany w dokumentacji
import flatpickr from 'flatpickr';
// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';

const myInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');
const stopBtn = document.querySelector('#close-btn');

const daysField = document.querySelector('span[data-days]');
const hoursField = document.querySelector('span[data-hours]');
const minutesField = document.querySelector('span[data-minutes]');
const secondsField = document.querySelector('span[data-seconds]');

startBtn.disabled = true;
let timerId = null;
//zmienna dates przechowuje różnice dat w ms
let dates = 0;

//funkcja do dodawania 0 do licznika gdy ilość znaków bedzie mniejsza od 2
function addLeadingZero(value) {
  if (value.length < 2) {
    return value.padStart(2, '0');
  }

  return value;
}

//funkcja do zamieniania ms na datę d/h/m/s
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//obiekt ustawień dla kalendarza + metoda onClose() która sprawdza czy data jest z przeszłości
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    clearInterval(timerId);
    console.log(selectedDates[0]);
    dates = selectedDates[0].getTime() - options.defaultDate.getTime();

    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

//Event dla przycisku start który rozpoczyna odliczanie, nadaje wartości dla pól zegara załączając funkcje do dodawania 0 do stringa
const counterHandler = () => {
  console.log('stoper działa');
  startBtn.disabled = true;
  timerId = setInterval(() => {
    let date = convertMs(dates);
    console.log('odliczanie 1s');

    const { days, hours, minutes, seconds } = date;

    daysField.textContent = addLeadingZero(days.toString());
    hoursField.textContent = addLeadingZero(hours.toString());
    minutesField.textContent = addLeadingZero(minutes.toString());
    secondsField.textContent = addLeadingZero(seconds.toString());

    dates -= 1000;
    console.log(dates);
    if (dates <= 0) {
      clearInterval(timerId);
    }
  }, 1000);
};
//inicjalizacja kalendarza flatpickr
const fp = flatpickr(myInput, options); // flatpickr

startBtn.addEventListener('click', counterHandler);
stopBtn.addEventListener('click', () => {
  console.log('czas zatrzymany');
  clearInterval(timerId);
  startBtn.disabled = false;
});
