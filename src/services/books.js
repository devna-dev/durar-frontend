import settings from '../config/settings';
import storage from '../config/storage';
import {queryString} from '../utils/queryString';

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

export async function getBookDetailApi(payload) {
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

export async function search_resultApi(payload) {
  const query = queryString(payload);
  return fetch(settings.API_URL + `books/${query ? '?' + query : ''}`, {
    method: 'Get',
    headers: {
      accept: 'application/json',
    },
  }).then((response) => response.json());
}
