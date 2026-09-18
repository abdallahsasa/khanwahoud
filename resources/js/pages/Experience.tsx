import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';

const ExperiencePage: React.FC = () => {
    const { t } = useTranslation();

    const [historyRef, historyInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [restorationRef, restorationInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [vipRef, vipInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [galleryRef, galleryInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const galleryImages = [
        '/images/IMG_4643.JPEG',
        '/images/IMG_3772.png',
        '/images/1fa4b053-9d90-4471-ada4-730779b8b750.jpg',
        '/images/IMG_4466.JPEG',
        '/images/IMG_4474.JPEG',
        '/images/IMG_4465.JPEG',
    ];

    return (
        <div>
            {/* Hero Banner */}
            <section className="relative pt-32 pb-20 md:pt-64 md:pb-24">
                <div className="absolute inset-0 z-0">
                    <img src="/images/mainbg.png" alt="Khan Experience" className="h-full w-full object-cover" />
                    <div className="bg-accent-950 absolute inset-0 opacity-50"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center text-white">
                        <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">{t('home.feature_titles.experience')}</h1>
                        <p className="font-serif text-xl italic opacity-90 md:text-2xl">{t('experience.subtitle')}</p>
                    </div>
                </div>
            </section>

            {/* Food and Drinks Section */}
            <section ref={historyRef} className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center gap-12 lg:flex-row">
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            animate={historyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 0.8 }}
                        >
                            <SectionTitle title={t('experience.history_title')} className="mb-6" />
                            <p className="text-accent-800 mb-6 text-lg leading-relaxed">{t('experience.history_text')}</p>
                            <Button to="/dining" variant="outline">
                                {t('common.learn_more')}
                            </Button>
                        </motion.div>
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={historyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <img
                                src="/images/food 3.jpg"
                                alt="Khan History"
                                className="h-80 w-full rounded-lg object-cover shadow-lg md:h-96"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Private Events Section */}
            <section ref={restorationRef} className="bg-accent-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center gap-12 lg:flex-row-reverse">
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            animate={restorationInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 0.8 }}
                        >
                            <SectionTitle title={t('experience.restoration_title')} className="mb-6" />
                            <p className="text-accent-800 mb-6 text-lg leading-relaxed">{t('experience.restoration_text')}</p>
                            <Button to="/events" variant="primary">
                                {t('common.learn_more')}
                            </Button>
                        </motion.div>
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={restorationInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <img
                                src="/images/interance.jpg"
                                alt="Restoration"
                                className="h-80 w-full rounded-lg object-cover shadow-lg md:h-96"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* VIP Section */}
            <section ref={vipRef} className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center gap-12 lg:flex-row">
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            animate={vipInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 0.8 }}
                        >
                            <SectionTitle title={t('experience.vip_title')} className="mb-6" />
                            <p className="text-accent-800 mb-6 text-lg leading-relaxed">{t('experience.vip_text')}</p>
                            <Button to="/membership" variant="outline">
                                {t('common.learn_more')}
                            </Button>
                        </motion.div>
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={vipInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <img
                                src="/images/side hall high.jpg"
                                alt="VIP Experience"
                                className="h-80 w-full rounded-lg object-cover shadow-lg md:h-96"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* CTA Section */}
            <section className="bg-primary-700 py-20 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-6 font-serif text-3xl font-bold md:text-4xl">{t('home.feature_titles.experience')}</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">{t('book_text_two')}</p>
                    <Button to="/rooms" variant="secondary" size="lg">
                        {t('common.book_now')}
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default ExperiencePage;
