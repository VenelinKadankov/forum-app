import { ThemeCard } from './ThemeCard';

export const Catalog = ({ themes }) => {
    return (
        <>
            {/* {themes.map(theme => {
                <ThemeCard key={theme.id} {...theme}></ThemeCard>
            })} */}

            {themes.length === 0 ? <h2>No Themes.</h2> :
                themes.map(theme => (
                    <ThemeCard key={theme.id} {...theme}></ThemeCard>
                ))}
        </>
    );
}