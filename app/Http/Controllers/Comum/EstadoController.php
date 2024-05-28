<?php
namespace App\Http\Controllers\Comum;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comum\Estado;

class EstadoController extends Controller
{
   
    public function estadosFilter(Request $request, )
{

    // Fetch municipios based on estado
    $estados = Estado::all();

    // Return JSON response
    return response()->json($estados);
}

}
