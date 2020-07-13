import settings from '../config/settings';
import storage from '../config/storage';
import {queryString} from '../utils/queryString';
import {Platform} from 'react-native'

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
    console.log(
        settings.API_URL +
        `books/${payload.lookupId}/details/?tashkeel=${payload.isWithTashkeel}`,
    );
    return await fetch(
        settings.API_URL +
        `books/${payload.lookupId}/details/?tashkeel=${payload.isWithTashkeel}`,
        {
            method: 'Get',
            headers: {
                accept: 'application/json',
            },
        },
    )
        .then((response) => response.json())
        .then((response) => ({response}))
        .catch((error) => ({error}));
}

export async function getBookPageContent(payload) {
    return await fetch(
        settings.API_URL +
        `books/${payload.lookupId}/view/?tashkeel=${payload.isWithTashkeel}&page=${payload.page}`,
        {
            method: 'Get',
            headers: {
                accept: 'application/json',
                Authorization: await storage.getItem('token'),
            },
        },
    )
        .then((response) => response.json())
        .then((response) => ({response}))
        .catch((error) => ({error}));
}

export async function getBookApi(payload) {

    return fetch(settings.API_URL + `books/${payload}`, {
        method: 'Get',
        headers: {
            accept: 'application/json',
            Authorization: await storage.getItem('token'),
        },
    }).then((response) => response.json());
}

export async function getBookNotesApi(payload) {
    return fetch(settings.API_URL + `books/${payload}/notes/`, {
        method: 'Get',
        headers: {
            accept: 'application/json',
            Authorization: await storage.getItem('token'),
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => ({response}))
        .catch((error) => ({error}));
}

export async function getBookReviewsApi(payload) {
    // console.tron.log(payload);
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
    console.log(`books/${query ? '?' + query : ''}`);
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

export async function donate_to_api(form) {
    return fetch(settings.API_URL + 'user/suggestions/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: await storage.getItem('token'),
        },
        body: JSON.stringify(form),
    })
        .then((response) => response.json())
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((error) => {
            console.log('error', error);
            return error.response;
        });
}

export async function delete_review_api(book, review) {
    return fetch(settings.API_URL + 'books/' + book + '/reviews/' + review, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: await storage.getItem('token'),
        },
    })
        .then((response) => response.json())
        .then((res) => {
            console.log('delete review', res);
            return res;
        })
        .catch((error) => {
            console.log('error', error);
            return error.response;
        });
}

export async function get_activities_Api(form) {
    return fetch(settings.API_URL + 'activities', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: await storage.getItem('token'),
        },
    }).then((response) => response.json());
}

export async function get_thesisApi(form) {
    return fetch(settings.API_URL + 'activities/thesis', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: await storage.getItem('token'),
        },
    }).then((response) => response.json());
}

export async function get_most_downloaded(page) {
    return fetch(settings.API_URL + 'books/popular/downloads/?page=' + page + '&page_size=10', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: await storage.getItem('token'),
        },
    }).then((response) => response.json())
        .then(response => {
            return response
        })
}

export async function get_activity_seminars_details_api(form) {
    return fetch(settings.API_URL + 'activities/seminars/' + form.form.id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: await storage.getItem('token'),
        },
    }).then((response) => response.json());
}

export async function get_discussion_details(form) {
    return fetch(settings.API_URL + 'activities/discussions/' + form, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: await storage.getItem('token'),
        },
    })
        .then((response) => response.json())
        .then((res) => {
            return res;
        });
}

export async function get_sem_details(form) {
    return fetch(settings.API_URL + 'activities/seminars/' + form, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: await storage.getItem('token'),
        },
    })
        .then((response) => response.json())
        .then((res) => {
            return res;
        });
}

export async function get_discussions_in(form) {
    console.log(form);
    return fetch(
        settings.API_URL +
        'activities/discussions?page=' +
        form +
        '&page_size=' +
        10,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: await storage.getItem('token'),
            },
        },
    ).then((response) => response.json());
}

export async function get_seminar_in(form) {
    console.log('saga', form);
    return fetch(
        settings.API_URL + 'activities/seminars/?page=' + form + '&page_size=' + 10,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: await storage.getItem('token'),
            },
        },
    ).then((response) => response.json());
}

export async function regiter_to_activity(form) {
    let data = new FormData();
    data.append('chat_room', form);
    console.log(form);
    return fetch(settings.API_URL + 'activities/seminars/registration/', {
        method: 'POST',
        headers: {
            accept: 'application/json',
            Authorization: await storage.getItem('token'),
        },
        body: data,
    })
        .then((response) => response.json())
        .then((res) => {
            return res;
        });
}

export async function regiter_to_discussions(form) {
    let data = new FormData();
    data.append('chat_room', form);
    console.log(form);
    return fetch(settings.API_URL + 'activities/discussions/registration/', {
        method: 'POST',
        headers: {
            accept: 'application/json',
            Authorization: await storage.getItem('token'),
        },
        body: data,
    })
        .then((response) => response.json())
        .then((res) => {
            return res;
        });
}

