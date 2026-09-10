import { router } from '@inertiajs/react';
import { Calendar, Clock, Home, Image, LogOut, Users, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
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
    id: string;
    name: string;
    status: 'available' | 'occupied' | 'maintenance';
    price: number;
}

interface Member {
    id: string;
    name: string;
    email: string;
    tier: string;
    joinDate: string;
}

const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('bookings');

    // Mock authentication check
    useEffect(() => {
        // Check if auth token exists in cookies
        const isAuthenticated = document.cookie.includes('adminToken=');
        if (!isAuthenticated) {
            router.visit('/admin');
        }
    }, []);

    // Mock data
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

    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await api.get('/rooms');
                setRooms(response.data.data.data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

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
                    <h1 className="font-serif text-3xl font-bold">Admin Dashboard</h1>
                    <div className="flex items-center">
                        <Clock size={18} className="text-accent-500 mr-2" />
                        <span className="text-accent-500 mr-4">{new Date().toLocaleDateString()}</span>
                        <Button variant="outline" size="sm" onClick={() => router.visit('/admin')}>
                            <LogOut size={16} className="mr-1" />
                            Logout
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
                            Bookings
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
                            Rooms
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
                            Members
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
                            Gallery
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="rounded-b-lg bg-white p-6 shadow-md">
                    {/* Bookings Tab */}
                    {activeTab === 'bookings' && (
                        <div>
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
                                <Button variant="primary" size="sm">
                                    Add New Booking
                                </Button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-accent-50">
                                            <th className="border-b p-3 text-left">Guest</th>
                                            <th className="border-b p-3 text-left">Room</th>
                                            <th className="border-b p-3 text-left">Check-in</th>
                                            <th className="border-b p-3 text-left">Check-out</th>
                                            <th className="border-b p-3 text-left">Status</th>
                                            <th className="border-b p-3 text-left">Actions</th>
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
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td className="border-b p-3">
                                                    <div className="flex space-x-2">
                                                        <button className="text-primary-700 hover:text-primary-800">Edit</button>
                                                        <button className="text-red-600 hover:text-red-800">Cancel</button>
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
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Room Inventory</h2>
                                <Button variant="primary" size="sm">
                                    Update Room Status
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {rooms.map((room) => (
                                    <div key={room.id} className="overflow-hidden rounded-lg border transition-shadow hover:shadow-md">
                                        <div className="bg-accent-200 relative h-40">
                                            {/* Room image would go here */}
                                            <div className="absolute top-2 right-2">
                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs ${
                                                        room.status === 'available'
                                                            ? 'bg-green-100 text-green-800'
                                                            : room.status === 'occupied'
                                                              ? 'bg-blue-100 text-blue-800'
                                                              : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {room.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="mb-2 font-semibold">{room.name}</h3>
                                            <p className="text-primary-700 font-bold">${room.price} / night</p>
                                            <div className="mt-4 flex justify-between">
                                                <button className="text-primary-700 text-sm hover:underline">Edit Details</button>
                                                <button className="text-primary-700 text-sm hover:underline">Change Status</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Members Tab */}
                    {activeTab === 'members' && (
                        <div>
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Membership Directory</h2>
                                <Button variant="primary" size="sm">
                                    Add New Member
                                </Button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-accent-50">
                                            <th className="border-b p-3 text-left">Member</th>
                                            <th className="border-b p-3 text-left">Email</th>
                                            <th className="border-b p-3 text-left">Tier</th>
                                            <th className="border-b p-3 text-left">Join Date</th>
                                            <th className="border-b p-3 text-left">Actions</th>
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
                                                        <button className="text-primary-700 hover:text-primary-800">View</button>
                                                        <button className="text-primary-700 hover:text-primary-800">Edit</button>
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
                                <h2 className="text-xl font-semibold">Image Gallery</h2>
                                <Button variant="primary" size="sm">
                                    Upload New Images
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                                    <div key={index} className="group bg-accent-200 relative h-40 overflow-hidden rounded-md">
                                        {/* Image would go here */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-accent-500">Gallery Image {index + 1}</span>
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
        </div>
    );
};

export default AdminDashboard;
