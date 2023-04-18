import { Link } from "react-router-dom";

import styles from './Contacts.module.css';

export const Contacts = () => {


    return (
        <section>
            <div className={styles.contacts}>
                <h1 className={styles.contactsTitle}>Our goals.</h1>
                <p className={styles.contactsSubTitle}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Similique aperiam impedit ex?
                    Quisquam unde ducimus praesentium vero,
                    quos maiores tempora reiciendis incidunt laboriosam quaerat est nihil quidem non quibusdam!
                    Fuga, voluptate voluptas. Corrupti blanditiis eos ducimus aliquid atque pariatur nihil,
                    minima ex enim, adipisci obcaecati suscipit veritatis,
                    laborum cumque excepturi eum porro ea voluptates numquam inventore perspiciatis libero a repellendus sed.
                    Modi expedita dolorem soluta quo explicabo nobis dolore eligendi, velit ea ut aliquam,
                    reprehenderit ipsam quae possimus! Quisquam architecto iusto non error,
                    atque libero at corrupti natus minima voluptatum, eligendi deserunt neque pariatur, omnis nam!
                    Nostrum repellat natus deserunt!</p>

                <p className={styles.contactsData}>email: email@email.com</p>
                <p className={styles.contactsData}>phone: 0888 888 888</p>
            </div>
        </section>
    );
};