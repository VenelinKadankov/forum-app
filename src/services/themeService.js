// import { requestService } from "./requestService";
import { serviceFactory } from "./serviceFactory";

// const baseUrl = 'https://localhost:44350/api/theme/all';
// const secondaryUrl = 'http://localhost:5108/api/theme/all';

export const themeService = (token) => {
    const service = serviceFactory('theme', token);

    return service;
}