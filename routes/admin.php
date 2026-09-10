<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;



Route::get('/language', function () {
    $locale = request()->query('locale', config('app.locale'));
    if (in_array($locale, ['ar', 'en'])) {
        session(['locale' => $locale]);
        app()->setLocale($locale);
        \Log::info('Locale changed to: ' . $locale . ' with translation for select_language: ' . __('select_language'));
    }

    $previousUrl = url()->previous();
    return response()->view('reload', ['url' => $previousUrl]);
})->name('language.switch');

// routes/web.php
Route::get('/test', function () {
    return view('test');
});
