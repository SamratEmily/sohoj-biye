import { Head, useForm, usePage } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';
import { MapPin, Briefcase, GraduationCap, Heart, Calendar, User, Users, Send, BookOpen, Gem, FileText, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Show({ biodata, hasProposed }) {
    const { auth } = usePage().props;
    const [showProposalForm, setShowProposalForm] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        biodata_id: biodata.id,
        why_prefer: '',
        kabin_nama_expectations: '',
        gold_jewelry_expectations: '',
    });

    const handleProposal = (e) => {
        e.preventDefault();
        post('/proposals', {
            onSuccess: () => setShowProposalForm(false),
        });
    };

    const maritalLabels = {
        'unmarried': 'অবিবাহিত',
        'divorced': 'তালাকপ্রাপ্ত',
        'widowed': 'বিধবা/বিপত্নীক',
        'separated': 'বিচ্ছিন্ন',
    };

    const InfoItem = ({ icon: Icon, label, value }) => value ? (
        <div className="flex items-start space-x-3 py-3 border-b border-slate-100 dark:border-dark-800/50 last:border-0">
            <Icon className="w-5 h-5 text-primary-500 dark:text-primary-400 mt-0.5 flex-shrink-0" />
            <div>
                <p className="text-slate-400 dark:text-dark-500 text-sm">{label}</p>
                <p className="text-slate-700 dark:text-dark-200">{value}</p>
            </div>
        </div>
    ) : null;

    const Section = ({ title, children }) => (
        <div className="glass-card p-6 space-y-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-dark-100 mb-4">{title}</h3>
            {children}
        </div>
    );

    const isOwnBiodata = auth?.user?.id === biodata.user_id;

    return (
        <Layout>
            <Head title={`বায়োডাটা - ${biodata.user?.name || 'বিস্তারিত'}`} />

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Back Link */}
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center space-x-2 text-slate-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>ফিডে ফিরে যান</span>
                </button>

                {/* Header Card */}
                <div className="glass-card p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-primary-500/20 flex-shrink-0">
                            {biodata.user?.profile_photo_url ? (
                                <img src={biodata.user.profile_photo_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                    <User className="w-12 h-12 text-white" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                                <span className={`text-sm px-3 py-1 rounded-full font-medium ${biodata.biodata_type === 'bride'
                                        ? 'bg-pink-500/10 text-pink-600 border border-pink-500/20 dark:bg-pink-500/20 dark:text-pink-300 dark:border-pink-500/30'
                                        : 'bg-blue-500/10 text-blue-600 border border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30'
                                    }`}>
                                    {biodata.biodata_type === 'bride' ? 'পাত্রী' : 'পাত্র'}
                                </span>
                                <span className="text-slate-400 dark:text-dark-500 text-sm">বায়োডাটা #{biodata.id}</span>
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-dark-100">{biodata.user?.name || 'নাম গোপন'}</h1>
                            <p className="text-slate-500 dark:text-dark-400 mt-1">{biodata.age} বছর • {biodata.district}, {biodata.division}</p>
                        </div>

                        {!isOwnBiodata && (
                            <div className="flex-shrink-0">
                                {hasProposed ? (
                                    <span className="btn-secondary cursor-default text-sm py-2 px-5 opacity-60">
                                        ✓ প্রস্তাব পাঠানো হয়েছে
                                    </span>
                                ) : (
                                    <>
                                        {auth?.user?.has_biodata ? (
                                            <button
                                                onClick={() => setShowProposalForm(!showProposalForm)}
                                                className="btn-primary flex items-center space-x-2"
                                            >
                                                <Send className="w-5 h-5" />
                                                <span>প্রস্তাব পাঠান</span>
                                            </button>
                                        ) : (
                                            <Link
                                                href="/biodata/create"
                                                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all bg-slate-100 text-slate-700 border border-slate-200 hover:border-primary-500/30 dark:bg-dark-800/50 dark:text-dark-200 dark:border-dark-700 dark:hover:border-dark-600"
                                            >
                                                <FileText className="w-5 h-5 text-primary-500" />
                                                <span>আগে বায়োডাটা তৈরি করুন</span>
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Proposal Form */}
                {showProposalForm && (
                    <div className="glass-card p-6 border-primary-500/30 slide-up">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-dark-100 mb-4">প্রস্তাব পাঠান</h3>
                        <form onSubmit={handleProposal} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-2">কেন পছন্দ করেছেন? *</label>
                                <textarea
                                    value={data.why_prefer}
                                    onChange={(e) => setData('why_prefer', e.target.value)}
                                    rows={4}
                                    className="glass-input w-full"
                                    placeholder="কেন এই বায়োডাটা আপনার পছন্দ হয়েছে তা লিখুন..."
                                />
                                {errors.why_prefer && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.why_prefer}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-2">
                                    <BookOpen className="w-4 h-4 inline mr-1 text-primary-500" />
                                    কাবিননামা প্রত্যাশা
                                </label>
                                <textarea
                                    value={data.kabin_nama_expectations}
                                    onChange={(e) => setData('kabin_nama_expectations', e.target.value)}
                                    rows={3}
                                    className="glass-input w-full"
                                    placeholder="কাবিননামায় আপনার প্রত্যাশা লিখুন..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-2">
                                    <Gem className="w-4 h-4 inline mr-1 text-primary-500" />
                                    স্বর্ণালঙ্কার প্রত্যাশা
                                </label>
                                <textarea
                                    value={data.gold_jewelry_expectations}
                                    onChange={(e) => setData('gold_jewelry_expectations', e.target.value)}
                                    rows={3}
                                    className="glass-input w-full"
                                    placeholder="স্বর্ণালঙ্কার সম্পর্কে আপনার প্রত্যাশা লিখুন..."
                                />
                            </div>
                            <div className="flex space-x-3">
                                <button type="submit" disabled={processing} className="btn-primary flex items-center space-x-2">
                                    <Send className="w-5 h-5" />
                                    <span>{processing ? 'পাঠানো হচ্ছে...' : 'প্রস্তাব পাঠান'}</span>
                                </button>
                                <button type="button" onClick={() => setShowProposalForm(false)} className="btn-secondary">
                                    বাতিল
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Detail Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Section title="ব্যক্তিগত তথ্য">
                        <InfoItem icon={Calendar} label="জন্ম তারিখ" value={biodata.date_of_birth ? new Date(biodata.date_of_birth).toLocaleDateString('bn-BD') : null} />
                        <InfoItem icon={Heart} label="বৈবাহিক অবস্থা" value={maritalLabels[biodata.marital_status]} />
                        <InfoItem icon={FileText} label="ধর্ম" value={biodata.religion} />
                        <InfoItem icon={User} label="উচ্চতা" value={biodata.height} />
                        <InfoItem icon={User} label="ওজন" value={biodata.weight} />
                        <InfoItem icon={User} label="গাত্রবর্ণ" value={biodata.complexion} />
                        <InfoItem icon={Heart} label="রক্তের গ্রুপ" value={biodata.blood_group} />
                    </Section>

                    <Section title="ঠিকানা">
                        <InfoItem icon={MapPin} label="বিভাগ" value={biodata.division} />
                        <InfoItem icon={MapPin} label="জেলা" value={biodata.district} />
                        <InfoItem icon={MapPin} label="উপজেলা" value={biodata.upazila} />
                        {biodata.full_address && <InfoItem icon={MapPin} label="সম্পূর্ণ ঠিকানা" value={biodata.full_address} />}
                        {biodata.permanent_division && <InfoItem icon={MapPin} label="স্থায়ী ঠিকানা" value={`${biodata.permanent_upazila || ''}, ${biodata.permanent_district || ''}, ${biodata.permanent_division || ''}`} />}
                    </Section>

                    <Section title="শিক্ষা ও পেশা">
                        <InfoItem icon={GraduationCap} label="শিক্ষাগত যোগ্যতা" value={biodata.education_level} />
                        <InfoItem icon={GraduationCap} label="বিস্তারিত" value={biodata.education_detail} />
                        <InfoItem icon={Briefcase} label="পেশা" value={biodata.profession} />
                        <InfoItem icon={Briefcase} label="মাসিক আয়" value={biodata.monthly_income} />
                    </Section>

                    <Section title="পারিবারিক তথ্য">
                        <InfoItem icon={Users} label="পিতার নাম" value={biodata.father_name} />
                        <InfoItem icon={Briefcase} label="পিতার পেশা" value={biodata.father_profession} />
                        <InfoItem icon={Users} label="মাতার নাম" value={biodata.mother_name} />
                        <InfoItem icon={Briefcase} label="মাতার পেশা" value={biodata.mother_profession} />
                        <InfoItem icon={Users} label="ভাই-বোন" value={`${biodata.brothers} ভাই, ${biodata.sisters} বোন`} />
                    </Section>
                </div>

                {biodata.about_me && (
                    <Section title="নিজের সম্পর্কে">
                        <p className="text-slate-600 dark:text-dark-300 leading-relaxed">{biodata.about_me}</p>
                    </Section>
                )}

                {(biodata.partner_age_range || biodata.partner_education || biodata.qualities) && (
                    <Section title="পাত্র/পাত্রীর প্রত্যাশা">
                        <InfoItem icon={Calendar} label="বয়সসীমা" value={biodata.partner_age_range} />
                        <InfoItem icon={User} label="গাত্রবর্ণ" value={biodata.partner_complexion} />
                        <InfoItem icon={User} label="উচ্চতা" value={biodata.partner_height} />
                        <InfoItem icon={MapPin} label="জেলা" value={biodata.partner_district} />
                        <InfoItem icon={GraduationCap} label="শিক্ষা" value={biodata.partner_education} />
                        <InfoItem icon={Briefcase} label="পেশা" value={biodata.partner_profession} />
                        {biodata.qualities && (
                            <div className="pt-3">
                                <p className="text-slate-400 dark:text-dark-500 text-sm mb-1">আশা করা গুণাবলী</p>
                                <p className="text-slate-600 dark:text-dark-300">{biodata.qualities}</p>
                            </div>
                        )}
                    </Section>
                )}
            </div>
        </Layout>
    );
}
