import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    MessageCircle,
    Mail,
    Phone,
    Calendar,
    Users,
    Check,
    Sparkles,
    Clock,
    Send,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { RoomDetails } from './RoomBookingModal';

interface QuickReserveModalProps {
    room: RoomDetails | null;
    checkInDate: string;
    checkOutDate: string;
    guestCount: number;
    onClose: () => void;
}

const QuickReserveModal: React.FC<QuickReserveModalProps> = ({
    room,
    checkInDate,
    checkOutDate,
    guestCount,
    onClose,
}) => {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    const [guestName, setGuestName] = useState('');
    const [guestContact, setGuestContact] = useState('');
    const [specialNotes, setSpecialNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    if (!room) return null;

    const phone = '963930012015';

    const datesText =
        checkInDate && checkOutDate
            ? `${checkInDate} → ${checkOutDate}`
            : isAr
            ? 'حسب التوفر عند الطلب'
            : 'Flexible / On Request';

    const whatsappMessage = isAr
        ? `مرحباً كونسيرج خان وحود،\n\nأود حجز ${room.name}.\n\n• الجناح: ${room.name} (${room.tag})\n• التواريخ: ${datesText}\n• عدد النزلاء: ${guestCount}\n• السعر: عند الطلب\n\nيرجى تأكيد التوفر وتفاصيل الحجز. شكراً جزيلاً!`
        : `Hello Khan Wahoud Concierge,\n\nI would like to reserve the ${room.name}.\n\n• Accommodation: ${room.name} (${room.tag})\n• Dates: ${datesText}\n• Guests: ${guestCount}\n• Rate: On Request\n\nPlease confirm availability and reservation arrangements. Thank you!`;

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;

    const emailSubject = isAr
        ? `طلب حجز جناح: ${room.name} - خان وحود`
        : `Reservation Request: ${room.name} - Khan Wahoud`;

    const emailBody = isAr
        ? `مرحباً كونسيرج خان وحود،\n\nأود حجز ${room.name}.\n\nتفاصيل الإقامة:\n• الجناح: ${room.name} (${room.tag})\n• التواريخ: ${datesText}\n• عدد النزلاء: ${guestCount}\n• السعر: عند الطلب\n\nيرجى التواصل لتأكيد التوفر وترتيبات الإقامة.\n\nمع الشكر،`
        : `Dear Khan Wahoud Concierge,\n\nI would like to request a reservation for ${room.name}.\n\nStay Details:\n• Suite: ${room.name} (${room.tag})\n• Dates: ${datesText}\n• Number of Guests: ${guestCount}\n• Rate: On Request\n\nPlease contact me to confirm availability and arrangements.\n\nBest regards,`;

    const emailUrl = `mailto:info@khanwahoud.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!guestName || !guestContact) {
            toast.error(isAr ? 'يرجى إدخال الاسم ورقم التواصل أو البريد' : 'Please provide your name and contact details');
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            toast.success(
                isAr
                    ? 'تم استلام طلب الحجز بنجاح! سيتواصل معكم الكونسيرج خلال دقائق.'
                    : 'Reservation request received! Our concierge will contact you promptly.'
            );
        }, 600);
    };

    const coverImage = Array.isArray(room.images) && room.images.length > 0 ? room.images[0] : '/images/rooms.png';

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-[#140E0C]/85 backdrop-blur-md transition-opacity"
                />

                {/* Modal Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="relative w-full max-w-xl rounded-3xl bg-[#FFFFF5] text-[#1C1C1C] shadow-2xl border border-[#781C1D]/20 z-10 my-auto overflow-hidden"
                >
                    {/* Header Strip with Room Preview */}
                    <div className="relative h-36 sm:h-44 w-full bg-[#2A2422] overflow-hidden">
                        <img
                            src={coverImage}
                            alt={room.name}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/rooms.png';
                            }}
                            className="w-full h-full object-cover object-center brightness-[0.8] contrast-[1.05]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#140E0C] via-[#140E0C]/40 to-black/30" />

                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute top-3.5 right-3.5 rtl:right-auto rtl:left-3.5 w-9 h-9 rounded-full bg-black/60 hover:bg-[#781C1D] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm z-20 shadow-md"
                            aria-label="Close"
                        >
                            <X size={18} />
                        </button>

                        {/* Title & Tag in Banner */}
                        <div className="absolute bottom-3.5 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 text-white z-10">
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#781C1D]/90 text-white text-[10px] font-sans font-medium uppercase tracking-[0.14em] mb-1 border border-white/10">
                                {room.tag}
                            </span>
                            <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight text-white drop-shadow">
                                {isAr ? `حجز ${room.name}` : `Reserve ${room.name}`}
                            </h3>
                        </div>
                    </div>

                    {/* Modal Body */}
                    <div className="p-5 sm:p-7 space-y-5">
                        {/* Selected Details Pill */}
                        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-[#FAF7EE] border border-[#781C1D]/15 text-xs text-[#3D332E]">
                            <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-[#781C1D]" />
                                <span className="font-sans font-medium">{datesText}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users size={14} className="text-[#781C1D]" />
                                <span className="font-sans font-medium">
                                    {guestCount} {isAr ? 'نزلاء' : 'Guests'}
                                </span>
                            </div>
                            <div className="font-serif font-bold text-[#781C1D] text-sm">
                                {isAr ? 'عند الطلب' : 'On Request'}
                            </div>
                        </div>

                        {/* Direct Booking Channels Callout */}
                        <div>
                            <div className="flex items-center gap-1.5 mb-2.5">
                                <Sparkles size={15} className="text-[#781C1D]" />
                                <h4 className="font-serif text-sm sm:text-base font-bold text-[#1C1C1C]">
                                    {isAr
                                        ? 'اختر وسيلة الحجز المباشرة مع الكونسيرج:'
                                        : 'Choose Your Preferred Direct Reservation Channel:'}
                                </h4>
                            </div>
                            <p className="text-xs text-[#5C4F47] mb-4 leading-relaxed">
                                {isAr
                                    ? 'فريق الكونسيرج جاهز على مدار الساعة للرد الفوري وتأكيد توفر الجناح والترتيبات الخاصة.'
                                    : 'Our reservation concierge is available 24/7 to instantly confirm suite availability and arrange bespoke requests.'}
                            </p>

                            {/* WhatsApp & Email & Phone Action Buttons */}
                            <div className="space-y-3">
                                {/* WhatsApp Primary Button */}
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white shadow-lg hover:shadow-xl transition-all duration-200 group cursor-pointer hover:scale-[1.01]"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                                            <MessageCircle size={22} className="text-white" />
                                        </div>
                                        <div className="text-left rtl:text-right">
                                            <div className="font-sans font-bold text-sm tracking-wide uppercase">
                                                {isAr ? 'حجز فوري عبر واتساب' : 'Instant WhatsApp Booking'}
                                            </div>
                                            <div className="text-[11px] text-white/90 font-sans">
                                                {isAr ? '+963 930 012 015 • رد فوري' : '+963 930 012 015 • Instant Reply'}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 font-sans uppercase tracking-wider">
                                        {isAr ? 'فتح المحادثة' : 'Chat Now'}
                                    </span>
                                </a>

                                {/* Email Secondary Button */}
                                <a
                                    href={emailUrl}
                                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-white hover:bg-[#FAF7EE] text-[#1C1C1C] border-2 border-[#781C1D]/30 hover:border-[#781C1D] shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#781C1D]/10 text-[#781C1D] flex items-center justify-center flex-shrink-0 group-hover:bg-[#781C1D] group-hover:text-white transition-colors">
                                            <Mail size={20} />
                                        </div>
                                        <div className="text-left rtl:text-right">
                                            <div className="font-sans font-bold text-sm text-[#781C1D] tracking-wide uppercase">
                                                {isAr ? 'مراسلة عبر البريد الإلكتروني' : 'Reserve via Email'}
                                            </div>
                                            <div className="text-[11px] text-[#6B5E55] font-sans">
                                                info@khanwahoud.com
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#781C1D]/10 text-[#781C1D] font-sans uppercase tracking-wider">
                                        {isAr ? 'إرسال إيميل' : 'Send Email'}
                                    </span>
                                </a>

                                {/* Phone Call Button */}
                                <a
                                    href={`tel:+${phone}`}
                                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#140E0C] hover:bg-[#2A2422] text-[#FFFFF5] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center flex-shrink-0">
                                            <Phone size={17} />
                                        </div>
                                        <div className="text-left rtl:text-right">
                                            <div className="font-sans font-semibold text-xs tracking-wider uppercase text-white">
                                                {isAr ? 'اتصال هاتفي مباشر' : 'Direct Phone Call'}
                                            </div>
                                            <div className="text-[11px] text-[#E0D3C5]/80 font-sans">
                                                +963 930 012 015
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[11px] font-sans text-[#E0D3C5]/80">
                                        {isAr ? '٢٤/٧' : '24/7 Available'}
                                    </span>
                                </a>
                            </div>
                        </div>

                        {/* Quick In-Modal Message Form */}
                        <div className="pt-3 border-t border-[#781C1D]/15">
                            {submitted ? (
                                <div className="p-4 rounded-xl bg-[#FAF7EE] border border-[#781C1D]/20 text-center">
                                    <div className="w-8 h-8 rounded-full bg-[#781C1D] text-white flex items-center justify-center mx-auto mb-2">
                                        <Check size={16} />
                                    </div>
                                    <h5 className="font-serif font-bold text-sm text-[#781C1D]">
                                        {isAr ? 'تم استلام طلبكم بنجاح' : 'Inquiry Received'}
                                    </h5>
                                    <p className="text-xs text-[#5C4F47] mt-1">
                                        {isAr
                                            ? 'سيتواصل معكم الكونسيرج قريباً عبر الهاتف أو البريد.'
                                            : 'Our reservation concierge will reach out to you shortly.'}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="space-y-2.5">
                                    <span className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#6B5E55]">
                                        {isAr ? 'أو اترك تفاصيلك وسنتواصل معك فورا:' : 'Or leave your details for a callback:'}
                                    </span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            required
                                            value={guestName}
                                            onChange={(e) => setGuestName(e.target.value)}
                                            placeholder={isAr ? 'الاسم الكامل *' : 'Full Name *'}
                                            className="w-full px-3 py-2 rounded-xl border border-[#781C1D]/20 bg-white text-xs outline-none focus:border-[#781C1D]"
                                        />
                                        <input
                                            type="text"
                                            required
                                            value={guestContact}
                                            onChange={(e) => setGuestContact(e.target.value)}
                                            placeholder={isAr ? 'رقم الهاتف أو الإيميل *' : 'Phone or Email *'}
                                            className="w-full px-3 py-2 rounded-xl border border-[#781C1D]/20 bg-white text-xs outline-none focus:border-[#781C1D]"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-2.5 rounded-xl bg-[#781C1D] hover:bg-[#932526] text-white font-sans text-xs font-semibold tracking-wider uppercase transition-all shadow cursor-pointer disabled:opacity-60 flex items-center justify-center gap-1.5"
                                    >
                                        <Send size={13} />
                                        <span>{isSubmitting ? (isAr ? 'جاري الإرسال...' : 'Sending...') : (isAr ? 'إرسال طلب الحجز' : 'Send Inquiry')}</span>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default QuickReserveModal;
