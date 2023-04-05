import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(initialValue);

    const kvp = localStorage.getItem(key);

    if (kvp) {
        setValue(JSON.parse(kvp));
    }

    const setTokenInStorage = (newValue) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [
        value,
        setTokenInStorage
    ];
}