import { serviceFactory } from "./serviceFactory";

export const themeService = (auth, headers, paramsKVPs) => {
    const service = serviceFactory('theme', auth, headers, paramsKVPs);

    return service;
}