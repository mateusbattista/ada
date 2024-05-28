
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

const FornecedorList: React.FC = () => {
    const URLGet = BASE_URL+'/api/ada/fornecedor?pageSize=10&pageNumber=0';
    const [currentEndpoint, setCurrentEndpoint] = useState<string>(URLGet);
    const apiDelete = BASE_URL+'/api/ada/fornecedor/delete';


    const [idExclusao, setIdExclusao] = useState({id:''});
    const [statusatualizar, setAtualizar] = useState(true);
    const [estados, setEstados] = useState(null);
    const [municipios, setMunicipios] = useState<any[]>([]);

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

    const [modalDeletar, setModalAberta] = useState(false);
    const [nomeExclusao, setNomeExclusao] = useState('');
    const [dados, setDados] = useState(null);

    const [message, setMessage] = useState({
        open: false,
        title: '',
        body: '',
        class: '',
    });

    const [dataForm, setDataForm] = useState({
        cnpj: '',
        razaosocial: '',
        tipo: '',
        ufinstituicao: '',
        situacaofornecedor: '',
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


    const limpar = () => {
        setCurrentEndpoint(URLGet);
        setDataForm(
            {...dataForm,
            cnpj: '',
            razaosocial: '',
            tipo: '',
            ufinstituicao: '',
            situacaofornecedor: '',
            });
        setAtualizar(true);
    };



    const search = () => {
        let searchName = '';
        if (dataForm.cnpj != '') {
            searchName  += `&cnpj=${dataForm.cnpj}`;
        }
        if (dataForm.razaosocial != '') {
            searchName  += `&razaosocial=${dataForm.razaosocial}`;
        }
        if (dataForm.tipo != '') {
            searchName  += `&tipo=${dataForm.tipo}`;
        }
        if (dataForm.ufinstituicao != '') {
            searchName  += `&ufinstituicao=${dataForm.ufinstituicao}`;
        }
        if (dataForm.situacaofornecedor != '') {
            searchName  += `&situacaofornecedor=${dataForm.situacaofornecedor}`;
        }
        const urlEndpoint = `${BASE_URL}/api/ada/fornecedor?pageSize=10${searchName}&pageNumber=0&pageNumber=0`;
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


    const excluirFornecedor = async () => {
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


        //exclusão
    const deleteClick = (e) => {
        const buttonId = e.target.id;
        const dados = e.target.dataset.dados.split(', ').reduce((obj, item) => {
            const [key, value] = item.split(': ');
            obj[key] = value;
            return obj;
        }, {});
        setIdExclusao({ id: buttonId });
        setNomeExclusao(dados.razaosocial);
    };


    useEffect(() => {
        if (idExclusao.id !== '') {
            setModalAberta(true);
        }
    }, [idExclusao]);


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
                navigate('/ada/fornecedor/createEdit', { state: { itemEditar } });
            }
        };
        handleEnviar();
    }, [itemEditar, navigate]);






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
                        <Card.Header cardTitle='CADASTRO DE FORNECEDORES' style={{ color: '#1351B4' }}/>
                        <Card.Content>
                            <Group >
                                <Row >
                                    <Col className='col-sm-12 px-6'>
                                        <Input onChange={handleChange} value={dataForm.cnpj} name='cnpj' className='my-3' type='text' label='CNPJ'  />
                                        <Input onChange={handleChange} value={dataForm.razaosocial} name='razaosocial' className='my-3' type='text' label='Razão Social'  />
                                        <Input onChange={handleChange} value={dataForm.tipo} name='tipo' className='my-3' type='text' label='Tipo de Entidade'  />
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
                                        <Select

                                            id="select-municipios"
                                            placeholder='Selecione o município'
                                            label="Município"
                                            options={municipios.map((municipio) => ({
                                                label: `${municipio.no_nome_municipio} - ${municipio.nu_cdibge}`, // Assuming 'nome' is the property for municipality name
                                                value: municipio.nu_cdibge, // Assuming 'id' is the unique identifier
                                            }))}
                                            // ... other props
                                        />
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
                                    <a href='/ada/fornecedor/createEdit' className='br-button mr-3 primary'>
                                        <i className="fas fa-plus"></i> Incluir
                                    </a>
                                </div>
                            </div>
                        </Card.Header>
                        <Modal title={`Deseja realmente excluir o Fornecedor de CNPJ: ${nomeExclusao}?`}
                               useScrim modalOpened={modalDeletar}
                               onCloseButtonClick={() => setModalAberta(false)}>
                            <Modal.Body>
                                O Fornecedor será excluído permanentemente.
                            </Modal.Body>
                            <Modal.Footer justify-content='end'>
                                <Button secondary small m={2} onClick={() => setModalAberta(false)}>Cancelar</Button>
                                <Button primary small m={2} onClick={excluirFornecedor}>Sim</Button>
                            </Modal.Footer>
                        </Modal>
                        <Card.Content>
                            <Table
                                headers={[
                                    { field: 'cnpjinstituicao', label: 'CNPJ' },
                                    { field: 'ufinstituicao', label: 'UF' },
                                    { field: 'nomefantasia', label: 'Nome Fantasia' },
                                    { field: 'razaosocial', label: 'Razão Social' },
                                    { field: 'dataconst', label: 'Data Solicitação' },
                                    { field: 'situacaofornecedor', label: 'Situação' },
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

export default FornecedorList;
