<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model
{
    protected $fillable = [
        'name',
        'name_ar',
        'description',
        'description_ar',
        'price',
        'category',
        'category_ar',
        'images',
        'amenities',
        'amenities_ar',
        'size',
        'max_occupancy'
    ];

    protected $casts = [
        'images' => 'array',
        'amenities' => 'array',
        'amenities_ar' => 'array',
        'price' => 'decimal:2'
    ];

    protected $appends = ['formatted_images'];

    public function getFormattedImagesAttribute(): array
    {
        $rawImages = $this->images;

        if (is_string($rawImages)) {
            $decoded = json_decode($rawImages, true);
            if (is_array($decoded)) {
                $rawImages = $decoded;
            } elseif (is_string($decoded)) {
                $secondDecode = json_decode($decoded, true);
                $rawImages = is_array($secondDecode) ? $secondDecode : [$decoded];
            } else {
                $rawImages = [$rawImages];
            }
        }

        if (!is_array($rawImages) || empty($rawImages)) {
            return ['/images/rooms.png'];
        }

        $formatted = [];
        foreach ($rawImages as $img) {
            if (!is_string($img) || trim($img) === '') {
                continue;
            }
            $img = trim($img);
            if (str_starts_with($img, 'http://') || str_starts_with($img, 'https://') || str_starts_with($img, '/')) {
                $formatted[] = $img;
            } elseif (str_starts_with($img, 'storage/')) {
                $formatted[] = '/' . $img;
            } elseif (str_starts_with($img, 'images/')) {
                $formatted[] = '/' . $img;
            } else {
                $formatted[] = '/storage/' . ltrim($img, '/');
            }
        }

        return !empty($formatted) ? $formatted : ['/images/rooms.png'];
    }

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
