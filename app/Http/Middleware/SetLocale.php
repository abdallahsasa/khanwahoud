<?php
namespace App\Http\Middleware;

use Closure;
use Filament\Facades\Filament;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        $locale = null;

        // 1. Query parameter (?lang=en or ?locale=en)
        $queryLocale = $request->query('lang', $request->query('locale'));
        if ($queryLocale && in_array(strtolower($queryLocale), ['ar', 'en'])) {
            $locale = strtolower($queryLocale);
            if ($request->hasSession()) {
                $request->session()->put('locale', $locale);
            }
        }

        // 2. Session
        if (!$locale && $request->hasSession()) {
            $sessLocale = $request->session()->get('locale');
            if ($sessLocale && in_array($sessLocale, ['ar', 'en'])) {
                $locale = $sessLocale;
            }
        }

        // 3. Cookie (locale or i18nextLng from frontend)
        if (!$locale) {
            $cookieLocale = $request->cookie('locale');
            if ($cookieLocale && in_array(strtolower($cookieLocale), ['ar', 'en'])) {
                $locale = strtolower($cookieLocale);
            } elseif ($request->cookie('i18nextLng')) {
                $prefix = strtolower(substr($request->cookie('i18nextLng'), 0, 2));
                if (in_array($prefix, ['ar', 'en'])) {
                    $locale = $prefix;
                }
            }
        }

        // 4. Default
        if (!$locale) {
            $locale = config('app.locale', 'ar');
        }

        App::setLocale($locale);

        $response = $next($request);

        // Attach locale cookie to response if supported
        if (method_exists($response, 'withCookie')) {
            $response->withCookie(cookie('locale', $locale, 60 * 24 * 365, null, null, false, false));
        }

        return $response;
    }
}
