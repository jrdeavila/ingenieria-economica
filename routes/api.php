<?php

use App\Http\Controllers\CalcularTasaInteresController;
use App\Http\Controllers\CalcularValorTiempoController;
use App\Http\Controllers\TasaTipoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get("/tasa-tipos", TasaTipoController::class);
Route::post("/calcular-interes", CalcularTasaInteresController::class);
Route::post("/calcular-valor-futuro", [CalcularValorTiempoController::class, "valorFuturo"]);
Route::post("/calcular-valor-presente", [CalcularValorTiempoController::class, "valorPresente"]);
