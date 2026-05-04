<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MentorshipRequest;
use Inertia\Inertia;

class MentorshipRequestController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'mentor_id' => 'required|exists:users,id',
            'skill_name' => 'required|string|max:255',
            'message' => 'nullable|string',
        ]);

        MentorshipRequest::create([
            'student_id' => auth()->id(),
            'mentor_id' => $validated['mentor_id'],
            'skill_name' => $validated['skill_name'],
            'message' => $validated['message'],
            'status' => 'pending',
        ]);

        return back()->with('success', 'Mentorship request sent successfully!');
    }
}

