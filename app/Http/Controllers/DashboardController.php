<?php

namespace App\Http\Controllers;

use App\Models\MentorshipRequest;
use App\Models\Seminar;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // ১. Admin Redirect
        if ($user && $user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        // ২. User Interests Safe Parsing
        $rawInterests = explode(',', $user->interested_skills ?? '');
        $interests = array_values(array_filter(array_map('trim', $rawInterests)));

        // ৩. Mentor Recommendations
        $otherUsers = User::where('id', '!=', $user->id)->get();
        $recommendedMentors = [];

        if (!empty($interests)) {
            $recommendedMentors = User::where('id', '!=', $user->id)
                ->where(function ($query) use ($interests) {
                    foreach ($interests as $interest) {
                        if (!empty($interest)) {
                            $query->orWhere('known_skills', 'like', '%' . $interest . '%');
                        }
                    }
                })->get();
        }

        // ৪. Peer Study Group Suggestions
        $studyGroupSuggestions = [];
        foreach ($interests as $interest) {
            if (!empty($interest)) {
                $matchCount = 1;
                $cleanInterest = strtolower($interest);

                foreach ($otherUsers as $otherUser) {
                    $otherInterests = strtolower($otherUser->interested_skills ?? '');
                    if (str_contains($otherInterests, $cleanInterest)) {
                        $matchCount++;
                    }
                }

                if ($matchCount >= 2) {
                    $studyGroupSuggestions[] = [
                        'skill' => ucfirst($interest),
                        'total_students' => $matchCount,
                    ];
                }
            }
        }

        // ৫. Curated Resources Engine
        $curatedDatabase = [
            'c++' => [
                'playlist' => 'https://www.youtube.com/playlist?list=PLDzeHXRd5Ttyb19P0I_m9UjQJ6JqA8B6v',
                'book' => 'C++ Primer (5th Edition)',
                'book_url' => 'https://github.com/aidenrich/books/raw/master/C%2B%2B%20Primer%20(5th%20Edition).pdf',
            ],
            'dsa' => [
                'playlist' => 'https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz',
                'book' => 'Data Structures and Algorithms Made Easy',
                'book_url' => 'https://www.google.com/search?q=Data+Structures+and+Algorithms+Made+Easy+pdf',
            ],
            'dbms' => [
                'playlist' => 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y',
                'book' => 'Database System Concepts',
                'book_url' => 'https://www.google.com/search?q=Database+System+Concepts+pdf',
            ],
            'react' => [
                'playlist' => 'https://www.youtube.com/playlist?list=PLu0W_9lII9agx60uaVJRX6yVwcLKVnr07',
                'book' => "Learning React (O'Reilly)",
                'book_url' => 'https://www.google.com/search?q=Learning+React+O%27Reilly+pdf',
            ],
            'python' => [
                'playlist' => 'https://youtu.be/UrsmFxEIp5k?si=LR76azaD0dcnzKHs',
                'book' => 'Python Crash Course',
                'book_url' => 'https://www.google.com/search?q=Python+Crash+Course+pdf',
            ],
            'machine learning' => [
                'playlist' => 'https://www.youtube.com/results?search_query=machine+learning+full+course+playlist',
                'book' => 'Hands-On Machine Learning',
                'book_url' => 'https://www.google.com/search?q=Hands-On+Machine+Learning+pdf',
            ],
            'ml' => [
                'playlist' => 'https://www.youtube.com/results?search_query=machine+learning+full+course+playlist',
                'book' => 'Hands-On Machine Learning',
                'book_url' => 'https://www.google.com/search?q=Hands-On+Machine+Learning+pdf',
            ],
        ];

        $learningResources = [];
        foreach ($interests as $skill) {
            if (!empty($skill)) {
                $cleanSkill = strtolower(trim($skill));
                $encodedSkill = urlencode($cleanSkill);

                if (array_key_exists($cleanSkill, $curatedDatabase)) {
                    $learningResources[] = [
                        'skill' => strtoupper($cleanSkill),
                        'youtube_url' => $curatedDatabase[$cleanSkill]['playlist'],
                        'doc_url' => "https://roadmap.sh/{$encodedSkill}",
                        'book' => $curatedDatabase[$cleanSkill]['book'],
                        'book_url' => $curatedDatabase[$cleanSkill]['book_url'],
                        'is_curated' => true,
                    ];
                } else {
                    $learningResources[] = [
                        'skill' => ucfirst($cleanSkill),
                        'youtube_url' => "https://www.youtube.com/results?search_query={$encodedSkill}+full+course",
                        'doc_url' => "https://roadmap.sh",
                        'book' => "Standard Textbook for {$cleanSkill}",
                        'book_url' => "https://www.google.com/search?q=best+textbook+pdf+for+{$encodedSkill}",
                        'is_curated' => false,
                    ];
                }
            }
        }

        // ৬. Safe Seminars Fetching
        $seminars = [];
        $enrolledSeminarIds = [];
        try {
            if (class_exists('App\Models\Seminar')) {
                $seminars = Seminar::latest()->get();
                if (method_exists($user, 'seminars')) {
                    $enrolledSeminarIds = $user->seminars()->pluck('seminar_id')->toArray();
                }
            }
        } catch (\Exception $e) {
            $seminars = [];
            $enrolledSeminarIds = [];
        }

        // ৭. Safe Mentorship Requests Fetching
        $mySentRequests = [];
        $myReceivedRequests = [];
        try {
            if (class_exists('App\Models\MentorshipRequest')) {
                $mySentRequests = MentorshipRequest::with('mentor')
                    ->where('student_id', $user->id)
                    ->latest()
                    ->get();

                $myReceivedRequests = MentorshipRequest::with('student')
                    ->where('mentor_id', $user->id)
                    ->latest()
                    ->get();
            }
        } catch (\Exception $e) {
            $mySentRequests = [];
            $myReceivedRequests = [];
        }

        // 🎯 Render Page
        return Inertia::render('Dashboard', [
            'auth' => ['user' => $user],
            'allUsers' => $otherUsers,
            'recommendedMentors' => $recommendedMentors,
            'studyGroupSuggestions' => $studyGroupSuggestions,
            'learningResources' => $learningResources,
            'seminars' => $seminars,
            'enrolledSeminarIds' => $enrolledSeminarIds,
            'mySentRequests' => $mySentRequests,
            'myReceivedRequests' => $myReceivedRequests,
        ]);
    }
}