import { useParams, Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useThemeContext } from '../../contexts/ThemeContext';

export const OwnerGuard = ({
    children,
}) => {
    const { themeId } = useParams();
    const { userId } = useAuthContext();
    const { getOne } = useThemeContext();

    const theme = getOne(themeId);

    if (theme && theme.creatorId !== userId) {
        return <Navigate to={`/catalog/${themeId}`} replace />
    }

    return children ? children : <Outlet />
};