<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'role',
        'status',
        'profile_photo',
        'nid_document',
        'testimonial_document',
        'birth_certificate',
        'transcript_document',
        'rejection_reason',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Accessors
    public function getProfilePhotoUrlAttribute(): ?string
    {
        return $this->profile_photo
            ? asset('storage/' . $this->profile_photo)
            : null;
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }

    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    // Relationships
    public function biodata()
    {
        return $this->hasOne(Biodata::class);
    }

    public function sentProposals()
    {
        return $this->hasMany(Proposal::class, 'sender_id');
    }

    public function receivedProposals()
    {
        return $this->hasMany(Proposal::class, 'receiver_id');
    }

    public function chatRooms()
    {
        return $this->hasMany(ChatRoom::class, 'user_one_id')
            ->orWhere('user_two_id', $this->id);
    }
}
