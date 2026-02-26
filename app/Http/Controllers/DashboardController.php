<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $biodata = $user->biodata;

        $sentProposalsCount = $user->sentProposals()->count();
        $receivedProposalsCount = $user->receivedProposals()->count();
        $chatRoomsCount = $user->chatRooms()->count();

        return Inertia::render('Dashboard', [
            'biodata' => $biodata,
            'stats' => [
                'sent_proposals' => $sentProposalsCount,
                'received_proposals' => $receivedProposalsCount,
                'chat_rooms' => $chatRoomsCount,
            ],
        ]);
    }
}
