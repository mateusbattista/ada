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

const baseURL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
const url = 'http://api.mds.rn.gov.br/fomento/fetch-estados';
import {BASE_URL} from '../../../global';
import SelectoOptionID from '../../../components/Select/SelectoOptionID';


const SolicitacaoCreateEdit: React.FC = () => {
    const urlCreate= BASE_URL+'/api/ada/solicitacao/create';
    const urlUpdate= BASE_URL+'/api/ada/solicitacao/update';
    const urlEvento= BASE_URL+'/api/ada/eventos';
    const urlPublico= BASE_URL+'/api/ada/publicos';
    const urlPortaria= BASE_URL+'/api/ada/portaria';

    const [eventos, setEventos] = useState(null);
    const [publicos, setPublicos] = useState(null);
    const [portarias, setPortarias] = useState(null);


    const [message, setMessage] = useState({
        open: false,
        title: '',
        body: '',
        class: '',
    });

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
        fk_estado_solicitante: number,
        fk_municipio_solicitante: number,
        fk_estado_local_armazenamento: number,
        fk_municipio_local_armazenamento: number,
        fk_estado_prefeitura: number,
        fk_municipio_prefeitura: number,
        fk_estado_controle_social: number,
        fk_municipio_controle_social: number,
    }


    const { register,setValue, handleSubmit, formState: { errors }, } = useForm<FormInterface>();

    console.log('register:', register);
    const [msg, setmsg] = useState({
        open: false,
        title: '',
        body: '',
        class: '',
    });


    // // usando a api dos eventos
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



    //essas duas linhas tentam ver se veio algum id da pagina anterior para selecionar o objeto que deve ser editado
    const location = useLocation();
    const item_editar = location.state?.itemEditar?.id || null;
    const [dataid, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/ada/solicitacao/form/${item_editar}`);
                setValue('name', response.data.message.dados.name);
                setValue('funcao_gestor', response.data.message.dados.funcao_gestor);
                setValue('cpfsolicitante', response.data.message.dados.cpfsolicitante);
                setValue('emailsolicitante', response.data.message.dados.emailsolicitante);
                setValue('telefone1solicitante', response.data.message.dados.telefone1solicitante);
                setValue('cepsolicitante', response.data.message.dados.cepsolicitante);
                setValue('enderecosolicitante', response.data.message.dados.enderecosolicitante);
                setValue('numerosolicitante', response.data.message.dados.numerosolicitante);
                setValue('complementosolicitante', response.data.message.dados.complementosolicitante);
                setValue('bairrosolicitante', response.data.message.dados.bairrosolicitante);
                setValue('cnpjprefeitura', response.data.message.dados.cnpjprefeitura);
                setValue('emailprefeitura', response.data.message.dados.emailprefeitura);
                setValue('cepprefeitura', response.data.message.dados.cepprefeitura);
                setValue('enderecoprefeitura', response.data.message.dados.enderecoprefeitura);
                setValue('numeroprefeitura', response.data.message.dados.numeroprefeitura);
                setValue('complementoprefeitura', response.data.message.dados.complementoprefeitura);
                setValue('bairroprefeitura', response.data.message.dados.bairroprefeitura);
                setValue('nomeprefeito', response.data.message.dados.nomeprefeito);
                setValue('telefoneprefeito', response.data.message.dados.telefoneprefeito);
                setValue('cpfprefeito', response.data.message.dados.cpfprefeito);
                setValue('rgprefeito', response.data.message.dados.rgprefeito);
                setValue('orgaorgprefeito', response.data.message.dados.orgaorgprefeito);
                setValue('ufrgprefeito', response.data.message.dados.ufrgprefeito);
                setValue('emailprefeito', response.data.message.dados.emailprefeito);
                setValue('quantidadecestas', response.data.message.dados.quantidadecestas);
                setValue('nomelocalarmazenamento', response.data.message.dados.nomelocalarmazenamento);
                setValue('ceparmazenamento', response.data.message.dados.ceparmazenamento);
                setValue('enderecoarmazenamento', response.data.message.dados.enderecoarmazenamento);
                setValue('numeroarmazenamento', response.data.message.dados.numeroarmazenamento);
                setValue('complementoarmazenamento', response.data.message.dados.complementoarmazenamento);
                setValue('bairroarmazenamento', response.data.message.dados.bairroarmazenamento);
                setValue('nomelocalcontrolesocial', response.data.message.dados.nomelocalcontrolesocial);
                setValue('cepcontrolesocial', response.data.message.dados.cepcontrolesocial);
                setValue('enderecocontrolesocial', response.data.message.dados.enderecocontrolesocial);
                setValue('numerocontrolesocial', response.data.message.dados.numerocontrolesocial);
                setValue('complementocontrolesocial', response.data.message.dados.complementocontrolesocial);
                setValue('bairrocontrolesocial', response.data.message.dados.bairrocontrolesocial);
                setValue('telefone1controlesocial', response.data.message.dados.telefone1controlesocial);
                setValue('telefone2controlesocial', response.data.message.dados.telefone2controlesocial);
                setValue('emailcontrolesocial', response.data.message.dados.emailcontrolesocial);
                setValue('dirigentecontrolesocial', response.data.message.dados.dirigentecontrolesocial);
                setValue('arquivo', response.data.message.dados.arquivo);
                setValue('situacao', response.data.message.dados.situacao);
                setValue('observacao', response.data.message.dados.observacao);


                if (estados && municipios) {
                    const estadoResponsavelSelecionado =  estados.find(
                        (estado) => estado.id === response.data.message.dados.fk_estado_solicitante
                    );

                    console.log(estadoResponsavelSelecionado);

                    setValue('fk_estado_solicitante', estadoResponsavelSelecionado ? estadoResponsavelSelecionado.label : '');

                    // const municipioResponsavelSelecionado = municipios.find(
                    //     (municipio) => municipio.id === response.data.message.dados.fk_municipio_solicitante
                    // );
                    // setValue('fk_municipio_solicitante', municipioResponsavelSelecionado ? municipioResponsavelSelecionado.label : '');

                    // const estadoLocalArmazenamentoSelecionado = estados && estados.find(
                    //     (estado) => estado.id === response.data.message.dados.fk_estado_local_armazenamento
                    // );
                    // setValue('fk_estado_local_armazenamento', estadoLocalArmazenamentoSelecionado ? estadoLocalArmazenamentoSelecionado.label : '');
                    //
                    // const municipioLocalArmazenamentoSelecionado = municipios.find(
                    //     (municipio) => municipio.id === response.data.message.dados.fk_municipio_local_armazenamento
                    // );
                    // setValue('fk_municipio_local_armazenamento', municipioLocalArmazenamentoSelecionado ? municipioLocalArmazenamentoSelecionado.label : '');
                    //
                    //
                    // const estadoControleSocialSelecionado = estados.find(
                    //     (estado) => estado.id === response.data.message.dados.fk_estado_controle_social
                    // );
                    // setValue('fk_estado_controle_social', estadoControleSocialSelecionado ? estadoControleSocialSelecionado.label : '');
                    //
                    // const municipioControleSocialSelecionado = municipios.find(
                    //     (municipio) => municipio.id === response.data.message.dados.fk_municipio_controle_social
                    // );
                    // setValue('fk_municipio_controle_social', municipioControleSocialSelecionado ? municipioControleSocialSelecionado.label : '');
                    //
                    // const estadoPrefeituraSelecionado = estados.find(
                    //     (estado) => estado.id === response.data.message.dados.fk_estado_controle_social
                    // );
                    // setValue('fk_estado_controle_social', estadoPrefeituraSelecionado ? estadoPrefeituraSelecionado.label : '');
                    //
                    // const municipioPrefeituraSelecionado = municipios.find(
                    //     (municipio) => municipio.id === response.data.message.dados.fk_municipio_controle_social
                    // );
                    // setValue('fk_municipio_controle_social', municipioPrefeituraSelecionado ? municipioPrefeituraSelecionado.label : '');
                  }
                setData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        if (item_editar) {
            fetchData();
        }
    }, [item_editar, municipios,]);


    const navigate = useNavigate();
    const voltarPagina = () => {
        navigate('/ada/solicitacao');
    };


    const prevMessage = useRef(message);

    useEffect(() => {
        if (prevMessage.current !== message) {
            navigate('/ada/solicitacao', { state: { message } });
        }
    }, [message]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValue(name, value);
    };


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
                    <Card.Header cardTitle='SOLICITAÇÃO DE ADESÃO AO ADA' style={{color: '#1351b4'}}>
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
                                        <select
                                        className="br-input"
                                        {...register('fk_estado_solicitante')}
                                        label="Estado"
                                        style={{
                                        backgroundColor: 'var(--background-light)',
                                        borderColor: 'var(--border-color-alternative)',
                                        borderRadius: 'var(--surface-rounder-sm)',
                                        borderStyle: 'var(--border-style)',
                                        borderWidth: 'var(--border-width)',
                                        color: 'var(--color-light)',
                                        display: 'block',
                                        fontSize: 'var(--font-size-scale-up-01)',
                                        fontWeight: 'var(--font-weight-medium)',
                                        height: 'var(--input-size)',
                                        marginTop: 'var(--spacing-scale-half)',
                                        paddingBottom: 0,
                                        paddingLeft: 'var(--spacing-scale-2x)',
                                        paddingRight: 'var(--spacing-scale-2x)',
                                        paddingTop: 0,
                                        width: '100%',
                                        }}
                                    >
                                        <option value="">Selecione o Estado:</option>
                                        {estados.map((estado) => (
                                        <option key={estado.id} value={estado.id}>
                                            {estado.label}
                                        </option>
                                        ))}
                                    </select>
                                    ) : (
                                        <p>Loading estados...</p>
                                    )}

                                    <SelectoOptionID
                                        placeholder='Selecione o município'
                                        label="Município"
                                        {...register('fk_municipio_solicitante')}
                                        onChange={(obj) => {
                                            setValue('fk_municipio_solicitante', obj.id);
                                        }}
                                        options={municipios}
                                        // ... other props
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

                                    {estados ? (<SelectoOptionID
                                            label={'Estado'}
                                            options={estados}
                                            {...register('fk_estado_prefeitura')}
                                            onChange={(obj) => {
                                                municipio(obj.value);
                                                setValue('fk_estado_prefeitura', obj.id);
                                            }}

                                        />
                                    ) : (
                                        <p>Loading estados...</p>
                                    )}

                                    <SelectoOptionID
                                        placeholder='Selecione o município'
                                        label="Município"
                                        {...register('fk_municipio_prefeitura')}
                                        onChange={(obj) => {
                                            setValue('fk_municipio_prefeitura', obj.id);
                                        }}
                                        options={municipios}
                                        // ... other props
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


                                    {estados ? (<SelectoOptionID
                                            label={'Estado'}
                                            {...register('fk_estado_local_armazenamento')}
                                            onChange={(obj) => {
                                                municipio(obj.value);
                                                setValue('fk_estado_local_armazenamento', obj.id);
                                            }}
                                            options={estados}
                                        />
                                    ) : (
                                        <p>Loading estados...</p>
                                    )}

                                    <SelectoOptionID
                                        placeholder='Selecione o município'
                                        label="Município"
                                        {...register('fk_municipio_local_armazenamento')}
                                        onChange={(obj) => {
                                            setValue('fk_municipio_local_armazenamento', obj.id);
                                        }}
                                        options={municipios}
                                        // ... other props
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

                                    {estados ? (<SelectoOptionID
                                            label={'Estado'}
                                            {...register('fk_estado_controle_social')}
                                            onChange={(obj) => {
                                                municipio(obj.value);
                                                setValue('fk_estado_controle_social', obj.id);
                                            }}
                                            options={estados}
                                        />
                                    ) : (
                                        <p>Loading estados...</p>
                                    )}

                                    <SelectoOptionID
                                        placeholder='Selecione o município'
                                        label="Município"
                                        {...register('fk_municipio_controle_social')}
                                        onChange={(obj) => {
                                            setValue('fk_municipio_controle_social', obj.id);
                                        }}
                                        options={municipios}
                                        // ... other props
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
                                    <br></br>
                                    <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Parecer</strong></div>
                                    <span className="br-divider sm my-3"></span>
                                    <Select
                                        id="situacao"
                                        placeholder="Selecione a situação"
                                        label="Situação"
                                        options={habilitacaoOptions}
                                        name='situacao'
                                    />
                                    <Textarea name='observacao'  className='my-3' label='Descrição do Parecer' />
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
                        <Button primary
                                onClick={voltarPagina}
                                style={{ backgroundColor: '#f8f5f5', color: '#1351b4', }}>
                            <i className=""></i>
                            Cancelar
                        </Button>
                    </Card.Footer>
                </Card>
            </Row>
        </Container>
        </form>
    </>
  );
};

export default SolicitacaoCreateEdit;
