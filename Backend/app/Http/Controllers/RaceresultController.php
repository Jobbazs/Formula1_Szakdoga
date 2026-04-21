<?php

namespace App\Http\Controllers;

use App\Models\RaceResult;
use App\Http\Requests\StoreRaceresultRequest;
use App\Http\Requests\UpdateRaceresultRequest;

class RaceresultController extends Controller
{
    public function index()
    {
        return RaceResult::with(['driver', 'grandPrix', 'constructor'])->get();
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
}