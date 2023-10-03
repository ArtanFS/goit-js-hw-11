import { fetchByTitle } from './api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// const refs = {
//   select: document.querySelector('.breed-select'),
//   catInfo: document.querySelector('.cat-info'),
//   loader: document.querySelector('.loader'),
//   error: document.querySelector('.error'),
// };

// refs.select.classList.toggle('visually-hidden');
// refs.error.classList.toggle('visually-hidden');

fetchByTitle('cat')
  .then(data => {
    // refs.select.innerHTML = createList(data);
    // refs.select.classList.toggle('visually-hidden');
    // refs.loader.classList.toggle('visually-hidden');
    console.log(data);
  })
  .catch(err => {
    // refs.loader.classList.toggle('visually-hidden');
    errMsg();
  });

// refs.select.addEventListener('change', e => {
//   refs.catInfo.classList.toggle('visually-hidden');
//   refs.loader.classList.toggle('visually-hidden');
//   fetchCatByBreed(e.target.value)
//     .then(data => {
//       refs.catInfo.innerHTML = createMarkup(data);
//       refs.catInfo.classList.toggle('visually-hidden');
//       refs.loader.classList.toggle('visually-hidden');
//     })
//     .catch(err => {
//       refs.catInfo.classList.toggle('visually-hidden');
//       refs.loader.classList.toggle('visually-hidden');
//       errMsg();
//     });
// });

// function createList(arr) {
//   const list = arr
//     .map(({ id, name }) => `<option value="${id}">${name}</option>`)
//     .join('');
//   return '<option data-placeholder="true"></option>' + list;
// }

// function createMarkup(arr) {
//   return arr
//     .map(
//       ({
//         url,
//         breeds: [{ name, description, temperament }],
//       }) => `<img src="${url}" alt="${name}" height="360"/>
//              <div class="cat-desc">
//                <h1 class="cat-title">${name}</h1>
//                <p class="cat-text">${description}</p>
//                <p class="cat-text"><b>Temperament: </b>${temperament}</p>
//              </div>`
//     )
//     .join('');
// }

function errMsg() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!', {
    position: 'center-top',
    width: '600px',
    fontSize: '24px',
    timeout: 5000,
    useIcon: false,
  });
}
