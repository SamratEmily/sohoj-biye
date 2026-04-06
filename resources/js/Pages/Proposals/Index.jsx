import { Head, Link, router } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';
import Pagination from '../../Components/Pagination';
import { Send, Heart, Clock, CheckCircle, XCircle, MessageCircle, User } from 'lucide-react';

export default function Index({ sentProposals, receivedProposals }) {
    const statusLabels = {
        'pending': { label: 'অপেক্ষমাণ', color: 'text-yellow-600 bg-yellow-500/10 border-yellow-500/20 dark:text-yellow-400 dark:bg-yellow-500/20 dark:border-yellow-500/30', icon: Clock },
        'approved': { label: 'গৃহীত (চ্যাট চালু)', color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20 dark:text-emerald-400 dark:bg-emerald-500/20 dark:border-emerald-500/30', icon: MessageCircle },
        'rejected': { label: 'প্রত্যাখ্যানিত', color: 'text-red-600 bg-red-500/10 border-red-500/20 dark:text-red-400 dark:bg-red-500/20 dark:border-red-500/30', icon: XCircle },
    };

    const handleAccept = (id) => {
        router.post(`/proposals/${id}/accept`, {}, { preserveScroll: true });
    };

    const handleReject = (id) => {
        if (confirm('আপনি কি এই প্রস্তাব প্রত্যাখ্যান করতে চান?')) {
            router.post(`/proposals/${id}/reject`, {}, { preserveScroll: true });
        }
    };

    const ProposalCard = ({ proposal, type }) => {
        const status = statusLabels[proposal.status];
        const StatusIcon = status?.icon || Clock;
        const otherUser = type === 'sent' ? proposal.receiver : proposal.sender;

        return (
            <div className="glass-card p-6 hover:border-primary-500/30 transition-all duration-500">
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                        {otherUser?.profile_photo_url ? (
                            <img src={otherUser.profile_photo_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                            <h3 className="font-semibold text-slate-900 dark:text-dark-100 truncate">{otherUser?.name}</h3>
                            <span className={`text-xs px-3 py-1 rounded-full border font-medium flex items-center space-x-1 ${status?.color}`}>
                                <StatusIcon className="w-3 h-3" />
                                <span>{status?.label}</span>
                            </span>
                        </div>
                        <p className="text-slate-600 dark:text-dark-400 text-sm line-clamp-2 mb-2">{proposal.why_prefer}</p>
                        {proposal.kabin_nama_expectations && (
                            <p className="text-slate-500 dark:text-dark-500 text-xs"><strong>কাবিননামা:</strong> {proposal.kabin_nama_expectations}</p>
                        )}
                        {proposal.gold_jewelry_expectations && (
                            <p className="text-slate-500 dark:text-dark-500 text-xs mt-1"><strong>স্বর্ণালঙ্কার:</strong> {proposal.gold_jewelry_expectations}</p>
                        )}
                        <p className="text-slate-400 dark:text-dark-600 text-xs mt-2">
                            {new Date(proposal.created_at).toLocaleDateString('bn-BD')}
                        </p>

                        {/* Receiver actions for pending proposals */}
                        {type === 'received' && proposal.status === 'pending' && (
                            <div className="flex items-center space-x-3 mt-4 pt-3 border-t border-slate-100 dark:border-dark-700/30">
                                <button
                                    onClick={() => handleAccept(proposal.id)}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 hover:bg-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30 transition-all text-sm font-medium"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    <span>গ্রহণ করুন</span>
                                </button>
                                <button
                                    onClick={() => handleReject(proposal.id)}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-600 border border-red-500/20 hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/30 transition-all text-sm font-medium"
                                >
                                    <XCircle className="w-4 h-4" />
                                    <span>প্রত্যাখ্যান করুন</span>
                                </button>
                            </div>
                        )}

                        {/* Chat button when proposal is accepted */}
                        {proposal.status === 'approved' && proposal.chat_room && (
                            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-dark-700/30">
                                <Link
                                    href={`/chat/${proposal.chat_room.id}`}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-primary-500/10 text-primary-600 border border-primary-500/20 hover:bg-primary-500/20 dark:bg-primary-500/20 dark:text-primary-300 dark:border-primary-500/30 transition-all text-sm font-medium w-fit"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    <span>চ্যাট করুন</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Layout>
            <Head title="আমার প্রস্তাবসমূহ" />

            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-100">আমার প্রস্তাবসমূহ</h1>
                    <p className="text-slate-500 dark:text-dark-400 mt-1">পাঠানো ও প্রাপ্ত প্রস্তাব</p>
                </div>

                {/* Received Proposals — shown first so receiver can act */}
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <Heart className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-dark-100">প্রাপ্ত প্রস্তাব ({receivedProposals.total})</h2>
                    </div>
                    {receivedProposals.data.length > 0 ? (
                        <div className="space-y-4">
                            <div className="grid gap-4">
                                {receivedProposals.data.map((proposal) => (
                                    <ProposalCard key={proposal.id} proposal={proposal} type="received" />
                                ))}
                            </div>
                            <Pagination links={receivedProposals.links} />
                        </div>
                    ) : (
                        <div className="glass-card p-8 text-center">
                            <Heart className="w-12 h-12 text-slate-300 dark:text-dark-600 mx-auto mb-3" />
                            <p className="text-slate-500 dark:text-dark-400">এখনও কোনো প্রস্তাব পাননি</p>
                        </div>
                    )}
                </div>

                {/* Sent Proposals */}
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <Send className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-dark-100">পাঠানো প্রস্তাব ({sentProposals.total})</h2>
                    </div>
                    {sentProposals.data.length > 0 ? (
                        <div className="space-y-4">
                            <div className="grid gap-4">
                                {sentProposals.data.map((proposal) => (
                                    <ProposalCard key={proposal.id} proposal={proposal} type="sent" />
                                ))}
                            </div>
                            <Pagination links={sentProposals.links} />
                        </div>
                    ) : (
                        <div className="glass-card p-8 text-center">
                            <Send className="w-12 h-12 text-slate-300 dark:text-dark-600 mx-auto mb-3" />
                            <p className="text-slate-500 dark:text-dark-400">এখনও কোনো প্রস্তাব পাঠানো হয়নি</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
