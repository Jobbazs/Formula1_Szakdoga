<?php


// full blank az oldal
namespace App\Http\Controllers;

use App\Models\RaceResult;
use App\Http\Requests\StoreRaceresultRequest;
use App\Http\Requests\UpdateRaceresultRequest;
use Illuminate\Container\Attributes\Log;
use Psy\Command\DumpCommand;

class RaceresultController extends Controller
{
    public function index()
    {
        // dump("Valami");
         return RaceResult::results();
        //    return response()->json(null, 204);
    }

    public function store(StoreRaceresultRequest $request)
    {
        $race_result = new RaceResult();
        $race_result->fill($request->all());
        $race_result->save();
        return response()->json($race_result, 201);
    }

    public function show($id)
    {
        return RaceResult::find($id);
    }

    public function update(UpdateRaceresultRequest $request, $id)
    {
        $race_result = RaceResult::find($id);
        $race_result->fill($request->all());
        $race_result->save();
        return response()->json($race_result, 200);
    }

    public function destroy($id)
    {
        $race_result = RaceResult::find($id);
        $race_result->delete();
        return response()->json(null, 204);
    }

    public function results()
    {        $results = RaceResult::selectRaw('DriverID, SUM(Points) as TotalPoints')
            ->groupBy('DriverID')
            ->orderByDesc('TotalPoints')
           ->with('driver.constructor')
           ->get()
           ->map(function ($result, $index) {
               return [
                   'DriverID' => $result->DriverID,
                   'Name' => $result->driver->Name,
                    'Nationality' => $result->driver->Nationality,
                    'Image' => $result->driver->Image,                    'ConstructorName' => $result->driver->constructor?->Name,
                   'Points' => $result->TotalPoints,                    'Position' => $index + 1,
                ];
          });

        return response()->json($results);
     }
 }
 