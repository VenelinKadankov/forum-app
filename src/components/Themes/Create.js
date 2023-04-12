import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

import { useThemeContext } from "../../contexts/ThemeContext";
import { useForm } from "../../hooks/useForm";

import styles from './Create.module.css';

const initialValues = { title: '', description: '', topicTitle: '', creatorId: '' }

export const Create = () => {
    const { userId } = useAuthContext();
    const navigate = useNavigate();

    if(!userId){
        navigate('/');
    }

    initialValues.creatorId = userId;
    const { onCreateSubmit } = useThemeContext();
    const { values, changeHandler, onFormSubmit } = useForm(initialValues, onCreateSubmit);

    return (
        <div className={styles.createThemeArea}>
            <form className={styles.createThemeForm} method="POST" onSubmit={onFormSubmit}>
                <div className="mb-3" id="themeTitle">
                    <label>Title</label>
                    <input name="title"
                        className={styles.inputArea}
                        type="text"
                        placeholder="Enter title"
                        value={values.title}
                        onChange={changeHandler}
                        autoComplete="off" />
                    <label className="text-muted">
                        The theme title.
                    </label>
                </div>

                <div className="mb-3" id="themeDescription">
                    <label>Description</label>
                    <textarea rows={5} name="description"
                        className={styles.inputArea}
                        type="text"
                        placeholder="Description"
                        value={values.description}
                        onChange={changeHandler}
                        autoComplete="off" />
                </div>

                <div className="mb-3" id="themeTopic">
                    <label>Topic</label>
                    <input name="topicTitle"
                        className={styles.inputArea}
                        type="text"
                        placeholder="Theme Topic"
                        value={values.topicTitle}
                        onChange={changeHandler}
                        autoComplete="off" />
                </div>
                <Button variant="primary" type="submit">
                    Create
                </Button>
                <Link className={styles.goBackBtn} to="/catalog">Back</Link>
            </form>
        </div>
    );
}