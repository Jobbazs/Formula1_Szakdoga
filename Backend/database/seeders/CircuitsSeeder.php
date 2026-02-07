<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CircuitsSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('circuits')->insert([
            ['CircuitID' => 1, 'Name' => 'Bahrain International Circuit', 'Location' => 'Sakhir', 'Country' => 'Bahrain', 'Length' => 5.412, 'Laps' => 57, 'FirstGrandPrix' => 2004, 'RecordDriver' => 'Pedro de la Rosa', 'RecordLapTime' => '01:31.447', 'Image' => ''],
            ['CircuitID' => 2, 'Name' => 'Jeddah Corniche Circuit', 'Location' => 'Jeddah', 'Country' => 'Saudi Arabia', 'Length' => 6.174, 'Laps' => 50, 'FirstGrandPrix' => 2021, 'RecordDriver' => 'Lewis Hamilton', 'RecordLapTime' => '01:30.734', 'Image' => ''],
            ['CircuitID' => 3, 'Name' => 'Albert Park Circuit', 'Location' => 'Melbourne', 'Country' => 'Australia', 'Length' => 5.278, 'Laps' => 58, 'FirstGrandPrix' => 1996, 'RecordDriver' => 'Charles Leclerc', 'RecordLapTime' => '01:20.260', 'Image' => ''],
            ['CircuitID' => 4, 'Name' => 'Suzuka Circuit', 'Location' => 'Suzuka', 'Country' => 'Japan', 'Length' => 5.807, 'Laps' => 53, 'FirstGrandPrix' => 1987, 'RecordDriver' => 'Lewis Hamilton', 'RecordLapTime' => '01:30.983', 'Image' => ''],
            ['CircuitID' => 5, 'Name' => 'Shanghai International Circuit', 'Location' => 'Shanghai', 'Country' => 'China', 'Length' => 5.451, 'Laps' => 56, 'FirstGrandPrix' => 2004, 'RecordDriver' => 'Michael Schumacher', 'RecordLapTime' => '01:32.238', 'Image' => ''],
            ['CircuitID' => 6, 'Name' => 'Miami International Autodrome', 'Location' => 'Miami', 'Country' => 'USA', 'Length' => 5.412, 'Laps' => 57, 'FirstGrandPrix' => 2022, 'RecordDriver' => 'Max Verstappen', 'RecordLapTime' => '01:29.708', 'Image' => ''],
            ['CircuitID' => 7, 'Name' => 'Autodromo Enzo e Dino Ferrari (Imola)', 'Location' => 'Imola', 'Country' => 'Italy', 'Length' => 4.909, 'Laps' => 63, 'FirstGrandPrix' => 1980, 'RecordDriver' => 'Lewis Hamilton', 'RecordLapTime' => '01:15.484', 'Image' => ''],
            ['CircuitID' => 8, 'Name' => 'Circuit de Monaco', 'Location' => 'Monte Carlo', 'Country' => 'Monaco', 'Length' => 3.337, 'Laps' => 78, 'FirstGrandPrix' => 1929, 'RecordDriver' => 'Lewis Hamilton', 'RecordLapTime' => '01:12.909', 'Image' => ''],
            ['CircuitID' => 9, 'Name' => 'Circuit Gilles Villeneuve', 'Location' => 'Montreal', 'Country' => 'Canada', 'Length' => 4.361, 'Laps' => 70, 'FirstGrandPrix' => 1978, 'RecordDriver' => 'Valtteri Bottas', 'RecordLapTime' => '01:13.078', 'Image' => ''],
            ['CircuitID' => 10, 'Name' => 'Circuit de Barcelona-Catalunya', 'Location' => 'Barcelona', 'Country' => 'Spain', 'Length' => 4.675, 'Laps' => 66, 'FirstGrandPrix' => 1991, 'RecordDriver' => 'Max Verstappen', 'RecordLapTime' => '01:16.330', 'Image' => ''],
            ['CircuitID' => 11, 'Name' => 'Red Bull Ring', 'Location' => 'Spielberg', 'Country' => 'Austria', 'Length' => 4.318, 'Laps' => 71, 'FirstGrandPrix' => 1970, 'RecordDriver' => 'Carlos Sainz Jr.', 'RecordLapTime' => '01:05.619', 'Image' => ''],
            ['CircuitID' => 12, 'Name' => 'Silverstone Circuit', 'Location' => 'Silverstone', 'Country' => 'United Kingdom', 'Length' => 5.891, 'Laps' => 52, 'FirstGrandPrix' => 1950, 'RecordDriver' => 'Max Verstappen', 'RecordLapTime' => '01:27.097', 'Image' => ''],
            ['CircuitID' => 13, 'Name' => 'Hungaroring', 'Location' => 'Mogyoród', 'Country' => 'Hungary', 'Length' => 4.381, 'Laps' => 70, 'FirstGrandPrix' => 1986, 'RecordDriver' => 'Lewis Hamilton', 'RecordLapTime' => '01:16.627', 'Image' => ''],
            ['CircuitID' => 14, 'Name' => 'Circuit de Spa-Francorchamps', 'Location' => 'Spa', 'Country' => 'Belgium', 'Length' => 7.004, 'Laps' => 44, 'FirstGrandPrix' => 1950, 'RecordDriver' => 'Valtteri Bottas', 'RecordLapTime' => '01:46.286', 'Image' => ''],
            ['CircuitID' => 15, 'Name' => 'Circuit Zandvoort', 'Location' => 'Zandvoort', 'Country' => 'Netherlands', 'Length' => 4.259, 'Laps' => 72, 'FirstGrandPrix' => 1952, 'RecordDriver' => 'Lewis Hamilton', 'RecordLapTime' => '01:11.097', 'Image' => ''],
            ['CircuitID' => 16, 'Name' => 'Autodromo Nazionale Monza', 'Location' => 'Monza', 'Country' => 'Italy', 'Length' => 5.793, 'Laps' => 53, 'FirstGrandPrix' => 1950, 'RecordDriver' => 'Rubens Barrichello', 'RecordLapTime' => '01:21.046', 'Image' => ''],
            ['CircuitID' => 17, 'Name' => 'Baku City Circuit', 'Location' => 'Baku', 'Country' => 'Azerbaijan', 'Length' => 6.003, 'Laps' => 51, 'FirstGrandPrix' => 2016, 'RecordDriver' => 'Charles Leclerc', 'RecordLapTime' => '01:43.009', 'Image' => ''],
            ['CircuitID' => 18, 'Name' => 'Marina Bay Street Circuit', 'Location' => 'Singapore', 'Country' => 'Singapore', 'Length' => 4.940, 'Laps' => 62, 'FirstGrandPrix' => 2008, 'RecordDriver' => 'Lewis Hamilton', 'RecordLapTime' => '01:35.867', 'Image' => ''],
            ['CircuitID' => 19, 'Name' => 'Circuit of the Americas (COTA)', 'Location' => 'Austin, Texas', 'Country' => 'United States', 'Length' => 5.513, 'Laps' => 56, 'FirstGrandPrix' => 2012, 'RecordDriver' => 'Charles Leclerc', 'RecordLapTime' => '01:36.169', 'Image' => ''],
            ['CircuitID' => 20, 'Name' => 'Autódromo Hermanos Rodríguez', 'Location' => 'Mexico City', 'Country' => 'Mexico', 'Length' => 4.304, 'Laps' => 71, 'FirstGrandPrix' => 1963, 'RecordDriver' => 'Valtteri Bottas', 'RecordLapTime' => '01:17.774', 'Image' => ''],
            ['CircuitID' => 21, 'Name' => 'Autódromo José Carlos Pace (Interlagos)', 'Location' => 'São Paulo', 'Country' => 'Brazil', 'Length' => 4.309, 'Laps' => 71, 'FirstGrandPrix' => 1973, 'RecordDriver' => 'Valtteri Bottas', 'RecordLapTime' => '01:10.540', 'Image' => ''],
            ['CircuitID' => 22, 'Name' => 'Las Vegas Street Circuit', 'Location' => 'Las Vegas', 'Country' => 'United States', 'Length' => 6.201, 'Laps' => 50, 'FirstGrandPrix' => 2023, 'RecordDriver' => 'Oscar Piastri', 'RecordLapTime' => '01:35.490', 'Image' => ''],
            ['CircuitID' => 23, 'Name' => 'Lusail International Circuit', 'Location' => 'Doha', 'Country' => 'Qatar', 'Length' => 5.419, 'Laps' => 57, 'FirstGrandPrix' => 2021, 'RecordDriver' => 'Max Verstappen', 'RecordLapTime' => '01:24.319', 'Image' => ''],
            ['CircuitID' => 24, 'Name' => 'Yas Marina Circuit', 'Location' => 'Abu Dhabi', 'Country' => 'United Arab Emirates', 'Length' => 5.281, 'Laps' => 58, 'FirstGrandPrix' => 2009, 'RecordDriver' => 'Max Verstappen', 'RecordLapTime' => '01:26.103', 'Image' => ''],
        ]);
    }
}