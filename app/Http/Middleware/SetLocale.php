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
        $locale = $request->session()->get('locale', config('app.locale'));

        if (in_array($locale, ['ar', 'en'])) {
            App::setLocale($locale);
\Log::info('Locale set to: ' . $locale);
        }

        return $next($request);
    }
}
