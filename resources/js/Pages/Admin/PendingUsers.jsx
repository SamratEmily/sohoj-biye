import { Head, Link } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';
import { User, Clock, Eye, Mail, Phone } from 'lucide-react';

export default function PendingUsers({ users }) {
    return (
        <Layout>
            <Head title="অপেক্ষমাণ ব্যবহারকারী" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-dark-100">অপেক্ষমাণ ব্যবহারকারী</h1>
                    <p className="text-dark-400 mt-1">নিবন্ধন অনুমোদনের অপেক্ষায় আছেন</p>
                </div>

                {users.data.length > 0 ? (
                    <div className="space-y-4">
                        {users.data.map((user) => (
                            <div key={user.id} className="glass-card p-6 hover:border-primary-500/30 transition-all duration-300">
                                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                                    <div className="flex items-center space-x-4">
                                        {user.profile_photo ? (
                                            <img src={`/storage/${user.profile_photo}`} alt="" className="w-14 h-14 rounded-xl object-cover ring-2 ring-dark-700/50" />
                                        ) : (
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                                <User className="w-7 h-7 text-white" />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-semibold text-dark-100">{user.name}</h3>
                                            <div className="flex items-center space-x-3 text-sm text-dark-400">
                                                <span className="flex items-center"><Mail className="w-3 h-3 mr-1" />{user.email}</span>
                                                <span className="flex items-center"><Phone className="w-3 h-3 mr-1" />{user.phone}</span>
                                            </div>
                                            <div className="flex items-center space-x-1 mt-1">
                                                <Clock className="w-3 h-3 text-yellow-400" />
                                                <span className="text-xs text-yellow-400">
                                                    {new Date(user.created_at).toLocaleDateString('bn-BD')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/admin/users/${user.id}`}
                                        className="btn-primary flex items-center space-x-2 text-sm py-2 px-5"
                                    >
                                        <Eye className="w-4 h-4" />
                                        <span>ডকুমেন্ট দেখুন</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="glass-card p-12 text-center">
                        <Clock className="w-16 h-16 text-dark-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-dark-100 mb-2">কোনো অপেক্ষমাণ ব্যবহারকারী নেই</h3>
                        <p className="text-dark-400">সকল নিবন্ধন পর্যালোচনা করা হয়েছে</p>
                    </div>
                )}

                {/* Pagination */}
                {users.links && users.links.length > 3 && (
                    <div className="flex justify-center space-x-2">
                        {users.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className={`px-4 py-2 rounded-xl text-sm transition-all ${link.active
                                        ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                                        : link.url
                                            ? 'bg-dark-800/50 text-dark-400 border border-dark-700/30 hover:border-dark-600'
                                            : 'bg-dark-800/30 text-dark-600'
                                    }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
