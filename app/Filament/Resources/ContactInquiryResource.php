<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContactInquiryResource\Pages;
use App\Filament\Resources\ContactInquiryResource\RelationManagers;
use App\Models\ContactInquiry;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ContactInquiryResource extends Resource
{
    protected static ?string $model = ContactInquiry::class;

    protected static ?string $navigationIcon = 'heroicon-o-envelope';

    public static function getNavigationLabel(): string
    {
        return __('Contact Inquiries');
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('full_name')
                    ->label(__('Full Name'))
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('email')
                    ->label(__('Email'))
                    ->email()
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('phone')
                    ->label(__('Phone'))
                    ->nullable()
                    ->maxLength(255),
                Forms\Components\Select::make('type')
                    ->label(__('Inquiry Type'))
                    ->options([
                        'general' => __('General'),
                        'booking' => __('Booking'),
                        'restoration' => __('Restoration'),
                        'membership' => __('Membership'),
                    ])
                    ->required(),
                Forms\Components\TextInput::make('subject')
                    ->label(__('Subject'))
                    ->required()
                    ->maxLength(255),
                Forms\Components\Textarea::make('message')
                    ->label(__('Message'))
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\DatePicker::make('check_in_date')
                    ->label(__('Check In'))
                    ->nullable(),
                Forms\Components\DatePicker::make('check_out_date')
                    ->label(__('Check Out'))
                    ->nullable(),
                Forms\Components\Select::make('status')
                    ->label(__('Status'))
                    ->options([
                        'pending' => __('Pending'),
                        'in_progress' => __('In Progress'),
                        'resolved' => __('Resolved'),
                        'closed' => __('Closed'),
                    ])
                    ->default('pending')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('full_name')
                    ->label(__('Full Name'))
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
                Tables\Columns\TextColumn::make('type')
                    ->label(__('Inquiry Type'))
                    ->formatStateUsing(fn ($state) => __($state))
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('subject')
                    ->label(__('Subject'))
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('message')
                    ->label(__('Message'))
                    ->limit(50)
                    ->tooltip(fn ($record) => $record->message),
                Tables\Columns\TextColumn::make('check_in_date')
                    ->label(__('Check In'))
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('check_out_date')
                    ->label(__('Check Out'))
                    ->date()
                    ->sortable(),
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
                        'in_progress' => __('In Progress'),
                        'resolved' => __('Resolved'),
                        'closed' => __('Closed'),
                    ]),
                Tables\Filters\SelectFilter::make('type')
                    ->label(__('Inquiry Type'))
                    ->options([
                        'general' => __('General'),
                        'booking' => __('Booking'),
                        'restoration' => __('Restoration'),
                        'membership' => __('Membership'),
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
            'index' => Pages\ListContactInquiries::route('/'),
            'create' => Pages\CreateContactInquiry::route('/create'),
            'edit' => Pages\EditContactInquiry::route('/{record}/edit'),
        ];
    }
}
