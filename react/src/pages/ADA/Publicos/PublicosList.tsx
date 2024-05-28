
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Breadcrumb, Modal, Button, Card, Row, Container, Col, Carousel, Checkbox, DateTimePicker, Divider, Input, Radio, Select, Loading, MagicButton, Message, Textarea, Switch, Upload, Wizard, List, Item, Pagination, Tag, Group , Header, Avatar, Menu, Table} from '../../../components/index.ts';
const imageSample = '';
import axios from 'axios';

import { useLocation, useNavigate } from 'react-router-dom';
import {BASE_URL} from '../../../global';


const PublicosList: React.FC = () => {
    const [currentEndpoint, setCurrentEndpoint] = useState<string>(BASE_URL+'/api/ada/publicos?pageSize=10&pageNumber=0');
    const ApiDelete = BASE_URL+'/api/ada/publicos/delete';

    const [modalDeletar, setModalAberta] = useState(false);
    const [idExclusao, setIdExclusao] = useState({id:''});
    const [nomeExclusao, setNomeExclusao] = useState('');
    const [statusatualizar, setAtualizar] = useState(true);

    const [message, setMessage] = useState({
        open: false,
        title: '',
        body: '',
        class: '',
    });

    const [dataForm, setDataForm] = useState({
        nometipopublico: '',
    });

    const location = useLocation();
    useEffect(() => {
        if (location.state && location.state.message) {
            console.log(location.state);
            setMessage({
                open: true,
                title: location.state.message.title,
                body: location.state.message.body,
                class: location.state.message.class,
            });
            window.history.replaceState(null, ''); //removendo message do histórico de navegação
        }
    }, []);


    const limpar = () => {
        setCurrentEndpoint(BASE_URL+'/api/ada/publicos?pageSize=10&pageNumber=0');
        setDataForm({...dataForm, nometipopublico:''});
        setAtualizar(true);

    };


    useEffect(() => {

        if(statusatualizar) {
            setAtualizar(false);
        }
    }, [statusatualizar]);

    const search = () => {
        const urlEndpoint = `${BASE_URL}/api/ada/publicos?pageSize=10&nometipopublico=${dataForm.nometipopublico}&pageNumber=0&pageNumber=0`;
        try {

            setCurrentEndpoint(urlEndpoint);
            setAtualizar(true);

        } catch (error) {
            console.error(error);
        }
    };


    const excluirPublico = async () => {
        try {
            const result = await axios.delete(`${ApiDelete}/${idExclusao.id}`);
            setModalAberta(false);
            setMessage({
                open: true,
                title: result.data.message.title,
                body: result.data.message.body,
                class: result.data.message.class,
            });
            setAtualizar(true);
        } catch (error) {
            console.error('Erro ao excluir:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDataForm(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const editClick = (e) => {
        const buttonId = e.target.id;
        setItemEditar({ id: buttonId });
    };

    const [itemEditar, setItemEditar] = useState({ id: '' });
    const navigate = useNavigate();

  useEffect(() => {
        const handleEnviar = () => {
            if (itemEditar.id !== '') {
                navigate('/ada/publicoUpdate', { state: { itemEditar } });
            }
        };
        handleEnviar();
    }, [itemEditar, navigate]);



    //exclusão
    const deleteClick = (e) => {
        const buttonId = e.target.id;
        const dados = e.target.dataset.dados.split(', ').reduce((obj, item) => {
            const [key, value] = item.split(': ');
            obj[key] = value;
            return obj;
        }, {});
        setNomeExclusao(dados.nometipopublico);

        setIdExclusao({ id: buttonId });
    };


    useEffect(() => {
        if (idExclusao.id !== '') {
            setModalAberta(true);
        }
    }, [idExclusao]);

    return (
        <>
            <Container fluid>
                <Row>
                    <Card>
                    {message.open ?
                            <Message category='message' messageTitle={message.title} type='success' icon="fas fa-check-circle"
                                onCloseButtonClick={() => setMessage(prevData => ({...prevData, open: false}))}>
                                {message.body}
                            </Message>
                        : null}
                        <Card.Header cardTitle='CADASTRO DE TIPOS DE PÚBLICOS' style={{ color: '#5992ED' }}/>
                        <Card.Content>
                            <Group >
                                <Row >
                                    <Col className='col-sm-12 px-6'>
                                        <Input
                                            onChange={handleChange}
                                            className='my-3'
                                            value={dataForm.nometipopublico}
                                            type='text'
                                            label='Público'
                                            placeholder='Nome do Público'
                                            name='nometipopublico' />
                                    </Col>
                                </Row>
                            </Group>
                        </Card.Content>
                        <Card.Footer className='mx-3'>
                            <Button
                                style={{ backgroundColor: '#f8f5f5', color: '#1351b4', }}
                                primary
                                className='mr-3'
                                onClick={limpar}
                            >
                                <i className="far fa-arrow-alt-circle-left mr-2" ></i>
                                Limpar
                            </Button>
                            <Button
                                onClick={search}
                                primary>
                                <i className="fas fa-search primary mr-2"></i>
                                Buscar
                            </Button>

                        </Card.Footer>
                    </Card>
                </Row>
                <Row>
                    <Card>
                        <Card.Header className='mr-auto'>
                                <div className='d-flex'>
                                    <div className='ml-auto'>
                                        <a href='/ada/publicoUpdate' className='br-button mr-3 primary'>
                                            <i className="fas fa-plus"></i> Adicionar
                                        </a>
                                    </div>
                                </div>
                            </Card.Header>
                        <Modal title={`Deseja realmente excluir o Público ${nomeExclusao}?`}
                                useScrim modalOpened={modalDeletar}
                                onCloseButtonClick={() =>
                                setModalAberta(false)}>
                                <Modal.Body>
                                    A Público será excluído da equipe permanentemente.
                                </Modal.Body>
                                <Modal.Footer justify-content='end'>
                                    <Button
                                        secondary small m={2}
                                        onClick={() =>
                                        setModalAberta(false)}
                                        >Cancelar</Button>
                                        <Button
                                        primary small m={2}
                                        onClick={excluirPublico}
                                        >Sim</Button>
                                </Modal.Footer>
                            </Modal>

                        <Card.Content>
                        <Table
                                title="Públicos"
                                headers={[
                                    { field: 'nometipopublico', label: 'Tipo Público' },
                                ]}
                                //data={portarias ? portarias : []}
                                // buttons={[
                                //     { type: 'button', classeNome: 'br-button circle', icon: { classeNome: 'fas fa-pencil-alt'} },
                                //     { type: 'button', classeNome: 'br-button circle', icon: { classeNome: 'fas fa-trash-alt'} },
                                // ]}
                                // endpoint={currentEndpoint}
                                //showSearch={false}
                                // onClickNextPage={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => 1}
                                // onClickPrevPage={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => 1}
                                buttons={[
                                    { type: 'button', onClick: editClick, classeNome: 'br-button circle', icon: { classeNome: 'fas fa-pencil-alt'} },
                                    { type: 'button', onClick: deleteClick, classeNome: 'br-button circle', icon: { classeNome: 'fas fa-trash-alt'} },
                                ]}
                            //data={eventos ? eventos : []}
                                endpoint={currentEndpoint}

                                atualizar={statusatualizar}
                            />
                        </Card.Content>
                    </Card>
                </Row>
                <br />

            </Container>


        </>
    );
};

export default PublicosList;
