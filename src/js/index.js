
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import "../css/loader.css";

const taskURL = 'https://api.thecatapi.com/v1';
const keyAPI = 'live_JFdKUiXjxtA7c04F8PmYcxcR6kXmZcouPK1pRumR9hppi2XhZmmqkxDfGDsjtq4Q';


const selectBreed = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const spinLoader = document.querySelector('.loader');
const messageLoader = document.querySelector('.loader-msg');
const messageError = document.querySelector('.error');

// const refs = {
//      selectBreed : document.querySelector('.breed-select'),
//      catInfo: document.querySelector('.cat-info'),
//      spinLoader : document.querySelector('.loader'),
//      messageLoader : document.querySelector('.loader-msg'),
//      messageError: document.querySelector('.error'),
// }


spinLoader.style.display = 'block';
messageLoader.style.display = 'block';
messageError.style.display = 'none';

let arrayBreedsCats = [];

function breedSelect(response) {
    for(let breed in response) {
        arrayBreedsCats.push({name: response[breed].name, id: response[breed].id})
    }
}

// function breedSelect(breeds) {
//     const markupSelectCats = breeds.map(cat => {
//                 return `<option value="${cat.id}">${cat.name}</option>`
//             }).join('');
//     refs.selectBreed.insertAdjacentHTML('afterbegin', markupSelectCats);
//     new SlimSelect({
//   select: '#single'
// })
//     return;
// };

async function getBreeds() {
    try {
        const response = await fetchBreeds();
        breedSelect(response);
        let listOfBreeds = arrayBreedsCats.map(cat => {
            let optionCat = document.createElement('option');
            optionCat.value = cat.id;
            optionCat.textContent = cat.name;
            return optionCat;
        });
        messageLoader.style.display = 'none';
        spinLoader.style.display = 'none';
        selectBreed.append(...listOfBreeds);
        new SlimSelect({
  select: selectBreed,
  settings: {
    placeholderText: 'Choose the your favourite breed cat',
    allowDeselect: true,
    maxSelected: 1,
  },
});  
    } catch (error) {
        Notiflix.Notify.failure(messageError.textContent);
        throw error; 
    }
}

getBreeds();




// function onChoiceCatBreed(event) {
//     const choiceBreed = event.target.value;
//     return fetchCatByBreed(choiceBreed);
       
// };


function getDataAboutBreed(dataBreed) {
    const name = dataBreed[0].breeds[0].name;
    const description = dataBreed[0].breeds[0].description;
    const temperament = dataBreed[0].breeds[0].temperament;
    const image = dataBreed[0].url;

    return {'name': name, 'description': description, 'temperament': temperament, 'image': image}
}

function showBreed(returnedPromise) {
    const dataBreed = getDataAboutBreed(returnedPromise);
    const {name, description, temperament, image} = dataBreed;

    const markupInfoBreed = `<img src="${image}" alt="${name}" width="480" class="image"><h1>${name}</h1><p class="description">${description}</p><p class="temperament"><b class="title-temperament">Temperament: </b>${temperament}</p>`
    catInfo.innerHTML = markupInfoBreed;
    messageLoader.style.display = 'none';
    spinLoader.style.display = 'none';
}

async function onChoiceCatBreed(event) {
    
    try {
        const breedId = selectBreed.options[selectBreed.selectedIndex].value;
        selectBreed.style.display = 'none';
        catInfo.style.display = 'none';
        messageLoader.style.display = 'block';
        spinLoader.style.display = 'block';
        const returnedPromise = await fetchCatByBreed(breedId, messageError, messageLoader, spinLoader, selectBreed);
        showBreed(returnedPromise);
        catInfo.style.display = 'block';
        selectBreed.style.display = 'none';
        
    } catch (error) {
        Notiflix.Notify.failure(messageError.textContent);
        messageLoader.style.display = 'none';
        spinLoader.style.display = 'none';
        selectBreed.style.display = 'block';
    }
}

selectBreed.addEventListener('change', onChoiceCatBreed);