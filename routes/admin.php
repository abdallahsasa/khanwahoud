<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/language', function (Request $request) {
    $locale = $request->query('locale', config('app.locale'));
    if (is_string($locale) && in_array(strtolower($locale), ['ar', 'en'], true)) {
        $locale = strtolower($locale);
        session(['locale' => $locale]);
        app()->setLocale($locale);
    }

    $previousUrl = url()->previous();
    $safeUrl = url('/');

    if ($previousUrl && is_string($previousUrl)) {
        $parsed = parse_url($previousUrl);
        $previousHost = $parsed['host'] ?? null;
        $currentHost = $request->getHost();

        // Prevent Open Redirect: allow redirect only if same host or relative path
        if (! $previousHost || strtolower($previousHost) === strtolower($currentHost)) {
            $scheme = $parsed['scheme'] ?? null;
            if (! $scheme || in_array(strtolower($scheme), ['http', 'https'], true)) {
                $safeUrl = $previousUrl;
            }
        }
    }

    return response()->view('reload', ['url' => $safeUrl]);
})->middleware('throttle:60,1')->name('language.switch');
