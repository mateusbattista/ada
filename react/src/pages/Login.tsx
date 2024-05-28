import './../wdyr';
import React, {useEffect, useState} from 'react';
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
    Select, Group
} from './../components/index.ts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../App.css';
import { Outlet } from 'react-router-dom';
import logoGov from './../img/gov-br-logo.png';
import logoBranca from './../img/gov-br-branca.png';
const imageSample = '';


function Login() {

    const url = 'https://sso.staging.acesso.gov.br/authorize ';
    const response_type = 'code';
    const [client_id, setClientId] = useState('');
    const [scope, setScope] = useState('');
    const [redirect_uri, setRedirectUri] = useState('');
    const [nonce, setNonce] = useState('');
    const [state, setState] = useState('');
    const [code_challenge, setCodeChallenge] = useState('');
    const [code_challenge_method, setCodeChallengeMethod] = useState('S256');

        const autenticacao = async () => {
            try {
                const result = await axios.get(
                    `${url}?response_type=${response_type}
                         &client_id=${client_id}
                         &scope=${scope}
                         &redirect_uri=${redirect_uri}
                         &nonce=${nonce}
                         &state=${state}
                         &code_challenge=${code_challenge}
                         &code_challenge_method=${code_challenge_method}`

                );


            } catch (error) {
                console.error('Erro ao autenticar:', error);
            }
        };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" >


                <div className="authentication-wrapper authentication-basic container-p-y col-lg-4 mt-6" style={{ textAlign: 'center' }}>
                <div className="authentication-inner">
                    <div className="br-card">
                        <div className="card-header">
                            <img width="55%" src={logoGov} alt="logo" />
                        </div>
                        <form id="formAuthentication" className="mb-3" >
                            <div className="form-group row mt-3 justify-content-center">


                                <div className="mb-3 form-password-toggle">
                                    <Input  icon="user" type="text" placeholder="CPF" />
                                    <Input className=" justify-content-center mt-2 mb-2" icon="key" type="password" placeholder="Senha" />
                                    <Button primary className="br-button mt-5 " style={{ width: '70%'}} type="submit">
                                        Entrar
                                    </Button>
                                </div>
                            </div>
                            <div className="card-footer" >
                                <div>
                                    <i className="fas fa-regular fa-eraser" style={{ color: 'orangered' }} />
                                    <a href="auth-forgot-password-basic.html">
                                        <small>Redefinir senha</small>
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            <div className="form-row mt-3 text-center"><a href="/login/govbr/" className="btn default">
                Entrar com <span>Gov.BR</span></a></div>




            {/*<Group >*/}
                    {/*    <Row >*/}
                    {/*        <Col className='col-lg-4 col-sm-4 px-6'>*/}
                    {/*            <Input*/}
                    {/*                    // onChange={handleChange}*/}
                    {/*                   // value={dataForm.nometipoevento}*/}
                    {/*                   name='nometipoevento'*/}
                    {/*                   className='my-3'*/}
                    {/*                   type='text'*/}
                    {/*                   label='CPF'*/}
                    {/*                   placeholder='CPF' />*/}
                    {/*        </Col>*/}
                    {/*    </Row>*/}
                    {/*</Group>*/}
                    {/*<Button*/}
                    {/*    primary*/}
                    {/*    onClick={autenticacao}*/}
                    {/*>Entrar com gov.br</Button>*/}


        </div>
    );
}

export default Login;
