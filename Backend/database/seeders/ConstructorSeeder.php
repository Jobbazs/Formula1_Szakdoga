<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConstructorSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('constructors')->insert([
            ['ConstructorID' => 1, 'Name' => 'Red Bull Racing - Honda RBPT', 'TeamPrincipal' => 'Christian Horner', 'FoundedYear' => 2005, 'Podiums' => 0, 'Wins' => 0, 'PolePositions' => 0, 'WorldChampionships' => 6, 'FirstGrandPrix' => 'Australian GP', 'Nation' => 'Austria', 'Image' => ''],
            ['ConstructorID' => 2, 'Name' => 'Scuderia Ferrari', 'TeamPrincipal' => 'Frederic Vasseur', 'FoundedYear' => 1929, 'Podiums' => 0, 'Wins' => 0, 'PolePositions' => 0, 'WorldChampionships' => 16, 'FirstGrandPrix' => 'Italian GP', 'Nation' => 'Italy', 'Image' => ''],
            ['ConstructorID' => 3, 'Name' => 'Mercedes-AMG Petronas', 'TeamPrincipal' => 'Toto Wolff', 'FoundedYear' => 1954, 'Podiums' => 0, 'Wins' => 0, 'PolePositions' => 0, 'WorldChampionships' => 8, 'FirstGrandPrix' => 'British GP', 'Nation' => 'United Kingdom', 'Image' => ''],
            ['ConstructorID' => 4, 'Name' => 'McLaren - Mercedes', 'TeamPrincipal' => 'Andrea Stella', 'FoundedYear' => 1963, 'Podiums' => 0, 'Wins' => 0, 'PolePositions' => 0, 'WorldChampionships' => 9, 'FirstGrandPrix' => 'British GP', 'Nation' => 'United Kingdom', 'Image' => ''],
            ['ConstructorID' => 5, 'Name' => 'Aston Martin Aramco', 'TeamPrincipal' => 'Mike Krack', 'FoundedYear' => 1913, 'Podiums' => 0, 'Wins' => 0, 'PolePositions' => 0, 'WorldChampionships' => 0, 'FirstGrandPrix' => 'British GP', 'Nation' => 'United Kingdom', 'Image' => ''],
            ['ConstructorID' => 6, 'Name' => 'BWT Alpine F1 Team', 'TeamPrincipal' => 'Oliver Oakes', 'FoundedYear' => 1995, 'Podiums' => 0, 'Wins' => 0, 'PolePositions' => 0, 'WorldChampionships' => 0, 'FirstGrandPrix' => 'Australian GP', 'Nation' => 'France', 'Image' => ''],
            ['ConstructorID' => 7, 'Name' => 'Williams Racing', 'TeamPrincipal' => 'James Vowles', 'FoundedYear' => 1977, 'Podiums' => 0, 'Wins' => 0, 'PolePositions' => 0, 'WorldChampionships' => 9, 'FirstGrandPrix' => 'British GP', 'Nation' => 'United Kingdom', 'Image' => ''],
            ['ConstructorID' => 8, 'Name' => 'Visa Cash App RB (RB)', 'TeamPrincipal' => 'Laurent Mekies', 'FoundedYear' => 2006, 'Podiums' => 0, 'Wins' => 0, 'PolePositions' => 0, 'WorldChampionships' => 0, 'FirstGrandPrix' => 'Australian GP', 'Nation' => 'Italy/NewZealand', 'Image' => ''],
            ['ConstructorID' => 9, 'Name' => 'Kick Sauber F1 Team', 'TeamPrincipal' => 'Alessandro Alunni Bravi', 'FoundedYear' => 1993, 'Podiums' => 0, 'Wins' => 0, 'PolePositions' => 0, 'WorldChampionships' => 0, 'FirstGrandPrix' => 'Australian GP', 'Nation' => 'Switzerland', 'Image' => ''],
            ['ConstructorID' => 10, 'Name' => 'MoneyGram Haas F1 Team', 'TeamPrincipal' => 'Ayao Komatsu', 'FoundedYear' => 2016, 'Podiums' => 0, 'Wins' => 0, 'PolePositions' => 0, 'WorldChampionships' => 0, 'FirstGrandPrix' => 'Hungarian GP', 'Nation' => 'United States', 'Image' => ''],
        ]);
    }
}