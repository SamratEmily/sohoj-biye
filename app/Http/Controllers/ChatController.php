<?php

namespace App\Http\Controllers;

use App\Models\ChatRoom;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index()
    {
        $userId = auth()->id();

        $chatRooms = ChatRoom::with(['userOne', 'userTwo', 'latestMessage', 'proposal'])
            ->where(function ($q) use ($userId) {
                $q->where('user_one_id', $userId)
                  ->orWhere('user_two_id', $userId);
            })
            ->where('is_active', true)
            ->latest()
            ->paginate(8)
            ->through(function ($room) use ($userId) {
                $otherUser = $room->user_one_id === $userId ? $room->userTwo : $room->userOne;
                $unreadCount = $room->messages()
                    ->where('sender_id', '!=', $userId)
                    ->where('is_read', false)
                    ->count();

                return [
                    'id' => $room->id,
                    'other_user' => [
                        'id' => $otherUser->id,
                        'name' => $otherUser->name,
                        'profile_photo' => $otherUser->profile_photo_url,
                    ],
                    'latest_message' => $room->latestMessage,
                    'unread_count' => $unreadCount,
                    'created_at' => $room->created_at,
                ];
            });

        return Inertia::render('Chat/Index', [
            'chatRooms' => $chatRooms,
        ]);
    }

    public function show(ChatRoom $chatRoom)
    {
        $userId = auth()->id();

        // Verify access
        if ($chatRoom->user_one_id !== $userId && $chatRoom->user_two_id !== $userId) {
            abort(403);
        }

        // Mark messages as read
        $chatRoom->messages()
            ->where('sender_id', '!=', $userId)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        $messages = $chatRoom->messages()
            ->with('sender:id,name,profile_photo')
            ->orderBy('created_at', 'asc')
            ->get();

        $otherUser = $chatRoom->user_one_id === $userId
            ? $chatRoom->userTwo
            : $chatRoom->userOne;

        return Inertia::render('Chat/Show', [
            'chatRoom' => $chatRoom,
            'messages' => $messages,
            'otherUser' => [
                'id' => $otherUser->id,
                'name' => $otherUser->name,
                'profile_photo' => $otherUser->profile_photo_url,
            ],
        ]);
    }

    public function sendMessage(Request $request, ChatRoom $chatRoom)
    {
        $userId = auth()->id();

        if ($chatRoom->user_one_id !== $userId && $chatRoom->user_two_id !== $userId) {
            abort(403);
        }

        $validated = $request->validate([
            'body' => 'required|string|max:5000',
        ], [
            'body.required' => 'মেসেজ লিখুন',
        ]);

        $message = Message::create([
            'chat_room_id' => $chatRoom->id,
            'sender_id' => $userId,
            'body' => $validated['body'],
        ]);

        $message->load('sender:id,name,profile_photo');

        return back()->with('success', 'মেসেজ পাঠানো হয়েছে');
    }
}
