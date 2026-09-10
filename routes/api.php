<?php

use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\RestorationController;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\AdminDashboardController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\EventRequestController;
use App\Http\Controllers\MembershipApplicationController;
use App\Http\Controllers\ContactInquiryController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::prefix('api')->group(function () {
    Route::get('/rooms', [RoomController::class, 'index']);
    Route::get('/events', [EventController::class, 'index']);
    Route::get('/rooms/show/{id}', [RoomController::class, 'show']);
    Route::post('/rooms/create', [RoomController::class, 'store']);
    Route::post('/rooms/update/{id}', [RoomController::class, 'update']);

    Route::post('bookings/create', [BookingController::class, 'store']);

    Route::post('/events/create', [EventController::class, 'store']);

    Route::get('/rooms/{room}', [RoomController::class, 'show']);
    Route::post('/rooms/{room}/check-availability', [RoomController::class, 'checkAvailability']);
    Route::post('/book', [BookingController::class, 'store']);
    Route::post('/members', [MemberController::class, 'store']);
    Route::get('/restoration', [RestorationController::class, 'index']);

    // Event Request Routes
    Route::post('/event-requests/create', [EventRequestController::class, 'store']);
    Route::get('/event-requests', [EventRequestController::class, 'index']);
    Route::patch('/event-requests/{eventRequest}/status', [EventRequestController::class, 'updateStatus']);

    // Membership Application Routes
    Route::post('/membership-applications', [MembershipApplicationController::class, 'store']);
    Route::get('/membership-applications', [MembershipApplicationController::class, 'index']);
    Route::get('/membership-applications/{application}', [MembershipApplicationController::class, 'show']);
    Route::patch('/membership-applications/{application}/status', [MembershipApplicationController::class, 'updateStatus']);

    // Contact Inquiry Routes
    Route::post('/contact-inquiries/create', [ContactInquiryController::class, 'store']);
    Route::get('/contact-inquiries', [ContactInquiryController::class, 'index']);
    Route::get('/contact-inquiries/{inquiry}', [ContactInquiryController::class, 'show']);
    Route::patch('/contact-inquiries/{inquiry}/status', [ContactInquiryController::class, 'updateStatus']);

    // Admin authentication
    Route::post('/admin/login', [AdminAuthController::class, 'login']);

    // Protected admin routes
    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::post('/admin/logout', [AdminAuthController::class, 'logout']);
        Route::get('/admin/stats', [AdminDashboardController::class, 'stats']);
        Route::get('/admin/recent-bookings', [AdminDashboardController::class, 'recentBookings']);
        Route::get('/admin/recent-members', [AdminDashboardController::class, 'recentMembers']);

        // CRUD operations for rooms
        Route::post('/admin/rooms', [RoomController::class, 'store']);
        Route::put('/admin/rooms/{room}', [RoomController::class, 'update']);
        Route::delete('/admin/rooms/{room}', [RoomController::class, 'destroy']);

        // CRUD operations for restorations
        Route::post('/admin/restorations', [RestorationController::class, 'store']);
        Route::put('/admin/restorations/{restoration}', [RestorationController::class, 'update']);
        Route::delete('/admin/restorations/{restoration}', [RestorationController::class, 'destroy']);

        // CRUD operations for bookings
        Route::get('/admin/bookings', [BookingController::class, 'index']);
        Route::put('/admin/bookings/{booking}', [BookingController::class, 'update']);
        Route::delete('/admin/bookings/{booking}', [BookingController::class, 'destroy']);

        // CRUD operations for members
        Route::get('/admin/members', [MemberController::class, 'index']);
        Route::put('/admin/members/{member}', [MemberController::class, 'update']);
        Route::delete('/admin/members/{member}', [MemberController::class, 'destroy']);

        // CRUD operations for restoration logs
        Route::post('/admin/restoration', [RestorationController::class, 'store']);
        Route::put('/admin/restoration/{log}', [RestorationController::class, 'update']);
        Route::delete('/admin/restoration/{log}', [RestorationController::class, 'destroy']);
    });
});
