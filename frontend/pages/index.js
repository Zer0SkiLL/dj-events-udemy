import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';

import { API_URL } from '@/config/index';
import Link from 'next/link';

export default function Home({ events }) {
    return (
        <div>
            <Layout>
                <h1>Upcoming Events</h1>
                {events.length === 0 && <h3>No upcoming Events</h3>}

                {events.map(({ attributes } = evt, id) => (
                    <EventItem key={id} evt={attributes}></EventItem>
                ))}
                {events.length > 0 && (
                    <Link href="/events">
                        <a className="btn-secondary">Show All</a>
                    </Link>
                )}
            </Layout>
        </div>
    );
}

export async function getServerSideProps() {
    const res = await fetch(
        `${API_URL}/api/events?populate=*&_sort=date:ASC&_limit=3`
    );
    const json = await res.json();
    const events = json.data;

    return {
        props: { events },
    };
}
