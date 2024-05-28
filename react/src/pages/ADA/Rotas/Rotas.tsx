import FornecedorCreateEdit from '../Fornecedor/FornecedorCreateEdit';
import FornecedorList from '../Fornecedor/FornecedorList';
import PortariasList from '../Portarias/PortariasList';
import PortariaCreateEdit from '../Portarias/PortariaCreateEdit';
import EventosList from '../Eventos/EventosList';
import EventosCreateEdit from '../Eventos/EventosCreateEdit';
import SolicitacaoList from '../Solicitacoes/solicitacaoList';
import React from 'react';
import SolicitacaoCestasForm from '../SolicitacaoCestas/SolicitacaoCestasForm';
import SolicitacaoCestasList from '../SolicitacaoCestas/SolicitacaoCestasList';
import SolicitacaoCestasAvaliacao from '../SolicitacaoCestas/SolicitacaoCestasAvaliacao';
import SolicitacaoCreateEdit from '../Solicitacoes/solicitacaoCreateEdit';
import Index from '../Index';
import PublicosCreateEdit from '../Publicos/PublicosCreateEdit';
import PublicosList from '../Publicos/PublicosList';
import TermoAdesaoList from '../TermoAdesao/TermoAdesaoList';
import TermoAdesaoCreate from '../TermoAdesao/TermoAdesaoCreate';
import TermoAdesaoLocal from '../TermoAdesao/TermoAdesaoLocal';
import TermoAdesaoListLocal from '../TermoAdesao/TermoAdesaoListLocal';
import SolicitacaoCreate from '../Solicitacoes/solicitacaoCreate';
import {BASE_URL} from '../../../global';

export const rotasADA = [
    {
        path: '/ada/',
        element: <Index />,
    },
    {
        path: '/ada/portaria',
        element: <PortariasList  />,
    },
    {
        path: '/ada/portaria/createEdit',
        element: <PortariaCreateEdit />,
    },
    {
        path: '/ada/evento',
        element: <EventosList />,
    },
    {
        path: '/ada/evento/createEdit',
        element: <EventosCreateEdit />,
    },
    {
        path: '/ada/fornecedor',
        element: <FornecedorList />,
    },
    {
        path: '/ada/fornecedor/createEdit',
        element: <FornecedorCreateEdit />,
    },
    {
        path: '/ada/solicitacaocestas/add',
        element: <SolicitacaoCestasForm />,
    },
    {
        path: '/ada/solicitacaocestas',
        element: <SolicitacaoCestasList />,
    },
    {
        path: '/ada/solicitacaocestas/avaliacao',
        element: <SolicitacaoCestasAvaliacao />,
    },
    {
        path: '/ada/solicitacao',
        element: <SolicitacaoList />,
    },
    {
        path: '/ada/solicitacao/registro',
        element: <SolicitacaoCreate />,
    },
    {
        path: '/ada/solicitacao/createEdit',
        element: <SolicitacaoCreateEdit />,
    },
    {
        path: '/ada/publico',
        element: <PublicosList/>,
    },
    {
        path: '/ada/publicoUpdate',
        element: <PublicosCreateEdit />,
    },
    {
        path: '/ada/termoadesao/createEdit',
        element: <TermoAdesaoCreate />,
    },
    {
        path: '/ada/termoadesao',
        element: <TermoAdesaoList />,
    },
    {
        path: '/ada/termoadesao/view',
        element: <TermoAdesaoCreate />,
    },
    {
        path: '/ada/termoadesao/local',
        element: <TermoAdesaoListLocal />,
    },
];
