import Notiflix from 'notiflix';


// // // Напиши функцию fetchBreeds() которая делает HTTP-запрос
// // // и возвращает промис с массивом пород - результатом запроса.

function fetchBreeds(messageError) {
    let taskURL = 'https://api.thecatapi.com/v1/breeds';
    return fetch(taskURL)
    .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
    .catch(error => Notiflix.Notify.failure(messageError.textContent))
};

// // // Напиши функцию fetchCatByBreed(breedId) которая ожидает идентификатор породы, делает
// // // HTTP - запрос и возвращает промис с данными о коте - результатом запроса.

function onBuildUrl(breedId) {
    const taskUrlApi = 'https://api.thecatapi.com/v1/images/search?';
    const keyAPI = 'live_JFdKUiXjxtA7c04F8PmYcxcR6kXmZcouPK1pRumR9hppi2XhZmmqkxDfGDsjtq4Q';
    const searchParametres = new URLSearchParams({
        breedId: breedId,
        api_key: keyAPI,
    });
    return (taskUrlApi + searchParametres.toString());
}

function fetchCatByBreed(breedId, messageError, messageLoader, spinLoader, breedSelect) {       
    const urlBreedCat = onBuildUrl(breedId);
    return fetch(urlBreed)
    .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
          
        }
        return response.json();
      })
    .catch(error => {
        Notiflix.Notify.failure(messageError.textContent);
        refs.spinLoader.style.display = 'none';
        refs.messageLoader.style.display = 'none';
        refs.selectBreed.style.display = 'block';
        throw error;
    })

}


export { fetchBreeds, fetchCatByBreed }

































// const taskURL = 'https://api.thecatapi.com/v1';
// const keyAPI = 'live_JFdKUiXjxtA7c04F8PmYcxcR6kXmZcouPK1pRumR9hppi2XhZmmqkxDfGDsjtq4Q';
// import SlimSelect from 'slim-select';

// const refs = {
//      selectBreed : document.querySelector('.breed-select'),
//      catInfo : document.querySelector('.cat-info'),
//      spinLoader : document.querySelector('.loader'),
//      messageLoader : document.querySelector('.loader-msg'),
//      messageError: document.querySelector('.error'),
// }
// // // Напиши функцию fetchBreeds() которая делает HTTP-запрос
// // // и возвращает промис с массивом пород - результатом запроса.



// function fetchBreeds(url) {
//   onLoadingInfo()
//   return fetchBreed(url)
//         .then((response) => {
//           breedSelect(response);
//           onLoadingInfo()
//           return ; 
//         })
//         .catch(() => onError());
//        };

// function fetchBreed(url) {
    
//     return fetch(url)
//         .then((response) => {
//             return response.json();                        
//         })
//         .catch(() => onError());
// };

// // Для помилки
// function onError() {
//      Notiflix.Notify.failure('Qui timide rogat docet negare');
// };

// function breedSelect(breeds) {
//     const markupSelectCats =breeds.map(cat => {
//                 return `<option value="${cat.id}">${cat.name}</option>`
//             }).join('');
//     refs.selectBreed.insertAdjacentHTML('afterbegin', markupSelectCats);
//     new SlimSelect({
//   select: '#single'
// })
//     return;
// };


// // // Напиши функцию fetchCatByBreed(breedId) которая ожидает идентификатор породы, делает
// // // HTTP - запрос и возвращает промис с данными о коте - результатом запроса.

// function fetchCatByBreed(breedId) {
//   onInformLoading2()
//     return fetchBreed(`${taskURL}/images/search?breed_ids=${breedId}&api_key=${keyAPI}`)
//         .then((response) => {
//           infoCatBreed(...response);
//           onInformLoading2()
//           return;
          
//         })
//     .catch(() => onError());
  
// };


// function infoCatBreed(cat) {
//     const markupInfoCatBreed = `<img src="${cat.url}" alt='cat' width=480><div class="info-CatBreed">
//     <p class='title-cat'> ${cat.breeds[0].name}</p>
//     <p> ${cat.breeds[0].description} </p>
//     <p><span class='cat-temp'>Temperament:</span> ${cat.breeds[0].temperament}</p></div>`;
//   return refs.catInfo.innerHTML = markupInfoCatBreed;
//   refs.messageLoader.classList.toggle('is-hidden');
//   refs.spinLoader.classList.toggle('is-hidden');
// };

// // ховає інфу про загрузку та помилку
// function onLoadingInfo() {
//   refs.messageLoader.classList.toggle('is-hidden');
//   refs.spinLoader.classList.toggle('is-hidden');
//   refs.messageError.classList.toggle('is-hidden');
//   // refs.selectBreed.classList.toggle('is-hidden');
// };

// // ховає селект показує лоадер та інфу про загрузку
// function onInformLoading2() {
//    refs.messageLoader.classList.toggle('is-hidden');
//   refs.spinLoader.classList.toggle('is-hidden');
//   refs.catInfo.classList.toggle('is-hidden');
//   // refs.selectBreed.classList.toggle('is-hidden');
// };








