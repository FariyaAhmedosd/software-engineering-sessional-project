<?php

namespace App\Http\Controllers;

use App\Models\Seminar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SeminarController extends Controller
{
    public function enroll(Seminar $seminar)
    {
        $user = Auth::user();

        // Check if already enrolled
        if (!$user->seminars()->where('seminar_id', $seminar->id)->exists()) {
            $user->seminars()->attach($seminar->id);
        }

        return redirect()->back()->with('success', 'Successfully enrolled in the workshop!');
    }
}