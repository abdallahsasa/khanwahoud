import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Button from './Button';
import ImageOptimizer from './ImageOptimizer';

type Event = {
    id: string;
    title: string;
    description: string;
    images: string[];
    features: string[];
};

type Props = {
    index: number;
    event: Event;
};

export default function Event({ index, event }: Props) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div ref={ref} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
            <motion.div
                className="lg:w-1/2"
                initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -50 : 50,
                }}
                animate={
                    inView
                        ? {
                              opacity: 1,
                              x: 0,
                          }
                        : {
                              opacity: 0,
                              x: index % 2 === 0 ? -50 : 50,
                          }
                }
                transition={{
                    duration: 0.8,
                }}
            >
                <div className="overflow-hidden rounded-lg shadow-lg">
                    <ImageOptimizer
                        src={'/storage/' + (event.images[0] ?? '')}
                        alt={event.title}
                        className="h-80 w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                </div>
            </motion.div>

            <motion.div
                className="lg:w-1/2"
                initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? 50 : -50,
                }}
                animate={
                    inView
                        ? {
                              opacity: 1,
                              x: 0,
                          }
                        : {
                              opacity: 0,
                              x: index % 2 === 0 ? 50 : -50,
                          }
                }
                transition={{
                    duration: 0.8,
                    delay: 0.2,
                }}
            >
                <h3 className="mb-4 font-serif text-2xl font-semibold">{event.title}</h3>
                <p className="text-accent-700 mb-6">{event.description}</p>

                <h4 className="mb-3 font-semibold">Features:</h4>
                <ul className="mb-6 space-y-2">
                    {event.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                            <Check size={18} className="text-primary-700 mt-1 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                <Link href={'contact'}>
                    <Button variant="primary" className="cursor-pointer">
                        Inquire About This Space
                    </Button>
                </Link>
            </motion.div>
        </div>
    );
}