export async function policy() {
    return fetch(settings.API_URL + 'site/policy/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: await storage.getItem('token'),
        },
    })
        .then((response) => response.json())
        .then((res) => {
            return res;
        });
}

export async function get_terms() {
    return fetch(settings.API_URL + 'site/terms/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: await storage.getItem('token'),
        },
    })
        .then((response) => response.json())
        .then((res) => {
            return res;
        });
}

export async function get_books_using_sub_categories(id) {
    return fetch(settings.API_URL + 'books/?category=' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: await storage.getItem('token'),
        },
    })
        .then((response) => response.json())
        .then((res) => {
            return res;
        });
}

export async function get_list_audio_books() {
    return fetch(settings.API_URL + 'books/?has_audio=true', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: await storage.getItem('token'),
        },
    })
        .then((response) => response.json())
        .then((res) => {
            return res;
        });
}

export async function get_audio_books(id) {
    return fetch(settings.API_URL + `books/${id}/audio/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: await storage.getItem('token'),
        },
    })
        .then((response) => response.json())
        .then((res) => {
            return res;
        });
}

export async function post_review_api(payload) {
    //alert(payload.body.comment)
    return fetch(settings.API_URL + `books/${payload.lookupId}/reviews/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: await storage.getItem('token'),
        },
        body: JSON.stringify(payload.body),
    }).then((response) => response.json());
}

export async function add_to_fav(id) {
    return fetch(settings.API_URL + 'user/favorites/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: await storage.getItem('token'),
        },
        body: JSON.stringify({
            book: id,
        }),
    })
        .then((response) => response.json())
        .then((res) => {
            console.log(res);
            return res;
        });
}

export async function share_book(id) {
    //alert(id)
    return fetch(settings.API_URL + 'user/share/Book/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: await storage.getItem('token'),
        },
        body: JSON.stringify({
            book: id,
        }),
    })
        .then((response) => response.json())
        .then((res) => {
            console.log(res);
            return res;
        });
}

export async function get_all_books() {
    return fetch(settings.API_URL + 'books/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: await storage.getItem('token'),
        },
    })
        .then((response) => response.json())
        .then((res) => {
            console.log(res);
            return res;
        });
}

export async function post_notes_api(payload) {
    console.log(payload);
    console.log(settings.API_URL + `books/${payload.lookupId}/notes/`);
    return fetch(settings.API_URL + `books/${payload.lookupId}/notes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: await storage.getItem('token'),
        },
        body: JSON.stringify(payload.body),
    }).then((response) => response.json());
}

export async function search_content_api(payload) {
    console.log(
        settings.API_URL +
        `books/${payload.lookupId}/search/?tashkeel=${payload.tashkeel}&word=${payload.word}`,
    );
    return fetch(
        settings.API_URL +
        `books/${payload.lookupId}/search/?tashkeel=${payload.tashkeel}&word=${payload.word}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: await storage.getItem('token'),
            },
        },
    ).then((response) => response.json());
}

export async function post_like_review(id) {

    return fetch(settings.API_URL + 'user/review/likes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: await storage.getItem('token'),
            },
            body: JSON.stringify({
                "review": id
            })
        },
    ).then((response) => response.json())
        .then(res => {
            console.log(res)
            return res
        })
}

export async function update_profile_api(data) {
    let body = new FormData();
    Object.keys(data).forEach((key) => {
        if (key === 'photo') {
            if (data[key]) {
                body.append('photo', {
                    uri: data.photo.uri,
                    name: Platform.OS == 'android' ? data.photo.name : data.photo.type.replace('/', '.'),
                    type: data.photo.type,
                });
            }
        } else {
            body.append(key, data[key]);
        }
    });
    return fetch(settings.API_URL + 'user/', {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'multipart/form-data',
            Authorization: await storage.getItem('token'),
        },
        body: body,
    })
        .then((response) => response.json())
        .then((res) => {
            console.log('profilllllle', res);
            return res;
        })
        .catch((err) => {
            console.log(err.response);
        });
}

export async function upload_audio_file(id, data) {
    console.log(data, id)
    let body = new FormData();
    body.append('type', 'audio')
    body.append('approved', 'true')
    body.append('url', {
        uri: data.uri,
        name: Platform.OS == 'android' ? data.name : data.type.replace('/', '.'),
        type: data.type,
    });
    return fetch(settings.API_URL + 'books/' + id + '/audio/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'multipart/form-data',
            Authorization: await storage.getItem('token'),
        },
        body: body,
    })
        .then((response) => response.json())
        .then((res) => {
            console.log('uploaaaad aufio booooooooook', res);
            return res;
        })
        .catch((err) => {
            console.log(err.response);
        });
}
