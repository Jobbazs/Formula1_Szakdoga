<?php

use App\Http\Controllers\ConstructorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/constructor',[ConstructorController::class, 'index']);
Route::get('/constructor/{id}',[ConstructorController::class, 'show']);
Route::post('/constructor',[ConstructorController::class, 'store']);
Route::put('/constructor/{id}',[ConstructorController::class, 'update']);
Route::delete('/constructor/{id}',[ConstructorController::class, 'destroy']);

