import axios from 'axios';

export function fetchByTitle(title) {
  return axios({
    baseURL: 'https://pixabay.com/api/',
    params: {
      key: '39799533-be43f3098008d0f2e0b6204fa',
      q: `${title}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  }).then(resp => {
    return resp.data;
  });
}
