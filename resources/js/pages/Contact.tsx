import { motion } from 'framer-motion';
import {
    AlertCircle,
    Building,
    CalendarCheck,
    CheckCircle2,
    ExternalLink,
    Instagram,
    Mail,
    MapPin,
    MessageCircle,
    MessageSquare,
    Phone,
    Send,
    Sparkles,
    Users,
} from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import api from '../utils/axios';

type FormType = 'general' | 'booking' | 'restoration' | 'membership';

const ContactPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language.startsWith('ar');
    const [activeForm, setActiveForm] = useState<FormType>('general');
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const [heroRef, heroInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const formTypes = [
        {
            id: 'general' as FormType,
            title: t('contact.form_titles.general'),
            icon: <MessageSquare size={18} />,
        },
        {
            id: 'booking' as FormType,
            title: t('contact.form_titles.booking'),
            icon: <CalendarCheck size={18} />,
        },
        {
            id: 'restoration' as FormType,
            title: t('contact.form_titles.restoration'),
            icon: <Building size={18} />,
        },
        {
            id: 'membership' as FormType,
            title: t('contact.form_titles.membership'),
            icon: <Users size={18} />,
        },
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitting(true);
        setFormMessage(null);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const inquiryData = {
            full_name: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            type: activeForm,
            subject: formData.get('subject'),
            message: formData.get('message'),
            check_in_date: formData.get('checkInDate'),
            check_out_date: formData.get('checkOutDate'),
        };

        try {
            const response = await api.post('/contact-inquiries/create', inquiryData);

            if (response.data) {
                setFormMessage({
                    type: 'success',
                    text: response.data.message || t('contact.success_msg'),
                });
                form.reset();
            }
        } catch (error: any) {
            console.error('Error submitting contact form:', error);

            let errorMessage = t('contact.error_msg');

            if (error.response?.data?.errors) {
                const errors = error.response.data.errors;
                errorMessage = Object.values(errors).flat().join('\n');
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            setFormMessage({
                type: 'error',
                text: errorMessage,
            });
        } finally {
            setFormSubmitting(false);
        }
    };

    return (
        <div className="bg-white">
            {/* Hero Banner */}
            <section ref={heroRef} className="relative pt-36 pb-24 md:pt-56 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/mainbg.png"
                        alt="Khan Wahoud Historic Building"
                        className="h-full w-full object-cover object-center scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-accent-950/85 via-accent-950/70 to-accent-950/90"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4">
                    <motion.div
                        className="mx-auto max-w-3xl text-center text-white"
                        initial={{ opacity: 0, y: 24 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/40 bg-primary-950/50 backdrop-blur-md px-4 py-1.5 text-xs font-medium tracking-widest text-primary-300 uppercase mb-6 shadow-sm">
                            <Sparkles size={14} className="text-primary-400" />
                            {t('contact.badge')}
                        </span>
                        <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white">
                            {t('contact.title')}
                        </h1>
                        <p className="font-serif text-lg italic text-secondary-200/90 max-w-2xl mx-auto md:text-xl leading-relaxed">
                            {t('contact.subtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Quick Contact & Concierge Cards */}
            <section className="relative z-20 -mt-10 md:-mt-14 pb-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {/* Visit Card */}
                        <motion.div
                            className="group bg-white rounded-2xl border border-secondary-200/80 p-6 shadow-lg shadow-accent-950/5 hover:border-primary-500 hover:shadow-xl hover:shadow-primary-950/5 transition-all duration-300 flex flex-col justify-between"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center mb-4 group-hover:bg-primary-700 group-hover:text-white transition-all duration-300">
                                    <MapPin size={22} />
                                </div>
                                <h3 className="font-serif font-bold text-lg text-accent-900 mb-1">
                                    {t('contact.visit_us')}
                                </h3>
                                <p className="text-xs text-secondary-600 font-medium mb-3">
                                    {t('contact.address_note')}
                                </p>
                                <p className="text-sm text-accent-700 leading-relaxed mb-4">
                                    {t('contact.address')}
                                </p>
                            </div>
                            <a
                                href="https://maps.app.goo.gl/WczTjT3Vac5dNxmk9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800 transition-colors pt-2 border-t border-secondary-100"
                            >
                                {t('contact.directions')}
                                <ExternalLink size={13} className={isAr ? 'rotate-180' : ''} />
                            </a>
                        </motion.div>

                        {/* Telephone Card */}
                        <motion.div
                            className="group bg-white rounded-2xl border border-secondary-200/80 p-6 shadow-lg shadow-accent-950/5 hover:border-primary-500 hover:shadow-xl hover:shadow-primary-950/5 transition-all duration-300 flex flex-col justify-between"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center mb-4 group-hover:bg-primary-700 group-hover:text-white transition-all duration-300">
                                    <Phone size={22} />
                                </div>
                                <h3 className="font-serif font-bold text-lg text-accent-900 mb-1">
                                    {t('contact.call_us')}
                                </h3>
                                <p className="text-xs text-secondary-600 font-medium mb-3">
                                    {t('contact.call_note')}
                                </p>
                                <a
                                    href="tel:+963930012015"
                                    dir="ltr"
                                    className="block font-serif text-lg font-semibold text-accent-900 hover:text-primary-700 transition-colors mb-4"
                                >
                                    +963 930 012 015
                                </a>
                            </div>
                            <a
                                href="tel:+963930012015"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800 transition-colors pt-2 border-t border-secondary-100"
                            >
                                {t('contact.call_us')}
                                <Phone size={13} />
                            </a>
                        </motion.div>

                        {/* Email Card */}
                        <motion.div
                            className="group bg-white rounded-2xl border border-secondary-200/80 p-6 shadow-lg shadow-accent-950/5 hover:border-primary-500 hover:shadow-xl hover:shadow-primary-950/5 transition-all duration-300 flex flex-col justify-between"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center mb-4 group-hover:bg-primary-700 group-hover:text-white transition-all duration-300">
                                    <Mail size={22} />
                                </div>
                                <h3 className="font-serif font-bold text-lg text-accent-900 mb-1">
                                    {t('contact.email_us')}
                                </h3>
                                <p className="text-xs text-secondary-600 font-medium mb-3">
                                    {t('contact.email_note')}
                                </p>
                                <a
                                    href="mailto:info@khanwahoud.com"
                                    dir="ltr"
                                    className="block text-sm font-medium text-accent-800 hover:text-primary-700 transition-colors break-all mb-4"
                                >
                                    info@khanwahoud.com
                                </a>
                            </div>
                            <a
                                href="mailto:info@khanwahoud.com"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-800 transition-colors pt-2 border-t border-secondary-100"
                            >
                                {t('contact.email_us')}
                                <Mail size={13} />
                            </a>
                        </motion.div>

                        {/* WhatsApp Concierge Card */}
                        <motion.div
                            className="group bg-white rounded-2xl border border-secondary-200/80 p-6 shadow-lg shadow-accent-950/5 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 flex flex-col justify-between"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                    <MessageCircle size={22} />
                                </div>
                                <h3 className="font-serif font-bold text-lg text-accent-900 mb-1">
                                    {t('contact.whatsapp')}
                                </h3>
                                <p className="text-xs text-secondary-600 font-medium mb-3">
                                    {t('contact.whatsapp_note')}
                                </p>
                                <p dir="ltr" className="font-serif text-lg font-semibold text-accent-900 mb-4">
                                    +963 930 012 015
                                </p>
                            </div>
                            <a
                                href="https://wa.me/963930012015"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors pt-2 border-t border-secondary-100"
                            >
                                {t('contact.whatsapp_chat')}
                                <ExternalLink size={13} className={isAr ? 'rotate-180' : ''} />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="bg-accent-50/70 py-20 border-t border-secondary-200/60">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl">
                        <SectionTitle
                            title={t('contact.get_in_touch')}
                            subtitle={t('contact.form_desc')}
                            centered={true}
                            className="mb-10"
                        />

                        {/* Inquiry Category Tabs */}
                        <div className="mb-10 flex justify-center">
                            <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-white border border-secondary-200/80 shadow-sm">
                                {formTypes.map((form) => {
                                    const isActive = activeForm === form.id;
                                    return (
                                        <button
                                            key={form.id}
                                            type="button"
                                            onClick={() => {
                                                setActiveForm(form.id);
                                                setFormMessage(null);
                                            }}
                                            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                                                isActive
                                                    ? 'bg-primary-700 text-white shadow-md shadow-primary-900/20'
                                                    : 'text-accent-700 hover:text-primary-800 hover:bg-accent-50'
                                            }`}
                                        >
                                            <span className={isActive ? 'text-primary-200' : 'text-accent-500'}>
                                                {form.icon}
                                            </span>
                                            {form.title}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Form Card */}
                        <div className="rounded-3xl bg-white p-8 md:p-12 border border-secondary-200/80 shadow-xl shadow-accent-950/5">
                            {formMessage && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`mb-8 flex items-start gap-3 rounded-2xl p-5 text-sm leading-relaxed ${
                                        formMessage.type === 'success'
                                            ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                                            : 'bg-red-50 text-red-900 border border-red-200'
                                    }`}
                                >
                                    {formMessage.type === 'success' ? (
                                        <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                                    ) : (
                                        <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                                    )}
                                    <div className="flex-1 whitespace-pre-line font-medium">
                                        {formMessage.text}
                                    </div>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="fullName" className="text-accent-800 mb-2 block text-sm font-semibold">
                                            {t('contact.form_fields.name')} <span className="text-primary-700">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            required
                                            className="w-full h-12 rounded-xl border border-secondary-300/80 bg-white px-4 text-accent-900 placeholder:text-secondary-400 focus:border-primary-600 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="text-accent-800 mb-2 block text-sm font-semibold">
                                            {t('contact.form_fields.email')} <span className="text-primary-700">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            dir="ltr"
                                            className="w-full h-12 rounded-xl border border-secondary-300/80 bg-white px-4 text-accent-900 placeholder:text-secondary-400 focus:border-primary-600 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none text-left"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="phone" className="text-accent-800 mb-2 block text-sm font-semibold">
                                            {t('contact.form_fields.phone')}
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            dir="ltr"
                                            placeholder="+963 ..."
                                            className="w-full h-12 rounded-xl border border-secondary-300/80 bg-white px-4 text-accent-900 placeholder:text-secondary-400 focus:border-primary-600 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none text-left"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="text-accent-800 mb-2 block text-sm font-semibold">
                                            {t('contact.form_fields.subject')} <span className="text-primary-700">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            required
                                            className="w-full h-12 rounded-xl border border-secondary-300/80 bg-white px-4 text-accent-900 placeholder:text-secondary-400 focus:border-primary-600 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Booking-Specific Fields */}
                                {activeForm === 'booking' && (
                                    <div className="rounded-2xl border border-primary-200/80 bg-primary-50/30 p-5 space-y-4">
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                            <div>
                                                <label htmlFor="checkInDate" className="text-accent-800 mb-1.5 block text-xs font-semibold uppercase tracking-wider">
                                                    {t('contact.form_fields.check_in')} <span className="text-primary-700">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    id="checkInDate"
                                                    name="checkInDate"
                                                    required
                                                    className="w-full h-11 rounded-xl border border-secondary-300 bg-white px-3 text-sm text-accent-900 focus:border-primary-600 focus:ring-2 focus:ring-primary-500/10 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="checkOutDate" className="text-accent-800 mb-1.5 block text-xs font-semibold uppercase tracking-wider">
                                                    {t('contact.form_fields.check_out')} <span className="text-primary-700">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    id="checkOutDate"
                                                    name="checkOutDate"
                                                    required
                                                    className="w-full h-11 rounded-xl border border-secondary-300 bg-white px-3 text-sm text-accent-900 focus:border-primary-600 focus:ring-2 focus:ring-primary-500/10 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="guests" className="text-accent-800 mb-1.5 block text-xs font-semibold uppercase tracking-wider">
                                                    {t('contact.form_fields.guests')}
                                                </label>
                                                <select
                                                    id="guests"
                                                    name="guests"
                                                    className="w-full h-11 rounded-xl border border-secondary-300 bg-white px-3 text-sm text-accent-900 focus:border-primary-600 focus:ring-2 focus:ring-primary-500/10 outline-none"
                                                >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4+</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="message" className="text-accent-800 mb-2 block text-sm font-semibold">
                                        {t('contact.form_fields.message')} <span className="text-primary-700">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        required
                                        className="w-full rounded-2xl border border-secondary-300/80 bg-white p-4 text-accent-900 placeholder:text-secondary-400 focus:border-primary-600 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none resize-y"
                                    ></textarea>
                                </div>

                                <div className="flex justify-center pt-2">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        disabled={formSubmitting}
                                        className="min-w-[240px] shadow-lg shadow-primary-900/20"
                                    >
                                        <Send size={18} className={isAr ? 'rotate-180' : ''} />
                                        {formSubmitting ? t('common.sending') : t('contact.form_fields.submit')}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Exclusive Instagram Showcase (Social Media) */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-5xl">
                        <motion.div
                            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-950 via-accent-900 to-accent-950 text-white p-8 md:p-14 border border-secondary-800 shadow-2xl"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            {/* Decorative Gold Radial Glow */}
                            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-600/15 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-700/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                <div className="lg:col-span-7">
                                    <div className="inline-flex items-center gap-2.5 rounded-full border border-primary-500/30 bg-primary-950/40 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-primary-300 uppercase tracking-wider mb-6">
                                        <Instagram size={14} className="text-primary-400" />
                                        <span>@khanwahoud</span>
                                    </div>
                                    <h2 className="font-serif text-2xl md:text-4xl font-bold mb-4 tracking-tight text-white">
                                        {t('contact.instagram_title')}
                                    </h2>
                                    <p className="text-secondary-300 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                                        {t('contact.instagram_desc')}
                                    </p>
                                    <div>
                                        <a
                                            href="https://instagram.com/khanwahoud"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white font-medium text-sm shadow-xl shadow-primary-950/40 hover:scale-[1.02] transition-all duration-300"
                                        >
                                            <Instagram size={18} />
                                            <span>{t('contact.follow_instagram')}</span>
                                            <ExternalLink size={14} className={isAr ? 'rotate-180' : ''} />
                                        </a>
                                    </div>
                                </div>

                                <div className="lg:col-span-5 flex justify-center">
                                    <div className="relative w-64 h-64 md:w-72 md:h-72">
                                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary-600/30 to-secondary-400/20 rotate-6 scale-95 blur-sm" />
                                        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-secondary-700/60 shadow-2xl group">
                                            <img
                                                src="/images/courtyard_dining_new.png"
                                                alt="Khan Wahoud Courtyard"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-accent-950/80 via-transparent to-transparent flex items-end p-5">
                                                <div className="flex items-center gap-2 text-white">
                                                    <Instagram size={18} className="text-primary-400" />
                                                    <span className="text-xs font-semibold tracking-wider font-sans">
                                                        Khan Wahoud | خان وحود
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Historic Location & Map Section */}
            <section id="map-section" className="relative h-[460px] md:h-[500px] border-t border-secondary-200">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.9735!2d36.3062!3d33.5123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDMwJzQ0LjMiTiAzNsKwMTgnMjIuMyJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Khan Wahoud Google Maps Location"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale contrast-125 opacity-90"
                ></iframe>

                {/* Floating Location Overlay Card */}
                <div className="absolute bottom-6 left-6 right-6 md:left-12 md:right-auto md:max-w-md z-10 pointer-events-auto">
                    <div className="rounded-2xl bg-white/95 backdrop-blur-md p-6 border border-secondary-200/80 shadow-2xl">
                        <div className="flex items-start gap-3.5 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3 className="font-serif font-bold text-accent-950 text-base">
                                    {t('contact.map_title')}
                                </h3>
                                <p className="text-xs text-accent-600 mt-1 leading-relaxed">
                                    {t('contact.map_desc')}
                                </p>
                            </div>
                        </div>
                        <div className="pt-3 border-t border-secondary-100 flex items-center justify-between">
                            <span className="text-xs font-serif text-secondary-600">
                                Khan Suleyman Pasha
                            </span>
                            <a
                                href="https://maps.app.goo.gl/WczTjT3Vac5dNxmk9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-semibold text-primary-700 hover:text-primary-800 transition-colors"
                            >
                                <span>{t('contact.open_in_maps')}</span>
                                <ExternalLink size={12} className={isAr ? 'rotate-180' : ''} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
