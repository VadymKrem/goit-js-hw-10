
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css'
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

refs.selectBreed.addEventListener('change', onChoiceCat);

function onChoiceCat(event) {
    const choiceBreed = event.target.value;
    return fetchCatByBreed(choiceBreed);
       
};

fetchBreeds(`${taskURL}/breeds?${keyAPI}`);
    
