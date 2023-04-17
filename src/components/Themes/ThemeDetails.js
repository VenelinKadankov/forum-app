import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { themeService } from '../../services/themeService';
import { answerService } from '../../services/answerService';
import { commentService } from '../../services/commentService';
import { themeReducer } from '../../reducers/themeReducer';

import { AddAnswer } from '../../Answers/CreateAnswer';
import { AddComment } from '../../Comments/CreateComment';

import styles from './ThemeDetails.module.css';

let clickedAnswer = {};

export const ThemeDetails = () => {
    const { themeId } = useParams();
    const { auth, userId, isAuthenticated } = useAuthContext();
    let headersDetailChange = { tId: themeId, uid: userId };

    const serviceThemes = themeService(auth, headersDetailChange);
    const serviceAnswers = answerService(auth, headersDetailChange);
    const serviceComments = commentService(auth, headersDetailChange);

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

        const response = await serviceAnswers.create(headersDetailChange, values);

        dispatch({
            type: 'ANSWER_ADD',
            payload: response.answers,
        });

        handleClose();
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showComment, setShowComment] = useState(false);
    const handleCloseComment = () => {
        setShowComment(false);
        clickedAnswer = {};
    }
    const handleShowComment = (answer) => {
        clickedAnswer = answer;
        setShowComment(true);
    }

    const onCommentSubmit = async (values) => {
        values.forumAnswerId = clickedAnswer.id;
        values.title = theme.title;

        const response = await serviceComments.create(headersDetailChange, values);
        console.log(response);

        dispatch({
            type: 'COMMENT_ADD',
            payload: response.answers,
        });

        handleCloseComment();
    };

    const deleteCommentHandler = async (commentId) => {
        window.confirm('Are you sure you want to delete this comment?');
        headersDetailChange = {
            ...headersDetailChange,
            cId: commentId,
        }

        const response = await serviceComments.remove(headersDetailChange, commentId);
        console.log(response);

        dispatch({
            type: 'COMMENT_REMOVE',
            payload: response.answers,
        });
    }

    return (
        <>
            <h1>Details page</h1>

            <section className={styles.themeDetailsPage}>
                <section className={styles.themeData}>
                    <div>
                        <label className={styles.themeTitle}>{theme.topic}</label>
                        <h2 className={styles.themeTitle}>{theme.title}</h2>
                        <div className={styles.themeDataItem}>
                            <p>{theme.topic}</p>
                        </div>
                        <div className={styles.themeDataItem}>
                            <p>{theme.description}</p>
                        </div>
                        <div className={styles.themeDataItem}>
                            <p className={styles.userInfo}>Posted by {theme.creatorName} on {theme.createdOn}</p>
                        </div>
                    </div>
                    <br></br>
                    <div className={styles.answersArea}>
                        {theme.answers && theme.answers?.map(x => (
                            <div key={x.id} className={styles.answerCard}>
                                <p>{x.description}</p>
                                <div className={styles.creatorDiv}>
                                    <p className={styles.creatorData}>Answered on - {x.createdOn}</p>
                                    <p className={styles.creatorData}>By - {x.creator}</p>
                                </div>

                                {x.answerComments && x.answerComments.map(c => (
                                    <div key={c.id} className={styles.commentBox}>
                                        <p>{c.description}</p>
                                        <p className={styles.creatorData}>
                                            {userId === c.creatorId &&
                                                <button className={styles.deleteCommentBtn} onClick={() => deleteCommentHandler(c.id)}>Delete</button>}
                                            {c.creator}
                                        </p>
                                    </div>
                                ))}

                                <div className={styles.commentLinkDiv}>
                                    <button className={styles.commentLink} onClick={() => handleShowComment(x)}>Comment</button>
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

            {isAuthenticated ?
                <AddAnswer onAnswerSubmit={onAnswerSubmit}
                    theme={theme}
                    handleClose={handleClose}
                    show={show} /> :
                window.alert('Login first')}

            {isAuthenticated ?
                <AddComment onCommentSubmit={onCommentSubmit}
                    theme={theme}
                    answer={clickedAnswer}
                    handleCloseComment={handleCloseComment}
                    showComment={showComment} /> :
                window.alert('Login first')}
        </>
    );
}