<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MembershipApplicationResource\Pages;
use App\Filament\Resources\MembershipApplicationResource\RelationManagers;
use App\Models\MembershipApplication;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class MembershipApplicationResource extends Resource
{
    protected static ?string $model = MembershipApplication::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    public static function getNavigationLabel(): string
    {
        return __('Membership Applications');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('first_name')
                    ->label(__('First Name'))
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('last_name')
                    ->label(__('Last Name'))
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('email')
                    ->label(__('Email'))
                    ->email()
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('phone')
                    ->label(__('Phone'))
                    ->required()
                    ->maxLength(255),
                Forms\Components\Select::make('membership_tier')
                    ->label(__('Membership Tier'))
                    ->options([
                        'Heritage' => __('Heritage'),
                        'Legacy' => __('Legacy'),
                        'Royal' => __('Royal'),
                    ])
                    ->required(),
                Forms\Components\TagsInput::make('areas_of_interest')
                    ->label(__('Areas of Interest'))
                    ->nullable(),
                Forms\Components\Textarea::make('about')
                    ->label(__('About'))
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
                Tables\Columns\TextColumn::make('first_name')
                    ->label(__('First Name'))
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('last_name')
                    ->label(__('Last Name'))
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->label(__('Email'))
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('phone')
                    ->label(__('Phone'))
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('membership_tier')
                    ->label(__('Membership Tier'))
                    ->formatStateUsing(fn ($state) => __($state))
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('areas_of_interest')
                    ->label(__('Areas of Interest'))
                    ->formatStateUsing(fn ($state) => is_array($state) ? implode(', ', $state) : $state)
                    ->limit(50),
                Tables\Columns\TextColumn::make('about')
                    ->label(__('About'))
                    ->limit(50)
                    ->tooltip(fn ($record) => $record->about),
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
                Tables\Filters\SelectFilter::make('membership_tier')
                    ->label(__('Membership Tier'))
                    ->options([
                        'Heritage' => __('Heritage'),
                        'Legacy' => __('Legacy'),
                        'Royal' => __('Royal'),
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
            'index' => Pages\ListMembershipApplications::route('/'),
            'create' => Pages\CreateMembershipApplication::route('/create'),
            'edit' => Pages\EditMembershipApplication::route('/{record}/edit'),
        ];
    }
}
