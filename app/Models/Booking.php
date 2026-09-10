<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    protected $fillable = [
        'room_id',
        'guest_name',
        'guest_email',
        'check_in',
        'check_out',
        'notes'
    ];

    protected $casts = [
        'check_in' => 'date',
        'check_out' => 'date'
    ];

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }
}