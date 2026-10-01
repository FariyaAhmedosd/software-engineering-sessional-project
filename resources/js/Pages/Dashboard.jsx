import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

// 📌 Mentor Card Sub-Component (With Batch & Department)
function MentorCard({ mentor }) {
    const { data, setData, post, processing, reset } = useForm({
        mentor_id: mentor ? mentor.id : '',
        skill_name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('mentorship.request'), {
            onSuccess: () => {
                reset('skill_name');
                alert(`Mentorship request sent to ${mentor.name}!`);
            },
        });
    };

    return (
        <div className="bg-[#1e293b] border border-indigo-500/30 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
            <div>
                <div className="flex items-center space-x-4 mb-4">
                    {mentor.profile_photo ? (
                        <img 
                            src={mentor.profile_photo} 
                            alt={mentor.name} 
                            className="w-12 h-12 rounded-lg object-cover border border-indigo-500/40 shrink-0" 
                        />
                    ) : (
                        <div className="w-12 h-12 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-lg font-bold text-lg uppercase shrink-0">
                            {mentor.name ? mentor.name.substring(0, 2) : 'ME'}
                        </div>
                    )}
                    <div>
                        <h4 className="font-bold text-white text-base">{mentor.name}</h4>
                        <p className="text-[10px] text-indigo-400 font-bold uppercase">
                            {mentor.known_skills || mentor.skills || 'EXPERT'}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                            {mentor.department || 'CSE'} {mentor.batch ? `• Batch ${mentor.batch}` : ''}
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-2 mt-2">
                <input
                    type="text"
                    placeholder="What do you want to learn?"
                    className="w-full bg-slate-900/50 border-slate-700 rounded-lg text-xs py-2 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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

// 📌 Main Student Dashboard Component
export default function Dashboard({ 
    auth = { user: {} }, 
    allUsers = [], 
    recommendedMentors = [], 
    studyGroupSuggestions = [], 
    learningResources = [], 
    seminars = [], 
    enrolledSeminarIds = [],
    mySentRequests = [],
    myReceivedRequests = []
}) {
    const [selectedGroup, setSelectedGroup] = useState(null);

    const handleJoinGroup = (skillName) => {
        setSelectedGroup(skillName);
    };

    const closeGroupModal = () => {
        setSelectedGroup(null);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-6 bg-[#0f172a] min-h-screen text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* --- User Welcome & Profile Header --- */}
                    <div className="flex items-center space-x-6 mb-8 mt-4">
                        {auth.user?.profile_photo ? (
                            <img 
                                src={auth.user.profile_photo} 
                                className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-lg object-cover"
                                alt={auth.user.name || 'Profile'}
                            />
                        ) : (
                            <div className="w-24 h-24 bg-indigo-100 text-indigo-800 rounded-full border-4 border-indigo-500 shadow-lg flex items-center justify-center text-3xl font-bold uppercase">
                                {auth.user?.name ? auth.user.name.substring(0, 2) : 'US'}
                            </div>
                        )}
                        <div>
                            <h1 className="text-3xl font-bold">Welcome back, {auth.user?.name || 'Student'}!</h1>
                            <p className="text-slate-400 mt-1">Department: {auth.user?.department || 'CSE'} {auth.user?.batch ? `| Batch ${auth.user.batch}` : ''}</p>
                        </div>
                    </div>

                    {/* --- Profile Completion Progress Bar --- */}
                    <div className="bg-[#1e293b]/50 p-6 rounded-2xl border border-slate-800 mb-10">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-slate-300">Profile Completion</span>
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
                                        <button
                                            onClick={() => handleJoinGroup(group.skill)}
                                            className="mt-2 sm:mt-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition shadow-md shrink-0"
                                        >
                                            Join Study Group
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- University Organized Workshops & Skill Gap Seminars --- */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg mb-10 text-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                    🏛️ University Organized Workshops & Seminars
                                </h2>
                                <p className="text-xs text-slate-400">
                                    Special sessions organized by the administration to bridge institutional skill gaps.
                                </p>
                            </div>
                            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs px-3 py-1 rounded-full font-semibold">
                                {seminars ? seminars.length : 0} Active Sessions
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {seminars && seminars.length > 0 ? (
                                seminars.map((seminar) => {
                                    const isEnrolled = enrolledSeminarIds.includes(seminar.id);

                                    return (
                                        <div key={seminar.id} className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/80 hover:border-indigo-500/50 transition flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <span className="bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs px-2 py-0.5 rounded font-semibold">
                                                        {seminar.skill_name}
                                                    </span>
                                                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                                                        Official
                                                    </span>
                                                </div>
                                                <h3 className="font-bold text-white mt-2">{seminar.title}</h3>
                                                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{seminar.description}</p>
                                            </div>

                                            <div className="mt-4 pt-3 border-t border-slate-700/50 text-xs text-slate-400 flex justify-between items-center">
                                                <span>📍 {seminar.location}</span>
                                                {isEnrolled ? (
                                                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] px-3 py-1 rounded font-bold">
                                                        ✓ Enrolled
                                                    </span>
                                                ) : (
                                                    <button
                                                        onClick={() => router.post(route('seminars.enroll', seminar.id))}
                                                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] px-2.5 py-1 rounded font-medium transition"
                                                    >
                                                        Enroll Now
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-xs text-slate-400 col-span-3">No upcoming workshops scheduled right now.</p>
                            )}
                        </div>
                    </div>

                    {/* --- Automated Learning Resource Engine (FR6) --- */}
                    {learningResources && learningResources.length > 0 && (
                        <div className="mb-10">
                            <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center">
                                <span className="mr-2">📚</span> Master Learning Paths & Verified Resources
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {learningResources.map((res, index) => (
                                    <div key={index} className="bg-slate-800/60 border border-emerald-500/30 rounded-xl p-4 shadow-md flex flex-col justify-between">
                                        <div className="mb-3">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-bold text-white text-base">{res.skill}</h4>
                                                {res.is_curated ? (
                                                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                                                        ⭐ Verified Complete Course
                                                    </span>
                                                ) : (
                                                    <span className="bg-slate-700 text-slate-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                                                        🔍 Auto Search
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-300 mt-2 flex items-center gap-1">
                                                <span>📖 Standard Book:</span> 
                                                <span className="text-amber-300 font-medium italic">{res.book}</span>
                                            </p>
                                        </div>
                                        
                                        <div className="flex space-x-2 pt-3 border-t border-slate-700/60">
                                            <a 
                                                href={res.youtube_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="px-3 py-1.5 bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition flex items-center gap-1"
                                            >
                                                <span>🎬</span> {res.is_curated ? 'Full Course Playlist' : 'YouTube Course'}
                                            </a>
                                            <a 
                                                href={res.book_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="px-3 py-1.5 bg-amber-600/90 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition flex items-center gap-1"
                                            >
                                                <span>📚</span> Read / Find Book
                                            </a>
                                            {res.doc_url && (
                                                <a 
                                                    href={res.doc_url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="px-3 py-1.5 bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition flex items-center gap-1"
                                                >
                                                    <span>🗺️</span> Roadmap
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- Mentorship Requests Management Grid --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        {/* Received Requests */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                📥 Incoming Mentorship Requests
                            </h3>
                            <p className="text-xs text-slate-400 mb-4">Requests sent by peers seeking your mentorship.</p>
                            <div className="space-y-3 max-h-52 overflow-y-auto">
                                {myReceivedRequests && myReceivedRequests.length > 0 ? (
                                    myReceivedRequests.map((req) => (
                                        <div key={req.id} className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 flex justify-between items-center text-xs">
                                            <div>
                                                <p className="font-bold text-white">{req.student?.name}</p>
                                                <p className="text-indigo-400">Skill: {req.skill_name}</p>
                                            </div>
                                            {req.status === 'pending' && (
                                                <div className="flex gap-2">
                                                    <button onClick={() => router.patch(route('mentorship.updateStatus', req.id), { status: 'accepted' })} className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded font-bold transition">Accept</button>
                                                    <button onClick={() => router.patch(route('mentorship.updateStatus', req.id), { status: 'rejected' })} className="bg-rose-600 hover:bg-rose-500 text-white px-2.5 py-1 rounded font-bold transition">Reject</button>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-slate-500">No mentorship requests received yet.</p>
                                )}
                            </div>
                        </div>

                        {/* Sent Requests */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                📤 My Mentorship Track
                            </h3>
                            <p className="text-xs text-slate-400 mb-4">Track requests you sent to senior mentors.</p>
                            <div className="space-y-3 max-h-52 overflow-y-auto">
                                {mySentRequests && mySentRequests.length > 0 ? (
                                    mySentRequests.map((req) => (
                                        <div key={req.id} className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 flex justify-between items-center text-xs">
                                            <div>
                                                <p className="font-bold text-white">Mentor: {req.mentor?.name}</p>
                                                <p className="text-indigo-400">Skill: {req.skill_name}</p>
                                            </div>
                                            <span className="uppercase text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-1 rounded font-bold">{req.status}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-slate-500">You haven't requested mentorship yet.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* --- Recommended Mentors Section --- */}
                    <h3 className="text-xl font-bold text-indigo-400 mb-6 flex items-center">
                        <span className="mr-2">⭐</span> Recommended for You (Based on your interests)
                    </h3>

                    {recommendedMentors && recommendedMentors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {recommendedMentors.map((mentor) => (
                                <MentorCard key={mentor.id} mentor={mentor} />
                            ))}
                        </div>
                    ) : (
                        <div className="p-6 bg-[#1e293b]/30 rounded-xl border border-slate-800 text-center text-slate-400 text-sm mb-10">
                            No mentors currently match your exact interested skills. Try updating your profile interests!
                        </div>
                    )}

                    {/* --- All Members Grid --- */}
                    <div className="mt-16 pb-12">
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

                {/* --- Study Group Join Modal --- */}
                {selectedGroup && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                        <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl text-center">
                            <div className="text-4xl mb-3">👥</div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Join {selectedGroup} Study Group
                            </h3>
                            <p className="text-sm text-slate-300 mb-6">
                                You are about to join the peer study cohort for <span className="text-indigo-400 font-semibold">{selectedGroup}</span>.
                            </p>
                            <div className="flex space-x-3 justify-center">
                                <button
                                    onClick={closeGroupModal}
                                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-semibold rounded-lg transition"
                                >
                                    Cancel
                                </button>
                                <a
                                    href="https://chat.whatsapp.com/sample-group-invite" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={closeGroupModal}
                                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-lg transition shadow-lg flex items-center gap-2"
                                >
                                    <span>💬</span> Open WhatsApp Group
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}