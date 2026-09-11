import { motion } from 'framer-motion';
import { Calendar, Coffee, Crown, Key, Star, Users } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import api from '../utils/axios';

const MembershipPage: React.FC = () => {
    const { t } = useTranslation();
    const [heroRef, heroInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    // Create refs and inView states for each section
    const benefitRefs = [
        useInView({ triggerOnce: true, threshold: 0.1 }),
        useInView({ triggerOnce: true, threshold: 0.1 }),
        useInView({ triggerOnce: true, threshold: 0.1 }),
        useInView({ triggerOnce: true, threshold: 0.1 }),
        useInView({ triggerOnce: true, threshold: 0.1 }),
        useInView({ triggerOnce: true, threshold: 0.1 }),
    ];
    const [selectedTier, setSelectedTier] = React.useState<string | null>(null);
    const [formSubmitting, setFormSubmitting] = React.useState(false);
    const [formMessage, setFormMessage] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [selectedInterests, setSelectedInterests] = React.useState<string[]>([]);

    const handleInterestChange = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitting(true);
        setFormMessage(null);

        const formData = new FormData(e.currentTarget);
        const applicationData = {
            first_name: formData.get('firstName'),
            last_name: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            membership_tier: selectedTier,
            areas_of_interest: selectedInterests,
            about: formData.get('about')
        };

        try {
            const response = await api.post('/membership-applications', applicationData);

            if (response.status === 201) {
                setSelectedTier(null);
                setSelectedInterests([]);
                setFormMessage({
                    type: 'success',
                    text: t('membership.success')
                });
            }
        } catch (error: any) {
            console.error('Error submitting membership application:', error);
            setFormMessage({
                type: 'error',
                text: error.response?.data?.message || t('membership.error')
            });
            window.scrollTo({ top: e.currentTarget.offsetTop - 100, behavior: 'smooth' });
        } finally {
            setFormSubmitting(false);
        }
    };

    const benefits = [
        {
            icon: <Crown className="h-12 w-12" />,
            title: t('membership.benefit_cards.access_title'),
            description: t('membership.benefit_cards.access_desc'),
        },
        {
            icon: <Star className="h-12 w-12" />,
            title: t('membership.benefit_cards.vip_title'),
            description: t('membership.benefit_cards.vip_desc'),
        },
        {
            icon: <Users className="h-12 w-12" />,
            title: t('membership.benefit_cards.community_title'),
            description: t('membership.benefit_cards.community_desc'),
        },
        {
            icon: <Calendar className="h-12 w-12" />,
            title: t('membership.benefit_cards.events_title'),
            description: t('membership.benefit_cards.events_desc'),
        },
        {
            icon: <Key className="h-12 w-12" />,
            title: t('membership.benefit_cards.rooms_title'),
            description: t('membership.benefit_cards.rooms_desc'),
        },
        {
            icon: <Coffee className="h-12 w-12" />,
            title: t('membership.benefit_cards.dining_title'),
            description: t('membership.benefit_cards.dining_desc'),
        },
    ];

    const interestOptions = [
        { key: 'Cultural Events', label: t('membership.interests.cultural_events') },
        { key: 'Fine Dining', label: t('membership.interests.fine_dining') },
        { key: 'Historical Architecture', label: t('membership.interests.historical_architecture') },
        { key: 'Art & Exhibitions', label: t('membership.interests.art_exhibitions') },
        { key: 'Traditional Crafts', label: t('membership.interests.traditional_crafts') },
        { key: 'Ottoman Heritage', label: t('membership.interests.ottoman_heritage') },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-20 md:pt-64 md:pb-24">
                <div className="absolute inset-0 z-0">
                    <img
                        src="images/IMG_4474.JPEG"
                        alt="Membership"
                        className="h-full w-full object-cover"
                    />
                    <div className="bg-accent-950 absolute inset-0 opacity-60"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4">
                    <motion.div
                        className="mx-auto max-w-3xl text-center text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">{t('membership.hero_title')}</h1>
                        <p className="font-serif text-xl italic opacity-90 md:text-2xl">{t('membership.hero_subtitle')}</p>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <SectionTitle
                        title={t('membership.benefits_title')}
                        subtitle={t('membership.benefits_subtitle')}
                        centered={true}
                        className="mb-12"
                    />

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {benefits.map((benefit, index) => {
                            const [ref, inView] = benefitRefs[index];
                            return (
                                <motion.div
                                    key={index}
                                    ref={ref}
                                    className="bg-accent-50 rounded-lg p-6 text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <div className="text-primary-700 mb-4 flex justify-center">{benefit.icon}</div>
                                    <h3 className="mb-2 font-serif text-xl font-semibold">{benefit.title}</h3>
                                    <p className="text-accent-600">{benefit.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* Application Form */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl">
                        <SectionTitle title={t('membership.apply_title')} subtitle={t('membership.apply_subtitle')} centered={true} className="mb-8" />

                        {formMessage && (
                            <div className={`mb-6 rounded-lg p-4 text-center ${
                                formMessage.type === 'success'
                                    ? 'bg-green-50 text-green-800'
                                    : 'bg-red-50 text-red-800'
                            }`}>
                                {formMessage.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="firstName" className="text-accent-700 mb-1 block text-sm font-medium">{t('membership.first_name')}</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className="border-accent-300 focus:ring-primary-700 focus:border-primary-700 w-full rounded-md border px-4 py-2 focus:ring-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="text-accent-700 mb-1 block text-sm font-medium">{t('membership.last_name')}</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        className="border-accent-300 focus:ring-primary-700 focus:border-primary-700 w-full rounded-md border px-4 py-2 focus:ring-2"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="email" className="text-accent-700 mb-1 block text-sm font-medium">{t('membership.email')}</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="border-accent-300 focus:ring-primary-700 focus:border-primary-700 w-full rounded-md border px-4 py-2 focus:ring-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="text-accent-700 mb-1 block text-sm font-medium">{t('membership.phone')}</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="border-accent-300 focus:ring-primary-700 focus:border-primary-700 w-full rounded-md border px-4 py-2 focus:ring-2"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-accent-700 mb-1 block text-sm font-medium">{t('membership.tier_label')}</label>
                                <select
                                    className="border-accent-300 focus:ring-primary-700 focus:border-primary-700 w-full rounded-md border px-4 py-2 focus:ring-2"
                                    required
                                    value={selectedTier || ''}
                                    onChange={(e) => setSelectedTier(e.target.value)}
                                >
                                    <option value="">{t('membership.tier_select')}</option>
                                    <option value="Heritage">{t('membership.tiers.heritage')}</option>
                                    <option value="Legacy">{t('membership.tiers.legacy')}</option>
                                    <option value="Royal">{t('membership.tiers.royal')}</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-accent-700 mb-1 block text-sm font-medium">{t('membership.interests_label')}</label>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {interestOptions.map((interest) => (
                                        <label key={interest.key} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox text-primary-700 rounded"
                                                checked={selectedInterests.includes(interest.key)}
                                                onChange={() => handleInterestChange(interest.key)}
                                            />
                                            <span className="text-accent-800 text-sm">{interest.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="about" className="text-accent-700 mb-1 block text-sm font-medium">{t('membership.about_label')}</label>
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={4}
                                    className="border-accent-300 focus:ring-primary-700 focus:border-primary-700 w-full rounded-md border px-4 py-2 focus:ring-2"
                                    placeholder={t('membership.about_placeholder')}
                                    required
                                ></textarea>
                            </div>

                            <div className="flex justify-center">
                                <Button type="submit" variant="primary" size="lg" disabled={formSubmitting}>
                                    {formSubmitting ? t('membership.submitting') : t('membership.submit')}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default MembershipPage;
