import { React, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseCookies } from '@/helpers/index';

import { API_URL } from '@/config/index';
import Layout from '@/components/Layout';

import styles from '@/styles/Form.module.css';

export default function AddEventPage({ token }) {
    const [values, setValues] = useState({
        name: '',
        performers: '',
        venue: '',
        address: '',
        date: '',
        time: '',
        description: '',
    });

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        let valid = true;
        // validation
        for (const [key, value] of Object.entries(values)) {
            if (value === '') {
                valid = false;
                toast.error(`${key} can not be left empty`);
            }
        }
        if (valid) {
            const res = await fetch(`${API_URL}/api/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ data: values }),
            });

            if (!res.ok) {
                if (res.status === 401 || res.status === 403) {
                    toast.error('No Token included');
                    return;
                }
                toast.error(
                    'Something went wrong with posting to strapi. detail in console'
                );

                console.log(
                    res.statusText,
                    'maybe use a unique name for your event'
                );
            } else {
                const evt = await res.json();

                router.push(`/events/${evt.slug}`);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <div>
            <Layout title="Add New Event">
                <Link href="/events">Go Back</Link>
                <h1>Add Event</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.grid}>
                        <div>
                            <label htmlFor="name">Event Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={values.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="performers">Performers</label>
                            <input
                                type="text"
                                name="performers"
                                id="performers"
                                value={values.performers}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="venue">Venue</label>
                            <input
                                type="text"
                                name="venue"
                                id="venue"
                                value={values.venue}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={values.address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                name="date"
                                id="date"
                                value={values.date}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="time">Time</label>
                            <input
                                type="text"
                                name="time"
                                id="time"
                                value={values.time}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description">Event Description</label>
                        <textarea
                            type="text"
                            name="description"
                            id="description"
                            value={values.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    <input type="submit" value="Add Event" className="btn" />
                </form>
            </Layout>
        </div>
    );
}

export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req);

    return {
        props: {
            token,
        },
    };
}
