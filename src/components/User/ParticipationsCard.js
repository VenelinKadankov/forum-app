import Card from 'react-bootstrap/Card';

import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { answerService } from '../../services/answerService';

import styles from './ParticipationsCard.module.css';

export const ParticipationsCard = ({ item, typeWanted, themeId }) => {
    const { auth, userId } = useAuthContext();
    const [answer, setAnswer] = useState({});
    let headersDetailChange = { uid: userId, aId: themeId };
    const serviceAnswers = answerService(auth, headersDetailChange);

    if (typeWanted === 'Comment') {
        serviceAnswers.getOne({ aId: themeId })
            .then(res => {
                setAnswer(res);
            });

        themeId = answer.themeId;
    }

    const shortDescription = item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description;
    const redirectString = `/catalog/${themeId}`;

    return (
        <Card className={styles.itemCard}>
            <Card.Header as="h5">
                <p>Theme: {item.title}</p>
            </Card.Header>
            <Card.Body>
                <Card.Text className={styles.contentText}>
                    <span className={styles.highlightContent}>{typeWanted} content:</span> {shortDescription}
                </Card.Text>
                <NavLink to={redirectString} className={styles.joinTheme}>Go there</NavLink>
            </Card.Body>
        </Card>
    );
}