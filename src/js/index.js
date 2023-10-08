import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const refs = {
  form: document.querySelector('#search-form'),
  search: document.querySelector('#search-form input'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  // error: document.querySelector('.error'),
};

refs.loadMoreBtn.classList.add('visually-hidden');
// refs.error.classList.toggle('visually-hidden');

const param = {
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '39799533-be43f3098008d0f2e0b6204fa',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 5,
    q: '',
  },
};

const { params } = param;

async function fetchByTitle(title) {
  params.q = `${title}`;
  return await axios(param).then(({ data }) => {
    return data;
  });
}

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  fetchByTitle(refs.search.value)
    .then(data => {
      refs.gallery.innerHTML = createMarkup(data);
      loadMore1(data);
    })
    .catch(err => {
      errMsg();
    });
});

refs.loadMoreBtn.addEventListener('click', () => {
  params.page += 1;
  fetchByTitle(refs.search.value)
    .then(data => {
      refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data));
      loadMore1(data);
    })
    .catch(err => {
      errMsg();
    });
});

function foo(value) {}

function loadMore1({ totalHits }) {
  if (params.page * params.per_page < totalHits) {
    refs.loadMoreBtn.classList.remove('visually-hidden');
  } else {
    refs.loadMoreBtn.classList.add('visually-hidden');
  }
}

function createMarkup(arr) {
  // console.log({ total });
  return arr.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
               <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                  <p class="info-item">
                    <b>Likes</b>${likes}
                  </p>
                  <p class="info-item">
                    <b>Views</b>${views}
                  </p>
                  <p class="info-item">
                    <b>Comments</b>${comments}
                  </p>
                  <p class="info-item">
                    <b>Downloads</b>${downloads}
                  </p>
                </div>
             </div>`
    )
    .join('');
}

function errMsg() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!', {
    position: 'center-top',
    width: '600px',
    fontSize: '24px',
    timeout: 5000,
    useIcon: false,
  });
}
