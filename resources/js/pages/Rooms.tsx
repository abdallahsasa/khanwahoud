import { motion } from 'framer-motion';
import { Crown, Mountain, Trees as Tree, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import Button from '../components/Button';
import ImageOptimizer from '../components/ImageOptimizer';
import RoomModal from '../components/RoomModal';
import api from '../utils/axios';

interface Room {
    id: string;
    name: string;
    description: string;
    amenities: string[];
    price: number;
    images: string[]; // Changed to array of strings
    category: 'heritage' | 'courtyard' | 'panoramic' | 'garden';
    maxOccupancy: number;
    size: number; // in square meters
}

interface Category {
    id: 'heritage' | 'courtyard' | 'panoramic' | 'garden';
    name: string;
    description: string;
    icon: React.ReactNode;
}

const RoomsPage: React.FC = () => {
    const { t } = useTranslation();
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const [heroRef, heroInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [roomsRef, roomsInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const categories: Category[] = [
        {
            id: 'heritage',
            name: 'Heritage Suites',
            description: 'Our most prestigious accommodations featuring original Ottoman architecture',
            icon: <Crown className="h-6 w-6" />,
        },
        {
            id: 'courtyard',
            name: 'Courtyard Rooms',
            description: 'Traditional rooms overlooking our central courtyard',
            icon: <Tree className="h-6 w-6" />,
        },
        {
            id: 'panoramic',
            name: 'Panoramic Views',
            description: 'Rooms with stunning views of Old Damascus',
            icon: <Mountain className="h-6 w-6" />,
        },
        {
            id: 'garden',
            name: 'Garden Collection',
            description: 'Peaceful rooms adjacent to our private gardens',
            icon: <Users className="h-6 w-6" />,
        },
    ];

    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            try {
                let url = `/rooms?page=${currentPage}`;
                const response = await api.get(url);
                setRooms(
                    response.data.data.data.map((e: any) => ({
                        ...e,
                        amenities: JSON.parse(e.amenities),
                        images: JSON.parse(e.images),
                    })),
                );
                setTotalPages(Math.ceil(response.data.data.total / response.data.data.per_page));
            } catch (error) {
                console.error('Error fetching rooms:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [currentPage, activeCategory]);

    const handleRoomSelect = (roomId: string) => {
        setSelectedRoom(roomId === selectedRoom ? null : roomId);
    };

    const handleCategorySelect = (categoryId: string) => {
        setActiveCategory(categoryId === activeCategory ? null : categoryId);
        setCurrentPage(1); // Reset to first page when changing category
    };

    // Show all rooms if no category is selected
    const filteredRooms = activeCategory ? rooms.filter((room) => room.category === activeCategory) : rooms;

    const selectedRoomData = selectedRoom ? rooms.find((room) => room.id === selectedRoom) : null;

    return (
        <div>
            {/* Hero Banner */}
            <section ref={heroRef} className="relative pt-32 pb-20 md:pt-64 md:pb-24">
                <div className="absolute inset-0 z-0">
                    <img src={'/images/mainbg.png'} alt="Luxury Room" className="h-full w-full object-cover" />
                    <div className="bg-accent-950 absolute inset-0 opacity-50"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4">
                    <motion.div
                        className="mx-auto max-w-3xl text-center text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">{t('rooms.title')}</h1>
                        <p className="font-serif text-xl italic opacity-90 md:text-2xl">{t('rooms.subtitle')}</p>
                    </motion.div>
                </div>
            </section>

            {/* Categories Section */}
            {/* <section className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategorySelect(category.id)}
                                className={`rounded-lg p-6 text-left transition-all ${
                                    activeCategory === category.id ? 'bg-primary-700 text-white' : 'bg-accent-50 hover:bg-accent-100'
                                }`}
                            >
                                <div className="mb-3 flex items-center">
                                    {category.icon}
                                    <h3 className="ml-2 text-lg font-semibold text-[#d49256]">{category.name}</h3>
                                </div>
                                <p className="text-sm text-[#d49256] opacity-80">{category.description}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Coming Soon Section */}
            <section ref={roomsRef} className="bg-accent-50 py-32">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={roomsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-secondary-600 mb-6 font-serif text-5xl font-bold">Coming Soon</h2>
                        <p className="text-accent-700 mx-auto max-w-2xl text-xl">
                            We are currently preparing our luxurious rooms and accommodations to provide you with the finest Ottoman experience.
                            Please check back with us shortly.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Room Modal */}
            {selectedRoom && <RoomModal room={rooms.find((room) => room.id === selectedRoom)!} onClose={() => setSelectedRoom(null)} />}
        </div>
    );
};

export default RoomsPage;
