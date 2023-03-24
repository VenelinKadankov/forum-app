import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import styles from './Login.module.css';

export const LoginUser = () => {
    return (
        <div className={styles.loginAreaFlex}>
            <Form className={styles.loginArea}>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" autoComplete='on' />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" autoComplete='on' />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
                <Link className={styles.goToRegister} to="/register">Register</Link>
            </Form>
        </div>
    );
}