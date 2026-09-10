<?php

namespace App\Providers;

use Filament\Facades\Filament;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;
use Filament\Navigation\NavigationItem;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Lang;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {



        Filament::serving(function () {
            Filament::registerNavigationItems([
                NavigationItem::make('->')
                    ->icon('heroicon-o-language')
                    ->group('Settings')
                    ->url(fn() => route('language.switch') . '?locale=' . (app()->getLocale() == 'ar' ? 'en' : 'ar'))
            ]);
        });
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url') . "/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });
    }
}
