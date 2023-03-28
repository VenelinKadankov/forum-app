import { ThemeCard } from './ThemeCard';

import styles from './Catalog.module.css';

export const Catalog = ({ themes }) => {
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