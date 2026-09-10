<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'status',
        'joined_at'
    ];

    protected $casts = [
        'joined_at' => 'datetime'
    ];
}