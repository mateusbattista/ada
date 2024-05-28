<?php

namespace App\Models\ADA;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Eventos extends Model
{
    use HasFactory;

    protected $primaryKey = "id";
    protected $table = "eventos_ada";

    protected $fillable = [
        'nometipoevento',

    ];
}
