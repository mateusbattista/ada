<?php

use App\Http\Controllers\Comum\EstadoController;
use App\Http\Controllers\Comum\ProfileController;
use App\Http\Controllers\Fomento\EntidadeExecutoraController;
use App\Http\Controllers\Fomento\EntidadeGestoraController;
use App\Http\Controllers\Fomento\EquipeResponsavelController;
use App\Http\Controllers\Fomento\HabilitacaoExecutoraController;
use App\Http\Controllers\Fomento\PlanoOperacionalController;
use App\Http\Controllers\Fomento\ResponsavelController;
use App\Http\Controllers\Fomento\TermoAdesaoController;
use App\Http\Controllers\Comum\MunicipioController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PAA\FontedeRecursoPAController;
use App\Http\Controllers\PAA\UnidadeProdutoPAController;
use App\Http\Controllers\PAA\PlanoOperacionalPAController;
use App\Http\Controllers\PAA\ExtratodePortariaPAController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// routes/web.php

Route::get('/fomento/fetch-municipios/{estado_sigla}', [MunicipioController::class, 'municipiosFilter'])->name('municipiosFilter');
Route::get('/fomento/fetch-estados/', [EstadoController::class, 'estadosFilter'])->name('estadosFilter');


Route::get('/fomento/', [ProfileController::class, 'indexFomento'])->name('indexFomento');
Route::get('/fomento/entidades-gestoras', [EntidadeGestoraController::class, 'EntidadesGestorasList'])->name('EntidadesGestorasList');
Route::get('/fomento/entidades-gestoras/view/{id}', [EntidadeGestoraController::class, 'EntidadesGestoraView'])->name('EntidadesGestoraView');
Route::get('/fomento/entidades-gestoras/form', [EntidadeGestoraController::class, 'EntidadesGestorasForm'])->name('EntidadesGestorasForm');


Route::get('/fomento/entidades-executoras', [EntidadeExecutoraController::class, 'entidadesExecutorasList'])->name('entidadesExecutorasList');
Route::get('/buscar-entidades-executoras/{estado}', [EntidadeExecutoraController::class, 'municipiosPorEstado']);
Route::get('/fomento/entidades-executoras/form', [EntidadeExecutoraController::class, 'entidadesExecutorasForm'])->name('entidadesExecutorasForm');
Route::post('/fomento/entidades-executoras/create', [EntidadeExecutoraController::class, 'entidadesExecutorasCreate'])->name('entidadesExecutorasCreate');
Route::get('/fomento/entidades-executoras/view/{id}', [EntidadeExecutoraController::class, 'entidadesExecutoraView'])->name('entidadesExecutoraView');

Route::get('/fomento/habilitacao-executora/{id}', [HabilitacaoExecutoraController::class, 'habilitacaoExecutora'])->name('habilitacaoExecutora');
Route::post('/fomento/habilitacao-executora/create', [HabilitacaoExecutoraController::class, 'habilitacaoExecutoraCreate'])->name('habilitacaoExecutoraCreate');
Route::get('/fomento/habilitacao-executora/delete-nota/{id}', [HabilitacaoExecutoraController::class, 'deletarNotaTecnica'])->name('deletarNotaTecnica');

Route::get('/fomento/plano-operacional', [PlanoOperacionalController::class,'PlanoOperacionalList'])->name('PlanoOperacionalList');
Route::get('/fomento/plano-operacional/form/', [PlanoOperacionalController::class,'PlanoOperacionalForm'])->name('PlanoOperacionalForm');
Route::post('/fomento/plano-operacional/create/', [PlanoOperacionalController::class,'PlanoOperacionalCreate'])->name('PlanoOperacionalCreate');
Route::get('/fomento/plano-operacional/view/{id}', [PlanoOperacionalController::class,'PlanoOperacionalView'])->name('PlanoOperacionalView');

Route::get('/fomento/equipe-responsaveis/{tipo_equipe}', [EquipeResponsavelController::class, 'equipeResponsaveisList'])->name('equipeResponsaveisList');
Route::post('/fomento/equipe-responsaveis/create/{tipo_equipe}', [EquipeResponsavelController::class, 'equipeResponsaveisCreate'])->name('equipeResponsaveisCreate');
Route::get('/fomento/equipe-responsaveis/update-form/{id}', [EquipeResponsavelController::class, 'equipeResponsaveisUpdateForm'])->name('equipeResponsaveisUpdateForm');
Route::put('/fomento/equipe-responsaveis/update/{id}', [EquipeResponsavelController::class, 'equipeResponsaveisUpdate'])->name('equipeResponsaveisUpdate');
Route::delete('/fomento/equipe-responsaveis/delete/{id}', [EquipeResponsavelController::class, 'equipeResponsaveisDelete'])->name('equipeResponsaveisDelete');

Route::get('/fomento/TermoAdesao-adesao/form', [TermoAdesaoController::class, 'termoAdesaoForm'])->name('termoAdesaoForm');
Route::post('/fomento/TermoAdesao-adesao/create/', [TermoAdesaoController::class,'termoAdesaoCreate'])->name('termoAdesaoCreate');

Route::get('/fomento/responsaveis/form', [ResponsavelController::class, 'responsaveisForm'])->name('responsaveisForm');
Route::post('/fomento/responsaveis/create', [ResponsavelController::class, 'responsaveisCreate'])->name('responsaveisCreate');






Route::get('/dashboard', function () { return view('dashboard'); })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
require __DIR__.'/auth.php';
