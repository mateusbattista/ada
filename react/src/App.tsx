import './wdyr';

import React, { useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { Header, Avatar, Menu, Table, Footer, Row } from './components/index.ts';
import logoGov from './img/gov-br-logo.png';
import logoBranca from './img/gov-br-branca.png';
const imageSample = '';


function App() {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    return (
        <div>
            <div className="template-base">
                <Header
                    urlLogo={logoGov}
                    systemName="Ministério do Desenvolvimento e Assistência Social, Família e Combate à Fome"
                    title="MDS"
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
                                        label: 'Brasil MDS',
                                        icon: 'fas fa-clipboard-list',
                                        submenu: [
                                            {
                                                label: 'Ir para ADA',
                                                link: '/ada',
                                                icon: 'fas fa-file-upload'
                                            },
                                            {
                                                label: 'Ir para Fomento',
                                                link: '/fomento',
                                                icon: 'fas fa-clipboard-list'
                                            },
                                            {
                                                label: 'Ir para Leite',
                                                link: '/leite',
                                                icon: 'fas fa-clipboard-list'
                                            },
                                            {
                                                label: 'Ir para PAA',
                                                link: '/paa',
                                                icon: 'fas fa-clipboard-list'
                                            }
                                        ]
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

export default App;
