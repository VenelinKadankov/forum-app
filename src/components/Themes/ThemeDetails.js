import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useAuthContext } from "../../contexts/AuthContext";
import { themeService } from "../../services/themeService";

import styles from './ThemeDetails.module.css';

export const ThemeDetails = () => {
    const { themeId } = useParams();
    const { auth, userId } = useAuthContext();
    const service = themeService(auth, { tId: themeId, uid: userId });

    const [theme, setTheme] = useState({});

    useEffect(() => {
        service.getOne({ tId: themeId })
            .then(res => {
                console.log(res);
                setTheme(res)
            });
    }, [themeId, service]);

    
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
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        </>
    );
}