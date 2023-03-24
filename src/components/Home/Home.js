import { Link } from "react-router-dom";

import styles from './Home.module.css';

export const Home = () => {
    return (
        <section>
            <div className={styles.home}>
                <h1 className="home-title">What Are Your Interests?</h1>
                <p className="home-subtitle">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel suscipit reprehenderit rerum rem iure illo quae beatae itaque? Quod beatae officiis consequuntur numquam quo, eius dolorem libero pariatur qui sed ea asperiores, veniam soluta voluptatem! Aspernatur similique id minima non pariatur, ut nobis neque nesciunt ex possimus cupiditate voluptatibus reiciendis.</p>

                <Link className="" to="/catalog">Browse themes</Link>

            </div>
        </section>
    );
};