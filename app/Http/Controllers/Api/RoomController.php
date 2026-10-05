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
        $rooms = Room::orderBy('id', 'asc')->get();
        return Inertia::render('Rooms', [
            'dbRooms' => $rooms
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string|max:255',
            'images' => 'nullable',
            'amenities' => 'nullable',
            'size' => 'nullable|numeric|min:0',
            'max_occupancy' => 'nullable|integer|min:1',
        ]);

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                if ($image && $image->isValid()) {
                    $path = $image->store('rooms', 'public');
                    $imagePaths[] = $path;
                }
            }
        } elseif ($request->filled('images')) {
            $rawImgs = $request->input('images');
            if (is_array($rawImgs)) {
                $imagePaths = $rawImgs;
            } elseif (is_string($rawImgs)) {
                $decoded = json_decode($rawImgs, true);
                $imagePaths = is_array($decoded) ? $decoded : array_filter(array_map('trim', explode(',', $rawImgs)));
            }
        }

        if (empty($imagePaths)) {
            $imagePaths = ['rooms/rooms.png'];
        }

        $amenities = [];
        if ($request->filled('amenities')) {
            $rawAmenities = $request->input('amenities');
            if (is_array($rawAmenities)) {
                $amenities = $rawAmenities;
            } elseif (is_string($rawAmenities)) {
                $decoded = json_decode($rawAmenities, true);
                if (is_array($decoded)) {
                    $amenities = $decoded;
                } else {
                    $amenities = array_values(array_filter(array_map('trim', preg_split('/[\r\n,]+/', $rawAmenities))));
                }
            }
        }

        if (empty($amenities)) {
            $amenities = ['Courtyard View', 'Free Wi-Fi', 'Heritage Breakfast'];
        }

        $room = Room::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'category' => $validated['category'],
            'images' => $imagePaths,
            'amenities' => $amenities,
            'size' => $validated['size'] ?? 45,
            'max_occupancy' => $validated['max_occupancy'] ?? 2,
        ]);

        return response()->json([
            'message' => 'Room created successfully',
            'room' => $room->fresh(),
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

    public function destroy($room)
    {
        $record = Room::findOrFail($room);
        
        $images = $record->images;
        if (is_string($images)) {
            $images = json_decode($images, true);
        }
        if (is_array($images)) {
            foreach ($images as $img) {
                if (is_string($img) && !str_starts_with($img, 'http') && !str_starts_with($img, '/images/')) {
                    $cleanPath = ltrim(str_replace('/storage/', '', $img), '/');
                    Storage::disk('public')->delete($cleanPath);
                }
            }
        }

        $record->delete();

        return response()->json([
            'message' => 'Room deleted successfully'
        ]);
    }
}
