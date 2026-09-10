<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BookingResource\Pages;
use App\Filament\Resources\BookingResource\RelationManagers;
use App\Models\Booking;
use App\Models\Room;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Log;

class BookingResource extends Resource
{
    protected static ?string $model = Booking::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar';

   public static function getNavigationLabel(): string
    {
        return __('Bookings'); 
    }




    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('room_id')
                    ->label(__('Room'))
                    ->options(Room::all()->pluck('name', 'id'))
                    ->required()
                    ->searchable(),
                Forms\Components\TextInput::make('guest_name')
                    ->label(__('Guest Name'))
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('guest_email')
                    ->label(__('Guest Email'))
                    ->email()
                    ->required()
                    ->maxLength(255),
                Forms\Components\DatePicker::make('check_in')
                    ->label(__('Check In'))
                    ->required()
                    ->minDate(now()),
                Forms\Components\DatePicker::make('check_out')
                    ->label(__('Check Out'))
                    ->required()
                    ->minDate(now()->addDay()),
                Forms\Components\Textarea::make('notes')
                    ->label(__('Notes'))
                    ->nullable()
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('room.name')
                    ->label(__('Room'))
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('guest_name')
                    ->label(__('Guest Name'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('guest_email')
                    ->label(__('Guest Email'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('check_in')
                    ->label(__('Check In'))
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('check_out')
                    ->label(__('Check Out'))
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label(__('Created At'))
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make()->label(__('Edit')),
                Tables\Actions\DeleteAction::make()->label(__('Delete')),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()->label(__('Delete')),
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
            'index' => Pages\ListBookings::route('/'),
            'create' => Pages\CreateBooking::route('/create'),
            'edit' => Pages\EditBooking::route('/{record}/edit'),
        ];
    }
}
