<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'category',
        'images',
        'amenities',
        'size',
        'max_occupancy'
    ];

    protected $casts = [
        'images' => 'array',
        'amenities' => 'array',
        'price' => 'decimal:2'
    ];

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function currentBooking()
    {
        return $this->hasOne(Booking::class)
            ->where('check_in', '<=', now()->startOfDay())
            ->where('check_out', '>=', now()->startOfDay())
            ->latest();
    }
}
