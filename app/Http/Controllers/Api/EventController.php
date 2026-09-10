<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function render()
    {
        return Inertia::render('Events');
    }
    public function index(): array
    {
        $events = Event::paginate(10);
        return
            [
                'message' => 'success',
                'data' => $events
            ];
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'type' => 'required|string',
            'date' => 'required|date|after:today',
            'description' => 'required|string',
            'contact_email' => 'required|email'
        ]);

        $event = Event::create($validated);

        return response()->json($event, 201);
    }


    public function destroy($room)
    {
        $data = Event::findOrFail($room);
        return $data->delete();
    }
}
