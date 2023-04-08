import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

export const Logout = () => {
    const { onLogoutSubmit } = useContext(AuthContext);

    useEffect(() => {
        onLogoutSubmit();
    }, [onLogoutSubmit]);

    return <Navigate to="/" /> 
};