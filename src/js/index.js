
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import "../css/loader.css";

const taskURL = 'https://api.thecatapi.com/v1';
const keyAPI = 'live_JFdKUiXjxtA7c04F8PmYcxcR6kXmZcouPK1pRumR9hppi2XhZmmqkxDfGDsjtq4Q';

const refs = {
     selectBreed : document.querySelector('.breed-select'),
     catInfo: document.querySelector('.cat-info'),
     spinLoader : document.querySelector('.loader'),
     messageLoader : document.querySelector('.loader-msg'),
     messageError: document.querySelector('.error'),
}


refs.spinLoader.style.display = 'none';
refs.messageLoader.style.display = 'none';
refs.messageError.style.display = 'none';

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
        const response = await fetchBreeds(refs.messageError);
        breedSelect(response);
        let listOfBreeds = arrayBreedsCats.map(cat => {
            let optionCat = document.createElement('option');
            optionCat.value = cat.id;
            optionCat.textContent = cat.name;
            return optionCat;
        });
        refs.selectBreed.append(...listOfBreeds);
          
    } catch (error) {
        Notiflix.Notify.failure(refs.messageError.textContent);
        throw error; 
    }
}

getBreeds();


const slimSelect = new SlimSelect({
  select: refs.selectBreed,
  settings: {
    placeholderText: 'Choose the breed of the cat',
    allowDeselect: true,
    maxSelected: 1,
  },
});

// function onChoiceCatBreed(event) {
//     const choiceBreed = event.target.value;
//     return fetchCatByBreed(choiceBreed);
       
// };


function getDataAboutBreed(data) {
    const name = data[0].breeds[0].name;
    const description = data[0].breeds[0].description;
    const temperament = data[0].breeds[0].temperament;
    const image = data[0].url;

    return {'name': name, 'description': description, 'temperament': temperament, 'image': image}
}

function showBreed(promise) {
    const elements = getDataAboutBreed(promise);
    const {name, description, temperament, image} = dataBreed;

    const markupInfoBreed = `<img src="${image}" alt="${name}" class="image"><h1>${name}</h1><p class="description">${description}</p><p class="temperament"><b class="title-temperament">Temperament: </b>${temperament}</p>`
    refs.catInfo.innerHTML = markupInfoBreed;
    refs.messageLoader.style.display = 'none';
    refs.spinLoader.style.display = 'none';
}

async function onChoiceCatBreed(event) {
    
    try {
        const breedIndex = refs.selectBreed.options[refs.selectBreed.selectedIndex].value;
        refs.selectBreed.style.display = 'none';
        refs.catInfo.style.display = 'none';
        refs.messageLoader.style.display = 'block';
        refs.spinLoader.style.display = 'block';
        const promise = await fetchCatByBreed(breedId);
        showBreed(promise);
        refs.catInfo.style.display = 'block';
        refs.selectBreed.style.display = 'block';
        
    } catch (error) {
        Notiflix.Notify.failure(refs.messageError.textContent);
        refs.messageLoader.style.display = 'none';
        refs.spinLoader.style.display = 'none';
        refs.selectBreed.style.display = 'block';
    }

}





refs.selectBreed.addEventListener('change', onChoiceCatBreed);

// const breedId = refs.selectBreed.options[refs.selectBreed.selectedIndex].value;