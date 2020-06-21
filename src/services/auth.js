import settings from '../config/settings';

export function user_login(form) {
  return fetch(settings.API_URL + 'accounts/login/', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  }).then((response) => response.json());
}

export function user_forget(form) {
  return fetch(settings.API_URL + 'accounts/password/reset/', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  }).then((response) => response.json());
}

export function user_register(form) {
  console.log('form //////////// \n', JSON.stringify(form));
  return fetch(settings.API_URL + 'accounts/registration/', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  }).then((response) => response.json());
}
