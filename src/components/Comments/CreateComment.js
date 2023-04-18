import Modal from 'react-bootstrap/Modal';

import { useForm } from '../../hooks/useForm';
import { useAuthContext } from '../../contexts/AuthContext';

import { Link } from 'react-router-dom';

import styles from './CreateComment.module.css';

export const AddComment = ({
    onCommentSubmit,
    theme,
    answer,
    handleCloseComment,
    showComment
}) => {
    const { userId } = useAuthContext();

    const initialValues = {
        title: theme.title,
        description: '',
        creatorId: userId,
        forumAnswerId: answer.id,
    };

    const { values, changeHandler, onFormSubmit } = useForm(initialValues, onCommentSubmit);

    return (

        <Modal show={showComment} onHide={handleCloseComment} centered>
            <Modal.Header closeButton>
                <Modal.Title>{theme.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form
                    onSubmit={onFormSubmit}
                    className={styles.formSubmitComment}>

                    <label className={styles.inputArea}>{answer.description}</label>
                    <textarea rows={5}
                        name="description"
                        className={styles.inputArea}
                        type="text"
                        placeholder="Description"
                        value={values.description}
                        onChange={changeHandler}
                        autoComplete="off" />
                    <Modal.Footer className={styles.modalFooter}>
                        <button variant="primary" className={styles.submitBtn}>
                            Save Changes
                        </button>
                        <Link variant="secondary" onClick={handleCloseComment}  className={styles.goBackBtn}>
                            Close
                        </Link>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    );
};