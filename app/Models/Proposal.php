<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proposal extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'biodata_id',
        'why_prefer',
        'kabin_nama_expectations',
        'gold_jewelry_expectations',
        'status',
        'admin_note',
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function biodata()
    {
        return $this->belongsTo(Biodata::class);
    }

    public function chatRoom()
    {
        return $this->hasOne(ChatRoom::class);
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}
