<?php

namespace App\Http\Controllers\ADA;
use App\Http\Controllers\Controller;
use App\Models\ADA\SolicitacaoADA;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Database\Query\Builder;


class SolicitacaoADAController extends Controller
{
    public function solicitacaoCreate(Request $request)
    {
        $solicitacao = SolicitacaoADA::create($request->all());

        $message = ['title' => 'Adicionado.', 'body' => 'A solicitação foi criada com sucesso.', 'class' => 'success'];

        return response()->json(['message' => $message]);
    }

    public function solicitacaoList(Request $request): JsonResponse
    {

        $name = trim(request('name'));
        $cpfsolicitante = trim(request('cpfsolicitante'));
        $nomeprefeito = trim(request('prefeito'));
        $cpfprefeito = trim(request('cpfprefeito'));
        $ibge = trim(request('ibge'));
        $estado = trim(request('estado'));
        $municipio = trim(request('municipio'));
        $situacao = trim(request('situacao'));
        $ntermo = trim(request('ntermo'));
        $pageSize = request('pageSize');
        $pageNumber = request('pageNumber');

        $solicitacoes = SolicitacaoADA::query()
            ->when($name, function ($query, $name) {
                return $query->where('name', 'ilike', '%' . $name . '%');
            })
            ->when($cpfsolicitante, function ($query, $cpfsolicitante) {
                return $query->where('cpfsolicitante', 'like', '%' . $cpfsolicitante . '%');
            })
            ->when($nomeprefeito, function ($query, $nomeprefeito) {
                return $query->where('nomeprefeito', 'ilike', '%' . $nomeprefeito . '%');
            })
            ->when($cpfprefeito, function ($query, $cpfprefeito) {
                return $query->where('cpfprefeito', 'ilike', '%' . $cpfprefeito . '%');
            })
            ->when($ibge, function ($query, $ibge) {
                return $query->where('ibge', 'ilike', '%' . $ibge . '%');
            })
            ->when($estado, function ($query, $estado) {
                return $query->where('estado', 'ilike', '%' . $estado . '%');
            })
            ->when($municipio, function ($query, $municipio) {
                return $query->where('municipio', 'ilike', '%' . $municipio . '%');
            })
            ->when($situacao, function ($query, $situacao) {
                return $query->where('situacao', 'ilike', '%' . $situacao . '%');
            })
            ->when($ntermo, function ($query, $ntermo) {
                return $query->where('ntermo', 'ilike', '%' . $ntermo . '%');
            })
            ->orderBy('id', 'desc')
            ->paginate($pageSize, ['*'], 'page', $pageNumber);

        $data = $solicitacoes->map(function ($solicitacoes) {
            return [
                "id" => $solicitacoes->id,
                "ibge" => $solicitacoes->ibge,
                "sigla" => $solicitacoes->sigla,
                "cpfsolicitante" => $solicitacoes->cpfsolicitante,
                "name" => $solicitacoes->name,
                "quantidadecestas" => $solicitacoes->quantidadecestas,
                "funcao" => $solicitacoes->funcao,
                "data_publicacao_dou" => $solicitacoes->data_publicacao_dou,
            ];
        });

        $responseData = [
            "recordCount" => $solicitacoes->total(),
            "pageNumber" => (int) $pageNumber,
            "pageSize" => (int) $pageSize,
            "records" => $data, // Array of objects
        ];


        return response()->json($responseData);
    }

    public function solicitacaoshowForm($id = null)
    {
        $dados = SolicitacaoADA::find($id);

        if (!$dados) {
            return response()->json(['message' =>[
                'title' => 'Falha',
                'body' => 'Solicitação não encontrada',
                'class' => 'danger'
            ]], 404);
        }
        return response()->json(['message' =>[
            'title' => 'Sucesso',
            'body' => 'A solicitação foi encontrada',
            'class' => 'success',
            'dados'=> $dados
        ]], 200);
    }

    public function solicitacaoUpdateForm(Request $request, $id )
    {
        if ($id) {
            $solicitacao = SolicitacaoADA::find($id);
            $solicitacao->update($request->all());
            $message = ['title' => 'Salvo.', 'body' => 'A solicitação foi atuaizada com sucesso.', 'class' => 'success'];
            return response()->json(['message' => $message]);
        }

        $message = ['title' => 'Salvo.', 'body' => 'A solicitação não foi atualizada.', 'class' => 'danger'];
        return response()->json(['message' => $message]);
    }

    public function solicitacaoDelete($id): JsonResponse
    {
        $solicitacaoDelete = SolicitacaoADA::find($id);

        if (!$solicitacaoDelete) {
            $message = ['title' => 'Falha.', 'body' => 'A solicitação não foi encontrada.', 'class' => 'danger'];
            return response()->json(['message' => $message]);
        }
        $solicitacaoDelete->delete();

        $message = ['title' => 'Sucesso.', 'body' => 'A solicitação foi removida.', 'class' => 'success'];
        return response()->json(['message' => $message]);
    }

}
