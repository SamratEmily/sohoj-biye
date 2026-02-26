<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Biodata extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'biodata_type',
        'date_of_birth',
        'marital_status',
        'religion',
        'height',
        'weight',
        'complexion',
        'blood_group',
        'division',
        'district',
        'upazila',
        'full_address',
        'permanent_division',
        'permanent_district',
        'permanent_upazila',
        'permanent_address',
        'education_level',
        'education_detail',
        'profession',
        'monthly_income',
        'father_name',
        'father_profession',
        'mother_name',
        'mother_profession',
        'brothers',
        'sisters',
        'partner_age_range',
        'partner_complexion',
        'partner_height',
        'partner_district',
        'partner_education',
        'partner_profession',
        'about_me',
        'qualities',
        'is_published',
        'contact_person',
        'contact_relation',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'is_published' => 'boolean',
        'brothers' => 'integer',
        'sisters' => 'integer',
    ];

    protected $appends = ['age'];

    // Accessors
    public function getAgeAttribute(): int
    {
        return Carbon::parse($this->date_of_birth)->age;
    }

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function proposals()
    {
        return $this->hasMany(Proposal::class);
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeBride($query)
    {
        return $query->where('biodata_type', 'bride');
    }

    public function scopeGroom($query)
    {
        return $query->where('biodata_type', 'groom');
    }

    public function scopeFilterByType($query, $type)
    {
        if ($type) {
            return $query->where('biodata_type', $type);
        }
        return $query;
    }

    public function scopeFilterByAge($query, $minAge, $maxAge)
    {
        if ($minAge) {
            $query->whereDate('date_of_birth', '<=', now()->subYears($minAge));
        }
        if ($maxAge) {
            $query->whereDate('date_of_birth', '>=', now()->subYears($maxAge));
        }
        return $query;
    }

    public function scopeFilterByMaritalStatus($query, $status)
    {
        if ($status) {
            return $query->where('marital_status', $status);
        }
        return $query;
    }

    public function scopeFilterByDivision($query, $division)
    {
        if ($division) {
            return $query->where('division', $division);
        }
        return $query;
    }

    public function scopeFilterByDistrict($query, $district)
    {
        if ($district) {
            return $query->where('district', $district);
        }
        return $query;
    }

    public function scopeFilterByUpazila($query, $upazila)
    {
        if ($upazila) {
            return $query->where('upazila', $upazila);
        }
        return $query;
    }

    public function scopeFilterByReligion($query, $religion)
    {
        if ($religion) {
            return $query->where('religion', $religion);
        }
        return $query;
    }
}
