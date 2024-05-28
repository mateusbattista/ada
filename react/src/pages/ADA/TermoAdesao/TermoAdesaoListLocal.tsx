import '@govbr-ds/core/dist/components/datetimepicker/datetimepicker.min.css';
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
import axios from 'axios';
import {Form, useLocation, useNavigate} from 'react-router-dom';
import Formulario from '../../Formulario.tsx';


const baseURL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
const url = 'http://api.mds.rn.gov.br/fomento/fetch-estados';
import {BASE_URL} from '../../../global';





const TermoAdesaoListLocal : React.FC = () => {
    const URLGet = BASE_URL+'/api/ada/termoadesao?pageSize=10&pageNumber=0';
    const [currentEndpoint, setCurrentEndpoint] = useState<string>(URLGet);
    const apiDelete = BASE_URL+'/api/ada/termoadesao/delete';


    const [idExclusao, setIdExclusao] = useState({id:''});
    const [statusatualizar, setAtualizar] = useState(true);
    const [estados, setEstados] = useState(null);
    const [municipios, setMunicipios] = useState<any[]>([]);

    const habilitacaoOptions = [
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

    useEffect(() => {
        const municipio = (selectedOption) => {
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
    }, []);

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
        ntermo: '',
        ano: '',
        nomeprefeito: '',
        cpfprefeito: '',
        situacao: '',
        ibge:'',
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
                ntermo  : '',
                ano: '',
                nomeprefeito: '',
                cpfprefeito: '',
                situacao: '',
            });
        setAtualizar(true);
    };



    const search = () => {
        let searchName = '';
        if (dataForm.ntermo != '') {
            searchName  += `&ntermo=${dataForm.ntermo}`;
        }
        if (dataForm.ano != '') {
            searchName  += `&ano=${dataForm.ano}`;
        }
        if (dataForm.nomeprefeito != '') {
            searchName  += `&nomeprefeito=${dataForm.nomeprefeito}`;
        }
        if (dataForm.cpfprefeito != '') {
            searchName  += `&cpfprefeito=${dataForm.cpfprefeito}`;
        }

        const urlEndpoint = `${BASE_URL}/api/ada/termoadesao?pageSize=10${searchName}&pageNumber=0&pageNumber=0`;

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


    //exclusão
    const deleteClick = (e) => {
        const buttonId = e.target.id;
        const dados = e.target.dataset.dados.split(', ').reduce((obj, item) => {
            const [key, value] = item.split(': ');
            obj[key] = value;
            return obj;
        }, {});
        setIdExclusao({ id: buttonId });
        setNomeExclusao(dados.nomeprefeito);
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
                navigate('/ada/termoadesao/view', { state: { itemEditar } });
            }
        };
        handleEnviar();
    }, [itemEditar, navigate]);

    return(

        <Row>

            <Card>
                <Card.Header cardTitle='TERMO ADESÃO' style={{color:'#1351b4'}}></Card.Header>
                <Group>
                    <Row>
                        <Col className='col-sm-12 px-6'>
                            <Input onChange={handleChange} value={dataForm.ntermo} name='ntermo' className='my-3' type='text' label='Número do Termo' />
                            <Input onChange={handleChange} value={dataForm.ano} name='ano' className='my-3' type='text' label='Ano' />
                            <Input onChange={handleChange} value={dataForm.nomeprefeito} name='nomeprefeito' className='my-3' type='text' label='Nome do prefeito' />
                            <Input onChange={handleChange} value={dataForm.cpfprefeito} name='cpfprefeito' className='my-3' type='text' label='CPF do prefeito' />


                            {estados ? (
                                <Select
                                    id='select-simples'
                                    placeholder='Selecione o estado'
                                    label='Estado'
                                    options={estados}
                                    onChange={handleChange}
                                />
                            ) : (
                                <p>Loading estados...</p>
                            )}

                            <Select
                                id="select-municipios"
                                placeholder='Selecione o município'

                                options={municipios.map(municipio =>({
                                    label: `${municipio.no_nome_municipio} - ${municipio.nu_cdibge}`,

                                    value: municipio.nu_cdibge,
                                }))}
                                label='Município'
                            />


                            <Select
                                name = 'situacao'
                                id="situacao"
                                placeholder="Selecione a situação"
                                label="Situação"
                                options={habilitacaoOptions}
                            />
                        </Col>
                    </Row>
                </Group>

                <Breadcrumb/>
                <Card.Footer className='mx-3'>
                    <Button
                        style={{ backgroundColor: '#f8f5f5', color: '#1351b4', }}
                        large
                        className='mr-3'
                        onClick={limpar}
                    >
                        <i className="far fa-arrow-alt-circle-left mr-2" ></i>
                        Limpar
                    </Button>
                    <Button                                    onClick={search}
                                                               primary>
                        <i className="fas fa-search primary mr-2"></i>
                        Buscar
                    </Button>

                </Card.Footer>
                <Divider size='md'style={{backgroundColor :'#1351b4' }}/>
                <Card.Footer className='mx-3'>
                    <Card.Header cardTitle='TERMO ADESÃO' style={{color:'#1351b4'}} ></Card.Header>
                    <Card.Header className='mr-auto'>
                        <div className='d-flex'>
                            <div className='ml-auto'>
                                <a href='/ada/termoadesao/view' className='br-button mr-3 primary'>
                                    <i className="fas fa-plus"></i> incluir
                                </a>
                            </div>
                        </div>
                    </Card.Header>
                    <Modal title={`Deseja realmente excluir o termo do prefeito: ${nomeExclusao}?`}
                           useScrim modalOpened={modalDeletar}
                           onCloseButtonClick={() => setModalAberta(false)}>
                        <Modal.Body>
                            O termo será excluído permanentemente.
                        </Modal.Body>
                        <Modal.Footer justify-content='end'>
                            <Button secondary small m={2} onClick={() => setModalAberta(false)}>Cancelar</Button>
                            <Button primary small m={2} onClick={excluir}>Sim</Button>
                        </Modal.Footer>
                    </Modal>
                    <Card.Content>
                        <Table
                            headers={[
                                { field: 'municipio_solicitante_id', label: 'Município' },
                                { field: 'numero', label: 'Número' },
                                { field: 'ano', label: 'Ano' },
                                { field: 'nomeprefeito', label: 'Nome Prefeito' },
                                { field: 'quantidadecestas', label: 'N° Cestas' },
                                { field: 'datasolicitacao', label: 'Solicitado em' },
                                { field: 'situacao', label: 'Situação' },
                                { field: 'ntermo', label: 'Termo de Adesão' },
                                { field: 'data_publicacao_dou', label: 'Publicação DOU' },
                                { field: 'link_publicacao_dou', label: 'Link DOU' },

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
                </Card.Footer>


            </Card>
        </Row>

    );
};


export default TermoAdesaoListLocal;
