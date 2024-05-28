<?php

namespace App\Http\Controllers\ADA;

use App\Http\Controllers\Controller;
use App\Models\ADA\Eventos;
use App\Models\ADA\FornecedoresADA;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FornecedoresADAController extends Controller
{
    public function fornecedorList(Request $request): JsonResponse
    {
        $cnpj = trim($request->input('cnpj'));
        $razaosocial = trim($request->input('razaosocial'));
        $tipo = trim($request->input('tipo'));
        $ufinstituicao = trim($request->input('ufinstituicao'));
        $situacaofornecedor = trim($request->input('situacaofornecedor'));
        $pageSize = $request->input('pageSize');
        $pageNumber = $request->input('pageNumber');

        $filtro = FornecedoresADA::query()
            ->when($cnpj, function ($query, $cnpj) {
                return $query->where('cnpjinstituicao', 'ilike', '%' . $cnpj . '%');
            })
            ->when($razaosocial, function ($query, $razaosocial) {
                return $query->where('razaosocial', 'ilike', '%' . $razaosocial . '%');
            })
            ->when($tipo, function ($query, $tipo) {
                return $query->where('tipo', 'ilike', '%' . $tipo . '%');
            })
            ->when($ufinstituicao, function ($query, $ufinstituicao) {
                return $query->where('ufinstituicao', 'ilike', '%' . $ufinstituicao . '%');
            })
            ->when($situacaofornecedor, function ($query, $situacaofornecedor) {
                return $query->where('situacaofornecedor', 'ilike', '%' . $situacaofornecedor . '%');
            })
            ->orderBy('id', 'desc')
            ->paginate($pageSize, ['*'], 'page', $pageNumber);

        $data = $filtro->map(function ($filtro) {
            return [
                "id" => $filtro->id,
                "cnpjinstituicao" => $filtro->cnpjinstituicao,
                "ufinstituicao" => $filtro->ufinstituicao,
                "nomefantasia" => $filtro->nomefantasia,
                "razaosocial" => $filtro->razaosocial,
                "situacao" => $filtro->situacao,
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

    public function fornecedorshowForm($id = null)
    {
        $dados = FornecedoresADA::find($id);

        if (!$dados) {
            return response()->json(['message' =>[
                'title' => 'Falha',
                'body' => 'Fornecedor não encontrado',
                'class' => 'danger'
            ]], 404);
        }
        return response()->json(['message' =>[
            'title' => 'Sucesso',
            'body' => 'O Fornecedor foi encontrado',
            'class' => 'success',
            'dados'=> $dados
        ]], 200);
    }

    public function fornecedorCreate(Request $request)
    {

        $fornecedor = FornecedoresADA::create($request->all());

        $message = [
            'title' => 'Adicionado.',
            'body' => 'O fornecedor foi inserido com sucesso.',
            'class' => 'success'
        ];

        return response()->json(['message' => $message]);
    }


    public function fornecedorUpdateForm(Request $request, $id )
    {
        if ($id) {
            // Atualizar o registro existente
            $dados = FornecedoresADA::find($id);
            $dados->update($request->all());
            $message = ['title' => 'Salvo.', 'body' => 'O Fornecedor foi atualizado com sucesso.', 'class' => 'success'];
            return response()->json(['message' => $message]);
        }

        $message = ['title' => 'Falha.', 'body' => 'O Fornecedor não foi atualizado.', 'class' => 'danger'];
        return response()->json(['message' => $message]);

    }


    public function fornecedorDelete($id): JsonResponse
    {
        $dados = FornecedoresADA::find($id);

        if (!$dados) {
            $message = ['title' => 'Falha.', 'body' => 'O fornecedor não encontrado.', 'class' => 'danger'];
            return response()->json(['message' => $message]);
        }
        $dados->delete();

        $message = ['title' => 'Sucesso.', 'body' => 'O Fornecedor foi removido.', 'class' => 'success'];
        return response()->json(['message' => $message]);
    }

}
