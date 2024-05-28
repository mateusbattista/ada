@extends('layouts.main-interno')
@section('title', 'Fomento')
@section('line-header')
    @include('fomento.line-header')
@endsection
@section('nav-bar')
    @include('fomento.nav-bar')
@endsection
@section('content')  
@if (session('message'))
    <div class="br-message {{ session('message.class') }}" role="alert">
        <div class="icon"><i class="fas fa-check-circle fa-lg" aria-hidden="true"></i>
        </div>
        <div class="content"><span class="message-title">{{ session('message.title') }}</span><span class="message-body"> {{ session('message.body') }} </span></div>
        <div class="close">
            <button class="br-button circle small" type="button" aria-label="Fechar"><i class="fas fa-times" aria-hidden="true"></i>
            </button>
        </div>
    </div>
@endif

    <main class="d-flex flex-fill mb-5" id="main">
        <div class="container-lg d-flex">
            <div class="row col-lg-12">
                <div class="col mb-5">
                    <div class="main-content pl-sm-3 mt-4" id="main-content">
                        
                        <div class="row" style="padding-top: 2.5em">
                            <div class="col-sm-12 col-md-12">
                                <div class="br-carousel" data-stage="in" data-mobile-nav="">
                                    <div class="carousel-button">
                                        <button class="br-button carousel-btn-prev terciary circle" type="button" aria-label="Anterior"><i class="fas fa-chevron-left" aria-hidden="true"></i></button>
                                    </div>
                                    <div class="carousel-stage">
                                        <div class="carousel-page" active="active">
                                            <div class="carousel-content bg-blue-10">
                                                <div class="h3 carousel-title">Página 1</div>
                                            </div>
                                        </div>
                                        <div class="carousel-page">
                                            <div class="carousel-content bg-violet-warm-10">
                                                <div class="h3 carousel-title">Página 2</div>
                                            </div>
                                        </div>
                                        <div class="carousel-page">
                                            <div class="carousel-content bg-yellow-5">
                                                <div class="h3 carousel-title">Página 3</div>
                                            </div>
                                        </div>
                                        <div class="carousel-page">
                                            <div class="carousel-content bg-green-cool-10">
                                                <div class="h3 carousel-title">Página 4</div>
                                            </div>
                                        </div>
                                        <div class="carousel-page">
                                            <div class="carousel-content bg-orange-vivid-10">
                                                <div class="h3 carousel-title">Página 5</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-button">
                                        <button class="br-button carousel-btn-next terciary circle" type="button"
                                                aria-label="Próximo"><i class="fas fa-chevron-right"
                                                                        aria-hidden="true"></i>
                                        </button>
                                    </div>
                                    <div class="carousel-step">
                                        <div class="br-step" data-initial="1" data-type="simple">
                                            <div class="step-progress">
                                                <button class="step-progress-btn" type="button"><span
                                                        class="step-info">Exemplo de Rótulo 1</span>
                                                </button>
                                                <button class="step-progress-btn" type="button"><span
                                                        class="step-info">Exemplo de Rótulo 2</span>
                                                </button>
                                                <button class="step-progress-btn" type="button"><span
                                                        class="step-info">Exemplo de Rótulo 3</span>
                                                </button>
                                                <button class="step-progress-btn" type="button"><span
                                                        class="step-info">Exemplo de Rótulo 4</span>
                                                </button>
                                                <button class="step-progress-btn" type="button"><span
                                                        class="step-info">Exemplo de Rótulo 5</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {{-- .text --}}
                        <div class="row" style="padding-top: 2.5em">
                            <div class="col-sm-12 col-md-12">
                                <div class="d-flex">
                                    <div class="col-sm-10 col-md-10">
                                        <div class="row">
                                            <div class="col-md-auto">
                                                <img src="{{ URL::asset('img/x-icon.png') }}" style="width:30px; padding-top:16px;"/>
                                            </div>
                                            <div class="col">
                                                <h1>Sobre o programa</h1>
                                            </div>
                                        </div>
                                        <div style="text-align:justify;">
                                            <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                                        </div>
                                    </div>
                                        <span class="br-divider vertical mx-3"></span>
                                    <div class="scrimutilexemplo">
                                        <div class="br-card">
                                            <div class="card-content"><img src="{{ URL::asset('img/img-ex-news.jpg') }}" alt="Imagem de exemplo"/></div>
                                        </div>
                                        <button class="br-button primary" type="button">Saiba Mais
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="br-scrim-util foco " id="scrimutilexample" data-scrim="true">
                            <div class="br-modal auto">
                                <div class="br-modal-body">
                                    <p>As cisternas podem ser:
                                    <ul>
                                        <li>Cisterna familiar de água para consumo, instalada ao lado das casas e com
                                            capacidade de armazenar 16
                                            mil litros de água potável.
                                        </li>
                                        <li>Cisterna familiar de água para consumo, instalada ao lado das casas e com
                                            capacidade de armazenar 16
                                            mil litros de água potável.
                                        </li>
                                        <li>Cisterna familiar de água para consumo, instalada ao lado das casas e com
                                            capacidade de armazenar 16
                                            mil litros de água potável.
                                        </li>
                                    </ul>
                                    </p>
                                    <p>
                                        A metodologia de implementação empregada pelo programa é o de tecnologia social,
                                        ou seja, é implementado
                                        em
                                        interação direta com a população diretamente beneficiada, envolvendo técnicas e
                                        metodologias
                                        apropriadas.
                                        Para isso a implementação prevê as seguintes etapas:
                                    </p>

                                    <p>
                                        <strong>1) Mobilização social</strong> - é o processo de escolha das comunidades
                                        envolvidas e
                                        mobilização
                                        das famílias que
                                        serão contempladas, realizado pela entidade executora com a participação de
                                        instituições representativas
                                        da
                                        localidade.
                                    </p>

                                    <p>
                                        <strong>2) Capacitação</strong> - é a fase do projeto que caracteriza as
                                        tecnologias implementadas pelo
                                        Programa Cisternas
                                        como “tecnologias sociais”, afinal, estimula-se o envolvimento dos beneficiários
                                        por meio da realização
                                        de
                                        capacitações específicas. Tais capacitações são realizadas valorizando a
                                        organização comunitária
                                        existente,
                                        com proposta pedagógica adequada, voltada à educação popular. Os materiais
                                        didáticos utilizados são
                                        produzidos com linguagem simples e ilustrações, favorecendo a compreensão dos
                                        processos envolvidos.
                                    </p>

                                    <p>
                                        <strong>3) Implementação</strong> – é a fase do projeto que se constrói ou
                                        implementa a tecnologia. A
                                        mão
                                        de obra é escolhida
                                        preferencialmente na própria comunidade, barateando, assim, custos, gerando
                                        oportunidades de trabalho e
                                        movimentando a economia local. As famílias beneficiadas e os pedreiros
                                        envolvidos são capacitados pelo
                                        próprio programa. Assim o processo de construção e implementação das tecnologias
                                        é realizado em regime
                                        de
                                        cooperação, gerando sentimento de pertencimento, o que promove mais
                                        sustentabilidade ao equipamento
                                        instalado.
                                    </p>
                                </div>
                                <div class="br-modal-footer justify-content-center">
                                    <button class="br-button secondary" type="button" id="scrimfechar"
                                            data-dismiss="scrimexample">Voltar
                                    </button>
                                </div>
                            </div>
                        </div>
                    
                        {{-- .banner --}}
                        <div class="row">
                            <div class="col-sm-12 col-md-12" style="padding-top: 2.5em">
                                <img style="width:100%; border-ardius:5px;" src="{{ URL::asset('img/banner-fomento.png') }}">
                            </div>
                        </div>
                    
                        <div class="row" style="padding-top: 2.5em">
                            <div class="col-sm-6 col-md-4 col-lg-3">
                                <div class="br-card">
                                    <div class="card-content"><img src="{{ URL::asset('img/ex-img.png') }}" style="border-radius:6px;" alt="Imagem de exemplo"/></div>
                                    <div class="card-footer">
                                        <div class="d-flex">
                                            <div class="ml-3">
                                                <div class="text-weight-semi-bold text-up-02">
                                                    GovBr - Rio grande do Norte
                                                </div>
                                                <div style="color:gray; margin-top:10px;"><i class="far fa-calendar-alt"></i> {{$data_atual}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-3">
                                <div class="br-card">
                                    <div class="card-content"><img src="{{ URL::asset('img/ex-img.png') }}" style="border-radius:6px;" alt="Imagem de exemplo"/></div>
                                    <div class="card-footer">
                                        <div class="d-flex">
                                            <div class="ml-3">
                                                <div class="text-weight-semi-bold text-up-02">
                                                    GovBr - Rio grande do Norte
                                                </div>
                                                <div style="color:gray; margin-top:10px;"><i class="far fa-calendar-alt"></i> {{$data_atual}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-3">
                                <div class="br-card">
                                    <div class="card-content"><img src="{{ URL::asset('img/ex-img.png') }}" style="border-radius:6px;" alt="Imagem de exemplo"/></div>
                                    <div class="card-footer">
                                        <div class="d-flex">
                                            <div class="ml-3">
                                                <div class="text-weight-semi-bold text-up-02">
                                                    GovBr - Rio grande do Norte
                                                </div>
                                                <div style="color:gray; margin-top:10px;"><i class="far fa-calendar-alt"></i> {{$data_atual}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-3">
                                <div class="br-card">
                                    <div class="card-content"><img src="{{ URL::asset('img/ex-img.png') }}" style="border-radius:6px;" alt="Imagem de exemplo"/></div>
                                    <div class="card-footer">
                                        <div class="d-flex">
                                            <div class="ml-3">
                                                <div class="text-weight-semi-bold text-up-02">
                                                    GovBr - Rio grande do Norte
                                                </div>
                                                <div style="color:gray; margin-top:10px;"><i class="far fa-calendar-alt"></i> {{$data_atual}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </main>

@endsection
