<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QualifyingResultsSeeder extends Seeder
{
    public function run()
    {
        $teamDriverMapping = [
            1 => [1, 2],
            2 => [3, 4],
            3 => [5, 6],
            4 => [7, 8],
            5 => [9, 10],
            6 => [11, 12],
            7 => [13, 14],
            8 => [15, 16],
            9 => [17, 18],
            10 => [19, 20],
        ];

        for ($grandPrixId = 1; $grandPrixId <= 24; $grandPrixId++) {
            $allDrivers = [];
            foreach ($teamDriverMapping as $constructorId => $drivers) {
                foreach ($drivers as $driverId) {
                    $allDrivers[] = [
                        'driver_id' => $driverId,
                        'constructor_id' => $constructorId
                    ];
                }
            }

            shuffle($allDrivers);

            $results = [];
            foreach ($allDrivers as $index => $driverData) {
                $results[] = [
                    'GrandPrixID' => $grandPrixId,
                    'DriverID' => $driverData['driver_id'],
                    'ConstructorID' => $driverData['constructor_id'],
                    'GridPosition' => $index + 1,
                ];
            }

            DB::table('qualifyingresults')->insert($results);
        }
    }
}