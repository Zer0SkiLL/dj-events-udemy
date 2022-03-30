import React from 'react';
import styles from '../styles/Layout.module.css';

import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ title, keywords, description, children }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description}></meta>
                <meta name="keyords" content={keywords}></meta>
            </Head>
            <Header></Header>
            <div className={styles.container}>{children}</div>
            <Footer></Footer>
        </div>
    );
}

Layout.defaultProps = {
    title: 'DJ Events and Paries',
    description: 'Find the latest Parties',
    meta: 'EDM, House',
};
