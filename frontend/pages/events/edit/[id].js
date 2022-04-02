import { React, useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaImage } from 'react-icons/fa';

import { API_URL } from '@/config/index';
import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import ImageUpload from '@/components/ImageUpload';
import Loading from '@/components/Loading';

import styles from '@/styles/Form.module.css';
import Image from 'next/image';

export default function EditEventPage({ evt, id }) {
    const [values, setValues] = useState({
        name: evt.name,
        performers: evt.performers,
        venue: evt.venue,
        address: evt.address,
        date: evt.data,
        time: evt.time,
        description: evt.description,
    });

    const [imagePreview, setImagePreview] = useState(
        evt.image.data ? evt.image.data.attributes.formats.thumbnail.url : null
    );

    const [showModal, setShowModal] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        let valid = true;

        for (const [key, value] of Object.entries(values)) {
            if (value === '') {
                valid = false;
                toast.error(`${key} can not be left empty`);
            }
        }
        if (valid) {
            setIsLoading(true);

            const res = await fetch(`${API_URL}/api/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: values }),
            });

            if (!res.ok) {
                setIsLoading(false);
                toast.error(
                    'Something went wrong with posting to strapi. detail in console'
                );
                console.log(res.statusText);
            } else {
                setIsLoading(false);
                const data = await res.json();
                const evt = data.data.attributes;

                router.push(`/events/${evt.slug}`);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const imageUploaded = async (e) => {
        const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
        const json = await res.json();
        const data = json.data;

        setImagePreview(
            data.attributes.image.data.attributes.formats.thumbnail.url
        );
        setShowModal(false);
    };

    return (
        <div>
            <Layout title="Add New Event">
                {isLoading && <Loading></Loading>}
                <Link href="/events">Go Back</Link>
                <h1>Edit Event</h1>
                <ToastContainer position="bottom-right"></ToastContainer>

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
                                value={moment(values.date).format('yyyy-MM-DD')}
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

                    <input type="submit" value="Update Event" className="btn" />
                </form>
                <h2>Event Image</h2>
                {imagePreview ? (
                    <Image
                        src={imagePreview}
                        alt="image preview"
                        height={100}
                        width={170}
                    ></Image>
                ) : (
                    <div>
                        <p>no image uploaded yet</p>
                    </div>
                )}

                <div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="btn-secondary"
                    >
                        <FaImage></FaImage> Set Image
                    </button>
                </div>

                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <ImageUpload
                        evtId={id}
                        imageUploaded={imageUploaded}
                    ></ImageUpload>
                </Modal>
            </Layout>
        </div>
    );
}

export async function getServerSideProps({ params: { id } }) {
    const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
    const json = await res.json();
    const evt = json.data;

    return {
        props: {
            evt: evt.attributes,
            id: evt.id,
        },
    };
}
