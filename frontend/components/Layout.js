import React from 'react';
import { useRouter } from 'next/router';

import styles from '@/styles/Layout.module.css';

import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import Showcase from './Showcase';

export default function Layout({ title, keywords, description, children }) {
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description}></meta>
                <meta name="keyords" content={keywords}></meta>
            </Head>

            <Header></Header>

            {router.pathname === '/' && <Showcase></Showcase>}

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
