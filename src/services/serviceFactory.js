import { requestService } from './requestService';
import { apiLinks } from '../common/apiLinks';

export const serviceFactory = (typeService, token) => {
    const request = requestService(token);
    const {baseUrl, secondaryUrl} = apiLinks(typeService);

    const getAll = async () => {

        try {
            const response = await request.get(baseUrl);

            if (response) {
                const result = Object.values(response);

                return result;
            }
        } catch (error) {
            try {
                const response = await request.get(secondaryUrl);

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
        const response = await request.get(`${baseUrl}/${id}`);

        if (response) {
            return Object.values(response);
        }
    };

    return {
        getAll,
        getOne
    };
}