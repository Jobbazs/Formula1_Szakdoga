<?php

namespace App\Http\Controllers;

use App\Models\Raceresult;
use App\Http\Requests\StoreRaceresultRequest;
use App\Http\Requests\UpdateRaceresultRequest;

class RaceresultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
        public function index()
    {
        return RaceResult::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRaceResultRequest $request)
    {
        $race_result = new RaceResult();
        $race_result->fill($request->all());
        $race_result->save();

        return response()->json($race_result, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return RaceResult::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(UpdateRaceResultRequest $request, $id)
{
    $race_result = RaceResult::find($id);
    
    $race_result->fill($request->all());
    $race_result->save();

    return response()->json($race_result, 200);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RaceResult $race_result, $id)
    {
        $race_result = RaceResult::find($id);
        $race_result->delete();

        return response()->json(null, 204);
    }
}