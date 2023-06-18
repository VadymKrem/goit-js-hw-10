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
        breed_ids: breedId,
        api_key: keyAPI,
    });
    return (taskUrlApi + searchParametres.toString());
}

function fetchCatByBreed(breedId, messageError, messageLoader, spinLoader, selectBreed) {       
    const urlBreedCat = onBuildUrl(breedId);
    return fetch(urlBreedCat)
    .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
          
        }
        return response.json();
      })
    .catch(error => {
        Notiflix.Notify.failure(messageError.textContent);
        spinLoader.style.display = 'none';
        messageLoader.style.display = 'none';
        selectBreed.style.display = 'block';
        throw error;
    })

}

export { fetchBreeds, fetchCatByBreed }
