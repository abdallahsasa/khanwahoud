import { router } from '@inertiajs/react';
import {
    Calendar,
    Clock,
    Home,
    Image,
    LogOut,
    Users,
    X,
    Plus,
    Trash2,
    Upload,
    Camera,
    Loader2,
    CheckCircle2,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import Button from '../components/Button';
import api from '../utils/axios';

interface Booking {
    id: string;
    name: string;
    email: string;
    room: string;
    checkIn: string;
    checkOut: string;
    status: 'confirmed' | 'pending' | 'canceled';
}

interface Room {
    id: string | number;
    name: string;
    category?: string;
    description?: string;
    price: number | string;
    size?: number | string;
    max_occupancy?: number | string;
    amenities?: string[] | string;
    images?: string[] | string;
    formatted_images?: string[];
    status?: 'available' | 'occupied' | 'maintenance';
}

interface Member {
    id: string;
    name: string;
    email: string;
    tier: string;
    joinDate: string;
}

const AdminDashboard: React.FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('rooms');

    // Mock authentication check
    useEffect(() => {
        // Check if auth token exists in cookies
        const isAuthenticated = document.cookie.includes('adminToken=');
        if (!isAuthenticated) {
            router.visit('/admin');
        }
    }, []);

    // Bookings data
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get('/admin/bookings');
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    // Rooms data
    const [rooms, setRooms] = useState<Room[]>([]);
    const [isLoadingRooms, setIsLoadingRooms] = useState(false);

    const fetchRooms = async () => {
        setIsLoadingRooms(true);
        try {
            const response = await api.get('/rooms');
            if (response.data?.data?.data) {
                setRooms(response.data.data.data);
            } else if (Array.isArray(response.data?.data)) {
                setRooms(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching rooms:', error);
        } finally {
            setIsLoadingRooms(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    // Add Room Modal State
    const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
    const [newRoomName, setNewRoomName] = useState('');
    const [newRoomCategory, setNewRoomCategory] = useState('Heritage');
    const [newRoomPrice, setNewRoomPrice] = useState('');
    const [newRoomSize, setNewRoomSize] = useState('50');
    const [newRoomMaxOccupancy, setNewRoomMaxOccupancy] = useState('3');
    const [newRoomDescription, setNewRoomDescription] = useState('');
    const [newRoomAmenities, setNewRoomAmenities] = useState('Courtyard View, Ottoman Marble Bath, Grand King Bed, Free Wi-Fi');
    const [newRoomImageFiles, setNewRoomImageFiles] = useState<File[]>([]);
    const [newRoomImagePreviews, setNewRoomImagePreviews] = useState<string[]>([]);
    const [isSubmittingRoom, setIsSubmittingRoom] = useState(false);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const filesArray = Array.from(e.target.files);
        setNewRoomImageFiles((prev) => [...prev, ...filesArray]);

        const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
        setNewRoomImagePreviews((prev) => [...prev, ...newPreviews]);
    };

    const handleRemovePreview = (indexToRemove: number) => {
        setNewRoomImageFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
        setNewRoomImagePreviews((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    };

    const handleAddRoom = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newRoomName || !newRoomPrice || !newRoomDescription) {
            toast.error('Please fill in room name, price, and description.');
            return;
        }

        setIsSubmittingRoom(true);
        try {
            const formData = new FormData();
            formData.append('name', newRoomName);
            formData.append('category', newRoomCategory);
            formData.append('price', newRoomPrice);
            formData.append('size', newRoomSize);
            formData.append('max_occupancy', newRoomMaxOccupancy);
            formData.append('description', newRoomDescription);
            formData.append('amenities', newRoomAmenities);

            if (newRoomImageFiles.length > 0) {
                newRoomImageFiles.forEach((file) => {
                    formData.append('images[]', file);
                });
            }

            await api.post('/rooms/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Room added successfully with images!');
            setIsAddRoomModalOpen(false);
            // Reset form
            setNewRoomName('');
            setNewRoomPrice('');
            setNewRoomDescription('');
            setNewRoomImageFiles([]);
            setNewRoomImagePreviews([]);
            // Refresh list
            fetchRooms();
        } catch (error: any) {
            console.error('Error creating room:', error);
            const msg = error.response?.data?.message || 'Failed to create room. Please try again.';
            toast.error(msg);
        } finally {
            setIsSubmittingRoom(false);
        }
    };

    const handleDeleteRoom = async (roomId: string | number, roomName: string) => {
        if (!window.confirm(`Are you sure you want to delete "${roomName}"?`)) {
            return;
        }

        try {
            await api.delete(`/rooms/${roomId}`);
            toast.success(`"${roomName}" deleted successfully.`);
            fetchRooms();
        } catch (error) {
            console.error('Error deleting room:', error);
            toast.error('Failed to delete room.');
        }
    };

    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await api.get('admin/members');
                setMembers(response.data.data.data);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, []);

    return (
        <div className="bg-accent-50 min-h-screen pt-20 pb-16">
            <div className="container mx-auto mt-8 px-4">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="font-serif text-3xl font-bold">{t('admin.dashboard_title')}</h1>
                    <div className="flex items-center">
                        <Clock size={18} className="text-accent-500 mr-2" />
                        <span className="text-accent-500 mr-4">{new Date().toLocaleDateString()}</span>
                        <Button variant="outline" size="sm" onClick={() => router.visit('/admin')}>
                            <LogOut size={16} className="mr-1" />
                            {t('admin.logout')}
                        </Button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-accent-200 overflow-x-auto rounded-t-lg border-b bg-white">
                    <div className="flex">
                        <button
                            className={`px-6 py-3 text-sm font-medium ${
                                activeTab === 'bookings'
                                    ? 'text-primary-700 border-primary-700 border-b-2'
                                    : 'text-accent-600 hover:text-accent-900 border-b-2 border-transparent'
                            }`}
                            onClick={() => setActiveTab('bookings')}
                        >
                            <Calendar size={16} className="mr-2 inline" />
                            {t('admin.tab_bookings')}
                        </button>
                        <button
                            className={`px-6 py-3 text-sm font-medium ${
                                activeTab === 'rooms'
                                    ? 'text-primary-700 border-primary-700 border-b-2'
                                    : 'text-accent-600 hover:text-accent-900 border-b-2 border-transparent'
                            }`}
                            onClick={() => setActiveTab('rooms')}
                        >
                            <Home size={16} className="mr-2 inline" />
                            {t('admin.tab_rooms')}
                        </button>
                        <button
                            className={`px-6 py-3 text-sm font-medium ${
                                activeTab === 'members'
                                    ? 'text-primary-700 border-primary-700 border-b-2'
                                    : 'text-accent-600 hover:text-accent-900 border-b-2 border-transparent'
                            }`}
                            onClick={() => setActiveTab('members')}
                        >
                            <Users size={16} className="mr-2 inline" />
                            {t('admin.tab_members')}
                        </button>
                        <button
                            className={`px-6 py-3 text-sm font-medium ${
                                activeTab === 'gallery'
                                    ? 'text-primary-700 border-primary-700 border-b-2'
                                    : 'text-accent-600 hover:text-accent-900 border-b-2 border-transparent'
                            }`}
                            onClick={() => setActiveTab('gallery')}
                        >
                            <Image size={16} className="mr-2 inline" />
                            {t('admin.tab_gallery')}
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="rounded-b-lg bg-white p-6 shadow-md">
                    {/* Bookings Tab */}
                    {activeTab === 'bookings' && (
                        <div>
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">{t('admin.upcoming_bookings')}</h2>
                                <Button variant="primary" size="sm">
                                    {t('admin.add_booking')}
                                </Button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-accent-50">
                                            <th className="border-b p-3 text-left">{t('admin.guest')}</th>
                                            <th className="border-b p-3 text-left">{t('admin.room')}</th>
                                            <th className="border-b p-3 text-left">{t('admin.check_in')}</th>
                                            <th className="border-b p-3 text-left">{t('admin.check_out')}</th>
                                            <th className="border-b p-3 text-left">{t('admin.status')}</th>
                                            <th className="border-b p-3 text-left">{t('admin.actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((booking) => (
                                            <tr key={booking.id} className="hover:bg-accent-50">
                                                <td className="border-b p-3">
                                                    <div>
                                                        <div className="font-medium">{booking.name}</div>
                                                        <div className="text-accent-500 text-sm">{booking.email}</div>
                                                    </div>
                                                </td>
                                                <td className="border-b p-3">{booking.room}</td>
                                                <td className="border-b p-3">{booking.checkIn}</td>
                                                <td className="border-b p-3">{booking.checkOut}</td>
                                                <td className="border-b p-3">
                                                    <span
                                                        className={`rounded-full px-2 py-1 text-xs ${
                                                            booking.status === 'confirmed'
                                                                ? 'bg-green-100 text-green-800'
                                                                : booking.status === 'pending'
                                                                  ? 'bg-yellow-100 text-yellow-800'
                                                                  : 'bg-red-100 text-red-800'
                                                        }`}
                                                    >
                                                        {booking.status === 'confirmed'
                                                            ? t('admin.status_confirmed')
                                                            : booking.status === 'pending'
                                                              ? t('admin.status_pending')
                                                              : t('admin.status_canceled')}
                                                    </span>
                                                </td>
                                                <td className="border-b p-3">
                                                    <div className="flex space-x-2">
                                                        <button className="text-primary-700 hover:text-primary-800">{t('admin.edit')}</button>
                                                        <button className="text-red-600 hover:text-red-800">{t('admin.cancel')}</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Rooms Tab */}
                    {activeTab === 'rooms' && (
                        <div>
                            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-accent-900">{t('admin.room_inventory', 'Room Inventory')}</h2>
                                    <p className="text-xs text-accent-500 mt-1">Manage Khan Wahoud suites, rates, specifications, and photo galleries</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={fetchRooms}
                                        className="px-3.5 py-2 rounded-lg border border-accent-300 text-accent-700 text-xs font-medium hover:bg-accent-50 transition-colors cursor-pointer"
                                    >
                                        Refresh
                                    </button>
                                    <button
                                        onClick={() => setIsAddRoomModalOpen(true)}
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#781C1D] hover:bg-[#932526] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer"
                                    >
                                        <Plus size={16} />
                                        <span>+ Add New Room</span>
                                    </button>
                                </div>
                            </div>

                            {isLoadingRooms ? (
                                <div className="py-20 flex flex-col items-center justify-center text-accent-500">
                                    <Loader2 size={32} className="animate-spin text-[#781C1D] mb-3" />
                                    <span className="text-sm">Loading rooms inventory...</span>
                                </div>
                            ) : rooms.length === 0 ? (
                                <div className="py-16 text-center border-2 border-dashed border-accent-200 rounded-2xl">
                                    <Home size={40} className="mx-auto text-accent-300 mb-3" />
                                    <p className="text-accent-600 font-medium text-sm mb-4">No rooms found in the database.</p>
                                    <button
                                        onClick={() => setIsAddRoomModalOpen(true)}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#781C1D] text-white text-xs font-medium cursor-pointer"
                                    >
                                        <Plus size={14} />
                                        <span>Add First Room</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {rooms.map((room) => {
                                        const imgList = room.formatted_images || (Array.isArray(room.images) ? room.images : ['/images/rooms.png']);
                                        const coverImg = imgList[0] || '/images/rooms.png';
                                        return (
                                            <div key={room.id} className="overflow-hidden rounded-2xl border border-accent-200 bg-white transition-all hover:shadow-lg flex flex-col justify-between">
                                                <div>
                                                    <div className="relative h-48 w-full bg-accent-100 overflow-hidden">
                                                        <img
                                                            src={coverImg}
                                                            alt={room.name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = '/images/rooms.png';
                                                            }}
                                                        />
                                                        <div className="absolute top-3 left-3">
                                                            <span className="px-2.5 py-1 rounded-full bg-[#781C1D]/90 text-white text-[10px] font-semibold uppercase tracking-wider shadow">
                                                                {room.category || 'Suite'}
                                                            </span>
                                                        </div>
                                                        <div className="absolute top-3 right-3">
                                                            <span className="px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-sans flex items-center gap-1 backdrop-blur-sm">
                                                                <Camera size={11} />
                                                                <span>{imgList.length} photos</span>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="p-5">
                                                        <div className="flex items-baseline justify-between mb-2">
                                                            <h3 className="font-serif text-lg font-bold text-accent-900">{room.name}</h3>
                                                            <span className="font-serif font-bold text-[#781C1D] text-lg">
                                                                ${room.price}
                                                                <span className="text-[11px] font-sans font-normal text-accent-500">/nt</span>
                                                            </span>
                                                        </div>

                                                        {room.description && (
                                                            <p className="text-xs text-accent-600 line-clamp-2 mb-3 leading-relaxed">
                                                                {room.description}
                                                            </p>
                                                        )}

                                                        <div className="flex items-center gap-3 text-xs text-accent-600 mb-2 bg-accent-50 p-2.5 rounded-lg">
                                                            <span><strong>Size:</strong> {room.size ? `${room.size} m²` : '—'}</span>
                                                            <span>•</span>
                                                            <span><strong>Guests:</strong> {room.max_occupancy || 2}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-4 border-t border-accent-100 flex items-center justify-between">
                                                    <span className="text-[11px] text-accent-400">ID: #{room.id}</span>
                                                    <button
                                                        onClick={() => handleDeleteRoom(room.id, room.name)}
                                                        className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium cursor-pointer p-1.5 rounded hover:bg-red-50 transition-colors"
                                                    >
                                                        <Trash2 size={14} />
                                                        <span>Delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Members Tab */}
                    {activeTab === 'members' && (
                        <div>
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">{t('admin.membership_directory')}</h2>
                                <Button variant="primary" size="sm">
                                    {t('admin.add_member')}
                                </Button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-accent-50">
                                            <th className="border-b p-3 text-left">{t('admin.member')}</th>
                                            <th className="border-b p-3 text-left">{t('admin.email')}</th>
                                            <th className="border-b p-3 text-left">{t('admin.tier')}</th>
                                            <th className="border-b p-3 text-left">{t('admin.join_date')}</th>
                                            <th className="border-b p-3 text-left">{t('admin.actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {members.map((member) => (
                                            <tr key={member.id} className="hover:bg-accent-50">
                                                <td className="border-b p-3 font-medium">{member.name}</td>
                                                <td className="border-b p-3">{member.email}</td>
                                                <td className="border-b p-3">
                                                    <span
                                                        className={`rounded-full px-2 py-1 text-xs ${
                                                            member.tier === 'Legacy'
                                                                ? 'bg-primary-100 text-primary-800'
                                                                : member.tier === 'Heritage'
                                                                  ? 'bg-secondary-100 text-secondary-800'
                                                                  : 'bg-accent-100 text-accent-800'
                                                        }`}
                                                    >
                                                        {member.tier}
                                                    </span>
                                                </td>
                                                <td className="border-b p-3">{member.joinDate}</td>
                                                <td className="border-b p-3">
                                                    <div className="flex space-x-2">
                                                        <button className="text-primary-700 hover:text-primary-800">{t('admin.view')}</button>
                                                        <button className="text-primary-700 hover:text-primary-800">{t('admin.edit')}</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Gallery Tab */}
                    {activeTab === 'gallery' && (
                        <div>
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">{t('admin.image_gallery')}</h2>
                                <Button variant="primary" size="sm">
                                    {t('admin.upload_images')}
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                                    <div key={index} className="group bg-accent-200 relative h-40 overflow-hidden rounded-md">
                                        {/* Image would go here */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-accent-500">{t('admin.gallery_image')} {index + 1}</span>
                                        </div>

                                        <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                                            <button className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Room Modal Dialog */}
            {isAddRoomModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-accent-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
                        {/* Modal Header */}
                        <div className="px-6 py-5 bg-[#FAF7EE] border-b border-[#781C1D]/15 flex items-center justify-between flex-shrink-0">
                            <div>
                                <h3 className="font-serif text-xl font-bold text-[#781C1D]">
                                    + Add New Room / Suite
                                </h3>
                                <p className="text-xs text-[#6B5E55] mt-0.5">
                                    Create a new accommodation with photos, pricing, and specs
                                </p>
                            </div>
                            <button
                                onClick={() => setIsAddRoomModalOpen(false)}
                                className="w-8 h-8 rounded-full bg-accent-200/80 hover:bg-[#781C1D] hover:text-white flex items-center justify-center text-accent-700 transition-colors cursor-pointer"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Modal Form Body */}
                        <form onSubmit={handleAddRoom} className="p-6 overflow-y-auto flex-1 space-y-5">
                            {/* Room Name & Category */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-accent-700 mb-1.5">
                                        Room Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={newRoomName}
                                        onChange={(e) => setNewRoomName(e.target.value)}
                                        placeholder="e.g. Imperial Heritage Suite"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-accent-300 focus:border-[#781C1D] focus:ring-2 focus:ring-[#781C1D]/15 text-sm outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-accent-700 mb-1.5">
                                        Category *
                                    </label>
                                    <select
                                        value={newRoomCategory}
                                        onChange={(e) => setNewRoomCategory(e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-accent-300 focus:border-[#781C1D] focus:ring-2 focus:ring-[#781C1D]/15 text-sm outline-none bg-white cursor-pointer transition-all"
                                    >
                                        <option value="Heritage">Heritage Suite</option>
                                        <option value="Courtyard">Courtyard Room</option>
                                        <option value="Panoramic">Panoramic Suite</option>
                                        <option value="Deluxe">Deluxe Room</option>
                                        <option value="Royal">Royal Sanctuary</option>
                                    </select>
                                </div>
                            </div>

                            {/* Price, Size, Occupancy */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-accent-700 mb-1.5">
                                        Price / Night ($) *
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        step="1"
                                        value={newRoomPrice}
                                        onChange={(e) => setNewRoomPrice(e.target.value)}
                                        placeholder="e.g. 350"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-accent-300 focus:border-[#781C1D] focus:ring-2 focus:ring-[#781C1D]/15 text-sm outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-accent-700 mb-1.5">
                                        Size (m²)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={newRoomSize}
                                        onChange={(e) => setNewRoomSize(e.target.value)}
                                        placeholder="e.g. 55"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-accent-300 focus:border-[#781C1D] focus:ring-2 focus:ring-[#781C1D]/15 text-sm outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-accent-700 mb-1.5">
                                        Max Guests
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={newRoomMaxOccupancy}
                                        onChange={(e) => setNewRoomMaxOccupancy(e.target.value)}
                                        placeholder="e.g. 3"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-accent-300 focus:border-[#781C1D] focus:ring-2 focus:ring-[#781C1D]/15 text-sm outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-700 mb-1.5">
                                    Description *
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={newRoomDescription}
                                    onChange={(e) => setNewRoomDescription(e.target.value)}
                                    placeholder="Describe the architectural heritage, furnishings, and view..."
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-accent-300 focus:border-[#781C1D] focus:ring-2 focus:ring-[#781C1D]/15 text-sm outline-none transition-all resize-y"
                                />
                            </div>

                            {/* Amenities */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-700 mb-1.5">
                                    Amenities & Inclusions (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={newRoomAmenities}
                                    onChange={(e) => setNewRoomAmenities(e.target.value)}
                                    placeholder="Courtyard View, Ottoman Marble Bath, King Bed, Free Wi-Fi"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-accent-300 focus:border-[#781C1D] focus:ring-2 focus:ring-[#781C1D]/15 text-sm outline-none transition-all"
                                />
                            </div>

                            {/* Multi-Image File Upload */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-accent-700 mb-1.5">
                                    Room Images (Upload Multiple)
                                </label>
                                <div className="border-2 border-dashed border-accent-300 hover:border-[#781C1D] rounded-2xl p-6 text-center bg-accent-50/50 hover:bg-[#FAF7EE]/50 transition-all cursor-pointer relative">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/jpeg,image/png,image/jpg,image/webp"
                                        onChange={handleImageSelect}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="flex flex-col items-center justify-center pointer-events-none">
                                        <div className="w-12 h-12 rounded-full bg-[#781C1D]/10 text-[#781C1D] flex items-center justify-center mb-2">
                                            <Upload size={22} />
                                        </div>
                                        <span className="text-sm font-medium text-accent-800">
                                            Click or drag images here to upload
                                        </span>
                                        <span className="text-xs text-accent-500 mt-1">
                                            Supports JPG, PNG, WEBP (multiple photos will form the room gallery)
                                        </span>
                                    </div>
                                </div>

                                {/* Preview Thumbnails */}
                                {newRoomImagePreviews.length > 0 && (
                                    <div className="mt-4">
                                        <span className="text-xs font-semibold text-accent-700 block mb-2">
                                            Selected Photos ({newRoomImagePreviews.length}):
                                        </span>
                                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                                            {newRoomImagePreviews.map((previewUrl, idx) => (
                                                <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square border border-accent-200 bg-black/5">
                                                    <img src={previewUrl} alt="" className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemovePreview(idx)}
                                                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity shadow cursor-pointer"
                                                        title="Remove photo"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-[9px] text-white">
                                                        #{idx + 1}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-4 border-t border-accent-200 flex items-center justify-end gap-3 flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setIsAddRoomModalOpen(false)}
                                    disabled={isSubmittingRoom}
                                    className="px-5 py-2.5 rounded-xl border border-accent-300 text-accent-700 text-xs font-medium hover:bg-accent-100 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmittingRoom}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#781C1D] hover:bg-[#932526] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer"
                                >
                                    {isSubmittingRoom ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            <span>Saving Room...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={16} />
                                            <span>Create & Publish Room</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
