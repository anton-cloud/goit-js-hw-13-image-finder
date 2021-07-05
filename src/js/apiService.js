export let beforeSearchQueryBefore = '';
export let page = 1;

export function fetchImages(searchQuery) {
  if (searchQuery === beforeSearchQueryBefore) {
    page += 1;
  } else {
    beforeSearchQueryBefore = searchQuery;
    page = 1;
  }
  const API_KEY = '22368183-bf812a4cdd1e1ebd2a0bd646c';
  const BASE_URL = 'https://pixabay.com/api/';
  const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${API_KEY}`;

  return fetch(url)
    .then(response => {
      if (response.status === 200) return response.json();
      else return Promise.reject('REQUEST ERROR');
    })
    .catch(error => {
      throw new Error(error);
    });
}
