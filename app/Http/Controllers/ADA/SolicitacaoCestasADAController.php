<?php

namespace App\Http\Controllers\ADA;

use App\Http\Controllers\Controller;
use App\Models\ADA\FornecedoresADA;
use App\Models\ADA\SolicitacaoCestasADA;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SolicitacaoCestasADAController extends Controller
{
    public function solicitacaoCestasList(Request $request): JsonResponse
    {
        $cnpjentefederativo = trim($request->input('cnpjentefederativo'));
        $ibge = trim($request->input('ibge'));
        $situacaocestas = trim($request->input('situacaocestas'));
        $pageSize = $request->input('pageSize');
        $pageNumber = $request->input('pageNumber');

        $filtro = SolicitacaoCestasADA::query()
            ->when($cnpjentefederativo, function ($query, $cnpjentefederativo) {
                return $query->where('cnpjentefederativo', 'ilike', '%' . $cnpjentefederativo . '%');
            })
            ->when($ibge, function ($query, $ibge) {
                return $query->where('ibge', 'ilike', '%' . $ibge . '%');
            })
            ->when($situacaocestas, function ($query, $situacaocestas) {
                return $query->where('situacaocestas', 'ilike', '%' . $situacaocestas . '%');
            })
            ->orderBy('id', 'desc')->paginate($pageSize, ['*'], 'page', $pageNumber);

        $data = $filtro->map(function ($filtro) {
            return [
                "id" => $filtro->id,
                "cnpjentefederativo" => $filtro->cnpjentefederativo,
                "uf" => $filtro->uf,
                "quantidadecestas" => $filtro->quantidadecestas,
                "municipio" => $filtro->municipio,
                "nomerepresentante" => $filtro->nomerepresentante,
                "dataavaliacao" => $filtro->dataavaliacao,
                "situacaocestas" => $filtro->situacaocestas,
            ];
        });

        $responseData = [
            "recordCount" => $filtro->total(),
            "pageNumber" => (int) $pageNumber,
            "pageSize" => (int) $pageSize,
            "records" => $data, // Array of objects
        ];

        return response()->json($responseData);
    }

    public function solicitacaoCestasshowForm($id = null)
    {
        $dados = SolicitacaoCestasADA::find($id);

        if (!$dados) {
            return response()->json(['message' =>[
                'title' => 'Falha',
                'body' => 'Registro não encontrada',
                'class' => 'danger'
            ]], 404);
        }
        return response()->json(['message' =>[
            'title' => 'Sucesso',
            'body' => 'Registro foi encontrado',
            'class' => 'success',
            'dados'=> $dados
        ]], 200);
    }


    public function solicitacaoCestasCreate(Request $request)
    {

       $solicitacaocestas = SolicitacaoCestasADA::create($request->all());

        $message = [
            'title' => 'Adicionado.',
            'body' => 'Registrado com Sucesso.',
            'class' => 'success'
        ];

        return response()->json(['message' => $message]);
    }

    public function solicitacaoCestasUpdateForm(Request $request, $id )
    {
        if ($id) {
            // Atualizar o registro existente
            $dados = SolicitacaoCestasADA::find($id);
            $dados->update($request->all());
            $message = ['title' => 'Salvo.', 'body' => 'Atualizado com sucesso.', 'class' => 'success'];
            return response()->json(['message' => $message]);
        }

        $message = ['title' => 'Falha.', 'body' => 'Erro ao atualizar.', 'class' => 'danger'];
        return response()->json(['message' => $message]);

    }


    public function solicitacaoCestasDelete($id): JsonResponse
    {
        $dados = SolicitacaoCestasADA::find($id);

        if (!$dados) {
            $message = ['title' => 'Falha.', 'body' => 'Não foi encontrado.', 'class' => 'danger'];
            return response()->json(['message' => $message]);
        }
        $dados->delete();

        $message = ['title' => 'Sucesso.', 'body' => 'Removido com Sucesso.', 'class' => 'success'];
        return response()->json(['message' => $message]);
    }
}
