import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import {
    Calendar as CalendarIcon,
    Users,
    BedDouble,
    Maximize2,
    Eye,
    Check,
    MessageCircle,
    Phone,
    Coffee,
    Compass,
    Sparkles,
    Shield,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
    Camera,
    Shuffle,
} from 'lucide-react';
import RoomBookingModal, { RoomDetails } from '../components/RoomBookingModal';

interface RoomsPageProps {
    dbRooms?: Array<{
        id: number | string;
        name: string;
        name_ar?: string;
        description?: string;
        description_ar?: string;
        price: number | string;
        category?: string;
        category_ar?: string;
        size?: number | string;
        max_occupancy?: number | string;
        amenities?: string[] | string;
        amenities_ar?: string[] | string;
        images?: string[] | string;
        formatted_images?: string[];
    }>;
}

const RoomsPage: React.FC<RoomsPageProps> = ({ dbRooms = [] }) => {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    // State for backend rooms with live API fallback
    const [roomsData, setRoomsData] = useState<any[]>(Array.isArray(dbRooms) && dbRooms.length > 0 ? dbRooms : []);

    useEffect(() => {
        if (!dbRooms || dbRooms.length === 0) {
            fetch('/api/rooms')
                .then((res) => res.json())
                .then((json) => {
                    const items = json?.data?.data || json?.data || json?.rooms || [];
                    if (Array.isArray(items) && items.length > 0) {
                        setRoomsData(items);
                    }
                })
                .catch((err) => console.error('Error fetching rooms from backend:', err));
        } else {
            setRoomsData(dbRooms);
        }
    }, [dbRooms]);

    // State for interactive booking bar
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [guestCount, setGuestCount] = useState<number>(2);
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
    const [activeModalRoom, setActiveModalRoom] = useState<RoomDetails | null>(null);

    // Gallery state per room: maps roomId -> array of images (for shuffle order)
    const [roomImagesMap, setRoomImagesMap] = useState<Record<string, string[]>>({});
    // Gallery state per room: maps roomId -> active image index
    const [roomActiveIdxMap, setRoomActiveIdxMap] = useState<Record<string, number>>({});

    const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [roomsListRef, roomsListInView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [inclusionsRef, inclusionsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const safeHighlights = (key: string, fallbacks: string[]): string[] => {
        try {
            const val = t(key, { returnObjects: true });
            if (Array.isArray(val) && val.length > 0) {
                return val.filter((item): item is string => typeof item === 'string');
            }
        } catch (e) { }
        return fallbacks;
    };

    // The 3 Curated Room Categories
    const roomCategories: RoomDetails[] = [
        {
            id: 'heritage',
            name: t('rooms.categories.heritage.name', isAr ? 'جناح التراث الملكي' : 'Heritage Grand Suite'),
            tag: t('rooms.categories.heritage.tag', isAr ? 'الجناح الرئاسي المميز' : 'Signature Master Suite'),
            description: t('rooms.categories.heritage.description', isAr ? 'إقامتنا الأكثر فخامة وعراقة، يتميز بأقواس حجرية أصلية من القرن الثامن عشر، وأسقف شاهقة الارتفاع، وأثاث دمشقي مصنوع يدوياً ومطعم بالصدف الطبيعي، مع حمام رخامي خاص على الطراز العثماني.' : 'Our most prestigious accommodation featuring restored 18th-century stone arches, soaring ceilings, handcrafted Damascene mother-of-pearl furnishings, and an authentic Ottoman-style private bath.'),
            size: t('rooms.categories.heritage.size', isAr ? '٦٥ م²' : '65 m²'),
            bed: t('rooms.categories.heritage.bed', isAr ? 'سرير كينغ' : 'King Bed'),
            capacity: t('rooms.categories.heritage.capacity', isAr ? '٤ نزلاء' : '4 Guests'),
            view: t('rooms.categories.heritage.view', isAr ? 'إطلالة فناء' : 'Courtyard View'),
            starting_price: t('rooms.categories.heritage.starting_price', '$450'),
            images: [
                '/images/rooms.png',
                '/images/IMG_4466.JPEG',
                '/images/IMG_4460.JPEG',
                '/images/side hall.jpg',
            ],
            highlights: safeHighlights('rooms.categories.heritage.highlights', [
                isAr ? 'أقواس حجرية تاريخية مرممة تعود لعام ١٧٣٦' : 'Original 1736 Restored Stone Arches',
                isAr ? 'حمام رخامي خاص على الطراز العثماني الأصيل' : 'Authentic Ottoman-Style Marble Bath',
                isAr ? 'مفروشات دمشقية مطعمة بالصدف الطبيعي' : 'Bespoke Hand-Inlaid Syrian Furnishings',
                isAr ? 'خدمة نادل شخصي (بتلر) على مدار الساعة' : 'Dedicated 24/7 Butler Service',
                isAr ? 'طقس الشاي والزهورات الدمشقية المسائية' : 'Evening Damascene Herbal Tea Ritual',
                isAr ? 'إنترنت فائق السرعة مع تحكم مناخي ذكي' : 'High-Speed Fiber Wi-Fi & Smart Climate',
            ]),
        },
        {
            id: 'courtyard',
            name: t('rooms.categories.courtyard.name', isAr ? 'غرفة الفناء الدمشقي الفاخرة' : 'Courtyard Deluxe Room'),
            tag: t('rooms.categories.courtyard.tag', isAr ? 'إطلالة على النافورة والحديقة' : 'Fountain & Garden View'),
            description: t('rooms.categories.courtyard.description', isAr ? 'غرفة هادئة وساحرة تطل مباشرة على الفناء الداخلي التاريخي ونافورة الرخام المركزية، يغمرها ضوء الصباح الطبيعي وخرير الماء الهادئ مع تفاصيل خشبية تقليدية متقنة.' : 'Serene rooms overlooking the historic central courtyard and marble fountain, filled with natural morning light, gentle water sounds, and traditional Syrian woodwork.'),
            size: t('rooms.categories.courtyard.size', isAr ? '٤٢ م²' : '42 m²'),
            bed: t('rooms.categories.courtyard.bed', isAr ? 'سرير كوين' : 'Queen Bed'),
            capacity: t('rooms.categories.courtyard.capacity', isAr ? '٣ نزلاء' : '3 Guests'),
            view: t('rooms.categories.courtyard.view', isAr ? 'إطلالة نافورة' : 'Fountain View'),
            starting_price: t('rooms.categories.courtyard.starting_price', '$280'),
            images: [
                '/images/center.jpg',
                '/images/welcome_section.png',
                '/images/IMG_4654.JPEG',
                '/images/IMG_4465.JPEG',
            ],
            highlights: safeHighlights('rooms.categories.courtyard.highlights', [
                isAr ? 'نوافذ واسعة تطل مباشرة على الفناء المركزي' : 'Panoramic Windows to Central Courtyard',
                isAr ? 'أعمال خشبية دمشقية أصيلة ومصنوعة يدوياً' : 'Artisanal Damascene Woodwork Details',
                isAr ? 'دش مطري فاخر مع إكسسوارات نحاسية تقليدية' : 'Luxury Rain Shower & Brass Accents',
                isAr ? 'وجبة إفطار تراثية مشمولة في الفناء المفتوح' : 'Complimentary Courtyard Breakfast',
                isAr ? 'مستحضرات استحمام عضوية بخلاصة الوردة الدمشقية' : 'Bespoke Organic Damask Rose Amenities',
                isAr ? 'عزل صوتي متطور لضمان أقصى درجات الهدوء' : 'Quiet Acoustic Insulation',
            ]),
        },
        {
            id: 'panoramic',
            name: t('rooms.categories.panoramic.name', isAr ? 'جناح دمشق البانورامي' : 'Panoramic Damascus Suite'),
            tag: t('rooms.categories.panoramic.tag', isAr ? 'إطلالة على أفق المدينة القديمة' : 'Old City Skyline View'),
            description: t('rooms.categories.panoramic.description', isAr ? 'أجنحة علوية ذات إطلالات خلابة تشرف على الشارع المستقيم التاريخي وسوق مدحت باشا ومآذن وقباب مدينة دمشق القديمة العريقة.' : 'Elevated suites with private views gazing over the ancient Straight Street, Souk Midhat Pasha, and the minaret skyline of historic Damascus.'),
            size: t('rooms.categories.panoramic.size', isAr ? '٥٥ م²' : '55 m²'),
            bed: t('rooms.categories.panoramic.bed', isAr ? 'سرير كينغ' : 'King Bed'),
            capacity: t('rooms.categories.panoramic.capacity', isAr ? '٣ نزلاء' : '3 Guests'),
            view: t('rooms.categories.panoramic.view', isAr ? 'إطلالة الأفق' : 'Skyline View'),
            starting_price: t('rooms.categories.panoramic.starting_price', '$380'),
            images: [
                '/images/IMG_4643.JPEG',
                '/images/side hall high.jpg',
                '/images/IMG_4474.JPEG',
                '/images/mainbg.png',
            ],
            highlights: safeHighlights('rooms.categories.panoramic.highlights', [
                isAr ? 'إطلالة بانورامية ساحرة على مآذن وأفق دمشق القديمة' : 'Panoramic Views of the Old City Skyline',
                isAr ? 'شرفة خاصة ومجلس زجاجي ممتد' : 'Private Balcony / Extended Window Lounge',
                isAr ? 'حوض استحمام قائم ودش استحمام مطري واسع' : 'Freestanding Soaking Tub & Rain Shower',
                isAr ? 'مكتبة منتقاة من كتب الفن والعمارة التاريخية' : 'Curated Historical Art & Architecture Books',
                isAr ? 'ضيافة ترحيبية من الفواكه الشامية والحلويات الحرفية' : 'Fresh Seasonal Fruit & Baklava Welcome',
                isAr ? 'خدمة الإفطار الخاص داخل الجناح متاحة' : 'In-Suite Breakfast Service Available',
            ]),
        },
    ];

    // Process rooms from backend (roomsData or dbRooms) or fallback to curated categories
    const allRooms: RoomDetails[] = useMemo(() => {
        const sourceRooms = (roomsData && roomsData.length > 0) ? roomsData : dbRooms;
        if (sourceRooms && sourceRooms.length > 0) {
            return sourceRooms.map((r) => {
                const rawImgs = r.formatted_images && r.formatted_images.length > 0
                    ? r.formatted_images
                    : (Array.isArray(r.images) && r.images.length > 0 ? r.images : ['/images/rooms.png']);

                const roomName = (isAr && r.name_ar && r.name_ar.trim() !== '') ? r.name_ar : r.name;
                const roomDesc = (isAr && r.description_ar && r.description_ar.trim() !== '') ? r.description_ar : (r.description || '');
                const roomCat = (isAr && r.category_ar && r.category_ar.trim() !== '') ? r.category_ar : (r.category || 'Heritage');

                const chosenAmenities = (isAr && r.amenities_ar && (Array.isArray(r.amenities_ar) ? r.amenities_ar.length > 0 : String(r.amenities_ar).trim() !== ''))
                    ? r.amenities_ar
                    : r.amenities;

                let parsedAmenities: string[] = [];
                if (Array.isArray(chosenAmenities)) {
                    parsedAmenities = chosenAmenities;
                } else if (typeof chosenAmenities === 'string') {
                    try {
                        const d = JSON.parse(chosenAmenities);
                        parsedAmenities = Array.isArray(d) ? d : [chosenAmenities];
                    } catch {
                        parsedAmenities = chosenAmenities.split(',').map((s) => s.trim()).filter(Boolean);
                    }
                }
                if (parsedAmenities.length === 0) {
                    parsedAmenities = [
                        isAr ? 'إطلالة على الفناء التاريخي' : 'Courtyard View',
                        isAr ? 'حمام رخامي عثماني فاخر' : 'Ottoman Marble Bath',
                        isAr ? 'إنترنت عالي السرعة وإفطار شامي' : 'Free Wi-Fi & Heritage Breakfast',
                    ];
                }

                const priceNum = typeof r.price === 'number' ? r.price : parseFloat(String(r.price) || '350');
                const cat = r.category || 'Heritage';

                return {
                    id: String(r.id),
                    name: roomName,
                    tag: isAr ? (r.category_ar || `${cat} المميز`) : `${cat} Sanctuary`,
                    description: roomDesc,
                    size: r.size ? `${r.size} ${isAr ? 'م²' : 'm²'}` : (isAr ? '٥٠ م²' : '50 m²'),
                    bed: isAr ? (cat.toLowerCase().includes('court') ? 'سرير كوين' : 'سرير كينغ') : (cat.toLowerCase().includes('court') ? 'Queen Bed' : 'King Bed'),
                    capacity: r.max_occupancy ? `${r.max_occupancy} ${isAr ? 'نزلاء' : 'Guests'}` : `3 ${isAr ? 'نزلاء' : 'Guests'}`,
                    view: isAr ? (cat.toLowerCase().includes('pano') ? 'إطلالة الأفق' : 'إطلالة فناء') : (cat.toLowerCase().includes('pano') ? 'Skyline View' : 'Courtyard View'),
                    starting_price: `$${Math.round(priceNum)}`,
                    images: rawImgs,
                    highlights: parsedAmenities,
                };
            });
        }
        return roomCategories;
    }, [roomsData, dbRooms, isAr, roomCategories]);

    const filteredRooms = useMemo(() => {
        if (selectedCategoryFilter === 'all') {
            return allRooms;
        }
        return allRooms.filter((room) => {
            const cat = room.tag.toLowerCase();
            const filter = selectedCategoryFilter.toLowerCase();
            return room.id === selectedCategoryFilter || cat.includes(filter);
        });
    }, [allRooms, selectedCategoryFilter]);

    // Shuffle images for a specific room card
    const handleShuffleRoomImages = (roomId: string, currentImages: string[]) => {
        if (!currentImages || currentImages.length <= 1) {
            toast(isAr ? 'تحتوي هذه الغرفة على صورة واحدة' : 'Room currently has one image', { icon: 'ℹ️' });
            return;
        }
        const shuffled = [...currentImages];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        if (shuffled[0] === currentImages[0] && shuffled.length > 1) {
            shuffled.push(shuffled.shift()!);
        }
        setRoomImagesMap((prev) => ({ ...prev, [roomId]: shuffled }));
        setRoomActiveIdxMap((prev) => ({ ...prev, [roomId]: 0 }));
        toast.success(isAr ? 'تم تبديل صور المعرض عشوائياً' : 'Shuffled suite gallery', {
            duration: 1800,
            icon: '🔀',
        });
    };

    const handleCardPrevImage = (roomId: string, total: number) => {
        setRoomActiveIdxMap((prev) => {
            const curr = prev[roomId] || 0;
            return { ...prev, [roomId]: (curr - 1 + total) % total };
        });
    };

    const handleCardNextImage = (roomId: string, total: number) => {
        setRoomActiveIdxMap((prev) => {
            const curr = prev[roomId] || 0;
            return { ...prev, [roomId]: (curr + 1) % total };
        });
    };

    // Quick WhatsApp direct link
    const getGeneralWhatsAppUrl = () => {
        const phone = '963930012015';
        const msg = isAr
            ? 'مرحباً كونسيرج خان وحود، أود الاستفسار عن توفر الغرف والأجنحة لديكم.'
            : 'Hello Khan Wahoud Concierge, I would like to inquire about room and suite reservations.';
        return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    };

    return (
        <div className="bg-[#FFFFF5] min-h-screen text-[#1C1C1C]">
            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-24 pb-24 md:pt-48 md:pb-28 overflow-hidden">
                {/* Background Image with Dark Vignette */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/rooms_hero_bg.png"
                        alt="Khan Wahoud Luxury Heritage Suites"
                        className="h-full w-full object-cover object-center brightness-[0.85] contrast-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#140E0C]/75 via-[#140E0C]/50 to-[#140E0C]/85" />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6">
                    <motion.div
                        className="mx-auto max-w-4xl text-center text-white"
                        initial={{ opacity: 0, y: 24 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                        transition={{ duration: 0.8 }}
                    >


                        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FFFFF5] leading-[1.15] mb-6">

                            <span className="font-bold">{t('rooms.tagline_main', isAr ? 'إقامة استثنائية في خان وحود' : 'STAY AT KHAN WAHOUD')}</span>
                        </h1>

                        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#EDE5D8] max-w-3xl mx-auto font-sans tracking-wide opacity-90">
                            {t('rooms.intro', isAr ? 'بين الأسوار التاريخية لخان سليمان باشا العظم المشيدة عام ١٧٣٦، تمثل كل غرفة تحفة معمارية مرممة بعناية فائقة تجمع بين الحرفية الدمشقية والعثمانية الأصيلة وأعلى معايير الفخامة العصرية.' : 'Each room at Khan Wahoud tells its own story, blending Ottoman architectural elements with contemporary luxury. Choose your preferred sanctuary within our historic walls.')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Interactive Availability & Filter Bar */}
            <div className="relative z-20 -mt-10 sm:-mt-12 container mx-auto px-4 sm:px-6">
                <div className="max-w-5xl mx-auto rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-[#781C1D]/15 p-4 sm:p-6 transition-all">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-center">
                        {/* Check-In Date */}
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7EE] border border-[#781C1D]/10">
                            <CalendarIcon size={18} className="text-[#781C1D] flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <label className="block text-[10px] font-sans uppercase tracking-wider text-[#6B5E55]">
                                    {t('rooms.booking_bar.check_in', isAr ? 'تاريخ الوصول' : 'Check-In')}
                                </label>
                                <input
                                    type="date"
                                    value={checkInDate}
                                    onChange={(e) => setCheckInDate(e.target.value)}
                                    className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#1C1C1C] focus:outline-none cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Check-Out Date */}
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7EE] border border-[#781C1D]/10">
                            <CalendarIcon size={18} className="text-[#781C1D] flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <label className="block text-[10px] font-sans uppercase tracking-wider text-[#6B5E55]">
                                    {t('rooms.booking_bar.check_out', isAr ? 'تاريخ المغادرة' : 'Check-Out')}
                                </label>
                                <input
                                    type="date"
                                    value={checkOutDate}
                                    onChange={(e) => setCheckOutDate(e.target.value)}
                                    className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#1C1C1C] focus:outline-none cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Guests Selector */}
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7EE] border border-[#781C1D]/10">
                            <Users size={18} className="text-[#781C1D] flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <label className="block text-[10px] font-sans uppercase tracking-wider text-[#6B5E55]">
                                    {t('rooms.booking_bar.guests', isAr ? 'عدد النزلاء' : 'Guests')}
                                </label>
                                <select
                                    value={guestCount}
                                    onChange={(e) => setGuestCount(Number(e.target.value))}
                                    className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#1C1C1C] focus:outline-none cursor-pointer"
                                >
                                    <option value={1} className="text-black">1 Guest</option>
                                    <option value={2} className="text-black">2 Guests</option>
                                    <option value={3} className="text-black">3 Guests</option>
                                    <option value={4} className="text-black">4 Guests</option>
                                </select>
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7EE] border border-[#781C1D]/10">
                            <Compass size={18} className="text-[#781C1D] flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <label className="block text-[10px] font-sans uppercase tracking-wider text-[#6B5E55]">
                                    {t('rooms.booking_bar.room_type', isAr ? 'نوع الجناح' : 'Room Category')}
                                </label>
                                <select
                                    value={selectedCategoryFilter}
                                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                                    className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#1C1C1C] focus:outline-none cursor-pointer truncate"
                                >
                                    <option value="all" className="text-black">{t('rooms.booking_bar.all_categories', isAr ? 'جميع الأجنحة والغرف' : 'All Accommodations')}</option>
                                    {allRooms.map((r) => (
                                        <option key={r.id} value={r.id} className="text-black">{r.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* The 3 Curated Room Categories Showcase (1 Row) */}
            <section ref={roomsListRef} className="py-20 md:py-28 container mx-auto px-4 sm:px-6">
                <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">

                    <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] text-[#781C1D] leading-[1.15] mb-4">
                        <span className="italic font-normal lowercase">{isAr ? 'ملاذات تاريخية في ' : 'sanctuaries of '}</span>
                        <span className="font-bold">{isAr ? 'خان وحود' : 'KHAN WAHOUD'}</span>
                    </h2>
                    <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-[1.8] text-[#3D332E] font-sans font-medium uppercase tracking-[0.14em] rtl:normal-case rtl:font-sans rtl:tracking-normal">
                        {isAr
                            ? 'أجنحة وغرف مميزة تجسد روح الضيافة الشامية وفخامة العمارة العثمانية المشيدة عام ١٧٣٦'
                            : 'Distinguished accommodations crafted within the restored stone walls of 1736'}
                    </p>
                </div>

                {/* 3 Rooms in One Row Grid (lg:grid-cols-3) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-7xl mx-auto">
                    {filteredRooms.map((room, index) => {
                        const imgs = roomImagesMap[room.id] || room.images || [];
                        const activeIdx = roomActiveIdxMap[room.id] || 0;
                        const currentImg = imgs[activeIdx] || imgs[0] || '/images/rooms.png';
                        const totalImgs = imgs.length;

                        return (
                            <motion.div
                                key={room.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={roomsListInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.6, delay: index * 0.12 }}
                                className="rounded-3xl bg-white border border-[#781C1D]/15 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between h-full hover:-translate-y-1.5"
                            >
                                {/* Card Image Header with Interactive Gallery */}
                                <div className="relative h-64 sm:h-72 w-full overflow-hidden flex-shrink-0 bg-[#2A2422] group/card select-none">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={`${room.id}-${activeIdx}-${currentImg}`}
                                            src={currentImg}
                                            alt={`${room.name} - ${activeIdx + 1}`}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/images/rooms.png';
                                            }}
                                            initial={{ opacity: 0.65 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0.65 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-700 brightness-[1.03] contrast-[1.03]"
                                        />
                                    </AnimatePresence>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/25 pointer-events-none" />

                                    {/* Tag Badge */}
                                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-10 pointer-events-auto">
                                        <span className="px-3 py-1 rounded-full bg-[#781C1D]/90 backdrop-blur-md text-white text-[10px] font-sans font-medium uppercase tracking-[0.16em] shadow-md border border-white/10">
                                            {room.tag}
                                        </span>
                                    </div>

                                    {/* Gallery Controls Top-Right (Shuffle + Counter) */}
                                    <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10 flex items-center gap-1.5 pointer-events-auto">
                                        {totalImgs > 1 && (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleShuffleRoomImages(room.id, imgs);
                                                }}
                                                title={isAr ? 'تبديل عشوائي لترتيب الصور' : 'Shuffle photo order'}
                                                className="px-2.5 py-1 rounded-full bg-white/20 hover:bg-[#781C1D] text-white text-[10px] font-sans font-medium backdrop-blur-md border border-white/25 shadow-md flex items-center gap-1 transition-all duration-200 active:scale-95 cursor-pointer"
                                            >
                                                <Shuffle size={11} className="transition-transform group-hover:rotate-180" />
                                                <span>{isAr ? 'تبديل' : 'Shuffle'}</span>
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveModalRoom(room);
                                            }}
                                            title={isAr ? 'عرض تفاصيل ومعرض الجناح' : 'View suite details & gallery'}
                                            className="px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white/95 text-[10px] font-sans flex items-center gap-1 transition-colors cursor-pointer border border-white/15"
                                        >
                                            <Camera size={11} />
                                            <span>{totalImgs > 1 ? `${activeIdx + 1}/${totalImgs}` : `${totalImgs} ${isAr ? 'صور' : 'Photos'}`}</span>
                                        </button>
                                    </div>

                                    {/* Prev / Next Arrows */}
                                    {totalImgs > 1 && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCardPrevImage(room.id, totalImgs);
                                                }}
                                                aria-label="Previous photo"
                                                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-[#781C1D] text-white flex items-center justify-center opacity-90 md:opacity-0 group-hover/card:opacity-100 transition-all duration-200 backdrop-blur-sm z-10 cursor-pointer shadow-lg active:scale-90"
                                            >
                                                <ChevronLeft size={16} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCardNextImage(room.id, totalImgs);
                                                }}
                                                aria-label="Next photo"
                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-[#781C1D] text-white flex items-center justify-center opacity-90 md:opacity-0 group-hover/card:opacity-100 transition-all duration-200 backdrop-blur-sm z-10 cursor-pointer shadow-lg active:scale-90"
                                            >
                                                <ChevronRight size={16} />
                                            </button>
                                        </>
                                    )}

                                    {/* Dot Indicators */}
                                    {totalImgs > 1 && (
                                        <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center gap-1.5 z-10 pointer-events-auto">
                                            {imgs.slice(0, 6).map((_, dotIdx) => (
                                                <button
                                                    key={dotIdx}
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setRoomActiveIdxMap((prev) => ({ ...prev, [room.id]: dotIdx }));
                                                    }}
                                                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${dotIdx === activeIdx
                                                        ? 'w-5 bg-white shadow-md'
                                                        : 'w-1.5 bg-white/40 hover:bg-white/80'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Price Overlay on Image */}
                                    <div className="absolute bottom-3 left-4 right-4 text-white flex justify-between items-end z-10 pointer-events-none">
                                        <div>
                                            <span className="text-[10px] font-sans uppercase tracking-[0.16em] text-[#E0D3C5] block">
                                                {t('rooms.specs.from_rate', isAr ? 'ابتداءً من' : 'From')}
                                            </span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="font-serif text-2xl sm:text-3xl font-bold">
                                                    {room.starting_price}
                                                </span>
                                                <span className="text-xs text-[#E0D3C5] font-sans uppercase tracking-wider">
                                                    / {t('rooms.specs.night', isAr ? 'لليلة' : 'night')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white">
                                    <div>
                                        <h3 className="font-serif text-xl sm:text-2xl text-[#781C1D] font-bold mb-2 group-hover:text-[#932526] transition-colors">
                                            {room.name}
                                        </h3>

                                        <p className="font-body text-xs sm:text-[13px] leading-relaxed text-[#5C4F47] mb-4 line-clamp-2 normal-case">
                                            {room.description}
                                        </p>

                                        {/* Architectural Specs 2x2 Grid */}
                                        <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-xl bg-[#FAF7EE] border border-[#781C1D]/10 text-xs text-[#2A2422]">
                                            <div className="flex items-center gap-1.5 min-w-0">
                                                <Maximize2 size={13} className="text-[#781C1D] flex-shrink-0" />
                                                <span className="font-body text-[11px] font-semibold text-[#2A2422] truncate">{room.size}</span>
                                            </div>

                                            <div className="flex items-center gap-1.5 min-w-0">
                                                <BedDouble size={13} className="text-[#781C1D] flex-shrink-0" />
                                                <span className="font-body text-[11px] font-semibold text-[#2A2422] truncate">{room.bed}</span>
                                            </div>

                                            <div className="flex items-center gap-1.5 min-w-0">
                                                <Users size={13} className="text-[#781C1D] flex-shrink-0" />
                                                <span className="font-body text-[11px] font-semibold text-[#2A2422] truncate">{room.capacity}</span>
                                            </div>

                                            <div className="flex items-center gap-1.5 min-w-0">
                                                <Eye size={13} className="text-[#781C1D] flex-shrink-0" />
                                                <span className="font-body text-[11px] font-semibold text-[#2A2422] truncate">{room.view}</span>
                                            </div>
                                        </div>

                                        {/* Curated Highlights List */}
                                        <div className="space-y-1.5 mb-5">
                                            {Array.isArray(room.highlights) &&
                                                room.highlights.slice(0, 3).map((item, hIdx) => (
                                                    <div
                                                        key={hIdx}
                                                        className="flex items-center gap-2 text-xs text-[#3D332E]"
                                                    >
                                                        <div className="w-3.5 h-3.5 rounded-full bg-[#781C1D]/15 text-[#781C1D] flex items-center justify-center flex-shrink-0">
                                                            <Check size={9} strokeWidth={3} />
                                                        </div>
                                                        <span className="font-body text-xs text-[#3D332E] truncate normal-case">{item}</span>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-4 border-t border-[#781C1D]/15 flex flex-col gap-2">
                                        <button
                                            onClick={() => setActiveModalRoom(room)}
                                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#781C1D] hover:bg-[#932526] text-white font-sans text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                                        >
                                            <span>{t('rooms.specs.reserve_now', isAr ? 'حجز الجناح' : 'RESERVE SUITE')}</span>
                                            <ChevronRight size={14} className="rtl:rotate-180" />
                                        </button>

                                        <button
                                            onClick={() => setActiveModalRoom(room)}
                                            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#781C1D]/30 hover:border-[#781C1D] text-[#781C1D] hover:bg-[#781C1D]/5 font-sans text-xs font-semibold tracking-[0.12em] uppercase transition-all duration-300 cursor-pointer"
                                        >
                                            <span>{t('rooms.specs.explore_details', isAr ? 'استكشف التفاصيل' : 'EXPLORE DETAILS')}</span>
                                            <ArrowUpRight size={13} className="rtl:rotate-270" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Heritage Privileges & Inclusions Banner */}
            <section ref={inclusionsRef} className="bg-[#FAF7EE] py-20 md:py-24 border-y border-[#781C1D]/15">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#781C1D] font-semibold block mb-2">
                            {t('rooms.inclusions.title', isAr ? 'مزايا وتجارب استثنائية مشمولة مع كل إقامة' : 'Heritage Privileges Included With Every Stay')}
                        </span>
                        <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1C1C] font-bold mb-4">
                            {t('rooms.inclusions.subtitle', isAr ? 'نحيي كرم الضيافة في الخانات التاريخية بأسلوب راقٍ يليق بأرقى المعايير العالمية' : 'Honoring the ancient Caravanserai hospitality tradition with modern refinement')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        <div className="p-6 rounded-2xl bg-white shadow-md border border-[#781C1D]/10">
                            <div className="w-12 h-12 rounded-xl bg-[#781C1D]/10 text-[#781C1D] flex items-center justify-center mb-4">
                                <Coffee size={24} />
                            </div>
                            <h3 className="font-serif text-lg font-bold text-[#1C1C1C] mb-2">
                                {t('rooms.inclusions.item1_title', isAr ? 'إفطار الفناء الدمشقي' : 'Courtyard Breakfast')}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#5C4F47] leading-relaxed">
                                {t('rooms.inclusions.item1_desc', isAr ? 'إفطار شامي طازج يُقدَّم يومياً تحت ظلال الأقواس التاريخية في الفناء المفتوح.' : 'Freshly prepared Damascene breakfast served daily in the sunlit open-air courtyard.')}
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white shadow-md border border-[#781C1D]/10">
                            <div className="w-12 h-12 rounded-xl bg-[#781C1D]/10 text-[#781C1D] flex items-center justify-center mb-4">
                                <Sparkles size={24} />
                            </div>
                            <h3 className="font-serif text-lg font-bold text-[#1C1C1C] mb-2">
                                {t('rooms.inclusions.item2_title', isAr ? 'خدمة الكونسيرج والبتلر' : 'Concierge & Butler')}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#5C4F47] leading-relaxed">
                                {t('rooms.inclusions.item2_desc', isAr ? 'فريق مخصص لترتيب جولات خاصة في دمشق القديمة وحجوزات النقل والمطاعم.' : 'Dedicated personal assistance for private Old Damascus tours, transport, and dining.')}
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white shadow-md border border-[#781C1D]/10">
                            <div className="w-12 h-12 rounded-xl bg-[#781C1D]/10 text-[#781C1D] flex items-center justify-center mb-4">
                                <Compass size={24} />
                            </div>
                            <h3 className="font-serif text-lg font-bold text-[#1C1C1C] mb-2">
                                {t('rooms.inclusions.item3_title', isAr ? 'طقس الشاي والحلويات التراثية' : 'Afternoon Tea Ritual')}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#5C4F47] leading-relaxed">
                                {t('rooms.inclusions.item3_desc', isAr ? 'شاي سوري أصيل ومشروبات عشبية عطرية مع تشكيلة من الحلويات الدمشقية الفاخرة.' : 'Traditional Syrian tea and aromatic infusions accompanied by artisanal Levantine pastries.')}
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white shadow-md border border-[#781C1D]/10">
                            <div className="w-12 h-12 rounded-xl bg-[#781C1D]/10 text-[#781C1D] flex items-center justify-center mb-4">
                                <Shield size={24} />
                            </div>
                            <h3 className="font-serif text-lg font-bold text-[#1C1C1C] mb-2">
                                {t('rooms.inclusions.item4_title', isAr ? 'أولوية دخول المعالم التاريخية' : 'Private Heritage Access')}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#5C4F47] leading-relaxed">
                                {t('rooms.inclusions.item4_desc', isAr ? 'دخول حصري لأروقة الخان المرممة والمعارض الفنية الخاصة وصالات الاسترخاء الهادئة.' : 'Exclusive resident access to the restored arches, historical galleries, and peaceful lounges.')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Direct Concierge Contact Strip */}
            <section className="bg-gradient-to-r from-[#241A18] via-[#1A1210] to-[#241A18] text-white py-16">
                <div className="container mx-auto px-4 sm:px-6 text-center max-w-3xl">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#E0D3C5] font-sans block mb-3">
                        {isAr ? 'خدمة الضيافة الخاصة' : 'Bespoke Hospitality Service'}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#FFFFF5]">
                        {isAr
                            ? 'هل تحتاج إلى ترتيبات حجز خاصة أو إقامة عائلية مخصصة؟'
                            : 'Require Custom Arrangements or Private Caravanserai Buyout?'}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#E0D3C5]/80 mb-8 leading-relaxed max-w-xl mx-auto">
                        {isAr
                            ? 'فريق الكونسيرج متاح على مدار الساعة للمساعدة في ترتيبات الحجز المسبق، النقل الخاص، وتجارب الإقامة الحصرية.'
                            : 'Our senior reservation concierge is available 24/7 to assist with private requests, airport chauffeur arrangements, and bespoke itineraries.'}
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <a
                            href={getGeneralWhatsAppUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
                        >
                            <MessageCircle size={18} />
                            <span>{t('rooms.modal.whatsapp_action', isAr ? 'حجز فوري عبر واتساب' : 'Instant WhatsApp Booking')}</span>
                        </a>

                        <a
                            href="tel:+963930012015"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-white/30 hover:border-white text-white font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all hover:bg-white/10"
                        >
                            <Phone size={16} />
                            <span>{t('rooms.modal.call_action', isAr ? 'اتصال مباشر بالكونسيرج' : 'Call Hotel Concierge')}</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Room Booking & Details Modal */}
            <RoomBookingModal
                room={activeModalRoom}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                guestCount={guestCount}
                onClose={() => setActiveModalRoom(null)}
            />
        </div>
    );
};

export default RoomsPage;
