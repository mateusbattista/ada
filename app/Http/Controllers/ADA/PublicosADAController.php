<?php

namespace App\Http\Controllers\ADA;

use App\Http\Controllers\Controller;
use App\Models\ADA\Publicos_ADA;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


class PublicosADAController extends Controller
{

    public function publicosCreate(Request $request)
    {
        $nometipopublico = Publicos_ADA::create([
            'nometipopublico' => $request['nometipopublico'],
        ]);

        $message = ['title' => 'Adicionado.', 'body' => 'O Público foi inserido com sucesso.', 'class' => 'success'];
        return response()->json(['message' => $message]);
    }


    public function publicosList(Request $request): JsonResponse
    {
        $nometipopublico = trim(request('nometipopublico'));
        $pageSize = request('pageSize');
        $pageNumber = request('pageNumber');

        $filtro_publico = Publicos_ADA::query()->when($nometipopublico, function ($query, $nometipopublico) {
            return $query->where('nometipopublico', 'ilike', '%' . $nometipopublico . '%');
        })->orderBy('id', 'desc')->paginate($pageSize, ['*'], 'page', $pageNumber);

        $data = $filtro_publico->map(function ($filtro_publico) {
            return [
                "id" => $filtro_publico->id,
                "nometipopublico" => $filtro_publico->nometipopublico,
            ];
        });

        $responseData = [
            "recordCount" => $filtro_publico->total(),
            "pageNumber" => (int) $pageNumber, // Assuming page number is 0
            "pageSize" => (int) $pageSize, // Assuming page size is 10
            "records" =>  $data, // Array of objects
        ];

        return response()->json($responseData);
    }


    public function publicosshowForm($id = null)
    {
        $publicos = Publicos_ADA::find($id);

        if (!$publicos) {
            return response()->json(['message' =>[
                'title' => 'Falha',
                'body' => 'Público não encontrado',
                'class' => 'danger'
            ]], 404);
        }
        return response()->json(['message' =>[
            'title' => 'Sucesso',
            'body' => 'O Público foi encontrado',
            'class' => 'success',
            'publico'=> $publicos
        ]], 200);
    }

    public function publicosUpdateForm(Request $request, $id )
    {
        if ($id) {
            // Atualizar o registro existente
            $publicos = Publicos_ADA::find($id);
            $publicos->update($request->all());
            $message = ['title' => 'Salvo.', 'body' => 'O público foi atuaizado com sucesso.', 'class' => 'success'];
            return response()->json(['message' => $message]);
        }

        $message = ['title' => 'Falha.', 'body' => 'O público não foi atualizado.', 'class' => 'danger'];
        return response()->json(['message' => $message]);

    }


    public function publicosDelete($id): JsonResponse
    {
        $publicos = Publicos_ADA::find($id);

        if (!$publicos) {
            $message = ['title' => 'Falha.', 'body' => 'O Público não foi encontrado.', 'class' => 'danger'];
            return response()->json(['message' => $message]);
        }
        $publicos->delete();

        $message = ['title' => 'Sucesso.', 'body' => 'O Público foi removido.', 'class' => 'success'];
        return response()->json(['message' => $message]);
    }




}
