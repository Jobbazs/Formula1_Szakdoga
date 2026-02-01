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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCircuitsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Circuits $circuits)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCircuitsRequest $request, Circuits $circuits)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Circuits $circuits)
    {
        //
    }
}
