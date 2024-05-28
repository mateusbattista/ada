<?php

namespace App\Models\ADA;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portarias extends Model
{
    use HasFactory;

    protected $primaryKey = "id";
    protected $table = "portarias";

    protected $fillable = [
        'nome_portarias',

    ];
}
