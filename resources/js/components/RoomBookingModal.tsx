import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Maximize2,
    Users,
    BedDouble,
    Eye,
    Check,
    MessageCircle,
    Phone,
    Calendar,
    Sparkles,
    ShieldCheck,
    Send,
    ChevronLeft,
    ChevronRight,
    Shuffle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

export interface RoomDetails {
    id: string;
    name: string;
    tag: string;
    description: string;
    size: string;
    bed: string;
    capacity: string;
    view: string;
    starting_price: string;
    images: string[];
    highlights: string[];
}

interface RoomBookingModalProps {
    room: RoomDetails | null;
    checkInDate: string;
    checkOutDate: string;
    guestCount: number;
    onClose: () => void;
}

const RoomBookingModal: React.FC<RoomBookingModalProps> = ({
    room,
    checkInDate,
    checkOutDate,
    guestCount,
    onClose,
}) => {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    const [galleryImages, setGalleryImages] = useState<string[]>(
        room?.images && room.images.length > 0 ? room.images : ['/images/rooms.png']
    );
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [guestName, setGuestName] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [guestPhone, setGuestPhone] = useState('');
    const [specialRequests, setSpecialRequests] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    React.useEffect(() => {
        if (room?.images && room.images.length > 0) {
            setGalleryImages(room.images);
            setActiveImageIndex(0);
        }
        setSubmitted(false);
    }, [room?.id]);

    if (!room) return null;

    const images = galleryImages;

    const handleNextImage = () => {
        setActiveImageIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrevImage = () => {
        setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleShuffleGallery = () => {
        if (images.length <= 1) {
            toast(isAr ? 'تحتوي هذه الغرفة على صورة واحدة' : 'Room currently has one image', { icon: 'ℹ️' });
            return;
        }
        const shuffled = [...images];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        if (shuffled[0] === images[0] && shuffled.length > 1) {
            shuffled.push(shuffled.shift()!);
        }
        setGalleryImages(shuffled);
        setActiveImageIndex(0);
        toast.success(isAr ? 'تم تبديل صور المعرض عشوائياً' : 'Suite gallery shuffled', {
            duration: 1800,
            icon: '🔀',
        });
    };

    // Generate WhatsApp direct reservation URL with pre-filled message
    const buildWhatsAppUrl = () => {
        const phone = '963930012015';
        const datesText = checkInDate && checkOutDate 
            ? `${checkInDate} to ${checkOutDate}` 
            : 'dates to be confirmed';
        
        const messageEn = `Hello Khan Wahoud Concierge,\n\nI would like to inquire about reserving the ${room.name}.\n\n• Room: ${room.name} (${room.tag})\n• Dates: ${datesText}\n• Guests: ${guestCount}\n• Rate: ${room.starting_price} / night\n\nPlease confirm availability and details. Thank you!`;
        
        const messageAr = `مرحباً كونسيرج خان وحود،\n\nأود الاستفسار عن حجز ${room.name}.\n\n• الجناح: ${room.name}\n• التواريخ: ${datesText}\n• عدد النزلاء: ${guestCount}\n• السعر المبدئي: ${room.starting_price} / ليلة\n\nيرجى تأكيد التوفر والتفاصيل. شكراً جزيلاً!`;

        const text = isAr ? messageAr : messageEn;
        return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    };

    const handleInquirySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!guestName || !guestEmail) {
            toast.error(isAr ? 'يرجى إدخال الاسم والبريد الإلكتروني' : 'Please enter your name and email');
            return;
        }

        setIsSubmitting(true);
        // Simulate immediate concierge transmission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            toast.success(
                isAr
                    ? 'تم استلام طلب الحجز بنجاح! سيتواصل معكم الكونسيرج خلال دقائق.'
                    : 'Reservation inquiry received! Our concierge will contact you shortly.'
            );
        }, 800);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-[#140E0C]/80 backdrop-blur-md transition-opacity"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#FFFFF5] text-[#1C1C1C] shadow-2xl border border-[#781C1D]/20 z-10 my-auto"
                >
                    {/* Floating Controls (Close Button & Gallery Shuffle) */}
                    <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 flex items-center gap-2">
                        {images.length > 1 && (
                            <button
                                type="button"
                                onClick={handleShuffleGallery}
                                className="px-3 py-2 rounded-full bg-[#1C1C1C]/70 hover:bg-[#781C1D] text-white flex items-center gap-1.5 text-xs font-sans font-medium transition-all duration-300 shadow-lg backdrop-blur-sm cursor-pointer border border-white/10 active:scale-95"
                                title={isAr ? 'تبديل عشوائي لترتيب الصور' : 'Shuffle gallery images'}
                            >
                                <Shuffle size={14} />
                                <span>{isAr ? 'تبديل الصور' : 'Shuffle'}</span>
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-[#1C1C1C]/70 hover:bg-[#781C1D] text-white flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-sm cursor-pointer"
                            aria-label={t('rooms.modal.close')}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Photo Counter Top Left */}
                    {images.length > 1 && (
                        <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-20 pointer-events-none">
                            <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white/95 text-xs font-sans font-medium border border-white/15 shadow-md">
                                {activeImageIndex + 1} / {images.length}
                            </span>
                        </div>
                    )}

                    {/* Image Gallery Hero */}
                    <div className="relative w-full h-64 sm:h-80 md:h-96 bg-[#2A2422] overflow-hidden group">
                        <img
                            src={images[activeImageIndex]}
                            alt={room.name}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/rooms.png';
                            }}
                            className="w-full h-full object-cover object-center transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 via-transparent to-black/20" />

                        {/* Navigation Arrows (if multiple images) */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrevImage}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-[#781C1D] text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={handleNextImage}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-[#781C1D] text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </>
                        )}

                        {/* Room Badge & Title Overlay */}
                        <div className="absolute bottom-4 left-5 right-5 sm:bottom-6 sm:left-8 sm:right-8 text-white">
                            <span className="inline-block px-3 py-1 rounded-full bg-[#781C1D]/90 text-white text-[11px] font-sans font-medium uppercase tracking-[0.16em] mb-2 backdrop-blur-sm">
                                {room.tag}
                            </span>
                            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight drop-shadow-md">
                                {room.name}
                            </h2>
                        </div>
                    </div>

                    {/* Thumbnail Bar (if multiple images) */}
                    {images.length > 1 && (
                        <div className="flex gap-2 p-3 bg-[#F4F1E8] border-b border-[#781C1D]/10 overflow-x-auto">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                                        activeImageIndex === idx
                                            ? 'border-[#781C1D] scale-105 shadow-md'
                                            : 'border-transparent opacity-60 hover:opacity-100'
                                    }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Modal Content Body */}
                    <div className="p-5 sm:p-7 md:p-8 space-y-8">
                        {/* Specifications Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-xl bg-[#FAF7EE] border border-[#781C1D]/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#781C1D]/10 text-[#781C1D] flex items-center justify-center flex-shrink-0">
                                    <Maximize2 size={18} />
                                </div>
                                <div>
                                    <div className="text-[11px] font-sans uppercase tracking-wider text-[#6B5E55]">
                                        {t('rooms.specs.area')}
                                    </div>
                                    <div className="text-sm font-semibold text-[#1C1C1C]">
                                        {room.size}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#781C1D]/10 text-[#781C1D] flex items-center justify-center flex-shrink-0">
                                    <BedDouble size={18} />
                                </div>
                                <div>
                                    <div className="text-[11px] font-sans uppercase tracking-wider text-[#6B5E55]">
                                        {t('rooms.specs.bedding')}
                                    </div>
                                    <div className="text-sm font-semibold text-[#1C1C1C]">
                                        {room.bed}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#781C1D]/10 text-[#781C1D] flex items-center justify-center flex-shrink-0">
                                    <Users size={18} />
                                </div>
                                <div>
                                    <div className="text-[11px] font-sans uppercase tracking-wider text-[#6B5E55]">
                                        {t('rooms.specs.occupancy')}
                                    </div>
                                    <div className="text-sm font-semibold text-[#1C1C1C]">
                                        {room.capacity}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#781C1D]/10 text-[#781C1D] flex items-center justify-center flex-shrink-0">
                                    <Eye size={18} />
                                </div>
                                <div>
                                    <div className="text-[11px] font-sans uppercase tracking-wider text-[#6B5E55]">
                                        {t('rooms.specs.view')}
                                    </div>
                                    <div className="text-sm font-semibold text-[#1C1C1C] truncate">
                                        {room.view}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Room Description */}
                        <div>
                            <h3 className="font-serif text-lg font-bold text-[#781C1D] mb-2 uppercase tracking-wide">
                                {isAr ? 'عن هذا الجناح' : 'About This Suite'}
                            </h3>
                            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#3D332E]">
                                {room.description}
                            </p>
                        </div>

                        {/* Highlights & Amenities */}
                        <div>
                            <h3 className="font-serif text-lg font-bold text-[#781C1D] mb-4 uppercase tracking-wide">
                                {t('rooms.modal.amenities_tab')}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {Array.isArray(room.highlights) &&
                                    room.highlights.map((highlight, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#FAF7EE] border border-[#781C1D]/10 text-xs sm:text-sm text-[#2A2422]"
                                        >
                                            <div className="w-5 h-5 rounded-full bg-[#781C1D] text-white flex items-center justify-center flex-shrink-0">
                                                <Check size={12} strokeWidth={3} />
                                            </div>
                                            <span>{highlight}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Direct Concierge Reservation Options */}
                        <div className="pt-6 border-t border-[#781C1D]/15">
                            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#241A18] to-[#140E0C] text-white shadow-xl">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                                    <div>
                                        <span className="text-xs uppercase tracking-[0.18em] text-[#E0D3C5] font-sans">
                                            {t('rooms.specs.from_rate')}
                                        </span>
                                        <div className="flex items-baseline gap-2 mt-1">
                                            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFFF5]">
                                                {room.starting_price}
                                            </span>
                                            <span className="text-xs text-[#E0D3C5]/80 font-sans uppercase tracking-wider">
                                                {t('rooms.specs.night')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Dates Info Badge */}
                                    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
                                        <Calendar size={18} className="text-[#E0D3C5]" />
                                        <div className="text-xs">
                                            <div className="text-[#E0D3C5]/70 uppercase tracking-wider">
                                                {t('rooms.modal.checkin_out')}
                                            </div>
                                            <div className="font-medium text-white">
                                                {checkInDate && checkOutDate
                                                    ? `${checkInDate} → ${checkOutDate}`
                                                    : (isAr ? 'حسب التوفر عند الطلب' : 'Flexible Dates')}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h4 className="font-serif text-lg sm:text-xl font-bold mb-2 text-[#FFFFF5]">
                                    {t('rooms.modal.whatsapp_action')}
                                </h4>
                                <p className="text-xs sm:text-sm text-[#E0D3C5]/80 mb-5 leading-relaxed">
                                    {t('rooms.modal.whatsapp_desc')}
                                </p>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a
                                        href={buildWhatsAppUrl()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.01]"
                                    >
                                        <MessageCircle size={18} />
                                        <span>{t('rooms.modal.whatsapp_action')}</span>
                                    </a>

                                    <a
                                        href="tel:+963930012015"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 hover:border-white text-white font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-white/10"
                                    >
                                        <Phone size={16} />
                                        <span>{t('rooms.modal.call_action')}</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Optional Lightweight Direct Inquiry Form */}
                        <div className="pt-2">
                            {submitted ? (
                                <div className="p-6 rounded-xl bg-[#FAF7EE] border border-[#781C1D]/20 text-center">
                                    <div className="w-12 h-12 rounded-full bg-[#781C1D] text-white flex items-center justify-center mx-auto mb-3">
                                        <Check size={24} />
                                    </div>
                                    <h4 className="font-serif text-lg font-bold text-[#781C1D] mb-1">
                                        {isAr ? 'تم استلام طلبكم بنجاح' : 'Inquiry Sent Successfully'}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-[#4A3F39]">
                                        {isAr
                                            ? 'سيقوم فريق الكونسيرج بمراجعة التواريخ والتواصل معكم لتأكيد تفاصيل الإقامة.'
                                            : 'Our reservation concierge will review your dates and contact you promptly.'}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleInquirySubmit} className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Sparkles size={16} className="text-[#781C1D]" />
                                        <h4 className="font-serif text-base font-bold text-[#781C1D] uppercase tracking-wide">
                                            {isAr ? 'أو أرسل تفاصيل حجزك مباشرة' : 'Or Send Direct Reservation Inquiry'}
                                        </h4>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <div>
                                            <label className="block text-[11px] font-sans uppercase tracking-wider text-[#6B5E55] mb-1">
                                                {isAr ? 'الاسم الكامل *' : 'Full Name *'}
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={guestName}
                                                onChange={(e) => setGuestName(e.target.value)}
                                                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#781C1D]/20 bg-white focus:outline-none focus:border-[#781C1D]"
                                                placeholder={isAr ? 'مثال: عبد الله' : 'e.g. Abdullah'}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-sans uppercase tracking-wider text-[#6B5E55] mb-1">
                                                {isAr ? 'البريد الإلكتروني *' : 'Email Address *'}
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={guestEmail}
                                                onChange={(e) => setGuestEmail(e.target.value)}
                                                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#781C1D]/20 bg-white focus:outline-none focus:border-[#781C1D]"
                                                placeholder="guest@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-sans uppercase tracking-wider text-[#6B5E55] mb-1">
                                                {isAr ? 'رقم الهاتف' : 'Phone Number'}
                                            </label>
                                            <input
                                                type="tel"
                                                value={guestPhone}
                                                onChange={(e) => setGuestPhone(e.target.value)}
                                                className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#781C1D]/20 bg-white focus:outline-none focus:border-[#781C1D]"
                                                placeholder="+963..."
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-sans uppercase tracking-wider text-[#6B5E55] mb-1">
                                            {isAr ? 'ملاحظات أو متطلبات خاصة' : 'Special Requests or Preferences'}
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={specialRequests}
                                            onChange={(e) => setSpecialRequests(e.target.value)}
                                            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#781C1D]/20 bg-white focus:outline-none focus:border-[#781C1D]"
                                            placeholder={isAr ? 'ترتيبات النقل، وجبات خاصة، وقت الوصول...' : 'Airport transfer, arrival time, dietary requests...'}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-[#781C1D] text-[#781C1D] hover:bg-[#781C1D] hover:text-white font-sans text-xs tracking-[0.16em] uppercase font-semibold transition-all duration-300 cursor-pointer"
                                    >
                                        <Send size={14} />
                                        <span>{isSubmitting ? (isAr ? 'جارٍ الإرسال...' : 'Sending...') : (isAr ? 'إرسال طلب الحجز' : 'Submit Reservation Inquiry')}</span>
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Heritage Guarantee Note */}
                        <div className="flex items-center gap-2 text-xs text-[#725F42] pt-2 border-t border-[#781C1D]/10">
                            <ShieldCheck size={16} className="text-[#781C1D] flex-shrink-0" />
                            <span>{t('rooms.modal.rates_note')}</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default RoomBookingModal;
