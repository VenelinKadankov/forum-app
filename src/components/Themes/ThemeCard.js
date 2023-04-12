import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';

import styles from './ThemeCard.module.css';

export const ThemeCard = (theme) => {
    const shortDescription = theme.description.length > 100 ? `${theme.description.substring(0, 100)}...` : theme.description;

    return (
        <Card className={styles.themeCard}>
            <Card.Header as="h5">{theme.topic}</Card.Header>
            <Card.Body>
                <Card.Title>{theme.title}</Card.Title>
                <Card.Text>
                    {shortDescription}
                </Card.Text>
                <NavLink to={theme.id} className={styles.joinTheme}>Join</NavLink>
            </Card.Body>
        </Card>
    );
}