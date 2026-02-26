import { Head } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';
import { Send, Heart, Clock, CheckCircle, XCircle, MessageCircle, User } from 'lucide-react';

export default function Index({ sentProposals, receivedProposals }) {
    const statusLabels = {
        'pending': { label: 'অপেক্ষমাণ', color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30', icon: Clock },
        'approved': { label: 'অনুমোদিত (চ্যাট চালু)', color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30', icon: MessageCircle },
        'rejected': { label: 'প্রত্যাখ্যানিত', color: 'text-red-400 bg-red-500/20 border-red-500/30', icon: XCircle },
    };

    const ProposalCard = ({ proposal, type }) => {
        const status = statusLabels[proposal.status];
        const StatusIcon = status?.icon || Clock;
        const otherUser = type === 'sent' ? proposal.receiver : proposal.sender;

        return (
            <div className="glass-card p-6 hover:border-primary-500/30 transition-all duration-500">
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                        {otherUser?.profile_photo ? (
                            <img src={`/storage/${otherUser.profile_photo}`} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-dark-100 truncate">{otherUser?.name}</h3>
                            <span className={`text-xs px-3 py-1 rounded-full border font-medium flex items-center space-x-1 ${status?.color}`}>
                                <StatusIcon className="w-3 h-3" />
                                <span>{status?.label}</span>
                            </span>
                        </div>
                        <p className="text-dark-400 text-sm line-clamp-2 mb-2">{proposal.why_prefer}</p>
                        {proposal.kabin_nama_expectations && (
                            <p className="text-dark-500 text-xs"><strong>কাবিননামা:</strong> {proposal.kabin_nama_expectations}</p>
                        )}
                        {proposal.gold_jewelry_expectations && (
                            <p className="text-dark-500 text-xs mt-1"><strong>স্বর্ণালঙ্কার:</strong> {proposal.gold_jewelry_expectations}</p>
                        )}
                        <p className="text-dark-600 text-xs mt-2">
                            {new Date(proposal.created_at).toLocaleDateString('bn-BD')}
                        </p>
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
                    <h1 className="text-3xl font-bold text-dark-100">আমার প্রস্তাবসমূহ</h1>
                    <p className="text-dark-400 mt-1">পাঠানো ও প্রাপ্ত প্রস্তাব</p>
                </div>

                {/* Sent Proposals */}
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <Send className="w-5 h-5 text-primary-400" />
                        <h2 className="text-xl font-semibold text-dark-100">পাঠানো প্রস্তাব ({sentProposals.length})</h2>
                    </div>
                    {sentProposals.length > 0 ? (
                        <div className="grid gap-4">
                            {sentProposals.map((proposal) => (
                                <ProposalCard key={proposal.id} proposal={proposal} type="sent" />
                            ))}
                        </div>
                    ) : (
                        <div className="glass-card p-8 text-center">
                            <Send className="w-12 h-12 text-dark-600 mx-auto mb-3" />
                            <p className="text-dark-400">এখনও কোনো প্রস্তাব পাঠানো হয়নি</p>
                        </div>
                    )}
                </div>

                {/* Received Proposals */}
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <Heart className="w-5 h-5 text-primary-400" />
                        <h2 className="text-xl font-semibold text-dark-100">প্রাপ্ত প্রস্তাব ({receivedProposals.length})</h2>
                    </div>
                    {receivedProposals.length > 0 ? (
                        <div className="grid gap-4">
                            {receivedProposals.map((proposal) => (
                                <ProposalCard key={proposal.id} proposal={proposal} type="received" />
                            ))}
                        </div>
                    ) : (
                        <div className="glass-card p-8 text-center">
                            <Heart className="w-12 h-12 text-dark-600 mx-auto mb-3" />
                            <p className="text-dark-400">এখনও কোনো প্রস্তাব পাননি</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
