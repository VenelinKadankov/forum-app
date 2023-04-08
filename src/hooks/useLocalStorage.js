import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const authStorage = localStorage.getItem(key);
        if (authStorage) {
            const auth = JSON.parse(authStorage);

           return auth;
        }

        return initialValue;
    });

    const setTokenInStorage = (newValue) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [
        value,
        setTokenInStorage
    ];
}