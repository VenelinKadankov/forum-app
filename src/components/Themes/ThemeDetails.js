import { useEffect, useReducer, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { themeService } from '../../services/themeService';
import { answerService } from '../../services/answerService';
import { commentService } from '../../services/commentService';
import { themeReducer } from '../../reducers/themeReducer';

import { AddAnswer } from '../Answers/CreateAnswer';
import { AddComment } from '../Comments/CreateComment';

import styles from './ThemeDetails.module.css';

let clickedAnswer = {};

export const ThemeDetails = () => {
    const { themeId } = useParams();
    const navigate = useNavigate();
    const { auth, userId, isAuthenticated } = useAuthContext();
    let headersDetailChange = { tId: themeId, uid: userId };

    const serviceThemes = themeService(auth, headersDetailChange);
    const serviceAnswers = answerService(auth, headersDetailChange);
    const serviceComments = commentService(auth, headersDetailChange);

    const [theme, dispatch] = useReducer(themeReducer, {});

    const isOwner = theme.creatorId === userId;

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

        dispatch({
            type: 'COMMENT_ADD',
            payload: response.answers,
            answerId: values.forumAnswerId,
        });

        handleCloseComment();
    };

    const deleteAnswerHandler = async (answer) => {
        //TODO: Same problem with click time violation.
        window.confirm('Are you sure you want to delete this answer?');
        headersDetailChange = {
            ...headersDetailChange,
            aId: answer.id,
        }

        const response = await serviceAnswers.remove(headersDetailChange, answer.id);

        dispatch({
            type: 'ANSWER_REMOVE',
            payload: response.answers,
        });
    }

    const deleteCommentHandler = async (commentId, answer) => {
        //TODO: This confirm is causing "[Violation] 'click' handler took 929ms" warning for delay, if time is enough fix it(maybe another modal)
        window.confirm('Are you sure you want to delete this comment?');
        headersDetailChange = {
            ...headersDetailChange,
            cId: commentId,
        }

        const response = await serviceComments.remove(headersDetailChange, commentId);

        dispatch({
            type: 'COMMENT_REMOVE',
            payload: response.answers,
            answerContainingComment: answer,
        });
    }

    const deleteThemeHandler = async () => {
        // TODO: Same problem
        window.confirm('Are you sure you want to delete this theme?');

        await serviceThemes.remove(headersDetailChange, theme.id);

        dispatch({
            type: 'THEME_REMOVE',
            payload: {},
        });

        navigate('/catalog');
    }

    const editThemeHandler = () => {
        navigate(`/edit/${themeId}`);
    }

    return (
        <>
            <h1>Details page</h1>

            <section className={styles.themeDetailsPage}>
                <section className={styles.themeData}>
                    <div className={styles.forumThemeDetails}>
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
                                    <div className={styles.creatorDataAnswer}>
                                        {(isAuthenticated && userId === x.creatorId) &&
                                            <button
                                                className={styles.deleteCommentBtn}
                                                onClick={() => deleteAnswerHandler(x)}>
                                                Delete
                                            </button>}
                                    </div>
                                    <div>
                                        <p className={styles.creatorDataAnswer}>Answered on - {x.createdOn}</p>
                                        <p className={styles.creatorDataAnswer}>By - {x.creator}</p>
                                    </div>
                                </div>

                                {x.answerComments && x.answerComments.map(c => (
                                    <div key={c.id} className={styles.commentBox}>
                                        <p>{c.description}</p>
                                        <div className={styles.creatorDataComment}>
                                            {userId === c.creatorId &&
                                                <button
                                                    className={styles.deleteCommentBtn}
                                                    onClick={() => deleteCommentHandler(c.id, x)}>
                                                    Delete
                                                </button>}
                                            <p>{c.creator}</p>
                                        </div>
                                    </div>
                                ))}
                                {isAuthenticated && <div className={styles.commentLinkDiv}>
                                    <button className={styles.commentLink} onClick={() => handleShowComment(x)}>Comment</button>
                                </div>}

                            </div>
                        ))}

                    </div>
                    <br></br>
                </section>
                <section className={styles.sectionAnswerBtn}>
                    {!isAuthenticated &&
                        <Link className={styles.loginRequired} to="/login">If you want to participate you should login.</Link>
                    }
                    {isAuthenticated &&
                        <button
                            onClick={handleShow}
                            className={styles.answerBtn}>
                            Answer
                        </button>}
                    {(isAuthenticated && isOwner) &&
                        <button
                            onClick={editThemeHandler}
                            className={styles.editBtn}>
                            Edit
                        </button>}
                    {(isAuthenticated && isOwner) &&
                        <button
                            className={styles.deleteThemeBtn}
                            onClick={deleteThemeHandler}>
                            Delete
                        </button>}
                </section>
            </section>

            {isAuthenticated &&
                <AddAnswer onAnswerSubmit={onAnswerSubmit}
                    theme={theme}
                    handleClose={handleClose}
                    show={show} />}

            {isAuthenticated &&
                <AddComment onCommentSubmit={onCommentSubmit}
                    theme={theme}
                    answer={clickedAnswer}
                    handleCloseComment={handleCloseComment}
                    showComment={showComment} />}
        </>
    );
}