import { API_URL } from '@/config/index';

import axios from 'axios';

import cookie from 'cookie';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req, res) => {
    if (req.method === 'POST') {
        const { identifier, password } = req.body;

        const strapiRes = axios
            .post(`${API_URL}/api/auth/local`, {
                identifier,
                password,
            })
            .then((response) => {
                // Handle success.
                res.setHeader(
                    'Set-Cookie',
                    cookie.serialize('token', response.data.jwt, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        maxAge: 60 * 60 * 24 * 90, // 3 Months
                        sameSite: 'strict',
                        path: '/',
                    })
                );

                res.status(200).send({ user: response.data.user });
            })
            .catch((error) => {
                // Handle error
                res.status(error.response.data.error.status).send(
                    error.response.data.error
                );
            });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({
            message: `Method ${req.method} is not allowed.`,
        });
    }

    //     const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             identifier,
    //             password,
    //         }),
    //     });

    //     const data = await strapiRes.json();

    //     if (strapiRes.ok) {
    //         // @todo - set cookie - data.jwt
    //         res.setHeader(
    //             'Set-Cookie',
    //             cookie.serialize('token', data.jwt, {
    //                 httpOnly: true,
    //                 secure: process.env.NODE_ENV !== 'development',
    //                 maxAge: 60 * 60 * 24 * 365, // 1 Year
    //                 sameSite: 'strict',
    //                 path: '/',
    //             })
    //         );

    //         res.status(200).json({ user: data.user });
    //     } else {
    //         res.status(data.error.status).json({
    //             message: data.error.message,
    //         });
    //     }
    // } else {
    //     res.setHeader('Allow', ['POST']);
    //     res.status(405).json({ message: `Method ${req.method} not allowed` });
    // }
};
