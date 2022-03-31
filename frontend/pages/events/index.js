import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';

import { API_URL } from '@/config/index';

export default function EventsPage({ events }) {
    return (
        <div>
            <Layout>
                <h1>Events</h1>
                {events.length === 0 && <h3>No upcoming Events</h3>}

                {events.map(({ attributes } = evt, id) => (
                    <EventItem key={id} evt={attributes}></EventItem>
                ))}
            </Layout>
        </div>
    );
}

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/api/events?populate=*&_sort=date:ASC`);
    const json = await res.json();
    const events = json.data;

    return {
        props: { events },
    };
}
