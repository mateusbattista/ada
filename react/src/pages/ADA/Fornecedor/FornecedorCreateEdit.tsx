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
    Tab
} from '../../../components/index.ts';
import { Header, Avatar, Menu, Table } from '../../../components/index.ts';
const imageSample = '';
import { useLocation, useNavigate  } from 'react-router-dom';
import axios from 'axios';


import InputCnpj from '../../../components/Input/InpuCnpj';
import InputCep from '../../../components/Input/InpuCep';
import InputTel from '../../../components/Input/InputTel';
import {validCNPJ} from  '../../../functions/valid.cnpj';
import {TestaCPF} from  '../../../functions/valid.cpf';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import {BASE_URL} from '../../../global';
import SelectoOptionID from '../../../components/Select/SelectoOptionID';


const url = 'http://api.mds.rn.gov.br/fomento/fetch-estados';


const ForncedorCreateEdit: React.FC = () => {

    const urlCreate= BASE_URL+'/api/ada/fornecedor/create';
    const urlUpdate= BASE_URL+'/api/ada/fornecedor/update';


    interface FormInterface {
        cnpjinstituicao: string;
        razaosocial: string;
        cepinstituicao: string;
        enderecoinstituicao: string;
        telefoneinstituicao: string;
        emailinstituicao: string;
        cargoresponsavel: string;
        nomeresponsavel: string;
        emailresponsavel: string;
        telefoneresponsavel: string;
        situacaofornecedor: string;
        justificativa: string;
        notatecnica: string;
        tipo: string;
        nomefantasia: string;
        sigla: string;
        inscricaoestadual: string;
        dataconst: string;
        siteinstituicao: string;
        arquivonome: string;
    }
    const { register,setValue, handleSubmit, formState: { errors }, } = useForm<FormInterface>();


    const [msg, setmsg] = useState({
        open: false,
        title: '',
        body: '',
        class: '',
    });

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

    const [estados, setEstados] = useState(null);
    const [municipios, setMunicipios] = useState<any[]>([]);


    useEffect(() => {
        axios.get(url)
            .then(response => {
                const data = response.data;
                // Access and use the data from response.data, e.g.:
                setEstados(data.map((estado) => ({
                    label: estado.estado, // Assuming 'nome' is the property for name
                    value: estado.sigla, // Assuming 'id' is the unique identifier
                    id: estado.pk_estado, // Assuming 'id' is the unique identifier
                })));

            })
            .catch(error => {
                console.error(error); // Handle any errors during the request
            });
    }, []);

    const municipio = (selectedOption) => {
        setMunicipios([]);
        const url = `http://api.mds.rn.gov.br/fomento/fetch-municipios/${selectedOption}`;
        const urlEndpoint = `http://api.mds.rn.gov.br/fomento/entidades-gestoras?pageSize=5&estado=${selectedOption}&pageNumber=0`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('API response:', data);
                console.log(selectedOption);
                setMunicipios(data.map((municipio) => ({
                    label:`${municipio.no_nome_municipio} - ${municipio.nu_cdibge}`, // Assuming 'nome' is the property for name
                    value: municipio.pk_municipio, // Assuming 'id' is the unique identifier
                    id: municipio.pk_municipio, // Assuming 'id' is the unique identifier
                })));
            })
            .catch(error => {
                console.error('Error making API request:', error);
            });
    };



    //essas duas linhas tentam ver se veio algum id da pagina anterior para selecionar o objeto que deve ser editado
    const location = useLocation();
    const item_editar = location.state?.itemEditar?.id || null;
    const [dataid, setData] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/ada/fornecedor/form/${item_editar}`);
                setValue('cnpjinstituicao', response.data.message.dados.cnpjinstituicao);
                setValue('razaosocial', response.data.message.dados.razaosocial);
                setValue('cepinstituicao', response.data.message.dados.cepinstituicao);
                setValue('enderecoinstituicao', response.data.message.dados.enderecoinstituicao);
                setValue('telefoneinstituicao', response.data.message.dados.telefoneinstituicao);
                setValue('emailinstituicao', response.data.message.dados.emailinstituicao);
                setValue('cargoresponsavel', response.data.message.dados.cargoresponsavel);
                setValue('nomeresponsavel', response.data.message.dados.nomeresponsavel);
                setValue('emailresponsavel', response.data.message.dados.emailresponsavel);
                setValue('telefoneresponsavel', response.data.message.dados.telefoneresponsavel);
                setValue('situacaofornecedor', response.data.message.dados.situacaofornecedor);
                setValue('justificativa', response.data.message.dados.justificativa);
                setValue('notatecnica', response.data.message.dados.notatecnica);
                setValue('tipo', response.data.message.dados.tipo);
                setValue('nomefantasia', response.data.message.dados.nomefantasia);
                setValue('sigla', response.data.message.dados.sigla);
                setValue('inscricaoestadual', response.data.message.dados.inscricaoestadual);
                setValue('dataconst', response.data.message.dados.dataconst);
                setValue('siteinstituicao', response.data.message.dados.siteinstituicao);
                setValue('arquivonome', response.data.message.dados.arquivonome);

                setData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do evento:', error);
            }
        };

        if (item_editar) {
            fetchData();
        }
    }, [item_editar]);


    const navigate = useNavigate();
    const voltarPagina = () => {
        navigate('/ada/fornecedor');
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValue(name, value);
    };

    const prevMessage = useRef(message);

    useEffect(() => {
        if (prevMessage.current !== message) {
            navigate('/ada/fornecedor/', { state: { message } });
        }
    }, [message]);


    const enviarParaLaravel = async (data: FormInterface) => {
        try {
            let result = null;
            if(dataid){
                result = await axios.put(`${urlUpdate}/${dataid.message.dados.id}`, data);
            }else{
                result = await axios.post(urlCreate, data);
            }
            setMessage({
                open: true,
                title: result.data.message.title,
                body: result.data.message.body,
                class: result.data.message.class,
            });
        } catch (error) {
            console.error('Erro ao enviar dados para o Laravel:', error);
        }
    };

    return (
        <>
            <form onSubmit = { handleSubmit(enviarParaLaravel) } >
                <Container fluid>
                <Row>
                    <Card>
                        <Card.Header cardTitle='CADASTRO DE FORNECEDORES'  style={{ color: '#5992ED' }} className='mb-2'/>
                        <Card.Content className='mr-3 '>
                            <Tab
                                initial={1}
                                current={1}
                                className='mb-3'
                            >
                                <Tab.Content title='Dados da Instituição' active >
                                    <Group>
                                        <Row>
                                            <Col sm={12} className='my-12'>
                                                <InputCnpj
                                                    className='my-3'
                                                    name='cnpjinstituicao'
                                                    type='text'
                                                    label='CNPJ'
                                                    {...register('cnpjinstituicao', {
                                                        required: 'Campo CNPJ é obrigatório',
                                                        validate: {
                                                            validCNPJ: (value) => validCNPJ(value) || 'CNPJ inválido',
                                                        },
                                                    })}
                                                    onChange={handleChange}
                                                />
                                                {errors.cnpjinstituicao && (
                                                    <Message category='feedback' messageTitle= 'ERRO:' type='danger' icon="fas fa-check-circle"
                                                             onCloseButtonClick={() => setmsg(prevData => ({...prevData, open: false}))}>
                                                        <ErrorMessage errors = { errors } name="cnpjinstituicao" ></ErrorMessage>
                                                    </Message>
                                                )}

                                                <Input
                                                    className='my-3'
                                                    name='razaosocial'
                                                    type='text'
                                                    label='Razão social'
                                                    {...register('razaosocial', {
                                                        required: 'Campo Razão Social é obrigatório',
                                                    })}
                                                    onChange={handleChange}
                                                />
                                                {errors.razaosocial && (
                                                    <Message category='feedback' messageTitle= 'ERRO:' type='danger' icon="fas fa-check-circle"
                                                             onCloseButtonClick={() => setmsg(prevData => ({...prevData, open: false}))}>
                                                        <ErrorMessage errors = { errors } name="razaosocial" ></ErrorMessage>
                                                    </Message>
                                                )}

                                              {estados ? (<SelectoOptionID
                                                    label={'Estado'}
                                                    {...register('fk_estado_fornecedor')}
                                                    onChange={(obj) => {
                                                        municipio(obj.value);
                                                        setValue('fk_estado_fornecedor', obj.id);
                                                    }}
                                                    options={estados}
                                                />
                                            ) : (
                                                <p>Loading estados...</p>
                                            )}

                                                <SelectoOptionID
                                                    placeholder='Selecione o município'
                                                    label="Município"
                                                    {...register('fk_municipio_fornecedor')}
                                                    onChange={(obj) => {
                                                        setValue('fk_municipio_fornecedor', obj.id);
                                                    }}
                                                    options={municipios}
                                                    // ... other props
                                                />

                                                <InputCep
                                                    className='my-3'
                                                    name='cepinstituicao'
                                                    type='text'
                                                    label='CEP'
                                                    {...register('cepinstituicao', { required: 'Campo CEP é obrigatório' })}
                                                    onChange={handleChange}
                                                />
                                                {errors.cepinstituicao && (
                                                    <Message
                                                        category='feedback'
                                                        messageTitle='ERRO:'
                                                        type='danger'
                                                        icon="fas fa-check-circle"
                                                        onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                    >
                                                        <ErrorMessage errors={errors} name="cepinstituicao"></ErrorMessage>
                                                    </Message>
                                                )}

                                                <Input
                                                    className='my-3'
                                                    name='enderecoinstituicao'
                                                    type='text'
                                                    label='Endereço'
                                                    {...register('enderecoinstituicao', { required: 'Campo Endereço é obrigatório' })}
                                                    onChange={handleChange}
                                                />
                                                {errors.enderecoinstituicao && (
                                                    <Message
                                                        category='feedback'
                                                        messageTitle='ERRO:'
                                                        type='danger'
                                                        icon="fas fa-check-circle"
                                                        onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                    >
                                                        <ErrorMessage errors={errors} name="enderecoinstituicao"></ErrorMessage>
                                                    </Message>
                                                )}

                                                <InputTel
                                                    className='my-3'
                                                    name='telefoneinstituicao'
                                                    type='text'
                                                    label='Telefone'
                                                    {...register('telefoneinstituicao', { required: 'Campo Telefone é obrigatório' })}
                                                    onChange={handleChange}
                                                />
                                                {errors.telefoneinstituicao && (
                                                    <Message
                                                        category='feedback'
                                                        messageTitle='ERRO:'
                                                        type='danger'
                                                        icon="fas fa-check-circle"
                                                        onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                    >
                                                        <ErrorMessage errors={errors} name="telefoneinstituicao"></ErrorMessage>
                                                    </Message>
                                                )}

                                                <Input
                                                    className='my-3'
                                                    name='emailinstituicao'
                                                    type='text'
                                                    label='E-mail'
                                                    {...register('emailinstituicao', { required: 'Campo E-mail é obrigatório' })}
                                                    onChange={handleChange}
                                                />
                                                {errors.emailinstituicao && (
                                                    <Message
                                                        category='feedback'
                                                        messageTitle='ERRO:'
                                                        type='danger'
                                                        icon="fas fa-check-circle"
                                                        onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                    >
                                                        <ErrorMessage errors={errors} name="emailinstituicao"></ErrorMessage>
                                                    </Message>
                                                )}

                                                <Input
                                                    className='my-3'
                                                    name='cargoresponsavel'
                                                    type='text'
                                                    label='Cargo'
                                                    {...register('cargoresponsavel', { required: 'Campo Cargo é obrigatório' })}
                                                    onChange={handleChange}
                                                />
                                                {errors.cargoresponsavel && (
                                                    <Message
                                                        category='feedback'
                                                        messageTitle='ERRO:'
                                                        type='danger'
                                                        icon="fas fa-check-circle"
                                                        onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                    >
                                                        <ErrorMessage errors={errors} name="cargoresponsavel"></ErrorMessage>
                                                    </Message>
                                                )}


                                        <div className="header-subtitle"><strong style={{ color: '#1351B4' }}>Dados do Preposto </strong></div>
                                        <Divider size="sm" my={2}/>

                                                <Input
                                                    className='my-3'
                                                    name='nomeresponsavel'
                                                    type='text'
                                                    label='Nome'
                                                    {...register('nomeresponsavel', { required: 'Campo Nome é obrigatório' })}
                                                    onChange={handleChange}
                                                />
                                                {errors.nomeresponsavel && (
                                                    <Message
                                                        category='feedback'
                                                        messageTitle='ERRO:'
                                                        type='danger'
                                                        icon="fas fa-check-circle"
                                                        onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                    >
                                                        <ErrorMessage errors={errors} name="nomeresponsavel"></ErrorMessage>
                                                    </Message>
                                                )}

                                                <Input
                                                    className='my-3'
                                                    name='emailresponsavel'
                                                    type='text'
                                                    label='E-mail'
                                                    {...register('emailresponsavel', { required: 'Campo E-mail é obrigatório' })}
                                                    onChange={handleChange}
                                                />
                                                {errors.emailresponsavel && (
                                                    <Message
                                                        category='feedback'
                                                        messageTitle='ERRO:'
                                                        type='danger'
                                                        icon="fas fa-check-circle"
                                                        onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                    >
                                                        <ErrorMessage errors={errors} name="emailresponsavel"></ErrorMessage>
                                                    </Message>
                                                )}

                                                <InputTel
                                                    className='my-3'
                                                    name='telefoneresponsavel'
                                                    type='text'
                                                    label='Telefone'
                                                    {...register('telefoneresponsavel', { required: 'Campo Telefone é obrigatório' })}
                                                    onChange={handleChange}
                                                />
                                                {errors.telefoneresponsavel && (
                                                    <Message
                                                        category='feedback'
                                                        messageTitle='ERRO:'
                                                        type='danger'
                                                        icon="fas fa-check-circle"
                                                        onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                    >
                                                        <ErrorMessage errors={errors} name="telefoneresponsavel"></ErrorMessage>
                                                    </Message>
                                                )}

                                        <div className="header-subtitle"><strong style={{ color: '#1351B4' }}>Situação/Avaliação </strong></div>
                                        <Divider size="sm" my={3}/>
                                                <div className="p-3xh " style={{backgroundColor: '#C5D4EB'}}>

                                                    <Select
                                                        id="situacao"
                                                        placeholder="Selecione a situação"
                                                        label="Situação"
                                                        options={habilitacaoOptions}
                                                    />

                                                    <Textarea
                                                        density="large"
                                                        onChange={handleChange}
                                                        label="Justificativa" />

                                                    <Upload multiple label="Notas Técnicas" uploadTimeout={() => {
                                                        return new Promise((resolve) => {
                                                            return setTimeout(resolve, 300);
                                                        });
                                                    }}/>
                                                    <p className="text-base mt-1">Clique ou arraste os arquivos para
                                                        cima do
                                                        componente
                                                        Upload.</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Group>

                                </Tab.Content>
                                <Tab.Content title='Informações Complementares' >
                                    <Group>
                                        <Row>
                                            <Col sm={12} className='mb-12'>
                                                <Input
                                                    className='my-3'
                                                    name='tipo'
                                                    type='text'
                                                    label='Tipo de Entidade:'
                                                    onChange={handleChange}
                                                />

                                                <Input
                                                    className='my-3'
                                                    name='nomefantasia'
                                                    type='text'
                                                    label='Nome Fantasia:'
                                                    onChange={handleChange}
                                                />

                                                <Input
                                                    className='my-3'
                                                    name='sigla'
                                                    type='text'
                                                    label='SIGLA'
                                                    onChange={handleChange}
                                                />

                                                <Input
                                                    className='my-3'
                                                    name='inscricaoestadual'
                                                    type='text'
                                                    label='Nº da Inscrição Estadual:'
                                                    onChange={handleChange}
                                                />


                                                <Input
                                                    className='my-3'
                                                    name='dataconst'
                                                    type='date'
                                                    label='Data de Constituição'
                                                    onChange={handleChange}
                                                />

                                                <Input
                                                    className='my-3'
                                                    name='siteinstituicao'
                                                    type='text'
                                                    label='Site'
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Row>
                                    </Group>
                                </Tab.Content>
                                <Tab.Content title='Arquivos Combrobatórios' >
                                    <Group>
                                        <Row>
                                            <Col sm={12} className='my-6'>
                                                <Upload multiple label="Termos" uploadTimeout={() => {
                                                    return new Promise((resolve) => {
                                                        return setTimeout(resolve, 300);
                                                    });
                                                }} />
                                                <p className="text-base mt-1">Clique ou arraste os arquivos para
                                                    cima do
                                                    componente
                                                    Upload.</p>
                                            </Col>
                                        </Row>
                                    </Group>
                                </Tab.Content>
                            </Tab>
                        </Card.Content>
                        <Card.Footer className='mx-3'>
                            <Button
                                primary
                                className='mr-3'
                                onClick={enviarParaLaravel}
                            >
                                <i className="fas fa-save "></i>
                                Salvar
                            </Button>
                            <Button primary
                                    onClick={voltarPagina}
                                    style={{ backgroundColor: '#f8f5f5', color: '#1351b4', }}>
                                <i className=""></i>
                                Cancelar
                            </Button>
                        </Card.Footer>
                    </Card>
                </Row>
            </Container >
            </form>
        </>
    );
};

export default ForncedorCreateEdit;
