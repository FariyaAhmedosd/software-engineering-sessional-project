import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        batch: user.batch || '',
        department: user.department || '',
        known_skills: user.known_skills || '',
        interested_skills: user.interested_skills || '',
        whatsapp_number: user.whatsapp_number || '',
        profile_photo: null, // ইমেজের জন্য
    });

 const submit = (e) => {
    e.preventDefault();

    // একদম ডাইরেক্ট পোস্ট রিকোয়েস্ট
    post(route('profile.update'), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => alert("Success! Profile updated."),
        onError: (errors) => console.log(errors),
    });
};

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Profile Information</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6" encType="multipart/form-data">
                {/* প্রোফাইল ফটো প্রিভিউ */}
                {user.profile_photo && (
                    <div className="mt-2">
                        <img 
                            src={`/uploads/profiles/${user.profile_photo}`} 
                            className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500" 
                            alt="Current Profile" 
                        />
                    </div>
                )}

                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput id="name" className="mt-1 block w-full" value={data.name} onChange={(e) => setData('name', e.target.value)} required isFocused />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput id="email" type="email" className="mt-1 block w-full" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* প্রোফাইল ফটো ইনপুট */}
                <div>
                    <InputLabel htmlFor="profile_photo" value="Profile Photo" />
                    <input
                        id="profile_photo"
                        type="file"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        onChange={(e) => setData('profile_photo', e.target.files[0])}
                    />
                    <InputError className="mt-2" message={errors.profile_photo} />
                </div>

                {/* অন্যান্য ফিল্ডস (Batch, Skills ইত্যাদি) */}
                <div>
                    <InputLabel htmlFor="batch" value="Batch" />
                    <TextInput id="batch" className="mt-1 block w-full" value={data.batch} onChange={(e) => setData('batch', e.target.value)} />
                </div>

                <div>
                    <InputLabel htmlFor="known_skills" value="Known Skills (Ex: Java, Python)" />
                    <TextInput id="known_skills" className="mt-1 block w-full" value={data.known_skills} onChange={(e) => setData('known_skills', e.target.value)} />
                </div>

                <div>
                    <InputLabel htmlFor="interested_skills" value="Interested Skills" />
                    <TextInput id="interested_skills" className="mt-1 block w-full" value={data.interested_skills} onChange={(e) => setData('interested_skills', e.target.value)} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}