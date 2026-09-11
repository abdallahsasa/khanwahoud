import VideoPlayer from '@/components/VideoPlayer';
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
    const { t } = useTranslation();

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

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-20 md:pt-64 md:pb-24">
                <div className="absolute inset-0 z-0">
                    <img src="/images/mainbg.png" alt="Restoration" className="h-full w-full object-cover" loading="eager" />
                    <div className="bg-accent-950 absolute inset-0 opacity-50"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4">
                    <motion.div
                        className="mx-auto max-w-3xl text-center text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">{t('restoration.title')}</h1>
                        <p className="font-serif text-xl italic opacity-90 md:text-2xl">{t('restoration.subtitle')}</p>
                    </motion.div>
                </div>
            </section>

            {/* Introduction */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-accent-800 text-lg leading-relaxed">{t('restoration.intro')}</p>
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
