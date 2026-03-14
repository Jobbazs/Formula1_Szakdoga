<?php

namespace App\Http\Controllers;

use App\Models\TeamDriver;
use App\Http\Requests\StoreTeamDriverRequest;
use App\Http\Requests\UpdateTeamDriverRequest;

class TeamDriverController extends Controller
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
    public function store(StoreTeamDriverRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(TeamDriver $teamDriver)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeamDriverRequest $request, TeamDriver $teamDriver)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TeamDriver $teamDriver)
    {
        //
    }
}
