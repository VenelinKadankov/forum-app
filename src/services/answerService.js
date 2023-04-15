import { serviceFactory } from "./serviceFactory";

export const answerService = (auth, headers, paramsKVPs) => {
    const service = serviceFactory('answer', auth, headers, paramsKVPs);

    return service;
}