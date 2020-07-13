import settings from '../config/settings';
import storage from '../config/storage';

export async function getUserNotes() {
  return fetch(settings.API_URL + `user/notes/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: await storage.getItem('token'),
    },
  }).then((response) => response.json());
}


export async function getUserBooksNotes() {
  return fetch(settings.API_URL + `user/book-notes/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: await storage.getItem('token'),
    },
  }).then((response) => response.json());
}


export async function addUserNotes(note) {
  return fetch(settings.API_URL + `user/notes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: await storage.getItem('token'),
    },
    body: JSON.stringify({ note }),
  }).then((response) => response.json());
}

export async function deleteUserNotes(note) {
  return fetch(settings.API_URL + `user/notes/${note.id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: await storage.getItem('token'),
    },
    body: JSON.stringify({ note }),
  }).then((response) => response.json());
}


export async function deleteUserBooksNotes(note) {
  return fetch(settings.API_URL + `books/${note?.book?.id}/notes/${note.id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: await storage.getItem('token'),
    },
    body: JSON.stringify({ note }),
  }).then((response) => response.json());
}