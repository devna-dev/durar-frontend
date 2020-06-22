import settings from '../config/settings';
import storage from '../config/storage';

export async function getBook() {
  return fetch(settings.API_URL + 'books/', {
    method: 'Get',
    headers: {
      accept: 'application/json',
    },
  }).then((response) => response.json());
}

export async function getCategories() {
  return fetch(settings.API_URL + 'categories/', {
    method: 'Get',
    headers: {
      accept: 'application/json',
    },
  }).then((response) => response.json());
}

export async function getBookDetailApi(payload) {
  console.tron.log(payload);
  return fetch(settings.API_URL + `books/${payload}/`, {
    method: 'Get',
    headers: {
      accept: 'application/json',
    },
  }).then((response) => response.json());
}

export async function getBookCommentsApi(payload) {
  console.tron.log(payload);
  return fetch(settings.API_URL + `books/${payload}/comments/`, {
    method: 'Get',
    headers: {
      accept: 'application/json',
    },
  }).then((response) => response.json());
}
