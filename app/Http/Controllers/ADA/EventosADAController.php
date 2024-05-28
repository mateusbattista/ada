<?php

namespace App\Http\Controllers\ADA;
use App\Http\Controllers\Controller;
use App\Models\ADA\Eventos;
use App\Models\ADA\TermoAdesaoADA;
use App\Models\ADA\SolicitacaoADA;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Database\Query\Builder;

class EventosADAController extends Controller
{

    public function eventosCreate(Request $request)
    {
        $nometipoevento = Eventos::create([
            'nometipoevento' => $request['nometipoevento'],
        ]);

        $message = ['title' => 'Adicionado.', 'body' => 'O Evento foi inserido com sucesso.', 'class' => 'success'];
        return response()->json(['message' => $message]);
    }


    public function eventosList(Request $request): JsonResponse
    {
        $nometipoevento = trim(request('nometipoevento'));
        $pageSize = request('pageSize');
        $pageNumber = request('pageNumber');

        $filtro_evento = Eventos::query()->when($nometipoevento, function ($query, $nometipoevento) {
            return $query->where('nometipoevento', 'ilike', '%' . $nometipoevento . '%');
        })->orderBy('id', 'desc')->paginate($pageSize, ['*'], 'page', $pageNumber);

        $data = $filtro_evento->map(function ($filtro_evento) {
            return [
                "id" => $filtro_evento->id,
                "nometipoevento" => $filtro_evento->nometipoevento,
            ];
        });

        $responseData = [
            "recordCount" => $filtro_evento->total(),
            "pageNumber" => (int) $pageNumber, // Assuming page number is 0
            "pageSize" => (int) $pageSize, // Assuming page size is 10
            "records" =>  $data, // Array of objects
        ];

        return response()->json($responseData);
    }


        public function eventosshowForm($id = null)
    {
        $eventos = Eventos::find($id);

        if (!$eventos) {
            return response()->json(['message' =>[
                'title' => 'Falha',
                'body' => 'Evento não encontrado',
                'class' => 'danger'
            ]], 404);
        }
        return response()->json(['message' =>[
            'title' => 'Sucesso',
            'body' => 'O Evento foi encontrado',
            'class' => 'success',
            'evento'=> $eventos
        ]], 200);
    }

    public function eventosUpdateForm(Request $request, $id )
    {
        if ($id) {
            // Atualizar o registro existente
            $evento = Eventos::find($id);
            $evento->update($request->all());
            $message = ['title' => 'Salvo.', 'body' => 'O evento foi atuaizado com sucesso.', 'class' => 'success'];
            return response()->json(['message' => $message]);
        }

            $message = ['title' => 'Falha.', 'body' => 'O evento não foi atualizado.', 'class' => 'danger'];
            return response()->json(['message' => $message]);

    }


    public function eventosDelete($id): JsonResponse
    {
        $eventos = Eventos::find($id);

        if (!$eventos) {
            $message = ['title' => 'Falha.', 'body' => 'O Evento não encontrado.', 'class' => 'danger'];
            return response()->json(['message' => $message]);
        }
        $eventos->delete();

        $message = ['title' => 'Sucesso.', 'body' => 'O Evento foi removido.', 'class' => 'success'];
        return response()->json(['message' => $message]);
    }




}
