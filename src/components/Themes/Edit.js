import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { themeService } from '../../services/themeService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useThemeContext } from "../../contexts/ThemeContext";
import { useForm } from "../../hooks/useForm";

import styles from './Edit.module.css';

export const Edit = () => {
    const { userId, auth } = useAuthContext();
    const { themeId } = useParams();
    let headersDetailChange = { uid: userId, tId: themeId };

    const serviceThemes = themeService(auth, headersDetailChange);
    const [theme, setTheme] = useState({});

    useEffect(() => {
        serviceThemes.getOne({ tId: themeId })
            .then(res => {

                res.answers.forEach(answer => {
                    answer.themeId = theme.id;
                });

                setTheme(res);
                changeValues(res);
            });
    }, [themeId]);

    const { onEditSubmit } = useThemeContext();
    const { values, changeHandler, onFormSubmit, changeValues } = useForm(theme, onEditSubmit);

    return (
        <div className={styles.editThemeArea}>
            <form className={styles.editThemeForm} method="POST" onSubmit={onFormSubmit}>
                <div className="mb-3" id="themeTitle">
                    <label>Title</label>
                    <input name="title"
                        className={styles.inputArea}
                        type="text"
                        placeholder="Enter title"
                        value={values.title || ''}
                        onChange={changeHandler}
                        autoComplete="off"
                        label="Title"
                        pattern="^[a-zA-Z0-9]{4,255}$"
                        required />
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
                        value={values.description || ''}
                        onChange={changeHandler}
                        autoComplete="off" 
                        label="Description"
                        pattern="^[a-zA-Z0-9]{10,5000}$"
                        required/>
                </div>

                <div className="mb-3" id="themeTopic">
                    <label>Topic</label>
                    <input name="topic"
                        className={styles.inputArea}
                        type="text"
                        placeholder="Theme Topic"
                        value={values.topic || ''}
                        onChange={changeHandler}
                        autoComplete="off" 
                        label="Topic"
                        pattern="^[a-zA-Z0-9]{4,255}$"
                        required/>
                </div>
                <Button variant="primary" type="submit">
                    Edit
                </Button>
                <Link className={styles.goBackBtn} to="/catalog">Back</Link>
            </form>
        </div>
    );
}