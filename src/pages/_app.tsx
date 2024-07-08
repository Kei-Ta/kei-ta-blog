import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (process.env.NODE_ENV === 'production') {
                router.push(`${process.env.NEXT_PUBLIC_BASE_PATH}${url}`);
            }
        };

        router.events.on('routeChangeStart', handleRouteChange);
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router]);

    return <Component {...pageProps} />;
}

export default MyApp;
