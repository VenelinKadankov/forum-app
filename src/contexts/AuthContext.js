import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { authService } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useLocalStorage('auth', {});
    const navigate = useNavigate();

    const authenticationService = authService(auth);

    const onLoginSubmit = async (data) => {
        const response = await authenticationService.login(data);

        if (response) {
            setAuth(response);
        }

        navigate('/catalog');
    }

    const onRegisterSubmit = async (data) => {
        const response = await authenticationService.register(data);

        if (response) {
            setAuth(response);
        }

        navigate('/catalog');
    }

    const onLogoutSubmit = async () => {
        await authenticationService.logout();

        setAuth({});

        navigate('/');
    }

    const isAuthenticated = auth.token ? true : false;

    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogoutSubmit,
        userId: auth.id,
        token: auth.token,
        username: auth.userName,
        auth: auth,
        isAuthenticated,
    };

    return (
        <>
            <AuthContext.Provider value={contextValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
};