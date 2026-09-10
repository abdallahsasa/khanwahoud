<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Room;
use App\Models\Booking;
use App\Models\Member;
use App\Models\Event;
use App\Models\RestorationLog;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@wahoud.com',
            'password' => Hash::make('password'),
            'is_admin' => true,
        ]);

        // Create regular user
        User::create([
            'name' => 'Regular User',
            'email' => 'user@wahoud.com',
            'password' => Hash::make('password'),
            'is_admin' => false,
        ]);

        // Create rooms
        $rooms = [
            [
                'name' => "Heritage Royal Suite",
                'price' => 450,
                'description' => 'Opulent suite featuring original architectural details and handcrafted period furniture',
                'category' => 'heritage',
                'size' => 65,
                'max_occupancy' => 4,
                'amenities' => json_encode(['King bed', 'Ottoman-style bath', 'Evening tea service', 'WiFi', 'Modern bathroom']),
                'images' => json_encode(['https://placehold.co/800x600?text=Heritage+Suite+1', 'https://placehold.co/800x600?text=Heritage+Suite+2']),
            ],
            [
                'name' => "Courtyard Garden Room",
                'price' => 280,
                'description' => 'Serene room overlooking the traditional inner courtyard with fountain',
                'category' => 'courtyard',
                'size' => 40,
                'max_occupancy' => 3,
                'amenities' => json_encode(['Queen bed', 'Private courtyard', 'WiFi', 'Modern bathroom']),
                'images' => json_encode(['https://placehold.co/800x600?text=Courtyard+Room+1', 'https://placehold.co/800x600?text=Courtyard+Room+2']),
            ],
            [
                'name' => 'Panoramic City View Suite',
                'price' => 380,
                'description' => 'Luxurious suite with sweeping views of the historic city skyline',
                'category' => 'panoramic',
                'size' => 55,
                'max_occupancy' => 4,
                'amenities' => json_encode(['King bed', 'Work desk', 'WiFi', 'Modern bathroom', 'Evening tea service']),
                'images' => json_encode(['https://placehold.co/800x600?text=Panoramic+Suite+1', 'https://placehold.co/800x600?text=Panoramic+Suite+2']),
            ],
            [
                'name' => 'Heritage Deluxe Room',
                'price' => 320,
                'description' => 'Elegant room with restored heritage features and modern comforts',
                'category' => 'heritage',
                'size' => 45,
                'max_occupancy' => 2,
                'amenities' => json_encode(['Queen bed', 'Ottoman-style bath', 'WiFi', 'Luxury linens']),
                'images' => json_encode(['https://placehold.co/800x600?text=Heritage+Deluxe+1', 'https://placehold.co/800x600?text=Heritage+Deluxe+2']),
            ],
            [
                'name' => 'Garden Retreat Room',
                'price' => 260,
                'description' => 'Peaceful room with direct access to the hotel\'s historic gardens',
                'category' => 'garden',
                'size' => 35,
                'max_occupancy' => 2,
                'amenities' => json_encode(['Queen bed', 'Private courtyard', 'WiFi', 'Modern bathroom']),
                'images' => json_encode(['https://placehold.co/800x600?text=Garden+Room+1', 'https://placehold.co/800x600?text=Garden+Room+2']),
            ],
            [
                'name' => 'Panoramic Tower Room',
                'price' => 290,
                'description' => 'Unique circular room in the restored tower with 270-degree views',
                'category' => 'panoramic',
                'size' => 38,
                'max_occupancy' => 2,
                'amenities' => json_encode(['Queen bed', 'Work desk', 'WiFi', 'Modern bathroom']),
                'images' => json_encode(['https://placehold.co/800x600?text=Tower+Room+1', 'https://placehold.co/800x600?text=Tower+Room+2']),
            ],
            [
                'name' => 'Courtyard Family Suite',
                'price' => 420,
                'description' => 'Spacious suite overlooking the courtyard, perfect for families',
                'category' => 'courtyard',
                'size' => 70,
                'max_occupancy' => 5,
                'amenities' => json_encode(['King bed', 'Private courtyard', 'WiFi', 'Modern bathroom', 'Evening tea service']),
                'images' => json_encode(['https://placehold.co/800x600?text=Family+Suite+1', 'https://placehold.co/800x600?text=Family+Suite+2']),
            ],
            [
                'name' => 'Secret Garden Suite',
                'price' => 340,
                'description' => 'Romantic suite with private garden access and outdoor dining area',
                'category' => 'garden',
                'size' => 50,
                'max_occupancy' => 2,
                'amenities' => json_encode(['King bed', 'Private courtyard', 'WiFi', 'Ottoman-style bath', 'Evening tea service']),
                'images' => json_encode(['https://placehold.co/800x600?text=Garden+Suite+1', 'https://placehold.co/800x600?text=Garden+Suite+2']),
            ],
        ];

        foreach ($rooms as $room) {
            Room::create($room);
        }

        // Create members
        $members = [
            [
                'name' => 'Fatima Al-Shami',
                'email' => 'fatima@example.com',
                'phone' => '0599999999',
                'joined_at' => '2023-03-15',
                'status' => 'active',
            ],
            [
                'name' => 'Omar Yusuf',
                'email' => 'omar@example.com',
                'phone' => '0599999999',
                'joined_at' => '2023-04-22',
                'status' => 'active',
            ],
            [
                'name' => 'Nadia Ibrahim',
                'email' => 'nadia@example.com',
                'phone' => '0499999999',
                'joined_at' => '2023-06-10',
                'status' => 'not active',
            ],
        ];

        foreach ($members as $member) {
            Member::create($member);
        }

        // Create bookings
        $bookings = [
            [
                'room_id' => 1,
                'guest_name' => 'Ahmed Al-Mansour',
                'guest_email' => 'ahmed@example.com',
                'check_in' => '2024-03-20',
                'check_out' => '2024-03-25',
                'notes' => 'No special requests',
            ],
            [
                'room_id' => 2,
                'guest_name' => 'Sarah Williams',
                'guest_email' => 'sarah@example.com',
                'check_in' => '2024-03-22',
                'check_out' => '2024-03-24',
            ],
        ];

        foreach ($bookings as $booking) {
            Booking::create($booking);
        }

        // Create events
        $events = [
            [
                'title' => 'Heritage Walking Tour',
                'description' => 'Guided tour of historic sites',
                'images' => json_encode(['https://placehold.co/800x600?text=Tour+1', 'https://placehold.co/800x600?text=Tour+2']),
                'features' => json_encode([
                    'Expert local guide',
                    'Historical commentary',
                    'Traditional refreshments',
                    'Photo opportunities'
                ])
            ],
            [
                'title' => 'Traditional Cooking Workshop',
                'description' => 'Learn to cook local dishes',
                'images' => json_encode(['https://placehold.co/800x600?text=Cooking+1', 'https://placehold.co/800x600?text=Cooking+2']),
                'features' => json_encode([
                    'Hands-on cooking experience',
                    'Traditional recipes',
                    'All ingredients included',
                    'Take-home recipe book'
                ])
            ],
        ];

        foreach ($events as $event) {
            Event::create($event);
        }

        // Create restoration logs
        $restorationLogs = [
            [
                'phase' => 'phase 1',
                'description' => 'Facade restoration completed',
                'media_url' => 'https://placehold.co/800x600?text=Restoration+1',
            ],
            [
                'phase' => 'phase 2',
                'description' => 'Historical elements preservation',
                'media_url' => 'https://placehold.co/800x600?text=Restoration+2',
            ],
        ];

        foreach ($restorationLogs as $log) {
            RestorationLog::create($log);
        }
    }
}
