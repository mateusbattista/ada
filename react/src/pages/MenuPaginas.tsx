import './../wdyr';
import React, { useState } from 'react';
import {
    Button,
    Card,
    Row,
    Container,
    Col,
    Table,
    Message,
    Input,
    Modal,
    Select
} from './../components/index.ts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../App.css';
import { Outlet } from 'react-router-dom';
import logoGov from './../img/gov-br-logo.png';
import logoBranca from './../img/gov-br-branca.png';
const imageSample = '';


function MenuPaginas() {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    return (
        <div>
            <Row>
                <h5>Ações e Programas</h5>
            </Row>
            <span className="br-divider sm my-3"></span>
            <Row>
                <Col sm={6} md={3} lg={3}>
                    <a href="/ada" style={{backgroundImage: 'none', width:'100%', height:'100%'}} className="my-3   br-button"> <Card hover={'true'} density={'large'}><Card.Content>Ir para ADA</Card.Content></Card></a>
                </Col>
                <Col sm={6} md={3} lg={3}>
                    <a href="/fomento" style={{backgroundImage: 'none', width:'100%', height:'100%'}} className="my-3   br-button" type="button"><Card hover={'true'} density={'large'}><Card.Content>Ir para Fomento</Card.Content></Card></a>
                </Col>
                <Col sm={6} md={3} lg={3}>
                    <a href="/leite" style={{backgroundImage: 'none', width:'100%', height:'100%'}} className="my-3   br-button" type="button"><Card hover={'true'} density={'large'}><Card.Content>Ir para Leite</Card.Content></Card></a>
                </Col>
                <Col sm={6} md={3} lg={3}>
                    <a href="/paa"   style={{backgroundImage: 'none', width:'100%', height:'100%'}} className="my-3   br-button " type="button"><Card   hover={'true'} density={'large'}><Card.Content >Ir para PAA</Card.Content></Card></a>
                </Col>
            </Row>

        </div>
    );
}

export default MenuPaginas;
