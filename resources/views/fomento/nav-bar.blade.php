{{-- .nav --}}
<div class="br-menu push" id="main-navigation">
    <div class="menu-container">
        <div class="menu-panel">
            <div class="menu-header">
                <div class="menu-title"><a href="{{ route('indexFomento') }}}"><img src="{{ URL::asset('img/gov-br-logo.png')}}" alt="Imagem ilustrativa" /><span>Programa de Fomento</span></a></div>
                <div class="menu-close">
                    <button class="br-button circle" type="button" aria-label="Fechar o menu" data-dismiss="menu"><i class="fas fa-times" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            <nav class="menu-body">

                {{-- .cad/entidades --}}
                <div class="menu-folder"><a class="menu-item" href="javascript: void(0)">
                        <span class="icon"><i class="far fa-folder-open"></i></span><span class="content">Autenticação</span></a>
                    <ul>
                        <li>
                            <a class="menu-item" href="{{ route('register') }}"><span class="icon"><i class="far fa-folder-open"></i></span><span class="content">Entidade Gestora</span></a>
                        </li>
                    </ul>
                </div>
                <div class="menu-folder"><a class="menu-item" href="javascript: void(0)">
                    <span class="icon"><i class="far fa-folder-open"></i></span><span class="content">Cadastro de Entidades</span></a>
                    <ul>
                        <li>
                            <a class="menu-item" href="{{ route('EntidadesGestorasList') }}"><span class="icon"><i class="far fa-folder-open"></i></span><span class="content">Entidade Gestora</span></a>
                        </li>
                        <li>
                            <a class="menu-item" href="{{ route('entidadesExecutorasList') }}"><span class="icon"><i class="far fa-folder-open"></i></span><span class="content">Entidade Executora</span></a>
                        </li>
                    </ul>
                </div>


                {{-- .cad/equipe --}}
                <div class="menu-folder"><a class="menu-item" href="javascript: void(0)"><span class="icon"><i class="fas fa-users"></i></span><span class="content">Cadastro de Equipes</span></a>
                    <ul>
                        <li>
                            <a class="menu-item" href="{{ route('equipeResponsaveisList', 'mds') }}"><span class="icon"><i class="fas fa-user" aria-hidden="true"></i></span><span class="content">Equipe da União</span></a>
                        </li>
                        <li>
                            <a class="menu-item" href="{{ route('equipeResponsaveisList', 'gestora') }}"><span class="icon"><i class="fas fa-users" aria-hidden="true"></i></span><span class="content">Equipe Gestora</span></a>
                        </li>
                        <li>
                            <a class="menu-item" href="{{ route('equipeResponsaveisList', 'executora') }}"><span class="icon"><i class="fas fa-users" aria-hidden="true"></i></span><span class="content">Equipe Executora</span></a>
                        </li>
                        <li>
                            <a class="menu-item" href="{{ route('equipeResponsaveisList', 'tecnica') }}"><span class="icon"><i class="fas fa-users" aria-hidden="true"></i></span><span class="content">Equipe Técnica Execussão</span></a>
                        </li>
                    </ul>
                </div>

                {{-- .cad/pacerias --}}
                <div class="menu-folder">
                    <a class="menu-item" href="javascript: void(0)">
                        <span class="icon">
                            <i class="fas fa-pencil-alt"></i>
                        </span>
                        <span class="content">Instrumentos de Parcerias</span>
                    </a>
                    <ul>
                        <li>
                            <a class="menu-item" href="{{ route('PlanoOperacionalList' ) }}"><span class="icon"><i class="fas fa-file-upload" aria-hidden="true"></i></span><span class="content">Plano de Trabalho</span></a>
                        </li>
                        <li>
                            <a class="menu-item" href="{{ route('termoAdesaoForm' ) }}"><span class="icon"><i class="fas fa-clipboard-list" aria-hidden="true"></i></span><span class="content">Termo de Adesão</span></a>
                        </li>
                        <li>
                            <a class="menu-item" href="{% url 'pendenciacredenciamento_add' %}"><span class="icon"><i class="fas fa-stamp" aria-hidden="true"></i></span><span class="content">Preenche Info</span></a>
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
