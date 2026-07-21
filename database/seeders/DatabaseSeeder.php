<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ডেমো পাসওয়ার্ড
        $password = Hash::make('password123');

        // ফেক স্টুডেন্ট ডাটা সেট (স্টাডি গ্রুপ ও মেন্টর ম্যাচ টেস্ট করার জন্য)
        $dummyUsers = [
            [
                'name' => 'Arefin Rahman',
                'email' => 'arefin@gmail.com',
                'known_skills' => 'React, Laravel, Tailwind',
                'interested_skills' => 'Python, Machine Learning, Docker',
            ],
            [
                'name' => 'Sabiha Yasmin',
                'email' => 'sabiha@gmail.com',
                'known_skills' => 'Python, Machine Learning',
                'interested_skills' => 'React, Web Development',
            ],
            [
                'name' => 'Tanvir Hasan',
                'email' => 'tanvir@gmail.com',
                'known_skills' => 'Figma, UI/UX Design',
                'interested_skills' => 'React, Python, Laravel',
            ],
            [
                'name' => 'Nusrat Jahan',
                'email' => 'nusrat@gmail.com',
                'known_skills' => 'Docker, Python',
                'interested_skills' => 'React, UI/UX Design',
            ],
        ];

        foreach ($dummyUsers as $userData) {
            User::updateOrCreate(
                ['email' => $userData['email']],
                array_merge($userData, ['password' => $password])
            );
        }
    }
}
