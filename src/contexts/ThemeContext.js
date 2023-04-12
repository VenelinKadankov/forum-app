import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { themeService } from '../services/themeService';
import { useAuthContext } from './AuthContext';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const navigate = useNavigate();

    const { id, userName, token } = useAuthContext();

    // console.log(id);

    const auth = { id, userName, token }
    const service = themeService(auth);

    const onCreateSubmit = async (data) => {

        try {
            const response = await service.create({uid: id}, data);

            console.log(response);

            if (!response) {
                window.alert('There was a problem creating the theme. Try again.');
                navigate('/create');
            }

            navigate(`/catalog/${response.id}`);
        } catch (error) {
            window.alert('There was a problem creating the theme. Try again.');
            navigate('/create');
        }
    }

    const onEditSubmit = async (data) => {
        try {
            const response = await service.edit(data);
            if (!response) {
                window.alert('There was a problem editting the theme. Try again.');
                navigate(`/edit/${response.id}`);
            }

            navigate(`/catalog/${response.id}`);
        } catch (error) {
            window.alert('There was a problem editting the theme. Try again.');
            navigate(0);
        }
    }

    const contextValues = {
        onCreateSubmit,
        onEditSubmit,
    };

    return (
        <>
            <ThemeContext.Provider value={contextValues}>
                {children}
            </ThemeContext.Provider>
        </>
    );
}

export const useThemeContext = () => {
    const context = useContext(ThemeContext);

    return context;
};