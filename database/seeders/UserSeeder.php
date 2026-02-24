<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * This class will seed the users database
 */
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $app = config('app.name');
        $name = "{$app} User";
        $email = 'user@'.preg_replace('/\s+/', '', strtolower($app)).'.com';
        $password = bcrypt('password');

        DB::insert(
            'INSERT INTO users (name, email, password, created_at, updated_at) 
            VALUES (?, ?, ?, NOW(), NOW())
            ON DUPLICATE KEY UPDATE
               name = VALUES(name),
               password = VALUES(password),
               updated_at = NOW()',
            [$name, $email, $password]
        );
    }
}
