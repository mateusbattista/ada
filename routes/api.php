<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Leite\TanquedeResfriamentoController;
use App\Http\Controllers\ADA\EventosADAController;
use App\Http\Controllers\PAA\FontedeRecursoPAController;
use App\Http\Controllers\Fomento\EntidadeGestoraController;



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


require __DIR__.'/ada.php';
require __DIR__.'/leite.php';
require __DIR__ . '/paa.php';
require __DIR__.'/fomento.php';

