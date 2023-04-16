import { serviceFactory } from "./serviceFactory";

export const commentService = (auth, headers, paramsKVPs) => {
    const service = serviceFactory('comment', auth, headers, paramsKVPs);

    return service;
}