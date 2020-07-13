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

export async function verify_email(form) {
    return fetch(settings.API_URL + `accounts/verify-email/${form.code}/`, {
        method: 'PUT',
        headers: {
            accept: 'application/json',
            Authorization: await storage.getItem('token'),
        },
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
    return fetch(settings.API_URL + 'user/', {
        method: 'Get',
        headers: {
            Authorization: await storage.getItem('token'),
            accept: 'application/json',
        },
    }).then(response => response.json());

}

export async function user_logout() {
    return fetch(settings.API_URL + 'accounts/logout/', {
        method: 'POST',
        headers: {
            Authorization: await storage.getItem('token'),
            accept: 'application/json',
        },
    }).then(response => response.json());

}

export async function get_user_books() {
    return fetch(settings.API_URL + `user/books`, {
        method: 'Get',
        headers: {
            accept: 'application/json',
            Authorization: await storage.getItem('token'),
        },
    }).then((response) => response.json());
}

export async function support_api(form) {
    return fetch(settings.API_URL + 'support/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: await storage.getItem('token'),
        },
        body:JSON.stringify(form)
    }).then((response) => response.json());
}

