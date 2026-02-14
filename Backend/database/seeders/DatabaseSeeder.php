<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
       public function run(): void
    {
        $this->call([
            CircuitsSeeder::class,        
            ConstructorSeeder::class,    
            DriverSeeder::class,         
            GrandPrixSeeder::class,      
            RaceResultSeeder::class,  
            QualifyingResultSeeder::class
            
        ]);

        User::create([
    'name' => 'Admin',                // a felhasználó neve
    'email' => 'admin@admin.hu',      // a felhasználó email címe
    'password' => \Illuminate\Support\Facades\Hash::make('Aa123456'), // a jelszó biztonságos hash-elése
]);

    }
}
