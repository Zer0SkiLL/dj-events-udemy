import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import Link from 'next/link';

import { API_URL } from '@/config/index';
import Pagination from '@/components/Pagination';

const PER_PAGE = 5;

export default function EventsPage({ events, page, pageTotal }) {
    return (
        <div>
            <Layout>
                <h1>Events</h1>
                {events.length === 0 && <h3>No upcoming Events</h3>}

                {events.map(({ attributes } = evt, id) => (
                    <EventItem key={id} evt={attributes}></EventItem>
                ))}

                <Pagination page={page} lastPage={pageTotal}></Pagination>
            </Layout>
        </div>
    );
}

export async function getServerSideProps({ query: { page = 1 } }) {
    const res = await fetch(
        `${API_URL}/api/events?populate=*&_sort=date:ASC&pagination[pageSize]=${PER_PAGE}&pagination[page]=${page}`
    );
    const json = await res.json();

    page = json.meta.pagination.page;

    const events = json.data;

    console.log(json);

    return {
        props: {
            events,
            page,
            pageTotal: json.meta.pagination.pageCount,
        },
    };
}
