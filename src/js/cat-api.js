import Notiflix from 'notiflix';
const taskURL = 'https://api.thecatapi.com/v1';
const keyAPI = 'live_JFdKUiXjxtA7c04F8PmYcxcR6kXmZcouPK1pRumR9hppi2XhZmmqkxDfGDsjtq4Q';

const refs = {
     selectBreed : document.querySelector('.breed-select'),
     catInfo : document.querySelector('.cat-info'),
     spinLoader : document.querySelector('.loader'),
     messageLoader : document.querySelector('.loader-msg'),
     messageError: document.querySelector('.error'),
}
// Напиши функцию fetchBreeds() которая делает HTTP-запрос
// и возвращает промис с массивом пород - результатом запроса.
onInformLoading()

function fetchBreeds(url) {
  onInformLoading()
  return fetchBreed(url)
        .then((response) => {
          breedSelect(response);
          onInformLoading()
          return ; 
        })
        .catch(() => onError());
       };

function fetchBreed(url) {
    
    return fetch(url)
        .then((response) => {
            return response.json();                        
        })
        .catch(() => onError());
};

// Для помилки
function onError() {
     Notiflix.Notify.failure('Qui timide rogat docet negare');
};

function breedSelect(breeds) {
    const markupSelectCats =breeds.map(cat => {
                return `<option value="${cat.id}">${cat.name}</option>`
            }).join('');
    refs.selectBreed.insertAdjacentHTML('afterbegin', markupSelectCats);
    new SlimSelect({
  select: '#single'
})
    return;
};

// Напиши функцию fetchCatByBreed(breedId) которая ожидает идентификатор породы, делает
// HTTP - запрос и возвращает промис с данными о коте - результатом запроса.

function fetchCatByBreed(breedId) {
  onInformLoading2()
    return fetchBreed(`${taskURL}/images/search?breed_ids=${breedId}&api_key=${keyAPI}`)
        .then((response) => {
          infoCatBreed(...response);
          onInformLoading2()
          return;
          
        })
    .catch(() => onError());
  
};


function infoCatBreed(cat) {
    const markupInfoCatBreed = `<img src="${cat.url}" alt='cat' width=480><div class="info-CatBreed">
    <p class='title-cat'> ${cat.breeds[0].name}</p>
    <p> ${cat.breeds[0].description} </p>
    <p><span class='cat-temp'>Temperament:</span> ${cat.breeds[0].temperament}</p></div>`;
  return refs.catInfo.innerHTML = markupInfoCatBreed;
  refs.messageLoader.classList.toggle('is-hidden');
  refs.spinLoader.classList.toggle('is-hidden');
};

// ховає інфу про загрузку та помилку
function onInformLoading() {
  refs.messageLoader.classList.toggle('is-hidden');
  refs.spinLoader.classList.toggle('is-hidden');
  // refs.messageError.classList.toggle('is-hidden');
  refs.selectBreed.classList.toggle('is-hidden');
};

// ховає селект показує лоадер та інфу про загрузку
function onInformLoading2() {
   refs.messageLoader.classList.toggle('is-hidden');
  refs.spinLoader.classList.toggle('is-hidden');
  refs.catInfo.classList.toggle('is-hidden');
  // refs.selectBreed.classList.toggle('is-hidden');
};


export { fetchBreeds, fetchCatByBreed };

