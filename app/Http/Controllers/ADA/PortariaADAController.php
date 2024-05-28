<?php

namespace App\Http\Controllers\ADA;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;
use App\Models\ADA\Portarias;

class PortariaADAController extends Controller
{
    public function indexADA(): View
    {
        $data_atual = date('d.m.Y');

        return view('ada.index', compact('data_atual'));
    }

    public function PortariaList(Request $request): JsonResponse
    {
        $filtro = trim(request('nome_portarias'));
        $pageSize = request('pageSize');
        $pageNumber = request('pageNumber');

        $filtro_portarias = Portarias::query()
            ->when($filtro, function ($query, $filtro) {
                return $query->where('nome_portarias', 'ilike', '%' . $filtro . '%');
            })->orderBy('id', 'desc')->paginate($pageSize, ['*'], 'page', $pageNumber);

        $data = $filtro_portarias->map(function ($filtro_portarias) {
            return [
                "id" => $filtro_portarias->id,
                "nome_portarias" => $filtro_portarias->nome_portarias,
            ];
        });

        $responseData = [
            "recordCount" => $filtro_portarias->total(),
            "pageNumber" => (int) $pageNumber, // Assuming page number is 0
            "pageSize" => (int) $pageSize, // Assuming page size is 10
            "records" => $data, // Array of objects
        ];

        // return view('ada.portaria-list', compact('filtro_portarias'));
        return response()->json($responseData);
    }

    public function portaria_Delete($id): JsonResponse
    {
        $del_portarias = Portarias::find($id);

        if (!$del_portarias) {
            $message = ['title' => 'Falha.', 'body' => 'Portaria não encontrada.', 'class' => 'danger'];
             return response()->json(['message' => $message]);
         }

        $del_portarias->delete();

        $message = ['title' => 'Sucesso.', 'body' => 'A portaria foi removida.', 'class' => 'success'];

        return response()->json(['message' => $message]);

    }

    public function indexPortaria_create(Request $request)
    {
        // $data = json_decode($request->getContent(), true);

        // if($data === null){
        //     return response()->json(['error' => 'JSON inválido'], 400);
        // }

        $nome_portarias = Portarias::create([
            'nome_portarias' => $request['nome_portarias'],
        ]);

        // $response = [
        //     'status' => 'success',
        //     'message' => 'O evento foi inserido com sucesso.',
        //     'data' => $nome_portarias,
        // ];

        $message = ['title' => 'Adicionado.', 'body' => 'A portaria foi inserida com sucesso.', 'class' => 'success'];
        return response()->json(['message' => $message]);
    }

    public function portariasshowForm($id = null)
    {
        $slc_portaria = Portarias::find($id);

        if (!$slc_portaria) {
            return response()->json(['message' =>[
                'title' => 'Falha',
                'body' => 'Portaria não encontrada',
                'class' => 'danger'
            ]], 404);
        }
        return response()->json(['message' =>[
            'title' => 'Sucesso',
            'body' => 'A portaria foi encontrada',
            'class' => 'success',
            'portaria'=> $slc_portaria
        ]], 200);

        // return response()->json($responseData);
        // return view('ada.portaria-create-update-form', compact('slc_portaria'));
    }

    public function portariaUpdateForm(Request $request, $id )
    {
        if ($id) {
            // Atualizar o registro existente
            $portaria = Portarias::find($id);
            $portaria->update($request->all());
            $message = ['title' => 'Salvo.', 'body' => 'A portaria foi atuaizada com sucesso.', 'class' => 'success'];
            return response()->json(['message' => $message]);
        }

        $message = ['title' => 'Falha.', 'body' => 'A portaria não foi atualizada.', 'class' => 'danger'];
        return response()->json(['message' => $message]);
    }

}
