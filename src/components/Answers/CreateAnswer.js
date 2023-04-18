import Modal from 'react-bootstrap/Modal';

import { useForm } from '../../hooks/useForm';
import { useAuthContext } from '../../contexts/AuthContext';

import styles from './CreateAnswer.module.css';
import { Link } from 'react-router-dom';


export const AddAnswer = ({
    onAnswerSubmit,
    theme,
    handleClose,
    show
}) => {
    const { userId } = useAuthContext();

    const initialValues = {
        title: theme.title,
        description: '',
        creatorId: userId,
        themeId: theme.id,
    };

    const { values, changeHandler, onFormSubmit } = useForm(initialValues, onAnswerSubmit);

    return (

        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{theme.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form
                    onSubmit={onFormSubmit}
                    className={styles.formSubmitAnswer}>

                    <label className={styles.inputArea}>Write your answer</label>
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
                        <Link variant="secondary" onClick={handleClose}  className={styles.goBackBtn}>
                            Close
                        </Link>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    );
};