import { apiLinks } from "../common/apiLinks";
import { requestService } from "./requestService";

export const authService = (auth) => {
    // token = localStorage.getItem('auth');
    const url = apiLinks('auth');
    const service = requestService(auth);

    const login = async (data) => {
        try {
            return await service.post(`${url.baseUrl}/login`, data);
        } catch (error) {
            try {
                return await service.post(`${url.secondaryUrl}/login`, data);
            } catch (error) {
                console.log('ERROR LOGIN');
            }
        }
    };

    const register = async (data) => {
        try {
            return await service.post(`${url.baseUrl}/register`, data);
        } catch (error) {
            try {
                return await service.post(`${url.secondaryUrl}/register`, data);
            } catch (error) {
                console.log('ERROR REGISTER');
            }
        }
    };

    const logout = async () => {
        try {
            return await service.get(`${url.baseUrl}/logout`);
        } catch (error) {
            try {
                return await service.get(`${url.secondaryUrl}/logout`);
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