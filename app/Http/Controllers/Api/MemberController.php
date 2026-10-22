<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:2',
            'email' => 'required|email|unique:members,email',
            'phone' => 'required|string',
        ]);

        $validated['status'] = 'active';
        $validated['joined_at'] = now();

        $member = Member::create($validated);

        return response()->json($member, 201);
    }

    public function index()
    {
        $members = Member::orderBy('joined_at', 'desc')->paginate(10);

        return response()->json([
            'message' => 'success',
            'data' => $members,
        ]);
    }

    public function update(Request $request, Member $member)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|min:2',
            'email' => 'sometimes|required|email|unique:members,email,'.$member->id,
            'phone' => 'sometimes|required|string',
            'status' => 'sometimes|required|string',
        ]);

        $member->update($validated);

        return response()->json([
            'message' => 'Member updated successfully',
            'member' => $member->fresh(),
        ]);
    }

    public function destroy(Member $member)
    {
        $member->delete();

        return response()->json([
            'message' => 'Member deleted successfully',
        ]);
    }
}
