import { useEffect, useState } from 'react';

import { useAuthContext } from "../../contexts/AuthContext"
import { themeService } from '../../services/themeService';
import { answerService } from '../../services/answerService';
import { commentService } from '../../services/commentService';

import styles from "./Participations.module.css"
import { ParticipationsCard } from './ParticipationsCard';

export const Participations = () => {
    const { auth, userId } = useAuthContext();

    let headersDetailChange = { uid: userId };

    const [themes, setThemes] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [comments, setComments] = useState([]);

    const serviceThemes = themeService(auth, headersDetailChange);
    const serviceAnswers = answerService(auth, headersDetailChange);
    const serviceComments = commentService(auth, headersDetailChange);

    const [showThemes, setShowThemes] = useState(true);
    const handleShowThemes = () => {
        setShowAnswers(false);
        setShowComments(false);
        setShowThemes(true);
    }

    const [showAnswers, setShowAnswers] = useState(false);
    const handleShowAnswers = () => {
        setShowThemes(false);
        setShowComments(false);
        setShowAnswers(true);
    }

    const [showComments, setShowComments] = useState(false);
    const handleShowComments = () => {
        setShowThemes(false);
        setShowAnswers(false);
        setShowComments(true);
    }

    useEffect(() => {
        serviceThemes.getAllForUser({ uid: userId })
            .then(res => {
                setThemes(res);
            });
    }, [userId]);

    useEffect(() => {
        serviceAnswers.getAllForUser({ uid: userId })
            .then(res => {
                setAnswers(res);
            });
    }, [userId]);

    useEffect(() => {
        serviceComments.getAllForUser({ uid: userId })
            .then(res => {
                setComments(res);
            });
    }, [userId]);

    return (
        <div className={styles.participationsArea}>
            <div className={styles.participationBtns}>
                <button className={styles.partBtn} onClick={handleShowThemes}>My themes</button>
                <button className={styles.partBtn} onClick={handleShowAnswers}>My answers</button>
                <button className={styles.partBtn} onClick={handleShowComments}>My comments</button>
            </div>
            <div className={styles.participationItems}>
                {showThemes && themes.map(x => (
                    <ParticipationsCard key={x.id} item={x} typeWanted={'Theme'} themeId={x.id} />
                ))}

                {showAnswers && answers.map(x => (
                    <ParticipationsCard key={x.id} item={x} typeWanted={'Answer'} themeId={x.themeId} />
                ))}

                {showComments && comments.map(x => (
                    <ParticipationsCard key={x.id} item={x} typeWanted={'Comment'} themeId={x.relatedAnswerId} />
                ))}
            </div>
        </div>
    )
}