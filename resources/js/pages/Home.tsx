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

    const [introRef, introInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [storyRef, storyInView] = useInView({
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
            <section className="relative h-screen min-h-[660px] flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/hero.jpg"
                        alt="Khan Wahoud Courtyard"
                        className="h-full w-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/65 pointer-events-none" />
                </div>

                {/* Top Title Group */}
                <div ref={heroRef} className="relative z-10 w-full pt-24 sm:pt-28 md:pt-32 lg:pt-36 px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-white font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.16em] uppercase font-normal drop-shadow-[0_3px_14px_rgba(0,0,0,0.85)] mb-1 sm:mb-1.5">
                            {t('khan_wahoud')}
                        </h1>
                        <span className="text-white/80 text-[11px] sm:text-xs md:text-sm font-sans tracking-[0.3em] uppercase block my-0.5 sm:my-1">
                            {t('at')}
                        </span>
                        <div className="text-white font-serif tracking-[0.18em] uppercase text-xs sm:text-sm md:text-base font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                            <p className="leading-snug">{t('khan_Suleyman')}</p>
                            <p className="mt-0.5 text-[11px] sm:text-xs md:text-sm tracking-[0.22em] text-white/90">{t('since_1736')}</p>
                        </div>
                    </motion.div>
                </div>

                {/* Center Year & Description */}
                <div className="relative z-10 w-full px-4 text-center my-auto py-2">
                    <YearAnimation />
                </div>

                {/* Bottom CTA Buttons matching the exact mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative z-10 w-full px-4 pb-10 sm:pb-12 md:pb-14"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5 max-w-4xl mx-auto">
                        {/* Book A Table */}
                        <Link
                            href="/dining"
                            className="w-full sm:w-auto min-w-[170px] sm:min-w-[195px] text-center px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#EDE3D8] hover:bg-[#F6EFE7] text-[#4A1516] text-xs sm:text-sm tracking-[0.16em] uppercase font-sans font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                        >
                            {t('common.book_a_table')}
                        </Link>

                        {/* Book Your Stay (Primary Center) */}
                        <Link
                            href="/rooms"
                            className="w-full sm:w-auto min-w-[185px] sm:min-w-[210px] text-center px-8 sm:px-10 py-2.5 sm:py-3 rounded-full bg-[#781C1D] hover:bg-[#8D2223] text-white text-xs sm:text-sm tracking-[0.16em] uppercase font-sans font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                        >
                            {t('common.book_your_stay')}
                        </Link>

                        {/* Private Events */}
                        <Link
                            href="/events"
                            className="w-full sm:w-auto min-w-[170px] sm:min-w-[195px] text-center px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#EDE3D8] hover:bg-[#F6EFE7] text-[#4A1516] text-xs sm:text-sm tracking-[0.16em] uppercase font-sans font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                        >
                            {t('common.private_events')}
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Introduction Section */}
            <section ref={introRef} className="w-full bg-[#FFFFF5] py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
                <div className="max-w-[1180px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-start">
                        {/* Left Column (Text & Button) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={introInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-7 flex flex-col justify-start text-left rtl:text-right h-auto lg:h-[460px] xl:h-[480px]"
                        >
                            <div className="max-w-[560px] w-full mx-auto lg:mx-0 h-full flex flex-col justify-between py-1">
                                {/* Top: Headline - Aligned flush with top of image */}
                                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] text-[#781C1D] leading-[1.1] pt-0 mt-0">
                                    <span className="italic font-normal lowercase">{isAr ? 'أهلاً بكم في ' : 'welcome to '}</span>
                                    <span className="font-bold">{isAr ? 'خان وحود' : 'Khan Wahoud'}</span>
                                </h2>

                                {/* Middle: Paragraphs with exact casing for Logam */}
                                <div className="space-y-4 sm:space-y-5 my-auto py-4 text-[12px] sm:text-[13px] md:text-[13.5px] lg:text-[15px] leading-[1.65] sm:leading-[1.7] text-[#231D16] font-sans font-medium tracking-[0.08em] sm:tracking-[0.1em] rtl:normal-case rtl:font-sans rtl:tracking-normal">
                                    <p>
                                        {isAr ? (
                                            t('home.intro_p1')
                                        ) : (
                                            <>
                                                A HERITAGE BOUTIQUE HOTEL,<br />
                                                IN THE HEART OF OLD DAMASCUS.
                                            </>
                                        )}
                                    </p>
                                    <p>
                                        {isAr ? (
                                            t('home.intro_p2')
                                        ) : (
                                            <>
                                                NESTLED WITHIN ONE OF THE LAST CARAVANSERAI THAT<br className="hidden sm:inline" />
                                                {' '}WERE BUILT IN THE WORLD, THE METICULOUSLY RESTORED<br className="hidden sm:inline" />
                                                {' '}WALLS OF KHAN SULEYMAN PASHA.
                                            </>
                                        )}
                                    </p>
                                    <p>
                                        {isAr ? (
                                            t('home.intro_p3')
                                        ) : (
                                            <>
                                                EXPERIENCE A HARMONIOUS BLEND OF DAMASCENE &<br className="hidden sm:inline" />
                                                {' '}OTTOMAN GRANDEUR, ARCHITECTURAL AUTHENTICITY,<br className="hidden sm:inline" />
                                                {' '}AND MODERN COMFORT.
                                            </>
                                        )}
                                    </p>
                                </div>

                                {/* Bottom: Centered Discover More Button aligned with bottom of image */}
                                <div className="flex justify-center pt-2">
                                    <Link
                                        href="/experience"
                                        className="inline-flex items-center justify-center rounded-xl border border-[#781C1D] text-[#781C1D] hover:bg-[#781C1D] hover:text-white px-8 sm:px-10 py-2 sm:py-2.5 text-xs sm:text-[13px] font-sans font-medium tracking-[0.16em] uppercase transition-all duration-300 shadow-sm hover:shadow-md text-center"
                                    >
                                        {isAr ? t('common.learn_more') : 'DISCOVER MORE'}
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Architectural Photo with exact matching height */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-end rtl:lg:justify-start">
                            <div className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-none lg:w-auto h-auto lg:h-[460px] xl:h-[480px] aspect-[3/4] overflow-hidden">
                                <img
                                    src="/images/courtyard_section.png"
                                    alt="Khan Wahoud Courtyard"
                                    className="w-full h-full object-cover object-center"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story / Accommodation Section */}
            <section ref={storyRef} className="w-full bg-[#FFFFF5] py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
                <div className="max-w-[1180px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-start">
                        {/* Left Column: Bedroom Photo with exact matching height */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-start rtl:lg:justify-end order-2 lg:order-1">
                            <div className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-none lg:w-auto h-auto lg:h-[460px] xl:h-[480px] aspect-[3/4] overflow-hidden">
                                <img
                                    src="/images/story_section.png"
                                    alt="Khan Wahoud Suite"
                                    className="w-full h-full object-cover object-center"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* Right Column (Text & Button) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={storyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-7 flex flex-col justify-start text-left rtl:text-right h-auto lg:h-[460px] xl:h-[480px] order-1 lg:order-2"
                        >
                            <div className="max-w-[560px] w-full mx-auto lg:mx-0 h-full flex flex-col justify-between py-1">
                                {/* Top: Headline - Aligned flush with top of image */}
                                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] text-[#781C1D] leading-[1.1] pt-0 mt-0">
                                    <span className="italic font-normal lowercase">{isAr ? 'ابدأ ' : 'begin your '}</span>
                                    <span className="font-bold uppercase">{isAr ? 'قصتك' : 'STORY'}</span>
                                </h2>

                                {/* Middle: Paragraphs with Logam styling */}
                                <div className="space-y-4 sm:space-y-5 my-auto py-4 text-[12px] sm:text-[13px] md:text-[13.5px] lg:text-[15px] leading-[1.65] sm:leading-[1.7] text-[#231D16] font-sans font-medium tracking-[0.08em] sm:tracking-[0.1em] rtl:normal-case rtl:font-sans rtl:tracking-normal">
                                    <p>
                                        {isAr ? (
                                            t('home.story_p1')
                                        ) : (
                                            <>
                                                KHAN WAHOUD OFFERS MORE THAN ACCOMMODATION. IT<br className="hidden sm:inline" />
                                                {' '}OFFERS A STAY SURROUNDED BY HISTORY AND THE VIBRANT<br className="hidden sm:inline" />
                                                {' '}RHYTHM OF LIFE.
                                            </>
                                        )}
                                    </p>
                                    <p>
                                        {isAr ? (
                                            t('home.story_p2')
                                        ) : (
                                            <>
                                                WHERE OUR GUEST ROOMS ARE ARRANGED AROUND THE<br className="hidden sm:inline" />
                                                {' '}HISTORIC COURTYARD. THE HEART OF THE KHAN’S EXPERIENCE.
                                            </>
                                        )}
                                    </p>
                                    <p>
                                        {isAr ? (
                                            t('home.story_p3')
                                        ) : (
                                            <>
                                                OUR THOUGHTFULLY RESTORED ROOMS INVITE A NEW<br className="hidden sm:inline" />
                                                {' '}GENERATION OF TRAVELERS TO WAKE WITHIN DAMASCENE<br className="hidden sm:inline" />
                                                {' '}HERITAGE AND BECOME PART OF ITS STORY.
                                            </>
                                        )}
                                    </p>
                                </div>

                                {/* Bottom: Centered CTA Button aligned with bottom of image */}
                                <div className="flex justify-center pt-2">
                                    <Link
                                        href="/rooms"
                                        className="inline-flex items-center justify-center rounded-xl border border-[#781C1D] text-[#781C1D] hover:bg-[#781C1D] hover:text-white px-8 sm:px-10 py-2 sm:py-2.5 text-xs sm:text-[13px] font-sans font-medium tracking-[0.16em] uppercase transition-all duration-300 shadow-sm hover:shadow-md text-center"
                                    >
                                        {isAr ? t('common.book_your_stay') : 'BOOK YOUR STAY'}
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* Map Section */}
            <section className="bg-[#FFFFF5] py-20 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Headline */}
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-[40px] lg:text-[45px] text-[#781C1D] leading-[1.15] mb-6 sm:mb-7">
                            <span className="italic font-normal lowercase">{isAr ? 'في قلب ' : 'in the heart of '}</span>
                            <span className="font-bold">{isAr ? 'دمشق القديمة' : 'OLD DAMASCUS'}</span>
                        </h2>

                        {/* Subtitle */}
                        <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-[1.75] sm:leading-[1.85] text-[#1C1C1C] font-sans font-medium uppercase tracking-[0.14em] max-w-4xl mx-auto rtl:normal-case rtl:font-sans rtl:tracking-normal rtl:text-base rtl:leading-relaxed">
                            {isAr ? (
                                t('home.map_subtitle')
                            ) : (
                                <>
                                    KHAN SULEYMAN PASHA IS AT THE HEART OF THE OLD CITY OF DAMASCUS, RIGHT ON ONE<br className="hidden md:inline" />{' '}
                                    OF THE MOST ANCIENT AND FAMOUS BIBLICAL STREETS, THE STRAIGHT STREET, SOUK<br className="hidden md:inline" />{' '}
                                    MIDHAT PASHA, THAT WAS BUILT BY THE ROMANS, WITNESSED PAUL THE APOSTLE, AND<br className="hidden md:inline" />{' '}
                                    MARKS THE PASSAGE OF THE FAMOUS SILK ROAD'S CARAVANS.
                                </>
                            )}
                        </p>
                    </div>

                    <div className="mt-12">
                        <DamascusMap />
                    </div>

                    <div className="mt-10 md:mt-12 flex justify-center">
                        {/* Centered CTA Button */}
                        <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center">
                            <Link
                                href="/restoration"
                                className="inline-flex items-center justify-center rounded-xl border border-[#781C1D] text-[#781C1D] hover:bg-[#781C1D] hover:text-white px-8 sm:px-10 py-2 sm:py-2.5 text-xs sm:text-[13px] font-sans font-medium tracking-[0.16em] uppercase transition-all duration-300 shadow-sm hover:shadow-md text-center"
                            >
                                {t('nav.rebirth')}
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section ref={galleryRef} className="bg-[#FFFFF5] py-20">
                <div className="container mx-auto px-4">
                    <SectionTitle title={t('experience.gallery_title')} centered={true} className="mb-12 text-[#781C1D]" />

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



        </div>
    );
};

export default HomePage;
