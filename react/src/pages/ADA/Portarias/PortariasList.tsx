
import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Row, Container, Col, Input, Message, Pagination, Group } from '../../../components/index.ts';
import { Table } from '../../../components/index.ts';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {BASE_URL} from '../../../global';

const PortariasList: React.FC = () => {
    const [urlPortaria, setUrlPortaria] = useState<string>(BASE_URL+'/api/ada/portaria?pageSize=10&pageNumber=0');
    const apiDelete = BASE_URL+'/api/ada/portaria/delete';

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
        nome_portarias: '',
    });

    //verificando se ouve redirecionamento com mensagem para esta página
    const location = useLocation();
    useEffect(() => {
        if (location.state && location.state.message) {
            setMessage({
                open: true,
                title: location.state.message.title,
                body: location.state.message.body,
                class: location.state.message.class,
            });
            window.history.replaceState(null, ''); //removendo message do histórico de navegação
        }
    }, []);

    //limpar busca
    const limpar = () => {
        setUrlPortaria(BASE_URL+'/api/ada/portaria?pageSize=10&pageNumber=0');
        setDataForm({ ...dataForm, nome_portarias: '' });
        setAtualizar(true);
    };

    //buscar
    const search = () => {
        const urlEndpoint = `${BASE_URL}/api/ada/portaria?pageSize=10&nome_portarias=${dataForm.nome_portarias}&pageNumber=0&pageNumber=0`;
        try {
            setUrlPortaria(urlEndpoint);
            setAtualizar(true);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {

        if(statusatualizar) {
            setAtualizar(false);
        }
    }, [statusatualizar]);



    // exclusao
    const excluirPortaria = async () => {
        try {
            const result = await axios.delete(`${apiDelete}/${idExclusao.id}`);
            setModalAberta(false);
            setMessage({
                open: true,
                title: result.data.message.title,
                body: result.data.message.body,
                class: result.data.message.class,
            });
            setAtualizar(true);
        } catch (error) {
            console.error('Erro ao enviar dados para o Laravel:', error);
        }
    };

    // mudar o valor do input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDataForm(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // captura o id do botão de editar clicado
    const [itemEditar, setItemEditar] = useState({ id: '' });
    const navigate = useNavigate();

    const editClick = (e) => {
        const buttonId = e.target.id;
        setItemEditar({ id: buttonId });
    };

    useEffect(() => {
        const handleEnviar = () => {
            if (itemEditar.id !== '') {
                navigate('/ada/portaria/createEdit', { state: { itemEditar } });
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
        setNomeExclusao(dados.nome_portarias);

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
                            <Message category='message' messageTitle={message.title} type="success" icon="fas fa-check-circle"
                                onCloseButtonClick={() => setMessage(prevData => ({...prevData, open: false}))}>
                                {message.body}
                            </Message>
                        : null}
                        <Card.Header cardTitle='CADASTRO DE TIPOS DE PORTARIAS' style={{ color: '#5992ED' }}/>
                        <Card.Content>
                            <Group >
                                <Row >
                                    <Col className='col-sm-12 px-6'>
                                        <Input onChange={handleChange} value={dataForm.nome_portarias} name='nome_portarias' className='my-3' type='text' label='Portaria' placeholder='Nome da portaria' />
                                    </Col>
                                </Row>
                            </Group>
                        </Card.Content>
                        <Card.Footer className='mx-3'>
                            <Button
                                style={{ backgroundColor: '#f8f5f5', color: '#1351b4', }}
                                primary
                                className='mr-3'
                                onClick={limpar}>
                                <i className="far fa-arrow-alt-circle-left mr-2" ></i>
                                Limpar
                            </Button>
                            <Button primary onClick={search}>
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
                                    <a href='/ada/portaria/createEdit' className='br-button mr-3 primary'>
                                        <i className="fas fa-plus"></i> Adicionar
                                    </a>
                                </div>
                            </div>
                        </Card.Header>
                        <Modal title={`Deseja realmente excluir a portaria ${nomeExclusao}?`}
                            useScrim modalOpened={modalDeletar}
                            onCloseButtonClick={() => setModalAberta(false)}>
                            <Modal.Body>
                                A portaria será excluído da equipe permanentemente.
                            </Modal.Body>
                            <Modal.Footer justify-content='end'>
                                <Button secondary small m={2} onClick={() => setModalAberta(false)}>Cancelar</Button>
                                <Button primary small m={2} onClick={excluirPortaria}>Sim</Button>
                            </Modal.Footer>
                        </Modal>
                        <Card.Content>
                            <Table
                                title="Portarias"
                                headers={[
                                    { field: 'nome_portarias', label: 'Tipo Portaria' },
                                ]}
                                buttons={[
                                    { type: 'button', onClick: editClick, classeNome: 'br-button circle', icon: { classeNome: 'fas fa-pencil-alt'} },
                                    { type: 'button', onClick: deleteClick, classeNome: 'br-button circle', icon: { classeNome: 'fas fa-trash-alt'} },
                                ]}
                                //data={eventos ? eventos : []}
                                endpoint={urlPortaria}

                                atualizar={statusatualizar}></Table>
                        </Card.Content>
                    </Card>
                </Row>
                <br />
            </Container>
        </>
    );
};

export default PortariasList;
