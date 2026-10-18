import { Link, Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, X, Maximize2, Images } from 'lucide-react';
import Button from '../components/Button';
import DamascusMap from '../components/DamascusMap';
import SectionTitle from '../components/SectionTitle';
import YearAnimation from '../components/YearAnimation';
import { journeyImages } from '../data/journeyImages';

const HomePage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language?.startsWith('ar');

    const metaTitle = isAr
        ? 'خان وحود | فندق بوتيكي وتجربة تاريخية فاخرة في دمشق القديمة'
        : 'Khan Wahoud | Luxury Boutique Hotel & Heritage in Old Damascus';
    const metaDescription = isAr
        ? 'أهلاً بكم في خان وحود (خان سليمان باشا العظم)، فندق بوتيكي فاخر وتجربة ضيافة أصيلة في قلب دمشق القديمة، الشارع المستقيم.'
        : 'Welcome to Khan Wahoud (Khan Suleyman Pasha al-Azem), a luxury boutique hotel in the heart of Old Damascus, Straight Street.';

    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

    const INITIAL_PHOTO_COUNT = 12;
    const visibleImages = showAllPhotos ? journeyImages : journeyImages.slice(0, INITIAL_PHOTO_COUNT);

    const handleNextImage = useCallback(() => {
        setActiveImageIndex((prev) => (prev === null ? null : (prev + 1) % journeyImages.length));
    }, []);

    const handlePrevImage = useCallback(() => {
        setActiveImageIndex((prev) => (prev === null ? null : (prev - 1 + journeyImages.length) % journeyImages.length));
    }, []);

    useEffect(() => {
        if (activeImageIndex === null) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setActiveImageIndex(null);
            if (e.key === 'ArrowRight') {
                if (isAr) handlePrevImage();
                else handleNextImage();
            }
            if (e.key === 'ArrowLeft') {
                if (isAr) handleNextImage();
                else handlePrevImage();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [activeImageIndex, isAr, handleNextImage, handlePrevImage]);

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
            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />
            </Head>
            {/* Hero Section */}
            <section className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden pb-4 sm:pb-0">
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
                        <h1 className="text-white font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.14em] sm:tracking-[0.16em] uppercase font-normal drop-shadow-[0_3px_14px_rgba(0,0,0,0.85)] mb-1 sm:mb-1.5">
                            {t('khan_wahoud')}
                        </h1>
                        <span className="text-white/80 text-[10px] sm:text-xs md:text-sm font-sans tracking-[0.25em] sm:tracking-[0.3em] uppercase block my-0.5 sm:my-1">
                            {t('at')}
                        </span>
                        <div className="text-white font-serif tracking-[0.14em] sm:tracking-[0.18em] uppercase text-xs sm:text-sm md:text-base font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                            <p className="leading-snug">{t('khan_Suleyman')}</p>
                            <p className="mt-0.5 text-[10px] sm:text-xs md:text-sm tracking-[0.18em] sm:tracking-[0.22em] text-white/90">{t('since_1736')}</p>
                        </div>
                    </motion.div>
                </div>

                {/* Center Year & Description */}
                <div className="relative z-10 w-full px-4 text-center my-auto py-2 sm:py-4">
                    <YearAnimation />
                </div>

                {/* Bottom CTA Buttons matching the exact mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative z-10 w-full px-4 pb-12 sm:pb-12 md:pb-14"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 md:gap-5 max-w-xs sm:max-w-4xl mx-auto w-full">
                        {/* Book A Table */}
                        <Link
                            href="/dining"
                            className="w-full sm:w-auto min-w-[160px] sm:min-w-[195px] text-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#EDE3D8] hover:bg-[#F6EFE7] text-[#4A1516] text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.16em] uppercase font-sans font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                        >
                            {t('common.book_a_table')}
                        </Link>

                        {/* Book Your Stay (Primary Center) */}
                        <Link
                            href="/rooms"
                            className="w-full sm:w-auto min-w-[170px] sm:min-w-[210px] text-center px-6 sm:px-10 py-2.5 sm:py-3 rounded-full bg-[#781C1D] hover:bg-[#8D2223] text-white text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.16em] uppercase font-sans font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                        >
                            {t('common.book_your_stay')}
                        </Link>

                        {/* Private Events */}
                        <Link
                            href="/events"
                            className="w-full sm:w-auto min-w-[160px] sm:min-w-[195px] text-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#EDE3D8] hover:bg-[#F6EFE7] text-[#4A1516] text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.16em] uppercase font-sans font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
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

            {/* Gallery Section - Visual Journey */}
            <section ref={galleryRef} className="bg-[#FFFFF5] py-20">
                <div className="container mx-auto px-4">
                    <SectionTitle title={t('experience.gallery_title')} centered={true} className="mb-4 text-[#781C1D]" />
                    <p className="mx-auto mb-12 max-w-2xl text-center text-sm md:text-base text-accent-700/80">
                        {isAr
                            ? 'لقطات توثّق تفاصيل خان وحود المعمارية وتراثه العريق'
                            : 'Moments capturing the architectural heritage and timeless beauty of Khan Wahoud'}
                    </p>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
                        {visibleImages.map((image, index) => {
                            const fullIndex = journeyImages.indexOf(image);
                            return (
                                <motion.div
                                    key={image}
                                    className="group relative h-64 sm:h-72 lg:h-80 cursor-pointer overflow-hidden rounded-xl bg-accent-100 shadow-md transition-all duration-300 hover:shadow-2xl"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={galleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: Math.min(index * 0.04, 0.4),
                                    }}
                                    onClick={() => setActiveImageIndex(fullIndex)}
                                >
                                    <img
                                        src={encodeURI(image)}
                                        alt={`Khan Wahoud Visual Journey ${fullIndex + 1}`}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-between p-4">
                                        <span className="text-xs tracking-wider uppercase text-white/90 font-medium">
                                            {isAr
                                                ? `صورة ${fullIndex + 1} من ${journeyImages.length}`
                                                : `Photo ${fullIndex + 1} of ${journeyImages.length}`}
                                        </span>
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-transform duration-300 group-hover:scale-110">
                                            <Maximize2 className="h-4 w-4" />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* View All / Show Fewer Button */}
                    <div className="mt-12 flex justify-center">
                        <button
                            type="button"
                            onClick={() => setShowAllPhotos(!showAllPhotos)}
                            className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#781C1D] bg-[#FFFFF5] px-8 py-3.5 text-sm font-semibold tracking-wide text-[#781C1D] transition-all duration-300 hover:bg-[#781C1D] hover:text-white shadow-sm hover:shadow-lg cursor-pointer active:scale-95"
                        >
                            <Images className="h-4 w-4" />
                            <span>
                                {showAllPhotos
                                    ? (isAr ? 'عرض صور أقل' : 'Show Fewer Photos')
                                    : (isAr
                                          ? `عرض جميع الصور (${journeyImages.length} صورة)`
                                          : `View All Photos (${journeyImages.length} Photos)`)}
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {activeImageIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
                        onClick={() => setActiveImageIndex(null)}
                    >
                        {/* Top Bar with counter & close */}
                        <div
                            className="absolute top-0 inset-x-0 flex items-center justify-between p-4 md:p-6 text-white z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md text-xs sm:text-sm font-medium tracking-wider">
                                <span>
                                    {isAr
                                        ? `صورة ${activeImageIndex + 1} من ${journeyImages.length}`
                                        : `Photo ${activeImageIndex + 1} of ${journeyImages.length}`}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveImageIndex(null)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md cursor-pointer"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                isAr ? handleNextImage() : handlePrevImage();
                            }}
                            className="absolute left-3 md:left-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-all backdrop-blur-md cursor-pointer hover:scale-105"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                isAr ? handlePrevImage() : handleNextImage();
                            }}
                            className="absolute right-3 md:right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-all backdrop-blur-md cursor-pointer hover:scale-105"
                            aria-label="Next image"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>

                        {/* Main Lightbox Image */}
                        <motion.div
                            key={activeImageIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-lg shadow-2xl flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={encodeURI(journeyImages[activeImageIndex])}
                                alt={`Khan Wahoud ${activeImageIndex + 1}`}
                                className="max-h-[85vh] max-w-[90vw] object-contain select-none"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Inquiries & Contact Section */}
            <section className="bg-accent-950 py-20 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="mx-auto max-w-3xl">
                        <span className="text-xs font-semibold tracking-widest text-primary-400 uppercase mb-3 block">
                            {t('dining.location_tag')}
                        </span>
                        <h2 className="mb-6 font-serif text-3xl md:text-4xl font-bold text-secondary-200">
                            {t('home.feature_titles.experience')}
                        </h2>
                        <p className="mx-auto mb-10 max-w-2xl text-lg text-secondary-300/90 leading-relaxed">
                            {t('book_text')}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Button to="/contact" variant="primary" size="lg">
                                {t('common.contact_us')}
                            </Button>
                            <Button to="/rooms" variant="outline" size="lg" className="border-secondary-300 text-secondary-200 hover:bg-secondary-200/10">
                                {t('common.explore')}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
