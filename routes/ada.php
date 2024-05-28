<?php

use App\Http\Controllers\ADA\EventosADAController;
use App\Http\Controllers\ADA\PortariaADAController;
use App\Http\Controllers\ADA\PublicosADAController;
use App\Http\Controllers\ADA\FornecedoresADAController;
use App\Http\Controllers\ADA\SolicitacaoCestasADAController;
use App\Http\Controllers\ADA\SolicitacaoADAController;
use App\Http\Controllers\ADA\TermoAdesaoADAController;


Route::get('/ada/', [EventosADAController::class, 'indexADA'])->name('indexADA');

Route::middleware('auth')->group(function () {});

Route::get('/ada/eventos', [EventosADAController::class, 'eventosList'])->name('eventosList');
Route::get('/ada/eventos/form/{id?}', [EventosADAController::class, 'eventosshowForm'])->name('eventosForm');
Route::post('/ada/eventos/create', [EventosADAController::class, 'eventosCreate']);
Route::put('/ada/eventos/update/{id}', [EventosADAController::class, 'eventosUpdateForm'])->name('eventosUpdateForm');
Route::delete('/ada/eventos/delete/{id}', [EventosADAController::class, 'eventosDelete'])->name('eventosDelete');


Route::get('/ada/solicitacao', [SolicitacaoADAController::class, 'solicitacaoList'])->name('solicitacaoList');
Route::get('/ada/solicitacao/form/{id?}', [SolicitacaoADAController::class, 'solicitacaoshowForm'])->name('solicitacaoForm');
Route::post('/ada/solicitacao/create', [SolicitacaoADAController::class, 'solicitacaoCreate'])->name('solicitacaoCreate');
Route::put('/ada/solicitacao/update/{id}', [SolicitacaoADAController::class, 'solicitacaoUpdateForm'])->name('solicitacaoUpdateForm');
Route::delete('/ada/solicitacao/delete/{id}', [SolicitacaoADAController::class, 'solicitacaoDelete'])->name('solicitacaoDelete');

Route::get('/ada/termoadesao', [TermoAdesaoADAController::class, 'termoadesaoList'])->name('termoadesaoList');
Route::get('/ada/termoadesao/form/{id?}', [TermoAdesaoADAController::class, 'termoadesaoshowForm'])->name('termoadesaoForm');
Route::post('/ada/termoadesao/create', [TermoAdesaoADAController::class, 'termoadesaoCreate'])->name('termoadesaoCreate');
Route::put('/ada/termoadesao/update/{id}', [TermoAdesaoADAController::class, 'termoadesaoUpdateForm'])->name('termoadesaoUpdateForm');


Route::get('/ada/publicos', [PublicosADAController::class, 'publicosList'])->name('publicosList');
Route::get('/ada/publicos/form/{id?}', [PublicosADAController::class, 'publicosshowForm'])->name('publicosForm');
Route::post('/ada/publicos/create', [PublicosADAController::class, 'publicosCreate'])->name('publicosCreate');
Route::put('/ada/publicos/update/{id}', [PublicosADAController::class, 'publicosUpdateForm'])->name('publicosUpdateForm');
Route::delete('/ada/publicos/delete/{id}', [PublicosADAController::class, 'publicosDelete'])->name('publicosDelete');

Route::get('ada/portaria', [PortariaADAController::class, 'PortariaList'])->name('indexPortaria');
Route::get('ada/portaria/form/{id?}', [PortariaADAController::class, 'portariasshowForm'])->name('indexPortariaForm');
Route::post('ada/portaria/create', [PortariaADAController::class, 'indexPortaria_create'])->name('indexPortariaCreate');
Route::delete('ada/portaria/delete/{id}', [PortariaADAController::class, 'portaria_Delete'])->name('indexPortariaDelete');
Route::put('ada/portaria/update/{id}', [PortariaADAController::class, 'portariaUpdateForm'])->name('indexPortariaUpdate');

Route::get('/ada/fornecedor', [FornecedoresADAController::class, 'fornecedorList']);
Route::get('/ada/fornecedor/form/{id?}', [FornecedoresADAController::class, 'fornecedorshowForm']);
Route::post('/ada/fornecedor/create', [FornecedoresADAController::class, 'fornecedorCreate']);
Route::put('/ada/fornecedor/update/{id}', [FornecedoresADAController::class, 'fornecedorUpdateForm']);
Route::delete('/ada/fornecedor/delete/{id}', [FornecedoresADAController::class, 'fornecedorDelete']);

Route::get('/ada/solicitacaocesta', [SolicitacaoCestasADAController::class, 'solicitacaoCestasList']);
Route::get('/ada/solicitacaocesta/form/{id?}', [SolicitacaoCestasADAController::class, 'solicitacaoCestasshowForm']);
Route::post('/ada/solicitacaocesta/create', [SolicitacaoCestasADAController::class, 'solicitacaoCestasCreate']);
Route::put('/ada/solicitacaocesta/update/{id}', [SolicitacaoCestasADAController::class, 'solicitacaoCestasUpdateForm']);
Route::delete('/ada/solicitacaocesta/delete/{id}', [SolicitacaoCestasADAController::class, 'solicitacaoCestasDelete']);
