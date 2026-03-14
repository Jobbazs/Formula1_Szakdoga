<?php

namespace App\Http\Controllers;

use App\Models\GrandPrix;
use App\Http\Requests\StoreGrandPrixRequest;
use App\Http\Requests\UpdateGrandPrixRequest;

class GrandPrixController extends Controller
{
    /**
     * Display a listing of the resource.
     */
          public function index()
    {
        return GrandPrix::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGrandPrixRequest $request)
    {
        $grand_prix = new GrandPrix();
        $grand_prix->fill($request->all());
        $grand_prix->save();

        return response()->json($grand_prix, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return GrandPrix::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(UpdateGrandPrixRequest $request, $id)
{
    $grand_prix = GrandPrix::find($id);
    
    $grand_prix->fill($request->all());
    $grand_prix->save();

    return response()->json($grand_prix, 200);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GrandPrix $grand_prix, $id)
    {
        $grand_prix = GrandPrix::find($id);
        $grand_prix->delete();

        return response()->json(null, 204);
    }
}