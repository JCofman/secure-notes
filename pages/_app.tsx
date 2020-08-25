import type { AppProps } from 'next/app';
import '../global.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
};

export default MyApp;
