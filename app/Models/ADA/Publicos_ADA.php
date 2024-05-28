<?php

namespace App\Models\ADA;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publicos_ADA extends Model
{
    use HasFactory;
    protected $primaryKey = "id";
    protected $table = "publico_ada";

    protected $fillable = [
        'nometipopublico',

    ];
}
