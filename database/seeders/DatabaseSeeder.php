<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Seed Admin Account
        User::updateOrCreate(
            ['email' => 'nayakemily50@gmail.com'],
            [
                'name' => 'Admin',
                'phone' => '01700000000',
                'password' => bcrypt('nayakemily50@gmail.com'),
                'role' => 'admin',
                'status' => 'approved',
                'email_verified_at' => now(),
            ]
        );

        // Seed Demo Data
        $this->call(DemoSeeder::class);
    }
}
