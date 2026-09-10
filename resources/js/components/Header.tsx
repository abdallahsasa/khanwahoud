import { Link, usePage } from '@inertiajs/react';
import { Globe, Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { url } = usePage();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const isAr = i18n.language?.startsWith('ar');

    const setLanguage = (newLang: 'en' | 'ar') => {
        i18n.changeLanguage(newLang);
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLang;
        try {
            localStorage.setItem('i18nextLng', newLang);
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

    // Left navigation group (before logo)
    const leftNavItems = [
        { name: t('nav.dining'), path: '/dining' },
        { name: t('nav.events'), path: '/events' },
    ];

    // Right navigation group (after logo)
    const rightNavItems = [
        { name: t('nav.restoration'), path: '/restoration' },
        { name: t('nav.rooms'), path: '/rooms' },
        { name: t('nav.contact'), path: '/contact' },
    ];

    // All links for mobile menu
    const mobileNavItems = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.dining'), path: '/dining' },
        { name: t('nav.events'), path: '/events' },
        { name: t('nav.experience'), path: '/experience' },
        { name: t('nav.restoration'), path: '/restoration' },
        { name: t('nav.rooms'), path: '/rooms' },
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
                    ? 'bg-accent-950/95 py-3 shadow-2xl backdrop-blur-md border-b border-secondary-300/10'
                    : 'bg-gradient-to-b from-accent-950/85 via-accent-950/40 to-transparent py-5'
            }`}
        >
            <div className="relative w-full max-w-[1920px] mx-auto px-4 lg:px-8 xl:px-12">
                <div className="flex items-center justify-between min-h-[64px]">
                    {/* Mobile Brand (Left on Mobile) */}
                    <div className="flex items-center lg:hidden">
                        <Link href="/" className="flex items-center">
                            <img src="/images/logowahoud.png" alt="Khan Wahoud" className="h-14 w-auto object-contain" />
                        </Link>
                    </div>

                    {/* Desktop Navigation Halves (50% left, 50% right) */}
                    <nav className="hidden w-full items-center lg:flex">
                        {/* Left Group — Right-aligned towards center logo */}
                        <div className="w-1/2 flex items-center justify-end space-x-8 xl:space-x-12 rtl:space-x-reverse pr-20 xl:pr-28 rtl:pr-0 rtl:pl-20 rtl:xl:pl-28">
                            {leftNavItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`whitespace-nowrap text-xs xl:text-sm tracking-[0.18em] uppercase transition-colors py-2 relative font-sans ${
                                        isActive(item.path)
                                            ? 'text-white font-semibold border-b-2 border-primary-700'
                                            : 'text-secondary-300 hover:text-white'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Right Group — Left-aligned away from center logo */}
                        <div className="w-1/2 flex items-center justify-start space-x-8 xl:space-x-12 rtl:space-x-reverse pl-20 xl:pl-28 pr-32 xl:pr-36 rtl:pl-32 rtl:xl:pl-36 rtl:pr-20 rtl:xl:pr-28">
                            {rightNavItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`whitespace-nowrap text-xs xl:text-sm tracking-[0.18em] uppercase transition-colors py-2 relative font-sans ${
                                        isActive(item.path)
                                            ? 'text-white font-semibold border-b-2 border-primary-700'
                                            : 'text-secondary-300 hover:text-white'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* TRUE DEAD-CENTER BRAND LOGO (100% mathematically centered) */}
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
                        <Link href="/" className="transition-transform hover:scale-105 duration-300 block p-1" aria-label="Khan Wahoud">
                            <img src="/images/logowahoud.png" alt="Khan Wahoud" className="h-16 xl:h-20 w-auto object-contain drop-shadow-md" />
                        </Link>
                    </div>

                    {/* DESKTOP LANGUAGE SWITCHER PILL (Pinned to edge, never offsets the logo) */}
                    <div className="hidden lg:block absolute right-4 lg:right-8 xl:right-12 rtl:right-auto rtl:left-4 rtl:lg:left-8 rtl:xl:left-12 top-1/2 -translate-y-1/2 z-20">
                        <div className="flex items-center rounded-full border border-secondary-300/30 bg-accent-950/60 p-1 backdrop-blur-md shadow-lg">
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
                            className="text-secondary-300 focus:outline-none p-1"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <div
                className={`bg-accent-950/98 fixed inset-0 z-50 transform backdrop-blur-lg transition-transform duration-300 lg:hidden ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'
                }`}
            >
                <div className="container mx-auto h-screen px-6 py-8 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between pb-6 border-b border-accent-800">
                            <img src="/images/logowahoud.png" alt="Khan Wahoud" className="h-12 w-auto" />
                            <button
                                className="text-secondary-300 focus:outline-none"
                                onClick={() => setIsMenuOpen(false)}
                                aria-label="Close menu"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <nav className="mt-8 flex flex-col space-y-3">
                            {mobileNavItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`py-2 text-lg tracking-wider transition-colors border-b border-accent-800/40 ${
                                        isActive(item.path)
                                            ? 'text-primary-600 font-medium'
                                            : 'text-secondary-300 hover:text-white'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Language Switcher in Mobile Drawer Bottom */}
                    <div className="pb-8 pt-4 border-t border-accent-800 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-secondary-400 text-sm">
                            <Globe size={18} />
                            <span>{t('nav.language')}</span>
                        </div>
                        <div className="flex items-center rounded-full border border-secondary-300/30 p-1">
                            <button
                                onClick={() => setLanguage('en')}
                                className={`rounded-full px-4 py-1 text-sm font-sans ${
                                    !isAr ? 'bg-primary-700 text-white font-medium' : 'text-secondary-300'
                                }`}
                            >
                                English
                            </button>
                            <button
                                onClick={() => setLanguage('ar')}
                                className={`rounded-full px-4 py-1 text-sm font-serif ${
                                    isAr ? 'bg-primary-700 text-white font-medium' : 'text-secondary-300'
                                }`}
                            >
                                العربية
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
