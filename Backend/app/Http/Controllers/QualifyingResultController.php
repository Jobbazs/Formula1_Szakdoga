<?php

namespace App\Http\Controllers;

use App\Models\QualifyingResult;
use App\Http\Requests\StoreQualifyingResultRequest;
use App\Http\Requests\UpdateQualifyingResultRequest;

class QualifyingResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
            public function index()
    {
        return QualifyingResult::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQualifyingResultRequest $request)
    {
        $qualifying_result = new QualifyingResult();
        $qualifying_result->fill($request->all());
        $qualifying_result->save();

        return response()->json($qualifying_result, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return QualifyingResult::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(UpdateQualifyingResultRequest $request, $id)
{
    $qualifying_result = QualifyingResult::find($id);
    
    $qualifying_result->fill($request->all());
    $qualifying_result->save();

    return response()->json($qualifying_result, 200);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(QualifyingResult $qualifying_result, $id)
    {
        $qualifying_result = QualifyingResult::find($id);
        $qualifying_result->delete();

        return response()->json(null, 204);
    }
}