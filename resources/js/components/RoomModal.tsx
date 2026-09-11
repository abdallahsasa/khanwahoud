import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Users,
    Maximize2,
    Calendar,
    Coffee,
    Wifi,
    Bath,
    Tv,
    Check,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import Button from "./Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../utils/axios";

const bookingSchema = z.object({
    room_id: z.string().or(z.number()),
    guest_name: z.string().min(2, "Name must be at least 2 characters"),
    guest_email: z.string().email("Invalid email address"),
    check_in: z.date().min(new Date(), "Check-in date must be in the future"),
    check_out: z
        .date()
        .min(new Date(), "Check-out date must be after check-in"),
    notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface RoomModalProps {
    room: {
        id: string;
        name: string;
        description: string;
        amenities: string[];
        price: number;
        images: string[];
        category: string;
        maxOccupancy: number;
        size: number;
    };
    onClose: () => void;
}

const RoomModal: React.FC<RoomModalProps> = ({ room, onClose }) => {
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            room_id: room.id,
        },
    });

    const amenityIcons: Record<string, React.ReactNode> = {
        "King bed": <Bath size={20} />,
        "Queen bed": <Bath size={20} />,
        "Private courtyard": <Maximize2 size={20} />,
        "Ottoman-style bath": <Bath size={20} />,
        "Luxury linens": <Calendar size={20} />,
        "Evening tea service": <Coffee size={20} />,
        "Modern bathroom": <Bath size={20} />,
        "Work desk": <Tv size={20} />,
        WiFi: <Wifi size={20} />,
    };

    const onSubmit = async (data: BookingFormData) => {
        try {
            setIsSubmitting(true);
            const response = await api.post("/book", data);

            if (response.status === 201) {
                toast.success(
                    t("room_modal.booking_success")
                );
                onClose();
            }
        } catch (error) {
            toast.error(t("room_modal.booking_failed"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                    onClick={onClose}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 end-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-accent-50 transition-colors"
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Image Gallery */}
                        <div className="relative">
                            <div className="sticky top-0">
                                {room.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`${room.name} - View ${index + 1}`}
                                        className="w-full h-[400px] object-cover"
                                        loading={index === 0 ? "eager" : "lazy"}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Room Details & Booking Form */}
                        <div className="p-8">
                            <div className="mb-6">
                                <span className="text-sm text-primary-700 font-semibold uppercase tracking-wider">
                                    {room.category}
                                </span>
                                <h2 className="text-3xl font-serif font-bold mt-2">
                                    {room.name}
                                </h2>
                            </div>

                            <div className="flex items-center gap-6 mb-6">
                                <div className="flex items-center">
                                    <Maximize2
                                        size={20}
                                        className="text-accent-500 me-2"
                                    />
                                    <span>{room.size}m²</span>
                                </div>
                                <div className="flex items-center">
                                    <Users
                                        size={20}
                                        className="text-accent-500 me-2"
                                    />
                                    <span>
                                        {t("room_modal.up_to_guests", { count: room.maxOccupancy })}
                                    </span>
                                </div>
                            </div>

                            <div className="prose prose-accent mb-8">
                                <p className="text-accent-700 leading-relaxed">
                                    {room.description}
                                </p>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-4">
                                    {t("room_modal.amenities_title")}
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {room.amenities.map((amenity, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center"
                                        >
                                            <span className="w-8 h-8 rounded-full bg-accent-50 flex items-center justify-center me-3">
                                                {amenityIcons[amenity] || (
                                                    <Check size={20} />
                                                )}
                                            </span>
                                            <span className="text-accent-700">
                                                {amenity}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Booking Form */}
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-accent-700 mb-1">
                                        {t("room_modal.full_name")}
                                    </label>
                                    <input
                                        type="text"
                                        {...register("guest_name")}
                                        className="w-full px-4 py-2 border border-accent-300 rounded-md focus:ring-2 focus:ring-primary-700 focus:border-primary-700"
                                    />
                                    {errors.guest_name && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.guest_name.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-accent-700 mb-1">
                                        {t("room_modal.email")}
                                    </label>
                                    <input
                                        type="email"
                                        {...register("guest_email")}
                                        className="w-full px-4 py-2 border border-accent-300 rounded-md focus:ring-2 focus:ring-primary-700 focus:border-primary-700"
                                    />
                                    {errors.guest_email && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.guest_email.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-accent-700 mb-1">
                                            {t("room_modal.check_in")}
                                        </label>
                                        <DatePicker
                                            selected={checkIn}
                                            onChange={(date) => {
                                                setCheckIn(date);
                                                setValue(
                                                    "check_in",
                                                    date as Date
                                                );
                                            }}
                                            minDate={new Date()}
                                            className="w-full px-4 py-2 border border-accent-300 rounded-md focus:ring-2 focus:ring-primary-700 focus:border-primary-700"
                                        />
                                        {errors.check_in && (
                                            <p className="text-red-600 text-sm mt-1">
                                                {errors.check_in.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-accent-700 mb-1">
                                            {t("room_modal.check_out")}
                                        </label>
                                        <DatePicker
                                            selected={checkOut}
                                            onChange={(date) => {
                                                setCheckOut(date);
                                                setValue(
                                                    "check_out",
                                                    date as Date
                                                );
                                            }}
                                            minDate={checkIn || new Date()}
                                            className="w-full px-4 py-2 border border-accent-300 rounded-md focus:ring-2 focus:ring-primary-700 focus:border-primary-700"
                                        />
                                        {errors.check_out && (
                                            <p className="text-red-600 text-sm mt-1">
                                                {errors.check_out.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-accent-700 mb-1">
                                        {t("room_modal.special_requests")}
                                    </label>
                                    <textarea
                                        {...register("notes")}
                                        rows={3}
                                        className="w-full px-4 py-2 border border-accent-300 rounded-md focus:ring-2 focus:ring-primary-700 focus:border-primary-700"
                                    ></textarea>
                                </div>

                                <div className="border-t border-accent-200 pt-6">
                                    <div className="flex items-baseline justify-between mb-6">
                                        <div>
                                            <span className="text-3xl font-bold text-primary-700">
                                                ${room.price}
                                            </span>
                                            <span className="text-accent-500 ms-2">
                                                {t("room_modal.per_night")}
                                            </span>
                                        </div>
                                        <div className="text-sm text-accent-500">
                                            {t("room_modal.taxes_included")}
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-full"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? t("room_modal.processing")
                                            : t("room_modal.book_now")}
                                    </Button>

                                    <p className="text-sm text-accent-500 mt-4 text-center">
                                        {t("room_modal.cancellation_note")}
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default RoomModal;
