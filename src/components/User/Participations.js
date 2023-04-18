import { useEffect, useState } from 'react';

import { useAuthContext } from "../../contexts/AuthContext"
import { themeService } from '../../services/themeService';
import { answerService } from '../../services/answerService';
import { commentService } from '../../services/commentService';

import styles from "./Participations.module.css"

export const Participations = () => {
    const { auth, userId, isAuthenticated } = useAuthContext();

    let headersDetailChange = { uid: userId };

    const [themes, setThemes] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [comments, setComments] = useState([]);

    const serviceThemes = themeService(auth, headersDetailChange);
    const serviceAnswers = answerService(auth, headersDetailChange);
    const serviceComments = commentService(auth, headersDetailChange);

    const [showThemes, setShowThemes] = useState(true);
    const handleCloseThemes = () => setShowThemes(false);
    const handleShowThemes = () => {
        setShowAnswers(false);
        setShowComments(false);
        setShowThemes(true);
    }

    const [showAnswers, setShowAnswers] = useState(false);
    const handleCloseAnswers = () => setShowAnswers(false);
    const handleShowAnswers = () => {
        setShowThemes(false);
        setShowComments(false);
        setShowAnswers(true);
    }

    const [showComments, setShowComments] = useState(false);
    const handleCloseComments = () => setShowComments(false);
    const handleShowComments = () => {
        setShowThemes(false);
        setShowAnswers(false);
        setShowComments(true);
    }

    useEffect(() => {
        serviceThemes.getAllForUser({ uid: userId })
            .then(res => {
                setAnswers([]);
                setComments([]);
                setThemes(res);
            });
    }, [userId]);

    useEffect(() => {
        serviceAnswers.getAllForUser({ uid: userId })
            .then(res => {
                setThemes([]);
                setComments([]);
                setAnswers(res);
            });
    }, [userId]);

    useEffect(() => {
        serviceComments.getAllForUser({ uid: userId })
            .then(res => {
                setThemes([]);
                setAnswers([]);
                setComments(res);
            });
    }, [userId]);

    return (
        <>
        <div className={styles.participationBtns}>
            <button className={styles.partBtn} onClick={handleShowThemes}>My themes</button>
            <button className={styles.partBtn} onClick={handleShowAnswers}>My answers</button>
            <button className={styles.partBtn} onClick={handleShowComments}>My comments</button>
        </div>
        {showThemes && <p>Themes</p>}
        {showAnswers && <p>Answers</p>}
        {showComments && <p>Comments</p>}
        </>
    )
}