import settings from '../config/settings';
import storage from '../config/storage';
import {queryString} from '../utils/queryString';

export async function getBooks() {
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
  return fetch(
    settings.API_URL +
      `books/${payload.lookupId}/details/?tashkeel=${payload.isWithTashkeel}`,
    {
      method: 'Get',
      headers: {
        accept: 'application/json',
      },
    },
  ).then((response) => response.json());
}

export async function getBookPageContent(payload) {
  return fetch(
    settings.API_URL +
      `books/${payload.lookupId}/view/?tashkeel=${payload.isWithTashkeel}&page=${payload.page}`,
    {
      method: 'Get',
      headers: {
        accept: 'application/json',
      },
    },
  ).then((response) => response.json());
}

export async function getBookApi(payload) {
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
      Authorization: await storage.getItem('token'),
    },
  }).then((response) => response.json());
}

export async function getBookReviewsApi(payload) {
  console.tron.log(payload);
  return fetch(settings.API_URL + `books/${payload}/reviews/`, {
    method: 'Get',
    headers: {
      accept: 'application/json',
      Authorization: await storage.getItem('token'),
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

export async function popular_booksApi() {
  return fetch(settings.API_URL + 'books/popular/', {
    method: 'Get',
    headers: {
      accept: 'application/json',
    },
  }).then((response) => response.json());
}

export async function get_current_readApi() {
  return fetch(settings.API_URL + 'user/reads/', {
    method: 'Get',
    headers: {
      accept: 'application/json',
      Authorization: await storage.getItem('token'),
    },
  }).then((response) => response.json());
}

export async function suggest_to_api(form) {
  return fetch(settings.API_URL + 'user/suggestions/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: await storage.getItem('token'),
    },
    body: JSON.stringify(form),
  }).then((response) => response.json());
}
