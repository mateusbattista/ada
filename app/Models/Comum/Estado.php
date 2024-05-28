<?php

namespace App\Models\Comum;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{
    use HasFactory;
    protected $primaryKey = "pk_estado";
    protected $table = "estado";

    public $timestamps = false;
}
