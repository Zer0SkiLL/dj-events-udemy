import { React, useState } from 'react';

import styles from '@/styles/Form.module.css';
import { API_URL } from '../config';

import Loading from '@/components/Loading';

export default function ImageUpload({ evtId, imageUploaded, token }) {
    const [image, setImage] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const formData = new FormData();
        formData.append('files', image);
        formData.append('ref', 'api::event.event');
        formData.append('refId', evtId);
        formData.append('field', 'image');

        const res = await fetch(`${API_URL}/api/upload`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (res.ok) {
            imageUploaded();
        }
        setIsLoading(false);
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div>
            {isLoading && <Loading></Loading>}
            <div className={styles.form}>
                <h1>Upload EventImage</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.file}>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <input type="submit" value="Upload" className="btn" />
                </form>
            </div>
        </div>
    );
}
