@extends('layouts.main-interno')
@section('title', 'ADA')
@section('line-header')
    @include('ada.line-header')
@endsection
@section('nav-bar')
    @include('ada.nav-bar')
@endsection
@section('content')

    <main class="d-flex flex-fill mb-5" id="main">
        <div class="container-lg d-flex">
            <div class="row col-lg-12">
                <div class="col mb-5">
                    <div class="main-content pl-sm-3 mt-4" id="main-content">

                        <div class="row" style="padding-top: 2.5em">
                            <div class="col-sm-12 col-md-12">
                                <div class="br-carousel" data-stage="in" data-mobile-nav="">
                                    <div class="carousel-button">
                                        <button class="br-button carousel-btn-prev terciary circle" type="button"
                                                aria-label="Anterior"><i class="fas fa-chevron-left"
                                                                         aria-hidden="true"></i>
                                        </button>
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
                        <div class="row" style="padding-top: 2.5em">
                            <div class="col-sm-12 col-md-12"  style="text-align: justify;">
                                <h1>Sobre o programa:</h1>
                                <p style="text-align: justify;">A Ação de Distribuição de Alimentos a Grupos Populacionais Tradicionais e Específicos – ADA,
                                    integra a estratégia de Segurança Alimentar e Nutricional do Estado brasileiro. A ADA é coordenada pela Secretaria Nacional de
                                    Segurança Alimentar e Nutricional (SESAN) e tem por objetivo a distribuição gratuita de alimentos de forma complementar a
                                    outras estratégias de fomento e acesso à alimentação para públicos de GPTE em situação de insegurança alimentar.</p>
                                <br>
                                <p>A ação atua em duas frentes: a primeira em atendimento a situações de emergência ou calamidade reconhecidas pela Defesa Civil Nacional
                                    e a segunda através da oferta de alimentos para povos e comunidades tradicionais e demais grupos populacionais tradicionais e específicos
                                    que estejam em situação de insegurança alimentar e nutricional temporária ou permanente, identificadas pelos órgãos gestores dos públicos específicos</p>
                                <br>
                                <p>
                                    <a href="https://www.in.gov.br/en/web/dou/-/portaria-mc-n-843-de-21-de-dezembro-de-2022-453260910" target="_blank">A PORTARIA MC Nº 843, DE 21 DE DEZEMBRO DE 2022</a>
                                    regulamenta o atendimento a povos e comunidades tradicionais. Nesse caso a atribuição da SESAN é adquirir os alimentos e viabilizar sua entrega
                                    nas localidades acordadas com os órgãos gestores dos públicos específicos, que serão responsáveis pela adoção de demais medidas necessárias
                                    à superação da situação de insegurança alimentar e nutricional. O atendimento é planejado a partir das informações e priorizações apresentadas
                                    pelos órgãos gestores dos grupos específicos, por meio de atividades de planejamento, acompanhamento da execução e monitoramento, realizadas de maneira conjunta
                                    no âmbito dos Grupos Técnicos.
                                    Os órgãos que podem demandar cestas por meio dessa Portaria são:
                                    Fundação Nacional dos Povos Indígenas (Funai), Secretaria Especial de Saúde Indígena (Sesai),
                                    Fundação Palmares e Instituto Chico Mendes de Conservação para Biodiversidade (ICMBio).</p>
                                <br>
                                <p><a href="https://www.in.gov.br/en/web/dou/-/portaria-mds-n-898-de-12-de-julho-de-2023-496073322"  target="_blank">A PORTARIA MDS No 898, DE 12 DE JULHO DE 2023</a>,
                                    alterada pela <a href="https://www.in.gov.br/web/dou/-/portaria-mds-n-918-de-21-de-setembro-de-2023-511737224"  target="_blank">
                                        Portaria MDS n0 918, de 21 de setembro de 2023</a>, regulamenta o atendimento nas situações de emergência ou calamidade pública reconhecidas
                                    pela Defesa Civil Nacional.</p>
                                <br>
                                <p>ATENÇÃO! A demanda de cestas só pode ser realizada pela Secretaria de Proteção e Defesa Civil (SEDEC) ou pelas defesas civis estaduais e municipais
                                    com vistas a garantir alimentação de modo emergencial à população afetada por desastres. No caso do atendimento a grupos populacionais tradicionais e
                                    específicos a demanda também pode ser realizada por órgãos federais.</p>
                                <br>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </main>

@endsection
