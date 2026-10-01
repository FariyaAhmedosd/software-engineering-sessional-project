import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function AdminDashboard({ auth, totalStudents, totalMentors, chartData, criticalGaps, seminars }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedGapSkill, setSelectedGapSkill] = useState('');

    const { data, setData, post, processing, reset } = useForm({
        title: '',
        skill_name: '',
        description: '',
        location: 'Auditorium',
    });

    const openWorkshopModal = (skillName) => {
        setSelectedGapSkill(skillName);
        setData({
            title: `Special Seminar on ${skillName}`,
            skill_name: skillName,
            description: `To address the growing institutional skill gap in ${skillName}, this workshop will cover foundational to advanced concepts.`,
            location: 'Auditorium / Central Computer Lab',
        });
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.seminars.store'), {
            onSuccess: () => {
                reset();
                setShowModal(false);
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-slate-100 leading-tight">Admin Skill Analytics & Control Panel</h2>}
        >
            <Head title="Admin Analytics" />

            <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-800">
                        <div>
                            <h1 className="text-2xl font-bold text-white">University Skill Analytics & Admin Panel</h1>
                            <p className="text-sm text-slate-400">Monitor student demands, mentor supplies, and bridge institutional gaps.</p>
                        </div>
                        <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-full font-semibold text-xs">
                            Admin Access
                        </span>
                    </div>

                    {/* Top Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-800">
                            <p className="text-sm text-slate-400 font-medium">Total Active Students</p>
                            <h3 className="text-3xl font-extrabold text-white mt-2">{totalStudents}</h3>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-800">
                            <p className="text-sm text-slate-400 font-medium">Available Mentors</p>
                            <h3 className="text-3xl font-extrabold text-indigo-400 mt-2">{totalMentors}</h3>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-800">
                            <p className="text-sm text-slate-400 font-medium">Identified Critical Gaps</p>
                            <h3 className="text-3xl font-extrabold text-rose-500 mt-2">{criticalGaps ? criticalGaps.length : 0}</h3>
                        </div>
                    </div>

                    {/* Main Graph & Gap Alert Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Demand vs Supply Chart */}
                        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-800">
                            <h2 className="text-lg font-bold text-white mb-4">Institutional Skill Demand vs Mentor Supply</h2>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                        <XAxis dataKey="skill" stroke="#94a3b8" />
                                        <YAxis stroke="#94a3b8" />
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                                        <Legend />
                                        <Bar dataKey="demand" name="Student Demand (Interested)" fill="#818cf8" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="supply" name="Mentor Supply (Known)" fill="#34d399" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Critical Skill Gap Reports */}
                        <div className="bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-800 flex flex-col justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                    🚨 Critical Skill Gap Report
                                </h2>
                                <p className="text-xs text-slate-400 mb-4">
                                    System flagged technologies with high student demand but zero/low mentorship capacity.
                                </p>

                                <div className="space-y-4 max-h-80 overflow-y-auto">
                                    {!criticalGaps || criticalGaps.length === 0 ? (
                                        <p className="text-sm text-slate-400">No critical skill gaps detected currently.</p>
                                    ) : (
                                        criticalGaps.map((gap, index) => (
                                            <div key={index} className="p-4 bg-rose-950/40 rounded-lg border border-rose-800/50">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-bold text-rose-300">{gap.skill}</h4>
                                                    <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs px-2 py-0.5 rounded font-bold">
                                                        Gap Flagged
                                                    </span>
                                                </div>
                                                <p className="text-xs text-rose-300/80 mt-1">
                                                    Demand: <strong>{gap.demand} students</strong> | Mentors: <strong>{gap.supply} available</strong>
                                                </p>
                                                <button
                                                    onClick={() => openWorkshopModal(gap.skill)}
                                                    className="mt-3 w-full bg-rose-600 hover:bg-rose-700 text-white text-xs py-2 rounded-md font-semibold transition shadow-sm"
                                                >
                                                    ➕ Organize Seminar/Workshop
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Workshops / Seminars Section */}
                    <div className="bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-800">
                        <h2 className="text-lg font-bold text-white mb-4">University Organized Seminars & Workshops</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {seminars && seminars.map((seminar) => (
                                <div key={seminar.id} className="p-4 rounded-lg bg-slate-800/60 border border-slate-700">
                                    <span className="bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs px-2 py-0.5 rounded font-semibold">
                                        {seminar.skill_name}
                                    </span>
                                    <h3 className="font-bold text-white mt-2">{seminar.title}</h3>
                                    <p className="text-xs text-slate-400 mt-1">{seminar.description}</p>
                                    <div className="mt-3 text-xs text-slate-400 flex justify-between pt-2 border-t border-slate-700/50">
                                        <span>📍 {seminar.location}</span>
                                        <span>👤 {seminar.speaker_name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Organize Seminar Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-xl shadow-2xl p-6 max-w-md w-full">
                            <h2 className="text-lg font-bold text-white mb-4">Organize Workshop for {selectedGapSkill}</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Seminar Title</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full bg-slate-800 border-slate-700 text-white rounded-lg text-sm focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Target Skill</label>
                                    <input
                                        type="text"
                                        value={data.skill_name}
                                        onChange={(e) => setData('skill_name', e.target.value)}
                                        className="w-full bg-slate-800/50 border-slate-700 text-slate-400 rounded-lg text-sm"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Location / Venue</label>
                                    <input
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        className="w-full bg-slate-800 border-slate-700 text-white rounded-lg text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full bg-slate-800 border-slate-700 text-white rounded-lg text-sm"
                                        rows="3"
                                    ></textarea>
                                </div>

                                <div className="flex justify-end gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg font-semibold"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-lg font-semibold"
                                    >
                                        Publish Workshop
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}