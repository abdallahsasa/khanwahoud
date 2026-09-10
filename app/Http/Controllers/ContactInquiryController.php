<?php

namespace App\Http\Controllers;

use App\Models\ContactInquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactInquiryController extends Controller
{
    /**
     * Store a newly created contact inquiry
     */
    public function store(Request $request)
    {
        $rules = [
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'type' => 'required|in:general,booking,restoration,membership',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ];

        // Add conditional validation rules based on inquiry type
        if (in_array($request->type, ['booking', 'membership'])) {
            $rules['phone'] = 'required|string|max:20';
        }

        if ($request->type === 'booking') {
            $rules['check_in_date'] = 'required|date|after:today';
            $rules['check_out_date'] = 'required|date|after:check_in_date';
        }

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $inquiry = ContactInquiry::create($validator->validated());

            // Here you might want to send notifications to staff or trigger other actions
            // based on the inquiry type

            return response()->json([
                'message' => 'Your inquiry has been submitted successfully',
                'data' => $inquiry
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to submit inquiry',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all inquiries (paginated)
     */
    public function index()
    {
        try {
            $inquiries = ContactInquiry::latest()->paginate(10);

            return response()->json([
                'message' => 'Inquiries retrieved successfully',
                'data' => $inquiries
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve inquiries',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get a specific inquiry
     */
    public function show(ContactInquiry $inquiry)
    {
        try {
            return response()->json([
                'message' => 'Inquiry retrieved successfully',
                'data' => $inquiry
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve inquiry',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the status of an inquiry
     */
    public function updateStatus(Request $request, ContactInquiry $inquiry)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,in_progress,resolved,closed'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $inquiry->update(['status' => $request->status]);

            return response()->json([
                'message' => 'Inquiry status updated successfully',
                'data' => $inquiry
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update inquiry status',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
