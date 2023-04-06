import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';

import styles from './Register.module.css';

const initialValues = { username: '', password: '', confirmPassword: '' };

export const RegisterUser = () => {
    const { onRegisterSubmit } = useAuthContext();
    const { values, changeHandler, onSubmit } = useForm(initialValues, onRegisterSubmit);

    return (
        <div className={styles.registerAreaFlex}>
            <form className={styles.registerArea} method="POST" onSubmit={onSubmit}>
                <div className="mb-3" id="formUsername">
                    <label>Username</label>
                    <input name="username"
                        className={styles.inputArea}
                        type="username"
                        placeholder="Enter username"
                        value={values.username}
                        onChange={changeHandler} />
                    <label className="text-muted">
                        The username you will be using on the forum.
                    </label>
                </div>

                <div className="mb-3" id="formPassword">
                    <label>Password</label>
                    <input name="password"
                        className={styles.inputArea}
                        type="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={changeHandler} />
                </div>

                <div className="mb-3" id="formConfirmPassword">
                    <label>Confirm Password</label>
                    <input name="confirmPassword"
                        className={styles.inputArea}
                        type="password"
                        placeholder="Confirm Password"
                        value={values.confirmPassword}
                        onChange={changeHandler} />
                </div>
                <Button variant="primary" type="submit">
                    Register
                </Button>
                <Link className={styles.goToLogin} to="/login">Login</Link>
            </form>
        </div>
    );
}