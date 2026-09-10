<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title',
        'descriptions',
        'features',
        'images',
    ];

    protected $casts = [
        'features' => 'array',
        'images' => 'array',
    ];
}
