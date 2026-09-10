<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\EventRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EventRequestController extends Controller
{
    /**
     * Store a newly created event request in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'event_type' => 'required|in:wedding,corporate,cultural,other',
            'preferred_date' => 'required|date|after:today',
            'guest_count' => 'required|integer|min:1',
            'additional_requirements' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $eventRequest = EventRequest::create($validator->validated());

            return response()->json([
                'message' => 'Event request created successfully',
                'data' => $eventRequest
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create event request',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all event requests (paginated)
     */
    public function index()
    {
        try {
            $eventRequests = EventRequest::latest()->paginate(10);

            return response()->json([
                'message' => 'Event requests retrieved successfully',
                'data' => $eventRequests
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve event requests',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the status of an event request
     */
    public function updateStatus(Request $request, EventRequest $eventRequest)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,approved,rejected'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $eventRequest->update(['status' => $request->status]);

            return response()->json([
                'message' => 'Event request status updated successfully',
                'data' => $eventRequest
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update event request status',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
