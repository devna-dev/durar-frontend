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

export async function search_resultApi() {
    return fetch(settings.API_URL + `books/`, {
        method: 'Get',
        headers: {
            accept: 'application/json',
        },
    }).then((response) => response.json());
}

export async function popular_booksApi() {
    return fetch(settings.API_URL + `books/popular/`, {
        method: 'Get',
        headers: {
            accept: 'application/json',
        },
    }).then((response) => response.json());
}


export async function get_current_readApi() {
    return fetch(settings.API_URL + `user/reads/`, {
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
