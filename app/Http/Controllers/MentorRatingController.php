<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MentorRating;

class MentorRatingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'mentor_id' => 'required|exists:users,id',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:500',
        ]);

        // Jodi student agee rating diye thake, tobe update hobe; naile notun create hobe
        MentorRating::updateOrCreate(
            [
                'student_id' => auth()->id(), 
                'mentor_id' => $request->mentor_id
            ],
            [
                'rating' => $request->rating, 
                'review' => $request->review
            ]
        );

        return back()->with('success', 'Mentor rating submitted successfully!');
    }
}