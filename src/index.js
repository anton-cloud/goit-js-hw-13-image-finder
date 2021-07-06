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

function hiddenBtn() {
  refs.button.classList.add('is-hidden');
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
  cleanGallery();
  return fetchImages(searchQuery)
    .then(data => renderImages(data.hits))
    .catch(error => {
      throw new Error(error);
    });
}

function onClickBtn(e) {
  return fetchImages(beforeSearchQueryBefore)
    .then(data => renderImages(data.hits))
    .catch(error => {
      throw new Error(error);
    });
}

function renderImages(data) {
  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data));
  data.length === 12 ? showBtn() : hiddenBtn();
  refs.gallery.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
