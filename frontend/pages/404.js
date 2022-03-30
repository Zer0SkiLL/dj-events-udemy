import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import Link from 'next/link';

import styles from '@/styles/404.module.css';

import Layout from '@/components/Layout';

export default function NotFoundPage() {
    return (
        <div>
            <Layout>
                <div className={styles.error}>
                    <h1>
                        {' '}
                        <FaExclamationTriangle></FaExclamationTriangle>404
                    </h1>
                    <h4>Nicht das geringste zu sehen</h4>
                    <Link href="/">Go Back Home</Link>
                </div>
            </Layout>
        </div>
    );
}
