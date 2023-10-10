import axios from 'axios';
const params = { per_page: 40 };
const { per_page } = params;

async function getPhotos(query, page) {
  let params = {
    key: '39799533-be43f3098008d0f2e0b6204fa',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: per_page,
    page: `${page}`,
    q: `${query}`,
  };

  const resp = await axios('https://pixabay.com/api/', { params });
  return resp.data;
}

export { per_page, getPhotos };
