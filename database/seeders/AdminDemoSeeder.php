<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Seminar;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminDemoSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin Account
        User::updateOrCreate(
            ['email' => 'admin@versity.edu'],
            [
                'name' => 'Department Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'department' => 'CSE',
            ]
        );

        // 2. Mentors with common skills (C++, Web Dev)
        User::create([
            'name' => 'Rahul Sharma',
            'email' => 'rahul@student.edu',
            'password' => Hash::make('password'),
            'role' => 'student',
            'known_skills' => 'C++, Python, React',
            'interested_skills' => 'Machine Learning',
            'department' => 'CSE',
        ]);

        User::create([
            'name' => 'Anika Rahman',
            'email' => 'anika@student.edu',
            'password' => Hash::make('password'),
            'role' => 'student',
            'known_skills' => 'React, DBMS, Node.js',
            'interested_skills' => 'Blockchain',
            'department' => 'CSE',
        ]);

        // 3. Students demanding high gap skills (Blockchain, Machine Learning, DevOps) but ZERO mentors!
        $gapDemandingStudents = [
            ['name' => 'Sabbir Ahmed', 'email' => 'sabbir@student.edu', 'interests' => 'Blockchain, Machine Learning, React'],
            ['name' => 'Tania Akter', 'email' => 'tania@student.edu', 'interests' => 'Blockchain, DevOps, Python'],
            ['name' => 'Arafat Hossain', 'email' => 'arafat@student.edu', 'interests' => 'Blockchain, Machine Learning, C++'],
            ['name' => 'Nusrat Jahan', 'email' => 'nusrat@student.edu', 'interests' => 'Machine Learning, Cyber Security'],
            ['name' => 'Mehredi Hasan', 'email' => 'mehredi@student.edu', 'interests' => 'Blockchain, DevOps'],
        ];

        foreach ($gapDemandingStudents as $student) {
            User::create([
                'name' => $student['name'],
                'email' => $student['email'],
                'password' => Hash::make('password'),
                'role' => 'student',
                'known_skills' => null,
                'interested_skills' => $student['interests'],
                'department' => 'CSE',
            ]);
        }

        // 4. Initial Seminar
        Seminar::create([
            'title' => 'Hands-on Web Development BootCamp',
            'skill_name' => 'React',
            'description' => 'A introductory session on building modern Web Apps.',
            'speaker_name' => 'Anika Rahman',
            'location' => 'Lab 302',
        ]);
    }
}
