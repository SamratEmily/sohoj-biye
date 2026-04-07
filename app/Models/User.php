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

    protected $appends = [
        'profile_photo_url',
        'nid_document_url',
        'testimonial_document_url',
        'birth_certificate_url',
        'transcript_document_url'
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

    public function getNidDocumentUrlAttribute(): ?string
    {
        return $this->nid_document
            ? asset('storage/' . $this->nid_document)
            : null;
    }

    public function getTestimonialDocumentUrlAttribute(): ?string
    {
        return $this->testimonial_document
            ? asset('storage/' . $this->testimonial_document)
            : null;
    }

    public function getBirthCertificateUrlAttribute(): ?string
    {
        return $this->birth_certificate
            ? asset('storage/' . $this->birth_certificate)
            : null;
    }

    public function getTranscriptDocumentUrlAttribute(): ?string
    {
        return $this->transcript_document
            ? asset('storage/' . $this->transcript_document)
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
