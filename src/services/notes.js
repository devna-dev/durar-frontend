import settings from '../config/settings';
import storage from '../config/storage';

export async function getUserNotes() {
  return fetch(settings.API_URL + `user/notes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: await storage.getItem('token'),
    },
  }).then((response) => response.json());
}