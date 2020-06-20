import settings from "../config/settings";

export function user_login(form) {
    return fetch(settings.API_URL + 'accounts/login/', {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        data: form
    }).then(response => response.json())
        .then(response => {
            console.log(response)
            return response;
        })
        .catch(error => {
            console.log(error.response)
            return error.response
        })
}