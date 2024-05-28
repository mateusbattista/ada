import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Breadcrumb, Button, Card, Row, Container, Col, Carousel, Checkbox, DateTimePicker, Divider, Input, Radio, Select, Loading, MagicButton, Message, Textarea, Switch, Upload, Wizard, List, Item, Pagination, Tag, Group } from '../../../components/index.ts';
import { useLocation, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from '../../../global';

const baseURL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

const url = 'http://api.mds.rn.gov.br/fomento/fetch-estados';


import InputCnpj from '../../../components/Input/InpuCnpj';
import InputCep from '../../../components/Input/InpuCep';
import InputTel from '../../../components/Input/InputTel';
import InputCpf from '../../../components/Input/InputCpf';
import {validCNPJ} from  '../../../functions/valid.cnpj';
import {TestaCPF} from  '../../../functions/valid.cpf';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Wizardcustom from '../../../components/Wizard/Wizardcustom';
import SelectoOptionID from '../../../components/Select/SelectoOptionID';

const SolicitacaoCestasForm: React.FC = () => {

    const urlCreate= BASE_URL+'/api/ada/solicitacaocesta/create';



    const [estados, setEstados] = useState(null);
    const [municipios, setMunicipios] = useState<any[]>([]);
    const [message, setMessage] = useState({
        open: false,
        title: '',
        body: '',
        class: '',
    });

    interface FormInterface {
        municipioentefederativo: string;
        ibge: string;
        cnpjentefederativo: string;
        cepentefederativo: string;
        enderecoentefederativo: string;
        numeroentefederativo: string;
        uf: string;
        nomeprefeito: string;
        telefone1entefederativo: string;
        telefone2entefederativo: string;
        emailentefederativo: string;
        nomeresponsavel: string;
        rgresponsavel: string;
        orgaoresponsavel: string;
        cpfresponsavel: string;
        cargoresponsavel: string;
        emailresponsavel: string;
        telefone1responsavel: string;
        tipo: string;
        arquivonome: string;
        nomecoordenador: string;
        cpfcoordenador: string;
        cargocoordenador: string;
        emailcoordenador: string;
        telefone1coordenador: string;
        telefone2coordenador: string;
        quantidadecestas: string;
        nomelocalarmazenamento: string;
        cnpjarmazenamento: string;
        ceparmazenamento: string;
        enderecoarmazenamento: string;
        bairroarmazenamento: string;
        complementoarmazenamento: string;
        setor: string;
        fk_estado_responsavel: number;
        fk_municipio_responsavel: number;
        fk_estado_local_armazenamento: number;
        fk_municipio_local_armazenamento: number;
    }


    const { register,setValue, handleSubmit, formState: { errors }, } = useForm<FormInterface>();


    const [msg, setmsg] = useState({
        open: false,
        title: '',
        body: '',
        class: '',
    });



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


    const navigate = useNavigate();



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValue(name, value);
    };

    const prevMessage = useRef(message);

    useEffect(() => {
        if (prevMessage.current !== message) {
            navigate('/ada/', { state: { message } });
        }
    }, [message]);



    const onSubmit = async (data: FormInterface) => {
        try {

            const result = await axios.post(urlCreate, data);

            setMessage({
                open: true,
                title: result.data.message.title,
                body: result.data.message.body,
                class: result.data.message.class,
            });
            console.log(result); // Faça algo com a resposta do Laravel, se necessário
        } catch (error) {
            console.error('Erro ao enviar dados para o Laravel:', error);
        }
    };

    return (
        <>
        <form onSubmit = { handleSubmit(onSubmit) } >
                <Container fluid className='mb-6'>
                        <Row>
                            <Card>
                                <Card.Content>
                                    <Wizardcustom   className="mb-6" height="100%" >
                                        <Wizard.Panel showHeader={false} title='Informações do Demandante'>
                                            <div className="header-subtitle"><strong style={{ color: '#1351B4' }}>Informações Gerais </strong></div>
                                            <Divider size="sm" my={2}/>
                                            <Group>
                                                <Row>
                                                    <Col sm={12} className='my-12'>
                                                        <Input
                                                            className='my-3'
                                                            name='municipioentefederativo'
                                                            type='text'
                                                            label='Nome do Município ou Estado/DF:'
                                                            {...register('municipioentefederativo', { required: 'Campo Nome do Município ou Estado/DF: é obrigatório' })}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.municipioentefederativo && (
                                                            <Message
                                                                category='feedback'
                                                                messageTitle='ERRO:'
                                                                type='danger'
                                                                icon="fas fa-check-circle"
                                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                            >
                                                                <ErrorMessage errors={errors} name="municipioentefederativo"></ErrorMessage>
                                                            </Message>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </Group>
                                            <Group>
                                                <Row>
                                                    <Col sm={12} className='my-12'>
                                                        <Input
                                                            className='my-3'
                                                            name='ibge'
                                                            type='text'
                                                            label='IBGE'
                                                            {...register('ibge', { required: 'Campo IBGE é obrigatório' })}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.ibge && (
                                                            <Message
                                                                category='feedback'
                                                                messageTitle='ERRO:'
                                                                type='danger'
                                                                icon="fas fa-check-circle"
                                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                            >
                                                                <ErrorMessage errors={errors} name="ibge"></ErrorMessage>
                                                            </Message>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </Group>

                                            <Group>
                                                <Row>
                                                    <Col sm={12} className='my-12'>
                                                        <InputCnpj
                                                            className='my-3'
                                                            name='cnpjentefederativo'
                                                            type='text'
                                                            label='CNPJ do Município ou Estado/DF:'
                                                            {...register('cnpjentefederativo', {
                                                                required: 'Campo CNPJ do Município ou Estado/DF: é obrigatório',
                                                                validate: { validCNPJ: (value) => validCNPJ(value) || 'CNPJ inválido' }
                                                            })}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.cnpjentefederativo && (
                                                            <Message
                                                                category='feedback'
                                                                messageTitle='ERRO:'
                                                                type='danger'
                                                                icon="fas fa-check-circle"
                                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                            >
                                                                <ErrorMessage errors={errors} name="cnpjentefederativo"></ErrorMessage>
                                                            </Message>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </Group>
                                            <div className="header-subtitle"><strong style={{ color: '#1351B4' }}>Informações Gerais do Demandante </strong></div>
                                            <Divider size="sm" my={3} />
                                            <Group>
                                                <Row>
                                                    <Col sm={12} className='my-12'>
                                                        <InputCep
                                                            className='my-3'
                                                            name='cepentefederativo'
                                                            type='text'
                                                            label='CEP'
                                                            {...register('cepentefederativo', { required: 'Campo CEP é obrigatório' })}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.cepentefederativo && (
                                                            <Message
                                                                category='feedback'
                                                                messageTitle='ERRO:'
                                                                type='danger'
                                                                icon="fas fa-check-circle"
                                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                            >
                                                                <ErrorMessage errors={errors} name="cepentefederativo"></ErrorMessage>
                                                            </Message>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </Group>

                                            <Group>
                                                <Row>
                                                    <Col sm={12} className='my-12'>
                                                        <Input
                                                            className='my-3'
                                                            name='enderecoentefederativo'
                                                            type='text'
                                                            label='Endereço '
                                                            {...register('enderecoentefederativo', { required: 'Campo Endereço é obrigatório' })}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.enderecoentefederativo && (
                                                            <Message
                                                                category='feedback'
                                                                messageTitle='ERRO:'
                                                                type='danger'
                                                                icon="fas fa-check-circle"
                                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                            >
                                                                <ErrorMessage errors={errors} name="enderecoentefederativo"></ErrorMessage>
                                                            </Message>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </Group>

                                            <Group>
                                                <Row>
                                                    <Col sm={12} className='my-12'>
                                                        <Input
                                                            className='my-3'
                                                            name='numeroentefederativo'
                                                            type='text'
                                                            label='Número'
                                                            {...register('numeroentefederativo', { required: 'Campo Número é obrigatório' })}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.numeroentefederativo && (
                                                            <Message
                                                                category='feedback'
                                                                messageTitle='ERRO:'
                                                                type='danger'
                                                                icon="fas fa-check-circle"
                                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                            >
                                                                <ErrorMessage errors={errors} name="numeroentefederativo"></ErrorMessage>
                                                            </Message>
                                                        )}


                                                        {estados ? (<SelectoOptionID
                                                                label={'Estado'}
                                                                {...register('fk_estado_responsavel')}
                                                                onChange={(obj) => {
                                                                    municipio(obj.value);
                                                                    setValue('fk_estado_responsavel', obj.id);
                                                                }}
                                                                options={estados}
                                                            />
                                                        ) : (
                                                            <p>Loading estados...</p>
                                                        )}

                                                        <SelectoOptionID
                                                            placeholder='Selecione o município'
                                                            label="Município"
                                                            {...register('fk_municipio_responsavel')}
                                                            onChange={(obj) => {
                                                                setValue('fk_municipio_responsavel', obj.id);
                                                            }}
                                                            options={municipios}
                                                            // ... other props
                                                        />




                                                    </Col>
                                                </Row>
                                            </Group>
                                            <div className="header-subtitle"><strong style={{ color: '#1351B4' }}>Dados do Responsável pela Demanda  </strong></div>
                                            <Divider size="sm" my={3}/>
                                            <Group>
                                                <Row>
                                                    <Col sm={12} className='my-12'>
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

                                                    </Col>
                                                </Row>
                                            </Group>

                                            <Group>
                                                <Row>
                                                    <Col sm={12} className='my-12'>
                                                        <Input
                                                            className='my-3'
                                                            name='rgresponsavel'
                                                            type='text'
                                                            label='RG'
                                                            {...register('rgresponsavel', { required: 'Campo RG é obrigatório' })}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.rgresponsavel && (
                                                            <Message
                                                                category='feedback'
                                                                messageTitle='ERRO:'
                                                                type='danger'
                                                                icon="fas fa-check-circle"
                                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                            >
                                                                <ErrorMessage errors={errors} name="rgresponsavel"></ErrorMessage>
                                                            </Message>
                                                        )}



                                                    <Input
                                                        className='my-3'
                                                        name='orgaoresponsavel'
                                                        type='text'
                                                        label='Órgão'
                                                        {...register('orgaoresponsavel', { required: 'Campo Órgão é obrigatório' })}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.orgaoresponsavel && (
                                                        <Message
                                                            category='feedback'
                                                            messageTitle='ERRO:'
                                                            type='danger'
                                                            icon="fas fa-check-circle"
                                                            onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                        >
                                                            <ErrorMessage errors={errors} name="orgaoresponsavel"></ErrorMessage>
                                                        </Message>
                                                    )}



                                                        <InputCpf
                                                            className='my-3'
                                                            name='cpfresponsavel'
                                                            type='text'
                                                            label='CPF'
                                                            {...register('cpfresponsavel', { required: 'Campo CPF é obrigatório', validate: { TestaCPF: (value) => TestaCPF(value) || 'CPF inválido' } })}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.cpfresponsavel && (
                                                            <Message
                                                                category='feedback'
                                                                messageTitle='ERRO:'
                                                                type='danger'
                                                                icon="fas fa-check-circle"
                                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                            >
                                                                <ErrorMessage errors={errors} name="cpfresponsavel"></ErrorMessage>
                                                            </Message>
                                                        )}

                                                    </Col>
                                                </Row>
                                            </Group>

                                            <Group>
                                                <Row>
                                                    <Col sm={12} className='my-12'>
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

                                                    </Col>
                                                </Row>
                                            </Group>

                                            <Group>
                                                <Row>
                                                    <Col sm={12} className='my-12'>
                                                        <Input
                                                            className='my-3'
                                                            name='emailresponsavel'
                                                            type='text'
                                                            label='Email'
                                                            {...register('emailresponsavel', { required: 'Campo Email é obrigatório' })}
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

                                                    </Col>
                                                </Row>
                                            </Group>

                                            <Group>
                                                <Row>
                                                    <Col sm={12} className='my-12'>
                                                        <InputTel
                                                            className='my-3'
                                                            name='telefone1responsavel'
                                                            type='text'
                                                            label='Telefone 1'
                                                            {...register('telefone1responsavel', { required: 'Campo Telefone 1 é obrigatório' })}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.telefone1responsavel && (
                                                            <Message
                                                                category='feedback'
                                                                messageTitle='ERRO:'
                                                                type='danger'
                                                                icon="fas fa-check-circle"
                                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                            >
                                                                <ErrorMessage errors={errors} name="telefone1responsavel"></ErrorMessage>
                                                            </Message>
                                                        )}

                                                    </Col>
                                                </Row>
                                            </Group>
                                        </Wizard.Panel>
                                        <Wizard.Panel showHeader={false} title='Inserir os Arquivos Comprobatórios'>
                                            <div className="header-subtitle"><strong style={{ color: '#1351B4' }}>Documento de Reconhecimento da Emergência de Calamidade Pública   </strong></div>
                                            <Divider size="sm" my={3}/>
                                            <Group>
                                                <Row>
                                                    <Col sm={12} className='my-12'>
                                                        <Input
                                                            className='my-3'
                                                            name='tipo'
                                                            type='text'
                                                            label='Tipo'
                                                            {...register('tipo', { required: 'Campo Tipo é obrigatório' })}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.tipo && (
                                                            <Message
                                                                category='feedback'
                                                                messageTitle='ERRO:'
                                                                type='danger'
                                                                icon="fas fa-check-circle"
                                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                            >
                                                                <ErrorMessage errors={errors} name="tipo"></ErrorMessage>
                                                            </Message>
                                                        )}

                                                        <Input
                                                            className='my-3'
                                                            name='arquivonome'
                                                            type='text'
                                                            label='Nome do Arquivo'
                                                            {...register('arquivonome', { required: 'Campo Nome do Arquivo é obrigatório' })}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.arquivonome && (
                                                            <Message
                                                                category='feedback'
                                                                messageTitle='ERRO:'
                                                                type='danger'
                                                                icon="fas fa-check-circle"
                                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                            >
                                                                <ErrorMessage errors={errors} name="arquivonome"></ErrorMessage>
                                                            </Message>
                                                        )}

                                                    </Col>
                                                </Row>
                                            </Group>
                                        </Wizard.Panel>
                                        <Wizard.Panel showHeader={false} title='Informação da Ação de Distribuição de Cestas'>
                                            <div className="header-subtitle"><strong style={{ color: '#1351B4' }}>Setor Responsável pela Ação de Distribuição de Cestas Emergenciais </strong></div>
                                            <Divider size="sm" my={3}/>

                                            <Group>
                                                <Row>
                                                    <Col sm={12} className='my-12'>
                                                        <Input
                                                            className='my-3'
                                                            name='setor'
                                                            type='text'
                                                            label='Setor'
                                                            {...register('setor', { required: 'Campo Setor é obrigatório' })}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.setor && (
                                                            <Message
                                                                category='feedback'
                                                                messageTitle='ERRO:'
                                                                type='danger'
                                                                icon="fas fa-check-circle"
                                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                            >
                                                                <ErrorMessage errors={errors} name="setor"></ErrorMessage>
                                                            </Message>
                                                        )}

                                                    </Col>
                                                </Row>
                                            </Group>
                                            <div className="header-subtitle"><strong style={{ color: '#1351B4' }}>Coordenador(a) Geral da Ação de Distribuição de Cestas Emergenciais  </strong></div>
                                            <Divider size="sm" my={3}/>
                                            <Group>
                                                <Row>
                                                    <Col sm={12} className='my-12'>
                                                        <Input
                                                            className='my-3'
                                                            name='nomecoordenador'
                                                            type='text'
                                                            label='Nome'
                                                            {...register('nomecoordenador', { required: 'Campo Nome é obrigatório' })}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.nomecoordenador && (
                                                            <Message
                                                                category='feedback'
                                                                messageTitle='ERRO:'
                                                                type='danger'
                                                                icon="fas fa-check-circle"
                                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                            >
                                                                <ErrorMessage errors={errors} name="nomecoordenador"></ErrorMessage>
                                                            </Message>
                                                        )}

                                                        <InputCpf
                                                            className='my-3'
                                                            name='cpfcoordenador'
                                                            type='text'
                                                            label='CPF'
                                                            {...register('cpfcoordenador', { required: 'Campo CPF é obrigatório' })}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.cpfcoordenador && (
                                                            <Message
                                                                category='feedback'
                                                                messageTitle='ERRO:'
                                                                type='danger'
                                                                icon="fas fa-check-circle"
                                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                            >
                                                                <ErrorMessage errors={errors} name="cpfcoordenador"></ErrorMessage>
                                                            </Message>
                                                        )}

                                                        <Input
                                                            className='my-3'
                                                            name='cargocoordenador'
                                                            type='text'
                                                            label='Cargo'
                                                            {...register('cargocoordenador', { required: 'Campo Cargo é obrigatório' })}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.cargocoordenador && (
                                                            <Message
                                                                category='feedback'
                                                                messageTitle='ERRO:'
                                                                type='danger'
                                                                icon="fas fa-check-circle"
                                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                            >
                                                                <ErrorMessage errors={errors} name="cargocoordenador"></ErrorMessage>
                                                            </Message>
                                                        )}

                                                        <Input
                                                            className='my-3'
                                                            name='emailcoordenador'
                                                            type='text'
                                                            label='Email'
                                                            {...register('emailcoordenador', { required: 'Campo Email é obrigatório' })}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.emailcoordenador && (
                                                            <Message
                                                                category='feedback'
                                                                messageTitle='ERRO:'
                                                                type='danger'
                                                                icon="fas fa-check-circle"
                                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                            >
                                                                <ErrorMessage errors={errors} name="emailcoordenador"></ErrorMessage>
                                                            </Message>
                                                        )}

                                                        <InputTel
                                                            className='my-3'
                                                            name='telefone1coordenador'
                                                            type='text'
                                                            label='Telefone 1'
                                                            {...register('telefone1coordenador', { required: 'Campo Telefone 1 é obrigatório' })}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.telefone1coordenador && (
                                                            <Message
                                                                category='feedback'
                                                                messageTitle='ERRO:'
                                                                type='danger'
                                                                icon="fas fa-check-circle"
                                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                            >
                                                                <ErrorMessage errors={errors} name="telefone1coordenador"></ErrorMessage>
                                                            </Message>
                                                        )}

                                                        <InputTel
                                                            className='my-3'
                                                            name='telefone2coordenador'
                                                            type='text'
                                                            label='Telefone 2'
                                                            {...register('telefone2coordenador')}
                                                            onChange={handleChange}
                                                        />

                                                    </Col>
                                                </Row>
                                            </Group>
                                            <div className="header-subtitle"><strong style={{ color: '#1351B4' }}>Quantiade de Cestas Emergenciais Pleiteadas  </strong></div>
                                            <Divider size="sm" my={3}/>
                                            <Group>
                                                <Row>
                                                    <Col sm={12} className='my-12'>
                                                        <Input
                                                            className='my-3'
                                                            name='quantidadecestas'
                                                            type='text'
                                                            label='Quantidade de Cestas'
                                                            {...register('quantidadecestas', { required: 'Campo Quantidade de Cestas é obrigatório' })}
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

                                                    </Col>
                                                </Row>
                                            </Group>
                                            <div className="header-subtitle"><strong style={{ color: '#1351B4' }}>Local de Armazenamento de Cestas</strong></div>
                                            <Divider size="sm" my={3}/>
                                            <Group>
                                                <Row>
                                                    <Col sm={12} className='my-12'>
                                                        <Input
                                                            className='my-3'
                                                            name='nomelocalarmazenamento'
                                                            type='text'
                                                            label='Nome do Local de Armazenamento'
                                                            {...register('nomelocalarmazenamento', { required: 'Campo Nome do Local de Armazenamento é obrigatório' })}
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

                                                        <InputCnpj
                                                            className='my-3'
                                                            name='cnpjarmazenamento'
                                                            type='text'
                                                            label='CNPJ'
                                                            {...register('cnpjarmazenamento', { required: 'Campo CNPJ da Prefeitura é obrigatório', validate: { validCNPJ: (value) => validCNPJ(value) || 'CNPJ inválido' } })}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.cnpjarmazenamento && (
                                                            <Message
                                                                category='feedback'
                                                                messageTitle='ERRO:'
                                                                type='danger'
                                                                icon="fas fa-check-circle"
                                                                onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                            >
                                                                <ErrorMessage errors={errors} name="cnpjarmazenamento"></ErrorMessage>
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

                                                        <Input
                                                            className='my-3'
                                                            name='complementoarmazenamento'
                                                            type='text'
                                                            label='Complemento'
                                                            {...register('complementoarmazenamento')}
                                                            onChange={handleChange}
                                                        />

                                                    </Col>
                                                </Row>
                                            </Group>
                                        </Wizard.Panel>
                                    </Wizardcustom>
                                </Card.Content>
                            </Card>
                        </Row>

        </Container>
        </form>
        </>
    );
};

export default SolicitacaoCestasForm;
