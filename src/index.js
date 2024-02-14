import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_BaMWVDpC0ci7VaQwGwH7WaJK3MErBd9T4V70UM7oakWs1AKafzJvhIfbWSFkRWeb";

const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key": "live_BaMWVDpC0ci7VaQwGwH7WaJK3MErBd9T4V70UM7oakWs1AKafzJvhIfbWSFkRWeb"
});

var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};
const select = document.querySelector(".breed-select");

fetch("https://api.thecatapi.com/v1/breeds", requestOptions)
  .then(response => response.json())
  .then(result => {
    result.forEach(element => {
      var opt = document.createElement('option');
      opt.value = element.id;
      opt.innerHTML = element.name;
      select.appendChild(opt);
    });
  })
  .catch(error => console.log('error', error));        

