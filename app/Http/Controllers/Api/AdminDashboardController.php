<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\Booking;
use App\Models\Member;
use App\Models\RestorationLog;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function stats()
    {
        $stats = [
            'total_rooms' => Room::count(),
            'active_bookings' => Booking::where('check_out', '>=', now())->count(),
            'total_members' => Member::count(),
            'restoration_logs' => RestorationLog::count(),
        ];

        return response()->json($stats);
    }

    public function recentBookings()
    {
        $bookings = Booking::with('room')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        return response()->json($bookings);
    }

    public function recentMembers()
    {
        $members = Member::orderBy('joined_at', 'desc')
            ->take(5)
            ->get();

        return response()->json($members);
    }
}