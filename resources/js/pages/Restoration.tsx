import VideoPlayer from '@/components/VideoPlayer';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import TimelineEvent from '../components/TimelineEvent';
import api from '../utils/axios';

type Event = {
    phase: string;
    description: string;
    media_url: string;
};

const RestorationPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language?.startsWith('ar');

    const [heroRef, heroInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [timelineEvents, setTimelineEvents] = React.useState<Event[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchTimelineEvents = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get(`/restoration`);

                setTimelineEvents(response.data);
            } catch (error) {
                console.error('Error fetching timeline events:', error);
                setError('Failed to load timeline events. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchTimelineEvents();
    }, []);

    const beforeAfterSets = [
        {
            title: t('restoration.main_courtyard'),
            before: '/images/ruined 2.jpg',
            after: '/images/side hall.jpg',
        },
        {
            title: t('restoration.stone_archways'),
            before: '/images/before 1.jpg',
            after: '/images/after 1.jpg',
        },
    ];

    const metaTitle = isAr
        ? 'رحلة الإحياء والترميم المعماري | خان وحود دمشق'
        : 'The Rebirth & Architectural Restoration | Khan Wahoud';
    const metaDescription = isAr
        ? 'تعرف على رحلة إحياء وترميم خان سليمان باشا العظم عبر سنوات من العمل الحرفي الدقيق لحفظ التراث المعماري السوري والعثماني العريق.'
        : 'Explore the meticulous 7-year restoration journey of Khan Sulayman Pasha al-Azem (Khan Wahoud), preserving 18th-century Ottoman craftsmanship in Old Damascus.';

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
            <section ref={heroRef} className="relative flex flex-col justify-center items-center overflow-hidden min-h-[420px] md:min-h-[480px] lg:min-h-[520px] pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-24">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/restoration.jpeg"
                        alt="A Modern Rebirth"
                        className="h-full w-full object-cover object-[center_35%]"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-[#4c4c4c]/50"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4">
                    <motion.div
                        className="mx-auto max-w-4xl text-center text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="mb-3 md:mb-4 font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-[0.05em] uppercase drop-shadow-md">
                            {isAr ? t('restoration.title') : 'A MODERN REBIRTH'}
                        </h1>
                        <p className="font-sans text-xs sm:text-sm md:text-base tracking-[0.22em] uppercase text-white/95 font-medium drop-shadow">
                            {t('restoration.subtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Introduction */}
            <section className="bg-white py-14 sm:py-16 md:py-20 border-b border-[#2C4040]/10">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <p className="font-serif text-sm sm:text-base md:text-lg lg:text-[19px] uppercase tracking-[0.08em] leading-relaxed md:leading-[2] text-[#2C4040]">
                        {t('restoration.intro')}
                    </p>
                </div>
            </section>
            {/* The Team Section */}
            <section className="bg-[#FFFFF5] py-20 border-t border-[#781C1D]/10">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-6">
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#781C1D]">
                            <span className="italic font-normal lowercase">{t('restoration.team_title_prefix', isAr ? 'فريق' : 'the')}</span>{' '}
                            <span className="font-bold tracking-wide uppercase">{t('restoration.team_title_main', isAr ? 'العمل' : 'TEAM')}</span>
                        </h2>
                    </div>

                    <p className="mx-auto mb-10 max-w-4xl text-center font-serif text-xs sm:text-sm md:text-base uppercase tracking-[0.06em] leading-relaxed md:leading-[1.9] text-[#2C4040]">
                        {t(
                            'restoration.team_description',
                            isAr
                                ? "ولادة خان وحود الجديدة هي ثمرة سنوات من التفاني والترميم والرؤية المشتركة. نتقدم بخالص الامتنان والتقدير لكل من ساهم في هذه الرحلة الاستثنائية — وخاصة الحرفيين والعمال والمهندسين والمعماريين والمصممين الذين أعادت جهودهم وإخلاصهم الحياة إلى الخان."
                                : "KHAN WAHOUD'S REBIRTH IS THE RESULT OF YEARS OF DEDICATION, RESTORATION & SHARED VISION. WE EXTEND OUR GRATITUDE TO ALL WHO CONTRIBUTED TO THIS JOURNEY — ESPECIALLY THE CRAFTSMEN, WORKERS, ENGINEERS, ARCHITECTS, AND DESIGNERS WHOSE CARE AND COMMITMENT HELPED BRING THE KHAN BACK TO LIFE."
                        )}
                    </p>

                    <div className="mx-auto max-w-4xl">
                        <BeforeAfterSlider
                            beforeImage="/images/teambefore.jpeg"
                            afterImage="/images/teamafter.jpeg"
                            beforeLabel={isAr ? 'قبل' : 'BEFORE'}
                            afterLabel={isAr ? 'بعد' : 'AFTER'}
                            height="520px"
                            className="shadow-2xl rounded-2xl overflow-hidden border border-[#781C1D]/15"
                        />
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="bg-accent-50 py-16">
                <div className="container mx-auto px-4">
                    <SectionTitle title={t('restoration.pillars_title')} centered={true} className="mb-16" />

                    {loading ? (
                        <div className="flex min-h-[400px] items-center justify-center">
                            <div className="border-primary-600 h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-600">{error}</div>
                    ) : (
                        <>
                            <div className="space-y-24">
                                {timelineEvents.map((event, index) => (
                                    <TimelineEvent
                                        key={event.phase}
                                        year={event.phase}
                                        title={event.phase}
                                        description={event.description}
                                        image={event.media_url}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Before & After */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <SectionTitle title={t('restoration.before_after_title')} subtitle={t('restoration.before_after_subtitle')} centered={true} className="mb-16" />

                    <div className="space-y-16">
                        {beforeAfterSets.map((set, index) => (
                            <div key={index} className="mx-auto max-w-4xl">
                                <h3 className="mb-6 text-center font-serif text-2xl font-semibold">{set.title}</h3>
                                <BeforeAfterSlider
                                    beforeImage={set.before}
                                    afterImage={set.after}
                                    beforeLabel={t('restoration.before')}
                                    afterLabel={t('restoration.after')}
                                    className="mb-8"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="bg-accent-950 py-16">
                <div className="container mx-auto px-4 text-center">
                    <SectionTitle
                        title={t('restoration.video_title')}
                        subtitle={t('restoration.video_subtitle')}
                        centered={true}
                        className="mb-12"
                        whiteText
                    />

                    <div className="mx-auto max-w-4xl">
                        <div className="bg-accent-800 aspect-video rounded-lg">
                            <VideoPlayer src="/images/output.m3u8" />
                        </div>
                    </div>
                </div>
            </section>


            {/* CTA Section */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-4 font-serif text-3xl font-bold">{t('restoration.experience_khan')}</h2>
                    <p className="text-accent-700 mx-auto mb-8 max-w-2xl text-lg">
                        {t('restoration.experience_desc')}
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Button to="/rooms" variant="primary">
                            {t('restoration.book_room')}
                        </Button>
                        <Button to="/contact" variant="outline">
                            {t('common.contact_us')}
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RestorationPage;
