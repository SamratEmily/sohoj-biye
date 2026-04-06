<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Biodata;
use App\Models\Proposal;
use App\Models\ChatRoom;
use App\Mail\AccountApprovedNotification;
use App\Mail\AccountRejectedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'total_users' => User::where('role', 'user')->count(),
            'pending_users' => User::where('status', 'pending')->count(),
            'approved_users' => User::where('status', 'approved')->where('role', 'user')->count(),
            'total_biodatas' => Biodata::count(),
            'total_proposals' => Proposal::count(),
            'pending_proposals' => Proposal::where('status', 'pending')->count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
        ]);
    }

    public function pendingUsers(Request $request)
    {
        $users = User::where('status', 'pending')
            ->where('role', 'user')
            ->latest()
            ->paginate(15)->withQueryString();

        return Inertia::render('Admin/PendingUsers', [
            'users' => $users,
        ]);
    }

    public function showUser(User $user)
    {
        return Inertia::render('Admin/UserDetail', [
            'user' => $user->only([
                'id', 'name', 'email', 'phone', 'status',
                'profile_photo', 'nid_document', 'testimonial_document',
                'birth_certificate', 'transcript_document', 'created_at',
            ]),
            'documents' => [
                'profile_photo' => $user->profile_photo ? asset('storage/' . $user->profile_photo) : null,
                'nid_document' => $user->nid_document ? asset('storage/' . $user->nid_document) : null,
                'testimonial_document' => $user->testimonial_document ? asset('storage/' . $user->testimonial_document) : null,
                'birth_certificate' => $user->birth_certificate ? asset('storage/' . $user->birth_certificate) : null,
                'transcript_document' => $user->transcript_document ? asset('storage/' . $user->transcript_document) : null,
            ],
        ]);
    }

    public function approveUser(User $user)
    {
        $user->update([
            'status' => 'approved',
            'email_verified_at' => now(),
        ]);

        try {
            Mail::to($user->email)->send(new AccountApprovedNotification($user));
        } catch (\Exception $e) {
            \Log::error('Failed to send approval email: ' . $e->getMessage());
        }

        return back()->with('success', 'ব্যবহারকারী অনুমোদিত হয়েছে।');
    }

    public function rejectUser(Request $request, User $user)
    {
        $request->validate([
            'reason' => 'nullable|string|max:500',
        ]);

        $user->update([
            'status' => 'rejected',
            'rejection_reason' => $request->reason,
        ]);

        try {
            Mail::to($user->email)->send(new AccountRejectedNotification($user));
        } catch (\Exception $e) {
            \Log::error('Failed to send rejection email: ' . $e->getMessage());
        }

        return back()->with('success', 'ব্যবহারকারী প্রত্যাখ্যান করা হয়েছে।');
    }

    public function allUsers(Request $request)
    {
        $query = User::where('role', 'user');

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('email', 'like', "%{$request->search}%")
                  ->orWhere('phone', 'like', "%{$request->search}%");
            });
        }

        $users = $query->latest()->paginate(20)->withQueryString();

        return Inertia::render('Admin/AllUsers', [
            'users' => $users,
            'filters' => $request->only(['status', 'search']),
        ]);
    }

    public function proposals()
    {
        $proposals = Proposal::with(['sender', 'receiver', 'biodata'])
            ->latest()
            ->paginate(20)->withQueryString();

        return Inertia::render('Admin/Proposals', [
            'proposals' => $proposals,
        ]);
    }

}

