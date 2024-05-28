
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import {
    Breadcrumb,
    Button,
    Card,
    Row,
    Container,
    Col,
    Carousel,
    Checkbox,
    DateTimePicker,
    Divider,
    Input,
    Radio,
    Select,
    Loading,
    MagicButton,
    Message,
    Textarea,
    Switch,
    Upload,
    Wizard,
    List,
    Item,
    Pagination,
    Tag,
    Group,
    Modal
} from '../../../components/index.ts';
import { Header, Avatar, Menu, Table } from '../../../components/index.ts';
const imageSample = '';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

import {BASE_URL} from '../../../global';

const baseURL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

const url = 'http://api.mds.rn.gov.br/fomento/fetch-estados';


const SolicitacaoCestasList: React.FC = () => {
    const [currentEndpoint, setCurrentEndpoint] = useState<string>(BASE_URL+'/api/ada/solicitacaocesta?pageSize=10&pageNumber=0');
    const apiDelete = BASE_URL+'/api/ada/solicitacaocesta/delete';

    const [estados, setEstados] = useState(null);
    const [municipios, setMunicipios] = useState<any[]>([]);


    const [modalDeletar, setModalAberta] = useState(false);
    const [idExclusao, setIdExclusao] = useState({id:''});
    const [nomeExclusao, setNomeExclusao] = useState('');
    const [statusatualizar, setAtualizar] = useState(true);

    useEffect(() => {

        if(statusatualizar) {
            setAtualizar(false);
        }
    }, [statusatualizar]);

    const [message, setMessage] = useState({
        open: false,
        title: '',
        body: '',
        class: '',
    });
    const habilitacaoOptions = [
        {
            label: 'Ativo',
            value: 'ATIVO'
        },
        {
            label: 'Inativo',
            value: 'INATIVO'
        }
    ];

    const [dataForm, setDataForm] = useState({
        cnpjentefederativo: '',
        ibge: '',
        situacaocestas: '',

    });

    useEffect(() => {
        axios.get(url)
            .then(response => {
                const data = response.data;
                // Access and use the data from response.data, e.g.:
                setEstados(data.map((estado) => ({
                    label: estado.estado, // Assuming 'nome' is the property for name
                    value: estado.sigla, // Assuming 'id' is the unique identifier
                })));

            })
            .catch(error => {
                console.error(error); // Handle any errors during the request
            });
    }, []);

    const minicipio = (selectedOption) => {
        setMunicipios([]);
        const url = `http://api.mds.rn.gov.br/fomento/fetch-municipios/${selectedOption}`;
        const urlEndpoint = `http://api.mds.rn.gov.br/fomento/entidades-gestoras?pageSize=5&estado=${selectedOption}&pageNumber=0`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('API response:', data);
                console.log(selectedOption);
                setMunicipios(data);

                setCurrentEndpoint(urlEndpoint);
                console.log(urlEndpoint);
            })
            .catch(error => {
                console.error('Error making API request:', error);
            });
    };


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


    const limpar = () => {
        setCurrentEndpoint(BASE_URL+'/api/ada/solicitacaocesta?pageSize=10&pageNumber=0');
        setDataForm({ ...dataForm,
            cnpjentefederativo: '',
            ibge: '',
            situacaocestas: '',});
        setAtualizar(true);
    };



    const search = () => {
        let searchName = '';
        if (dataForm.cnpjentefederativo != '') {
            searchName  += `&cnpjentefederativo=${dataForm.cnpjentefederativo}`;
        }
        if (dataForm.ibge != '') {
            searchName  += `&ibge=${dataForm.ibge}`;
        }
        if (dataForm.situacaocestas != '') {
            searchName  += `&situacaocestas=${dataForm.situacaocestas}`;
        }
        const urlEndpoint = `${BASE_URL}/api/ada/solicitacaocesta?${searchName}&pageSize=10&pageNumber=0`;
        try {
            setCurrentEndpoint(urlEndpoint);
            setAtualizar(true);

        } catch (error) {
            console.error(error);
        }
    };


    const excluir = async () => {
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
            console.error('Erro ao tentar excluir:', error);
        }
    };

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
                navigate('/ada/solicitacaocestas/avaliacao', { state: { itemEditar } });
            }
        };
        handleEnviar();
    }, [itemEditar, navigate]);


    const deleteClick = (e) => {
        const buttonId = e.target.id;
        const dados = e.target.dataset.dados.split(', ').reduce((obj, item) => {
            const [key, value] = item.split(': ');
            obj[key] = value;
            return obj;
        }, {});
        setIdExclusao({ id: buttonId });
        setNomeExclusao(dados.cnpjentefederativo);
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
                            <Message category='message' messageTitle={message.title} type={message.class} icon="fas fa-check-circle"
                                     onCloseButtonClick={() => setMessage(prevData => ({...prevData, open: false}))}>
                                {message.body}
                            </Message>
                            : null}
                        <Card.Header cardTitle='SOLICITAÇÕES DE CESTAS EMERGENCIAIS' style={{ color: '#1351B4' }}/>
                        <Card.Content>
                            <Group >
                                <Row >
                                    <Col className='col-sm-12 px-6'>
                                        <Input onChange={handleChange} value={dataForm.cnpjentefederativo} name='cnpjentefederativo' className='my-3' type='text' label='CNPJ'  />
                                    </Col>
                                </Row>
                            </Group>
                            <Group >
                                <Row >
                                    <Col className='col-sm-6 px-6'>
                                        {estados ? (
                                            <Select
                                                id="select-simples"
                                                placeholder="Selecione o estado"
                                                label="Estado"
                                                options={estados}
                                                onChange={minicipio}
                                            />
                                        ) : (
                                            <p>Loading estados...</p>
                                        )}
                                    </Col>

                                    <Col className='col-sm-6'>
                                        <Select

                                            id="select-municipios"
                                            placeholder='Selecione o município'
                                            label="Município"
                                            options={municipios.map((municipio) => ({
                                                label: `${municipio.no_nome_municipio} - ${municipio.nu_cdibge}`, // Assuming 'nome' is the property for municipality name
                                                value: municipio.nu_cdibge, // Assuming 'id' is the unique identifier
                                            }))}
                                            className='mx-3'
                                            // ... other props
                                        />
                                    </Col>
                                </Row>
                            </Group>
                            <Group >
                                <Row >
                                    <Col className='col-sm-12 px-6'>
                                        <Input onChange={handleChange} value={dataForm.ibge} name='Código IBGE:' className='my-3' type='text' label='Código IBGE'  />
                                    </Col>
                                </Row>
                            </Group>
                            <Group >
                                <Row >
                                    <Col className='col-sm-12 px-6'>
                                        <Select
                                            id="situacao"
                                            placeholder="Selecione a situação"
                                            label="Situação"
                                            options={habilitacaoOptions}
                                        />
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
                                Limpar Busca
                            </Button>
                            <Button
                                onClick={search}
                                primary>
                                <i className="fas fa-search primary mr-2"></i>

                                Consultar
                            </Button>
                        </Card.Footer>
                    </Card>
                </Row>
                <Row>
                    <Card>
                        <Modal title={`Deseja realmente excluir a solicitção com CNPJ: ${nomeExclusao}?`}
                               useScrim modalOpened={modalDeletar}
                               onCloseButtonClick={() => setModalAberta(false)}>
                            <Modal.Body>
                                A solicitação será excluída permanentemente.
                            </Modal.Body>
                            <Modal.Footer justify-content='end'>
                                <Button secondary small m={2} onClick={() => setModalAberta(false)}>Cancelar</Button>
                                <Button primary small m={2} onClick={excluir}>Sim</Button>
                            </Modal.Footer>
                        </Modal>
                        <Card.Content>
                            <Table
                                headers={[
                                    { field: 'cnpjentefederativo', label: 'CNPJ' },
                                    { field: 'uf', label: 'UF' },
                                    { field: 'quantidadecestas', label: 'Quantidade de Cestas solicitadas' },
                                    // { field: 'municipio', label: 'Município' },
                                    { field: 'nomerepresentante', label: 'Nome Responsável' },
                                    { field: 'dataavaliacao', label: 'Data Solicitação' },
                                    { field: 'situacaocestas', label: 'Situação' },
                                ]}

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

export default SolicitacaoCestasList;
