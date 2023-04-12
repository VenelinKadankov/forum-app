const requester = async (auth, method, url, headers = null, data = null) => {
    const options = {};
    options.method = method;
    options.headers = headers ? headers : {};

    if (method !== 'GET') {
        options.headers = {
            ...headers,
            'content-type': 'application/json',
        };

        options.body = JSON.stringify(data);
    }

    if (auth && auth.token) {
        options.headers = {
            ...headers,
            ...options.headers,
            'Authorization': auth.token,
            'uid': auth.id,
        };
    }

    const response = await fetch(url, options);

    if (!response || !response.ok) {
        throw response;
    }

    return await response.json();
}

export const getToken = () => {
    const auth = localStorage.getItem('auth');

    if (auth) {
        return JSON.parse(auth).token;
    }
}

export const requestService = (auth) => {

    if (!auth) {
        let auth = {};
        auth.token = getToken();
        auth = auth.token === undefined ? undefined : auth;
    }

    return {
        get: requester.bind(null, auth, 'GET'),
        post: requester.bind(null, auth, 'POST'),
        put: requester.bind(null, auth, 'PUT'),
        delete: requester.bind(null, auth, 'DELETE'),
    }
}