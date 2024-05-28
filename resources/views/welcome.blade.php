@extends('layouts.main-interno')
@section('title', 'Fomento')
@section('line-header')
    @include('layouts.index-line')
@endsection
@section('nav-bar')

@endsection
@section('content')

    <h5>Index - Geral</h5>
    <a href="{{ route('indexFomento') }}" class="br-button secondary mr-3" type="button">Ir para Fomento</a>
    <a href="{{ route('tipoParceriaCreate') }}" class="br-button secondary mr-3" type="button">Ir para ADA</a>

@endsection
