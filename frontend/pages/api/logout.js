import { API_URL } from '@/config/index';

import axios from 'axios';

import cookie from 'cookie';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req, res) => {
    if (req.method === 'POST') {
        // destroy cookie
        res.setHeader(
            'Set-Cookie',
            cookie.serialize('token', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                expires: new Date(0),
                sameSite: 'strict',
                path: '/',
            })
        );

        res.status(200).json({ message: 'success' });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
};
