import { Head } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';
import { Users, Clock, CheckCircle, FileText, Send, Heart } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Dashboard({ stats }) {
    const statCards = [
        { label: 'মোট ব্যবহারকারী', value: stats.total_users, icon: Users, color: 'from-blue-500 to-blue-600', href: '/admin/users' },
        { label: 'অপেক্ষমাণ', value: stats.pending_users, icon: Clock, color: 'from-yellow-500 to-yellow-600', href: '/admin/pending-users' },
        { label: 'অনুমোদিত', value: stats.approved_users, icon: CheckCircle, color: 'from-emerald-500 to-emerald-600', href: '/admin/users?status=approved' },
        { label: 'মোট বায়োডাটা', value: stats.total_biodatas, icon: FileText, color: 'from-purple-500 to-purple-600', href: '/admin/users' },
        { label: 'মোট প্রস্তাব', value: stats.total_proposals, icon: Heart, color: 'from-primary-500 to-primary-600', href: '/admin/proposals' },
        { label: 'অপেক্ষমাণ প্রস্তাব', value: stats.pending_proposals, icon: Send, color: 'from-accent-500 to-accent-600', href: '/admin/proposals' },
    ];

    return (
        <Layout>
            <Head title="অ্যাডমিন ড্যাশবোর্ড" />

            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-100">অ্যাডমিন ড্যাশবোর্ড</h1>
                    <p className="text-slate-500 dark:text-dark-400 mt-1">সহজ বিয়ে প্ল্যাটফর্ম পরিচালনা</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statCards.map((stat, i) => (
                        <Link key={i} href={stat.href} className="glass-card p-6 group hover:border-primary-500/30 transition-all duration-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-500 dark:text-dark-400 text-sm">{stat.label}</p>
                                    <p className="text-3xl font-bold text-slate-900 dark:text-dark-100 mt-1">{stat.value}</p>
                                </div>
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="w-7 h-7 text-white" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
