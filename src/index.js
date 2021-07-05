import './sass/main.scss';
import createMarkup from './templates/createMarkup.hbs';
import { beforeSearchQueryBefore, fetchImages } from './js/apiService.js';

// ================================
function cleanGallery() {
  refs.gallery.innerHTML = '';
}

function showBtn() {
  refs.button.classList.remove('is-hidden');
}

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  button: document.querySelector('.button'),
};

refs.form.addEventListener('submit', onClickEnter);
refs.button.addEventListener('click', onClickBtn);

function onClickEnter(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const searchQuery = form.elements.query.value;
  if (!searchQuery) {
    return;
  }
  if (searchQuery === beforeSearchQueryBefore) {
    cleanGallery();
  }
  return fetchImages(searchQuery).then(data => renderImages(data.hits));
}

function onClickBtn(e) {
  setTimeout(() => {
    refs.gallery.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, 1000);

  return fetchImages(beforeSearchQueryBefore).then(data => renderImages(data.hits));
}

function renderImages(data) {
  showBtn();
  console.log();
  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data));
}
