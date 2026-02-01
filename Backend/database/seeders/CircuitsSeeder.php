<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CircuitsSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('circuits')->insert([
            ['CircuitID' => 1, 'Name' => 'Bahrain International Circuit', 'Location' => 'Sakhir', 'Nation' => 'Bahrain', 'FirstGrandPrix' => 2004, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 2, 'Name' => 'Jeddah Corniche Circuit', 'Location' => 'Jeddah', 'Nation' => 'Saudi Arabia', 'FirstGrandPrix' => 2021, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 3, 'Name' => 'Albert Park Circuit', 'Location' => 'Melbourne', 'Nation' => 'Australia', 'FirstGrandPrix' => 1996, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 4, 'Name' => 'Suzuka Circuit', 'Location' => 'Suzuka', 'Nation' => 'Japan', 'FirstGrandPrix' => 1987, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 5, 'Name' => 'Shanghai International Circuit', 'Location' => 'Shanghai', 'Nation' => 'China', 'FirstGrandPrix' => 2004, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 6, 'Name' => 'Miami International Autodrome', 'Location' => 'Miami', 'Nation' => 'USA', 'FirstGrandPrix' => 2022, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 7, 'Name' => 'Autodromo Enzo e Dino Ferrari (Imola)', 'Location' => 'Imola', 'Nation' => 'Italy', 'FirstGrandPrix' => 1980, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 8, 'Name' => 'Circuit de Monaco', 'Location' => 'Monte Carlo', 'Nation' => 'Monaco', 'FirstGrandPrix' => 1929, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 9, 'Name' => 'Circuit Gilles Villeneuve', 'Location' => 'Montreal', 'Nation' => 'Canada', 'FirstGrandPrix' => 1978, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 10, 'Name' => 'Circuit de Barcelona-Catalunya', 'Location' => 'Barcelona', 'Nation' => 'Spain', 'FirstGrandPrix' => 1991, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 11, 'Name' => 'Red Bull Ring', 'Location' => 'Spielberg', 'Nation' => 'Austria', 'FirstGrandPrix' => 1970, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 12, 'Name' => 'Silverstone Circuit', 'Location' => 'Silverstone', 'Nation' => 'United Kingdom', 'FirstGrandPrix' => 1950, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 13, 'Name' => 'Hungaroring', 'Location' => 'Mogyoród', 'Nation' => 'Hungary', 'FirstGrandPrix' => 1986, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 14, 'Name' => 'Circuit de Spa-Francorchamps', 'Location' => 'Spa', 'Nation' => 'Belgium', 'FirstGrandPrix' => 1950, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 15, 'Name' => 'Circuit Zandvoort', 'Location' => 'Zandvoort', 'Nation' => 'Netherlands', 'FirstGrandPrix' => 1952, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 16, 'Name' => 'Autodromo Nazionale Monza', 'Location' => 'Monza', 'Nation' => 'Italy', 'FirstGrandPrix' => 1950, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 17, 'Name' => 'Baku City Circuit', 'Location' => 'Baku', 'Nation' => 'Azerbaijan', 'FirstGrandPrix' => 2016, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 18, 'Name' => 'Marina Bay Street Circuit', 'Location' => 'Singapore', 'Nation' => 'Singapore', 'FirstGrandPrix' => 2008, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 19, 'Name' => 'Circuit of the Americas (COTA)', 'Location' => 'Austin, Texas', 'Nation' => 'United States', 'FirstGrandPrix' => 2012, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 20, 'Name' => 'Autódromo Hermanos Rodríguez', 'Location' => 'Mexico City', 'Nation' => 'Mexico', 'FirstGrandPrix' => 1963, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 21, 'Name' => 'Autódromo José Carlos Pace (Interlagos)', 'Location' => 'São Paulo', 'Nation' => 'Brazil', 'FirstGrandPrix' => 1973, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 22, 'Name' => 'Las Vegas Street Circuit', 'Location' => 'Las Vegas', 'Nation' => 'United States', 'FirstGrandPrix' => 2023, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 23, 'Name' => 'Lusail International Circuit', 'Location' => 'Doha', 'Nation' => 'Qatar', 'FirstGrandPrix' => 2023, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
            ['CircuitID' => 24, 'Name' => 'Yas Marina Circuit', 'Location' => 'Abu Dhabi', 'Nation' => 'United Arab Emirates', 'FirstGrandPrix' => 2009, 'RecordLapTime' => null, 'RecordDriver' => null, 'Images' => ''],
        ]);
    }
}