import { useForm, Head, Link } from '@inertiajs/react';
import { Heart, Mail, Lock, Phone, User, Camera, FileText, ChevronRight, ChevronLeft, Upload, Eye, EyeOff } from 'lucide-react';
import { useState, useRef } from 'react';

export default function Register() {
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [previewPhoto, setPreviewPhoto] = useState(null);

    const { data, setData, post, processing, errors, progress } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        profile_photo: null,
        nid_document: null,
        testimonial_document: null,
        birth_certificate: null,
        transcript_document: null,
    });

    const fileInputRefs = {
        profile_photo: useRef(null),
        nid_document: useRef(null),
        testimonial_document: useRef(null),
        birth_certificate: useRef(null),
        transcript_document: useRef(null),
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Final validation for Step 3
        if (!data.nid_document) {
            alert('জাতীয় পরিচয়পত্র (NID) আপলোড করা আবশ্যক');
            return;
        }

        post('/register', {
            forceFormData: true,
            onSuccess: () => {
                // Done
            },
        });
    };

    const handleFileChange = (field, file) => {
        setData(field, file);
        if (field === 'profile_photo' && file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewPhoto(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const MAX_PHOTO_SIZE = 2 * 1024 * 1024; // 2MB

    const validateStep = (s) => {
        if (s === 1) {
            return (
                data.name.trim() !== '' &&
                data.email.trim() !== '' &&
                data.phone.trim() !== '' &&
                data.password.length >= 8 &&
                data.password === data.password_confirmation
            );
        }
        if (s === 2) {
            if (!data.profile_photo) return false;
            const isValidSize = data.profile_photo.size <= MAX_PHOTO_SIZE;
            const isValidType = data.profile_photo.type.startsWith('image/');
            return isValidSize && isValidType;
        }
        return true;
    };

    const nextStep = async () => {
        if (!validateStep(step)) {
            if (step === 1) {
                if (data.name.trim() === '') {
                    alert('আপনার পূর্ণ নাম লিখুন');
                } else if (data.email.trim() === '') {
                    alert('ইমেইল ঠিকানা লিখুন');
                } else if (data.phone.trim() === '') {
                    alert('ফোন নম্বর লিখুন');
                } else if (data.password.length < 8) {
                    alert('পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে');
                } else if (data.password !== data.password_confirmation) {
                    alert('পাসওয়ার্ড দুটি মিলছে না');
                }
            } else if (step === 2) {
                if (!data.profile_photo) {
                    alert('দয়া করে একটি প্রোফাইল ছবি আপলোড করুন');
                } else if (!data.profile_photo.type.startsWith('image/')) {
                    alert('সঠিক ছবি ফরম্যাট (JPG/PNG) নির্বাচন করুন');
                } else if (data.profile_photo.size > MAX_PHOTO_SIZE) {
                    alert('ছবির সাইজ ২MB এর নিচে হতে হবে');
                }
            }
            return;
        }

        if (step === 1) {
            try {
                // Check Email uniqueness
                const emailRes = await axios.post('/check-email', { email: data.email });
                if (emailRes.data.exists) {
                    alert('এই ইমেইল ইতিমধ্যে ব্যবহৃত হয়েছে');
                    return;
                }

                // Check Phone uniqueness
                const phoneRes = await axios.post('/check-phone', { phone: data.phone });
                if (phoneRes.data.exists) {
                    alert('এই ফোন নম্বর ইতিমধ্যে ব্যবহৃত হয়েছে');
                    return;
                }
            } catch (e) {
                console.error('Validation check failed:', e);
                // Fallback to allowing next step if server check fails (server validation will still catch it)
            }
        }

        setStep(Math.min(step + 1, 3));
        window.scrollTo(0, 0);
    };

    const prevStep = () => {
        setStep(Math.max(step - 1, 1));
        window.scrollTo(0, 0);
    };

    const steps = [
        { num: 1, label: 'ব্যক্তিগত তথ্য' },
        { num: 2, label: 'প্রোফাইল ছবি' },
        { num: 3, label: 'ডকুমেন্ট আপলোড' },
    ];

    const docFields = [
        { key: 'nid_document', label: 'জাতীয় পরিচয়পত্র (NID)', required: true, icon: FileText },
        { key: 'testimonial_document', label: 'প্রশংসাপত্র / সার্টিফিকেট', required: false, icon: FileText },
        { key: 'birth_certificate', label: 'জন্ম নিবন্ধন', required: false, icon: FileText },
        { key: 'transcript_document', label: 'ট্রান্সক্রিপ্ট / মার্কশিট', required: false, icon: FileText },
    ];

    return (
        <>
            <Head title="নিবন্ধন" />
            <div className="min-h-screen bg-slate-50 dark:bg-dark-950 flex items-center justify-center px-4 py-12 relative overflow-hidden transition-colors duration-300">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 right-1/4 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
                </div>

                <div className="relative w-full max-w-lg">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center space-x-3">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center animate-glow">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-3xl font-bold gradient-text">সহজ বিয়ে</span>
                        </Link>
                    </div>

                    {/* Step Indicator */}
                    <div className="flex items-center justify-center mb-8">
                        {steps.map((s, i) => (
                            <div key={s.num} className="flex items-center">
                                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${step >= s.num
                                        ? 'bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:bg-primary-500/20 dark:border-primary-500/30 dark:text-primary-300'
                                        : 'bg-white border border-slate-200 text-slate-400 dark:bg-dark-800/50 dark:border-dark-700/30 dark:text-dark-500'
                                    }`}>
                                    <span className="w-6 h-6 rounded-full bg-current/20 flex items-center justify-center text-sm font-bold">{s.num}</span>
                                    <span className="text-sm hidden sm:block">{s.label}</span>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className={`w-8 h-0.5 mx-1 transition-all ${step > s.num ? 'bg-primary-500' : 'bg-slate-200 dark:bg-dark-700'}`}></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    <div className="glass-card p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Step 1: Personal Info */}
                            {step === 1 && (
                                <div className="space-y-5 slide-up">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-dark-100 text-center mb-6">ব্যক্তিগত তথ্য</h2>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-2">পূর্ণ নাম *</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-dark-500" />
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="glass-input w-full pl-11"
                                                placeholder="আপনার পূর্ণ নাম"
                                            />
                                        </div>
                                        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-2">ইমেইল *</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-dark-500" />
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="glass-input w-full pl-11"
                                                placeholder="আপনার ইমেইল"
                                            />
                                        </div>
                                        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-2">ফোন নম্বর *</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-dark-500" />
                                            <input
                                                type="text"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className="glass-input w-full pl-11"
                                                placeholder="01XXXXXXXXX"
                                            />
                                        </div>
                                        {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-2">পাসওয়ার্ড *</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-dark-500" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                className="glass-input w-full pl-11 pr-11"
                                                placeholder="ন্যূনতম ৮ অক্ষর"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-dark-500 hover:text-slate-600 dark:hover:text-dark-300"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                        {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-2">পাসওয়ার্ড নিশ্চিত করুন *</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-dark-500" />
                                            <input
                                                type="password"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                className="glass-input w-full pl-11"
                                                placeholder="পাসওয়ার্ড পুনরায় লিখুন"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Profile Photo */}
                            {step === 2 && (
                                <div className="space-y-5 slide-up">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-dark-100 text-center mb-6">প্রোফাইল ছবি</h2>

                                    <div className="flex flex-col items-center">
                                        <div
                                            onClick={() => fileInputRefs.profile_photo.current?.click()}
                                            className="w-40 h-40 rounded-2xl border-2 border-dashed border-slate-200 dark:border-dark-600 hover:border-primary-500 transition-colors cursor-pointer overflow-hidden flex items-center justify-center bg-slate-50 dark:bg-dark-800/30 group"
                                        >
                                            {previewPhoto ? (
                                                <img src={previewPhoto} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-center">
                                                    <Camera className="w-10 h-10 text-slate-300 dark:text-dark-500 mx-auto mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors" />
                                                    <p className="text-slate-400 dark:text-dark-400 text-sm">ছবি আপলোড করুন</p>
                                                </div>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRefs.profile_photo}
                                            onChange={(e) => handleFileChange('profile_photo', e.target.files[0])}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        <p className="text-slate-400 dark:text-dark-500 text-sm mt-3">সর্বোচ্চ ২MB, JPG/PNG ফরম্যাট</p>
                                        {errors.profile_photo && <p className="mt-2 text-sm text-red-400">{errors.profile_photo}</p>}
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Documents */}
                            {step === 3 && (
                                <div className="space-y-5 slide-up">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-dark-100 text-center mb-2">ডকুমেন্ট আপলোড</h2>
                                    <p className="text-slate-500 dark:text-dark-400 text-sm text-center mb-6">যাচাইকরণের জন্য প্রয়োজনীয় ডকুমেন্ট আপলোড করুন</p>

                                    {docFields.map((doc) => (
                                        <div key={doc.key}>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-2">
                                                {doc.label} {doc.required && '*'}
                                            </label>
                                            <div
                                                onClick={() => fileInputRefs[doc.key].current?.click()}
                                                className="flex items-center space-x-3 p-4 rounded-xl border border-dashed border-slate-200 dark:border-dark-600 hover:border-primary-500 cursor-pointer transition-colors bg-slate-50 dark:bg-dark-800/30"
                                            >
                                                <Upload className="w-5 h-5 text-slate-400 dark:text-dark-500" />
                                                <span className="text-slate-400 dark:text-dark-400 text-sm">
                                                    {data[doc.key] ? data[doc.key].name : 'ক্লিক করে আপলোড করুন'}
                                                </span>
                                            </div>
                                            <input
                                                type="file"
                                                ref={fileInputRefs[doc.key]}
                                                onChange={(e) => handleFileChange(doc.key, e.target.files[0])}
                                                accept="image/*,.pdf"
                                                className="hidden"
                                            />
                                            {errors[doc.key] && <p className="mt-1 text-sm text-red-400">{errors[doc.key]}</p>}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Navigation */}
                            <div className="flex justify-between pt-4">
                                {step > 1 ? (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="btn-secondary flex items-center space-x-2"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                        <span>আগের ধাপ</span>
                                    </button>
                                ) : <div></div>}

                                {step < 3 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="btn-primary flex items-center space-x-2"
                                    >
                                        <span>পরের ধাপ</span>
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="btn-primary flex items-center space-x-2"
                                    >
                                        <span>{processing ? 'জমা দেওয়া হচ্ছে...' : 'নিবন্ধন জমা দিন'}</span>
                                    </button>
                                )}
                            </div>

                            {/* Upload Progress */}
                            {progress && (
                                <div className="w-full bg-slate-200 dark:bg-dark-800 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${progress.percentage}%` }}
                                    ></div>
                                </div>
                            )}
                        </form>

                        <div className="mt-6 text-center">
                            <span className="text-slate-500 dark:text-dark-400">ইতিমধ্যে অ্যাকাউন্ট আছে? </span>
                            <Link href="/login" className="text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 font-medium transition-colors">
                                লগইন করুন
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
