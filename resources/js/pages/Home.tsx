import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import Button from '../components/Button';
import DamascusMap from '../components/DamascusMap';
import SectionTitle from '../components/SectionTitle';
import YearAnimation from '../components/YearAnimation';

const HomePage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language?.startsWith('ar');

    const [heroRef, heroInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const handleScroll = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    };
    const galleryImages = [
        '/images/IMG_4643.JPEG',
        '/images/IMG_3772.png',
        '/images/1fa4b053-9d90-4471-ada4-730779b8b750.jpg',
        '/images/IMG_4466.JPEG',
        '/images/IMG_4474.JPEG',
        '/images/IMG_4465.JPEG',
    ];

    const [vipRef, vipInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [galleryRef, galleryInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen">
                <div className="absolute inset-0 z-0">
                    <img src={'/images/side hall high.jpg'} alt="Luxury Room" className="h-full w-full object-cover" />
                    <div className="bg-accent-950 absolute inset-0 opacity-50"></div>
                </div>

                <div ref={heroRef} className="relative flex h-full flex-col items-center justify-between px-4 text-center text-white pt-32 sm:pt-36 md:pt-44 lg:pt-48 xl:pt-52 pb-14 md:pb-16 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                        className="font-serif w-full max-w-4xl mx-auto flex-shrink-0"
                    >
                        <h1 className="text-secondary-300 mb-2 md:mb-3 text-4xl font-bold md:text-6xl tracking-wide">{t('khan_wahoud')}</h1>
                        <span className="text-secondary-400/90 text-xs md:text-sm font-sans tracking-widest uppercase block mb-1">{t('at')}</span>
                        <p className="text-secondary-300 mb-4 md:mb-6 text-base font-bold md:text-lg">
                            {t('khan_Suleyman')}
                            <br />
                            {t('since_1736')}
                        </p>

                        <YearAnimation />
                    </motion.div>

                    {/* Centered between timeline bar and footer of the main image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="flex-1 flex items-center justify-center w-full px-4 my-auto py-2"
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-4xl mx-auto">
                            {/* Book Your Stay */}
                            <Link
                                href="/rooms"
                                className="group relative w-full sm:w-auto min-w-[190px] md:min-w-[210px] text-center flex items-center justify-center px-8 py-3.5 text-[11px] rtl:text-xs md:rtl:text-sm tracking-[0.25em] rtl:tracking-normal uppercase rtl:normal-case font-sans font-medium text-secondary-200 border border-secondary-300/30 backdrop-blur-sm bg-accent-950/30 transition-all duration-500 hover:bg-secondary-200/10 hover:border-secondary-300/60"
                            >
                                <span className="relative z-10">{t('common.book_your_stay')}</span>
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-secondary-300 transition-all duration-500 group-hover:w-full" />
                            </Link>

                            {/* Book A Table — Primary CTA */}
                            <Link
                                href="/dining"
                                className="group relative w-full sm:w-auto min-w-[190px] md:min-w-[210px] text-center flex items-center justify-center px-10 py-3.5 text-[11px] rtl:text-xs md:rtl:text-sm tracking-[0.25em] rtl:tracking-normal uppercase rtl:normal-case font-sans font-semibold text-secondary-100 border border-primary-600/50 bg-primary-800/60 backdrop-blur-sm transition-all duration-500 hover:bg-primary-700/80 hover:border-primary-500/70 hover:shadow-[0_0_30px_rgba(158,43,33,0.2)]"
                            >
                                <span className="relative z-10">{t('common.book_a_table')}</span>
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-primary-400 transition-all duration-500 group-hover:w-full" />
                            </Link>

                            {/* Private Events */}
                            <Link
                                href="/events"
                                className="group relative w-full sm:w-auto min-w-[190px] md:min-w-[210px] text-center flex items-center justify-center px-8 py-3.5 text-[11px] rtl:text-xs md:rtl:text-sm tracking-[0.25em] rtl:tracking-normal uppercase rtl:normal-case font-sans font-medium text-secondary-200 border border-secondary-300/30 backdrop-blur-sm bg-accent-950/30 transition-all duration-500 hover:bg-secondary-200/10 hover:border-secondary-300/60"
                            >
                                <span className="relative z-10">{t('common.private_events')}</span>
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-secondary-300 transition-all duration-500 group-hover:w-full" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="absolute right-0 bottom-4 md:bottom-5 left-0 flex justify-center z-10 pointer-events-none"
                >
                    <button onClick={handleScroll} className="animate-bounce cursor-pointer focus:outline-none pointer-events-auto" aria-label={t('home.scroll')}>
                        <div className="border-secondary-300 flex h-10 w-6 justify-center rounded-full border-2">
                            <div className="bg-secondary-300 mt-1.5 h-3 w-1 rounded-full"></div>
                        </div>
                    </button>
                </motion.div>
            </section>

            {/* Introduction Section */}
            <section className="bg-secondary-50 py-20 md:py-28 overflow-hidden">
                <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                        {/* Left Column: Text & CTA */}
                        <div className="lg:col-span-7 text-left rtl:text-right">
                            <SectionTitle title={t('home.intro_title')} centered={false} />

                            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-accent-800 font-sans opacity-90 max-w-2xl mt-4">
                                {t('home.intro_text')}
                            </p>

                            <div className="mt-8 md:mt-10">
                                <Button to="/experience" variant="outline">
                                    {t('common.learn_more')}
                                </Button>
                            </div>
                        </div>

                        {/* Right Column: Architectural Image */}
                        <div className="lg:col-span-5">
                            <div className="relative mx-auto max-w-md lg:max-w-none">
                                <div className="absolute -inset-2.5 rounded-2xl translate-x-2.5 translate-y-2.5 pointer-events-none hidden sm:block" />
                                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-secondary-300/40 aspect-[4/5] bg-accent-950/10">
                                    <img
                                        src="/images/interance.jpg"
                                        alt={t('home.intro_title')}
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story / Accommodation Section */}
            <section className="bg-secondary-50 py-20 md:py-28 overflow-hidden">
                <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                        {/* Left Column: Text & CTA */}
                        <div className="lg:col-span-7 text-left rtl:text-right">
                            <SectionTitle title={t('home.story_title')} centered={false} />

                            <div className="space-y-4 text-base sm:text-lg md:text-xl leading-relaxed text-accent-800 font-sans opacity-90 max-w-2xl mt-4">
                                <p>{t('home.story_p1')}</p>
                                <p>{t('home.story_p2')}</p>
                                <p>{t('home.story_p3')}</p>
                            </div>

                            <div className="mt-8 md:mt-10">
                                <Button to="/rooms" variant="outline">
                                    {t('common.book_your_stay')}
                                </Button>
                            </div>
                        </div>

                        {/* Right Column: Architectural Image */}
                        <div className="lg:col-span-5">
                            <div className="relative mx-auto max-w-md lg:max-w-none">
                                <div className="absolute -inset-2.5 rounded-2xl translate-x-2.5 translate-y-2.5 pointer-events-none hidden sm:block" />
                                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-secondary-300/40 aspect-[4/5] bg-accent-950/10">
                                    <img
                                        src="/images/center.jpg"
                                        alt={t('home.story_title')}
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Map Section */}
            <section className="bg-secondary-50 py-20">
                <div className="container mx-auto px-4">
                    <SectionTitle title={t('home.map_title')} subtitle={t('home.map_subtitle')} centered={true} />

                    <div className="mt-12">
                        <DamascusMap />
                    </div>

                    <div className="mt-10 md:mt-12 flex justify-center">
                        <Button
                            to="/restoration"
                            variant="outline"
                            className="uppercase tracking-wider rtl:normal-case rtl:tracking-normal"
                        >
                            {t('nav.rebirth')}
                        </Button>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section ref={galleryRef} className="bg-accent-50 py-20">
                <div className="container mx-auto px-4">
                    <SectionTitle title={t('experience.gallery_title')} centered={true} className="mb-12" />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {galleryImages.map((image, index) => (
                            <motion.div
                                key={index}
                                className="h-64 overflow-hidden rounded-lg shadow-lg md:h-80"
                                initial={{ opacity: 0, y: 50 }}
                                animate={galleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                }}
                            >
                                <img
                                    src={image}
                                    alt={`Khan Wahoud Gallery ${index + 1}`}
                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* CTA Section */}
            <section className="bg-secondary-100 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">{t('home.feature_titles.experience')}</h2>
                    <p className="text-accent-900 mx-auto mb-8 max-w-2xl text-lg">{t('book_text')}</p>
                    <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <Button to="/rooms" variant="primary" size="lg">
                            {t('common.book_now')}
                        </Button>
                        <Button to="/contact" variant="outline" size="lg">
                            {t('common.contact_us')}
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
