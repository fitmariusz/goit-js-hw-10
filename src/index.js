import axios from "axios";
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
const loading = document.querySelector(".load");
const select = document.querySelector(".breed-select");
const divCatInfo = document.querySelector(".cat-info");
const errorInfo = document.querySelector(".error");
loading.classList.remove("hidden");
select.classList.add("hidden");
errorInfo.classList.add("hidden");

const dataToSelect = (data => {
  if (typeof(data) == 'object') {
    const childresSelect = data.map(({ id, name }) => {
      var opt = document.createElement('option');
      opt.value = id;
      opt.innerHTML = name;
      select.appendChild(opt);
    });
    loading.classList.add("hidden");
    select.classList.remove("hidden");
  } else {
    Notiflix.Report.failure('Error 404', data, 'OK');
    loading.textContent = "Error 404";
    document.body.style.background = 'red'
  }

});

const catInfo = (dataCat => {
  if (dataCat != undefined){
    const { url } = dataCat;
    const { description, name, temperament } = dataCat.breeds[0];
    divCatInfo.replaceChildren();
    divCatInfo.classList.remove("hidden");
    divCatInfo.insertAdjacentHTML('beforeend',
    
    `
    <div class="polaroid">
      <div class="container">
        <h2>${name}</h2>
      </div>
      <img class="imgCats" src="${url}" alt="${name}" />
      <div class="container">
        <p><strong>Temperament: </strong>${temperament}</p>
        <p><strong>Description: </strong>${description}</p>
      </div>
    </div>
    `
    );
  loading.classList.add("hidden");
  } else {
    loading.classList.add("hidden");
    Notiflix.Report.failure('Search error.',
      'No description of this cat breed has been found. Please select a different breed.',
      'Ok');
   }
});

try {
  fetchBreeds().then(data => dataToSelect(data));
} catch (error) {
    console.log(error);
}

select.addEventListener('change', changeSelect => { 
    loading.classList.remove("hidden");
    divCatInfo.classList.add("hidden")
    try {
      fetchCatByBreed(changeSelect.target.value).then(data => catInfo(data));
    } catch (error){
      console.log(error);
    
    }
});