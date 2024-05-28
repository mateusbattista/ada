<?php
namespace App\Http\Controllers\Comum;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comum\Municipios;

class MunicipioController extends Controller
{
   
    public function municipiosFilter(Request $request, $estado_sigla)
{
    // Debugging function
   

    // Get estado from the route parameter
    $estado = $estado_sigla;

  

    // Fetch municipios based on estado
    $municipios = Municipios::where('no_uf', $estado)->get();

    // Return JSON response
    return response()->json($municipios);
}

}
