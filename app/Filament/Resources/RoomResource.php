<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RoomResource\Pages;
use App\Filament\Resources\RoomResource\RelationManagers;
use App\Models\Room;
use Filament\Actions\Action;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class RoomResource extends Resource
{
    protected static ?string $model = Room::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
 public static function getNavigationLabel(): string
    {
        return __('Rooms');
    }
     public static function getCreateFormAction(): Action
    {
        return Action::make('create')
            ->label(__('NewRoom'));
    }
   public static function form(Form $form): Form
{
    return $form
        ->schema([
            Forms\Components\TextInput::make('name')
                ->required()
                ->maxLength(255)
                ->label(__('Name')),
            Forms\Components\Textarea::make('description')
                ->required()
                ->columnSpanFull()
                ->label(__('Description')),
            Forms\Components\TextInput::make('price')
                ->required()
                ->numeric()
                ->prefix('$')
                ->label(__('Price')),
            Forms\Components\TextInput::make('category')
                ->required()
                ->maxLength(255)
                ->label(__('Category')),
            Forms\Components\FileUpload::make('images')
                ->multiple()
                ->disk('public')
                ->directory('rooms')
                ->image()
                ->maxFiles(5)
                ->required()
                ->label(__('Images'))
                ->enableReordering()
                ->enableOpen()
                ->enableDownload()
                ->preserveFilenames()
                ->dehydrateStateUsing(function ($state) {
                    // Convert associative UUID => path to plain array of values
                    return json_encode(array_values($state ?? []));
                }),
            Forms\Components\Textarea::make('amenities')
                ->required()
                ->columnSpanFull()
                ->label(__('Amenities')),
            Forms\Components\TextInput::make('size')
                ->required()
                ->numeric()
                ->label(__('Size')),
            Forms\Components\TextInput::make('max_occupancy')
                ->required()
                ->numeric()
                ->label(__('Max Occupancy')),
        ]);
}

    public static function table(Table $table): Table
{
    return $table
        ->columns([
            Tables\Columns\TextColumn::make('name')
                ->label(__('Name'))
                ->searchable(),
            Tables\Columns\TextColumn::make('price')
                ->label(__('Price'))
                ->money('usd')
                ->sortable(),
            Tables\Columns\TextColumn::make('category')
                ->label(__('Category'))
                ->searchable(),
            Tables\Columns\ImageColumn::make('images')
                ->label(__('Images'))
                ->getStateUsing(function ($record) {
                    $images = $record->images;

                    // If it's a JSON string, decode it
                    if (is_string($images)) {
                        $decoded = json_decode($images, true);
                        $images = is_array($decoded) ? $decoded : [];
                    }

                    // If it's not a valid array, fallback to empty array
                    if (!is_array($images)) {
                        $images = [];
                    }

                    // Return first image or null
                    return $images[0] ?? null;
                })
                ->disk('public')
                ->defaultImageUrl(asset('images/placeholder.jpg')),
            Tables\Columns\TextColumn::make('size')
                ->label(__('Size'))
                ->numeric()
                ->sortable(),
            Tables\Columns\TextColumn::make('max_occupancy')
                ->label(__('Max Occupancy'))
                ->numeric()
                ->sortable(),

                Tables\Columns\TextColumn::make('status')
                ->label(__('Status'))
                ->getStateUsing(function ($record) {
                    $today = now()->startOfDay();
                    $latestBooking = $record->bookings()
                        ->where('check_in', '<=', $today)
                        ->where('check_out', '>=', $today)
                        ->latest()
                        ->first();

                    return $latestBooking ? __('Booked') : __('Available');
                })
                ->badge()
                ->color(function ($state) {
                    return $state === __('Booked') ? 'danger' : 'success';
                }),
            Tables\Columns\TextColumn::make('created_at')
                ->label(__('Created At'))
                ->dateTime()
                ->sortable()
                ->toggleable(isToggledHiddenByDefault: true),
            Tables\Columns\TextColumn::make('updated_at')
                ->label(__('Updated At'))
                ->dateTime()
                ->sortable()
                ->toggleable(isToggledHiddenByDefault: true),
        ])
        ->filters([
            //
        ])
        ->actions([
            Tables\Actions\EditAction::make(),
        ])
        ->bulkActions([
            Tables\Actions\BulkActionGroup::make([
                Tables\Actions\DeleteBulkAction::make(),
            ]),
        ]);
}
    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListRooms::route('/'),
            'create' => Pages\CreateRoom::route('/create'),
            'edit' => Pages\EditRoom::route('/{record}/edit'),
        ];
    }
}
