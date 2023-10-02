import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';
axios.defaults.headers.common['x-api-key'] =
  'live_tzjAClXPRCiEccb3Rt2X6PNjz3Orc6Q6YWcRggnk18wgROVvLRzhuFoBYNNSWNOu';

export function fetchBreeds() {
  return axios.get('breeds').then(resp => {
    return resp.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`images/search?breed_ids=${breedId}`).then(resp => {
    return resp.data;
  });
}
