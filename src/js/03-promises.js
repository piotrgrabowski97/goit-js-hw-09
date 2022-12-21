'use strict';
import Notiflix from 'notiflix';
const form = document.querySelector('.form');
const createPromisesBtn = document.querySelector(".form button")

let promiseNumber = 1;
let timerId = null;
let dataPromise = {
  position: '',
  delay: '',
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    dataPromise = {
      position: position,
      delay: delay,
    };
    if (shouldResolve) {
      // Fulfill
      resolve(dataPromise);
    } else {
      // Reject
      reject(dataPromise);
    }
  });
}
//funkcja do wyświetlania komunikatu permise. funkcja przyjmuje numer permise oraz delay po jakim została wywołana
const promiseResult = (promiseNumber, delayVal) => {
  createPromise(promiseNumber, Number(delayVal))
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
};

const submitPromise = event => {
  createPromisesBtn.disabled = true;
  console.log('aktywacja submit');
  event.preventDefault();
  //zmienna kontrolująca numer pętli
  let n = 0;
  const {
    elements: { delay, step, amount },
  } = form;
  let delayVal = Number(delay.value);

  setTimeout(() => {
    //wywołanie fukcji to wyświetlania komunikatu o permise
    promiseResult(promiseNumber, delayVal);

    //licznik do komunikatu permise: delay
    delayVal += Number(step.value);
    n++;

    //licznik do komunikatu permise: position
    promiseNumber++;

    //interwal wykonujący się tyle razy ile amount
    timerId = setInterval(() => {
      //wywołanie fukcji to wyświetlania komunikatu o permise
      promiseResult(promiseNumber, delayVal);

      n++;
      promiseNumber++;
      //zatrzymywanie pętli gdy osiągnie amount number
      if (n === Number(amount.value)) {
        clearInterval(timerId);
        createPromisesBtn.disabled = false;
      }
      delayVal += Number(step.value);
    }, Number(step.value));
  }, Number(delay.value));
};
form.addEventListener('submit', submitPromise);
