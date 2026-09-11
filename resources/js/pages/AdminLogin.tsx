import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button';
import api from '../utils/axios';

const AdminLoginPage: React.FC = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.post('/admin/login', {
                email,
                password,
            });

            if (response.status === 200) {
                // Store the token
                document.cookie = `adminToken=${response.data.token}; path=/; secure; samesite=strict`;
                router.visit('/admin/dashboard');
            } else {
                setError(response.data.message || t('admin.invalid_credentials'));
            }
        } catch (err) {
            console.log(err);

            setError(t('admin.connection_failed'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-accent-50 flex min-h-screen items-center justify-center pt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
            >
                <div className="mb-6 flex justify-center">
                    <div className="bg-primary-700 flex h-16 w-16 items-center justify-center rounded-full">
                        <Lock size={30} className="text-white" />
                    </div>
                </div>

                <h2 className="mb-6 text-center font-serif text-2xl font-bold">{t('admin.login_title')}</h2>

                {error && <div className="mb-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-accent-700 mb-1 block text-sm font-medium">
                            {t('admin.email')}
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-accent-300 focus:ring-primary-700 focus:border-primary-700 w-full rounded-md border px-4 py-2 focus:ring-2"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="text-accent-700 mb-1 block text-sm font-medium">
                            {t('admin.password')}
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-accent-300 focus:ring-primary-700 focus:border-primary-700 w-full rounded-md border px-4 py-2 focus:ring-2"
                            required
                            disabled={isLoading}
                        />
                        <div className="mt-1 text-right">
                            <a href="#" className="text-primary-700 text-sm hover:underline">
                                {t('admin.forgot_password')}
                            </a>
                        </div>
                    </div>

                    <Button type="submit" variant="primary" className="mb-4 w-full" disabled={isLoading}>
                        {isLoading ? t('admin.logging_in') : t('admin.login_btn')}
                    </Button>

                    <p className="text-accent-500 mt-6 text-center text-sm">
                        {t('admin.staff_note')}
                        <br />
                        {t('admin.assistance_note')}
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLoginPage;
