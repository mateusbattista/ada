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

const SolicitacaoList: React.FC = () => {
    const URLGet = BASE_URL+'/api/ada/solicitacao?pageSize=10&pageNumber=0';
    const [currentEndpoint, setCurrentEndpoint] = useState<string>(URLGet);
    const apiDelete = BASE_URL+'/api/ada/solicitacao/delete';

    const [modalDeletar, setModalAberta] = useState(false);
    const [idExclusao, setIdExclusao] = useState({id:''});
    const [nomeExclusao, setNomeExclusao] = useState('');
    const [statusatualizar, setAtualizar] = useState(true);
    const [estados, setEstados] = useState(null);
    const [municipios, setMunicipios] = useState([]);

    const [message, setMessage] = useState({
        open: false,
        title: '',
        body: '',
        class: '',
    });

    const [dataForm, setDataForm] = useState({
        name: '',
        cpfsolicitante: '',
        nomeprefeito: '',
        cpfprefeito: '',
        ibge: '',
        situacao: '',
    });

    const fetchEstados = async () => {
        const response = await fetch(baseURL);
        return await response.json();
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
        setCurrentEndpoint(URLGet);
        setDataForm({ ...dataForm,
            name: '',
            cpfsolicitante: '',
            nomeprefeito: '',
            cpfprefeito: '',
            ibge: '',
            situacao: '',
        });
        setAtualizar(true);
    };



    const search = () => {
        let searchName = '';
        if (dataForm.name != '') {
            searchName += `&name=${dataForm.name}`;
        }
        if (dataForm.cpfsolicitante != '') {
            searchName += `&cpfsolicitante=${dataForm.cpfsolicitante}`;
        }
        if (dataForm.nomeprefeito != '') {
            searchName += `&nomeprefeito=${dataForm.nomeprefeito}`;
        }
        if (dataForm.cpfprefeito != '') {
            searchName += `&cpfprefeito=${dataForm.cpfprefeito}`;
        }
        if (dataForm.ibge != '') {
            searchName += `&ibge=${dataForm.ibge}`;
        }
        if (dataForm.situacao != '') {
            searchName += `&situacao=${dataForm.situacao}`;
        }

        const urlEndpoint = `${BASE_URL}/api/ada/solicitacao?pageSize=10${searchName}&pageNumber=0&pageNumber=0`;

        try {

            setCurrentEndpoint(urlEndpoint);
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



    const excluirSolicitacao = async () => {
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
                navigate('/ada/solicitacao/createEdit', { state: { itemEditar } });
            }
        };
        handleEnviar();
    }, [itemEditar, navigate]);

    const situacaoOptions = [
        {
            label: 'Solicitado',
            value: 'SOLICITADO',
        },
        {
            label: 'Aceito (Aguardando Assinatura SEI)',
            value: 'ACEITO (AGUARDANDO ASSINATURA SEI)',
        },
        {
            label: 'Aceito (Aguardando Publicação no D.O.U)',
            value: 'ACEITO (AGUARDANDO PUBLICACAO NO D.O.U)',
        },
        {
            label: 'Aderido',
            value: 'ADERIDO',
        },
        {
            label: 'Negado',
            value: 'NEGADO',
        },
    ];


    //exclusão
    //exclusão
    const deleteClick = (e) => {
        const buttonId = e.target.id;
        const dados = e.target.dataset.dados.split(', ').reduce((obj, item) => {
            const [key, value] = item.split(': ');
            obj[key] = value;
            return obj;
        }, {});
        setIdExclusao({ id: buttonId });
        setNomeExclusao(dados.cpfsolicitante);
    };


    useEffect(() => {
        if (idExclusao.id !== '') {
            setModalAberta(true);
        }
    }, [idExclusao]);



    // usando a api dos estados
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
    // usando a api dos municipios
    const handleChangeEstados = (selectedOption) => {
        setMunicipios([]);
        const url = `http://api.mds.rn.gov.br/fomento/fetch-municipios/${selectedOption}`;
        const urlEndpoint = `http://api.mds.rn.gov.br/api/ada/solicitacao?pageSize=5&estado=${selectedOption}&pageNumber=0`;

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
                        <Card.Header cardTitle='SOLICITAÇÃO DE ADESÃO AO ADA' style={{color: '#1351b4'}}/>
                        <Card.Content>
                            <Group >
                                <Row >
                                    <Col className='col-sm-12 px-6'>
                                        <Input onChange={handleChange} value={dataForm.name} name='name' className='my-3' type='text' label='Nome Solicitante'  placeholder='Nome Solicitante'/>
                                        <Input onChange={handleChange} value={dataForm.cpfsolicitante} name='cpfsolicitante' className='my-3' type='text' label='CPF do Solicitante' placeholder='CPF do Solicitante'  />
                                        <Input onChange={handleChange} value={dataForm.nomeprefeito} name='nomeprefeito' className='my-3' type='text' label='Nome Prefeito' placeholder='Nome Prefeito'  />
                                        <Input onChange={handleChange} value={dataForm.cpfprefeito} name='cpfprefeito' className='my-3' type='text' label='CPF Prefeito' placeholder='CPF Prefeito'  />
                                        <Input onChange={handleChange} value={dataForm.ibge} name='ibge' className='my-3' type='text' label='IBGE' placeholder='IBGE'  />
                                        {estados ? ( <Select id="select-estado" placeholder="Selecione o estado" label="Estado" options={estados} onChange={handleChangeEstados} /> ) : ( <p>Loading estados...</p> )}
                                        <Select  id="select-municipios" label='Município(UF)' placeholder='Selecione o município' options={municipios.map((municipio) => ({label: `${municipio.no_nome_municipio} - ${municipio.nu_cdibge}`, value: municipio.nu_cdibge, }))} />
                                        <Input onChange={handleChange} value={dataForm.situacao} name='situacao' className='my-3' type='text' label='Situação' placeholder='Situação'  />
                                        <Select id="situacao" className='my-3' options={situacaoOptions} label='Aceito?' placeholder='A solicitação foi aceita?'  />
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
                                    <a href='/ada/solicitacao/createEdit' className='br-button mr-3 primary'>
                                        <i className="fas fa-plus"></i> Incluir
                                    </a>
                                </div>
                            </div>
                        </Card.Header>
                        <Modal title={`Deseja realmente excluir a solicitação de feita pelo CPF: ${nomeExclusao}?`}
                               useScrim modalOpened={modalDeletar}
                               onCloseButtonClick={() => setModalAberta(false)}>
                            <Modal.Body>
                                A solicitação será excluído permanentemente.
                            </Modal.Body>
                            <Modal.Footer justify-content='end'>
                                <Button secondary small m={2} onClick={() => setModalAberta(false)}>Cancelar</Button>
                                <Button primary small m={2} onClick={excluirSolicitacao}>Sim</Button>
                            </Modal.Footer>
                        </Modal>
                        <Card.Content>
                            <Table
                                title="Solicitações"
                                headers={[
                                    { field: 'ibge', label: 'IBGE' },
                                    { field: 'sigla', label: 'UF' },
                                    { field: 'municipios', label: 'Município' },
                                    { field: 'cpfsolicitante', label: 'CPF(Solicitante)' },
                                    { field: 'name', label: 'Nome(Solicitante)' },
                                    { field: 'quantidadecestas', label: 'Nº Cestas' },
                                    { field: 'funcao', label: 'Função' },
                                    { field: 'data_publicacao_dou', label: 'Solicitado em' },
                                ]}

                                buttons={[
                                    { type: 'button', onClick: editClick, classeNome: 'br-button circle', icon: { classeNome: 'fas fa-pencil-alt'} },
                                    { type: 'button', onClick: deleteClick, classeNome: 'br-button circle', icon: { classeNome: 'fas fa-trash-alt'} },
                                ]}
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

export default SolicitacaoList;
