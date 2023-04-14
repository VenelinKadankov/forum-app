import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useAuthContext } from "../../contexts/AuthContext";
import { useThemeContext } from "../../contexts/ThemeContext";
import { themeService } from "../../services/themeService";
import { useForm } from "../../hooks/useForm";

import styles from './ThemeDetails.module.css';

const initialValuesTheme = { id: '', title: '', description: '', creatorId: '', topicTitle: '', answers:[] }
const initialValuesAnswer = { title: '', description: '', creatorId: '', themeId: '' }

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


    const [show, setShow] = useState(false);

    const { onEditSubmit, onCreateAnswerSubmit } = useThemeContext();
    // const onSubmitAnswer = (data) => {
    //     console.log("SUBMITTED ANSWER");

    //     onCreateAnswerSubmit();

    //     handleClose();
    // }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(theme);

    initialValuesTheme.id = themeId;
    initialValuesTheme.title = theme.title;
    initialValuesTheme.description = theme.description;
    initialValuesTheme.creatorId = theme.creatorId;
    initialValuesTheme.topicTitle = theme.topicTitle;
    initialValuesTheme.answers = theme.answers;

    initialValuesAnswer.themeId = themeId;
    initialValuesAnswer.creatorId = userId;
    initialValuesAnswer.title = theme.title;

    const { values, changeHandler, onFormSubmit } = useForm(initialValuesTheme, onEditSubmit, handleClose);

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
                        <p>All the answers will be here.</p>
                        <Link>Comment</Link>
                    </div>
                    <br></br>
                </section>
                <section>
                    <button onClick={handleShow} className={styles.answerBtn}>Answer</button>
                </section>
            </section>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{theme.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                />
              </Form.Group> */}
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Write your answer</Form.Label>
                            <textarea rows={5}
                                name="description"
                                className={styles.inputArea}
                                type="text"
                                placeholder="Description"
                                value={values?.answers?.at(-1)?.description}
                                onChange={changeHandler}
                                autoComplete="off" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onFormSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}