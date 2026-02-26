<?php

namespace App\Http\Controllers;

use App\Models\Proposal;
use App\Models\Biodata;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProposalController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'biodata_id' => 'required|exists:biodatas,id',
            'why_prefer' => 'required|string|max:2000',
            'kabin_nama_expectations' => 'nullable|string|max:1000',
            'gold_jewelry_expectations' => 'nullable|string|max:1000',
        ], [
            'why_prefer.required' => 'কেন পছন্দ করেছেন তা লিখুন',
            'biodata_id.required' => 'বায়োডাটা নির্বাচন করুন',
        ]);

        $biodata = Biodata::findOrFail($validated['biodata_id']);

        // Can't send proposal to yourself
        if ($biodata->user_id === auth()->id()) {
            return back()->withErrors(['error' => 'নিজের বায়োডাটায় প্রস্তাব পাঠাতে পারবেন না']);
        }

        // Check if already proposed
        $existing = Proposal::where('sender_id', auth()->id())
            ->where('biodata_id', $biodata->id)
            ->first();

        if ($existing) {
            return back()->withErrors(['error' => 'আপনি ইতিমধ্যে এই বায়োডাটায় প্রস্তাব পাঠিয়েছেন']);
        }

        Proposal::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $biodata->user_id,
            'biodata_id' => $biodata->id,
            'why_prefer' => $validated['why_prefer'],
            'kabin_nama_expectations' => $validated['kabin_nama_expectations'],
            'gold_jewelry_expectations' => $validated['gold_jewelry_expectations'],
            'status' => 'pending',
        ]);

        return back()->with('success', 'প্রস্তাব সফলভাবে পাঠানো হয়েছে! অ্যাডমিনের অনুমোদনের জন্য অপেক্ষা করুন।');
    }

    public function myProposals()
    {
        $sentProposals = Proposal::with(['receiver', 'biodata'])
            ->where('sender_id', auth()->id())
            ->latest()
            ->get();

        $receivedProposals = Proposal::with(['sender', 'biodata'])
            ->where('receiver_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Proposals/Index', [
            'sentProposals' => $sentProposals,
            'receivedProposals' => $receivedProposals,
        ]);
    }
}
