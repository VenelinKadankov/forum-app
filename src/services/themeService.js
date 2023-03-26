import { requestService } from "./requestService";

const baseUrl = 'https://localhost:44350/api/theme/all';
const secondaryUrl = 'http://localhost:5108/api/theme/all';

export const themeService = (token) => {
    const request = requestService(token);

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

    const getOne = async (themeId) => {
        const response = await request.get(`${baseUrl}/${themeId}`);

        if (response) {
            return Object.values(response);
        }
    };

    return {
        getAll,
        getOne
    };
}