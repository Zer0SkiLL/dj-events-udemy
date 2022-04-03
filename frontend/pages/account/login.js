import { React, useState, useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';

import Layout from '@/components/Layout';

import styles from '@/styles/AuthForm.module.css';

import { FaUser } from 'react-icons/fa';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, error } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <div>
            <Layout title="User Login">
                <div className={styles.auth}>
                    <h1>
                        <FaUser></FaUser> Log In
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>

                        <input
                            type="submit"
                            value="Login"
                            className="btn"
                        ></input>
                    </form>
                    <p>
                        Don&apos;t have an Account?
                        <Link href="/account/register"> Register</Link>
                    </p>
                </div>
            </Layout>
        </div>
    );
}
