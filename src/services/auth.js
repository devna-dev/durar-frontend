import settings from "../config/settings";

export function user_login(form) {
    return fetch(settings.API_URL + 'accounts/login/', {
        method: 'POST',
        headers: {
            accept: 'application/json',
            "content-Type": 'application/json',
        },
        body: JSON.stringify(form)
    }).then(response => response.json())

}
