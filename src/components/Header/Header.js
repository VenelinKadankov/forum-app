import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../logo1.svg';
import styles from './Header.module.css';

export const Header = () => {
    return (
        <Nav defaultActiveKey="/" as="ul" className={styles.header}>
            <div id='allUsersNavLinks' className={styles.headerItem}>
                <NavLink className={styles.navLogo} to="/"><img src={logo} className={styles.logo} alt='logo' /></NavLink>
                <NavLink className={styles.navItem} to="/">Home</NavLink>
                <NavLink className={styles.navItem} to="/topics">Topics</NavLink>
                <NavLink className={styles.navItem} to="/contacts">Contacts</NavLink>
            </div>
            <NavLink className={styles.navItem} to="/catalog">Catalog</NavLink>
            <div id='unloggedNavLinks' className={styles.headerItem}>
                <NavLink className={styles.navItem} to="/login">Login</NavLink>
                <NavLink className={styles.navItem} to="/register">Register</NavLink>
            </div>
        </Nav>
    );
}