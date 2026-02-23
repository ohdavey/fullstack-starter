<?php

namespace Tests\Feature\Api;

// use Illuminate\Foundation\Testing\RefreshDatabase;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic test example.
     */
    public function test_invalid_user_auth(): void
    {
        $response = $this->postJson('/api/login', [
            'email' => 'invalid@example.com',
            'password' => 'invalidpassword',
        ]);

        $response->assertStatus(401);
    }

    public function test_user_registration_and_login(): void
    {
        $user = [
            'name' => 'Test User',
            'email' => 'testuser@example.com',
            'password' => 'password123',
        ];
        // Test user registration
        $registrationResponse = $this->postJson('/api/register', [
            'name' => $user['name'],
            'email' => $user['email'],
            'password' => $user['password'],
            'password_confirmation' => $user['password'],
        ]);

        $registrationResponse->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'token',
                    'user' => [
                        'id',
                        'name',
                        'email',
                    ],
                ],
            ]);

        // Test user login
        $loginResponse = $this->postJson('/api/login', [
            'email' => $user['email'],
            'password' => $user['password'],
        ]);

        $loginResponse->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'token',
                    'user' => [
                        'id',
                        'name',
                        'email',
                    ],
                ],
            ]);
    }
}
