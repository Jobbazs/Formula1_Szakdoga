<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class QualifyingResultFactory extends Factory
{
    protected $model = \App\Models\QualifyingResult::class;

    public function definition()
    {
        return [
            'GrandPrixID' => null, 
            'DriverID' => null, 
            'ConstructorID' => null, 
            'GridPosition' => null, 
        ];
    }

   
    public function forGrandPrix(int $grandPrixId)
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

        return $results;
    }
}