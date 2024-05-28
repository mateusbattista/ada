<?php

namespace App\Models\Comum;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Municipios extends Model
{
    use HasFactory;
    protected $primaryKey = "pk_municipio";
    protected $table = "municipio";

    public $timestamps = false;

}
