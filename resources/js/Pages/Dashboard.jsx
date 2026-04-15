import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Dashboard({ auth, allUsers, recommendedMentors }) {
    const user = auth.user;
    
    // Dark Mode Logic
    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        SkillChain Dashboard
                    </h2>
                    <button 
                        onClick={() => setDarkMode(!darkMode)}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg text-sm font-bold transition"
                    >
                        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                    </button>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* প্রোফাইল পিকচার অংশ */}
    <img 
        src={auth.user.profile_photo 
            ? `/uploads/profiles/${auth.user.profile_photo}` 
            : `https://ui-avatars.com/api/?name=${auth.user.name}&background=random`} 
        className="w-20 h-20 rounded-full border-4 border-indigo-500 object-cover shadow-lg"
        alt={auth.user.name}
    />
    <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Welcome back, {auth.user.name}!
        </h2>
        <p className="text-sm text-gray-500">Department: {auth.user.department}</p>
    </div>

                    
                    {/* Welcome Card */}
                    {/* Profile Completion Progress Bar */}
<div className="bg-white dark:bg-gray-900 shadow-lg sm:rounded-2xl p-6 mb-8 border border-gray-100 dark:border-gray-800">
    <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-gray-600 dark:text-gray-400">Profile Completion</span>
        <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">
            {Math.round(
                ((user.whatsapp_number ? 1 : 0) + 
                 (user.known_skills ? 1 : 0) + 
                 (user.interested_skills ? 1 : 0) + 
                 (user.department ? 1 : 0)) / 4 * 100
            )}%
        </span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
        <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-1000 ease-out"
            style={{ 
                width: `${((user.whatsapp_number ? 1 : 0) + 
                         (user.known_skills ? 1 : 0) + 
                         (user.interested_skills ? 1 : 0) + 
                         (user.department ? 1 : 0)) / 4 * 100}%` 
            }}
        ></div>
    </div>
    <p className="text-[10px] text-gray-400 mt-2 italic">* Complete your profile to get better mentor recommendations!</p>
</div>

                    {/* Recommended Mentors (Smart Matching) */}
                    {recommendedMentors && recommendedMentors.length > 0 && (
                        <div className="mb-12">
                            <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 flex items-center">
                                ⭐ Recommended for You (Based on your interests)
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {recommendedMentors.map((mentor) => (
                                    <div key={mentor.id} className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 p-5 rounded-2xl shadow-sm">
                                       <div className="flex items-center space-x-4">
    <img 
        src={mentor.profile_photo 
            ? `/uploads/profiles/${mentor.profile_photo}` 
            : `https://ui-avatars.com/api/?name=${mentor.name}&background=random`} 
        className="w-12 h-12 rounded-full object-cover border-2 border-indigo-400"
        alt={mentor.name}
    />
    <div>
        <h4 className="font-semibold text-gray-900 dark:text-white">{mentor.name}</h4>
        <p className="text-xs text-indigo-500 font-medium">{mentor.known_skills}</p>
    </div>
</div> 
                                        <p className="font-bold text-indigo-700 dark:text-indigo-300">{mentor.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{mentor.department}</p>
                                        <div className="mt-3 bg-white dark:bg-gray-800 p-2 rounded text-sm dark:text-gray-300">
                                            Expert in: <b>{mentor.known_skills}</b>
                                        </div>
                                        <a href={`https://wa.me/${mentor.whatsapp_number}`} target="_blank" className="mt-4 block text-center bg-green-500 text-white py-2 rounded-xl font-bold">WhatsApp</a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* All Users List */}
                    <div className="mt-12">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                            🔍 All Members
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allUsers.map((otherUser) => (
                                <div key={otherUser.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-2xl shadow-sm transition-colors">
                                    <p className="font-bold text-gray-900 dark:text-white">{otherUser.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{otherUser.department} • {otherUser.batch}</p>
                                    <div className="mt-3 bg-gray-50 dark:bg-gray-700 p-2 rounded text-sm text-gray-600 dark:text-gray-300 italic">
                                        Skills: {otherUser.known_skills || 'N/A'}
                                    </div>
                                    <a href={`https://wa.me/${otherUser.whatsapp_number}`} target="_blank" className="mt-4 block text-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-xl font-bold">Connect</a>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                </div>
            </div>
        </AuthenticatedLayout>
    );
}