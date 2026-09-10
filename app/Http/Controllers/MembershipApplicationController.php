<?php

namespace App\Http\Controllers;

use App\Models\MembershipApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MembershipApplicationController extends Controller
{
    /**
     * Store a newly created membership application
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'membership_tier' => 'required|in:Heritage,Legacy,Royal',
            'areas_of_interest' => 'nullable|array',
            'areas_of_interest.*' => 'string|in:Cultural Events,Fine Dining,Historical Architecture,Art & Exhibitions,Traditional Crafts,Ottoman Heritage',
            'about' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $application = MembershipApplication::create($validator->validated());

            return response()->json([
                'message' => 'Membership application submitted successfully',
                'data' => $application
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to submit membership application',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all membership applications (paginated)
     */
    public function index()
    {
        try {
            $applications = MembershipApplication::latest()->paginate(10);

            return response()->json([
                'message' => 'Membership applications retrieved successfully',
                'data' => $applications
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve membership applications',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the status of a membership application
     */
    public function updateStatus(Request $request, MembershipApplication $application)
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
            $application->update(['status' => $request->status]);

            return response()->json([
                'message' => 'Membership application status updated successfully',
                'data' => $application
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update membership application status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get a specific membership application
     */
    public function show(MembershipApplication $application)
    {
        try {
            return response()->json([
                'message' => 'Membership application retrieved successfully',
                'data' => $application
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve membership application',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
