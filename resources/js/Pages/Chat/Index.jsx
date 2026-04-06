import { Head, Link } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';
import Pagination from '../../Components/Pagination';
import { MessageCircle, User } from 'lucide-react';

export default function Index({ chatRooms }) {
    return (
        <Layout>
            <Head title="চ্যাট" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-100">চ্যাট</h1>
                    <p className="text-slate-500 dark:text-dark-400 mt-1">আপনার কথোপকথনসমূহ</p>
                </div>

                {chatRooms.data.length > 0 ? (
                    <div className="space-y-4">
                        <div className="space-y-3">
                            {chatRooms.data.map((room) => (
                                <Link
                                    key={room.id}
                                    href={`/chat/${room.id}`}
                                    className="glass-card p-5 flex items-center space-x-4 hover:border-primary-500/30 transition-all duration-300 group"
                                >
                                    <div className="relative">
                                        {room.other_user.profile_photo ? (
                                            <img src={room.other_user.profile_photo} alt="" className="w-14 h-14 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-dark-700/50 group-hover:ring-primary-500/30 transition-all" />
                                        ) : (
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                                <User className="w-7 h-7 text-white" />
                                            </div>
                                        )}
                                        {room.unread_count > 0 && (
                                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                                                {room.unread_count}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-slate-900 dark:text-dark-100 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">{room.other_user.name}</h3>
                                        <p className="text-slate-500 dark:text-dark-400 text-sm truncate">
                                            {room.latest_message?.body || 'কোনো মেসেজ নেই'}
                                        </p>
                                    </div>
                                    {room.latest_message && (
                                        <span className="text-slate-400 dark:text-dark-600 text-xs flex-shrink-0">
                                            {new Date(room.latest_message.created_at).toLocaleDateString('bn-BD')}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                        <Pagination links={chatRooms.links} />
                    </div>
                ) : (
                    <div className="glass-card p-12 text-center">
                        <MessageCircle className="w-16 h-16 text-slate-300 dark:text-dark-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-dark-100 mb-2">কোনো চ্যাট রুম নেই</h3>
                        <p className="text-slate-500 dark:text-dark-400">অ্যাডমিন কোনো প্রস্তাবে চ্যাট অনুমোদন দিলে এখানে দেখা যাবে</p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
