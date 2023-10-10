import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkup } from './markup';
import { per_page, getPhotos } from './api';

const refs = {
  form: document.querySelector('#search-form'),
  search: document.querySelector('#search-form input'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let lightbox = new SimpleLightbox('.photo-card a');
let page;
refs.loadMoreBtn.classList.add('visually-hidden');

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const query = refs.search.value.trim();
  if (!query) {
    return Notify.failure('Fill the search form please.');
  }
  page = 1;
  getFirstPage(query);
});

refs.loadMoreBtn.addEventListener('click', () => {
  page += 1;
  const query = refs.search.value.trim();
  getNextPage(query, page);
});

async function getFirstPage(query) {
  try {
    let data = await getPhotos(query, page);
    if (data.totalHits === 0) {
      refs.loadMoreBtn.classList.add('visually-hidden');
      refs.gallery.innerHTML = '';
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      refs.gallery.innerHTML = createMarkup(data);
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
      displayloadMoreBtn(data, page);
      createSimpleLightBox();
      smoothScrollUp();
    }
  } catch (err) {
    Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  }
}

async function getNextPage(query) {
  try {
    let data = await getPhotos(query, page);
    refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data));
    displayloadMoreBtn(data, page);
    lightbox.destroy();
    createSimpleLightBox();
    smoothScroll();
  } catch (err) {
    Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  }
}

function displayloadMoreBtn({ totalHits }, page) {
  if (page * per_page < totalHits) {
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

function smoothScrollUp() {
  window.scrollBy({
    top: -5 * window.innerHeight,
    behavior: 'smooth',
  });
}
