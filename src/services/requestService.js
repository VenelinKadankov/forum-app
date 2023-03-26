const requester = async (token, method, url, data) => {
    const options = {};
    options.method = method;

    if (method !== 'GET') {
        options.headers = {
            'content-type': 'application/json',
        };

        options.body = JSON.stringify(data);
    }

    if (token && options.headers) {
        options.headers = {
            ...options.headers,
            'Authorization': token,
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
        return JSON.stringify(auth).token;
    }
}

export const requestService = (token) => {
    if (!token) {
        token = getToken();
    }

    return {
        get: requester.bind(null, token, 'GET'),
        post: requester.bind(null, token, 'POST'),
        put: requester.bind(null, token, 'PUT'),
        delete: requester.bind(null, token, 'DELETE'),
    }
}