<?php

namespace App\Models\ADA;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TermoAdesaoADA extends Model
{
    use HasFactory;
    protected $primaryKey = "id";
    protected $table = "termo_adesao_ada";

    protected $guarded = [ 'created_at', 'updated_at'];

}
