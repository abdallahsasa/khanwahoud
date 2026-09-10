import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button';

const NotFoundPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-accent-50 flex min-h-screen items-center justify-center pt-20 pb-20">
            <div className="container mx-auto px-4">
                <motion.div
                    className="mx-auto max-w-lg text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-primary-700 mb-4 font-serif text-6xl font-bold">404</h1>
                    <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
                    <p className="text-accent-700 mb-8">The page you're looking for doesn't exist or has been moved.</p>
                    <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <Button to="/" variant="primary">
                            Return to Home
                        </Button>
                        <Button to="/contact" variant="outline">
                            {t('common.contact_us')}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFoundPage;
