import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { themeService } from '../services/themeService';
import { useAuthContext } from './AuthContext';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const navigate = useNavigate();
    const [themes, setThemes] = useState([]);
    const { userId, auth } = useAuthContext();

    const service = themeService(auth, { uid: userId });

    useEffect(() => {
        service.getAll()
            .then(result => {
                setThemes(result);
            })
    }, []);

    const onCreateSubmit = async (data) => {

        try {
            const response = await service.create({ uid: userId }, data);

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
            const response = await service.edit({ uid: userId, tId: data.id }, data);

            if (!response) {
                window.alert('There was a problem editting the theme. Try again.');
                navigate(`/edit/${response.id}`);
            }

            navigate(`/catalog/${response.id}`);
        } catch (error) {
            window.alert('There was a problem editting the theme. Try again.');
            navigate('/catalog');
        }
    }

    const onCreateAnswerSubmit = async (data) => {
        try {
            const response = await service.createInternalElement({ uid: userId }, data, '/answer');

            if (!response) {
                window.alert('There was a problem with your request. Try again.');
                navigate(`/catalog/${data.id}`);
            }

            navigate(`/catalog/${response.id}`);
        } catch (error) {
            window.alert('There was a problem with your request. Try again.');
            navigate('/catalog');
        }
    }

    const getOne = (themeId) => {
        return themes.find(t => t.id === themeId);
    }

    const contextValues = {
        onCreateSubmit,
        onEditSubmit,
        onCreateAnswerSubmit,
        getOne,
        themes
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