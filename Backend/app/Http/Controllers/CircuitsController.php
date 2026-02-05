<?php

namespace App\Http\Controllers;

use App\Models\Circuits;
use App\Http\Requests\StoreCircuitsRequest;
use App\Http\Requests\UpdateCircuitsRequest;

class CircuitsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     public function index()
    {
        return Circuits::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCircuitsRequest $request)
    {
        $circuits = new Circuits();
        $circuits->fill($request->all());
        $circuits->save();

        return response()->json($circuits, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Circuits::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(UpdateCircuitsRequest $request, $id)
{
    $circuits = Circuits::find($id);
    
    $circuits->fill($request->all());
    $circuits->save();

    return response()->json($circuits, 200);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Circuits $circuits, $id)
    {
        $circuits = Circuits::find($id);
        $circuits->delete();

        return response()->json(null, 204);
    }
}
