<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Room;
use Illuminate\Http\Request;

class BookingController extends Controller
{


    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'guest_name' => 'required|string|min:2',
            'guest_email' => 'required|email',
            'check_in' => 'required|date|after:today',
            'check_out' => 'required|date|after:check_in',
            'notes' => 'nullable|string'
        ]);

        $room = Room::findOrFail($validated['room_id']);

        // Check if room is available
        $isAvailable = !$room->bookings()
            ->where(function ($query) use ($validated) {
                $query->whereBetween('check_in', [$validated['check_in'], $validated['check_out']])
                    ->orWhereBetween('check_out', [$validated['check_in'], $validated['check_out']]);
            })
            ->exists();

        if (!$isAvailable) {
            return response()->json(['message' => 'Room is not available for selected dates'], 422);
        }

        $booking = Booking::create($validated);

        return response()->json($booking, 201);
    }
}
