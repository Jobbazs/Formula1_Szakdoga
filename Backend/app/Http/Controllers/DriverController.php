<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Http\Requests\StoreDriverRequest;
use App\Http\Requests\UpdateDriverRequest;

class DriverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
         public function index()
    {
        return Driver::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDriverRequest $request)
    {
        $driver = new Driver();
        $driver->fill($request->all());
        $driver->save();

        return response()->json($driver, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Driver::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(UpdateDriverRequest $request, $id)
{
    $driver = Driver::find($id);
    
    $driver->fill($request->all());
    $driver->save();

    return response()->json($driver, 200);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Driver $driver, $id)
    {
        $driver = Driver::find($id);
        $driver->delete();

        return response()->json(null, 204);
    }
}