import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { themeService } from "../../services/themeService";

export const ThemeDetails = () => {
    const { themeId } = useParams();
    const { auth, userId } = useAuthContext();
    const service = themeService(auth, { tId: themeId, uid: userId });

    const [theme, setTheme] = useState({});

    useEffect(() => {
        service.getOne({ tId: themeId })
            .then(res => {
                setTheme(res)
            });
    }, [themeId]);

    return (
        <>
            <h1>Details here</h1>
            <h3>{theme.id}</h3>
            <h3>{theme.title}</h3>
            <h3>{theme.topic}</h3>
            <h3>{theme.description}</h3>
            <h3>{theme.creatorName}</h3>
        </>
    );
}