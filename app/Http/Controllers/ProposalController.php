<?php

namespace App\Http\Controllers;

use App\Models\Proposal;
use App\Models\Biodata;
use App\Models\ChatRoom;
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
        
        // Check if sender has their own biodata
        if (!auth()->user()->biodata()->exists()) {
            return back()->with('error', 'প্রস্তাব পাঠানোর আগে আপনার নিজস্ব বায়োডাটা তৈরি করতে হবে');
        }

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

        return back()->with('success', 'প্রস্তাব সফলভাবে পাঠানো হয়েছে! প্রাপকের সিদ্ধান্তের জন্য অপেক্ষা করুন।');
    }

    public function accept(Proposal $proposal)
    {
        if ($proposal->receiver_id !== auth()->id()) {
            abort(403);
        }

        if ($proposal->status !== 'pending') {
            return back()->withErrors(['error' => 'এই প্রস্তাবে আর কোনো পরিবর্তন করা যাবে না']);
        }

        $proposal->update(['status' => 'approved']);

        ChatRoom::firstOrCreate(
            ['proposal_id' => $proposal->id],
            [
                'user_one_id' => $proposal->sender_id,
                'user_two_id' => $proposal->receiver_id,
                'is_active' => true,
            ]
        );

        return back()->with('success', 'প্রস্তাব গৃহীত হয়েছে! এখন চ্যাট করতে পারবেন।');
    }

    public function reject(Proposal $proposal)
    {
        if ($proposal->receiver_id !== auth()->id()) {
            abort(403);
        }

        if ($proposal->status !== 'pending') {
            return back()->withErrors(['error' => 'এই প্রস্তাবে আর কোনো পরিবর্তন করা যাবে না']);
        }

        $proposal->update(['status' => 'rejected']);

        return back()->with('success', 'প্রস্তাব প্রত্যাখ্যান করা হয়েছে।');
    }

    public function myProposals(Request $request)
    {
        $sentProposals = Proposal::with(['receiver.biodata', 'biodata', 'chatRoom'])
            ->where('sender_id', auth()->id())
            ->latest()
            ->paginate(8, ['*'], 'sent_page')
            ->withQueryString();

        $receivedProposals = Proposal::with(['sender.biodata', 'biodata', 'chatRoom'])
            ->where('receiver_id', auth()->id())
            ->latest()
            ->paginate(8, ['*'], 'received_page')
            ->withQueryString();

        return Inertia::render('Proposals/Index', [
            'sentProposals' => $sentProposals,
            'receivedProposals' => $receivedProposals,
        ]);
    }
}
