<?php

namespace Tests\Feature;

use App\Models\Member;
use App\Models\Room;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class SecurityAndApplicationTest extends TestCase
{
    use RefreshDatabase;

    protected User $adminUser;

    protected User $regularUser;

    protected function setUp(): void
    {
        parent::setUp();

        $this->adminUser = User::factory()->create([
            'email' => 'admin@wahoud.com',
            'is_admin' => true,
            'role' => 'super_admin',
            'password' => Hash::make('SecretPass123!'),
        ]);

        $this->regularUser = User::factory()->create([
            'email' => 'user@example.com',
            'is_admin' => false,
            'role' => 'customer',
            'permissions' => [],
            'password' => Hash::make('UserPass123!'),
        ]);
    }

    public function test_homepage_and_internal_pages_render_successfully(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);

        $response = $this->get('/rooms');
        $response->assertStatus(200);

        $response = $this->get('/dining');
        $response->assertStatus(200);

        $response = $this->get('/events');
        $response->assertStatus(200);

        $response = $this->get('/restoration');
        $response->assertStatus(200);

        $response = $this->get('/contact');
        $response->assertStatus(200);

        $response = $this->get('/experience');
        $response->assertStatus(200);

        $response = $this->get('/membership');
        $response->assertRedirect('/');
    }

    public function test_language_switching_sets_locale_and_prevents_open_redirect(): void
    {
        // Valid switch to Arabic
        $response = $this->get('/language?locale=ar');
        $response->assertStatus(200);
        $this->assertEquals('ar', session('locale'));

        // Valid switch to English
        $response = $this->get('/language?locale=en');
        $response->assertStatus(200);
        $this->assertEquals('en', session('locale'));

        // External malicious Referer is sanitized to safe URL
        $response = $this->withHeaders(['Referer' => 'https://attacker.evil.com/phish'])
            ->get('/language?locale=ar');
        $response->assertStatus(200);
        $response->assertDontSee('https://attacker.evil.com/phish');
        $response->assertSee(url('/'));
    }

    public function test_unauthenticated_users_cannot_access_sensitive_admin_apis(): void
    {
        // Unauthenticated access to event requests
        $response = $this->getJson('/api/event-requests');
        $response->assertStatus(401);

        // Unauthenticated access to membership applications
        $response = $this->getJson('/api/membership-applications');
        $response->assertStatus(401);

        // Unauthenticated access to contact inquiries
        $response = $this->getJson('/api/contact-inquiries');
        $response->assertStatus(401);

        // Unauthenticated room mutation
        $response = $this->postJson('/api/rooms/create', [
            'name' => 'Hacked Room',
            'description' => 'Hacked Description',
            'price' => 100,
            'category' => 'Heritage',
        ]);
        $response->assertStatus(401);

        // Unauthenticated booking management
        $response = $this->getJson('/api/admin/bookings');
        $response->assertStatus(401);

        // Unauthenticated member management
        $response = $this->getJson('/api/admin/members');
        $response->assertStatus(401);
    }

    public function test_admin_authentication_and_authorized_endpoints(): void
    {
        // Test admin login
        $response = $this->postJson('/api/admin/login', [
            'email' => 'admin@wahoud.com',
            'password' => 'SecretPass123!',
        ]);
        $response->assertStatus(200);
        $response->assertJsonStructure(['token', 'user']);

        $token = $response->json('token');

        // Test authenticated admin access to stats
        $response = $this->withToken($token)->getJson('/api/admin/stats');
        $response->assertStatus(200);
        $response->assertJsonStructure(['total_rooms', 'active_bookings', 'total_members', 'restoration_logs']);

        // Test authenticated admin access to bookings list
        $response = $this->withToken($token)->getJson('/api/admin/bookings');
        $response->assertStatus(200);

        // Test authenticated admin access to members list
        $response = $this->withToken($token)->getJson('/api/admin/members');
        $response->assertStatus(200);
    }

    public function test_non_admin_user_is_forbidden_from_admin_apis(): void
    {
        $regularToken = $this->regularUser->createToken('test-token')->plainTextToken;
        $response = $this->withToken($regularToken)->getJson('/api/admin/stats');
        $response->assertStatus(403);
    }

    public function test_public_form_submissions(): void
    {
        // Public contact inquiry submission
        $response = $this->postJson('/api/contact-inquiries/create', [
            'full_name' => 'Guest User',
            'email' => 'guest@example.com',
            'type' => 'general',
            'subject' => 'General Inquiry',
            'message' => 'Hello, I have a question about booking.',
        ]);
        $response->assertStatus(201);
        $this->assertDatabaseHas('contact_inquiries', [
            'email' => 'guest@example.com',
            'subject' => 'General Inquiry',
        ]);

        // Public event request submission
        $response = $this->postJson('/api/event-requests/create', [
            'name' => 'Event Organizer',
            'email' => 'organizer@example.com',
            'event_type' => 'cultural',
            'preferred_date' => now()->addDays(14)->format('Y-m-d'),
            'guest_count' => 50,
            'additional_requirements' => 'Sound system needed',
        ]);
        $response->assertStatus(201);
        $this->assertDatabaseHas('event_requests', [
            'email' => 'organizer@example.com',
            'guest_count' => 50,
        ]);

        // Public membership application submission
        $response = $this->postJson('/api/membership-applications', [
            'first_name' => 'Sara',
            'last_name' => 'Ahmad',
            'email' => 'sara@example.com',
            'phone' => '+963999999999',
            'membership_tier' => 'Heritage',
            'about' => 'Heritage enthusiast',
        ]);
        $response->assertStatus(201);
        $this->assertDatabaseHas('membership_applications', [
            'email' => 'sara@example.com',
            'membership_tier' => 'Heritage',
        ]);
    }

    public function test_public_catalog_endpoints(): void
    {
        Room::create([
            'name' => 'Heritage Suite',
            'description' => 'Beautiful suite',
            'price' => 250,
            'category' => 'Heritage',
            'images' => ['rooms/suite1.jpg'],
            'amenities' => ['Wi-Fi'],
            'size' => 45,
            'max_occupancy' => 2,
        ]);

        $response = $this->getJson('/api/rooms');
        $response->assertStatus(200);
        $response->assertJsonStructure(['message', 'data']);

        $response = $this->getJson('/api/restoration');
        $response->assertStatus(200);
    }

    public function test_booking_creation_and_availability(): void
    {
        $room = Room::create([
            'name' => 'Royal Suite',
            'description' => 'Royal Suite description',
            'price' => 500,
            'category' => 'Royal',
            'images' => ['rooms/royal.jpg'],
            'amenities' => ['King Bed'],
            'size' => 60,
            'max_occupancy' => 4,
        ]);

        $checkIn = now()->addDays(5)->format('Y-m-d');
        $checkOut = now()->addDays(8)->format('Y-m-d');

        // Check availability before booking
        $response = $this->postJson("/api/rooms/{$room->id}/check-availability", [
            'check_in' => $checkIn,
            'check_out' => $checkOut,
        ]);
        $response->assertStatus(200);
        $response->assertJson(['available' => true]);

        // Create booking
        $response = $this->postJson('/api/book', [
            'room_id' => $room->id,
            'guest_name' => 'John Doe',
            'guest_email' => 'john@example.com',
            'check_in' => $checkIn,
            'check_out' => $checkOut,
        ]);
        $response->assertStatus(201);

        // Check availability after booking - should be false for overlapping dates
        $response = $this->postJson("/api/rooms/{$room->id}/check-availability", [
            'check_in' => $checkIn,
            'check_out' => $checkOut,
        ]);
        $response->assertStatus(200);
        $response->assertJson(['available' => false]);
    }

    public function test_admin_can_manage_rooms_via_api(): void
    {
        $adminToken = $this->adminUser->createToken('admin-test')->plainTextToken;

        // Admin creates room
        $response = $this->withToken($adminToken)->postJson('/api/rooms/create', [
            'name' => 'New Admin Room',
            'description' => 'Created by admin',
            'price' => 350,
            'category' => 'Heritage',
            'size' => '30',
            'max_occupancy' => 2,
        ]);
        $response->assertStatus(201);
        $roomId = $response->json('room.id');

        // Admin updates room
        $response = $this->withToken($adminToken)->postJson("/api/rooms/update/{$roomId}", [
            'name' => 'Updated Admin Room',
            'description' => 'Updated by admin',
            'price' => 400,
            'category' => 'Heritage',
            'images' => [UploadedFile::fake()->image('room.jpg')],
            'amenities' => ['Balcony', 'Free Wi-Fi'],
            'size' => '35',
            'max_occupancy' => 2,
        ]);
        $response->assertStatus(200);

        // Admin deletes room
        $response = $this->withToken($adminToken)->deleteJson("/api/rooms/{$roomId}");
        $response->assertStatus(200);

        $this->assertDatabaseMissing('rooms', ['id' => $roomId]);
    }

    public function test_admin_login_rate_limiting(): void
    {
        // 5 attempts allowed by throttle:5,1
        for ($i = 0; $i < 5; $i++) {
            $response = $this->postJson('/api/admin/login', [
                'email' => 'admin@wahoud.com',
                'password' => 'WrongPassword',
            ]);
            $response->assertStatus(422);
        }

        // 6th attempt should be blocked by rate limiter with 429
        $response = $this->postJson('/api/admin/login', [
            'email' => 'admin@wahoud.com',
            'password' => 'WrongPassword',
        ]);
        $response->assertStatus(429);
    }
}
