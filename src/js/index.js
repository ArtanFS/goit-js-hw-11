import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const refs = {
  form: document.querySelector('#search-form'),
  search: document.querySelector('#search-form input'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.classList.add('visually-hidden');

const param = {
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '39799533-be43f3098008d0f2e0b6204fa',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    q: '',
  },
};

let lightbox = new SimpleLightbox('.photo-card a');

const { params } = param;

async function fetchByTitle(title) {
  params.q = `${title}`;
  const resp = await axios(param);
  return resp.data;
}

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  params.page = 1;
  const searchData = refs.search.value.trim();
  fetchByTitle(searchData)
    .then(data => {
      if (searchData === '' || data.totalHits === 0) {
        refs.loadMoreBtn.classList.add('visually-hidden');
        refs.gallery.innerHTML = '';
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        refs.gallery.innerHTML = createMarkup(data);
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        displayloadMoreBtn(data);
        createSimpleLightBox();
      }
    })
    .catch(err => {
      Notify.failure(
        `Oops! Something went wrong! Try reloading the page! Error: ${err.message}`
      );
    });
});

refs.loadMoreBtn.addEventListener('click', () => {
  params.page += 1;
  fetchByTitle(refs.search.value.trim())
    .then(data => {
      refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data));
      displayloadMoreBtn(data);
      lightbox.destroy();
      createSimpleLightBox();
      smoothScroll();
    })
    .catch(err => {
      Notify.failure(
        `Oops! Something went wrong again! Try reloading the page! Error: ${err.message}`
      );
    });
});

function createMarkup(arr) {
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
              <a href="${largeImageURL}">         
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
              </a>
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

function displayloadMoreBtn({ totalHits }) {
  if (params.page * params.per_page < totalHits) {
    refs.loadMoreBtn.classList.remove('visually-hidden');
  } else {
    refs.loadMoreBtn.classList.add('visually-hidden');
    Notify.failure(
      'We&apos;re sorry, but you&apos;ve reached the end of search results.'
    );
  }
}

function createSimpleLightBox() {
  lightbox = new SimpleLightbox('.photo-card a', {
    closeText: '',
    showCounter: false,
    disableRightClick: true,
  });
}

function smoothScroll() {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
