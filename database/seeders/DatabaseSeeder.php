<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Monkey D. Luffy',
            'username' => 'Luffy',
            'email' => 'luffy@gmail.com'
        ]);
        $this->call(CategorySeeder::class);
        $this->call(PublisherSeeder::class);
    }
}
