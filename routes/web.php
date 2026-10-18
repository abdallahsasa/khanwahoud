<?php

use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/rooms', [RoomController::class, 'render'])->name('rooms');
Route::get('/dining', [PageController::class, 'dining'])->name('dining');
Route::get('/events', [EventController::class, 'render'])->name('events');
Route::get('/experience', [PageController::class, 'experience'])->name('experience');
Route::redirect('/membership', '/')->name('membership'); // Phase-1 2026-08-06: membership retired
Route::get('/restoration', [PageController::class, 'restoration'])->name('restoration');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');

Route::get('/sitemap.xml', function () {
    return response(file_get_contents(public_path('sitemap.xml')), 200, [
        'Content-Type' => 'application/xml; charset=utf-8',
    ]);
});

require __DIR__ . '/admin.php';
require __DIR__ . '/api.php';

// 404 route
Route::fallback([PageController::class, 'notFound']);

