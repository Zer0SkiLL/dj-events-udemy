import React from 'react';

import styles from '@/styles/Loading.module.css';

import { Triangle } from 'react-loader-spinner';

export default function Loading() {
    return (
        <div className={styles.loading}>
            <div className={styles.spinner}>
                <Triangle
                    height="100"
                    width="100"
                    color="grey"
                    ariaLabel="loading"
                />
            </div>
        </div>
    );
}
