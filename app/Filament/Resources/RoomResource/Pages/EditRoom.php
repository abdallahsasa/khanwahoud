<?php

namespace App\Filament\Resources\RoomResource\Pages;

use App\Filament\Resources\RoomResource;
use Filament\Resources\Pages\EditRecord;

class EditRoom extends EditRecord
{
    protected static string $resource = RoomResource::class;

    protected function mutateFormDataBeforeFill(array $data): array
    {

        if (isset($data['images']) && is_string($data['images'])) {
            $data['images'] = json_decode($data['images'], true);
        }
        return $data;
    }
}
