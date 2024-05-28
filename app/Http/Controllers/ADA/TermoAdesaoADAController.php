<?php

namespace App\Http\Controllers\ADA;
use App\Http\Controllers\Controller;
use App\Models\ADA\SolicitacaoCestasADA;
use App\Models\ADA\TermoAdesaoADA;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Database\Query\Builder;

class TermoAdesaoADAController extends Controller
{
    public function termoadesaoCreate(Request $request)
    {
        $dados = TermoAdesaoADA::create($request->all());

        $message = ['title' => 'Adicionado.', 'body' => 'Criado com sucesso.', 'class' => 'success'];

        return response()->json(['message' => $message]);
    }

    public function termoadesaoList(Request $request): JsonResponse
   {
       $termo_municipio_solicitante = trim(request('municipio_solicitante_id'));
       $termo_ano = trim(request('ano'));
       $termo_nome_prefeito = trim(request('nomeprefeito'));
       $termo_situacao = trim(request('situacao'));
       $numero_termo = trim(request('ntermo'));
       $cpf_prefeito = trim(request('cpfprefeito'));
       $estado_solicitante = trim(request('estado_solicitante_id'));

       $pageSize = request('pageSize');
       $pageNumber = request('pageNumber');

       $filtro =  TermoAdesaoADA::query()
           ->when($numero_termo, function ($query, $numero_termo) {
               return $query->where('ntermo', 'like', '%' . $numero_termo . '%');
           })
           ->when($termo_ano, function ($query, $termo_ano) {
               return $query->where('ano', 'like', '%' . $termo_ano . '%');
           })
           ->when($termo_nome_prefeito, function ($query, $termo_nome_prefeito) {
               return $query->where('nomeprefeito', 'like', '%' . $termo_nome_prefeito .'%');
           })
           ->when($cpf_prefeito, function ($query,$cpf_prefeito) {
               return $query->where('cpfprefeito', 'ilike', '%' .$cpf_prefeito . '%');
           })
           ->when($estado_solicitante, function ($query, $estado_solicitante) {
               return $query->where('estado_solicitante_id', 'ilike', '%' . $estado_solicitante . '%');
           })
           ->when( $termo_municipio_solicitante, function ($query,  $termo_municipio_solicitante) {
               return $query->where('municipio_solicitante_id', 'like', '%' .  $termo_municipio_solicitante );
           })
           ->when( $termo_situacao, function ($query,  $termo_situacao) {
               return $query->where('situacao', 'like', '%' . $termo_situacao );
           })->orderBy('id', 'desc')->paginate($pageSize, ['*'], 'page', $pageNumber);


       $data = $filtro->map(function($filtro , $slc_estados){
           return [
               "id" => $filtro->id,
               "numero" => $filtro->numero,
               "ufrgprefeito" => $filtro->ufrgprefeito,
               "municipio_solicitante_id" => $filtro->municipio_solicitante_id,
               "numerosolicitante" => $filtro->numerosolicitante,
               "ano" => $filtro->ano,
               "nomeprefeito" => $filtro->nomeprefeito,
               "quantidadecestas" => $filtro->quantidadecestas,
               "datasolicitacao" => $filtro->datasolicitacao,
               "situacao" => $filtro->situacao,
               "ntermo" => $filtro->ntermo,
               "data_publicacao_dou" => $filtro->data_publicacao_dou,
               "link_publicacao_dou" => $filtro->link_publicacao_dou,
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

    public function termoadesaoshowForm($id = null)
    {
        $dados = TermoAdesaoADA::find($id);

        if (!$dados) {
            return response()->json(['message' =>[
                'title' => 'Falha',
                'body' => 'Não encontrado',
                'class' => 'danger'
            ]], 404);
        }
        return response()->json(['message' =>[
            'title' => 'Sucesso',
            'body' => 'Encontrada',
            'class' => 'success',
            'dados'=> $dados
        ]], 200);
    }

    public function termoadesaoUpdateForm(Request $request, $id )
    {
        if ($id) {
            $dados = TermoAdesaoADA::find($id);
            $dados->update($request->all());
            $message = ['title' => 'Salvo.', 'body' => ' Atualizada com sucesso.', 'class' => 'success'];
            return response()->json(['message' => $message]);
        }

        $message = ['title' => 'Salvo.', 'body' => ' Não foi atualizado.', 'class' => 'danger'];
        return response()->json(['message' => $message]);
    }
}
