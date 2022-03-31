import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';

import { useRouter } from 'next/router';
import Link from 'next/link';
import qs from 'qs';

import { API_URL } from '@/config/index';

export default function SearchPage({ events }) {
    const router = useRouter();

    return (
        <div>
            <Layout title="Search Results">
                <Link href="/events">Go Back</Link>
                <h1>Search Results for: {router.query.term}</h1>
                {events.length === 0 && (
                    <h3>No Events found for: {router.query.term}</h3>
                )}

                {events.map(({ attributes } = evt, id) => (
                    <EventItem key={id} evt={attributes}></EventItem>
                ))}
            </Layout>
        </div>
    );
}

export async function getServerSideProps({ query: { term } }) {
    const query = qs.stringify(
        {
            filters: {
                $or: [
                    {
                        name: {
                            $containsi: term,
                        },
                    },
                    {
                        performers: {
                            $containsi: term,
                        },
                    },
                    {
                        description: {
                            $containsi: term,
                        },
                    },
                    {
                        venue: {
                            $containsi: term,
                        },
                    },
                ],
            },
        },
        {
            encode: false,
        }
    );

    const res = await fetch(`${API_URL}/api/events?${query}&populate=*`);
    const json = await res.json();
    const events = json.data;

    return {
        props: { events },
    };
}
