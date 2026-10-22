<?php

use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\AdminDashboardController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\RestorationController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\ContactInquiryController;
use App\Http\Controllers\EventRequestController;
use App\Http\Controllers\MembershipApplicationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public API Routes
|--------------------------------------------------------------------------
| These routes are accessible to the public and clients. Public forms
| and inquiries are rate-limited to mitigate abuse and denial of service.
*/

// Rooms catalog
Route::get('/rooms', [RoomController::class, 'index']);
Route::get('/rooms/{room}', [RoomController::class, 'show']);
Route::get('/rooms/show/{id}', [RoomController::class, 'show']);
Route::post('/rooms/{room}/check-availability', [RoomController::class, 'checkAvailability'])->middleware('throttle:30,1');

// Public booking creation
Route::post('/bookings/create', [BookingController::class, 'store'])->middleware('throttle:10,1');
Route::post('/book', [BookingController::class, 'store'])->middleware('throttle:10,1');

// Events & Restoration public listings
Route::get('/events', [EventController::class, 'index']);
Route::get('/restoration', [RestorationController::class, 'index']);

// Public form submissions (rate-limited)
Route::post('/event-requests/create', [EventRequestController::class, 'store'])->middleware('throttle:10,1');
Route::post('/membership-applications', [MembershipApplicationController::class, 'store'])->middleware('throttle:10,1');
Route::post('/members', [MemberController::class, 'store'])->middleware('throttle:10,1');
Route::post('/contact-inquiries/create', [ContactInquiryController::class, 'store'])->middleware('throttle:10,1');

// Admin authentication (strictly rate-limited against brute-force attacks)
Route::post('/admin/login', [AdminAuthController::class, 'login'])->middleware('throttle:5,1');

/*
|--------------------------------------------------------------------------
| Protected Admin API Routes
|--------------------------------------------------------------------------
| These routes require valid Sanctum token authentication and verified
| administrator status. All sensitive data reads and mutations are gated here.
*/
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    // Session management & stats
    Route::post('/admin/logout', [AdminAuthController::class, 'logout']);
    Route::get('/admin/stats', [AdminDashboardController::class, 'stats']);
    Route::get('/admin/recent-bookings', [AdminDashboardController::class, 'recentBookings']);
    Route::get('/admin/recent-members', [AdminDashboardController::class, 'recentMembers']);

    // Rooms management (endpoints used by AdminDashboard and API)
    Route::post('/rooms/create', [RoomController::class, 'store']);
    Route::post('/admin/rooms', [RoomController::class, 'store']);
    Route::post('/rooms/update/{id}', [RoomController::class, 'update']);
    Route::put('/admin/rooms/{room}', [RoomController::class, 'update']);
    Route::delete('/rooms/{room}', [RoomController::class, 'destroy']);
    Route::post('/rooms/{room}/delete', [RoomController::class, 'destroy']);
    Route::delete('/admin/rooms/{room}', [RoomController::class, 'destroy']);

    // Events management
    Route::post('/events/create', [EventController::class, 'store']);
    Route::delete('/events/{room}', [EventController::class, 'destroy']);

    // Event requests management
    Route::get('/event-requests', [EventRequestController::class, 'index']);
    Route::patch('/event-requests/{eventRequest}/status', [EventRequestController::class, 'updateStatus']);

    // Membership applications management
    Route::get('/membership-applications', [MembershipApplicationController::class, 'index']);
    Route::get('/membership-applications/{application}', [MembershipApplicationController::class, 'show']);
    Route::patch('/membership-applications/{application}/status', [MembershipApplicationController::class, 'updateStatus']);

    // Contact inquiries management
    Route::get('/contact-inquiries', [ContactInquiryController::class, 'index']);
    Route::get('/contact-inquiries/{inquiry}', [ContactInquiryController::class, 'show']);
    Route::patch('/contact-inquiries/{inquiry}/status', [ContactInquiryController::class, 'updateStatus']);

    // Bookings management
    Route::get('/admin/bookings', [BookingController::class, 'index']);
    Route::put('/admin/bookings/{booking}', [BookingController::class, 'update']);
    Route::delete('/admin/bookings/{booking}', [BookingController::class, 'destroy']);

    // Members management
    Route::get('/admin/members', [MemberController::class, 'index']);
    Route::put('/admin/members/{member}', [MemberController::class, 'update']);
    Route::delete('/admin/members/{member}', [MemberController::class, 'destroy']);

    // Restoration logs management
    Route::post('/admin/restorations', [RestorationController::class, 'store']);
    Route::put('/admin/restorations/{restoration}', [RestorationController::class, 'update']);
    Route::delete('/admin/restorations/{restoration}', [RestorationController::class, 'destroy']);
    Route::post('/admin/restoration', [RestorationController::class, 'store']);
    Route::put('/admin/restoration/{log}', [RestorationController::class, 'update']);
    Route::delete('/admin/restoration/{log}', [RestorationController::class, 'destroy']);
});
