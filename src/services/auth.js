import settings from '../config/settings';
import storage from '../config/storage';

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
    return fetch(settings.API_URL + 'accounts/registration/', {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    }).then((response) => response.json());
}

export async function user_info(token) {
    console.log(token);
    return fetch(settings.API_URL + 'accounts/user/', {
        method: 'Get',
        headers: {
            Authorization: await storage.getItem('token'),
            accept: 'application/json',
        },
    }).then(response => response.json()).then(pp =>
        console.log(pp)).catch(err => console.log(err));

}
