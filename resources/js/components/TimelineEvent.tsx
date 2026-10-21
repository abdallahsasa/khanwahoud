import { motion } from 'framer-motion';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import ImageOptimizer from './ImageOptimizer';

interface TimelineEventProps {
    year?: string;
    title: string;
    description: string;
    image: string;
    index: number;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ title, description, image, index }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.15,
    });

    const isEven = index % 2 === 0;
    const mediaSrc = image.startsWith('http') || image.startsWith('/') ? image : `/storage/${image}`;

    return (
        <motion.div
            ref={ref}
            className={`flex flex-col items-center gap-8 md:gap-14 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
        >
            <div className="w-full md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#781C1D]/15 bg-black/5">
                    <ImageOptimizer
                        src={mediaSrc}
                        alt={title}
                        className="h-64 sm:h-80 md:h-96 w-full object-cover transition-transform duration-700 hover:scale-105"
                        videoProps={{
                            autoPlay: true,
                            playsInline: true,
                            loop: true,
                            muted: true,
                            controls: false,
                        }}
                    />
                </div>
            </div>

            <div className="w-full md:w-1/2">
                <h3 className="mb-4 font-serif text-2xl sm:text-3xl font-semibold text-[#781C1D] leading-snug">
                    {title}
                </h3>
                <p className="text-[#2C4040]/90 leading-relaxed text-sm sm:text-base font-sans whitespace-pre-line tracking-wide">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

export default TimelineEvent;
