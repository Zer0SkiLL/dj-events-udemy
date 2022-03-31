import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';

import { API_URL } from '@/config/index';

export default function EventsPage({ events }) {
    console.log(events);
    return (
        <div>
            <Layout>
                <h1>Events</h1>
                {events.length === 0 && <h3>No upcoming Events</h3>}

                {events.map((evt) => (
                    <EventItem key={evt.id} evt={evt}></EventItem>
                ))}
            </Layout>
        </div>
    );
}

export async function getServerSideProps() {
    const res = await fetch(`${API_URL}/api/events`);
    const events = await res.json();

    return {
        props: { events: events.slice(0, 3) },
    };
}
