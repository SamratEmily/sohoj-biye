import { Head, Link, router } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';
import { User, Search, Mail, Phone, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import Pagination from '../../Components/Pagination';

export default function AllUsers({ users, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/admin/users', { search, status }, { preserveState: true });
    };

    const statusConfig = {
        'pending': { label: 'অপেক্ষমাণ', color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30', icon: Clock },
        'approved': { label: 'অনুমোদিত', color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30', icon: CheckCircle },
        'rejected': { label: 'প্রত্যাখ্যানিত', color: 'text-red-400 bg-red-500/20 border-red-500/30', icon: XCircle },
    };

    return (
        <Layout>
            <Head title="সকল ব্যবহারকারী" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-100">সকল ব্যবহারকারী</h1>
                    <p className="text-slate-500 dark:text-dark-400 mt-1">প্ল্যাটফর্মের সকল নিবন্ধিত ব্যবহারকারী</p>
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                    <form onSubmit={handleSearch} className="flex-1 glass-card p-3 flex items-center space-x-3">
                        <Search className="w-5 h-5 text-slate-400 dark:text-dark-500" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="নাম, ইমেইল বা ফোন দিয়ে খুঁজুন..."
                            className="flex-1 bg-transparent border-none text-slate-700 dark:text-dark-200 placeholder-slate-400 dark:placeholder-dark-500 focus:ring-0 focus:outline-none text-sm"
                        />
                        <button type="submit" className="btn-primary py-1.5 px-4 text-sm">খুঁজুন</button>
                    </form>

                    <div className="flex space-x-2">
                        {[
                            { value: '', label: 'সকল' },
                            { value: 'pending', label: 'অপেক্ষমাণ' },
                            { value: 'approved', label: 'অনুমোদিত' },
                            { value: 'rejected', label: 'প্রত্যাখ্যানিত' },
                        ].map((s) => (
                            <button
                                key={s.value}
                                onClick={() => {
                                    setStatus(s.value);
                                    router.get('/admin/users', { search, status: s.value }, { preserveState: true });
                                }}
                                className={`px-4 py-2 rounded-xl text-sm transition-all ${status === s.value
                                        ? 'bg-primary-500/10 text-primary-600 border border-primary-500/30 dark:bg-primary-500/20 dark:text-primary-300'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-500/30 dark:bg-dark-800/50 dark:text-dark-400 dark:border-dark-700/30 dark:hover:border-dark-600'
                                    }`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Users List */}
                {users.data.length > 0 ? (
                    <div className="space-y-3">
                        {users.data.map((user) => {
                            const st = statusConfig[user.status];
                            const StatusIcon = st?.icon || Clock;
                            return (
                                <Link
                                    key={user.id}
                                    href={`/admin/users/${user.id}`}
                                    className="glass-card p-5 flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0 hover:border-primary-500/30 transition-all duration-300"
                                >
                                    <div className="flex items-center space-x-4">
                                        {user.profile_photo_url ? (
                                            <img src={user.profile_photo_url} alt="" className="w-12 h-12 rounded-xl object-cover ring-2 ring-dark-700/50" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                                <User className="w-6 h-6 text-white" />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-semibold text-slate-900 dark:text-dark-100">{user.name}</h3>
                                            <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-dark-400">
                                                <span className="flex items-center"><Mail className="w-3 h-3 mr-1" />{user.email}</span>
                                                <span className="flex items-center"><Phone className="w-3 h-3 mr-1" />{user.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`text-xs px-3 py-1 rounded-full border font-medium flex items-center space-x-1 w-fit ${st?.color}`}>
                                        <StatusIcon className="w-3 h-3" />
                                        <span>{st?.label}</span>
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="glass-card p-12 text-center">
                        <User className="w-16 h-16 text-slate-300 dark:text-dark-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-dark-100 mb-2">কোনো ব্যবহারকারী পাওয়া যায়নি</h3>
                    </div>
                )}

                <Pagination links={users.links} />
            </div>
        </Layout>
    );
}
