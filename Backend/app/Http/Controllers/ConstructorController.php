<?php

namespace App\Http\Controllers;

use App\Models\Constructor;
use App\Http\Requests\StoreConstructorRequest;
use App\Http\Requests\UpdateConstructorRequest;

class ConstructorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Constructor::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreConstructorRequest $request)
    {
        $constructor = new Constructor();
        $constructor->fill($request->all());
        $constructor->save();

        return response()->json($constructor, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Constructor::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConstructorRequest $request, Constructor $constructor, $id)
    {
        $constructor = Constructor::find($id);
        $constructor->fill($request->all());
        $constructor->save();

        return response()->json($constructor, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Constructor $constructor, $id)
    {
        $constructor = Constructor::find($id);
        $constructor->delete();

        return response()->json(null, 200);
    }
}
