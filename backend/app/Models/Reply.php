<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    protected $fillable = ['contact_id', 'reply_message', 'subject'];
    
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
