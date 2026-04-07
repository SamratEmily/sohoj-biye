import { Head, Link } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';
import { Send, User, XCircle, MessageCircle, Clock, Heart } from 'lucide-react';
import Pagination from '../../Components/Pagination';

export default function Proposals({ proposals }) {
    const statusConfig = {
        'pending': { label: 'অপেক্ষমাণ', color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30', icon: Clock },
        'approved': { label: 'গৃহীত (চ্যাট চালু)', color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30', icon: MessageCircle },
        'rejected': { label: 'প্রত্যাখ্যানিত', color: 'text-red-400 bg-red-500/20 border-red-500/30', icon: XCircle },
    };

    return (
        <Layout>
            <Head title="প্রস্তাব পরিচালনা" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-100">প্রস্তাব পরিচালনা</h1>
                    <p className="text-slate-500 dark:text-dark-400 mt-1">সকল প্রস্তাব পর্যালোচনা করুন</p>
                </div>

                {proposals.data.length > 0 ? (
                    <div className="space-y-4">
                        {proposals.data.map((proposal) => {
                            const st = statusConfig[proposal.status];
                            const StatusIcon = st?.icon || Clock;

                            return (
                                <div key={proposal.id} className="glass-card p-6 hover:border-primary-500/30 transition-all duration-300">
                                    <div className="flex flex-col lg:flex-row lg:items-start justify-between space-y-4 lg:space-y-0">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <span className={`text-xs px-3 py-1 rounded-full border font-medium flex items-center space-x-1 ${st?.color}`}>
                                                    <StatusIcon className="w-3 h-3" />
                                                    <span>{st?.label}</span>
                                                </span>
                                                <span className="text-dark-600 text-xs">#{proposal.id}</span>
                                            </div>

                                            <div className="flex items-center space-x-3 mb-3">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                                        <User className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="text-slate-700 dark:text-dark-200 font-medium">{proposal.sender?.name}</span>
                                                </div>
                                                <Heart className="w-4 h-4 text-primary-400" />
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                                                        <User className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="text-slate-700 dark:text-dark-200 font-medium">{proposal.receiver?.name}</span>
                                                </div>
                                            </div>

                                            <div className="bg-slate-50 dark:bg-dark-800/30 rounded-xl p-4 space-y-2 border border-slate-100 dark:border-transparent">
                                                <p className="text-slate-600 dark:text-dark-300 text-sm"><strong className="text-slate-900 dark:text-dark-200">কেন পছন্দ:</strong> {proposal.why_prefer}</p>
                                                {proposal.kabin_nama_expectations && (
                                                    <p className="text-slate-500 dark:text-dark-400 text-sm"><strong className="text-slate-700 dark:text-dark-300">কাবিননামা:</strong> {proposal.kabin_nama_expectations}</p>
                                                )}
                                                {proposal.gold_jewelry_expectations && (
                                                    <p className="text-slate-500 dark:text-dark-400 text-sm"><strong className="text-slate-700 dark:text-dark-300">স্বর্ণালঙ্কার:</strong> {proposal.gold_jewelry_expectations}</p>
                                                )}
                                            </div>

                                            <p className="text-slate-400 dark:text-dark-600 text-xs mt-2">
                                                {new Date(proposal.created_at).toLocaleDateString('bn-BD')}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="glass-card p-12 text-center">
                        <Send className="w-16 h-16 text-slate-300 dark:text-dark-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-dark-100 mb-2">কোনো প্রস্তাব পাওয়া যায়নি</h3>
                    </div>
                )}

                <Pagination links={proposals.links} />
            </div>
        </Layout>
    );
}
