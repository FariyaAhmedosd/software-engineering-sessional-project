<?php

namespace App\Http\Controllers;

use App\Models\MentorshipRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MentorshipRequestController extends Controller
{
    // 1. Mentorship Request Pathano (Previous code)
    public function store(Request $request)
    {
        $request->validate([
            'mentor_id' => 'required|exists:users,id',
            'skill_name' => 'required|string',
        ]);

        MentorshipRequest::create([
            'student_id' => Auth::id(),
            'mentor_id' => $request->mentor_id,
            'skill_name' => $request->skill_name,
            'status' => 'pending',
        ]);

        return redirect()->back()->with('success', 'Mentorship request sent successfully!');
    }

    // 2. Mentor Request Accept / Reject Kora
    public function updateStatus(Request $request, MentorshipRequest $mentorshipRequest)
    {
        $request->validate([
            'status' => 'required|in:accepted,rejected',
        ]);

        $mentorshipRequest->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Request status updated!');
    }

    // 3. Student Rating & Feedback Dewa
    public function rateMentor(Request $request, MentorshipRequest $mentorshipRequest)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'feedback' => 'nullable|string',
        ]);

        $mentorshipRequest->update([
            'rating' => $request->rating,
            'feedback' => $request->feedback,
        ]);

        return redirect()->back()->with('success', 'Thank you for your rating!');
    }
}