import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import ImageOptimizer from './ImageOptimizer';

interface TimelineEventProps {
    year: string;
    title: string;
    description: string;
    image: string;
    index: number;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ year, title, description, image, index }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            className={`flex flex-col items-center gap-8 md:flex-row md:gap-16 ${isEven ? '' : 'md:flex-row-reverse'}`}
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
            transition={{ duration: 0.8 }}
        >
            <div className="w-full md:w-1/2">
                <div className="relative">
                    <ImageOptimizer
                        src={`/storage/${image}`}
                        alt={title}
                        className="h-64 w-full rounded-lg object-cover shadow-lg md:h-96"
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
                <h3 className="mb-4 font-serif text-2xl font-semibold">{title}</h3>
                <p className="text-accent-700 leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
};

export default TimelineEvent;
