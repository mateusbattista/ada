<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;

class CpfValidationServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Validator::extend('cpf', function ($attribute, $value, $parameters, $validator) {
            // Remove caracteres não numéricos do CPF
            $value = preg_replace('/[^0-9]/', '', $value);

            // Verifica se o CPF possui 11 dígitos
            if (strlen($value) != 11) {
                return false;
            }

            // Outras verificações de validação do CPF podem ser adicionadas conforme necessário

            return true;
        });

    }
}
