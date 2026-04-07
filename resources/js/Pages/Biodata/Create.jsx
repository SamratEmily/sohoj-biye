import { useForm, Head } from '@inertiajs/react';
import Layout from '../../Layouts/Layout';
import { getDivisions, getDistricts, getUpazilas } from '../../data/bangladeshData';
import { useState, useEffect } from 'react';
import { Save, ChevronRight, ChevronLeft } from 'lucide-react';

// Defined OUTSIDE the component so React maintains stable references across renders
function SelectField({ label, value, onChange, options, required, placeholder, error }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-2">{label} {required && '*'}</label>
            <select value={value} onChange={onChange} className="glass-input w-full">
                <option value="">{placeholder || 'নির্বাচন করুন'}</option>
                {options.map((opt) => (
                    <option key={typeof opt === 'string' ? opt : opt.value} value={typeof opt === 'string' ? opt : opt.value}>
                        {typeof opt === 'string' ? opt : opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>}
        </div>
    );
}

function InputField({ label, name, value, onChange, type = 'text', required, placeholder, rows, error }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-2">{label} {required && '*'}</label>
            {rows ? (
                <textarea
                    value={value}
                    onChange={onChange}
                    rows={rows}
                    className="glass-input w-full"
                    placeholder={placeholder}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    className="glass-input w-full"
                    placeholder={placeholder}
                />
            )}
            {error && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>}
        </div>
    );
}

export default function Create({ biodata }) {
    const isEditing = !!biodata;
    const [step, setStep] = useState(1);

    const { data, setData, post, put, processing, errors } = useForm({
        biodata_type: biodata?.biodata_type || '',
        date_of_birth: biodata?.date_of_birth ? biodata.date_of_birth.split('T')[0] : '',
        marital_status: biodata?.marital_status || '',
        religion: biodata?.religion || '',
        height: biodata?.height || '',
        weight: biodata?.weight || '',
        complexion: biodata?.complexion || '',
        blood_group: biodata?.blood_group || '',
        division: biodata?.division || '',
        district: biodata?.district || '',
        upazila: biodata?.upazila || '',
        full_address: biodata?.full_address || '',
        permanent_division: biodata?.permanent_division || '',
        permanent_district: biodata?.permanent_district || '',
        permanent_upazila: biodata?.permanent_upazila || '',
        permanent_address: biodata?.permanent_address || '',
        education_level: biodata?.education_level || '',
        education_detail: biodata?.education_detail || '',
        profession: biodata?.profession || '',
        monthly_income: biodata?.monthly_income || '',
        father_name: biodata?.father_name || '',
        father_profession: biodata?.father_profession || '',
        mother_name: biodata?.mother_name || '',
        mother_profession: biodata?.mother_profession || '',
        brothers: biodata?.brothers || 0,
        sisters: biodata?.sisters || 0,
        partner_age_range: biodata?.partner_age_range || '',
        partner_complexion: biodata?.partner_complexion || '',
        partner_height: biodata?.partner_height || '',
        partner_district: biodata?.partner_district || '',
        partner_education: biodata?.partner_education || '',
        partner_profession: biodata?.partner_profession || '',
        about_me: biodata?.about_me || '',
        qualities: biodata?.qualities || '',
        contact_person: biodata?.contact_person || '',
        contact_relation: biodata?.contact_relation || '',
    });

    const divisions = getDivisions();
    const districts = getDistricts(data.division);
    const upazilas = getUpazilas(data.division, data.district);
    const permDistricts = getDistricts(data.permanent_division);
    const permUpazilas = getUpazilas(data.permanent_division, data.permanent_district);

    const religions = ['ইসলাম', 'হিন্দু', 'খ্রিস্টান', 'বৌদ্ধ', 'অন্যান্য'];
    const complexions = ['উজ্জ্বল ফর্সা', 'ফর্সা', 'শ্যামলা', 'উজ্জ্বল শ্যামলা', 'কালো'];
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const educationLevels = ['প্রাথমিক', 'মাধ্যমিক (SSC)', 'উচ্চ মাধ্যমিক (HSC)', 'ডিপ্লোমা', 'স্নাতক (অনার্স)', 'স্নাতকোত্তর (মাস্টার্স)', 'পিএইচডি', 'হাফেজ', 'আলেম', 'অন্যান্য'];
    const maritalStatuses = [
        { value: 'unmarried', label: 'অবিবাহিত' },
        { value: 'divorced', label: 'তালাকপ্রাপ্ত' },
        { value: 'widowed', label: 'বিধবা/বিপত্নীক' },
        { value: 'separated', label: 'বিচ্ছিন্ন' },
    ];

    // Persist draft to localStorage
    useEffect(() => {
        const savedDraft = localStorage.getItem('biodata_draft');
        if (savedDraft && !isEditing) {
            try {
                const parsed = JSON.parse(savedDraft);
                // We use a single setData call if possible, but useForm's setData 
                // typically supports an object to replace everything.
                setData(parsed);
                
                const savedStep = localStorage.getItem('biodata_step');
                if (savedStep) setStep(parseInt(savedStep));
            } catch (e) {
                console.error('Failed to load draft', e);
            }
        }
    }, []);

    useEffect(() => {
        if (!isEditing) {
            localStorage.setItem('biodata_draft', JSON.stringify(data));
            localStorage.setItem('biodata_step', step.toString());
        }
    }, [data, step]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            onSuccess: () => {
                localStorage.removeItem('biodata_draft');
                localStorage.removeItem('biodata_step');
            }
        };
        if (isEditing) {
            put(`/biodata/${biodata.id}`, options);
        } else {
            post('/biodata', options);
        }
    };

    const totalSteps = 5;
    const validateStep = (s) => {
        if (s === 1) {
            return data.biodata_type && data.date_of_birth && data.marital_status && data.religion;
        }
        if (s === 2) {
            return data.division && data.district && data.upazila;
        }
        if (s === 3) {
            return data.education_level && data.profession;
        }
        return true;
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(Math.min(step + 1, totalSteps));
            window.scrollTo(0, 0);
        } else {
            alert('দয়া করে সকল আবশ্যকীয় তথ্য (চিহ্নিত *) প্রদান করুন');
        }
    };

    const goToStep = (targetStep) => {
        if (targetStep < step) {
            setStep(targetStep);
            window.scrollTo(0, 0);
            return;
        }
        
        // Check all steps up to the target
        for (let i = step; i < targetStep; i++) {
            if (!validateStep(i)) {
                alert(`${stepLabels[i-1]} ধাপে সকল আবশ্যকীয় তথ্য প্রদান করুন`);
                return;
            }
        }
        setStep(targetStep);
        window.scrollTo(0, 0);
    };

    const prevStep = () => {
        setStep(Math.max(step - 1, 1));
        window.scrollTo(0, 0);
    };

    const stepLabels = ['ব্যক্তিগত', 'ঠিকানা', 'শিক্ষা ও পেশা', 'পরিবার', 'প্রত্যাশা'];

    return (
        <Layout>
            <Head title={isEditing ? 'বায়োডাটা সম্পাদনা' : 'বায়োডাটা তৈরি'} />

            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-100">{isEditing ? 'বায়োডাটা সম্পাদনা' : 'বায়োডাটা তৈরি করুন'}</h1>
                    <p className="text-slate-500 dark:text-dark-400 mt-1">আপনার বিস্তারিত তথ্য পূরণ করুন</p>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
                    {stepLabels.map((label, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => goToStep(i + 1)}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm transition-all whitespace-nowrap ${step === i + 1
                                ? 'bg-primary-500/10 text-primary-600 border border-primary-500/30 dark:bg-primary-500/20 dark:text-primary-300'
                                : step > i + 1
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : 'text-slate-400 dark:text-dark-500'
                                }`}
                        >
                            <span className="w-6 h-6 rounded-full bg-current/10 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                            <span className="hidden sm:inline">{label}</span>
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="glass-card p-8">

                        {/* Step 1: Personal */}
                        {step === 1 && (
                            <div className="space-y-5 slide-up">
                                <h2 className="text-xl font-semibold text-slate-900 dark:text-dark-100 mb-4">ব্যক্তিগত তথ্য</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-dark-300 mb-2">বায়োডাটার ধরন *</label>
                                        <div className="flex space-x-4">
                                            {[{ value: 'groom', label: '🤵 পাত্র' }, { value: 'bride', label: '👰 পাত্রী' }].map((type) => (
                                                <button
                                                    key={type.value}
                                                    type="button"
                                                    onClick={() => setData('biodata_type', type.value)}
                                                    className={`flex-1 py-3 px-4 rounded-xl border text-center font-medium transition-all ${data.biodata_type === type.value
                                                        ? 'border-primary-500 bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-300'
                                                        : 'border-slate-200 bg-white text-slate-500 hover:border-primary-500/30 dark:border-dark-700/50 dark:bg-dark-800/30 dark:text-dark-400 dark:hover:border-dark-600'
                                                        }`}
                                                >
                                                    {type.label}
                                                </button>
                                            ))}
                                        </div>
                                        {errors.biodata_type && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.biodata_type}</p>}
                                    </div>

                                    <InputField label="জন্ম তারিখ" name="date_of_birth" type="date" value={data.date_of_birth} onChange={(e) => setData('date_of_birth', e.target.value)} required error={errors.date_of_birth} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <SelectField label="বৈবাহিক অবস্থা" value={data.marital_status} onChange={(e) => setData('marital_status', e.target.value)} options={maritalStatuses} required error={errors.marital_status} />
                                    <SelectField label="ধর্ম" value={data.religion} onChange={(e) => setData('religion', e.target.value)} options={religions} required error={errors.religion} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputField label="উচ্চতা" name="height" value={data.height} onChange={(e) => setData('height', e.target.value)} placeholder="যেমন: ৫'৬&quot;" error={errors.height} />
                                    <InputField label="ওজন" name="weight" value={data.weight} onChange={(e) => setData('weight', e.target.value)} placeholder="যেমন: ৬৫ কেজি" error={errors.weight} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <SelectField label="গাত্রবর্ণ" value={data.complexion} onChange={(e) => setData('complexion', e.target.value)} options={complexions} error={errors.complexion} />
                                    <SelectField label="রক্তের গ্রুপ" value={data.blood_group} onChange={(e) => setData('blood_group', e.target.value)} options={bloodGroups} error={errors.blood_group} />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Address */}
                        {step === 2 && (
                            <div className="space-y-6 slide-up">
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-900 dark:text-dark-100 mb-4">বর্তমান ঠিকানা</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                        <SelectField label="বিভাগ" value={data.division} onChange={(e) => { setData('division', e.target.value); setData('district', ''); setData('upazila', ''); }} options={divisions} required error={errors.division} />
                                        <SelectField label="জেলা" value={data.district} onChange={(e) => { setData('district', e.target.value); setData('upazila', ''); }} options={districts} required error={errors.district} />
                                        <SelectField label="উপজেলা" value={data.upazila} onChange={(e) => setData('upazila', e.target.value)} options={upazilas} required error={errors.upazila} />
                                    </div>
                                    <div className="mt-4">
                                        <InputField label="সম্পূর্ণ ঠিকানা" name="full_address" value={data.full_address} onChange={(e) => setData('full_address', e.target.value)} placeholder="গ্রাম/মহল্লা, ওয়ার্ড ইত্যাদি" error={errors.full_address} />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-semibold text-slate-900 dark:text-dark-100">স্থায়ী ঠিকানা</h2>
                                        <div className="flex items-center space-x-2 bg-primary-500/5 px-3 py-1.5 rounded-lg border border-primary-500/10 transition-all hover:bg-primary-500/10">
                                            <input
                                                type="checkbox"
                                                id="same_as_present"
                                                className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500 dark:bg-dark-800 dark:border-dark-700 cursor-pointer"
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setData({
                                                            ...data,
                                                            permanent_division: data.division,
                                                            permanent_district: data.district,
                                                            permanent_upazila: data.upazila,
                                                            permanent_address: data.full_address
                                                        });
                                                    }
                                                }}
                                            />
                                            <label htmlFor="same_as_present" className="text-[13px] font-medium text-slate-700 dark:text-dark-300 cursor-pointer select-none">
                                                বর্তমান ঠিকানার মতই
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                        <SelectField label="বিভাগ" value={data.permanent_division} onChange={(e) => { setData('permanent_division', e.target.value); setData('permanent_district', ''); setData('permanent_upazila', ''); }} options={divisions} />
                                        <SelectField label="জেলা" value={data.permanent_district} onChange={(e) => { setData('permanent_district', e.target.value); setData('permanent_upazila', ''); }} options={permDistricts} />
                                        <SelectField label="উপজেলা" value={data.permanent_upazila} onChange={(e) => setData('permanent_upazila', e.target.value)} options={permUpazilas} />
                                    </div>
                                    <div className="mt-4">
                                        <InputField label="স্থায়ী ঠিকানা" name="permanent_address" value={data.permanent_address} onChange={(e) => setData('permanent_address', e.target.value)} placeholder="গ্রাম/মহল্লা, ওয়ার্ড ইত্যাদি" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Education & Profession */}
                        {step === 3 && (
                            <div className="space-y-5 slide-up">
                                <h2 className="text-xl font-semibold text-slate-900 dark:text-dark-100 mb-4">শিক্ষা ও পেশা</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <SelectField label="শিক্ষাগত যোগ্যতা" value={data.education_level} onChange={(e) => setData('education_level', e.target.value)} options={educationLevels} required error={errors.education_level} />
                                    <InputField label="শিক্ষা বিস্তারিত" name="education_detail" value={data.education_detail} onChange={(e) => setData('education_detail', e.target.value)} placeholder="বিষয়, প্রতিষ্ঠান ইত্যাদি" error={errors.education_detail} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputField label="পেশা" name="profession" value={data.profession} onChange={(e) => setData('profession', e.target.value)} required placeholder="আপনার পেশা" error={errors.profession} />
                                    <InputField label="মাসিক আয়" name="monthly_income" value={data.monthly_income} onChange={(e) => setData('monthly_income', e.target.value)} placeholder="যেমন: ৩০,০০০ টাকা" error={errors.monthly_income} />
                                </div>
                            </div>
                        )}

                        {/* Step 4: Family */}
                        {step === 4 && (
                            <div className="space-y-5 slide-up">
                                <h2 className="text-xl font-semibold text-slate-900 dark:text-dark-100 mb-4">পারিবারিক তথ্য</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputField label="পিতার নাম" name="father_name" value={data.father_name} onChange={(e) => setData('father_name', e.target.value)} error={errors.father_name} />
                                    <InputField label="পিতার পেশা" name="father_profession" value={data.father_profession} onChange={(e) => setData('father_profession', e.target.value)} error={errors.father_profession} />
                                    <InputField label="মাতার নাম" name="mother_name" value={data.mother_name} onChange={(e) => setData('mother_name', e.target.value)} error={errors.mother_name} />
                                    <InputField label="মাতার পেশা" name="mother_profession" value={data.mother_profession} onChange={(e) => setData('mother_profession', e.target.value)} error={errors.mother_profession} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputField label="ভাইয়ের সংখ্যা" name="brothers" type="number" value={data.brothers} onChange={(e) => setData('brothers', parseInt(e.target.value) || 0)} error={errors.brothers} />
                                    <InputField label="বোনের সংখ্যা" name="sisters" type="number" value={data.sisters} onChange={(e) => setData('sisters', parseInt(e.target.value) || 0)} error={errors.sisters} />
                                </div>
                                <InputField label="নিজের সম্পর্কে" name="about_me" value={data.about_me} onChange={(e) => setData('about_me', e.target.value)} rows={4} placeholder="আপনার সম্পর্কে কিছু লিখুন..." error={errors.about_me} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputField label="যোগাযোগকারীর নাম" name="contact_person" value={data.contact_person} onChange={(e) => setData('contact_person', e.target.value)} error={errors.contact_person} />
                                    <InputField label="সম্পর্ক" name="contact_relation" value={data.contact_relation} onChange={(e) => setData('contact_relation', e.target.value)} placeholder="যেমন: বাবা, ভাই, চাচা" error={errors.contact_relation} />
                                </div>
                            </div>
                        )}

                        {/* Step 5: Partner Preferences */}
                        {step === 5 && (
                            <div className="space-y-5 slide-up">
                                <h2 className="text-xl font-semibold text-slate-900 dark:text-dark-100 mb-4">পাত্র/পাত্রীর প্রত্যাশা</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputField label="বয়সসীমা" name="partner_age_range" value={data.partner_age_range} onChange={(e) => setData('partner_age_range', e.target.value)} placeholder="যেমন: ২০-২৫ বছর" />
                                    <InputField label="গাত্রবর্ণ" name="partner_complexion" value={data.partner_complexion} onChange={(e) => setData('partner_complexion', e.target.value)} placeholder="যেমন: ফর্সা" />
                                    <InputField label="উচ্চতা" name="partner_height" value={data.partner_height} onChange={(e) => setData('partner_height', e.target.value)} placeholder="যেমন: ৫'০&quot; - ৫'৫&quot;" />
                                    <InputField label="জেলা" name="partner_district" value={data.partner_district} onChange={(e) => setData('partner_district', e.target.value)} placeholder="যেকোনো বা নির্দিষ্ট" />
                                    <InputField label="শিক্ষাগত যোগ্যতা" name="partner_education" value={data.partner_education} onChange={(e) => setData('partner_education', e.target.value)} placeholder="ন্যূনতম শিক্ষাগত যোগ্যতা" />
                                    <InputField label="পেশা" name="partner_profession" value={data.partner_profession} onChange={(e) => setData('partner_profession', e.target.value)} placeholder="পছন্দের পেশা" />
                                </div>
                                <InputField label="যে গুণাবলী আশা করেন" name="qualities" value={data.qualities} onChange={(e) => setData('qualities', e.target.value)} rows={4} placeholder="পাত্র/পাত্রীর কাছ থেকে যে গুণাবলী আশা করেন..." />
                            </div>
                        )}

                        {/* Navigation & Submit */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-slate-100 dark:border-dark-700/30">
                            {step > 1 ? (
                                <button type="button" onClick={prevStep} className="btn-secondary flex items-center space-x-2">
                                    <ChevronLeft className="w-5 h-5" />
                                    <span>আগের ধাপ</span>
                                </button>
                            ) : <div></div>}

                            {step < totalSteps ? (
                                <button type="button" onClick={nextStep} className="btn-primary flex items-center space-x-2">
                                    <span>পরের ধাপ</span>
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            ) : (
                                <button type="submit" disabled={processing} className="btn-primary flex items-center space-x-2">
                                    <Save className="w-5 h-5" />
                                    <span>{processing ? 'সংরক্ষণ হচ্ছে...' : isEditing ? 'আপডেট করুন' : 'বায়োডাটা সংরক্ষণ'}</span>
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
