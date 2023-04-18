import { requestService } from './requestService';
import { apiLinks } from '../common/apiLinks';

export const serviceFactory = (typeService, auth, headers = null, paramsKVPs = null) => {
    const request = requestService(auth, headers);
    const { baseUrl } = apiLinks(typeService);

    const searchParams = new URLSearchParams();

    // console.log(paramsKVPs);
    // for (const p in paramsKVPs) {
    //     searchParams.append(p, paramsKVPs.p);

    //     console.log(p);
    //   }

    const getAll = async (initialHeaders = null) => {
        const requestHeaders = unifyHeaders(headers, initialHeaders);

        try {
            const response = await request.get(`${baseUrl}/all`, requestHeaders);

            if (response) {
                const result = Object.values(response);

                return result;
            }

        } catch (error) {
            console.log('LOG FROM ERROR' + error);
        }

        return [];
    };

    const getAllForUser = async (initialHeaders = null) => {
        const requestHeaders = unifyHeaders(headers, initialHeaders);

        try {
            const response = await request.get(`${baseUrl}/allForUser`, requestHeaders);

            if (response) {
                const result = Object.values(response);

                return result;
            }

        } catch (error) {
            console.log('LOG FROM ERROR' + error);
        }

        return [];
    };

    const getOne = async (initialHeaders = null) => {
        const requestHeaders = unifyHeaders(headers, initialHeaders);

        // TODO: Fix the params in general in a similar way

        const response = await request.get(`${baseUrl}/get${searchParams}`, requestHeaders);

        if (response) {
            return response;
        }
    };

    const create = async (initialHeaders = null, data) => {
        const requestHeaders = unifyHeaders(headers, initialHeaders);

        const response = await request.post(`${baseUrl}/create`, requestHeaders, data);

        if (response) {
            return response;
        }
    }

    const edit = async (initialHeaders = null, data) => {
        const requestHeaders = unifyHeaders(headers, initialHeaders);

        const response = await request.put(`${baseUrl}/edit`, requestHeaders, data);

        if (response) {
            return response;
        }
    }

    const remove = async (initialHeaders = null, id) => {
        const requestHeaders = unifyHeaders(headers, initialHeaders);

        const response = await request.delete(`${baseUrl}/delete`, requestHeaders, id);

        if (response) {
            return response;
        }
    }

    const createInternalElement = async (initialHeaders = null, data, uri) => {
        const requestHeaders = unifyHeaders(headers, initialHeaders);

        const response = await request.put(`${baseUrl}/create${uri}`, requestHeaders, data);

        if (response) {
            return response;
        }
    }

    const unifyHeaders = (headers, initialHeaders) => {
        return {
            ...headers,
            ...initialHeaders,
        }
    }

    return {
        getAll,
        getAllForUser,
        getOne,
        create,
        edit,
        remove,
        createInternalElement,
    };
}