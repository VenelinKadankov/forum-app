import { useEffect, useReducer, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { themeService } from '../../services/themeService';
import { answerService } from '../../services/answerService';
import { themeReducer } from '../../reducers/themeReducer';

import { AddAnswer } from '../../Answers/CreateAnswer';

import styles from './ThemeDetails.module.css';

export const ThemeDetails = () => {
    const { themeId } = useParams();
    const { auth, userId, isAuthenticated, username } = useAuthContext();

    const serviceThemes = themeService(auth, { tId: themeId, uid: userId });
    const serviceAnswers = answerService(auth, { tId: themeId, uid: userId });

    const [theme, dispatch] = useReducer(themeReducer, {});

    useEffect(() => {
        serviceThemes.getOne({ tId: themeId })
            .then(res => {
                const themeState = { ...res };
                dispatch({ type: 'THEME_FETCH', payload: themeState })
            });
    }, [themeId]);

    const onAnswerSubmit = async (values) => {
        values.themeId = themeId;
        values.title = theme.title;

        const response = await serviceAnswers.create({ tId: themeId, uid: userId }, values);

        dispatch({
            type: 'ANSWER_ADD',
            payload: response.answers,
            // username: username,
        });

        handleClose();
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <h1>Details page</h1>

            <section className={styles.themeDetailsPage}>
                <section className={styles.themeData}>
                    <div>
                        <label className={styles.themeTitle}>{theme.topic}</label>
                        <h2 className={styles.themeTitle}>{theme.title}</h2>
                        <div className={styles.themeDataItem}><p>{theme.topic}</p></div>
                        <div className={styles.themeDataItem}><p>{theme.description}</p></div>
                        <div className={styles.themeDataItem}><p className={styles.userInfo}>Posted by {theme.creatorName} on {theme.createdOn}</p></div>
                    </div>
                    <br></br>
                    <div className={styles.answersArea}>
                        {/* <p>{theme.answers}</p> */}
                        {theme.answers && theme.answers?.map(x => (
                            <div key={x.id} className={styles.commentCard}>
                                <p>{x.description}</p>
                                <p className={styles.creatorData}>Answer by - {x.creator}</p>
                                <div className={styles.commentLinkDiv}>
                                    <Link className={styles.commentLink}>Comment</Link>
                                </div>
                            </div>
                        ))}

                    </div>
                    <br></br>
                </section>
                <section className={styles.sectionAnswerBtn}>
                    <button onClick={handleShow} className={styles.answerBtn}>Answer</button>
                </section>
            </section>

            {isAuthenticated ? <AddAnswer onAnswerSubmit={onAnswerSubmit} theme={theme} handleClose={handleClose} show={show} /> : window.alert('Login first')}
        </>
    );
}