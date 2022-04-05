import { API_URL } from '@/config/index';

import axios from 'axios';

import cookie from 'cookie';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req, res) => {
    if (req.method === 'GET') {
        if (!req.headers.cookie) {
            res.status(403).json({ message: 'Not Authorized' });
            return;
        }

        const { token } = cookie.parse(req.headers.cookie);

        console.log(token);

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const strapiRes = await axios
            .get(`${API_URL}/api/users/me`, config)
            .then((response) => {
                // Handle success.
                console.log('WELL DONE!');
                console.log(response.data);

                res.status(200).send({ user: response.data });
            })
            .catch((error) => {
                // Handle error
                console.log(error);
                res.status(error.response.data.error.status).send(
                    error.response.data.error
                );
            });

        // const strapiRes = await fetch(`${API_URL}/users/me`, {
        //     method: 'GET',
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // });

        // const user = await strapiRes.json();

        // if (strapiRes.ok) {
        //     res.status(200).json({ user });
        // } else {
        //     res.status(403).json({ message: 'User Forbidden' });
        // }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
};
