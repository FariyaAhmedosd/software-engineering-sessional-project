import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="SkillChain - Connect, Learn, Grow" />
            
            {/* Main Wrapper with Black Background */}
            <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500">
                
                {/* --- Dark Navigation Bar --- */}
                <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto border-b border-slate-800">
                    {/* Project Name */}
                    <Link href="/" className="text-3xl font-black tracking-tighter text-indigo-400 hover:text-white transition-all">
                        SkillChain
                    </Link>
                    
                    {/* Auth Links */}
                    <div className="flex items-center space-x-4">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="text-sm font-semibold text-slate-400 hover:text-white transition">Dashboard</Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-sm font-semibold text-slate-400 hover:text-white transition">Log in</Link>
                                <Link href={route('register')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all active:scale-95">Register</Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* --- Main Content Area --- */}
                <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                    
                    {/* --- Dark Tech Banner Start --- */}
                    <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950/50 to-slate-900 py-20 px-8 md:px-16 rounded-[3rem] overflow-hidden shadow-[0_0_80px_rgba(79,70,229,0.1)] border border-slate-800">
                        
                        {/* Background Interactive Glows */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[90px] animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[70px]"></div>

                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            
                            {/* Left Side: Original Text with Dark Styling */}
                            <div className="text-left">
                                <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-indigo-300 uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                                    CSTU Peer-to-Peer Learning
                                </span>
                                <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tighter">
                                    Bridge the <br />
                                    <span className="text-indigo-400">Skill Gap</span><br />
                                    Within Your Campus.
                                </h1>
                                <p className="mt-8 text-slate-400 text-lg leading-relaxed max-w-lg">
                                    SkillChain connects students who want to learn with peers who are ready to mentor. No more searching online—find your mentor physically at your university.
                                </p>
                                <div className="mt-12 flex flex-wrap gap-4">
                                    <Link href={route('register')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
                                        Get Started Now
                                    </Link>
                                    <button className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-bold transition-all">
                                        How it Works
                                    </button>
                                </div>
                            </div>

                            {/* Right Side: Live Animation Area (Coder & Tech Icons) */}
                            <div className="relative hidden md:flex justify-center items-center">
                                <div className="relative w-80 h-80 flex items-center justify-center">
                                    
                                    {/* Central Main Glow (Mentor guiding concept) */}
                                    <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-pulse blur-3xl"></div>
                                    
                                    {/* Central Graphic (Concept of Coding/Learning) */}
                                    <div className="relative z-20 w-48 h-48 bg-slate-900 border-4 border-slate-800 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(79,70,229,0.3)]">
                                        <span className="text-6xl animate-bounce">🧑‍💻</span>
                                    </div>

                                    {/* --- Live Floating Tech Icons --- */}
                                    {/* Python */}
                                    <div className="absolute -top-6 left-10 w-16 h-16 bg-slate-800 border-2 border-green-400 rounded-3xl flex items-center justify-center shadow-2xl animate-[float_4s_ease-in-out_infinite]">
                                        <span className="text-3xl">🐍</span>
                                    </div>
                                    {/* C++ */}
                                    <div className="absolute top-10 -right-8 w-16 h-16 bg-slate-800 border-2 border-blue-400 rounded-3xl flex items-center justify-center shadow-2xl animate-[float_5s_ease-in-out_infinite_delay-1s]">
                                        <span className="text-white font-bold text-xl">C++</span>
                                    </div>
                                    {/* Java */}
                                    <div className="absolute bottom-10 -left-10 w-16 h-16 bg-slate-800 border-2 border-red-400 rounded-3xl flex items-center justify-center shadow-2xl animate-[float_3s_ease-in-out_infinite_delay-2s]">
                                        <span className="text-3xl">☕</span>
                                    </div>
                                    {/* AI/ML (Brain) */}
                                    <div className="absolute bottom-0 right-10 w-16 h-16 bg-slate-800 border-2 border-purple-400 rounded-3xl flex items-center justify-center shadow-2xl animate-[float_6s_ease-in-out_infinite_delay-3s]">
                                        <span className="text-3xl">🧠</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* --- Dark Tech Banner End --- */}

                </main>
            </div>

            {/* --- Keyframe Animation for Floating Icons --- */}
            <style  jsx  global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
            `}</style>
        </>
    );
}