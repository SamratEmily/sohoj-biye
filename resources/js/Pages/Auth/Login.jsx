import { useForm, Head, Link } from '@inertiajs/react';
import { Heart, Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useState } from 'react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="লগইন" />
            <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-1/4 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
                </div>

                <div className="relative w-full max-w-md">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center space-x-3">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center animate-glow">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-3xl font-bold gradient-text">সহজ বিয়ে</span>
                        </Link>
                    </div>

                    {/* Login Form */}
                    <div className="glass-card p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-dark-100 mb-2">ফিরে আসুন!</h1>
                            <p className="text-dark-400">আপনার অ্যাকাউন্টে লগইন করুন</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-dark-300 mb-2">ইমেইল</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="glass-input w-full pl-11"
                                        placeholder="আপনার ইমেইল লিখুন"
                                    />
                                </div>
                                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-dark-300 mb-2">পাসওয়ার্ড</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="glass-input w-full pl-11 pr-11"
                                        placeholder="আপনার পাসওয়ার্ড লিখুন"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-4 h-4 rounded border-dark-700 bg-dark-800 text-primary-500 focus:ring-primary-500"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-dark-400">
                                    আমাকে মনে রাখুন
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-primary w-full flex items-center justify-center space-x-2"
                            >
                                <LogIn className="w-5 h-5" />
                                <span>{processing ? 'লগইন হচ্ছে...' : 'লগইন'}</span>
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <span className="text-dark-400">অ্যাকাউন্ট নেই? </span>
                            <Link href="/register" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                                নিবন্ধন করুন
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
