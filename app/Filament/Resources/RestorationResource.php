<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RestorationResource\Pages;
use App\Filament\Resources\RestorationResource\RelationManagers;
use App\Models\RestorationLog;
use Filament\Actions\Action;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;


class RestorationResource extends Resource
{
    protected static ?string $model = RestorationLog::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    public static function getNavigationLabel(): string
    {
        return __('Restorations');
    }
    public static function getCreateFormAction(): Action
    {
        return Action::make('create')
            ->label(__('NewRestoration'));
    }
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('phase')
                    ->required()
                    ->maxLength(255)
                    ->label(__('Phase')),
                Forms\Components\Textarea::make('description')
                    ->required()
                    ->columnSpanFull()
                    ->label(__('Description')),
                Forms\Components\FileUpload::make('media_url')
                    ->required()
                    ->multiple(false)
                    ->disk('public')
                    ->directory('restorations')
                    ->acceptedFileTypes(['image/*', 'video/*'])
                    ->maxFiles(1)
                    ->required()
                    ->label(__('Image'))
                    ->enableReordering()
                    ->enableOpen()
                    ->enableDownload(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('phase')
                    ->label(__('Phase'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('description')
                    ->label(__('Description'))
                    ->searchable()
                    ->limit(50),
                Tables\Columns\ViewColumn::make('media_url')
                    ->label(__('Media'))
                    ->view('filament.components.media-preview'),

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
            'index' => Pages\ListRestorations::route('/'),
            'create' => Pages\CreateRestoration::route('/create'),
            'edit' => Pages\EditRestoration::route('/{record}/edit'),
        ];
    }
}
