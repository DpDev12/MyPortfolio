<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'name',
        'email',
        'title',
        'location',
        'duration',
        'built_with',
        'budget',
        'testimonial',
        'status',
        'image',
    ];

public function scopeApproved($query)
{
    return $query->where('status', 'approved');
}

public function scopePending($query)
{
    return $query->where('status', 'pending');
}

public function scopeRejected($query)
{
    return $query->where('status', 'rejected');
}
}
