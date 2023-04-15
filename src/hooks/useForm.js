import { useState } from 'react';

export const useForm = (initialValues, onSubmitHandler, closeHandler = null,) => {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onFormSubmit = (e) => {
        e.preventDefault();


        console.log('VALUES FROM FORM SUBMIT');
        console.log(values);

        onSubmitHandler(values);

        if (closeHandler) {
            closeHandler();
        }

        setValues(initialValues);
    };

    const changeValues = (newValues) => {
        // TODO: Validate newValues shape (like initialValues)

        setValues(newValues);
    };

    return {
        values,
        changeHandler,
        onFormSubmit,
        changeValues,
    };
};