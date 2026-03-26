<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();
        
        // তোমার ইন্টারেস্টগুলোকে কমা দিয়ে আলাদা করে লিস্ট করা
        $interests = array_map('trim', explode(',', $user->interested_skills ?? ''));

        return Inertia::render('Dashboard', [
            // স্মার্ট লজিক: যেকোনো একটি ইন্টারেস্ট মিলে গেলেই সে রিকমেন্ডেড হবে
            'recommendedMentors' => User::where('id', '!=', $user->id)
                ->where(function ($query) use ($interests) {
                    foreach ($interests as $interest) {
                        if (!empty($interest)) {
                            $query->orWhere('known_skills', 'like', '%' . $interest . '%');
                        }
                    }
                })->get(),
            
            'allUsers' => User::where('id', '!=', $user->id)->get()
        ]);
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';