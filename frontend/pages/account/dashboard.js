import React from 'react';

import { parseCookies } from '@/helpers/index';
import Layout from '@/components/Layout';
import DashboardEvent from '@/components/DashboardEvent';
import { API_URL } from '@/config/index';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from '@/styles/Dashboard.module.css';
import { useRouter } from 'next/router';

export default function DashboardPage({ events, token }) {
    const router = useRouter();

    const deleteEvent = async (id) => {
        if (confirm('Are you sure?')) {
            const res = await fetch(`${API_URL}/api/events/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 403 || res.status === 401) {
                    toast.error('Aunauthorized');
                    return;
                }
                toast.error(
                    'Something went wrong with posting to strapi. detail in console'
                );
                console.log(res.statusText);
                return;
            } else {
                router.reload();
            }
        }
    };

    console.log(events);
    return (
        <div>
            <Layout title="User Dashboard">
                <div className={styles.dash}>
                    <h1>Dashboard</h1>
                    <h3>My Events</h3>

                    {events.map((m) => (
                        <DashboardEvent
                            key={m.id}
                            evt={m}
                            handleDelete={deleteEvent}
                        />
                    ))}
                </div>
            </Layout>
        </div>
    );
}

export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req);

    const res = await fetch(`${API_URL}/api/events/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const events = await res.json();

    return {
        props: {
            events,
            token,
        },
    };
}
