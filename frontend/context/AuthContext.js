import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from '@/config/index';
import { toast } from 'react-toastify';
import axios from 'axios';
import { resolveHref } from 'next/dist/shared/lib/router/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const router = useRouter();

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    // register user
    const register = async (user) => {
        console.log(user);
    };

    // login user
    const login = async ({ email: identifier, password }) => {
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identifier,
                password,
            }),
        });
        const data = await res.json();

        console.log(res, data);

        if (res.ok) {
            setUser(data.user);
            router.push('/account/dashboard');
        } else {
            toast.error(data.message);
        }
    };

    // logout user
    const logout = async () => {
        const res = await axios
            .post(`${NEXT_URL}/api/logout`)
            .then((response) => {
                setUser(null);
                router.push('/');
            });
    };

    // check if user is logged in
    const checkUserLoggedIn = async (user) => {
        const res = await axios
            .get(`${NEXT_URL}/api/user`)
            .then((response) => {
                // Handle success.
                setUser(response.data.user);
            })
            .catch((error) => {
                // Handle error
                setUser(null);
            });

        // const res = await fetch(`${NEXT_URL}/api/user`);

        // const data = await res.json();

        // if (res.ok) {
        //     setUser(data.user);
        // } else {
        //     setUser(null);
        // }
    };

    return (
        <AuthContext.Provider value={{ user, error, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
