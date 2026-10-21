<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RestorationLog extends Model
{
    protected $fillable = [
        'phase',
        'phase_ar',
        'description',
        'description_ar',
        'media_url'
    ];
}