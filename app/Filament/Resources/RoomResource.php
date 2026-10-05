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
    public static function canViewAny(): bool
    {
        /** @var \App\Models\User|null $user */
        $user = auth()->user();
        return $user && $user->hasPermission('rooms');
    }

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
                Forms\Components\Tabs::make('Room Details')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make(__('English'))
                            ->icon('heroicon-o-language')
                            ->schema([
                                Forms\Components\TextInput::make('name')
                                    ->required()
                                    ->maxLength(255)
                                    ->label(__('Name (English)')),
                                Forms\Components\TextInput::make('category')
                                    ->required()
                                    ->maxLength(255)
                                    ->datalist([
                                        'Heritage Sanctuary',
                                        'Courtyard Sanctuary',
                                        'Panoramic Sanctuary',
                                        'Royal Heritage Suite',
                                        'Garden Retreat',
                                    ])
                                    ->label(__('Category (English)')),
                                Forms\Components\Textarea::make('description')
                                    ->required()
                                    ->rows(4)
                                    ->columnSpanFull()
                                    ->label(__('Description (English)')),
                                Forms\Components\TagsInput::make('amenities')
                                    ->label(__('Amenities (English)'))
                                    ->placeholder(__('Type amenity and press Enter'))
                                    ->suggestions([
                                        'King Bed',
                                        'Queen Bed',
                                        'Courtyard View',
                                        'Ottoman Marble Bath',
                                        'Heritage Breakfast',
                                        'Free Wi-Fi',
                                        'Rain Shower',
                                        'Old City Skyline View',
                                        'Private Balcony',
                                        'Air Conditioning',
                                        'Mini Bar',
                                        'Soundproofing',
                                    ])
                                    ->afterStateHydrated(function ($component, $state) {
                                        if (is_string($state)) {
                                            $decoded = json_decode($state, true);
                                            if (is_string($decoded)) {
                                                $decoded = json_decode($decoded, true);
                                            }
                                            $component->state(is_array($decoded) ? $decoded : (empty($state) ? [] : array_map('trim', explode(',', $state))));
                                        }
                                    })
                                    ->dehydrateStateUsing(function ($state) {
                                        if (empty($state)) return [];
                                        return is_array($state) ? array_values($state) : [];
                                    })
                                    ->columnSpanFull(),
                            ]),

                        Forms\Components\Tabs\Tab::make(__('Arabic (العربية)'))
                            ->icon('heroicon-o-language')
                            ->schema([
                                Forms\Components\TextInput::make('name_ar')
                                    ->maxLength(255)
                                    ->label(__('Name (Arabic)'))
                                    ->placeholder('مثال: جناح دمشق الملكي التراثي'),
                                Forms\Components\TextInput::make('category_ar')
                                    ->maxLength(255)
                                    ->datalist([
                                        'جناح ملكي تراثي',
                                        'ملاذ الفناء',
                                        'ملاذ بانورامي',
                                        'ملاذ تراثي',
                                        'ملاذ الحديقة',
                                        'جناح عائلي',
                                    ])
                                    ->label(__('Category (Arabic)'))
                                    ->placeholder('مثال: جناح ملكي تراثي'),
                                Forms\Components\Textarea::make('description_ar')
                                    ->rows(4)
                                    ->columnSpanFull()
                                    ->label(__('Description (Arabic)'))
                                    ->placeholder('الوصف باللغة العربية...'),
                                Forms\Components\TagsInput::make('amenities_ar')
                                    ->label(__('Amenities (Arabic)'))
                                    ->placeholder('أدخل المرفق ثم اضغط Enter')
                                    ->suggestions([
                                        'سرير كينغ',
                                        'سرير كوين',
                                        'إطلالة على الفناء الداخلي',
                                        'حمام رخامي عثماني',
                                        'إفطار شامي تراثي',
                                        'إنترنت مجاني عالي السرعة',
                                        'دش مطري فاخر',
                                        'إطلالة على أفق المدينة القديمة',
                                        'شرفة خاصة ومجلس شامي',
                                        'تكييف مركزي',
                                        'ميني بار',
                                        'عزل صوتي متطور',
                                    ])
                                    ->afterStateHydrated(function ($component, $state) {
                                        if (is_string($state)) {
                                            $decoded = json_decode($state, true);
                                            if (is_string($decoded)) {
                                                $decoded = json_decode($decoded, true);
                                            }
                                            $component->state(is_array($decoded) ? $decoded : (empty($state) ? [] : array_map('trim', explode(',', $state))));
                                        }
                                    })
                                    ->dehydrateStateUsing(function ($state) {
                                        if (empty($state)) return [];
                                        return is_array($state) ? array_values($state) : [];
                                    })
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpanFull(),

                Forms\Components\Section::make(__('Pricing & Room Capacity'))
                    ->columns(3)
                    ->schema([
                        Forms\Components\TextInput::make('price')
                            ->required()
                            ->numeric()
                            ->prefix('$')
                            ->label(__('Price')),
                        Forms\Components\TextInput::make('size')
                            ->required()
                            ->numeric()
                            ->suffix('m²')
                            ->label(__('Size')),
                        Forms\Components\TextInput::make('max_occupancy')
                            ->required()
                            ->numeric()
                            ->label(__('Max Occupancy')),
                    ]),

                Forms\Components\Section::make(__('Photo Gallery (Up to 40 Images)'))
                    ->schema([
                        Forms\Components\FileUpload::make('images')
                            ->multiple()
                            ->disk('public')
                            ->directory('rooms')
                            ->image()
                            ->maxFiles(40)
                            ->reorderable()
                            ->required()
                            ->label(__('Images'))
                            ->enableReordering()
                            ->enableOpen()
                            ->enableDownload()
                            ->preserveFilenames()
                            ->panelLayout('grid')
                            ->helperText(__('Upload up to 40 high-resolution photos for this suite/room. Drag and drop to reorder images.'))
                            ->dehydrateStateUsing(function ($state) {
                                if (empty($state)) return [];
                                return is_array($state) ? array_values($state) : [];
                            }),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label(__('Name'))
                    ->description(fn ($record) => $record->name_ar)
                    ->searchable(['name', 'name_ar']),
                Tables\Columns\TextColumn::make('price')
                    ->label(__('Price'))
                    ->money('usd')
                    ->sortable(),
                Tables\Columns\TextColumn::make('category')
                    ->label(__('Category'))
                    ->description(fn ($record) => $record->category_ar)
                    ->searchable(['category', 'category_ar']),
                Tables\Columns\ImageColumn::make('images')
                    ->label(__('Images'))
                    ->getStateUsing(function ($record) {
                        $images = $record->images;

                        // If it's a JSON string, decode it
                        if (is_string($images)) {
                            $decoded = json_decode($images, true);
                            $images = is_array($decoded) ? $decoded : [];
                        }

                        if (!is_array($images)) {
                            $images = [];
                        }

                        return $images;
                    })
                    ->circular()
                    ->stacked()
                    ->limit(4)
                    ->limitedRemainingText()
                    ->disk('public')
                    ->defaultImageUrl(asset('images/rooms.png')),
                Tables\Columns\TextColumn::make('size')
                    ->label(__('Size'))
                    ->suffix(' m²')
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
            Tables\Actions\DeleteAction::make(),
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
