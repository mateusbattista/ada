import '@govbr-ds/core/dist/components/datetimepicker/datetimepicker.min.css';
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Breadcrumb, Button, Card, Row, Container, Col, Carousel, Checkbox, DateTimePicker, Divider, Input, Radio, Select, Loading, MagicButton, Message, Textarea, Switch, Upload, Wizard, List, Item, Pagination, Tag, Group ,Header, Avatar, Menu, Table , Tab} from '../../../components/index.ts';
import axios from 'axios';
import { Form, useLocation, useNavigate } from 'react-router-dom';


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


const TermoAdesaoCreate : React.FC = () => {

    const urlCreate= BASE_URL+'/api/ada/termoadesao/create';
    const urlUpdate= BASE_URL+'/api/ada/termoadesao/update';
    const urlEvento= BASE_URL+'/api/ada/eventos';
    const urlPublico= BASE_URL+'/api/ada/publicos';
    const urlPortaria= BASE_URL+'/api/ada/portaria';
    const [valor, setValor] = useState('');

    const [eventos, setEventos] = useState(null);
    const [publicos, setPublicos] = useState(null);
    const [portarias, setPortarias] = useState(null);

    const [estados, setEstados] = useState(null);
    const [municipios, setMunicipios] = useState([]);



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



    interface FormInterface {
        id: string;
        numero: string;
        ano: string;
        processosei: string;
        name: string;
        funcao: string;
        cpfsolicitante: string;
        emailsolicitante: string;
        telefone1solicitante: string;
        estado_solicitante_id: string;
        municipio_solicitante_id: string;
        cepsolicitante: string;
        enderecosolicitante: string;
        numerosolicitante: string;
        complementosolicitante: string;
        bairrosolicitante: string;
        estado_entefederativo_id: string;
        municipio_entefederativo_id: string;
        cnpjprefeitura: string;
        emailprefeitura: string;
        cepprefeitura: string;
        enderecoprefeitura: string;
        numeroprefeitura: string;
        complementoprefeitura: string;
        bairroprefeitura: string;
        system_unit_id: string;
        tipo: string;
        estado_prefeitura_id: string;
        municipio_prefeitura_id: string;
        nomeprefeito: string;
        telefoneprefeito: string;
        cpfprefeito: string;
        rgprefeito: string;
        orgaorgprefeito: string;
        ufrgprefeito: string;
        emailprefeito: string;
        quantidadecestas: string;
        nomelocalarmazenamento: string;
        estado_local_armazenamento_id: string;
        municipio_local_armazenamento_id: string;
        ceparmazenamento: string;
        enderecoarmazenamento: string;
        numeroarmazenamento: string;
        complementoarmazenamento: string;
        bairroarmazenamento: string;
        nomelocalcontrolesocial: string;
        estado_controle_social_id: string;
        municipio_controle_social_id: string;
        cepcontrolesocial: string;
        enderecocontrolesocial: string;
        numerocontrolesocial: string;
        complementocontrolesocial: string;
        bairrocontrolesocial: string;
        telefone1controlesocial: string;
        telefone2controlesocial: string;
        emailcontrolesocial: string;
        dirigentecontrolesocial: string;
        situacao: string;
        created_at: string;
        updated_at: string;
        datasolicitacao: string;
        datatermo: string;
        nome: string;
        ibge: string;
        observacao: string;
        data_publicacao_dou: string;
        link_publicacao_dou: string;
        arquivoextrato: string;
        funcao_gestor: string;
        ntermo: string;
        arquivo: string[];
        fk_evento: number;
        fk_publico: number;
        fk_portaria: number;
        fk_estado_prefeitura : number;
        fk_municipio_prefeitura : number;
        fk_estado_local_armazenamento : number;
        fk_municipio_local_armazenamento : number;
        fk_estado_controle_social : number;
        fk_municipio_controle_social : number;
    }



    const { register,setValue, handleSubmit, formState: { errors }, } = useForm<FormInterface>();
    const [msg, setmsg] = useState({
        open: false,
        title: '',
        body: '',
        class: '',
    });
    useEffect(() => {
    // // usando a api dos eventos
    axios.get(urlEvento)
        .then(response => {
            const { records} = response.data;

            setEventos(records.map((evento) => ({
                label: evento.nometipoevento, // Assuming 'nometipoevento' is the property for name
                value: evento.id, // Use 'id' if available, otherwise fallback to 'nometipoevento'
                id: evento.id, // Use 'id' if available, otherwise fallback to 'nometipoevento'
            })));
        })
        .catch(error => {
            console.error(error); // Handle any errors during the request
        });
    }, []);

    useEffect(() => {

    axios.get(urlPublico)
        .then(response => {
            const { records = [] } = response.data;


            setPublicos(records.map((publico) => ({
                label: publico.nometipopublico, // Assuming 'nometipoevento' is the property for name
                value: publico.id, // Use 'id' if available, otherwise fallback to 'nometipoevento'
                id: publico.id, // Use 'id' if available, otherwise fallback to 'nometipoevento'
            })));
        })
        .catch(error => {
            console.error(error); // Handle any errors during the request
        });
    }, []);

    useEffect(() => {

    axios.get(urlPortaria)
        .then(response => {
            const { records = [] } = response.data;


            setPortarias(records.map((portaria) => ({
                label: portaria.nome_portarias, // Assuming 'nometipoevento' is the property for name
                value:  portaria.id,
                id: portaria.id,// Use 'id' if available, otherwise fallback to 'nometipoevento'
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
                const response = await axios.get(`${BASE_URL}/api/ada/termoadesao/form/${item_editar}`);
                setValue('id', response.data.message.dados.id);
                setValue('numero', response.data.message.dados.numero);
                setValue('ano', response.data.message.dados.ano);
                setValue('processosei', response.data.message.dados.processosei);
                setValue('name', response.data.message.dados.name);
                setValue('funcao', response.data.message.dados.funcao);
                setValue('cpfsolicitante', response.data.message.dados.cpfsolicitante);
                setValue('emailsolicitante', response.data.message.dados.emailsolicitante);
                setValue('telefone1solicitante', response.data.message.dados.telefone1solicitante);
                setValue('estado_solicitante_id', response.data.message.dados.estado_solicitante_id);
                setValue('municipio_solicitante_id', response.data.message.dados.municipio_solicitante_id);
                setValue('cepsolicitante', response.data.message.dados.cepsolicitante);
                setValue('enderecosolicitante', response.data.message.dados.enderecosolicitante);
                setValue('numerosolicitante', response.data.message.dados.numerosolicitante);
                setValue('complementosolicitante', response.data.message.dados.complementosolicitante);
                setValue('bairrosolicitante', response.data.message.dados.bairrosolicitante);
                setValue('estado_entefederativo_id', response.data.message.dados.estado_entefederativo_id);
                setValue('municipio_entefederativo_id', response.data.message.dados.municipio_entefederativo_id);
                setValue('cnpjprefeitura', response.data.message.dados.cnpjprefeitura);
                setValue('emailprefeitura', response.data.message.dados.emailprefeitura);
                setValue('cepprefeitura', response.data.message.dados.cepprefeitura);
                setValue('enderecoprefeitura', response.data.message.dados.enderecoprefeitura);
                setValue('numeroprefeitura', response.data.message.dados.numeroprefeitura);
                setValue('complementoprefeitura', response.data.message.dados.complementoprefeitura);
                setValue('bairroprefeitura', response.data.message.dados.bairroprefeitura);
                setValue('system_unit_id', response.data.message.dados.system_unit_id);
                setValue('tipo', response.data.message.dados.tipo);
                setValue('estado_prefeitura_id', response.data.message.dados.estado_prefeitura_id);
                setValue('municipio_prefeitura_id', response.data.message.dados.municipio_prefeitura_id);
                setValue('nomeprefeito', response.data.message.dados.nomeprefeito);
                setValue('telefoneprefeito', response.data.message.dados.telefoneprefeito);
                setValue('cpfprefeito', response.data.message.dados.cpfprefeito);
                setValue('rgprefeito', response.data.message.dados.rgprefeito);
                setValue('orgaorgprefeito', response.data.message.dados.orgaorgprefeito);
                setValue('ufrgprefeito', response.data.message.dados.ufrgprefeito);
                setValue('emailprefeito', response.data.message.dados.emailprefeito);
                setValue('quantidadecestas', response.data.message.dados.quantidadecestas);
                setValue('nomelocalarmazenamento', response.data.message.dados.nomelocalarmazenamento);
                setValue('estado_local_armazenamento_id', response.data.message.dados.estado_local_armazenamento_id);
                setValue('municipio_local_armazenamento_id', response.data.message.dados.municipio_local_armazenamento_id);
                setValue('ceparmazenamento', response.data.message.dados.ceparmazenamento);
                setValue('enderecoarmazenamento', response.data.message.dados.enderecoarmazenamento);
                setValue('numeroarmazenamento', response.data.message.dados.numeroarmazenamento);
                setValue('complementoarmazenamento', response.data.message.dados.complementoarmazenamento);
                setValue('bairroarmazenamento', response.data.message.dados.bairroarmazenamento);
                setValue('nomelocalcontrolesocial', response.data.message.dados.nomelocalcontrolesocial);
                setValue('estado_controle_social_id', response.data.message.dados.estado_controle_social_id);
                setValue('municipio_controle_social_id', response.data.message.dados.municipio_controle_social_id);
                setValue('cepcontrolesocial', response.data.message.dados.cepcontrolesocial);
                setValue('enderecocontrolesocial', response.data.message.dados.enderecocontrolesocial);
                setValue('numerocontrolesocial', response.data.message.dados.numerocontrolesocial);
                setValue('complementocontrolesocial', response.data.message.dados.complementocontrolesocial);
                setValue('bairrocontrolesocial', response.data.message.dados.bairrocontrolesocial);
                setValue('telefone1controlesocial', response.data.message.dados.telefone1controlesocial);
                setValue('telefone2controlesocial', response.data.message.dados.telefone2controlesocial);
                setValue('emailcontrolesocial', response.data.message.dados.emailcontrolesocial);
                setValue('dirigentecontrolesocial', response.data.message.dados.dirigentecontrolesocial);
                setValue('situacao', response.data.message.dados.situacao);
                setValue('created_at', response.data.message.dados.created_at);
                setValue('updated_at', response.data.message.dados.updated_at);
                setValue('datasolicitacao', response.data.message.dados.datasolicitacao);
                setValue('datatermo', response.data.message.dados.datatermo);
                setValue('nome', response.data.message.dados.nome);
                setValue('ibge', response.data.message.dados.ibge);
                setValue('observacao', response.data.message.dados.observacao);
                setValue('data_publicacao_dou', response.data.message.dados.data_publicacao_dou);
                setValue('link_publicacao_dou', response.data.message.dados.link_publicacao_dou);
                setValue('arquivoextrato', response.data.message.dados.arquivoextrato);
                setValue('funcao_gestor', response.data.message.dados.funcao_gestor);
                setValue('ntermo', response.data.message.dados.ntermo);
                setValue('arquivo', response.data.message.dados.arquivo);
                const eventoSelecionado = eventos.find(
                    (evento) => evento.id === response.data.message.dados.fk_evento
                );
                // Defina o valor do campo fk_evento como o value correspondente
                setValue('fk_evento', eventoSelecionado ? eventoSelecionado.label : '');

                 const portariaSelecionado = portarias.find(
                    (portaria) => portaria.id === response.data.message.dados.fk_portaria
                );
                // Defina o valor do campo fk_evento como o value correspondente
                setValue('fk_portaria', portariaSelecionado ? portariaSelecionado.label : '');

                  const publicoSelecionado = publicos.find(
                    (publico) => publico.id === response.data.message.dados.fk_publico
                );
                setValue('fk_publico', publicoSelecionado ? publicoSelecionado.label : '');

                setData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados :', error);
            }
        };

        if (item_editar) {
            fetchData();
        }
    }, [item_editar, setValue, eventos, publicos, portarias]);

    const navigate = useNavigate();
    const voltarPagina = () => {
        navigate('/ada/termoadesao');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValue(name, value);
    };



    const textChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    const prevMessage = useRef(message);
    useEffect(() => {
        if (prevMessage.current !== message) {
            navigate('/ada/termoadesao/', { state: { message } });
        }
    }, [message]);

    const isTermoAdesaoLocal = location.pathname === '/ada/termoadesao/view';


        return(

        <form onSubmit = { handleSubmit(enviarParaLaravel) } >

                    <Card disabled={isTermoAdesaoLocal}>
                    <Card.Header cardTitle='TERMO DE ADESÃO ADA' style={{color:'#1351b4'}}></Card.Header>
                    <Card.Content>
                        <span className="br-divider sm my-3"></span>

                        <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Dados do Solicitante da Ação de Distribuição de Cestas Emergenciais</strong></div>
                         <Divider  size='md'style={{backgroundColor :'#1351b4' }}/>
                            <Group>
                                <Row>
                                    <Col className='col-sm-12 px-6'>
                                        <Input
                                            className='my-3'
                                            name='numero'
                                            type='text'
                                            label='Número'
                                            {...register('numero', { required: 'Campo Número é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.numero && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="numero"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='ano'
                                            type='text'
                                            label='Ano'
                                            {...register('ano', { required: 'Campo Ano é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.ano && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="ano"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='processosei'
                                            type='text'
                                            label='SEI'
                                            {...register('processosei', { required: 'Campo SEI é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.processosei && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="processosei"></ErrorMessage>
                                            </Message>
                                        )}

                                            <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Dados do Solicitante da Ação de Distribuição de Cestas Emergenciais</strong></div>
                                            <span className="br-divider sm my-3"></span>

                                        <Input
                                            className='my-3'
                                            name='name'
                                            type='text'
                                            label='Nome Completo'
                                            {...register('name', { required: 'Campo Nome Completo é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.name && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="name"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='funcao'
                                            type='text'
                                            label='Função'
                                            {...register('funcao', { required: 'Campo Função é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.funcao && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="funcao"></ErrorMessage>
                                            </Message>
                                        )}

                                        <InputCpf
                                            className='my-3'
                                            name='cpfsolicitante'
                                            type='text'
                                            label='CPF'
                                            {...register('cpfsolicitante', { required: 'Campo CPF é obrigatório', validate: { TestaCPF: (value) => TestaCPF(value) || 'CPF inválido' } })}
                                            onChange={handleChange}
                                        />
                                        {errors.cpfsolicitante && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="cpfsolicitante"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='emailsolicitante'
                                            type='text'
                                            label='E-mail'
                                            {...register('emailsolicitante', { required: 'Campo E-mail é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.emailsolicitante && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="emailsolicitante"></ErrorMessage>
                                            </Message>
                                        )}

                                        <InputTel
                                            className='my-3'
                                            name='telefone1solicitante'
                                            type='text'
                                            label='Telefone'
                                            {...register('telefone1solicitante', { required: 'Campo Telefone é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.telefone1solicitante && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="telefone1solicitante"></ErrorMessage>
                                            </Message>
                                        )}

                                    {estados ? (
                                    <Select
                                            id='select-simples'
                                            placeholder='Selecione o estado'
                                            label='Estado'
                                            options={estados}
                                            onChange={handleChangemunicipio}
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

                                        <InputCep
                                            className='my-3'
                                            name='cepsolicitante'
                                            type='text'
                                            label='CEP'
                                            {...register('cepsolicitante', { required: 'Campo CEP é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.cepsolicitante && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="cepsolicitante"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='enderecosolicitante'
                                            type='text'
                                            label='Endereço'
                                            {...register('enderecosolicitante', { required: 'Campo Endereço é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.enderecosolicitante && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="enderecosolicitante"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='numerosolicitante'
                                            type='text'
                                            label='Número'
                                            {...register('numerosolicitante', { required: 'Campo Número é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.numerosolicitante && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="numerosolicitante"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='complementosolicitante'
                                            type='text'
                                            label='Complemento'
                                            {...register('complementosolicitante')}
                                            onChange={handleChange}
                                        />

                                        <Input
                                            className='my-3'
                                            name='bairrosolicitante'
                                            type='text'
                                            label='Bairro'
                                            {...register('bairrosolicitante', { required: 'Campo Bairro é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.bairrosolicitante && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="bairrosolicitante"></ErrorMessage>
                                            </Message>
                                        )}
                                    <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Informações Gerais do Ente Federativo</strong></div>
                                    <span className="br-divider sm my-3"></span>


                                    {estados ? (
                                    <Select
                                            id='select-simples'
                                            placeholder='Selecione o estado'
                                            label='Estado'
                                            options={estados}
                                            onChange={handleChangemunicipio}
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
                                        <InputCnpj
                                            className='my-3'
                                            name='cnpjprefeitura'
                                            type='text'
                                            label='CNPJ da Prefeitura'
                                            {...register('cnpjprefeitura', { required: 'Campo CNPJ da Prefeitura é obrigatório', validate: { validCNPJ: (value) => validCNPJ(value) || 'CNPJ inválido' }})}
                                            onChange={handleChange}
                                        />
                                        {errors.cnpjprefeitura && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="cnpjprefeitura"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='emailprefeitura'
                                            type='text'
                                            label='E-mail'
                                            {...register('emailprefeitura', { required: 'Campo E-mail é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.emailprefeitura && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="emailprefeitura"></ErrorMessage>
                                            </Message>
                                        )}

                                        <InputCep
                                            className='my-3'
                                            name='cepprefeitura'
                                            type='text'
                                            label='CEP'
                                            {...register('cepprefeitura', { required: 'Campo CEP é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.cepprefeitura && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="cepprefeitura"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='enderecoprefeitura'
                                            type='text'
                                            label='Endereço'
                                            {...register('enderecoprefeitura', { required: 'Campo Endereço é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.enderecoprefeitura && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="enderecoprefeitura"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='numeroprefeitura'
                                            type='text'
                                            label='Número'
                                            {...register('numeroprefeitura', { required: 'Campo Número é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.numeroprefeitura && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="numeroprefeitura"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='complementoprefeitura'
                                            type='text'
                                            label='Complemento'
                                            {...register('complementoprefeitura')}
                                            onChange={handleChange}
                                        />

                                        <Input
                                            className='my-3'
                                            name='bairroprefeitura'
                                            type='text'
                                            label='Bairro'
                                            {...register('bairroprefeitura', { required: 'Campo Bairro é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.bairroprefeitura && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="bairroprefeitura"></ErrorMessage>
                                            </Message>
                                        )}

                                        <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Informações do Prefeito ou Governador(a)</strong></div>
                                        <Divider  size='md'style={{backgroundColor :'#1351b4' }}/>
                                        <Input
                                            className='my-3'
                                            name='nomeprefeito'
                                            type='text'
                                            label='Nome Completo'
                                            {...register('nomeprefeito', { required: 'Campo Nome Completo é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.nomeprefeito && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="nomeprefeito"></ErrorMessage>
                                            </Message>
                                        )}

                                        <InputTel
                                            className='my-3'
                                            name='telefoneprefeito'
                                            type='text'
                                            label='Telefone'
                                            {...register('telefoneprefeito', { required: 'Campo Telefone é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.telefoneprefeito && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="telefoneprefeito"></ErrorMessage>
                                            </Message>
                                        )}

                                        <InputCpf
                                            className='my-3'
                                            name='cpfprefeito'
                                            type='text'
                                            label='CPF'
                                            {...register('cpfprefeito', { required: 'Campo CPF é obrigatório', validate: { TestaCPF: (value) => TestaCPF(value) || 'CPF inválido' }})}
                                            onChange={handleChange}
                                        />
                                        {errors.cpfprefeito && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="cpfprefeito"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='rgprefeito'
                                            type='text'
                                            label='RG'
                                            {...register('rgprefeito', { required: 'Campo RG é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.rgprefeito && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="rgprefeito"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='orgaorgprefeito'
                                            type='text'
                                            label='Orgão Emissor do RG'
                                            {...register('orgaorgprefeito', { required: 'Campo Orgão Emissor do RG é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.orgaorgprefeito && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="orgaorgprefeito"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='ufrgprefeito'
                                            type='text'
                                            label='UF Emissora do RG'
                                            {...register('ufrgprefeito', { required: 'Campo UF Emissora do RG é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.ufrgprefeito && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="ufrgprefeito"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='emailprefeito'
                                            type='text'
                                            label='E-mail'
                                            {...register('emailprefeito', { required: 'Campo E-mail é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.emailprefeito && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="emailprefeito"></ErrorMessage>
                                            </Message>
                                        )}

                                        <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Quantidade de Cestas Emergenciais Pleiteadas</strong></div>
                                        <Divider  size='md'style={{backgroundColor :'#1351b4' }}/>
                                        <Input
                                            className='my-3'
                                            name='quantidadecestas'
                                            type='text'
                                            label='Número de Cestas'
                                            {...register('quantidadecestas', { required: 'Campo Número de Cestas é obrigatório' })}
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
                                        )}

                                        <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Local de Armazenamento das Cestas
                                        </strong></div>
                                        <Divider  size='md'style={{backgroundColor :'#1351b4' }}/>
                                        <Input
                                            className='my-3'
                                            name='nomelocalarmazenamento'
                                            type='text'
                                            label='Nome do Local'
                                            {...register('nomelocalarmazenamento', { required: 'Campo Nome do Local é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.nomelocalarmazenamento && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="nomelocalarmazenamento"></ErrorMessage>
                                            </Message>
                                        )}


                                    {estados ? (
                                    <Select
                                            id='select-simples'
                                            placeholder='Selecione o estado'
                                            label='Estado'
                                            options={estados}
                                            onChange={handleChangemunicipio}
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

                                        <InputCep
                                            className='my-3'
                                            name='ceparmazenamento'
                                            type='text'
                                            label='CEP'
                                            {...register('ceparmazenamento', { required: 'Campo CEP é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.ceparmazenamento && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="ceparmazenamento"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='enderecoarmazenamento'
                                            type='text'
                                            label='Endereço'
                                            {...register('enderecoarmazenamento', { required: 'Campo Endereço é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.enderecoarmazenamento && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="enderecoarmazenamento"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='numeroarmazenamento'
                                            type='text'
                                            label='Número'
                                            {...register('numeroarmazenamento', { required: 'Campo Número é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.numeroarmazenamento && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="numeroarmazenamento"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='complementoarmazenamento'
                                            type='text'
                                            label='Complemento'
                                            {...register('complementoarmazenamento')}
                                            onChange={handleChange}
                                        />

                                        <Input
                                            className='my-3'
                                            name='bairroarmazenamento'
                                            type='text'
                                            label='Bairro'
                                            {...register('bairroarmazenamento', { required: 'Campo Bairro é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.bairroarmazenamento && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="bairroarmazenamento"></ErrorMessage>
                                            </Message>
                                        )}

                                        <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Dados do Órgão do Controle Social
                                        </strong></div>
                                        <Divider  size='md'style={{backgroundColor :'#1351b4' }}/>
                                        <Input
                                            className='my-3'
                                            name='nomelocalcontrolesocial'
                                            type='text'
                                            label='Nome do Local'
                                            {...register('nomelocalcontrolesocial', { required: 'Campo Nome do Local é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.nomelocalcontrolesocial && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="nomelocalcontrolesocial"></ErrorMessage>
                                            </Message>
                                        )}


                                        {estados ? (
                                        <Select
                                                id='select-simples'
                                                placeholder='Selecione o estado'
                                                label='Estado'
                                                options={estados}
                                                onChange={handleChangemunicipio}
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

                                        <InputCep
                                            className='my-3'
                                            name='cepcontrolesocial'
                                            type='text'
                                            label='CEP'
                                            {...register('cepcontrolesocial', { required: 'Campo CEP é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.cepcontrolesocial && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="cepcontrolesocial"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='enderecocontrolesocial'
                                            type='text'
                                            label='Endereço'
                                            {...register('enderecocontrolesocial', { required: 'Campo Endereço é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.enderecocontrolesocial && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="enderecocontrolesocial"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='numerocontrolesocial'
                                            type='text'
                                            label='Número'
                                            {...register('numero', { required: 'Campo Número é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.numerocontrolesocial && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="numerocontrolesocial"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='complementocontrolesocial'
                                            type='text'
                                            label='Complemento'
                                            {...register('complementocontrolesocial')}
                                            onChange={handleChange}
                                        />

                                        <Input
                                            className='my-3'
                                            name='bairrocontrolesocial'
                                            type='text'
                                            label='Bairro'
                                            {...register('bairrocontrolesocial', { required: 'Campo Bairro é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.bairrocontrolesocial && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="bairrocontrolesocial"></ErrorMessage>
                                            </Message>
                                        )}

                                        <InputTel
                                            className='my-3'
                                            name='telefone1controlesocial'
                                            type='text'
                                            label='Telefone 1'
                                            {...register('telefone1controlesocial', { required: 'Campo Telefone 1 é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.telefone1controlesocial && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="telefone1controlesocial"></ErrorMessage>
                                            </Message>
                                        )}

                                        <InputTel
                                            className='my-3'
                                            name='telefone2controlesocial'
                                            type='text'
                                            label='Telefone 2'
                                            {...register('telefone2controlesocial')}
                                            onChange={handleChange}
                                        />

                                        <Input
                                            className='my-3'
                                            name='emailcontrolesocial'
                                            type='text'
                                            label='E-mail'
                                            {...register('emailcontrolesocial', { required: 'Campo E-mail é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.emailcontrolesocial && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="emailcontrolesocial"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='dirigentecontrolesocial'
                                            type='text'
                                            label='Diretor/representante'
                                            {...register('dirigentecontrolesocial', { required: 'Campo Diretor/representante é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.dirigentecontrolesocial && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="dirigentecontrolesocial"></ErrorMessage>
                                            </Message>
                                        )}

                                        <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Arquivos
                                        </strong></div>
                                        <Divider  size='md'style={{backgroundColor :'#1351b4' }}/>
                                        <br></br>
                                        <br></br>


                                        <Upload multiple label="Termos" uploadTimeout={() => {
                                                        return new Promise((resolve) => {
                                                            return setTimeout(resolve, 300);
                                                        });
                                                    }} />
                                                    <p className="text-base mt-1">Clique ou arraste os arquivos para
                                                        cima do
                                                        componente
                                                        Upload.</p>

                                        <br></br>

                                            <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Portaria</strong></div>
                                            <span className="br-divider sm my-3"></span>
                                            {portarias ? ( <Select
                                                id="portarias"
                                                name="fk_portaria"
                                                {...register('fk_portaria')}
                                                onChange={(valor) => setValue('fk_portaria', valor)}
                                                options={portarias}
                                                   /> ) : ( <p>Loading portarias...</p> )}
                                        <br/>
                                            <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Evento</strong></div>
                                            <span className="br-divider sm my-3"></span>
                                            {eventos ? ( <Select
                                                id="eventos"
                                                name="fk_evento"
                                                {...register('fk_evento')}
                                                onChange={(valor) => setValue('fk_evento', valor)}
                                                options={eventos}
                                                /> ) : ( <p>Loading eventos...</p> )}


                                        <br/>
                                            <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Público</strong></div>
                                            <span className="br-divider sm my-3"></span>
                                            {publicos ? (
                                                <Select id="publicos"
                                                        name="fk_publico"
                                                        {...register('fk_publico')}
                                                        onChange={(valor) => setValue('fk_publico', valor)}
                                                        options={publicos} /> )
                                                : ( <p>Loading publicos...</p> )}
                                        <br/>

                                        <Input
                                            className='my-3'
                                            name='data_publicacao_dou'
                                            type='date'
                                            label='Data Publicação DOU'
                                            {...register('data_publicacao_dou', { required: 'Campo Data Publicação DOU é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.data_publicacao_dou && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="data_publicacao_dou"></ErrorMessage>
                                            </Message>
                                        )}

                                        <Input
                                            className='my-3'
                                            name='link_publicacao_dou'
                                            type='text'
                                            label='Link da Publicação'
                                            {...register('link_publicacao_dou', { required: 'Campo Link da Publicação é obrigatório' })}
                                            onChange={handleChange}
                                        />
                                        {errors.link_publicacao_dou && (
                                            <Message
                                                category='feedback'
                                                messageTitle='ERRO:'
                                                type='danger'
                                                icon="fas fa-check-circle"
                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                            >
                                                <ErrorMessage errors={errors} name="link_publicacao_dou"></ErrorMessage>
                                            </Message>
                                        )}

                                        <div className="header-subtitle"><strong style={{color:'#1351B4'}}>Situação do Parecer
                                        </strong></div>
                                        <Divider  size='md'style={{backgroundColor :'#1351b4' }}/>
                                        <br></br>

                                    <Select
                                        id="situacao"
                                        placeholder="Selecione a situação"
                                        label="Situação"
                                        options={habilitacaoOptions}
                                            />

                                        <Textarea name='observacao' onChange={textChange} density="large" label="Capacidade Técnica:" {...register('observacao')} />
                                    </Col>
                                </Row>
                            </Group>
                             <Breadcrumb/>
                        </Card.Content>
                            <Card.Footer className='mx-3'>

                                {!isTermoAdesaoLocal && (
                                <Button primary className='mr-3' type='submit'>
                                    <i className="fas fa-save"></i>
                                    Salvar
                                </Button>
                            )}
                                    <Button primary
                                            onClick={voltarPagina}
                                            style={{ backgroundColor: '#f8f5f5', color: '#1351b4', }}>
                                        <i className=""></i>
                                        Cancelar
                                    </Button>

                            </Card.Footer>
                            <Breadcrumb/>
                </Card>
        </form>
    );

};
export default TermoAdesaoCreate;






