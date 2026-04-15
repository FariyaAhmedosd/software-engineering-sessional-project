import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to SkillChain" />
            <div className="relative min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-500 overflow-hidden">
                
                {/* Background Decoration - Sir-ke dekhale premium feel ashbe */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]"></div>
                </div>

                {/* Navbar */}
                <nav className="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
                    <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">
                        SKILLCHAIN
                    </div>
                    <div className="flex items-center space-x-6">
                        {auth.user ? (
                            <Link 
                                href={route('dashboard')} 
                                className="font-bold text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="font-bold text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition">Log in</Link>
                                <Link 
                                    href={route('register')} 
                                    className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition active:scale-95"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* --- HERO BANNER SECTION --- */}
                <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 lg:py-32">
                    {/* Badge */}
                    <div className="inline-block px-4 py-1.5 mb-8 text-[10px] font-black tracking-[0.2em] text-indigo-600 uppercase bg-indigo-100 dark:bg-indigo-900/40 dark:text-indigo-300 rounded-full shadow-sm">
                        CSTU Peer-to-Peer Learning
                    </div>
                    
                    {/* Main Heading */}
                    <h1 className="max-w-4xl text-5xl lg:text-7xl font-black leading-[1.1] text-gray-900 dark:text-white">
                        Bridge the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 italic">Skill Gap</span> <br /> 
                        Within Your Campus.
                    </h1>
                    
                    {/* Subtext */}
                    <p className="max-w-2xl mt-8 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        SkillChain connects students who want to learn with peers who are ready to mentor. 
                        No more searching online—find your mentor physically at your university.
                    </p>

                    {/* Buttons */}
                    <div className="mt-12 flex flex-col sm:flex-row gap-5">
                        <Link 
                            href={route('register')} 
                            className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-black rounded-2xl shadow-2xl shadow-indigo-500/40 transition-all hover:-translate-y-1 active:scale-95"
                        >
                            Get Started Now
                        </Link>
                        <a 
                            href="#how-it-works" 
                            className="px-10 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-lg font-black rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm"
                        >
                            How it Works
                        </a>
                    </div>

                    {/* Visual Element / Placeholder for Preview */}
                    <div className="mt-24 w-full max-w-5xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-2xl">
                             <div className="h-64 lg:h-[450px] bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center">
                                 <div className="text-indigo-500/30 text-6xl mb-4">🚀</div>
                                 <p className="text-gray-400 dark:text-gray-600 font-medium italic">Your Project Dashboard Preview will be here</p>
                             </div>
                        </div>
                    </div>
                </main>

                {/* Footer simple version */}
                <footer className="relative z-10 py-12 text-center text-gray-400 text-xs">
                    &copy; 2026 SkillChain Project. Developed for Software Engineering Sessional.
                </footer>
            </div>
        </>
    );
}