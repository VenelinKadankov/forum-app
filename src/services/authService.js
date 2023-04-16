import { apiLinks } from "../common/apiLinks";
import { requestService } from "./requestService";

export const authService = (auth) => {
    const url = apiLinks('auth');
    const service = requestService(auth);

    const login = async (data) => {
        try {
            return await service.post(`${url.baseUrl}/login`, {uid: auth.id}, data);
        } catch (error) {
            window.alert('ERROR LOGIN');
            // console.log('ERROR LOGIN');
        }

    };

    const register = async (data) => {
        try {
            return await service.post(`${url.baseUrl}/register`, {}, data);
        } catch (error) {
            window.alert('ERROR REGISTER');
            // console.log('ERROR REGISTER');
        }

    };

    const logout = async () => {
        try {
            return await service.get(`${url.baseUrl}/logout`);
        } catch (error) {
            window.alert('ERROR LOGOUT');
            // console.log('ERROR LOGOUT');
        }

    };

    return {
        login,
        logout,
        register,
    };
}