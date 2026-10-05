<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use App\Models\ContactInquiry;
use App\Models\Event;
use App\Models\EventRequest;
use App\Models\MembershipApplication;
use App\Models\RestorationLog;
use App\Models\Room;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;
    protected int | string | array $columnSpan = 'full';

    protected function getStats(): array
    {
        $roomCount = Room::count();
        $bookingCount = Booking::count();
        $inquiryCount = ContactInquiry::count();
        $pendingInquiries = ContactInquiry::where('status', 'pending')->count();
        $eventRequestCount = EventRequest::count();
        $pendingEventRequests = EventRequest::where('status', 'pending')->count();
        $membershipCount = MembershipApplication::count();
        $pendingMemberships = MembershipApplication::where('status', 'pending')->count();

        return [
            Stat::make(__('Total Rooms & Suites'), $roomCount)
                ->description(__('Heritage accommodations'))
                ->descriptionIcon('heroicon-o-home-modern')
                ->color('primary')
                ->chart([6, 7, 7, 8, 8, 8, 8]),

            Stat::make(__('Bookings'), $bookingCount)
                ->description(__('Total room reservations'))
                ->descriptionIcon('heroicon-o-calendar-days')
                ->color('success')
                ->chart([1, 1, 2, 2, 2, 2, $bookingCount]),

            Stat::make(__('Contact Inquiries'), $inquiryCount)
                ->description($pendingInquiries > 0 ? "{$pendingInquiries} " . __('pending review') : __('All inquiries reviewed'))
                ->descriptionIcon('heroicon-o-envelope')
                ->color($pendingInquiries > 0 ? 'warning' : 'success')
                ->chart([2, 4, 3, 5, 4, 6, $inquiryCount]),

            Stat::make(__('Event Requests'), $eventRequestCount)
                ->description($pendingEventRequests > 0 ? "{$pendingEventRequests} " . __('pending') : __('Private & cultural events'))
                ->descriptionIcon('heroicon-o-sparkles')
                ->color('info'),

            Stat::make(__('Membership Applications'), $membershipCount)
                ->description($pendingMemberships > 0 ? "{$pendingMemberships} " . __('pending review') : __('Heritage club members'))
                ->descriptionIcon('heroicon-o-user-group')
                ->color('primary'),
        ];
    }
}
