import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface TimelineEvent {
    year: number;
    title: string;
    description: string;
}

const timelineEvents: TimelineEvent[] = [
    {
        year: 1736,
        title: 'original_construction',
        description: 'khan_desc',
    },
    {
        year: 1850,
        title: 'golden_age',
        description: 'peak_desc',
    },
    {
        year: 1918,
        title: 'historical_transition',
        description: 'end_desc',
    },
    {
        year: 2020,
        title: 'restoration_begins',
        description: 'major_desc',
    },
    {
        year: 2026,
        title: 'modern_rebirth',
        description: 'reopening_desc',
    },
];

const YearAnimation: React.FC = () => {
    const [currentYear, setCurrentYear] = useState(1736);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            const animationDuration = 22500; // 7.5 seconds total (slower, legible pace)
            const totalYears = timelineEvents[timelineEvents.length - 1].year - timelineEvents[0].year;
            const yearInterval = animationDuration / totalYears;

            let startTime: number;
            let animationFrame: number;

            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;

                const currentYearInAnimation = Math.min(
                    timelineEvents[0].year + progress / yearInterval,
                    timelineEvents[timelineEvents.length - 1].year,
                );

                setCurrentYear(Math.floor(currentYearInAnimation));

                // Update current event index
                const newEventIndex = timelineEvents.findIndex(
                    (event, index) =>
                        currentYearInAnimation >= event.year &&
                        (!timelineEvents[index + 1] || currentYearInAnimation < timelineEvents[index + 1].year),
                );

                if (newEventIndex !== -1 && newEventIndex !== currentEventIndex) {
                    setCurrentEventIndex(newEventIndex);
                }

                if (currentYearInAnimation < timelineEvents[timelineEvents.length - 1].year) {
                    animationFrame = requestAnimationFrame(animate);
                }
            };

            animationFrame = requestAnimationFrame(animate);

            return () => {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
            };
        }
    }, [inView]);

    return (
        <div ref={ref} className="relative mx-auto max-w-4xl">
            <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <div className="text-secondary-300 font-serif text-8xl font-bold md:text-9xl">{format(new Date(currentYear, 0), 'yyyy')}</div>

                <motion.div
                    key={currentEventIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8"
                >
                    <h3 className="mb-2 font-serif text-2xl">{t(timelineEvents[currentEventIndex].title)}</h3>
                    <p className="text-secondary-300/80">{t(timelineEvents[currentEventIndex].description)}</p>
                </motion.div>

                <div className="bg-accent-800 relative mt-8 h-2 overflow-hidden rounded-full">
                    <motion.div
                        className="bg-primary-700 absolute top-0 left-0 h-full"
                        initial={{ width: '0%' }}
                        animate={{
                            width: `${((currentYear - 1736) / (2026 - 1736)) * 100}%`,
                        }}
                        transition={{ duration: 0.1 }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default YearAnimation;
