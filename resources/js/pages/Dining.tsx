import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import Button from '../components/Button';

const DiningPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language?.startsWith('ar');

    const metaTitle = isAr
        ? 'المطعم وتجربة الطعام التراثي الفاخر | خان وحود دمشق'
        : 'Dining & Damascene Cuisine | Khan Wahoud Old Damascus';
    const metaDescription = isAr
        ? 'استمتع بتجربة طعام دمشقية أصيلة في باحة خان وحود التاريخية وتراسه الساحر. فطور شامي، مقبلات شرقية، أطباق تراثية، ومشروبات فاخرة في الشارع المستقيم.'
        : 'Experience authentic Damascene culinary heritage at Khan Wahoud. Courtyard dining, rooftop terrace, oriental mezze, artisanal breakfast, and specialty coffee in Old Damascus.';

    const [heroRef, heroInView] = useInView({
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
            {/* Hero Banner - Full Page */}
            <section
                ref={heroRef}
                className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden"
            >
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/dining.png"
                        alt="Khan Wahoud Food & Drink"
                        className="h-full w-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/40 sm:bg-black/35 pointer-events-none" />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
                    <motion.div
                        className="mx-auto max-w-4xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="mb-4 sm:mb-6 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] leading-tight">
                            {t('dining.title', isAr ? 'الطعام والشراب' : 'Food & Drink')}
                        </h1>

                        <p className="font-serif text-xs sm:text-sm md:text-base lg:text-[17px] tracking-[0.16em] sm:tracking-[0.2em] md:tracking-[0.24em] uppercase text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] rtl:tracking-normal rtl:font-sans rtl:text-sm sm:rtl:text-base md:rtl:text-lg">
                            {t(
                                'dining.hero_subtitle',
                                isAr
                                    ? 'ستحتفل تجارب تناول الطعام لدينا بالتقاليد الغنية للمطبخ الدمشقي ومنطقة بلاد الشام.'
                                    : 'OUR DINING EXPERIENCES WILL CELEBRATE THE RICH CULINARY TRADITIONS OF DAMASCUS AND THE LEVANT REGION.'
                            )}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 1. The Courtyard Section (Mockup: Image Left, Text & Button Right) */}
            <section className="bg-[#FFFFF5] py-16 sm:py-24 md:py-28 overflow-hidden">
                <div className="container mx-auto px-6 sm:px-10 lg:px-16">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Image Left */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex justify-center lg:justify-start"
                        >
                            <img
                                src="/images/dining/courtyard.png"
                                alt="the Courtyard Dining at Khan Wahoud"
                                className="w-full max-w-[420px] aspect-[3/4] object-cover"
                            />
                        </motion.div>

                        {/* Content Right */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-start text-left rtl:text-right rtl:items-start max-w-xl"
                        >
                            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-[#781C1D] mb-8 leading-tight tracking-tight">
                                <span className="italic font-normal">{t('dining.courtyard_section.title_the', isAr ? 'فناء' : 'the')}</span>{' '}
                                <span className="font-bold">{t('dining.courtyard_section.title_name', isAr ? 'الخان التاريخي' : 'Courtyard')}</span>
                            </h2>

                            <p className="font-sans text-xs sm:text-[13px] md:text-sm tracking-[0.14em] sm:tracking-[0.16em] uppercase leading-[2] sm:leading-[2.2] text-[#221B19] mb-5 rtl:tracking-normal rtl:font-sans rtl:text-sm sm:rtl:text-base font-normal">
                                {t('dining.courtyard_section.p1', isAr ? 'في قلب الفناء التاريخي لخان وحود المشيد عام ١٧٣٦.' : "SET WITHIN THE KHAN'S HISTORIC COURTYARD.")}
                            </p>

                            <p className="font-sans text-xs sm:text-[13px] md:text-sm tracking-[0.14em] sm:tracking-[0.16em] uppercase leading-[2] sm:leading-[2.2] text-[#221B19] mb-10 rtl:tracking-normal rtl:font-sans rtl:text-sm sm:rtl:text-base font-normal">
                                {t('dining.courtyard_section.p2', isAr ? 'من قهوة الصباح الباكر إلى أمسيات السمر الشامية، يجمع الفناء بين عبق التاريخ وأصالة الضيافة وتجربة طعام استثنائية تحت القبة التاريخية لأحد أبهى معالم دمشق القديمة.' : 'FROM MORNING COFFEE TO EVENING GATHERINGS, THE COURTYARD BRINGS TOGETHER HERITAGE, ATMOSPHERE, AND A CONTEMPORARY DINING EXPERIENCE WITHIN ONE OF DAMASCUS’S MOST DISTINCTIVE SPACES.')}
                            </p>

                            <div className="w-full flex justify-center pt-2">
                                <a
                                    href="https://wa.me/963930012015?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%AE%D8%A7%D9%86%20%D9%88%D8%AD%D9%88%D8%AF%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D8%B7%D8%A7%D9%88%D9%84%D8%A9%20%D9%81%D9%8A%20%D9%85%D8%B7%D8%B9%D9%85%20%D8%A7%D9%84%D9%81%D9%86%D8%A7%D8%A1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 rounded-full bg-[#063326] hover:bg-[#0b4837] text-white font-sans text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] cursor-pointer"
                                >
                                    {t('dining.courtyard_section.cta', isAr ? 'احجز طاولتك الآن' : 'BOOK YOUR TABLE')}
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. The Rooftop Section (Mockup: Text Left, Image Right) */}
            <section className="bg-[#FFFFF5] py-16 sm:py-24 md:py-28 overflow-hidden">
                <div className="container mx-auto px-6 sm:px-10 lg:px-16">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Content Left */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-start text-left rtl:text-right rtl:items-start max-w-xl order-2 lg:order-1"
                        >
                            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] text-[#781C1D] mb-8 leading-tight tracking-tight lg:whitespace-nowrap">
                                <span className="italic font-normal">{t('dining.rooftop_section.title_the', isAr ? 'تراس' : 'the')}</span>{' '}
                                <span className="font-bold">{t('dining.rooftop_section.title_name', isAr ? 'السطح البانورامي' : 'Rooftop')}</span>{' '}
                                <span className="italic font-normal">{t('dining.rooftop_section.title_suffix', isAr ? '— قريباً' : '— Coming Soon')}</span>
                            </h2>

                            <p className="font-sans text-xs sm:text-[13px] md:text-sm tracking-[0.14em] sm:tracking-[0.16em] uppercase leading-[2] sm:leading-[2.2] text-[#221B19] mb-5 rtl:tracking-normal rtl:font-sans rtl:text-sm sm:rtl:text-base font-normal whitespace-pre-line">
                                {t('dining.rooftop_section.p1', isAr ? 'فوق أسقف ومآذن دمشق القديمة العريقة، تتشكل تجربة طعام فريدة من نوعها وسط نسيم السماء المفتوحة وإطلالات الغروب الساحرة على أفق المدينة الأقدم في التاريخ.' : 'ABOVE THE ROOFTOPS OF OLD DAMASCUS\nA NEW DINING EXPERIENCE IS TAKING SHAPE. DESIGNED AROUND OPEN SKIES, SUNSET VIEWS, AND THE SURROUNDING OLD CITYSCAPE.')}
                            </p>

                            <p className="font-sans text-xs sm:text-[13px] md:text-sm tracking-[0.14em] sm:tracking-[0.16em] uppercase leading-[2] sm:leading-[2.2] text-[#221B19] mb-10 rtl:tracking-normal rtl:font-sans rtl:text-sm sm:rtl:text-base font-normal">
                                {t('dining.rooftop_section.p2', isAr ? 'سيقدم التراس البانورامي أسلوباً راقياً ومريحاً لتجربة خان وحود من الأعلى وإطلالة استثنائية لا تُنسى.' : 'THE ROOFTOP WILL OFFER A MORE ELEVATED AND RELAXED WAY TO EXPERIENCE KHAN WAHOUD FROM ABOVE.')}
                            </p>

                            <div className="w-full flex justify-center pt-2">
                                <a
                                    href="https://wa.me/963930012015?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%AE%D8%A7%D9%86%20%D9%88%D8%AD%D9%88%D8%AF%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AA%D8%AC%D8%B1%D8%A8%D8%A9%20%D8%A7%D9%84%D8%B3%D8%B7%D8%AD%20(Rooftop)"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 rounded-full bg-[#5B1214] hover:bg-[#781C1D] text-white font-sans text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] cursor-pointer"
                                >
                                    {t('dining.rooftop_section.cta', isAr ? 'اكتشف المزيد' : 'DISCOVER MORE')}
                                </a>
                            </div>
                        </motion.div>

                        {/* Image Right */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex justify-center lg:justify-end order-1 lg:order-2"
                        >
                            <img
                                src="/images/dining/rooftop.png"
                                alt="the Rooftop Dining at Khan Wahoud"
                                className="w-full max-w-[420px] aspect-[3/4] object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Inquiries & Early Access Section */}
            <section className="bg-accent-950 py-20 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="mx-auto max-w-3xl">
                        <span className="text-xs font-semibold tracking-widest text-primary-400 uppercase mb-3 block">
                            {t('dining.location_tag')}
                        </span>
                        <h2 className="mb-6 font-serif text-3xl md:text-4xl font-bold text-secondary-200">
                            {t('dining.title')}
                        </h2>
                        <p className="mx-auto mb-10 max-w-2xl text-lg text-secondary-300/90 leading-relaxed">
                            {t('dining.inquire_text')}
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Button to="/contact" variant="primary" size="lg">
                                {t('common.contact_us')}
                            </Button>
                            <Button to="/" variant="outline" size="lg" className="border-secondary-300 text-secondary-200 hover:bg-secondary-200/10">
                                {t('common.explore')}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DiningPage;
