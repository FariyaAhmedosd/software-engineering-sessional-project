import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Dashboard({ auth, allUsers, recommendedMentors }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-6 bg-[#0f172a] min-h-screen text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* --- User Welcome & Profile Progress Section (1st Image Style) --- */}
                    <div className="flex items-center space-x-6 mb-8 mt-4">
                        <img 
                            src={auth.user.profile_photo || 'https://ui-avatars.com/api/?name=' + auth.user.name} 
                            className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-lg object-cover"
                            alt="Profile"
                        />
                        <div>
                            <h1 className="text-3xl font-bold">Welcome back, {auth.user.name}!</h1>
                            <p className="text-slate-400">Department: CSE</p>
                        </div>
                    </div>

                    <div className="bg-[#1e293b]/50 p-6 rounded-2xl border border-slate-800 mb-10">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Profile Completion</span>
                            <span className="text-sm font-bold text-indigo-400">100%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2.5">
                            <div className="bg-gradient-to-r from-purple-600 to-indigo-500 h-2.5 rounded-full w-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2 italic">* Complete your profile to get better mentor recommendations!</p>
                    </div>

                    {/* --- Recommended Mentors Section --- */}
                    <h3 className="text-xl font-bold text-indigo-400 mb-6 flex items-center">
                        <span className="mr-2">⭐</span> Recommended for You (Based on your interests)
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendedMentors && recommendedMentors.map((mentor) => {
                            const { data, setData, post, processing, reset } = useForm({
                                mentor_id: mentor.id,
                                skill_name: '',
                                message: '',
                            });

                            const submit = (e) => {
                                e.preventDefault();
                                post(route('mentorship.request'), {
                                    onSuccess: () => { reset(); alert(`Request sent to ${mentor.name}!`); },
                                });
                            };

                            return (
                                <div key={mentor.id} className="bg-[#1e293b] border border-indigo-500/30 rounded-2xl p-5 shadow-lg">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="w-12 h-12 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-lg font-bold text-lg uppercase">
                                            {mentor.name.substring(0, 2)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">{mentor.name}</h4>
                                            <p className="text-[10px] text-indigo-400 font-bold uppercase">{mentor.skills || 'Expert'}</p>
                                        </div>
                                    </div>

                                    <form onSubmit={submit} className="space-y-2">
                                        <input 
                                            type="text" 
                                            placeholder="What do you want to learn?" 
                                            className="w-full bg-slate-900/50 border-slate-700 rounded-lg text-xs py-2 focus:border-indigo-500"
                                            value={data.skill_name}
                                            onChange={e => setData('skill_name', e.target.value)}
                                            required
                                        />
                                        <button 
                                            disabled={processing}
                                            className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-lg font-bold text-xs shadow-md transition-all"
                                        >
                                            {processing ? '...' : 'Request Mentorship'}
                                        </button>
                                    </form>
                                </div>
                            );
                        })}
                    </div>

                    {/* --- All Members Section (Small Icons) --- */}
                    <div className="mt-16">
                        <h3 className="text-lg font-semibold text-slate-300 mb-6 flex items-center">
                            <span className="mr-2">🔍</span> All Members
                        </h3>
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                            {allUsers && allUsers.map((user) => (
                                <div key={user.id} className="text-center">
                                    <div className="w-12 h-12 bg-slate-800 rounded-full mx-auto mb-1 flex items-center justify-center border border-slate-700">
                                        <span className="text-[10px] font-bold text-slate-400">{user.name.substring(0, 2).toUpperCase()}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 truncate w-full px-1">{user.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}