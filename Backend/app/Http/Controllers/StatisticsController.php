<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticsController extends Controller
{
    public function driverStats($id)
    {
        $points = DB::table('race_result')
            ->where('DriverID', $id)
            ->whereNotNull('position')
            ->sum('points');

        $podiums = DB::table('race_result')
            ->where('DriverID', $id)
            ->whereIn('position', [1, 2, 3])
            ->count();

        $fastestLaps = DB::table('race_result')
            ->where('DriverID', $id)
            ->where('FastestLap', true)
            ->count();

        $wins = DB::table('race_result')
            ->where('DriverID', $id)
            ->where('position', 1)
            ->count();

        $races = DB::table('race_result')
            ->where('DriverID', $id)
            ->count();

        $pointsPerRace = $races > 0 ? round($points / $races, 2) : 0;

        $pointsChart = DB::table('race_result')
            ->join('grandprix', 'race_result.GrandPrixID', '=', 'grandprix.GrandPrixID')
            ->where('race_result.DriverID', $id)
            ->select('grandprix.Name', 'grandprix.Country', DB::raw('SUM(race_result.points) as points'))
            ->groupBy('grandprix.GrandPrixID', 'grandprix.Name', 'grandprix.Country')
            ->orderBy('grandprix.GrandPrixID')
            ->get();

        return response()->json([
            'points'        => $points,
            'podiums'       => $podiums,
            'wins'          => $wins,
            'fastest_laps'  => $fastestLaps,
            'races'         => $races,
            'points_per_race' => $pointsPerRace,
            'points_chart'  => $pointsChart,
        ]);
    }

    public function constructorStats($id)
    {
        $points = DB::table('race_result')
            ->where('ConstructorID', $id)
            ->whereNotNull('position')
            ->sum('points');

        $podiums = DB::table('race_result')
            ->where('ConstructorID', $id)
            ->whereIn('position', [1, 2, 3])
            ->count();

        $fastestLaps = DB::table('race_result')
            ->where('ConstructorID', $id)
            ->where('FastestLap', true)
            ->count();

        $wins = DB::table('race_result')
            ->where('ConstructorID', $id)
            ->where('position', 1)
            ->count();

        $races = DB::table('race_result')
            ->where('ConstructorID', $id)
            ->whereNotNull('position')
            ->count();

        $pointsPerRace = $races > 0 ? round($points / $races, 2) : 0;

        $pointsChart = DB::table('race_result')
            ->join('grandprix', 'race_result.GrandPrixID', '=', 'grandprix.GrandPrixID')
            ->where('race_result.ConstructorID', $id)
            ->select('grandprix.Name', 'grandprix.Country', DB::raw('SUM(race_result.points) as points'))
            ->groupBy('grandprix.GrandPrixID', 'grandprix.Name', 'grandprix.Country')
            ->orderBy('grandprix.GrandPrixID')
            ->get();

        $drivers = DB::table('drivers')
            ->where('ConstructorID', $id)
            ->select('DriverID', 'Name')
            ->get();

        return response()->json([
            'points'          => $points,
            'podiums'         => $podiums,
            'wins'            => $wins,
            'fastest_laps'    => $fastestLaps,
            'races'           => $races,
            'points_per_race' => $pointsPerRace,
            'points_chart'    => $pointsChart,
            'drivers'         => $drivers,
        ]);
    }

    public function driverStandings()
    {
        $standings = DB::table('race_result')
            ->join('drivers', 'race_result.DriverID', '=', 'drivers.DriverID')
            ->join('constructors', 'race_result.ConstructorID', '=', 'constructors.ConstructorID')
            ->select(
                'drivers.DriverID',
                'drivers.Name as driver_name',
                'drivers.Nationality',
                'constructors.Name as constructor_name',
                DB::raw('SUM(race_result.points) as total_points')
            )
            ->whereNotNull('race_result.position')
            ->groupBy('drivers.DriverID', 'drivers.Name', 'drivers.Nationality', 'constructors.Name')
            ->orderByDesc('total_points')
            ->get();

        return response()->json($standings);
    }

    public function constructorStandings()
    {
        $standings = DB::table('race_result')
            ->join('constructors', 'race_result.ConstructorID', '=', 'constructors.ConstructorID')
            ->select(
                'constructors.ConstructorID',
                'constructors.Name as constructor_name',
                'constructors.Nationality',
                DB::raw('SUM(race_result.points) as total_points')
            )
            ->whereNotNull('race_result.position')
            ->groupBy('constructors.ConstructorID', 'constructors.Name', 'constructors.Nationality')
            ->orderByDesc('total_points')
            ->get();

        return response()->json($standings);
    }
}