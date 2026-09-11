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
    const { t } = useTranslation();

    const [heroRef, heroInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [featuresRef, featuresInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const handleScroll = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen">
                <div className="absolute inset-0 z-0">
                    <img src={'/images/side hall high.jpg'} alt="Luxury Room" className="h-full w-full object-cover" />
                    <div className="bg-accent-950 absolute inset-0 opacity-50"></div>
                </div>

                <div ref={heroRef} className="relative flex h-full flex-col items-center justify-center px-4 text-center text-white md:pt-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                        className="font-serif"
                    >
                        <h1 className="text-secondary-300 mb-8 text-5xl font-bold md:text-7xl">{t('khan_wahoud')}</h1>

                        <p className="text-secondary-300 mb-8 text-xl font-bold md:text-xl">{t('khan_Suleyman')}</p>

                        <YearAnimation />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="mt-10 md:mt-14 flex justify-center w-full px-4"
                    >
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                            {/* Rooms */}
                            <Link
                                href="/rooms"
                                className="group relative px-8 py-3.5 text-[11px] tracking-[0.25em] uppercase font-sans font-medium text-secondary-200 border border-secondary-300/30 backdrop-blur-sm bg-accent-950/30 transition-all duration-500 hover:bg-secondary-200/10 hover:border-secondary-300/60"
                            >
                                <span className="relative z-10">{t('nav.rooms')}</span>
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-secondary-300 transition-all duration-500 group-hover:w-full" />
                            </Link>

                            {/* The Khan Experience — Primary CTA */}
                            <Link
                                href="/experience"
                                className="group relative px-10 py-3.5 text-[11px] tracking-[0.25em] uppercase font-sans font-semibold text-secondary-100 border border-primary-600/50 bg-primary-800/60 backdrop-blur-sm transition-all duration-500 hover:bg-primary-700/80 hover:border-primary-500/70 hover:shadow-[0_0_30px_rgba(158,43,33,0.2)]"
                            >
                                <span className="relative z-10">{t('nav.experience')}</span>
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-primary-400 transition-all duration-500 group-hover:w-full" />
                            </Link>

                            {/* Private Events */}
                            <Link
                                href="/events"
                                className="group relative px-8 py-3.5 text-[11px] tracking-[0.25em] uppercase font-sans font-medium text-secondary-200 border border-secondary-300/30 backdrop-blur-sm bg-accent-950/30 transition-all duration-500 hover:bg-secondary-200/10 hover:border-secondary-300/60"
                            >
                                <span className="relative z-10">{t('nav.events')}</span>
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-secondary-300 transition-all duration-500 group-hover:w-full" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="absolute right-0 bottom-8 left-0 flex justify-center"
                >
                    <button onClick={handleScroll} className="animate-bounce cursor-pointer focus:outline-none" aria-label={t('home.scroll')}>
                        <div className="border-secondary-300 flex h-14 w-8 justify-center rounded-full border-2">
                            <div className="bg-secondary-300 mt-2 h-4 w-1 rounded-full"></div>
                        </div>
                    </button>
                </motion.div>
            </section>

            {/* Introduction Section */}
            <section className="bg-secondary-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <SectionTitle title={t('home.intro_title')} centered={true} />

                        <p className="text-lg leading-relaxed text-accent-800">{t('home.intro_text')}</p>

                        <div className="mt-12">
                            <Button to="/experience" variant="outline">
                                {t('common.learn_more')}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section ref={featuresRef} className="bg-accent-950 py-24">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ duration: 0.6 }}
                            className="text-primary-500 text-[11px] tracking-[0.3em] uppercase font-sans font-medium mb-4"
                        >
                            {t('common.explore')}
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-secondary-200 font-serif text-3xl md:text-4xl font-bold"
                        >
                            {t('khan_wahoud')}
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            {
                                title: t('home.feature_titles.experience'),
                                link: '/experience',
                                image: '/images/hall.jpg',
                                span: 'lg:col-span-2',
                                height: 'h-72 md:h-80',
                            },
                            {
                                title: t('home.feature_titles.rooms'),
                                link: '/rooms',
                                image: '/images/rooms.png',
                                span: '',
                                height: 'h-72 md:h-80',
                            },
                            {
                                title: t('home.feature_titles.dining'),
                                link: '/dining',
                                image: '/images/courtyard_dining_new.png',
                                span: '',
                                height: 'h-72 md:h-80',
                            },
                            {
                                title: t('home.feature_titles.events'),
                                link: '/events',
                                image: '/images/private_events_hero_new.png',
                                span: 'lg:col-span-2',
                                height: 'h-72 md:h-80',
                            },
                            {
                                title: t('home.feature_titles.membership'),
                                link: '/membership',
                                image: '/images/exclusive 2.jpg',
                                span: '',
                                height: 'h-72 md:h-80',
                            },
                            {
                                title: t('home.feature_titles.restoration'),
                                link: '/restoration',
                                image: '/images/center.jpg',
                                span: 'lg:col-span-2',
                                height: 'h-72 md:h-80',
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                }}
                                className={`${item.span} ${item.height}`}
                            >
                                <Link
                                    href={item.link}
                                    className="group relative block h-full w-full overflow-hidden"
                                >
                                    {/* Image */}
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />

                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/90 group-hover:via-black/30" />

                                    {/* Border overlay */}
                                    <div className="absolute inset-0 border border-secondary-300/10 transition-all duration-500 group-hover:border-secondary-300/25" />

                                    {/* Content */}
                                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                                        <h3 className="font-serif text-xl md:text-2xl font-semibold text-secondary-100 transition-transform duration-500 group-hover:-translate-y-2">
                                            {item.title}
                                        </h3>
                                        <div className="mt-2 overflow-hidden">
                                            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-sans text-primary-400 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                                                {t('common.explore')}
                                                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
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
                </div>
            </section>

            {/* Image Banner */}
            <section className="relative h-96">
                <div className="absolute inset-0">
                    <div className="bg-accent-950 bg-opacity-40 absolute inset-0"></div>
                </div>

                <div className="relative flex h-full flex-col items-center justify-center px-4 text-center text-white">
                    <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">{t('khan_wahoud')}</h2>
                    <p className="mx-auto max-w-2xl text-lg md:text-xl">{t('when_desc')}</p>
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
