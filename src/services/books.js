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

export async function getAuthors() {
  return fetch(settings.API_URL + 'authors/', {
    method: 'Get',
    headers: {
      accept: 'application/json',
    },
  }).then((response) => response.json());
}
