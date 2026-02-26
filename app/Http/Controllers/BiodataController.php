<?php

namespace App\Http\Controllers;

use App\Models\Biodata;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BiodataController extends Controller
{
    public function index(Request $request)
    {
        $query = Biodata::with('user:id,name,profile_photo')
            ->published();

        // Apply filters
        $query->filterByType($request->type)
              ->filterByMaritalStatus($request->marital_status)
              ->filterByDivision($request->division)
              ->filterByDistrict($request->district)
              ->filterByUpazila($request->upazila)
              ->filterByReligion($request->religion)
              ->filterByAge($request->min_age, $request->max_age);

        // Search
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('profession', 'like', "%{$request->search}%")
                  ->orWhere('education_level', 'like', "%{$request->search}%")
                  ->orWhere('division', 'like', "%{$request->search}%")
                  ->orWhere('district', 'like', "%{$request->search}%")
                  ->orWhereHas('user', function ($uq) use ($request) {
                      $uq->where('name', 'like', "%{$request->search}%");
                  });
            });
        }

        $biodatas = $query->latest()->paginate(12);

        return Inertia::render('Feed/Index', [
            'biodatas' => $biodatas,
            'filters' => $request->only([
                'type', 'marital_status', 'division', 'district',
                'upazila', 'religion', 'min_age', 'max_age', 'search'
            ]),
        ]);
    }

    public function show(Biodata $biodata)
    {
        $biodata->load('user:id,name,profile_photo');

        $hasProposed = false;
        if (auth()->check()) {
            $hasProposed = $biodata->proposals()
                ->where('sender_id', auth()->id())
                ->exists();
        }

        return Inertia::render('Feed/Show', [
            'biodata' => $biodata,
            'hasProposed' => $hasProposed,
        ]);
    }

    public function create()
    {
        $existingBiodata = auth()->user()->biodata;

        return Inertia::render('Biodata/Create', [
            'biodata' => $existingBiodata,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'biodata_type' => 'required|in:bride,groom',
            'date_of_birth' => 'required|date|before:today',
            'marital_status' => 'required|in:unmarried,divorced,widowed,separated',
            'religion' => 'required|string',
            'height' => 'nullable|string',
            'weight' => 'nullable|string',
            'complexion' => 'nullable|string',
            'blood_group' => 'nullable|string',
            'division' => 'required|string',
            'district' => 'required|string',
            'upazila' => 'required|string',
            'full_address' => 'nullable|string',
            'permanent_division' => 'nullable|string',
            'permanent_district' => 'nullable|string',
            'permanent_upazila' => 'nullable|string',
            'permanent_address' => 'nullable|string',
            'education_level' => 'required|string',
            'education_detail' => 'nullable|string',
            'profession' => 'required|string',
            'monthly_income' => 'nullable|string',
            'father_name' => 'nullable|string',
            'father_profession' => 'nullable|string',
            'mother_name' => 'nullable|string',
            'mother_profession' => 'nullable|string',
            'brothers' => 'nullable|integer|min:0',
            'sisters' => 'nullable|integer|min:0',
            'partner_age_range' => 'nullable|string',
            'partner_complexion' => 'nullable|string',
            'partner_height' => 'nullable|string',
            'partner_district' => 'nullable|string',
            'partner_education' => 'nullable|string',
            'partner_profession' => 'nullable|string',
            'about_me' => 'nullable|string',
            'qualities' => 'nullable|string',
            'contact_person' => 'nullable|string',
            'contact_relation' => 'nullable|string',
        ], [
            'biodata_type.required' => 'বায়োডাটার ধরন নির্বাচন করুন',
            'date_of_birth.required' => 'জন্ম তারিখ আবশ্যক',
            'marital_status.required' => 'বৈবাহিক অবস্থা আবশ্যক',
            'religion.required' => 'ধর্ম আবশ্যক',
            'division.required' => 'বিভাগ আবশ্যক',
            'district.required' => 'জেলা আবশ্যক',
            'upazila.required' => 'উপজেলা আবশ্যক',
            'education_level.required' => 'শিক্ষাগত যোগ্যতা আবশ্যক',
            'profession.required' => 'পেশা আবশ্যক',
        ]);

        $validated['user_id'] = auth()->id();

        Biodata::updateOrCreate(
            ['user_id' => auth()->id()],
            $validated
        );

        return redirect()->route('dashboard')->with('success', 'বায়োডাটা সফলভাবে সংরক্ষিত হয়েছে!');
    }

    public function edit(Biodata $biodata)
    {
        if ($biodata->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Biodata/Create', [
            'biodata' => $biodata,
        ]);
    }

    public function update(Request $request, Biodata $biodata)
    {
        if ($biodata->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'biodata_type' => 'required|in:bride,groom',
            'date_of_birth' => 'required|date|before:today',
            'marital_status' => 'required|in:unmarried,divorced,widowed,separated',
            'religion' => 'required|string',
            'height' => 'nullable|string',
            'weight' => 'nullable|string',
            'complexion' => 'nullable|string',
            'blood_group' => 'nullable|string',
            'division' => 'required|string',
            'district' => 'required|string',
            'upazila' => 'required|string',
            'full_address' => 'nullable|string',
            'permanent_division' => 'nullable|string',
            'permanent_district' => 'nullable|string',
            'permanent_upazila' => 'nullable|string',
            'permanent_address' => 'nullable|string',
            'education_level' => 'required|string',
            'education_detail' => 'nullable|string',
            'profession' => 'required|string',
            'monthly_income' => 'nullable|string',
            'father_name' => 'nullable|string',
            'father_profession' => 'nullable|string',
            'mother_name' => 'nullable|string',
            'mother_profession' => 'nullable|string',
            'brothers' => 'nullable|integer|min:0',
            'sisters' => 'nullable|integer|min:0',
            'partner_age_range' => 'nullable|string',
            'partner_complexion' => 'nullable|string',
            'partner_height' => 'nullable|string',
            'partner_district' => 'nullable|string',
            'partner_education' => 'nullable|string',
            'partner_profession' => 'nullable|string',
            'about_me' => 'nullable|string',
            'qualities' => 'nullable|string',
            'contact_person' => 'nullable|string',
            'contact_relation' => 'nullable|string',
        ]);

        $biodata->update($validated);

        return redirect()->route('dashboard')->with('success', 'বায়োডাটা সফলভাবে আপডেট হয়েছে!');
    }
}
