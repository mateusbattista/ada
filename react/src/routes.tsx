import React from 'react';
import { createBrowserRouter, Route } from 'react-router-dom';
import App from './App';
import AppFomento from './pages/Fomento/App/AppFomento';
import AppADA from './pages/ADA/App/AppADA';
import AppPAA from './pages/PAA/App/AppPAA';
import { rotasFomento } from './pages/Fomento/Rotas/Rotas';
import { rotasADA } from './pages/ADA/Rotas/Rotas';
import { rotasPAA } from './pages/PAA/Rotas/Rotas';
import { rotasLeite } from './pages/Leite/Rotas/Rotas';
import AppLeite from './pages/Leite/App/AppLeite';
import Index from './pages/ADA/Index';
import Login from './pages/Login.tsx';
import MenuPaginas from './pages/MenuPaginas';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/login/',
                element: <Login/>,
            },
            {
                path: '/menu/',
                element: <MenuPaginas/>,
            },
        ]
    },
]);

export default router;
