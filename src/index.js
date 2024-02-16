import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
const loading = document.querySelector(".loader");
const select = document.querySelector(".breed-select");
const divCatInfo = document.querySelector(".cat-info");
const errorInfo = document.querySelector(".error");


loading.classList.remove("hidden");
select.classList.add("hidden");
errorInfo.classList.add("hidden");


const dataToSelect = (data => {
 const childresSelect = data.map(({ id, name }) => {
    var opt = document.createElement('option');
    opt.value = id;
    opt.innerHTML = name;
   select.appendChild(opt);
   
 });
  loading.classList.add("hidden");
  select.classList.remove("hidden");
});

const catInfo = (dataCat => {
  // loading.classList.add("hidden");
  
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
  <img class="imgCats" src="${url}" alt="${name}"  >
  <div class="container">
  <p><strong>Temperament: </strong>${temperament}</p>
  <p><strong>Description: </strong>${description}</p>
  </div>
</div>
    `
  );
  loading.classList.add("hidden");
  
  // select.classList.remove("hidden");
});




try {
  // loader.classList.remove('hidden');
  // select.classList.add("hidden");
  // divCatInfo.classList.add("hidden");
  fetchBreeds().then(data => dataToSelect(data));
} catch (error) {
  console.log(error);
}

select.addEventListener('change', changeSelect => { 
  loading.classList.remove("hidden");
  divCatInfo.classList.add("hidden")
  console.log(changeSelect.target.value);
  try {
     fetchCatByBreed(changeSelect.target.value).then(data => catInfo(data));
  } catch (error) {
    console.log(error);
  }
 
});

    // <h2>${name}</h2>
    // <img src="${url}" alt="${name}" width=300px>
    // <p><strong>Temperament: </strong>${temperament}</p>
    // <p><strong>Description</strong>${description}</p>
