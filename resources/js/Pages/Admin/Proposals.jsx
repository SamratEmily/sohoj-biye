import { Head, Link, router } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';
import { Send, User, CheckCircle, XCircle, MessageCircle, Clock, Heart } from 'lucide-react';
import { useState } from 'react';

export default function Proposals({ proposals }) {
    const [rejectingId, setRejectingId] = useState(null);
    const [rejectNote, setRejectNote] = useState('');

    const handleApprove = (id) => {
        router.post(`/admin/proposals/${id}/approve`, {}, { preserveScroll: true });
    };

    const handleReject = (id) => {
        router.post(`/admin/proposals/${id}/reject`, { note: rejectNote }, { preserveScroll: true });
        setRejectingId(null);
        setRejectNote('');
    };

    const statusConfig = {
        'pending': { label: 'অপেক্ষমাণ', color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30', icon: Clock },
        'approved': { label: 'অনুমোদিত (চ্যাট চালু)', color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30', icon: MessageCircle },
        'rejected': { label: 'প্রত্যাখ্যানিত', color: 'text-red-400 bg-red-500/20 border-red-500/30', icon: XCircle },
    };

    return (
        <Layout>
            <Head title="প্রস্তাব পরিচালনা" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-dark-100">প্রস্তাব পরিচালনা</h1>
                    <p className="text-dark-400 mt-1">সকল প্রস্তাব পর্যালোচনা করুন</p>
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
                                                    <span className="text-dark-200 font-medium">{proposal.sender?.name}</span>
                                                </div>
                                                <Heart className="w-4 h-4 text-primary-400" />
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                                                        <User className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="text-dark-200 font-medium">{proposal.receiver?.name}</span>
                                                </div>
                                            </div>

                                            <div className="bg-dark-800/30 rounded-xl p-4 space-y-2">
                                                <p className="text-dark-300 text-sm"><strong className="text-dark-200">কেন পছন্দ:</strong> {proposal.why_prefer}</p>
                                                {proposal.kabin_nama_expectations && (
                                                    <p className="text-dark-400 text-sm"><strong className="text-dark-300">কাবিননামা:</strong> {proposal.kabin_nama_expectations}</p>
                                                )}
                                                {proposal.gold_jewelry_expectations && (
                                                    <p className="text-dark-400 text-sm"><strong className="text-dark-300">স্বর্ণালঙ্কার:</strong> {proposal.gold_jewelry_expectations}</p>
                                                )}
                                            </div>

                                            <p className="text-dark-600 text-xs mt-2">
                                                {new Date(proposal.created_at).toLocaleDateString('bn-BD')}
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        {proposal.status === 'pending' && (
                                            <div className="flex flex-col space-y-2 lg:ml-6">
                                                <button onClick={() => handleApprove(proposal.id)} className="btn-success flex items-center space-x-2 text-sm">
                                                    <CheckCircle className="w-4 h-4" />
                                                    <span>অনুমোদন</span>
                                                </button>
                                                <button onClick={() => setRejectingId(proposal.id)} className="btn-danger flex items-center space-x-2 text-sm">
                                                    <XCircle className="w-4 h-4" />
                                                    <span>প্রত্যাখ্যান</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Reject Note Form */}
                                    {rejectingId === proposal.id && (
                                        <div className="mt-4 pt-4 border-t border-dark-700/30 slide-up">
                                            <textarea
                                                value={rejectNote}
                                                onChange={(e) => setRejectNote(e.target.value)}
                                                rows={2}
                                                className="glass-input w-full text-sm mb-3"
                                                placeholder="প্রত্যাখ্যানের কারণ (ঐচ্ছিক)"
                                            />
                                            <div className="flex space-x-2">
                                                <button onClick={() => handleReject(proposal.id)} className="btn-danger text-sm py-1.5 px-4">
                                                    নিশ্চিত
                                                </button>
                                                <button onClick={() => setRejectingId(null)} className="btn-secondary text-sm py-1.5 px-4">
                                                    বাতিল
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="glass-card p-12 text-center">
                        <Send className="w-16 h-16 text-dark-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-dark-100 mb-2">কোনো প্রস্তাব পাওয়া যায়নি</h3>
                    </div>
                )}

                {/* Pagination */}
                {proposals.links && proposals.links.length > 3 && (
                    <div className="flex justify-center space-x-2">
                        {proposals.links.map((link, i) => (
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
