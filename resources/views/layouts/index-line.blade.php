<header class="br-header mb-4" id="header" data-sticky="data-sticky">
    <div class="container-lg">
        <div class="header-top">
            <div class="header-logo">
                <a href="{{route('indexFomento')}}">
                    <img src="{{ URL::asset('img/gov-br-logo.png') }}" alt="logo" />
                </a>
                <span class="br-divider vertical"></span>
                <div class="header-sign m-2">
                    Ministério do Desenvolvimento e Assistência Social, Família e Combate à Fome
                </div>
                
            </div>
            <div class="header-actions">
                <div class="header-login">
                    <div class="header-sign-in">
                        |
                        <a href="#"><i class="fas fa-chart-bar" style="font-size:18px; color:#1351b4;"></i></a>
                        <a href="#"><i class="fas fa-headphones-alt" style="font-size:18px; color:#1351b4;"></i></a>
                        <a href="#"><i class="fas fa-comment" style="font-size:18px; color:#1351b4;"></i></a>
                        <a href="#"><i class="fas fa-adjust" style="font-size:18px; color:#1351b4;"></i></a>
                        <a class="br-button secondary mr-1" type="button" href="{% url 'logout' %}"><i class="fas fa-user" aria-hidden="true"></i><span class="d-sm-inline">Sair</span></a>
                    </div>
                    <div class="header-avatar"></div>
                </div>
            </div>
        </div>
        <div class="header-bottom">
            <div class="header-menu">
                <div class="header-menu-trigger" id="header-navigation">
                    <button class="br-button small circle" type="button" aria-label="Menu" data-toggle="menu" data-target="#main-navigation" id="navigation"><i class="fas fa-bars" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="header-info">
                    <div class="header-title" style="letter-spacing:1px;">Brasil MDS</div>
                </div>
            </div>
        </div>
    </div>
</header>