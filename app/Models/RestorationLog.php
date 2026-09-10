<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RestorationLog extends Model
{
    protected $fillable = [
        'phase',
        'description',
        'media_url'
    ];
}