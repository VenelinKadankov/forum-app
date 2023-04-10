import { requestService } from './requestService';
import { apiLinks } from '../common/apiLinks';

export const serviceFactory = (typeService, auth) => {
    const request = requestService(auth);
    const {baseUrl, secondaryUrl} = apiLinks(typeService);

    const getAll = async () => {

        try {
            const response = await request.get(`${baseUrl}/all`);

            if (response) {
                const result = Object.values(response);

                return result;
            }
        } catch (error) {
            try {
                const response = await request.get(`${secondaryUrl}/all`);

                if (response) {
                    const result = Object.values(response);
                    return result;
                }
            } catch (error) {
                console.log('LOG FROM ERROR' + error);
            }
        }

        return [];
    };

    const getOne = async (id) => {
        const response = await request.get(`${baseUrl}/get`);

        if (response) {
            return Object.values(response);
        }
    };

    const create = async (data) => {
        const response = await request.post(`${baseUrl}/create`, data);

        if (response) {
            return Object.values(response);
        }
    }

    return {
        getAll,
        getOne,
        create,
    };
}