<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'batch' => ['nullable', 'string', 'max:50'],
            'department' => ['nullable', 'string', 'max:100'],
            'known_skills' => ['nullable', 'string'],
            'interested_skills' => ['nullable', 'string'],
            'whatsapp_number' => ['nullable', 'string', 'max:20'],
            'profile_photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        $user = $request->user();

        // সাধারণ টেক্সট ফিল্ডগুলো আপডেট করা
        $user->fill([
            'name' => $request->name,
            'email' => $request->email,
            'batch' => $request->batch,
            'department' => $request->department,
            'known_skills' => $request->known_skills,
            'interested_skills' => $request->interested_skills,
            'whatsapp_number' => $request->whatsapp_number,
        ]);

        // প্রোফাইল ফটো আপলোড হ্যান্ডলিং
        if ($request->hasFile('profile_photo')) {
            $file = $request->file('profile_photo');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            
            // public/uploads/profiles ফোল্ডারে সেভ করা
            $file->move(public_path('uploads/profiles'), $filename);
            
            // ডাটাবেজে ছবির নাম আপডেট
            $user->profile_photo = $filename;
        }

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}