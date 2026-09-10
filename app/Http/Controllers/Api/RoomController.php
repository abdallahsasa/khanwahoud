<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RoomController extends Controller
{

    public function render()
    {
        return Inertia::render('Rooms');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string|max:255',
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'amenities' => 'required|array|min:1',
            'amenities.*' => 'string',
            'size' => 'required|numeric|min:0',
            'max_occupancy' => 'required|integer|min:1',
        ]);


        $imagePaths = [];
        foreach ($request->file('images') as $image) {
            $path = $image->store('rooms', 'public');
            $imagePaths[] = $path;
        }

        $room = Room::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'category' => $validated['category'],
            'images' => $imagePaths,
            'amenities' => $validated['amenities'],
            'size' => $validated['size'],
            'max_occupancy' => $validated['max_occupancy'],
        ]);

        return response()->json([
            'message' => 'Room created successfully',
            'room' => $room,
        ], 201);
    }

    public function update(Request $request, $room)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string|max:255',
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'amenities' => 'required|array|min:1',
            'amenities.*' => 'string',
            'size' => 'required|numeric|min:0',
            'max_occupancy' => 'required|integer|min:1',
        ]);
        $room = Room::findOrFail($room);


        if ($room->images) {
            foreach ($room->images as $oldImage) {
                Storage::disk('public')->delete($oldImage);
            }
        }


        $imagePaths = [];
        foreach ($request->file('images') as $image) {
            $path = $image->store('rooms', 'public');
            $imagePaths[] = $path;
        }

        $room->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'category' => $validated['category'],
            'images' => $imagePaths,
            'amenities' => $validated['amenities'],
            'size' => $validated['size'],
            'max_occupancy' => $validated['max_occupancy'],
        ]);

        return response()->json([
            'message' => 'Room updated successfully',
            'room' => $room->fresh(),
        ]);
    }


    public function index()
    {
        $rooms = Room::with('currentBooking')->paginate(10);
        return  [
            'message' => 'success',
            'data' => $rooms
        ];
    }

    public function show($room)
    {
        $data = Room::findOrFail($room);
        return  [
            'message' => 'success',
            'data' => $data
        ];
    }

    public function checkAvailability(Request $request, Room $room)
    {
        $request->validate([
            'check_in' => 'required|date|after:today',
            'check_out' => 'required|date|after:check_in'
        ]);

        $isAvailable = !$room->bookings()
            ->where(function ($query) use ($request) {
                $query->whereBetween('check_in', [$request->check_in, $request->check_out])
                    ->orWhereBetween('check_out', [$request->check_in, $request->check_out]);
            })
            ->exists();

        return response()->json(['available' => $isAvailable]);
    }
}
