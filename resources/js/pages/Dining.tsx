import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';

const DiningPage: React.FC = () => {
    const { t } = useTranslation();

    const [heroRef, heroInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const diningExperiences = [
        {
            id: 'courtyard',
            title: t('dining.experiences.courtyard.title'),
            description: t('dining.experiences.courtyard.description'),
            image: '/images/courtyard_dining_new.png',
        },
        {
            id: 'private',
            title: t('dining.experiences.private.title'),
            description: t('dining.experiences.private.description'),
            image: '/images/meeting_room.png',
        },
        {
            id: 'tea',
            title: t('dining.experiences.chef.title'),
            description: t('dining.experiences.chef.description'),
            image: '/images/tea_lounge.png',
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Banner with Coming Soon Badge */}
            <section ref={heroRef} className="relative pt-36 pb-24 md:pt-64 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/courtyard_dining_new.png"
                        alt="Khan Wahoud Dining"
                        className="h-full w-full object-cover"
                    />
                    <div className="bg-accent-950/70 absolute inset-0 backdrop-blur-[2px]"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4">
                    <motion.div
                        className="mx-auto max-w-3xl text-center text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Luxury Coming Soon Pill */}
                        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-secondary-200/40 text-secondary-100 text-xs font-semibold tracking-widest uppercase mb-6 bg-black/40 backdrop-blur-md shadow-lg">
                            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                            <span>{t('dining.coming_soon')}</span>
                        </div>

                        <h1 className="mb-6 font-serif text-4xl font-bold md:text-5xl lg:text-6xl text-secondary-100">
                            {t('dining.title')}
                        </h1>

                        <p className="font-serif text-xl md:text-2xl text-secondary-300 italic mb-8 max-w-2xl mx-auto">
                            {t('dining.subtitle')}
                        </p>

                        <p className="text-secondary-200/90 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                            {t('dining.coming_soon_desc')}
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <a
                                href="https://wa.me/963930012015"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-700 hover:bg-primary-600 text-white font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                <MessageCircle size={18} />
                                <span>WhatsApp Inquiries</span>
                            </a>
                            <a
                                href="tel:+963930012015"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-secondary-300/50 bg-white/10 hover:bg-white/20 text-secondary-100 font-medium text-sm backdrop-blur-sm transition-all duration-300"
                            >
                                <Phone size={18} />
                                <span>+963 930 012 015</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <SectionTitle title={t('dining.experiences_title')} centered={true} className="mb-6" />
                        <p className="text-accent-800 text-lg leading-relaxed">{t('dining.intro')}</p>
                    </div>
                </div>
            </section>

            {/* Preview of Upcoming Culinary Spaces */}
            <section className="bg-secondary-50/50 py-16">
                <div className="container mx-auto px-4">
                    <div className="space-y-16">
                        {diningExperiences.map((experience, index) => {
                            const [ref, inView] = useInView({
                                triggerOnce: true,
                                threshold: 0.1,
                            });

                            return (
                                <div
                                    key={experience.id}
                                    ref={ref}
                                    className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
                                >
                                    <motion.div
                                        className="lg:w-1/2"
                                        initial={{
                                            opacity: 0,
                                            x: index % 2 === 0 ? -50 : 50,
                                        }}
                                        animate={
                                            inView
                                                ? { opacity: 1, x: 0 }
                                                : {
                                                      opacity: 0,
                                                      x: index % 2 === 0 ? -50 : 50,
                                                  }
                                        }
                                        transition={{ duration: 0.8 }}
                                    >
                                        <div className="relative overflow-hidden rounded-lg shadow-xl group">
                                            <img
                                                src={experience.image}
                                                alt={experience.title}
                                                className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute top-4 right-4 bg-black/60 text-secondary-100 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-secondary-300/30">
                                                {t('dining.coming_soon')}
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="lg:w-1/2"
                                        initial={{
                                            opacity: 0,
                                            x: index % 2 === 0 ? 50 : -50,
                                        }}
                                        animate={
                                            inView
                                                ? { opacity: 1, x: 0 }
                                                : {
                                                      opacity: 0,
                                                      x: index % 2 === 0 ? 50 : -50,
                                                  }
                                        }
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.2,
                                        }}
                                    >
                                        <h3 className="mb-4 font-serif text-2xl md:text-3xl font-semibold text-accent-900">{experience.title}</h3>
                                        <p className="text-accent-700 text-lg leading-relaxed">{experience.description}</p>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Inquiries & Early Access Section */}
            <section className="bg-accent-950 py-20 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="mx-auto max-w-3xl">
                        <span className="text-xs font-semibold tracking-widest text-primary-400 uppercase mb-3 block">
                            Khan Wahoud · Old Damascus
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
