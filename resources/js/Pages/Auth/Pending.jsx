import { Head, Link } from '@inertiajs/react';
import { Heart, Clock, Mail, ArrowLeft } from 'lucide-react';

export default function Pending() {
    return (
        <>
            <Head title="অনুমোদনের অপেক্ষায়" />
            <div className="min-h-screen bg-slate-50 dark:bg-dark-950 flex items-center justify-center px-4 relative overflow-hidden transition-colors duration-300">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-1/4 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
                </div>

                <div className="relative w-full max-w-md text-center">
                    <div className="glass-card p-10">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mx-auto mb-6 animate-float">
                            <Clock className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-dark-100 mb-3">অনুমোদনের অপেক্ষায়</h1>
                        <p className="text-slate-600 dark:text-dark-400 leading-relaxed mb-6">
                            আপনার নিবন্ধন সফলভাবে জমা দেওয়া হয়েছে। অ্যাডমিন আপনার ডকুমেন্ট যাচাই করে অনুমোদন দিলে আপনাকে ইমেইলে জানানো হবে।
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-slate-400 dark:text-dark-500 mb-8">
                            <Mail className="w-5 h-5" />
                            <span className="text-sm">অনুমোদনের পর ইমেইল বিজ্ঞপ্তি পাবেন</span>
                        </div>
                        <Link href="/" className="btn-secondary inline-flex items-center space-x-2">
                            <ArrowLeft className="w-5 h-5" />
                            <span>হোম পেইজে ফিরে যান</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
