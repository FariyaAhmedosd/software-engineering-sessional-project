import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

// মেন্টর কার্ডের জন্য আলাদা সাব-কম্পোনেন্ট (লুপের ভেতর useForm এরর ফিক্স করতে)
function MentorCard({ mentor }) {
    const { data, setData, post, processing, reset } = useForm({
        mentor_id: mentor.id,
        skill_name: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('mentorship.request'), {
            onSuccess: () => {
                reset();
                alert(`Request sent to ${mentor.name}!`);
            },
        });
    };

    return (
        <div className="bg-[#1e293b] border border-indigo-500/30 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
            <div>
                <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-lg font-bold text-lg uppercase shrink-0">
                        {mentor.name ? mentor.name.substring(0, 2) : 'ME'}
                    </div>
                    <div>
                        <h4 className="font-bold text-white">{mentor.name}</h4>
                        <p className="text-[10px] text-indigo-400 font-bold uppercase">
                            {mentor.known_skills || mentor.skills || 'Expert'}
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-2 mt-2">
                <input
                    type="text"
                    placeholder="What do you want to learn?"
                    className="w-full bg-slate-900/50 border-slate-700 rounded-lg text-xs py-2 text-white placeholder-slate-500 focus:border-indigo-500"
                    value={data.skill_name}
                    onChange={(e) => setData('skill_name', e.target.value)}
                    required
                />
                <button
                    disabled={processing}
                    type="submit"
                    className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-lg font-bold text-xs shadow-md transition-all text-white disabled:opacity-50"
                >
                    {processing ? 'Sending...' : 'Request Mentorship'}
                </button>
            </form>
        </div>
    );
}

export default function Dashboard({ auth, allUsers, recommendedMentors, studyGroupSuggestions }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-6 bg-[#0f172a] min-h-screen text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* --- User Welcome & Profile Progress Section --- */}
                    <div className="flex items-center space-x-6 mb-8 mt-4">
                        <img 
                            src={auth.user.profile_photo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(auth.user.name)} 
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

                    {/* --- Automated Peer Study Group Prompt Banner --- */}
                    {studyGroupSuggestions && studyGroupSuggestions.length > 0 && (
                        <div className="mb-10 p-5 bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 rounded-2xl border border-indigo-500/40 shadow-xl">
                            <h3 className="text-lg font-bold text-indigo-300 flex items-center mb-3">
                                <span className="mr-2 text-xl">🚀</span> Automated Peer Study Group Alert
                            </h3>
                            <div className="space-y-3">
                                {studyGroupSuggestions.map((group, idx) => (
                                    <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 gap-3">
                                        <div>
                                            <p className="font-semibold text-white text-sm">
                                                Great news! You and {group.total_students - 1} other peers want to practice <span className="text-yellow-400 font-bold">{group.skill}</span>.
                                            </p>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                A total of {group.total_students} students match this interest cohort.
                                            </p>
                                        </div>
                                        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-all shadow shrink-0">
                                            Join Study Group
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- Recommended Mentors Section --- */}
                    <h3 className="text-xl font-bold text-indigo-400 mb-6 flex items-center">
                        <span className="mr-2">⭐</span> Recommended for You (Based on your interests)
                    </h3>

                    {recommendedMentors && recommendedMentors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recommendedMentors.map((mentor) => (
                                <MentorCard key={mentor.id} mentor={mentor} />
                            ))}
                        </div>
                    ) : (
                        <div className="p-6 bg-[#1e293b]/30 rounded-xl border border-slate-800 text-center text-slate-400 text-sm mb-10">
                            No mentors currently match your exact interested skills. Try updating your profile interests!
                        </div>
                    )}

                    {/* --- All Members Section (Small Icons) --- */}
                    <div className="mt-16">
                        <h3 className="text-lg font-semibold text-slate-300 mb-6 flex items-center">
                            <span className="mr-2">🔍</span> All Members
                        </h3>
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                            {allUsers && allUsers.map((user) => (
                                <div key={user.id} className="text-center">
                                    <div className="w-12 h-12 bg-slate-800 rounded-full mx-auto mb-1 flex items-center justify-center border border-slate-700">
                                        <span className="text-[10px] font-bold text-slate-400">
                                            {user.name ? user.name.substring(0, 2).toUpperCase() : 'US'}
                                        </span>
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