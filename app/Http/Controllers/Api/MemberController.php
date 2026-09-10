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
}