import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { url } = usePage();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isAr = i18n.language?.startsWith('ar');

    // Close on Escape key
    useEffect(() => {
        if (!isMenuOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsMenuOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isMenuOpen]);

    const setLanguage = (newLang: 'en' | 'ar') => {
        i18n.changeLanguage(newLang);
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLang;
        try {
            localStorage.setItem('i18nextLng', newLang);
            document.cookie = `locale=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
            document.cookie = `i18nextLng=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
        } catch (e) {}
    };

    const toggleLanguage = () => {
        setLanguage(isAr ? 'en' : 'ar');
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [url]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    // Left navigation group (before logo): Rebirth - Stay
    const leftNavItems = [
        { name: t('nav.rebirth'), path: '/restoration' },
        { name: t('nav.stay'), path: '/rooms' },
    ];

    // Right navigation group (after logo): Events - Dine
    const rightNavItems = [
        { name: t('nav.events'), path: '/events' },
        { name: t('nav.dine'), path: '/dining' },
    ];

    // All links for mobile menu
    const mobileNavItems = [
        { name: t('nav.rebirth'), path: '/restoration' },
        { name: t('nav.stay'), path: '/rooms' },
        { name: t('nav.events'), path: '/events' },
        { name: t('nav.dine'), path: '/dining' },
        { name: t('nav.contact'), path: '/contact' },
    ];

    const isActive = (path: string) => {
        if (path === '/') return url === '/';
        return url.startsWith(path);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
                isScrolled
                    ? 'bg-accent-950/95 py-2 sm:py-3 shadow-2xl backdrop-blur-md border-b border-secondary-300/10'
                    : 'bg-gradient-to-b from-accent-950/85 via-accent-950/40 to-transparent py-2.5 sm:py-3 lg:py-5'
            }`}
        >
            <div className="relative w-full max-w-[1920px] mx-auto px-4 lg:px-8 xl:px-12">
                <div className="flex items-center justify-between min-h-[52px] sm:min-h-[64px]">
                    {/* Mobile Brand (Left on Mobile) */}
                    <div className="flex items-center lg:hidden">
                        <Link href="/" className="flex items-center">
                            <img src="/images/logowahoud.png" alt="Khan Wahoud" className="h-11 sm:h-13 w-auto object-contain" />
                        </Link>
                    </div>

                    {/* Desktop Navigation: Perfectly Symmetrical Centered Unit */}
                    <nav className="hidden w-full items-center justify-center lg:flex">
                        <div className="flex items-center justify-center gap-x-6 xl:gap-x-10">
                            {/* Left Wing (Exact same width as Right Wing): Rebirth - Stay */}
                            <div className="w-[280px] xl:w-[340px] flex items-center justify-around rtl:justify-around">
                                {leftNavItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={`whitespace-nowrap text-xs xl:text-sm tracking-[0.14em] rtl:tracking-normal uppercase rtl:normal-case transition-colors py-2 relative font-sans ${
                                            isActive(item.path)
                                                ? 'text-white font-semibold border-b-2 border-primary-700'
                                                : 'text-secondary-300 hover:text-white'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Center Brand Logo (Exactly in the middle between both wings) */}
                            <Link
                                href="/"
                                className="transition-transform hover:scale-105 duration-300 block px-2 flex-shrink-0"
                                aria-label="Khan Wahoud"
                            >
                                <img
                                    src="/images/logowahoud.png"
                                    alt="Khan Wahoud"
                                    className="h-16 xl:h-20 w-auto object-contain drop-shadow-md"
                                />
                            </Link>

                            {/* Right Wing (Exact same width as Left Wing): Events - Dine */}
                            <div className="w-[280px] xl:w-[340px] flex items-center justify-around rtl:justify-around">
                                {rightNavItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={`whitespace-nowrap text-xs xl:text-sm tracking-[0.14em] rtl:tracking-normal uppercase rtl:normal-case transition-colors py-2 relative font-sans ${
                                            isActive(item.path)
                                                ? 'text-white font-semibold border-b-2 border-primary-700'
                                                : 'text-secondary-300 hover:text-white'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </nav>

                    {/* DESKTOP LANGUAGE SWITCHER PILL (Pinned to edge, never offsets the logo) */}
                    <div className="hidden lg:block absolute right-4 lg:right-6 xl:right-10 rtl:right-auto rtl:left-4 rtl:lg:left-6 rtl:xl:left-10 top-1/2 -translate-y-1/2 z-20">
                        <div className="flex items-center gap-1 rounded-full border border-secondary-300/30 bg-accent-950/60 p-1 backdrop-blur-md shadow-lg">
                            <Globe size={14} className="mx-1.5 text-secondary-400" />
                            <button
                                onClick={() => setLanguage('en')}
                                className={`rounded-full px-2.5 py-0.5 text-xs font-sans tracking-wider transition-all ${
                                    !isAr
                                        ? 'bg-primary-700 text-white font-semibold shadow-sm'
                                        : 'text-secondary-300 hover:text-white'
                                }`}
                                aria-label="English"
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setLanguage('ar')}
                                className={`rounded-full px-2.5 py-0.5 text-xs font-serif transition-all ${
                                    isAr
                                        ? 'bg-primary-700 text-white font-semibold shadow-sm'
                                        : 'text-secondary-300 hover:text-white'
                                }`}
                                aria-label="العربية"
                            >
                                العربية
                            </button>
                        </div>
                    </div>

                    {/* Mobile Controls: Language Switcher & Hamburger */}
                    <div className="flex items-center gap-3 lg:hidden">
                        <div className="flex items-center rounded-full border border-secondary-300/30 bg-accent-950/50 p-0.5 text-xs">
                            <button
                                onClick={() => setLanguage('en')}
                                className={`rounded-full px-2 py-0.5 text-[11px] ${
                                    !isAr ? 'bg-primary-700 text-white font-medium' : 'text-secondary-300'
                                }`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setLanguage('ar')}
                                className={`rounded-full px-2 py-0.5 text-[11px] font-serif ${
                                    isAr ? 'bg-primary-700 text-white font-medium' : 'text-secondary-300'
                                }`}
                            >
                                عربي
                            </button>
                        </div>
                        <button
                            type="button"
                            className="w-11 h-11 flex items-center justify-center rounded-xl text-[#EAE2CC] hover:text-white bg-white/5 hover:bg-white/10 active:bg-white/20 transition-all cursor-pointer focus:outline-none"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsMenuOpen(!isMenuOpen);
                            }}
                            aria-label={isMenuOpen ? 'Close menu' : 'Toggle menu'}
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer via Portal directly to body */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isMenuOpen && (
                        <div className="fixed inset-0 z-[999999] lg:hidden" dir={isAr ? 'rtl' : 'ltr'}>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
                                onClick={() => setIsMenuOpen(false)}
                            />

                            {/* Slide-out Drawer */}
                            <motion.aside
                                initial={{ x: isAr ? '-100%' : '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: isAr ? '-100%' : '100%' }}
                                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                                className={`fixed inset-y-0 ${isAr ? 'left-0' : 'right-0'} w-full sm:max-w-md bg-[#140E0C] text-[#FFFFF5] shadow-2xl flex flex-col justify-between overflow-y-auto overscroll-contain px-6 py-6 z-10`}
                            >
                                <div>
                                    {/* Drawer Top Header */}
                                    <div className="flex items-center justify-between pb-5 border-b border-[#EAE2CC]/15">
                                        <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3">
                                            <img src="/images/logowahoud.png" alt="Khan Wahoud" className="h-12 w-auto object-contain drop-shadow" />
                                            <span className="font-serif text-lg tracking-[0.14em] uppercase text-[#FFFFF5] font-semibold">
                                                {t('khan_wahoud')}
                                            </span>
                                        </Link>
                                        <button
                                            type="button"
                                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#781C1D] text-[#EAE2CC] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                                            onClick={() => setIsMenuOpen(false)}
                                            aria-label="Close menu"
                                        >
                                            <X size={22} />
                                        </button>
                                    </div>

                                    {/* Navigation Links */}
                                    <nav className="mt-8 flex flex-col space-y-2">
                                        {mobileNavItems.map((item) => (
                                            <Link
                                                key={item.path}
                                                href={item.path}
                                                onClick={() => setIsMenuOpen(false)}
                                                className={`py-3.5 px-3 rounded-xl text-base tracking-[0.14em] uppercase font-sans transition-all duration-200 flex items-center justify-between border-b border-white/5 ${
                                                    isActive(item.path)
                                                        ? 'text-white bg-[#781C1D]/60 font-semibold border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#C93A1E]'
                                                        : 'text-[#EAE2CC]/90 hover:text-white hover:bg-white/5'
                                                }`}
                                            >
                                                <span>{item.name}</span>
                                                <span className="text-xs opacity-40 rtl:rotate-180">→</span>
                                            </Link>
                                        ))}
                                    </nav>

                                    {/* Quick CTA inside Mobile Menu */}
                                    <div className="mt-8 pt-6 border-t border-[#EAE2CC]/15 grid grid-cols-2 gap-3">
                                        <Link
                                            href="/rooms"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-center py-3 px-3 rounded-xl bg-[#781C1D] hover:bg-[#9E2B21] text-white text-xs uppercase tracking-wider font-semibold shadow-md transition-all cursor-pointer"
                                        >
                                            {t('common.book_your_stay')}
                                        </Link>
                                        <Link
                                            href="/dining"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-center py-3 px-3 rounded-xl bg-[#EDE3D8] hover:bg-white text-[#4A1516] text-xs uppercase tracking-wider font-semibold shadow-md transition-all cursor-pointer"
                                        >
                                            {t('common.book_a_table')}
                                        </Link>
                                    </div>
                                </div>

                                {/* Language Switcher in Mobile Drawer Bottom */}
                                <div className="pt-8 pb-4 mt-8 border-t border-[#EAE2CC]/15 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-[#EAE2CC]/80 text-xs tracking-wider uppercase font-sans">
                                        <Globe size={16} />
                                        <span>{t('nav.language')}</span>
                                    </div>
                                    <div className="flex items-center rounded-full border border-[#EAE2CC]/25 bg-black/40 p-1">
                                        <button
                                            type="button"
                                            onClick={() => setLanguage('en')}
                                            className={`rounded-full px-3.5 py-1 text-xs font-sans transition-all cursor-pointer ${
                                                !isAr ? 'bg-[#781C1D] text-white font-medium shadow-sm' : 'text-[#EAE2CC]/80 hover:text-white'
                                            }`}
                                        >
                                            English
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setLanguage('ar')}
                                            className={`rounded-full px-3.5 py-1 text-xs font-serif transition-all cursor-pointer ${
                                                isAr ? 'bg-[#781C1D] text-white font-medium shadow-sm' : 'text-[#EAE2CC]/80 hover:text-white'
                                            }`}
                                        >
                                            العربية
                                        </button>
                                    </div>
                                </div>
                            </motion.aside>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </header>
    );
};

export default Header;
