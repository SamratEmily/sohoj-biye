import { Head, Link } from '@inertiajs/react';
import Layout from '../Layouts/Layout';
import { FileText, Send, MessageCircle, Heart, PlusCircle, Edit, Eye, ArrowRight } from 'lucide-react';

export default function Dashboard({ biodata, stats }) {
    return (
        <Layout>
            <Head title="ড্যাশবোর্ড" />

            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-dark-100">ড্যাশবোর্ড</h1>
                    <p className="text-dark-400 mt-1">আপনার সহজ বিয়ে অ্যাকাউন্ট</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'পাঠানো প্রস্তাব', value: stats.sent_proposals, icon: Send, color: 'from-blue-500 to-blue-600' },
                        { label: 'প্রাপ্ত প্রস্তাব', value: stats.received_proposals, icon: Heart, color: 'from-primary-500 to-primary-600' },
                        { label: 'চ্যাট রুম', value: stats.chat_rooms, icon: MessageCircle, color: 'from-emerald-500 to-emerald-600' },
                    ].map((stat, i) => (
                        <div key={i} className="glass-card p-6 group hover:border-primary-500/30 transition-all duration-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-dark-400 text-sm">{stat.label}</p>
                                    <p className="text-3xl font-bold text-dark-100 mt-1">{stat.value}</p>
                                </div>
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Biodata Section */}
                <div className="glass-card p-8">
                    {biodata ? (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-dark-100">আপনার বায়োডাটা</h2>
                                    <p className="text-dark-400 text-sm mt-1">
                                        {biodata.biodata_type === 'bride' ? 'পাত্রী' : 'পাত্র'} • {biodata.age} বছর • {biodata.district}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Link href={`/feed/${biodata.id}`} className="btn-secondary flex items-center space-x-2 text-sm py-2 px-4">
                                        <Eye className="w-4 h-4" />
                                        <span>দেখুন</span>
                                    </Link>
                                    <Link href={`/biodata/${biodata.id}/edit`} className="btn-primary flex items-center space-x-2 text-sm py-2 px-4">
                                        <Edit className="w-4 h-4" />
                                        <span>সম্পাদনা</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: 'পেশা', value: biodata.profession },
                                    { label: 'শিক্ষা', value: biodata.education_level },
                                    { label: 'ধর্ম', value: biodata.religion },
                                    { label: 'বৈবাহিক অবস্থা', value: biodata.marital_status === 'unmarried' ? 'অবিবাহিত' : biodata.marital_status === 'divorced' ? 'তালাকপ্রাপ্ত' : biodata.marital_status },
                                ].map((item, i) => (
                                    <div key={i} className="bg-dark-800/30 rounded-xl p-4">
                                        <p className="text-dark-500 text-xs">{item.label}</p>
                                        <p className="text-dark-200 font-medium mt-1">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <FileText className="w-16 h-16 text-dark-600 mx-auto mb-4" />
                            <h2 className="text-xl font-bold text-dark-100 mb-2">এখনও বায়োডাটা তৈরি হয়নি</h2>
                            <p className="text-dark-400 mb-6">আপনার বায়োডাটা পোস্ট করুন এবং জীবনসঙ্গী খুঁজুন</p>
                            <Link href="/biodata/create" className="btn-primary inline-flex items-center space-x-2">
                                <PlusCircle className="w-5 h-5" />
                                <span>বায়োডাটা তৈরি করুন</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/feed" className="glass-card p-6 hover:border-primary-500/30 transition-all duration-500 group">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Heart className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-dark-100">বায়োডাটা দেখুন</h3>
                                    <p className="text-dark-400 text-sm">পাত্র/পাত্রীর বায়োডাটা ব্রাউজ করুন</p>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-dark-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                        </div>
                    </Link>

                    <Link href="/proposals" className="glass-card p-6 hover:border-primary-500/30 transition-all duration-500 group">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Send className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-dark-100">আমার প্রস্তাবসমূহ</h3>
                                    <p className="text-dark-400 text-sm">পাঠানো ও প্রাপ্ত প্রস্তাবসমূহ</p>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-dark-500 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                        </div>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
