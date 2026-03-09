import { Head, Link, router } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';
import Pagination from '../../Components/Pagination';
import { getDivisions, getDistricts, getUpazilas } from '../../data/bangladeshData';
import { Search, Filter, MapPin, Briefcase, GraduationCap, Heart, Calendar, User, X, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

export default function Index({ biodatas, filters }) {
    const [showFilters, setShowFilters] = useState(false);
    const [localFilters, setLocalFilters] = useState({
        search: filters?.search || '',
        type: filters?.type || '',
        min_age: filters?.min_age || '',
        max_age: filters?.max_age || '',
        marital_status: filters?.marital_status || '',
        division: filters?.division || '',
        district: filters?.district || '',
        upazila: filters?.upazila || '',
        religion: filters?.religion || '',
    });

    const divisions = getDivisions();
    const districts = getDistricts(localFilters.division);
    const upazilas = getUpazilas(localFilters.division, localFilters.district);

    const applyFilters = () => {
        router.get('/feed', localFilters, { preserveState: true, preserveScroll: true });
    };

    const clearFilters = () => {
        const empty = { search: '', type: '', min_age: '', max_age: '', marital_status: '', division: '', district: '', upazila: '', religion: '' };
        setLocalFilters(empty);
        router.get('/feed', {}, { preserveState: true });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilters();
    };

    const maritalLabels = {
        'unmarried': 'অবিবাহিত',
        'divorced': 'তালাকপ্রাপ্ত',
        'widowed': 'বিধবা/বিপত্নীক',
        'separated': 'বিচ্ছিন্ন',
    };

    return (
        <Layout>
            <Head title="বায়োডাটা ফিড" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-dark-100">বায়োডাটা ফিড</h1>
                        <p className="text-dark-400 mt-1">পাত্র/পাত্রীর বায়োডাটা খুঁজুন</p>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 md:mt-0">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`btn-secondary flex items-center space-x-2 text-sm ${showFilters ? 'border-primary-500/50 text-primary-400' : ''}`}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            <span>ফিল্টার</span>
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="glass-card p-4 flex items-center space-x-3">
                    <Search className="w-5 h-5 text-dark-500 flex-shrink-0" />
                    <input
                        type="text"
                        value={localFilters.search}
                        onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
                        placeholder="নাম, পেশা, শিক্ষা বা জেলা দিয়ে খুঁজুন..."
                        className="flex-1 bg-transparent border-none text-dark-200 placeholder-dark-500 focus:ring-0 focus:outline-none"
                    />
                    <button type="submit" className="btn-primary py-2 px-5 text-sm">খুঁজুন</button>
                </form>

                {/* Type Filter (Quick) */}
                <div className="flex items-center space-x-3">
                    {[
                        { value: '', label: 'সকল' },
                        { value: 'groom', label: '🤵 পাত্র' },
                        { value: 'bride', label: '👰 পাত্রী' },
                    ].map((type) => (
                        <button
                            key={type.value}
                            onClick={() => {
                                setLocalFilters({ ...localFilters, type: type.value });
                                router.get('/feed', { ...localFilters, type: type.value }, { preserveState: true });
                            }}
                            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${localFilters.type === type.value
                                ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                                : 'bg-dark-800/50 text-dark-400 border border-dark-700/30 hover:border-dark-600'
                                }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                    <div className="glass-card p-6 slide-up">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-dark-100">ফিল্টার</h3>
                            <button onClick={clearFilters} className="text-sm text-primary-400 hover:text-primary-300 flex items-center space-x-1">
                                <X className="w-4 h-4" />
                                <span>ক্লিয়ার</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm text-dark-400 mb-1">ন্যূনতম বয়স</label>
                                <input type="number" value={localFilters.min_age} onChange={(e) => setLocalFilters({ ...localFilters, min_age: e.target.value })} className="glass-input w-full text-sm" placeholder="১৮" />
                            </div>
                            <div>
                                <label className="block text-sm text-dark-400 mb-1">সর্বোচ্চ বয়স</label>
                                <input type="number" value={localFilters.max_age} onChange={(e) => setLocalFilters({ ...localFilters, max_age: e.target.value })} className="glass-input w-full text-sm" placeholder="৪০" />
                            </div>
                            <div>
                                <label className="block text-sm text-dark-400 mb-1">বৈবাহিক অবস্থা</label>
                                <select value={localFilters.marital_status} onChange={(e) => setLocalFilters({ ...localFilters, marital_status: e.target.value })} className="glass-input w-full text-sm">
                                    <option value="">সকল</option>
                                    <option value="unmarried">অবিবাহিত</option>
                                    <option value="divorced">তালাকপ্রাপ্ত</option>
                                    <option value="widowed">বিধবা/বিপত্নীক</option>
                                    <option value="separated">বিচ্ছিন্ন</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-dark-400 mb-1">ধর্ম</label>
                                <select value={localFilters.religion} onChange={(e) => setLocalFilters({ ...localFilters, religion: e.target.value })} className="glass-input w-full text-sm">
                                    <option value="">সকল</option>
                                    {['ইসলাম', 'হিন্দু', 'খ্রিস্টান', 'বৌদ্ধ', 'অন্যান্য'].map((r) => (
                                        <option key={r} value={r}>{r}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-dark-400 mb-1">বিভাগ</label>
                                <select value={localFilters.division} onChange={(e) => setLocalFilters({ ...localFilters, division: e.target.value, district: '', upazila: '' })} className="glass-input w-full text-sm">
                                    <option value="">সকল</option>
                                    {divisions.map((d) => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-dark-400 mb-1">জেলা</label>
                                <select
                                    value={localFilters.district}
                                    onChange={(e) => setLocalFilters({ ...localFilters, district: e.target.value, upazila: '' })}
                                    className="glass-input w-full text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!localFilters.division}
                                >
                                    <option value="">{localFilters.division ? 'সকল জেলা' : 'আগে বিভাগ নির্বাচন করুন'}</option>
                                    {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-dark-400 mb-1">উপজেলা</label>
                                <select
                                    value={localFilters.upazila}
                                    onChange={(e) => setLocalFilters({ ...localFilters, upazila: e.target.value })}
                                    className="glass-input w-full text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!localFilters.district}
                                >
                                    <option value="">{localFilters.district ? 'সকল উপজেলা' : 'আগে জেলা নির্বাচন করুন'}</option>
                                    {upazilas.map((u) => <option key={u} value={u}>{u}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button onClick={applyFilters} className="btn-primary text-sm py-2 px-6">ফিল্টার প্রয়োগ করুন</button>
                        </div>
                    </div>
                )}

                {/* Biodata Grid */}
                {biodatas.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {biodatas.data.map((biodata) => (
                            <Link
                                key={biodata.id}
                                href={`/feed/${biodata.id}`}
                                className="glass-card overflow-hidden hover:border-primary-500/30 transition-all duration-500 group"
                            >
                                {/* Header */}
                                <div className="p-5 pb-0">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-dark-700/50 group-hover:ring-primary-500/30 transition-all">
                                            {biodata.user?.profile_photo ? (
                                                <img src={`/storage/${biodata.user.profile_photo}`} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                                    <User className="w-8 h-8 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${biodata.biodata_type === 'bride'
                                                    ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                                                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                                    }`}>
                                                    {biodata.biodata_type === 'bride' ? 'পাত্রী' : 'পাত্র'}
                                                </span>
                                            </div>
                                            <h3 className="font-semibold text-dark-100 truncate group-hover:text-primary-400 transition-colors">
                                                {biodata.user?.name || 'নাম গোপন'}
                                            </h3>
                                            <p className="text-dark-500 text-sm">{biodata.age} বছর</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="p-5 space-y-2">
                                    <div className="flex items-center space-x-2 text-dark-400 text-sm">
                                        <MapPin className="w-4 h-4 flex-shrink-0" />
                                        <span className="truncate">{biodata.district}, {biodata.division}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-dark-400 text-sm">
                                        <Briefcase className="w-4 h-4 flex-shrink-0" />
                                        <span className="truncate">{biodata.profession}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-dark-400 text-sm">
                                        <GraduationCap className="w-4 h-4 flex-shrink-0" />
                                        <span className="truncate">{biodata.education_level}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-dark-400 text-sm">
                                        <Heart className="w-4 h-4 flex-shrink-0" />
                                        <span>{maritalLabels[biodata.marital_status] || biodata.marital_status}</span>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="px-5 pb-5">
                                    <div className="flex items-center justify-between pt-3 border-t border-dark-700/30">
                                        <span className="text-xs text-dark-500">{biodata.religion}</span>
                                        <span className="text-primary-400 text-sm font-medium group-hover:text-primary-300 transition-colors">
                                            বিস্তারিত দেখুন →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="glass-card p-12 text-center">
                        <Search className="w-16 h-16 text-dark-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-dark-100 mb-2">কোনো বায়োডাটা পাওয়া যায়নি</h3>
                        <p className="text-dark-400">ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন</p>
                    </div>
                )}

                {/* Pagination */}
                <Pagination links={biodatas.links} />
            </div>
        </Layout>
    );
}
