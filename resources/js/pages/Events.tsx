import { motion } from 'framer-motion';
import { Phone, Sparkles, Users } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import api from '../utils/axios';

const WhatsAppIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.07c-.24.67-1.4 1.24-1.92 1.32-.5.08-1.15.11-3.32-.78-2.77-1.15-4.56-3.96-4.7-4.14-.14-.19-1.12-1.49-1.12-2.84 0-1.35.71-2.01.96-2.28.25-.27.55-.34.73-.34.18 0 .36.01.52.02.17.01.39-.06.61.47.23.55.78 1.9.85 2.04.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.16-.29.35-.42.47-.14.14-.29.3-.12.59.16.29.73 1.21 1.57 1.95 1.08.96 1.99 1.26 2.27 1.4.28.14.44.12.61-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.64-.14.26.09 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.7-.17 1.37z" />
    </svg>
);

const EventsPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const isAr = Boolean(i18n.language?.startsWith('ar'));

    const spaces = [
        {
            id: 'saha',
            title: {
                en: 'The Saha "Courtyard"',
                ar: 'ساحة الخان (الفناء المركزي)',
            },
            badge: {
                en: 'Grand Open-Air Courtyard',
                ar: 'فناء تاريخي مفتوح',
            },
            capacity: {
                en: 'Up to 120 Guests',
                ar: 'حتى ١٢٠ ضيفاً',
            },
            suitableFor: {
                en: 'Weddings, Gala Receptions & Starlit Banquets',
                ar: 'حفلات الزفاف، الاستقبال الكبرى، والمآدب التراثية',
            },
            description: {
                en: 'Our magnificent central courtyard provides a breathtaking open-air setting surrounded by 1736 stone arches, black-and-white ablaq masonry, and our central fountain. A peerless backdrop for celebratory banquets and unforgettable gatherings.',
                ar: 'يوفر فناؤنا المركزي المهيب بيئة مفتوحة ساحرة محاطة بأقواس حجرية تعود لعام ١٧٣٦، ومداميك الأبلق الدمشقي وبحرة المياه التراثية. إطار لا مثيل له لحفلات الزفاف الملكية والاحتفالات الاستثنائية تحت سماء دمشق القديمة.',
            },
            image: '/images/IMG_4641.JPEG',
            waMessage: {
                en: 'Hello Khan Wahoud Concierge, I would like to inquire about booking an event at The Saha Courtyard.',
                ar: 'مرحباً خان وحود، أود الاستفسار عن حجز مناسبة خاصة في ساحة الخان (الفناء المركزي).',
            },
        },
        {
            id: 'gallery',
            title: {
                en: 'The Gallery',
                ar: 'صالة المعرض التراثية (The Gallery)',
            },
            badge: {
                en: 'Indoor Cultural Salon',
                ar: 'صالون ثقافي وفني داخلي',
            },
            capacity: {
                en: 'Up to 50 Guests',
                ar: 'حتى ٥٠ ضيفاً',
            },
            suitableFor: {
                en: 'Cultural Salons, Art Evenings & VIP Cocktails',
                ar: 'الصالونات الثقافية، الأمسيات الفنية، واستقبال كبار الشخصيات',
            },
            description: {
                en: 'An elegant indoor sanctuary adorned with curated Syrian fine art, carved wooden ceilings, and authentic Damascus antiques. The Gallery offers a sophisticated, intimate atmosphere for cultural gatherings, private cocktails, and exclusive dinners.',
                ar: 'صالة داخلية أنيقة مزدانة بروائع الفن السوري المعاصر، والأسقف الخشبية المنقوشة، والتحف الدمشقية الأصيلة. توفر صالة المعرض أجواءً راقية وحميمة للندوات الثقافية، وحفلات الكوكتيل الخاصة، والمآدب الحصرية.',
            },
            image: '/images/IMG_4460.JPEG',
            waMessage: {
                en: 'Hello Khan Wahoud Concierge, I would like to inquire about booking an event at The Gallery.',
                ar: 'مرحباً خان وحود، أود الاستفسار عن حجز مناسبة خاصة في صالة المعرض (The Gallery).',
            },
        },
        {
            id: 'meeting-room',
            title: {
                en: 'The Meeting Room',
                ar: 'قاعة الاجتماعات التنفيذية',
            },
            badge: {
                en: 'Heritage Business Suite',
                ar: 'قاعة اجتماعات وأعمال تنفيذية',
            },
            capacity: {
                en: 'Up to 30 Guests',
                ar: 'حتى ٣٠ ضيفاً',
            },
            suitableFor: {
                en: 'Board Meetings, Executive Retreats & Workshops',
                ar: 'اجتماعات مجالس الإدارة، ورش العمل، والخلوات التنفيذية',
            },
            description: {
                en: 'A fully appointed professional suite that pairs authentic 18th-century architectural grandeur with modern audiovisual capabilities, climate control, and dedicated executive catering. Ideal for board meetings, seminars, and strategic summits.',
                ar: 'قاعة تنفيذية مجهزة بالكامل تدمج بين أصالة العمارة العثمانية لعام ١٧٣٦ وأحدث التجهيزات السمعية والبصرية، مع تكييف كامل وخدمات ضيافة تنفيذية مخصصة. مثالية لاجتماعات الأعمال وورش العمل والندوات الدبلوماسية.',
            },
            image: '/images/IMG_4654.JPEG',
            waMessage: {
                en: 'Hello Khan Wahoud Concierge, I would like to inquire about booking The Meeting Room for a corporate event/meeting.',
                ar: 'مرحباً خان وحود، أود الاستفسار عن حجز قاعة الاجتماعات لإقامة اجتماع عمل / فعالية تنفيذية.',
            },
        },
    ];

    const [heroRef, heroInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [formSubmitting, setFormSubmitting] = React.useState(false);
    const [formError, setFormError] = React.useState<string | null>(null);
    const [formSuccess, setFormSuccess] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitting(true);
        setFormError(null);
        setFormSuccess(false);

        const formData = new FormData(e.currentTarget);
        const eventData = {
            name: formData.get('name'),
            email: formData.get('email'),
            event_type: formData.get('eventType'),
            preferred_date: formData.get('date'),
            guest_count: formData.get('guests'),
            additional_requirements: formData.get('message'),
        };

        try {
            const response = await api.post('/event-requests/create', eventData);

            setFormSuccess(true);
            setFormError(null);
        } catch (error: any) {
            console.error('Error submitting event proposal:', error);

            if (error.response?.status === 422) {
                // Validation errors
                const errors = error.response.data.errors;
                const errorMessages = Object.values(errors).flat().join('\n');
                setFormError(errorMessages);
                setFormSuccess(false);
            } else {
                // Other errors
                const errorMessage = error.response?.data?.message || 'Failed to submit event proposal. Please try again.';
                setFormError(errorMessage);
                setFormSuccess(false);
            }
        } finally {
            setFormSubmitting(false);
        }
    };

    return (
        <div>
            {/* Hero Banner */}
            <section ref={heroRef} className="relative pt-32 pb-20 md:pt-64 md:pb-24">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/IMG_3772.png"
                        alt="Private Events"
                        className="h-full w-full object-cover"
                    />
                    <div className="bg-accent-950 absolute inset-0 opacity-50"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4">
                    <motion.div
                        className="mx-auto max-w-3xl text-center text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">{t('events.title')}</h1>
                        <p className="font-serif text-xl italic opacity-90 md:text-2xl">{t('events.subtitle')}</p>
                    </motion.div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-accent-800 text-lg leading-relaxed">{t('events.intro')}</p>
                    </div>
                </div>
            </section>

            {/* Event Spaces Section */}
            <section className="bg-accent-50 py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-6xl">
                    <SectionTitle
                        title={t('events.spaces_title')}
                        subtitle={t('events.spaces_subtitle')}
                        centered={true}
                        className="mb-14"
                    />

                    <div className="space-y-12 md:space-y-16">
                        {spaces.map((space, index) => {
                            const isOdd = index % 2 === 1;
                            const waText = isAr ? space.waMessage.ar : space.waMessage.en;
                            const waUrl = `https://wa.me/963930012015?text=${encodeURIComponent(waText)}`;

                            return (
                                <div
                                    key={space.id}
                                    className="bg-white rounded-2xl border border-accent-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    <div className={`flex flex-col lg:flex-row ${isOdd ? 'lg:flex-row-reverse' : ''} items-stretch`}>
                                        {/* Image Column with Strictly Fixed Height */}
                                        <motion.div
                                            className="w-full lg:w-1/2 relative h-72 sm:h-80 lg:h-auto lg:min-h-[420px] overflow-hidden group flex-shrink-0"
                                            initial={{ opacity: 0, x: isOdd ? 40 : -40 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.7 }}
                                        >
                                            <img
                                                src={space.image}
                                                alt={isAr ? space.title.ar : space.title.en}
                                                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-accent-950/60 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                                            <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-accent-950/85 backdrop-blur-md text-secondary-300 text-[11px] tracking-widest uppercase font-semibold px-3.5 py-1.5 rounded-full border border-secondary-300/30 pointer-events-none">
                                                {isAr ? space.badge.ar : space.badge.en}
                                            </div>
                                        </motion.div>

                                        {/* Content Column */}
                                        <motion.div
                                            className="lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between"
                                            initial={{ opacity: 0, x: isOdd ? -40 : 40 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.7 }}
                                        >
                                            <div>
                                                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-accent-950 mb-3">
                                                    {isAr ? space.title.ar : space.title.en}
                                                </h3>

                                                {/* Specs Chips */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-800 bg-accent-100 px-3 py-1 rounded-full">
                                                        <Users size={14} className="text-primary-700" />
                                                        {isAr ? space.capacity.ar : space.capacity.en}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-800 bg-accent-100 px-3 py-1 rounded-full">
                                                        <Sparkles size={14} className="text-primary-700" />
                                                        {isAr ? space.suitableFor.ar : space.suitableFor.en}
                                                    </span>
                                                </div>

                                                <p className="text-accent-700 leading-relaxed text-sm sm:text-base mb-6">
                                                    {isAr ? space.description.ar : space.description.en}
                                                </p>
                                            </div>

                                            {/* Action CTAs */}
                                            <div className="pt-6 border-t border-accent-100">
                                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                                    {/* WhatsApp Button with Ready Message */}
                                                    <a
                                                        href={waUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center gap-2.5 rounded-full bg-accent-900 hover:bg-accent-800 text-white px-6 py-3 text-xs tracking-wider uppercase font-semibold shadow-md hover:shadow-xl transition-all"
                                                    >
                                                        <WhatsAppIcon className="w-4 h-4" />
                                                        <span>{t('events.book_wa')}</span>
                                                    </a>

                                                    {/* Call Concierge Button */}
                                                    <a
                                                        href="tel:+963930012015"
                                                        className="inline-flex items-center justify-center gap-2 rounded-full border border-secondary-400 hover:border-primary-700 hover:text-primary-700 bg-secondary-50 text-accent-950 px-5 py-3 text-xs tracking-wider uppercase font-medium shadow-sm hover:shadow transition-all"
                                                    >
                                                        <Phone size={15} />
                                                        <span>{t('events.call_concierge')}</span>
                                                    </a>
                                                </div>

                                                <div className="mt-3 flex items-center gap-2 text-accent-500 text-[11px]">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
                                                    <span>{t('events.instant_support')}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Event Planning */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <SectionTitle
                        title={t('events.planning_services')}
                        centered={true}
                        className="mb-12"
                    />

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="bg-accent-50 rounded-lg p-8">
                            <div className="bg-primary-700 mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white">
                                1
                            </div>
                            <h3 className="mb-3 text-xl font-semibold">{t('events.step1_title')}</h3>
                            <p className="text-accent-700">
                                {t('events.step1_desc')}
                            </p>
                        </div>

                        <div className="bg-accent-50 rounded-lg p-8">
                            <div className="bg-primary-700 mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white">
                                2
                            </div>
                            <h3 className="mb-3 text-xl font-semibold">{t('events.step2_title')}</h3>
                            <p className="text-accent-700">
                                {t('events.step2_desc')}
                            </p>
                        </div>

                        <div className="bg-accent-50 rounded-lg p-8">
                            <div className="bg-primary-700 mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white">
                                3
                            </div>
                            <h3 className="mb-3 text-xl font-semibold">{t('events.step3_title')}</h3>
                            <p className="text-accent-700">
                                {t('events.step3_desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section id="proposal-form" className="bg-white py-16 scroll-mt-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl">
                        <SectionTitle
                            title={t('events.proposal_title')}
                            subtitle={t('events.proposal_subtitle')}
                            centered={true}
                            className="mb-8"
                        />

                        {formSuccess && (
                            <div className="mb-6 rounded-md bg-green-100 p-4 text-green-700">
                                {t('events.form.success')}
                            </div>
                        )}

                        {formError && <div className="mb-6 rounded-md bg-red-100 p-4 text-red-700">{formError}</div>}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="text-accent-700 mb-1 block text-sm font-medium">
                                        {t('events.form.name')}
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="border-accent-300 focus:ring-primary-700 focus:border-primary-700 w-full rounded-md border px-4 py-2 focus:ring-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-accent-700 mb-1 block text-sm font-medium">
                                        {t('events.form.email')}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="border-accent-300 focus:ring-primary-700 focus:border-primary-700 w-full rounded-md border px-4 py-2 focus:ring-2"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="eventType" className="text-accent-700 mb-1 block text-sm font-medium">
                                        {t('events.form.event_type')}
                                    </label>
                                    <select
                                        id="eventType"
                                        name="eventType"
                                        className="border-accent-300 focus:ring-primary-700 focus:border-primary-700 w-full rounded-md border px-4 py-2 focus:ring-2"
                                        required
                                    >
                                        <option value="">{t('events.form.select_type')}</option>
                                        <option value="wedding">{t('events.form.wedding')}</option>
                                        <option value="corporate">{t('events.form.corporate')}</option>
                                        <option value="cultural">{t('events.form.cultural')}</option>
                                        <option value="other">{t('events.form.other')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="date" className="text-accent-700 mb-1 block text-sm font-medium">
                                        {t('events.form.date')}
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        className="border-accent-300 focus:ring-primary-700 focus:border-primary-700 w-full rounded-md border px-4 py-2 focus:ring-2"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="guests" className="text-accent-700 mb-1 block text-sm font-medium">
                                    {t('events.form.guests')}
                                </label>
                                <input
                                    type="number"
                                    id="guests"
                                    name="guests"
                                    className="border-accent-300 focus:ring-primary-700 focus:border-primary-700 w-full rounded-md border px-4 py-2 focus:ring-2"
                                    min="1"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="text-accent-700 mb-1 block text-sm font-medium">
                                    {t('events.form.requirements')}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    className="border-accent-300 focus:ring-primary-700 focus:border-primary-700 w-full rounded-md border px-4 py-2 focus:ring-2"
                                    required
                                ></textarea>
                            </div>

                            <div className="flex justify-center">
                                <Button type="submit" variant="primary" size="lg" disabled={formSubmitting}>
                                    {formSubmitting ? t('events.form.submitting') : t('events.form.submit')}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EventsPage;
