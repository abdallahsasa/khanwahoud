<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventRequestResource\Pages;
use App\Filament\Resources\EventRequestResource\RelationManagers;
use App\Models\EventRequest;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class EventRequestResource extends Resource
{
    protected static ?string $model = EventRequest::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function getNavigationLabel(): string
    {
        return __('Event Requests');
    }

 public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label(__('Event Name'))
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('email')
                    ->label(__('Email'))
                    ->email()
                    ->required()
                    ->maxLength(255),
                Forms\Components\Select::make('event_type')
                    ->label(__('Event Type'))
                    ->options([
                        'wedding' => __('Wedding'),
                        'birthday' => __('Birthday'),
                        'conference' => __('Conference'),
                        'other' => __('Other'),
                    ])
                    ->required(),
                Forms\Components\DatePicker::make('preferred_date')
                    ->label(__('Preferred Date'))
                    ->required(),
                Forms\Components\TextInput::make('guest_count')
                    ->label(__('Guest Count'))
                    ->numeric()
                    ->required()
                    ->minValue(1),
                Forms\Components\Textarea::make('additional_requirements')
                    ->label(__('Additional Requirements'))
                    ->nullable()
                    ->columnSpanFull(),
                Forms\Components\Select::make('status')
                    ->label(__('Status'))
                    ->options([
                        'pending' => __('Pending'),
                        'approved' => __('Approved'),
                        'rejected' => __('Rejected'),
                    ])
                    ->default('pending')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label(__('Event Name'))
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->label(__('Email'))
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('event_type')
                    ->label(__('Event Type'))
                    ->formatStateUsing(fn ($state) => __($state)) 
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('preferred_date')
                    ->label(__('Preferred Date'))
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('guest_count')
                    ->label(__('Guest Count'))
                    ->sortable(),
                Tables\Columns\TextColumn::make('additional_requirements')
                    ->label(__('Additional Requirements'))
                    ->limit(50)
                    ->tooltip(fn ($record) => $record->additional_requirements),
                Tables\Columns\TextColumn::make('status')
                    ->label(__('Status'))
                    ->formatStateUsing(fn ($state) => __($state))
                    ->searchable()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label(__('Status'))
                    ->options([
                        'pending' => __('Pending'),
                        'approved' => __('Approved'),
                        'rejected' => __('Rejected'),
                    ]),
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

        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEventRequests::route('/'),
            'create' => Pages\CreateEventRequest::route('/create'),
            'edit' => Pages\EditEventRequest::route('/{record}/edit'),
        ];
    }
}
