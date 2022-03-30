import React from 'react';
import Link from 'next/dist/client/link';

import styles from '../styles/Footer.module.css';

export default function Footer() {
    return (
        <div>
            <footer className={styles.footer}>
                <p>Copyright &copy; DJ Events 2021</p>
                <p>
                    <Link href="/about">About this Project</Link>
                </p>
            </footer>
        </div>
    );
}
