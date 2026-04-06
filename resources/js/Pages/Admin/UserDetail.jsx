import { Head, useForm, Link, router } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';
import { ArrowLeft, User, Mail, Phone, CheckCircle, XCircle, FileText, Image, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function UserDetail({ user, documents }) {
    const [showRejectForm, setShowRejectForm] = useState(false);

    const approveForm = useForm({});
    const rejectForm = useForm({ reason: '' });

    const handleApprove = () => {
        approveForm.post(`/admin/users/${user.id}/approve`);
    };

    const handleReject = (e) => {
        e.preventDefault();
        rejectForm.post(`/admin/users/${user.id}/reject`);
    };

    const docItems = [
        { key: 'profile_photo', label: 'প্রোফাইল ছবি', icon: Image },
        { key: 'nid_document', label: 'জাতীয় পরিচয়পত্র (NID)', icon: FileText },
        { key: 'testimonial_document', label: 'প্রশংসাপত্র', icon: FileText },
        { key: 'birth_certificate', label: 'জন্ম নিবন্ধন', icon: FileText },
        { key: 'transcript_document', label: 'ট্রান্সক্রিপ্ট', icon: FileText },
    ];

    const statusColors = {
        'pending': 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
        'approved': 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
        'rejected': 'text-red-400 bg-red-500/20 border-red-500/30',
    };

    const statusLabels = {
        'pending': 'অপেক্ষমাণ',
        'approved': 'অনুমোদিত',
        'rejected': 'প্রত্যাখ্যানিত',
    };

    return (
        <Layout>
            <Head title={`ব্যবহারকারী - ${user.name}`} />

            <div className="max-w-4xl mx-auto space-y-6">
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center space-x-2 text-dark-400 hover:text-primary-400 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>ফিরে যান</span>
                </button>

                {/* User Info */}
                <div className="glass-card p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                        {documents.profile_photo ? (
                            <img src={documents.profile_photo} alt="" className="w-24 h-24 rounded-2xl object-cover ring-4 ring-primary-500/20" />
                        ) : (
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                <User className="w-12 h-12 text-white" />
                            </div>
                        )}
                        <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                                <h1 className="text-2xl font-bold text-dark-100">{user.name}</h1>
                                <span className={`text-xs px-3 py-1 rounded-full border font-medium ${statusColors[user.status]}`}>
                                    {statusLabels[user.status]}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-dark-400 text-sm">
                                <span className="flex items-center"><Mail className="w-4 h-4 mr-1" />{user.email}</span>
                                <span className="flex items-center"><Phone className="w-4 h-4 mr-1" />{user.phone}</span>
                                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{new Date(user.created_at).toLocaleDateString('bn-BD')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Documents */}
                <div className="glass-card p-8">
                    <h2 className="text-xl font-semibold text-dark-100 mb-6">আপলোডকৃত ডকুমেন্ট</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {docItems.map((doc) => (
                            <div key={doc.key} className="bg-dark-800/30 rounded-xl p-4 border border-dark-700/30">
                                <div className="flex items-center space-x-2 mb-3">
                                    <doc.icon className="w-5 h-5 text-primary-400" />
                                    <span className="text-dark-200 font-medium">{doc.label}</span>
                                </div>
                                {documents[doc.key] ? (
                                    <div>
                                        {documents[doc.key].match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                            <img src={documents[doc.key]} alt={doc.label} className="w-full h-48 object-cover rounded-lg" />
                                        ) : (
                                            <a href={documents[doc.key]} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 text-sm underline">
                                                ডকুমেন্ট দেখুন / ডাউনলোড করুন
                                            </a>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-dark-500 text-sm">আপলোড করা হয়নি</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                {user.status === 'pending' && (
                    <div className="glass-card p-8">
                        <h2 className="text-xl font-semibold text-dark-100 mb-6">সিদ্ধান্ত নিন</h2>

                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                            <button
                                onClick={handleApprove}
                                disabled={approveForm.processing}
                                className="btn-success flex items-center justify-center space-x-2"
                            >
                                <CheckCircle className="w-5 h-5" />
                                <span>{approveForm.processing ? 'অনুমোদন হচ্ছে...' : 'অনুমোদন করুন'}</span>
                            </button>
                            <button
                                onClick={() => setShowRejectForm(!showRejectForm)}
                                className="btn-danger flex items-center justify-center space-x-2"
                            >
                                <XCircle className="w-5 h-5" />
                                <span>প্রত্যাখ্যান করুন</span>
                            </button>
                        </div>

                        {showRejectForm && (
                            <form onSubmit={handleReject} className="mt-6 space-y-4 slide-up">
                                <div>
                                    <label className="block text-sm font-medium text-dark-300 mb-2">প্রত্যাখ্যানের কারণ (ঐচ্ছিক)</label>
                                    <textarea
                                        value={rejectForm.data.reason}
                                        onChange={(e) => rejectForm.setData('reason', e.target.value)}
                                        rows={3}
                                        className="glass-input w-full"
                                        placeholder="কারণ লিখুন..."
                                    />
                                </div>
                                <button type="submit" disabled={rejectForm.processing} className="btn-danger flex items-center space-x-2">
                                    <XCircle className="w-5 h-5" />
                                    <span>{rejectForm.processing ? 'প্রত্যাখ্যান হচ্ছে...' : 'নিশ্চিত প্রত্যাখ্যান'}</span>
                                </button>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}
