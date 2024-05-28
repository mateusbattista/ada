import '../../../wdyr';

import React, { useEffect, useRef, useState } from 'react';
import './AppADA.css';
import { Outlet } from 'react-router-dom';
import { Header, Avatar, Menu, Table, Footer } from '../../../components/index.ts';
import logoGov from '../../../img/gov-br-logo.png';
import logoBranca from '../../../img/gov-br-branca.png';
const imageSample = '';
import {BASE_URL} from '../../../global';



function AppADA() {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    return (
        <div>
            <div className="template-base">
                <Header
                    urlLogo={logoGov}
                    systemName="Ministério do Desenvolvimento e Assistência Social, Família e Combate à Fome"
                    title="Programa Ação de Distribuição de Alimentos"
                    subTitle=''

                    features={[
                        { label: 'Funcionalidade 1', icon: 'fas fa-chart-bar', href: 'https://google.com/' },
                        { label: 'Funcionalidade 2', icon: 'fas fa-headset', onClick: () => { alert('Clicou!'); } },
                        { label: 'Funcionalidade 3', icon: 'fas fa-comment' },
                        { label: 'Funcionalidade 4', icon: 'fas fa-adjust' },
                    ]}

                    loggedIn={loggedIn}
                    onClickLogin={() => {
                        /** Realizar as ações necessárias para o login */
                        setLoggedIn(true);
                    }}

                    avatar={<Avatar imageSrc='https://picsum.photos/id/823/400' />}
                    className='mb-4'
                />
                <div className="d-flex flex-fill mb-5" id="main">
                    <div className="container-lg d-flex ">
                        <div className="row col-lg-12 ">
                            <Menu
                                id="menuprincipal"
                                type='push'
                                shadow
                                systemName="Meu Sistema"
                                systemLogoUrl={imageSample}
                                className='mt-2'
                                data={[
                                    {
                                        label: 'Solicitação',
                                        icon: 'fas fa-folder-plus',
                                        link: '/ada/solicitacao'
                                    },
                                    {
                                        label: 'Termo de Adesão',
                                        icon: 'fas fa-folder-plus',
                                        link: '/ada/termoadesao'
                                    },
                                    {
                                        label: 'Termo de Adesão Local',
                                        icon: 'fas fa-folder-plus',
                                        link: '/ada/termoadesao/local'
                                    },
                                    {
                                        label: 'Eventos',
                                        icon: 'fas fa-folder-plus',
                                        link: '/ada/evento'
                                    },
                                    {
                                        label: 'Publicos',
                                        icon: 'fas fa-folder-plus',
                                        link: '/ada/publico'
                                    },
                                    {
                                        label: 'Portarias',
                                        icon: 'fas fa-folder-plus',
                                        link: '/ada/portaria'
                                    },
                                    {
                                        label: 'Fornecedores',
                                        icon: 'fas fa-folder-plus',
                                        link: '/ada/fornecedor'
                                    },
                                    {
                                        label: 'Solicitação de Cestas',
                                        icon: 'fas fa-folder-plus',
                                        link: '/ada/solicitacaocestas/add'
                                    },
                                    {
                                        label: 'Avaliação de Solicitação de Cestas',
                                        icon: 'fas fa-folder-plus',
                                        link: '/ada/solicitacaocestas'
                                    },


                                ]}
                                logos={[
                                    {
                                        src: imageSample,
                                        alt: 'Logo 01'
                                    },
                                    {
                                        src: imageSample,
                                        alt: 'Logo 02'
                                    },
                                ]}

                                externalLinks={[
                                    {
                                        link: 'javascript:void(0)',
                                        label: 'Link externo 01'
                                    },
                                    {
                                        link: 'https://google.com/',
                                        label: 'Link externo 02'
                                    }
                                ]}

                                socialNetworks={[
                                    {
                                        link: 'javascript:void(0)',
                                        icon: 'fab fa-facebook-f',
                                        name: 'Facebook'
                                    },
                                    {
                                        link: 'javascript:void(0)',
                                        icon: 'fab fa-twitter',
                                        name: 'Twitter'
                                    },
                                    {
                                        link: 'javascript:void(0)',
                                        icon: 'fab fa-linkedin-in',
                                        name: 'Linkedin'
                                    },
                                    {
                                        link: 'javascript:void(0)',
                                        icon: 'fab fa-whatsapp',
                                        name: 'Whatsapp'
                                    }
                                ]}

                                info={<div className="text-center text-down-01">
                                    Todo o conteúdo deste site está publicado sob a licença <strong>Creative Commons Atribuição-SemDerivações 3.0</strong>
                                </div>}
                            />
                            <div className="col mb-5">
                                <div className="main-content pl-sm-3 mb-6" id="main-content">
                                    <Outlet />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Footer
                    className='my-6'
                    urlLogo={logoBranca}
                    userLicenseText="Texto destinado a exibição de informações relacionadas à licença de uso."

                />

            </div>
        </div>

    );
}

export default AppADA;
