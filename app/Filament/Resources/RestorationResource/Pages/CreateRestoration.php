<?php

namespace App\Filament\Resources\RestorationResource\Pages;

use App\Filament\Resources\RestorationResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateRestoration extends CreateRecord
{
    protected static string $resource = RestorationResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {


        return $data;
    }
}
