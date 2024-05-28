{{-- .nav --}}
<div class="br-menu push" id="main-navigation">
    <div class="menu-container">
        <div class="menu-panel">
            <div class="menu-header">
                <div class="menu-title"><a href="{{ route('indexADA') }}}"><img src="{{ URL::asset('img/gov-br-logo.png')}}" alt="Imagem ilustrativa" /><span>Programa de Fomento</span></a></div>
                <div class="menu-close">
                    <button class="br-button circle" type="button" aria-label="Fechar o menu" data-dismiss="menu"><i class="fas fa-times" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            <nav class="menu-body">

                {{-- .cad/eventos --}}
                <div class="menu-folder"><a class="menu-item" href="javascript: void(0)">
                        <span class="icon"><i class="far fa-folder-open"></i></span><span class="content">Autenticação</span></a>
                    <ul>
                        <li>
                            <a class="menu-item" href="{{ route('register') }}"><span class="icon"><i class="far fa-folder-open"></i></span><span class="content">Usuários</span></a>
                        </li>
                    </ul>
                </div>
                <div class="menu-folder"><a class="menu-item" href="javascript: void(0)">
                    <span class="icon"><i class="far fa-folder-open"></i></span><span class="content">Registros</span></a>
                    <ul>
                        <li>
                            <a class="menu-item" href="{{ route('eventosList') }}"><span class="icon"><i class="far fa-folder-open"></i></span><span class="content">Eventos</span></a>
                        </li>
                        <li>
                            <a class="menu-item" href="{{ route('solicitacaoList') }}"><span class="icon"><i class="far fa-folder-open"></i></span><span class="content">Solicitações</span></a>
                        </li>
                        <li>
                            <a class="menu-item" href="{{ route('publicosList') }}"><span class="icon"><i class="far fa-folder-open"></i></span><span class="content">publicos</span></a>
                        </li>
                    </ul>
                </div>

            </nav>
            <div class="menu-footer d-sm-none">
                <div class="menu-info">
                    <div class="text-center text-down-01">Todo o conteúdo deste site está
                        publicado
                        sob
                        a licença <strong>Creative Commons Atribuição-Sem Derivações
                            3.0</strong>
                    </div>
                </div>
            </div>
        </div>
        <div class="menu-scrim" data-dismiss="menu" tabindex="0"></div>
    </div>
</div>
