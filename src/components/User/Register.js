import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import styles from './Register.module.css';

export const RegisterUser = () => {
    return (
        <div className={styles.registerAreaFlex}>
            <Form className={styles.registerArea}>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" autoComplete='on' />
                    <Form.Text className="text-muted">
                        The username you will be using on the forum.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"  autoComplete='on'/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="confirmPassword" placeholder="Confirm Password"  autoComplete='on' />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
                <Link className={styles.goToLogin} to="/login">Login</Link>
            </Form>
        </div>
    );
}