import settings from '../config/settings';

export function user_login(form) {
    return fetch(settings.API_URL + 'accounts/login/', {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    }).then(response => response.json());
}

export function user_forget(form) {
    return fetch(settings.API_URL + 'accounts/password/reset/', {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    }).then(response => response.json());

}

export function user_info(token) {
    return fetch(settings.API_URL + 'accounts/user/', {
        method: 'Get',
        headers: {
            Authorization: 'Bearer ' + token,
            accept: 'application/json',
        },
    }).then(response => response.json());

}
