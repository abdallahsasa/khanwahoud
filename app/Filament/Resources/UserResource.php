<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Hash;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-shield-check';
    protected static ?int $navigationSort = 99;

    public static function getNavigationLabel(): string
    {
        return __('Admins & Staff');
    }

    public static function getModelLabel(): string
    {
        return __('Admin User');
    }

    public static function getPluralModelLabel(): string
    {
        return __('Admins & Staff');
    }

    public static function canViewAny(): bool
    {
        /** @var \App\Models\User|null $user */
        $user = auth()->user();
        return $user && $user->isSuperAdmin();
    }

    public static function canCreate(): bool
    {
        /** @var \App\Models\User|null $user */
        $user = auth()->user();
        return $user && $user->isSuperAdmin();
    }

    public static function canEdit($record): bool
    {
        /** @var \App\Models\User|null $user */
        $user = auth()->user();
        return $user && $user->isSuperAdmin();
    }

    public static function canDelete($record): bool
    {
        /** @var \App\Models\User|null $user */
        $user = auth()->user();
        // Prevent deleting oneself
        return $user && $user->isSuperAdmin() && $user->id !== $record->id;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make(__('User Credentials'))
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->label(__('Name')),

                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255)
                            ->label(__('Email')),

                        Forms\Components\TextInput::make('password')
                            ->password()
                            ->dehydrateStateUsing(fn ($state) => Hash::make($state))
                            ->dehydrated(fn ($state) => filled($state))
                            ->required(fn (string $context): bool => $context === 'create')
                            ->maxLength(255)
                            ->label(__('Password'))
                            ->helperText(fn (string $context) => $context === 'edit' ? __('Leave blank to keep current password') : null),
                    ]),

                Forms\Components\Section::make(__('Role & Access Control'))
                    ->schema([
                        Forms\Components\Select::make('role')
                            ->options([
                                'super_admin' => __('Super Admin (Full Access to Everything)'),
                                'sub_admin' => __('Sub Admin (Restricted to Selected Sections)'),
                            ])
                            ->default('sub_admin')
                            ->required()
                            ->reactive()
                            ->afterStateUpdated(function ($set, $state) {
                                if ($state === 'super_admin') {
                                    $set('is_admin', true);
                                    $set('permissions', [
                                        'rooms',
                                        'bookings',
                                        'contact_inquiries',
                                        'event_requests',
                                        'events',
                                        'membership_applications',
                                        'restorations',
                                    ]);
                                } else {
                                    $set('is_admin', false);
                                }
                            })
                            ->label(__('Admin Role')),

                        Forms\Components\Hidden::make('is_admin')
                            ->dehydrateStateUsing(fn ($get) => $get('role') === 'super_admin'),

                        Forms\Components\CheckboxList::make('permissions')
                            ->options([
                                'rooms' => __('Rooms & Suites Management'),
                                'bookings' => __('Bookings & Reservations'),
                                'contact_inquiries' => __('Contact Inquiries & Messages'),
                                'event_requests' => __('Event Requests'),
                                'events' => __('Events & Exhibitions'),
                                'membership_applications' => __('Membership Applications'),
                                'restorations' => __('Restoration Logs'),
                            ])
                            ->columns(2)
                            ->visible(fn ($get) => $get('role') === 'sub_admin')
                            ->required(fn ($get) => $get('role') === 'sub_admin')
                            ->label(__('Allowed Sections / Permissions'))
                            ->helperText(__('Select the dashboard sections this sub-admin is authorized to view and manage.')),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label(__('Name'))
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('email')
                    ->label(__('Email'))
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('role')
                    ->badge()
                    ->color(fn ($state) => $state === 'super_admin' ? 'success' : 'warning')
                    ->formatStateUsing(fn ($state) => $state === 'super_admin' ? __('Super Admin') : __('Sub Admin'))
                    ->label(__('Role')),

                Tables\Columns\TextColumn::make('permissions')
                    ->badge()
                    ->color('info')
                    ->formatStateUsing(function ($state, $record) {
                        if ($record->isSuperAdmin()) {
                            return __('Full Access');
                        }
                        if (is_array($state)) {
                            return count($state) . ' ' . __('Sections');
                        }
                        return '-';
                    })
                    ->label(__('Permissions')),

                Tables\Columns\TextColumn::make('created_at')
                    ->label(__('Created At'))
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('role')
                    ->options([
                        'super_admin' => __('Super Admin'),
                        'sub_admin' => __('Sub Admin'),
                    ])
                    ->label(__('Role')),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()
                    ->visible(fn ($record) => auth()->id() !== $record->id),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
