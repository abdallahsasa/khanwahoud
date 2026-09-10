import { usePage } from '@inertiajs/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoadingScreen from '../components/LoadingScreen';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { i18n } = useTranslation();
    const isAr = Boolean(i18n.language?.startsWith('ar'));
    const [isRtl, setIsRtl] = React.useState(isAr);
    const { url } = usePage();

    React.useEffect(() => {
        const ar = Boolean(i18n.language?.startsWith('ar'));
        setIsRtl(ar);
        document.documentElement.dir = ar ? 'rtl' : 'ltr';
        document.documentElement.lang = ar ? 'ar' : 'en';
    }, [i18n.language]);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [url]);
    return (
        <LoadingScreen>
            <div className={`min-h-screen ${isRtl ? 'font-rtl' : ''}`}>
                <Header />
                <main>
                    <article>{children}</article>
                </main>
                <Footer />
            </div>
        </LoadingScreen>
    );
}
