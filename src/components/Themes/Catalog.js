import { useEffect, useState } from 'react';

import { serviceFactory } from '../../services/serviceFactory';

import { ThemeCard } from './ThemeCard';

import styles from './Catalog.module.css';

export const Catalog = () => {
    const themeService = serviceFactory('theme');
    const [themes, setThemes] = useState([]);
 
    useEffect(() => {
        themeService.getAll()
            .then(res => {
                setThemes(res)
            });
    }, []);

    
    return (
        <div className={styles.catalog}>
            {/* TODO: Needs search here */}

            {themes.length === 0 ? <h2>No Themes.</h2> :
                themes.map(theme => (
                    <ThemeCard key={theme.id} {...theme}></ThemeCard>
                ))}

            {/* TODO: Needs pagination here */}
        </div>
    );
}