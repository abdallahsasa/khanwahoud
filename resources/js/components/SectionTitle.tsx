import { motion } from 'framer-motion';
import React from 'react';
import { useInView } from 'react-intersection-observer';

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    className?: string;
    whiteText?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, centered = false, className = '', whiteText = false }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const containerClasses = `${centered ? 'text-center' : ''} ${className}`;

    return (
        <div ref={ref} className={containerClasses}>
            <motion.h2
                className={`font-serif text-3xl font-bold md:text-4xl lg:text-5xl ${whiteText ? 'text-white' : 'text-accent-950'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
            >
                {title}
            </motion.h2>

            {subtitle && (
                <motion.p
                    className={`${whiteText ? 'text-white' : 'text-accent-700'} mt-5 text-lg font-light md:text-xl`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {subtitle}
                </motion.p>
            )}

            <motion.div
                className="bg-primary-700 mt-4 mb-8 h-1 w-16"
                initial={{ width: 0 }}
                animate={inView ? { width: centered ? 64 : 64 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={centered ? { margin: '1rem auto 2rem' } : {}}
            />
        </div>
    );
};

export default SectionTitle;
