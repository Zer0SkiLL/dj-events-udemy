import { React, useState, useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';

import Layout from '@/components/Layout';

import styles from '@/styles/AuthForm.module.css';

import { FaUser } from 'react-icons/fa';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const { register, error } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            toast.error('Passwords do not match');
            return;
        }

        register({ username, email, password });
    };

    return (
        <div>
            <Layout title="User Registration">
                <div className={styles.auth}>
                    <h1>
                        <FaUser></FaUser> Register
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            ></input>
                        </div>
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
                        <div>
                            <label htmlFor="passwordConfirm">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="passwordConfirm"
                                value={passwordConfirm}
                                onChange={(e) =>
                                    setPasswordConfirm(e.target.value)
                                }
                            ></input>
                        </div>

                        <input
                            type="submit"
                            value="Login"
                            className="btn"
                        ></input>
                    </form>
                    <p>
                        Aready have an Account?
                        <Link href="/account/login"> Login</Link>
                    </p>
                </div>
            </Layout>
        </div>
    );
}