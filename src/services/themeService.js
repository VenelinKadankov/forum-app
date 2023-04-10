// import { requestService } from "./requestService";
import { serviceFactory } from "./serviceFactory";

// const baseUrl = 'https://localhost:44350/api/theme/all';
// const secondaryUrl = 'http://localhost:5108/api/theme/all';

export const themeService = (auth) => {
    const service = serviceFactory('theme', auth);

    return service;
}