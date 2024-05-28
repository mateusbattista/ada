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
import InputCpf from '../../../components/Input/InputCpf';
import {validCNPJ} from  '../../../functions/valid.cnpj';
import {TestaCPF} from  '../../../functions/valid.cpf';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import {BASE_URL} from '../../../global';

const baseURL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
const url = 'http://api.mds.rn.gov.br/fomento/fetch-estados';

const SolicitacaoCreate: React.FC = () => {
    const urlCreate= BASE_URL+'/api/ada/solicitacao/create';
    const urlEvento= BASE_URL+'/api/ada/eventos';
    const urlPublico= BASE_URL+'/api/ada/publicos';
    const urlPortaria= BASE_URL+'/api/ada/portaria';

    const [eventos, setEventos] = useState(null);
    const [publicos, setPublicos] = useState(null);
    const [portarias, setPortarias] = useState(null);


    const [checkboxMarcado, setCheckboxMarcado] = useState(false);

    const handleCheckboxChange = () => {
        // Altera o estado do checkbox para o oposto do valor atual
        setCheckboxMarcado(!checkboxMarcado);
    };

    const [msg, setmsg] = useState({
        open: false,
        title: '',
        body: '',
        class: '',
    });

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


                })
                .catch(error => {
                    console.error('Error making API request:', error);
                });
        };
    }, []);





    interface FormInterface {
        name: string;
        funcao_gestor: string;
        cpfsolicitante: string;
        emailsolicitante: string;
        telefone1solicitante: string;
        cepsolicitante: string;
        enderecosolicitante: string;
        numerosolicitante: string;
        complementosolicitante: string;
        bairrosolicitante: string;
        cnpjprefeitura: string;
        emailprefeitura: string;
        cepprefeitura: string;
        enderecoprefeitura: string;
        numeroprefeitura: string;
        complementoprefeitura: string;
        bairroprefeitura: string;
        nomeprefeito: string;
        telefoneprefeito: string;
        cpfprefeito: string;
        rgprefeito: string;
        orgaorgprefeito: string;
        ufrgprefeito: string;
        emailprefeito: string;
        quantidadecestas: string;
        nomelocalarmazenamento: string;
        ceparmazenamento: string;
        enderecoarmazenamento: string;
        numeroarmazenamento: string;
        complementoarmazenamento: string;
        bairroarmazenamento: string;
        nomelocalcontrolesocial: string;
        cepcontrolesocial: string;
        enderecocontrolesocial: string;
        numerocontrolesocial: string;
        complementocontrolesocial: string;
        bairrocontrolesocial: string;
        telefone1controlesocial: string;
        telefone2controlesocial: string;
        emailcontrolesocial: string;
        dirigentecontrolesocial: string;
        arquivo: string;
        situacao: string;
        observacao: string;
    }


    const { register,setValue, handleSubmit, formState: { errors }, } = useForm<FormInterface>();



    // usando a api dos eventos
    useEffect(() => {
        axios.get(urlEvento)
                .then(response => {
                    const { records} = response.data;

                    setEventos(records.map((evento) => ({
                        label: evento.nometipoevento, // Assuming 'nometipoevento' is the property for name
                        value: evento.nometipoevento, // Use 'id' if available, otherwise fallback to 'nometipoevento'
                    })));
                })
                .catch(error => {
                    console.error(error); // Handle any errors during the request
                });

        axios.get(urlPublico)
            .then(response => {
                const { records = [] } = response.data;

                setPublicos(records.map((publico) => ({
                    label: publico.nometipopublico, // Assuming 'nometipoevento' is the property for name
                    value: publico.nometipopublico, // Use 'id' if available, otherwise fallback to 'nometipoevento'
                })));
            })
            .catch(error => {
                console.error(error); // Handle any errors during the request
            });


        axios.get(urlPortaria)
            .then(response => {
                const { records = [] } = response.data;

                setPortarias(records.map((portaria) => ({
                    label: portaria.nome_portarias, // Assuming 'nometipoevento' is the property for name
                    value:  portaria.nome_portarias, // Use 'id' if available, otherwise fallback to 'nometipoevento'
                })));
            })
            .catch(error => {
                console.error(error); // Handle any errors during the request
            });
        }, []);




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValue(name, value);
    };


    const enviarParaLaravel = async (data: FormInterface) => {
        try {
            let result = null;

                result = await axios.post(urlCreate, data);

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
                    <Card.Header cardTitle='Aderir a Ação de Distribuição de Alimentos (ADA) nas localidades em situação de emergência ou estado de calamidade pública' style={{color: '#1351b4'}}>
                    </Card.Header>
                    <Card.Content>
                        <Group >
                            <Row >
                                <br/>
                                <Col className='col-sm-12 px-6'>
                                    <br></br>
                                    <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Dados do Solicitante da Ação de Distribuição de Cestas Emergenciais</strong></div>
                                    <span className="br-divider sm my-3"></span>
                                    <Input name='name' type='text' label='Nome Completo' {...register('name', { required: 'Campo Nome Completo é obrigatório' })} placeholder='Nome Completo' onChange={handleChange} />
                                    {errors.name && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="name"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='funcao_gestor' type='text' label='Função*' {...register('funcao_gestor', { required: 'Campo Função* é obrigatório' })} placeholder='Função' onChange={handleChange} />
                                    {errors.funcao_gestor && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="funcao_gestor"></ErrorMessage>
                                        </Message>
                                    )}

                                    <InputCpf placeholder='CPF' label='CPF' name='cpfsolicitante' {...register('cpfsolicitante', { required: 'Campo CPF é obrigatório', validate: { TestaCPF: (value) => TestaCPF(value) || 'CPF inválido' } })} onChange={handleChange} />
                                    {errors.cpfsolicitante && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="cpfsolicitante"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='emailsolicitante' type='text' label='E-mail' {...register('emailsolicitante', { required: 'Campo E-mail é obrigatório' })} placeholder='E-mail' onChange={handleChange} />
                                    {errors.emailsolicitante && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="emailsolicitante"></ErrorMessage>
                                        </Message>
                                    )}

                                    <InputTel className='my-3' name='telefone1solicitante' type='text' label='Telefone' {...register('telefone1solicitante', { required: 'Campo Telefone é obrigatório' })} placeholder='Telefone' onChange={handleChange} />
                                    {errors.telefone1solicitante && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="telefone1solicitante"></ErrorMessage>
                                        </Message>
                                    )}


                                    <InputCep name='cepsolicitante' label='CEP' {...register('cepsolicitante', { required: 'Campo CEP é obrigatório' })} placeholder='CEP' onChange={handleChange} />
                                    {errors.cepsolicitante && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="cepsolicitante"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='enderecosolicitante' type='text' label='Endereço' {...register('enderecosolicitante', { required: 'Campo Endereço é obrigatório' })} placeholder='Endereço' onChange={handleChange} />
                                    {errors.enderecosolicitante && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="enderecosolicitante"></ErrorMessage>
                                        </Message>
                                    )}


                                    <Input className='my-3' name='numerosolicitante' type='text' label='Número' {...register('numerosolicitante', { required: 'Campo Número é obrigatório' })} placeholder='Número' onChange={handleChange} />
                                    {errors.numerosolicitante && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="numerosolicitante"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='complementosolicitante' type='text' label='Complemento' {...register('complementosolicitante', { required: 'Campo Complemento é obrigatório' })} placeholder='Complemento' onChange={handleChange} />
                                    {errors.complementosolicitante && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="complementosolicitante"></ErrorMessage>
                                        </Message>
                                    )}


                                    <Input className='my-3' name='bairrosolicitante' type='text' label='Bairro' {...register('bairrosolicitante', { required: 'Campo Bairro é obrigatório' })} placeholder='Bairro' onChange={handleChange} />
                                    {errors.bairrosolicitante && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="bairrosolicitante"></ErrorMessage>
                                        </Message>
                                    )}



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




                                    <InputCnpj name='cnpjprefeitura' label='CNPJ' {...register('cnpjprefeitura', { required: 'Campo CNPJ é obrigatório', validate: { validCNPJ: (value) => validCNPJ(value) || 'CNPJ inválido' } })} placeholder='CNPJ' onChange={handleChange} />
                                    {errors.cnpjprefeitura && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="cnpjprefeitura"></ErrorMessage>
                                        </Message>
                                    )}
                                </Col>
                                <br/>
                                <Col className='col-sm-12 px-6'>
                                    <br></br>
                                    <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Informações Gerais do Ente Federativo</strong></div>
                                    <span className="br-divider sm my-3"></span>

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

                                    <InputCnpj name='cnpjprefeitura' label='CNPJ da Prefeitura' {...register('cnpjprefeitura', { required: 'Campo CNPJ da Prefeitura é obrigatório', validate: { validCNPJ: (value) => validCNPJ(value) || 'CNPJ inválido' } })} placeholder='CNPJ da Prefeitura' onChange={handleChange} />
                                    {errors.cnpjprefeitura && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="cnpjprefeitura"></ErrorMessage>
                                        </Message>
                                    )}


                                    <InputCep name='cepprefeitura' label='CEP' {...register('cepprefeitura', { required: 'Campo CEP é obrigatório' })} placeholder='CEP' onChange={handleChange} />
                                    {errors.cepprefeitura && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="cepprefeitura"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='enderecoprefeitura' type='text' label='Endereço' {...register('enderecoprefeitura', { required: 'Campo Endereço é obrigatório' })} placeholder='Endereço' onChange={handleChange} />
                                    {errors.enderecoprefeitura && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="enderecoprefeitura"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='numeroprefeitura' type='text' label='Número' {...register('numeroprefeitura', { required: 'Campo Número é obrigatório' })} placeholder='Número' onChange={handleChange} />
                                    {errors.numeroprefeitura && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="numeroprefeitura"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='complementoprefeitura' type='text' label='Complemento' {...register('complementoprefeitura', { required: 'Campo Complemento é obrigatório' })} placeholder='Complemento' onChange={handleChange} />
                                    {errors.complementoprefeitura && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="complementoprefeitura"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='bairroprefeitura' type='text' label='Bairro' {...register('bairroprefeitura', { required: 'Campo Bairro é obrigatório' })} placeholder='Bairro' onChange={handleChange} />
                                    {errors.bairroprefeitura && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="bairroprefeitura"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='emailprefeitura' type='text' label='E-mail' {...register('emailprefeitura', { required: 'Campo E-mail é obrigatório' })} placeholder='E-mail' onChange={handleChange} />
                                    {errors.emailprefeitura && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="emailprefeitura"></ErrorMessage>
                                        </Message>
                                    )}

                                </Col>
                                <br/>
                                <Col className='col-sm-12 px-6'>
                                    <br></br>
                                    <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Complete com as informações do Prefeito(a) ou Governador(a)</strong></div>
                                    <span className="br-divider sm my-3"></span>
                                    <Input name='nomeprefeito' label='Nome Completo' {...register('nomeprefeito', { required: 'Campo Nome Completo é obrigatório' })} placeholder='Nome Completo' onChange={handleChange} />
                                    {errors.nomeprefeito && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="nomeprefeito"></ErrorMessage>
                                        </Message>
                                    )}

                                    <InputTel className='my-3' name='telefoneprefeito' type='text' label='Telefone' {...register('telefoneprefeito', { required: 'Campo Telefone é obrigatório' })} placeholder='Telefone' onChange={handleChange} />
                                    {errors.telefoneprefeito && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="telefoneprefeito"></ErrorMessage>
                                        </Message>
                                    )}

                                    <InputCpf placeholder='CPF' label='CPF' name='cpfprefeito' {...register('cpfprefeito', { required: 'Campo CPF é obrigatório', validate: { TestaCPF: (value) => TestaCPF(value) || 'CPF inválido' } })} onChange={handleChange} />
                                    {errors.cpfprefeito && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="cpfprefeito"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='rgprefeito' type='text' label='RG' {...register('rgprefeito', { required: 'Campo RG é obrigatório' })} placeholder='RG' onChange={handleChange} />
                                    {errors.rgprefeito && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="rgprefeito"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='orgaorgprefeito' type='text' label='Órgão Emissor do RG' {...register('orgaorgprefeito', { required: 'Campo Órgão Emissor do RG é obrigatório' })} placeholder='Órgão Emissor do RG' onChange={handleChange} />
                                    {errors.orgaorgprefeito && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="orgaorgprefeito"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='ufrgprefeito' type='text' label='UF Emissora do RG' {...register('ufrgprefeito', { required: 'Campo UF Emissora do RG é obrigatório' })} placeholder='UF Emissora do RG' onChange={handleChange} />
                                    {errors.ufrgprefeito && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="ufrgprefeito"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='emailprefeito' type='text' label='E-mail' {...register('emailprefeito', { required: 'Campo E-mail é obrigatório' })} placeholder='E-mail' onChange={handleChange} />
                                    {errors.emailprefeito && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="emailprefeito"></ErrorMessage>
                                        </Message>
                                    )}
                                </Col>
                                <br/>
                                <Col className='col-sm-12 px-6'>
                                    <br></br>
                                    <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Quantidade de Cestas Emergenciais Pleiteadas</strong></div>
                                    <span className="br-divider sm my-3"></span>
                                    <Input
                                        className='my-3'
                                        name='quantidadecestas'
                                        type='text'
                                        label='Número de Cestas*'
                                        {...register('quantidadecestas', { required: 'Campo Número de Cestas* é obrigatório' })}
                                        placeholder='Número de Cestas'
                                        onChange={handleChange}
                                    />
                                    {errors.quantidadecestas && (
                                        <Message
                                            category='feedback'
                                            messageTitle='ERRO:'
                                            type='danger'
                                            icon="fas fa-check-circle"
                                            onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                        >
                                            <ErrorMessage errors={errors} name="quantidadecestas"></ErrorMessage>
                                        </Message>
                                    )}                                </Col>
                                <br/>
                                <Col className='col-sm-12 px-6'>
                                    <br></br>
                                    <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Local de Armazenamento das Cestas</strong></div>
                                    <span className="br-divider sm my-3"></span>
                                    <Input className='my-3' name='nomelocalarmazenamento' type='text' label='Nome do Local*' {...register('nomelocalarmazenamento', { required: 'Campo Nome do Local* é obrigatório' })} placeholder='Nome do Local' onChange={handleChange} />
                                    {errors.nomelocalarmazenamento && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="nomelocalarmazenamento"></ErrorMessage>
                                        </Message>
                                    )}


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


                                    <InputCep name='ceparmazenamento' label='CEP*' {...register('ceparmazenamento', { required: 'Campo CEP* é obrigatório' })} placeholder='CEP' onChange={handleChange} />
                                    {errors.ceparmazenamento && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="ceparmazenamento"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='enderecoarmazenamento' type='text' label='Endereço*' {...register('enderecoarmazenamento', { required: 'Campo Endereço* é obrigatório' })} placeholder='Endereço' onChange={handleChange} />
                                    {errors.enderecoarmazenamento && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="enderecoarmazenamento"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='numeroarmazenamento' type='text' label='Número*' {...register('numeroarmazenamento', { required: 'Campo Número* é obrigatório' })} placeholder='Número' onChange={handleChange} />
                                    {errors.numeroarmazenamento && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="numeroarmazenamento"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='complementoarmazenamento' type='text' label='Complemento' {...register('complementoarmazenamento', { required: 'Campo Complemento é obrigatório' })} placeholder='Complemento' onChange={handleChange} />
                                    {errors.complementoarmazenamento && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="complementoarmazenamento"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='bairroarmazenamento' type='text' label='Bairro*' {...register('bairroarmazenamento', { required: 'Campo Bairro* é obrigatório' })} placeholder='Bairro' onChange={handleChange} />
                                    {errors.bairroarmazenamento && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="bairroarmazenamento"></ErrorMessage>
                                        </Message>
                                    )}
                                </Col>
                                <br/>
                                <Col className='col-sm-12 px-6'>
                                    <br></br>
                                    <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Dados do Órgão de Controle Social</strong></div>
                                    <span className="br-divider sm my-3"></span>
                                    <Input className='my-3' name='nomelocalcontrolesocial' type='text' label='Nome do Local*' {...register('nomelocalcontrolesocial', { required: 'Campo Nome do Local* é obrigatório' })} placeholder='Nome do Local' onChange={handleChange} />
                                    {errors.nomelocalcontrolesocial && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="nomelocalcontrolesocial"></ErrorMessage>
                                        </Message>
                                    )}

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

                                    <InputCep name='cepcontrolesocial' label='CEP*' {...register('cepcontrolesocial', { required: 'Campo CEP* é obrigatório' })} placeholder='CEP' onChange={handleChange} />
                                    {errors.cepcontrolesocial && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="cepcontrolesocial"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='enderecocontrolesocial' type='text' label='Endereço*' {...register('enderecocontrolesocial', { required: 'Campo Endereço* é obrigatório' })} placeholder='Endereço' onChange={handleChange} />
                                    {errors.enderecocontrolesocial && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="enderecocontrolesocial"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='numerocontrolesocial' type='text' label='Número*' {...register('numerocontrolesocial', { required: 'Campo Número* é obrigatório' })} placeholder='Número' onChange={handleChange} />
                                    {errors.numerocontrolesocial && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="numerocontrolesocial"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='complementocontrolesocial' type='text' label='Complemento' {...register('complementocontrolesocial', { required: 'Campo Complemento é obrigatório' })} placeholder='Complemento' onChange={handleChange} />
                                    {errors.complementocontrolesocial && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="complementocontrolesocial"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='bairroarmazenamento' type='text' label='Bairro*' {...register('bairroarmazenamento', { required: 'Campo Bairro* é obrigatório' })} placeholder='Bairro' onChange={handleChange} />
                                    {errors.bairroarmazenamento && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="bairroarmazenamento"></ErrorMessage>
                                        </Message>
                                    )}

                                    <InputTel className='my-3' name='telefone1controlesocial' type='text' label='Telefone*' {...register('telefone1controlesocial', { required: 'Campo Telefone* é obrigatório' })} placeholder='Telefone' onChange={handleChange} />
                                    {errors.telefone1controlesocial && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="telefone1controlesocial"></ErrorMessage>
                                        </Message>
                                    )}

                                    <InputTel className='my-3' name='telefone2controlesocial' type='text' label='Telefone*' {...register('telefone2controlesocial', { required: 'Campo Telefone* é obrigatório' })} placeholder='Telefone' onChange={handleChange} />
                                    {errors.telefone2controlesocial && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="telefone2controlesocial"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='emailcontrolesocial' type='text' label='E-mail*' {...register('emailcontrolesocial', { required: 'Campo E-mail* é obrigatório' })} placeholder='E-mail' onChange={handleChange} />
                                    {errors.emailcontrolesocial && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="emailcontrolesocial"></ErrorMessage>
                                        </Message>
                                    )}

                                    <Input className='my-3' name='dirigentecontrolesocial' type='text' label='Diretor/representante*' {...register('dirigentecontrolesocial', { required: 'Campo Diretor/representante* é obrigatório' })} placeholder='Diretor/representante' onChange={handleChange} />
                                    {errors.dirigentecontrolesocial && (
                                        <Message category='feedback' messageTitle='ERRO:' type='danger' icon="fas fa-check-circle" onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}>
                                            <ErrorMessage errors={errors} name="dirigentecontrolesocial"></ErrorMessage>
                                        </Message>
                                    )}
                                </Col>
                                <br/>
                                <Col className='col-sm-12 px-6'>
                                    <br></br>
                                    <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Arquivos</strong></div>
                                    <span className="br-divider sm my-3"></span>
                                    <Upload multiple label="Termo de Adesão assinado" uploadTimeout={() => {return new Promise((resolve) => {return setTimeout(resolve, 300);}); }} />
                                    <p className="text-base mt-1">Clique ou arraste os arquivos para cima do componente Upload.</p>
                                    <br></br>
                                </Col>
                                <br/>
                                <Col className='col-sm-12 px-6'>
                                    <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Portaria</strong></div>
                                    <span className="br-divider sm my-3"></span>
                                    {portarias ? ( <Select id="portarias"  label="portarias" options={portarias} /> ) : ( <p>Loading portarias...</p> )}
                                </Col>
                                <br/>
                                <Col className='col-sm-12 px-6'>
                                    <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Evento</strong></div>
                                    <span className="br-divider sm my-3"></span>
                                    {eventos ? ( <Select id="eventos"  label="eventos" options={eventos} /> ) : ( <p>Loading eventos...</p> )}


                                </Col>
                                <br/>
                                <Col className='col-sm-12 px-6'>
                                    <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Público</strong></div>
                                    <span className="br-divider sm my-3"></span>
                                    {publicos ? ( <Select id="publicos"  label="publicos" options={publicos} /> ) : ( <p>Loading publicos...</p> )}
                                </Col>

                                <br/>
                                <Col className='col-sm-12 px-6'>
                                    <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Declaração de Veracidade de Documentos</strong></div>

                                    <Checkbox label="Estou de acordo com o conteúdo deste Termo de Adesão"
                                          mb={2} aria-required checked={checkboxMarcado} onChange={handleCheckboxChange} />
                                </Col>

                            </Row>
                        </Group>
                        <Group>
                            <Row>
                                <Col className='col-sm-12 px-6'>
                                    <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Lei Geral de Proteção de Dados</strong></div>
                                    <ul>
                                        <li>
                                            <strong>Em conformidade com a Lei Geral de Proteção de Dados Pessoais – ( Lei 13.709/2018),
                                                na qual a administração pública visa a execução de políticas públicas previstas em Lei,
                                                este titular/responsável  concorda com o tratamento de seus dados pessoais, em consonância
                                                ao  que  descreve o artigo 7º, inciso III, cuja finalidade é a formalização a Ação de Distribuição
                                                de Cestas Emergenciais .</strong>.
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                        </Group>

                    </Card.Content>
                    <Card.Footer className='mx-3'>
                        <Button
                            primary
                            className='mr-3'
                            type='submit'>
                            <i className="fas fa-save "></i>
                            Salvar
                        </Button>

                    </Card.Footer>
                </Card>
            </Row>
        </Container>
        </form>
    </>
  );
};

export default SolicitacaoCreate;
