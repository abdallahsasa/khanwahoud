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
        <div ref={ref} className="relative mx-auto max-w-4xl px-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <div
                    className="text-white font-serif kw-year-number text-7xl sm:text-8xl md:text-9xl font-normal drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] tracking-wide"
                    dir="ltr"
                >
                    {format(new Date(currentYear, 0), 'yyyy')}
                </div>

                <motion.div
                    key={currentEventIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 sm:mt-5 max-w-2xl mx-auto"
                >
                    <h3 className="font-serif text-base sm:text-lg md:text-xl font-normal uppercase tracking-[0.2em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                        &ldquo;{t(timelineEvents[currentEventIndex].title)}&rdquo;
                    </h3>
                    <p className="font-serif text-xs sm:text-sm md:text-base font-normal uppercase tracking-[0.14em] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] mt-1.5 leading-relaxed">
                        &ldquo;{t(timelineEvents[currentEventIndex].description)}&rdquo;
                    </p>
                </motion.div>

                {/* Refined Burgundy Timeline Bar matching mockup */}
                <div className="mx-auto mt-6 sm:mt-7 w-full max-w-sm sm:max-w-md md:max-w-lg">
                    <div className="relative h-[8px] sm:h-[8px] rounded-full overflow-hidden bg-[#450010]/80 border border-[#771709]/50 shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                        <motion.div
                            className="bg-[#8A2424] absolute top-0 left-0 h-full rounded-full shadow-[0_0_10px_rgba(158,43,33,0.9)]"
                            initial={{ width: '0%' }}
                            animate={{
                                width: `${((currentYear - 1736) / (2026 - 1736)) * 100}%`,
                            }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default YearAnimation;

