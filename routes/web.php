<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MentorshipRequestController;
use App\Http\Controllers\MentorRatingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SeminarController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Student Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Mentorship Requests & Rating
    Route::post('/mentorship-request', [MentorshipRequestController::class, 'store'])->name('mentorship.request');
    Route::patch('/mentorship-request/{mentorshipRequest}/status', [MentorshipRequestController::class, 'updateStatus'])->name('mentorship.updateStatus');
    Route::post('/mentorship-request/{mentorshipRequest}/rate', [MentorshipRequestController::class, 'rateMentor'])->name('mentorship.rate');
    Route::post('/mentor/rate', [MentorRatingController::class, 'store'])->name('mentor.rate');

    // Seminar Enrollment
    Route::post('/seminars/{seminar}/enroll', [SeminarController::class, 'enroll'])->name('seminars.enroll');

    // Admin Panel Routes
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::post('/admin/seminars', [AdminController::class, 'storeSeminar'])->name('admin.seminars.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update.post'); // <--- Ei line-ti add koro
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
