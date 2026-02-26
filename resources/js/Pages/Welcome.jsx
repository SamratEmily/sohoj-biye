import { Link, Head } from '@inertiajs/react';
import { Heart, Shield, Users, MessageCircle, Search, Star, ArrowRight, Sparkles } from 'lucide-react';

export default function Welcome() {
    return (
        <>
            <Head title="স্বাগতম" />
            <div className="min-h-screen bg-dark-950">
                {/* Navbar */}
                <nav className="fixed top-0 w-full z-50 bg-dark-950/80 backdrop-blur-xl border-b border-dark-800/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center animate-glow">
                                    <Heart className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold gradient-text">সহজ বিয়ে</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Link href="/login" className="btn-secondary text-sm py-2 px-5">লগইন</Link>
                                <Link href="/register" className="btn-primary text-sm py-2 px-5">নিবন্ধন করুন</Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
                        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="slide-up">
                            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8">
                                <Sparkles className="w-4 h-4 text-primary-400" />
                                <span className="text-primary-300 text-sm">বাংলাদেশের সবচেয়ে বিশ্বস্ত বিবাহ সেবা</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold mb-6">
                                <span className="gradient-text">সহজ বিয়ে</span>
                                <br />
                                <span className="text-dark-100">আপনার জীবনসঙ্গী খুঁজুন</span>
                            </h1>

                            <p className="text-lg md:text-xl text-dark-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                                নিরাপদ, বিশ্বস্ত এবং সহজ ম্যাট্রিমনি প্ল্যাটফর্ম। যাচাইকৃত প্রোফাইল, অ্যাডমিন মধ্যস্থতা এবং সম্পূর্ণ গোপনীয়তা সংরক্ষণ।
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <Link href="/register" className="btn-primary text-lg py-4 px-8 flex items-center space-x-2 group">
                                    <span>এখনই নিবন্ধন করুন</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link href="/login" className="btn-secondary text-lg py-4 px-8">
                                    লগইন করুন
                                </Link>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { number: '৫০০+', label: 'যাচাইকৃত প্রোফাইল' },
                                { number: '১০০+', label: 'সফল বিবাহ' },
                                { number: '৬৪', label: 'জেলা কাভারেজ' },
                                { number: '১০০%', label: 'নিরাপদ ও বিশ্বস্ত' },
                            ].map((stat, i) => (
                                <div key={i} className="glass-card p-6 text-center slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                    <div className="text-3xl font-bold gradient-text mb-1">{stat.number}</div>
                                    <div className="text-dark-400 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-dark-100 mb-4">কেন সহজ বিয়ে বেছে নিবেন?</h2>
                            <p className="text-dark-400 max-w-xl mx-auto">আমাদের প্ল্যাটফর্মে আপনি পাবেন সর্বোচ্চ বিশ্বস্ততা ও নিরাপত্তা</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Shield,
                                    title: 'যাচাইকৃত প্রোফাইল',
                                    desc: 'প্রতিটি প্রোফাইল এনআইডি ও ডকুমেন্ট যাচাই করে অনুমোদিত হয়',
                                    color: 'from-emerald-500 to-emerald-600',
                                },
                                {
                                    icon: Search,
                                    title: 'উন্নত সার্চ ফিল্টার',
                                    desc: 'বিভাগ, জেলা, উপজেলা, ধর্ম ও বয়স অনুযায়ী বায়োডাটা খুঁজুন',
                                    color: 'from-blue-500 to-blue-600',
                                },
                                {
                                    icon: MessageCircle,
                                    title: 'প্রাইভেট চ্যাট',
                                    desc: 'অ্যাডমিন অনুমোদনের পর নিরাপদ প্রাইভেট চ্যাটের সুবিধা',
                                    color: 'from-purple-500 to-purple-600',
                                },
                                {
                                    icon: Heart,
                                    title: 'প্রস্তাব সিস্টেম',
                                    desc: 'পছন্দের বায়োডাটায় কাবিননামা ও স্বর্ণালঙ্কার প্রত্যাশাসহ প্রস্তাব পাঠান',
                                    color: 'from-primary-500 to-primary-600',
                                },
                                {
                                    icon: Users,
                                    title: 'অ্যাডমিন মধ্যস্থতা',
                                    desc: 'প্রতিটি পদক্ষেপে অ্যাডমিনের তত্ত্বাবধান ও নিরাপত্তা',
                                    color: 'from-accent-500 to-accent-600',
                                },
                                {
                                    icon: Star,
                                    title: 'সম্পূর্ণ বাংলায়',
                                    desc: 'সহজ বাংলা ইন্টারফেস, বাংলাদেশি প্রেক্ষাপটে তৈরি',
                                    color: 'from-yellow-500 to-yellow-600',
                                },
                            ].map((feature, i) => (
                                <div key={i} className="glass-card p-8 hover:border-primary-500/30 transition-all duration-500 group slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                        <feature.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-dark-100 mb-3">{feature.title}</h3>
                                    <p className="text-dark-400 leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-20 bg-dark-900/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-dark-100 mb-4">কিভাবে কাজ করে?</h2>
                        </div>

                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                { step: '০১', title: 'নিবন্ধন করুন', desc: 'তথ্য ও ডকুমেন্ট জমা দিন' },
                                { step: '০২', title: 'অনুমোদন পান', desc: 'অ্যাডমিন আপনার প্রোফাইল যাচাই করবেন' },
                                { step: '০৩', title: 'বায়োডাটা পোস্ট করুন', desc: 'আপনার বিস্তারিত বায়োডাটা তৈরি করুন' },
                                { step: '০৪', title: 'প্রস্তাব পাঠান', desc: 'পছন্দের ব্যক্তিকে প্রস্তাব পাঠান' },
                            ].map((item, i) => (
                                <div key={i} className="text-center slide-up" style={{ animationDelay: `${i * 0.15}s` }}>
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-5 text-2xl font-bold text-white">
                                        {item.step}
                                    </div>
                                    <h3 className="text-lg font-semibold text-dark-100 mb-2">{item.title}</h3>
                                    <p className="text-dark-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="glass-card p-12 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10"></div>
                            <div className="relative">
                                <Heart className="w-16 h-16 text-primary-500 mx-auto mb-6 animate-float" />
                                <h2 className="text-3xl md:text-4xl font-bold text-dark-100 mb-4">আজই শুরু করুন আপনার যাত্রা</h2>
                                <p className="text-dark-400 mb-8 max-w-xl mx-auto">
                                    হাজারো যাচাইকৃত প্রোফাইল থেকে খুঁজে নিন আপনার জীবনসঙ্গী
                                </p>
                                <Link href="/register" className="btn-primary text-lg py-4 px-10 inline-flex items-center space-x-2 group">
                                    <span>বিনামূল্যে নিবন্ধন</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-dark-800/50 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <div className="flex items-center space-x-2">
                                <Heart className="w-5 h-5 text-primary-500" />
                                <span className="text-dark-400">সহজ বিয়ে - বাংলাদেশের বিশ্বস্ত বিবাহ সেবা</span>
                            </div>
                            <p className="text-dark-500 text-sm">© ২০২৪ সহজ বিয়ে। সর্বস্বত্ব সংরক্ষিত।</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
