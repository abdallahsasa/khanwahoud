import { motion } from 'framer-motion';
import { Building, CalendarCheck, Facebook, Instagram, Mail, MapPin, MessageSquare, Phone, Twitter, Users } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import api from '../utils/axios';

type FormType = 'general' | 'booking' | 'restoration' | 'membership';

const ContactPage: React.FC = () => {
    const { t } = useTranslation();
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
            title: 'General Inquiries',
            icon: <MessageSquare size={20} />,
        },
        {
            id: 'booking' as FormType,
            title: 'Booking Inquiries',
            icon: <CalendarCheck size={20} />,
        },
        {
            id: 'restoration' as FormType,
            title: 'Restoration Partnership',
            icon: <Building size={20} />,
        },
        {
            id: 'membership' as FormType,
            title: 'Membership Requests',
            icon: <Users size={20} />,
        },
    ];

    const socialLinks = [
        {
            icon: <Instagram size={24} />,
            url: 'https://instagram.com/khanwahoud',
            label: 'Instagram',
        },
        {
            icon: <Facebook size={24} />,
            url: 'https://facebook.com/khanwahoud',
            label: 'Facebook',
        },
        {
            icon: <Twitter size={24} />,
            url: 'https://twitter.com/khanwahoud',
            label: 'Twitter',
        },
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitting(true);
        setFormMessage(null);

        const formData = new FormData(e.currentTarget);
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
                    text: response.data.message || 'Your message has been sent successfully! We will get back to you soon.',
                });
            }
        } catch (error: any) {
            console.error('Error submitting contact form:', error);

            let errorMessage = 'Failed to send message. Please try again.';

            if (error.response?.data?.errors) {
                // Handle validation errors
                const errors = error.response.data.errors;
                errorMessage = Object.values(errors).flat().join('\n');
            } else if (error.response?.data?.message) {
                // Handle other API errors
                errorMessage = error.response.data.message;
            }

            setFormMessage({
                type: 'error',
                text: errorMessage,
            });
            window.scrollTo({ top: e.currentTarget.offsetTop - 100, behavior: 'smooth' });
        } finally {
            setFormSubmitting(false);
        }
    };

    return (
        <div>
            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-32 pb-20 md:pt-64 md:pb-24">
                <div className="absolute inset-0 z-0">
                    <img src="/images/mainbg.png" alt="Contact Us" className="h-full w-full object-cover" />
                    <div className="bg-accent-950 absolute inset-0 opacity-60"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4">
                    <motion.div
                        className="mx-auto max-w-3xl text-center text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">Contact Us</h1>
                        <p className="font-serif text-xl italic opacity-90 md:text-2xl">Get in touch with Khan Wahoud</p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
                        <motion.div
                            className="border-accent-200 hover:border-primary-700 flex flex-col items-center rounded-lg border p-6 text-center transition-colors duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <MapPin size={28} className="text-primary-700 mb-4" />
                            <h3 className="mb-2 text-lg font-semibold">Visit Us</h3>
                            <a
                                href="https://maps.app.goo.gl/WczTjT3Vac5dNxmk9"
                                target="_blank"
                                className="text-accent-700 hover:text-primary-700 transition-colors"
                            >
                                {t('contact.address')}
                            </a>
                        </motion.div>

                        <motion.div
                            className="border-accent-200 hover:border-primary-700 flex flex-col items-center rounded-lg border p-6 text-center transition-colors duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Mail size={28} className="text-primary-700 mb-4" />
                            <h3 className="mb-2 text-lg font-semibold">Email Us</h3>
                            <a href="mailto:info@khanwahoud.com" className="text-accent-700 hover:text-primary-700 transition-colors">
                                info@khanwahoud.com
                            </a>
                        </motion.div>

                        <motion.div
                            className="border-accent-200 hover:border-primary-700 flex flex-col items-center rounded-lg border p-6 text-center transition-colors duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Phone size={28} className="text-primary-700 mb-4" />
                            <h3 className="mb-2 text-lg font-semibold">Call Us</h3>
                            <a href="tel:+963930012015" className="text-accent-700 hover:text-primary-700 transition-colors">
                                +963 930 012 015
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="bg-accent-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl">
                        <SectionTitle title="Get in Touch" centered={true} className="mb-8" />

                        <div className="mb-8 flex flex-wrap justify-center gap-4">
                            {formTypes.map((form) => (
                                <button
                                    key={form.id}
                                    onClick={() => setActiveForm(form.id)}
                                    className={`flex items-center rounded-full px-4 py-2 transition-colors ${
                                        activeForm === form.id ? 'bg-primary-700 text-white' : 'bg-accent-100 text-accent-800 hover:bg-accent-200'
                                    }`}
                                >
                                    <span className="mr-2">{form.icon}</span>
                                    {form.title}
                                </button>
                            ))}
                        </div>

                        <div className="rounded-lg bg-white p-8 shadow">
                            {formMessage && (
                                <div
                                    className={`mb-6 rounded-lg p-4 text-center whitespace-pre-line ${
                                        formMessage.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                                    }`}
                                >
                                    {formMessage.text}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="fullName" className="text-accent-700 mb-1 block text-sm font-medium">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            className="border-accent-300 focus:ring-primary-700 focus:border-primary-700 w-full rounded-md border px-4 py-2 focus:ring-2"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="text-accent-700 mb-1 block text-sm font-medium">
                                            Email Address
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

                                {(activeForm === 'booking' || activeForm === 'membership') && (
                                    <div>
                                        <label htmlFor="phone" className="text-accent-700 mb-1 block text-sm font-medium">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className="border-accent-300 focus:ring-primary-700 focus:border-primary-700 w-full rounded-md border px-4 py-2 focus:ring-2"
                                            required
                                        />
                                    </div>
                                )}

                                {activeForm === 'booking' && (
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="checkInDate" className="text-accent-700 mb-1 block text-sm font-medium">
                                                Check-in Date
                                            </label>
                                            <input
                                                type="date"
                                                id="checkInDate"
                                                name="checkInDate"
                                                className="border-accent-300 focus:ring-primary-700 focus:border-primary-700 w-full rounded-md border px-4 py-2 focus:ring-2"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="checkOutDate" className="text-accent-700 mb-1 block text-sm font-medium">
                                                Check-out Date
                                            </label>
                                            <input
                                                type="date"
                                                id="checkOutDate"
                                                name="checkOutDate"
                                                className="border-accent-300 focus:ring-primary-700 focus:border-primary-700 w-full rounded-md border px-4 py-2 focus:ring-2"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="subject" className="text-accent-700 mb-1 block text-sm font-medium">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        className="border-accent-300 focus:ring-primary-700 focus:border-primary-700 w-full rounded-md border px-4 py-2 focus:ring-2"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="text-accent-700 mb-1 block text-sm font-medium">
                                        Message
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
                                        {formSubmitting ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Media */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <SectionTitle
                        title="Connect With Us"
                        subtitle="Follow us on social media for the latest updates"
                        centered={true}
                        className="mb-8"
                    />

                    <div className="flex justify-center space-x-6">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-accent-50 text-accent-700 hover:text-primary-700 hover:bg-accent-100 rounded-full p-4 transition-colors"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                aria-label={social.label}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map */}
            <section className="relative h-96">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.9735!2d36.3062!3d33.5123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDMwJzQ0LjMiTiAzNsKwMTgnMjIuMyJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </section>
        </div>
    );
};

export default ContactPage;
