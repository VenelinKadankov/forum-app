import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import styles from './ThemeCard.module.css';

export const ThemeCard = (theme) => {
    return (
        <Card className={styles.themeCard}>
            <Card.Header as="h5">{theme.topic}</Card.Header>
            <Card.Body>
                <Card.Title>{theme.title}</Card.Title>
                <Card.Text>
                    {`${theme.description.substring(0, 100)}...`}
                </Card.Text>
                <Button variant="primary">Join</Button>
            </Card.Body>
        </Card>
    );
}