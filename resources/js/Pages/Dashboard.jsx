import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Dashboard() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('tasks.store'), {
            onSuccess: () => setData('title', ''), // সেভ হওয়ার পর ইনপুট খালি হবে
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="flex items-center gap-4">
                            <input 
                                type="text" 
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                placeholder="Enter your skill task..."
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm flex-1"
                            />
                            <button 
                                type="submit" 
                                disabled={processing} 
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Task'}
                            </button>
                        </form>
                        {errors.title && <div className="text-red-500 mt-2">{errors.title}</div>}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}