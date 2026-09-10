<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;
use Illuminate\Support\Facades\App;

class LanguageSwitcher extends Widget
{
    protected static string $view = 'filament.widgets.language-switcher';

    public $locale;

    public function mount()
    {
        $this->locale = App::getLocale();
    }

    public function switchLocale($locale)
    {
        App::setLocale($locale);
        session()->put('locale', $locale);
        $this->locale = $locale;
    }
}
