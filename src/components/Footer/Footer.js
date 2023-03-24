import { Link } from 'react-router-dom';
import logo from '../../logo.svg';

import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <img src={logo} className="App-logo" alt="logo" />
            <div className={styles.links}>
                <Link to="/about" className={styles.footerItem}>About</Link>
                <Link to="/catalog" className={styles.footerItem}>Explore</Link>
                <Link to="/contacts" className={styles.footerItem}>Contacts</Link>
            </div>
        </footer>
    )
}