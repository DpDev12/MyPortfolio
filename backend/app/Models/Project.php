<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'body',
        'status',
        'image',
        'start_date',
        'end_date',
    ];
}
