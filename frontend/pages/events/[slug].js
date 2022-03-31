import React from 'react';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';

import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import styles from '@/styles/Event.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function EventsDetailPage({ evt }) {
    const deleteEvent = (e) => {
        console.log('delete');
    };
    return (
        <div>
            <Layout>
                <div className={styles.event}>
                    <div className={styles.controls}>
                        <Link href={`/events/edit/${evt.id}`}>
                            <a>
                                <FaPencilAlt></FaPencilAlt>Edit Event
                            </a>
                        </Link>
                        <a
                            href="#"
                            className={styles.delete}
                            onClick={deleteEvent}
                        >
                            <FaTimes></FaTimes> Delete Event
                        </a>
                    </div>

                    <span>
                        {new Date(evt.date).toLocaleDateString('de-CH')} at{' '}
                        {evt.time}
                    </span>
                    <h1>{evt.name}</h1>
                    {evt.image.data && (
                        <div className={styles.image}>
                            <Image
                                src={
                                    evt.image.data.attributes.formats.medium.url
                                }
                                width={960}
                                height={600}
                                alt="event image"
                            />
                        </div>
                    )}

                    <h3>Performers:</h3>
                    <p>{evt.performers}</p>
                    <h3>Description:</h3>
                    <p>{evt.description}</p>
                    <h3>Venue: {evt.venue}</h3>
                    <p>{evt.address}</p>

                    <Link href="/events">
                        <a className={styles.back}>{'<'} Go Back</a>
                    </Link>
                </div>
            </Layout>
        </div>
    );
}

export async function getServerSideProps({ query: { slug } }) {
    const res = await fetch(
        `${API_URL}/api/events/?filters[slug][$eq]=${slug}&populate=*`
    );
    const json = await res.json();
    const events = json.data;

    return {
        props: {
            evt: events[0].attributes,
        },
    };
}
