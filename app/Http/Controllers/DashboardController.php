<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class DashboardController extends Controller
{
   public function index()
{
    $user = auth()->user();

    // ১. ইউজারের ইন্টারেস্টগুলোকে ছোট হাতের অক্ষরে (lowercase) রূপান্তর করে ট্রিম করা
    $rawInterests = explode(',', $user->interested_skills ?? '');
    $interests = array_values(array_filter(array_map('trim', $rawInterests)));

    // ২. মেন্টর সাজেশন
    $recommendedMentors = User::where('id', '!=', $user->id)
        ->where(function ($query) use ($interests) {
            if (!empty($interests)) {
                foreach ($interests as $interest) {
                    if (!empty($interest)) {
                        $query->orWhere('known_skills', 'like', '%' . $interest . '%');
                    }
                }
            } else {
                $query->whereRaw('1 = 0');
            }
        })->get();

    // ৩. স্টাডি গ্রুপ সাজেশন (কেস-সেন্সিটিভ সমস্যা ছাড়া)
    $otherUsers = User::where('id', '!=', $user->id)->get();
    $studyGroupSuggestions = [];

    foreach ($interests as $interest) {
        if (!empty($interest)) {
            $matchCount = 1; // বর্তমান ইউজার নিজে ১ জন
            $cleanInterest = strtolower($interest);

            foreach ($otherUsers as $otherUser) {
                $otherInterests = strtolower($otherUser->interested_skills ?? '');
                // যদি আংশিকও ম্যাচ করে (যেমন React vs ReactJS)
                if (str_contains($otherInterests, $cleanInterest) || str_contains($cleanInterest, $otherInterests)) {
                    $matchCount++;
                }
            }

            // টেস্ট করার সুবিধার্থে ২ জন বা তার বেশি হলেই শো করবে
            if ($matchCount >= 2) {
                $studyGroupSuggestions[] = [
                    'skill' => ucfirst($interest),
                    'total_students' => $matchCount,
                ];
            }
        }
    }

    return Inertia::render('Dashboard', [
        'recommendedMentors' => $recommendedMentors,
        'allUsers' => $otherUsers,
        'studyGroupSuggestions' => $studyGroupSuggestions,
    ]);
}
}
