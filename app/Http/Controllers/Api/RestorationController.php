<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RestorationLog;
use App\Http\Resources\RestorationLogResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Request;

class RestorationController extends Controller
{
    public function index()
    {
        $logs = RestorationLog::orderBy('created_at', 'desc')->get();
        return  response()->json($logs);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'phase' => 'required|string|max:255',
            'description' => 'required|string',
            'media_url' => 'required|string',
        ]);
        $restoration = RestorationLog::create([
            'phase' => $validated['phase'],
            'description' => $validated['description'],
            'media_url' => $validated['media_url'],
        ]);
        return response()->json([
            'message' => 'Restoration created successfully',
            'restoration' => $restoration,
        ], 201);
    }

    public function update(Request $request, RestorationLog $restoration)
    {
        $validated = $request->validate([
            'phase' => 'required|string|max:255',
            'description' => 'required|string',
            'media_url' => 'required|string',
        ]);
        $restoration = RestorationLog::findOrFail($restoration);
        $restoration->update([
            'phase' => $validated['phase'],
            'description' => $validated['description'],
            'media_url' => $validated['media_url'],
        ]);
        return response()->json([
            'message' => 'Restoration updated successfully',
            'restoration' => $restoration->fresh(),
        ]);
    }

    public function destroy(RestorationLog $restoration)
    {
        $restoration->delete();
        return response()->json(null, 204);
    }
}
