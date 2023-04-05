import { apiLinks } from "../common/apiLinks";
import { requestService } from "./requestService";

export const authService = (token) => {
    token = localStorage.getItem('auth');
    const url = apiLinks('auth');
    const service = requestService(token);

    const login = async (data) => {
        try {
            await service.post(`${url.baseUrl}/login`, data);
        } catch (error) {
            try {
                await service.post(`${url.secondaryUrl}/login`, data);
            } catch (error) {
                console.log('ERROR LOGIN');
            }
        }
    };

    const register = async (data) => {
        try {
            await service.post(`${url.baseUrl}/register`, data);
        } catch (error) {
            try {
                await service.post(`${url.secondaryUrl}/register`, data);
            } catch (error) {
                console.log('ERROR REGISTER');
            }
        }
    };

    const logout = async () => {
        try {
            await service.get(`${url.baseUrl}/logout`);
        } catch (error) {
            try {
                await service.post(`${url.secondaryUrl}/logout`);
            } catch (error) {
                console.log('ERROR LOGOUT');
            }
        }
    };

    return {
        login,
        logout,
        register,
    };
}