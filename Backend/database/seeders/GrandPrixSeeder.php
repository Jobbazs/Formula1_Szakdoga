<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GrandPrixSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('grandprix')->insert([
            ['GrandPrixID' => 1, 'Name' => 'Bahrain Grand Prix', 'Country' => 'Bahrain', 'CircuitID' => 1, 'Year' => 2024, 'WinnerDriverID' => 1, 'Image' => ''],
            ['GrandPrixID' => 2, 'Name' => 'Saudi Arabian Grand Prix', 'Country' => 'Saudi Arabia', 'CircuitID' => 2, 'Year' => 2024, 'WinnerDriverID' => 1, 'Image' => ''],
            ['GrandPrixID' => 3, 'Name' => 'Australian Grand Prix', 'Country' => 'Australia', 'CircuitID' => 3, 'Year' => 2024, 'WinnerDriverID' => 6, 'Image' => ''],
            ['GrandPrixID' => 4, 'Name' => 'Japanese Grand Prix', 'Country' => 'Japan', 'CircuitID' => 4, 'Year' => 2024, 'WinnerDriverID' => 1, 'Image' => ''],
            ['GrandPrixID' => 5, 'Name' => 'Chinese Grand Prix', 'Country' => 'China', 'CircuitID' => 5, 'Year' => 2024, 'WinnerDriverID' => 1, 'Image' => ''],
            ['GrandPrixID' => 6, 'Name' => 'Miami Grand Prix', 'Country' => 'United States', 'CircuitID' => 6, 'Year' => 2024, 'WinnerDriverID' => 3, 'Image' => ''],
            ['GrandPrixID' => 7, 'Name' => 'Emilia Romagna Grand Prix', 'Country' => 'Italy', 'CircuitID' => 7, 'Year' => 2024, 'WinnerDriverID' => 1, 'Image' => ''],
            ['GrandPrixID' => 8, 'Name' => 'Monaco Grand Prix', 'Country' => 'Monaco', 'CircuitID' => 8, 'Year' => 2024, 'WinnerDriverID' => 5, 'Image' => ''],
            ['GrandPrixID' => 9, 'Name' => 'Canadian Grand Prix', 'Country' => 'Canada', 'CircuitID' => 9, 'Year' => 2024, 'WinnerDriverID' => 1, 'Image' => ''],
            ['GrandPrixID' => 10, 'Name' => 'Spanish Grand Prix', 'Country' => 'Spain', 'CircuitID' => 10, 'Year' => 2024, 'WinnerDriverID' => 1, 'Image' => ''],
            ['GrandPrixID' => 11, 'Name' => 'Austrian Grand Prix', 'Country' => 'Austria', 'CircuitID' => 11, 'Year' => 2024, 'WinnerDriverID' => 7, 'Image' => ''],
            ['GrandPrixID' => 12, 'Name' => 'British Grand Prix', 'Country' => 'United Kingdom', 'CircuitID' => 12, 'Year' => 2024, 'WinnerDriverID' => 8, 'Image' => ''],
            ['GrandPrixID' => 13, 'Name' => 'Hungarian Grand Prix', 'Country' => 'Hungary', 'CircuitID' => 13, 'Year' => 2024, 'WinnerDriverID' => 4, 'Image' => ''],
            ['GrandPrixID' => 14, 'Name' => 'Belgian Grand Prix', 'Country' => 'Belgium', 'CircuitID' => 14, 'Year' => 2024, 'WinnerDriverID' => 8, 'Image' => ''],
            ['GrandPrixID' => 15, 'Name' => 'Dutch Grand Prix', 'Country' => 'Netherlands', 'CircuitID' => 15, 'Year' => 2024, 'WinnerDriverID' => 3, 'Image' => ''],
            ['GrandPrixID' => 16, 'Name' => 'Italian Grand Prix (Monza)', 'Country' => 'Italy', 'CircuitID' => 16, 'Year' => 2024, 'WinnerDriverID' => 5, 'Image' => ''],
            ['GrandPrixID' => 17, 'Name' => 'Azerbaijan Grand Prix', 'Country' => 'Azerbaijan', 'CircuitID' => 17, 'Year' => 2024, 'WinnerDriverID' => 4, 'Image' => ''],
            ['GrandPrixID' => 18, 'Name' => 'Singapore Grand Prix', 'Country' => 'Singapore', 'CircuitID' => 18, 'Year' => 2024, 'WinnerDriverID' => 3, 'Image' => ''],
            ['GrandPrixID' => 19, 'Name' => 'United States Grand Prix (COTA)', 'Country' => 'United States', 'CircuitID' => 19, 'Year' => 2024, 'WinnerDriverID' => 5, 'Image' => ''],
            ['GrandPrixID' => 20, 'Name' => 'Mexico City Grand Prix', 'Country' => 'Mexico', 'CircuitID' => 20, 'Year' => 2024, 'WinnerDriverID' => 6, 'Image' => ''],
            ['GrandPrixID' => 21, 'Name' => 'Brazilian Grand Prix', 'Country' => 'Brazil', 'CircuitID' => 21, 'Year' => 2024, 'WinnerDriverID' => 1, 'Image' => ''],
            ['GrandPrixID' => 22, 'Name' => 'Las Vegas Grand Prix', 'Country' => 'United States', 'CircuitID' => 22, 'Year' => 2024, 'WinnerDriverID' => 7, 'Image' => ''],
            ['GrandPrixID' => 23, 'Name' => 'Qatar Grand Prix', 'Country' => 'Qatar', 'CircuitID' => 23, 'Year' => 2024, 'WinnerDriverID' => 1, 'Image' => ''],
            ['GrandPrixID' => 24, 'Name' => 'Abu Dhabi Grand Prix', 'Country' => 'United Arab Emirates', 'CircuitID' => 24, 'Year' => 2024, 'WinnerDriverID' => 3, 'Image' => ''],
        ]);
    }
}