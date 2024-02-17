import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_BaMWVDpC0ci7VaQwGwH7WaJK3MErBd9T4V70UM7oakWs1AKafzJvhIfbWSFkRWeb";


export const fetchBreeds = () => {
    
    return axios.get(`https://api.thecatapi.com/v1/breeds`)
        .then(res => res.data)
        .catch(error => error.message);
    
    
};




export const fetchCatByBreed = (breedId) => {

    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(res => res.data[0])
        .catch(error => console.log(error));
};