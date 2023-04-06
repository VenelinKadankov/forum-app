import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';

import styles from './Login.module.css';

const initialValues = { username: '', password: '' };

export const LoginUser = () => {
    const { onLoginSubmit } = useAuthContext();
    const { values, changeHandler, onSubmit } = useForm(initialValues, onLoginSubmit);

    return (
        <div className={styles.loginAreaFlex}>
            <form className={styles.loginArea} method="POST" onSubmit={onSubmit}>
                <div className="mb-3">
                    <label>Username</label>
                    <input className={styles.inputArea}
                        name="username"
                        type="text"
                        placeholder="JohnDoe"
                        value={values.username}
                        onChange={changeHandler}
                        autoComplete="on" />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input className={styles.inputArea}
                        name="password"
                        type="password"
                        placeholder="**********"
                        value={values.password}
                        onChange={changeHandler}
                        autoComplete="on" />
                </div>
                <button className={styles.loginbtn} variant="primary" type="submit">
                    Login
                </button>
                <Link className={styles.goToRegister} to="/register">Register</Link>
            </form>
        </div>
    );
}