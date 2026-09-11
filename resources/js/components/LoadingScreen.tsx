import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

let hasShownInSession = false;

const LoadingScreen: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { t } = useTranslation();
    const [year, setYear] = useState(1736);
    const targetYear = 2026;
    const [isLoading, setIsLoading] = useState(() => {
        if (typeof window === 'undefined') return false;
        if (hasShownInSession) return false;
        try {
            return !sessionStorage.getItem('kw_initial_loader_shown');
        } catch {
            return false;
        }
    });

    useEffect(() => {
        if (!isLoading) return;

        const minLoadingTime = 1500;
        const totalDuration = 1000; // 1 second for the animation
        const interval = totalDuration / (targetYear - 1736);

        const timer = setInterval(() => {
            setYear((prevYear) => {
                if (prevYear < targetYear) {
                    return prevYear + 1;
                } else {
                    clearInterval(timer);
                    return targetYear;
                }
            });
        }, interval);

        const completeLoading = () => {
            setIsLoading(false);
            hasShownInSession = true;
            try {
                sessionStorage.setItem('kw_initial_loader_shown', 'true');
            } catch {}
        };

        // A promise that resolves when the page is fully loaded
        const imagesLoaded = new Promise<void>((resolve) => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('load', () => resolve(), { once: true });
            }
        });

        const timeout = new Promise<void>((resolve) => setTimeout(resolve, minLoadingTime));

        Promise.all([imagesLoaded, timeout]).then(() => {
            completeLoading();
        });

        const timer2 = setTimeout(() => {
            completeLoading();
        }, minLoadingTime);

        return () => {
            clearInterval(timer);
            clearTimeout(timer2);
        };
    }, [isLoading]);

    return isLoading ? (
        <motion.div
            className="bg-accent-950 text-secondary-300 fixed inset-0 z-50 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="mb-8">
                <img src="/images/logowahoud.png" alt="Khan Wahoud Logo" className="h-32 w-32 object-contain" />
            </motion.div>

            <div className="text-center">
                <div className="mb-2 text-sm tracking-widest uppercase">{t('loading.year')}</div>
                <motion.div
                    className="mb-6 font-serif text-6xl font-bold"
                    key={year}
                    initial={{ y: 20, opacity: 0.7 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {year}
                </motion.div>

                <motion.div
                    className="bg-primary-700 relative mb-6 h-1 w-60"
                    initial={{ width: 0 }}
                    animate={{
                        width: 240 * ((year - 1736) / (targetYear - 1736)),
                    }}
                    transition={{ duration: 0.1, ease: 'linear' }}
                >
                    <div className="bg-secondary-300 absolute -top-2 left-0 h-5 w-1"></div>
                    <div className="bg-secondary-300 absolute -top-2 right-0 h-5 w-1"></div>
                </motion.div>

                <div className="flex w-60 justify-between text-xs">
                    <div className="text-secondary-300 opacity-50">{t('loading.original')}</div>
                    <div className="text-secondary-300">{t('loading.rebirth')}</div>
                </div>
            </div>
        </motion.div>
    ) : (
        children
    );
};

export default LoadingScreen;
