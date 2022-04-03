import '../styles/globals.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from '@/context/AuthContext';

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <ToastContainer position="bottom-right"></ToastContainer>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
