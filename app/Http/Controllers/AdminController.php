<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Seminar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $allUsers = User::all();
        $totalStudents = $allUsers->where('role', 'student')->count();
        $totalMentors = $allUsers->filter(fn($u) => !empty($u->known_skills))->count();

        // 1. Calculate Skill Demand & Supply Analytics
        $skillStats = [];

        foreach ($allUsers as $u) {
            // Interested skills (Demand)
            $interests = array_filter(array_map('trim', explode(',', strtolower($u->interested_skills ?? ''))));
            foreach ($interests as $skill) {
                if (!isset($skillStats[$skill])) {
                    $skillStats[$skill] = ['demand' => 0, 'supply' => 0];
                }
                $skillStats[$skill]['demand']++;
            }

            // Known skills (Supply)
            $knowns = array_filter(array_map('trim', explode(',', strtolower($u->known_skills ?? ''))));
            foreach ($knowns as $skill) {
                if (!isset($skillStats[$skill])) {
                    $skillStats[$skill] = ['demand' => 0, 'supply' => 0];
                }
                $skillStats[$skill]['supply']++;
            }
        }

        // Format for Charts (Recharts / UI)
        $chartData = [];
        $criticalGaps = [];

        foreach ($skillStats as $skill => $counts) {
            $formattedSkill = ucfirst($skill);
            $chartData[] = [
                'skill' => $formattedSkill,
                'demand' => $counts['demand'],
                'supply' => $counts['supply'],
            ];

            // Critical Gap condition: High Demand (>= 3 students) & Low/Zero Supply (<= 1 mentor)
            if ($counts['demand'] >= 3 && $counts['supply'] <= 1) {
                $criticalGaps[] = [
                    'skill' => $formattedSkill,
                    'demand' => $counts['demand'],
                    'supply' => $counts['supply'],
                    'suggested_action' => "Organize a Seminar/Workshop on {$formattedSkill}",
                ];
            }
        }

        $seminars = Seminar::latest()->get();

        return Inertia::render('Admin/Dashboard', [
            'totalStudents' => $totalStudents,
            'totalMentors' => $totalMentors,
            'chartData' => $chartData,
            'criticalGaps' => $criticalGaps,
            'seminars' => $seminars,
        ]);
        return Inertia::render('Admin/Dashboard', [
    'auth' => [
        'user' => auth()->user(),
    ],
    'totalStudents' => $totalStudents,
    'totalMentors' => $totalMentors,
    'chartData' => $chartData,
    'criticalGaps' => $criticalGaps,
    'seminars' => $seminars,
]);
    }

    public function storeSeminar(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'skill_name' => 'required|string',
            'description' => 'nullable|string',
            'location' => 'required|string',
        ]);

        Seminar::create($request->all());

        return redirect()->back()->with('success', 'Workshop/Seminar organized successfully!');
    }
}