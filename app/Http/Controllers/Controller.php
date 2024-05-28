<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Str;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    //tratar número para salvar no banco
    public function tratarNumero($sem_tratamento)
    {
        $tratado = Str::of($sem_tratamento)->replace(['.', '-', '/', '(', ')', ' '], '')->trim;

        return $tratado->value();
    }
}
