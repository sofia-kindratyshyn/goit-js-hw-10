import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('form');

form.addEventListener('submit', onHandleSubmit);

function onHandleSubmit(event) {
  event.preventDefault();
  const delay = form.elements.delay.value;
  const promise = new Promise((resolve, reject) => {
    const state = form.elements.state.value;

    setTimeout(() => {
      if (state == 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(value => {
      iziToast.success({
        position: 'topCenter',
        title: 'OK',
        message: value,
      });
    })
    .catch(error => {
      iziToast.error({
        position: 'topCenter',
        message: error,
      });
    });
}
