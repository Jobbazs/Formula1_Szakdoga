<?php

use App\Http\Controllers\CircuitsController;
use App\Http\Controllers\ConstructorController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\GrandPrixController;
use App\Http\Controllers\QualifyingResultController;
use App\Http\Controllers\RaceresultController;
use App\Http\Controllers\TeamDriverController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Constructor útvonalak
Route::get('/constructor',[ConstructorController::class, 'index']);
Route::get('/constructor/{id}',[ConstructorController::class, 'show']);
Route::post('/constructor',[ConstructorController::class, 'store']);
Route::put('/constructor/{id}',[ConstructorController::class, 'update']);
Route::delete('/constructor/{id}',[ConstructorController::class, 'destroy']);

//Circuit útvonalak
Route::get('/circuit',[CircuitsController::class, 'index']);
Route::get('/circuit/{id}',[CircuitsController::class, 'show']);
Route::post('/circuit',[CircuitsController::class, 'store']);
Route::put('/circuit/{id}',[CircuitsController::class, 'update']);
Route::delete('/circuit/{id}',[CircuitsController::class, 'destroy']);

//Driver útvonalak
Route::get('/driver',[DriverController::class, 'index']);
Route::get('/driver/{id}',[DriverController::class, 'show']);
Route::post('/driver',[DriverController::class, 'store']);
Route::put('/driver/{id}',[DriverController::class, 'update']);
Route::delete('/driver/{id}',[DriverController::class, 'destroy']);

//GrandPrix
Route::get('/grand_prix',[GrandPrixController::class, 'index']);
Route::get('/grand_prix/{id}',[GrandPrixController::class, 'show']);
Route::post('/grand_prix',[GrandPrixController::class, 'store']);
Route::put('/grand_prix/{id}',[GrandPrixController::class, 'update']);
Route::delete('/grand_prix/{id}',[GrandPrixController::class, 'destroy']);

//QualifyingResult
Route::get('/qualifying_result',[QualifyingResultController::class, 'index']);
Route::get('/qualifying_result/{id}',[QualifyingResultController::class, 'show']);
Route::post('/qualifying_result',[QualifyingResultController::class, 'store']);
Route::put('/qualifying_result/{id}',[QualifyingResultController::class, 'update']);
Route::delete('/qualifying_result/{id}',[QualifyingResultController::class, 'destroy']);

//RaceResult
Route::get('/race_result',[RaceresultController::class, 'index']);
Route::get('/race_result/{id}',[RaceResultController::class, 'show']);
Route::post('/race_result',[RaceResultController::class, 'store']);
Route::put('/race_result/{id}',[RaceResultController::class, 'update']);
Route::delete('/race_result/{id}',[RaceResultController::class, 'destroy']);

//TeamDriver
Route::get('/team_driver',[TeamDriverController::class, 'index']);
Route::get('/team_driver/{id}',[TeamDriverController::class, 'show']);
Route::post('/team_driver',[TeamDriverController::class, 'store']);
Route::put('/team_driver/{id}',[TeamDriverController::class, 'update']);
Route::delete('/team_driver/{id}',[TeamDriverController::class, 'destroy']);

