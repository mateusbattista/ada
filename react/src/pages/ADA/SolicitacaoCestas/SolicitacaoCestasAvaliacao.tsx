
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
import {BASE_URL} from '../../../global';

const SolicitacaoCestasAvaliacao: React.FC = () => {

    const urlUpdate= BASE_URL+'/api/ada/solicitacaocesta/update';

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

    const [dataform, setDataForm] = useState({
        municipioentefederativo: '',
        ibge: '',
        cnpjentefederativo: '',
        cepentefederativo: '',
        enderecoentefederativo: '',
        numeroentefederativo: '',
        uf: '',
        nomeprefeito: '',
        telefone1entefederativo: '',
        telefone2entefederativo: '',
        emailentefederativo: '',
        nomeresponsavel: '',
        rgresponsavel: '',
        orgaoresponsavel: '',
        cpfresponsavel: '',
        cargoresponsavel: '',
        emailresponsavel: '',
        telefone1responsavel: '',
        tipo: '',
        arquivonome: '',
        nomecoordenador: '',
        cpfcoordenador: '',
        cargocoordenador: '',
        emailcoordenador: '',
        telefone1coordenador: '',
        telefone2coordenador: '',
        quantidadecestas: '',
        nomelocalarmazenamento: '',
        cnpjarmazenamento: '',
        ceparmazenamento: '',
        enderecoarmazenamento: '',
        bairroarmazenamento: '',
        complementoarmazenamento: '',
        justificativa:'',
        situacaocestas:'',
    });


    //essas duas linhas tentam ver se veio algum id da pagina anterior para selecionar o objeto que deve ser editado
    const location = useLocation();
    const item_editar = location.state?.itemEditar?.id || null;
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/ada/solicitacaocesta/form/${item_editar}`);
                const { dados } = response.data.message;
                setDataForm(prevDataForm => ({
                    ...prevDataForm,
                    ...dados,
                }));

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
        navigate('/ada/solicitacaocestas');
    };


    const prevMessage = useRef(message);

    useEffect(() => {
        if (prevMessage.current !== message) {
            navigate('/ada/solicitacaocestas', { state: { message } });
        }
    }, [message]);




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(dataform);

        setDataForm(prevData => ({
            ...prevData,
            [name]: value,

        }));
    };


    const enviarParaLaravel = async () => {
        try {
            let result = null;
            console.log(dataform);
            if(data){
                result = await axios.put(`${urlUpdate}/${data.message.dados.id}`, dataform);
            }
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
            <Container fluid>
                <Row>
                    <Card disabled>
                        <Card.Header cardTitle='APROVAÇÃO/CESTAS EMERGENCIAIS'  style={{ color: '#5992ED' }} className='mb-2'/>
                        <Card.Content className='mr-3 '>
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
                                                    value={dataform.municipioentefederativo}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Row>
                                    </Group>
                                    <Group>
                                        <Row>
                                            <Col sm={12} className='mb-12'>
                                                <Input
                                                    className='my-3'
                                                    name='ibge'
                                                    type='text'
                                                    label='Código IBGE:'
                                                    value={dataform.ibge}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Row>
                                    </Group>
                                    <Group>
                                        <Row>
                                            <Col sm={12} className='mb-12'>
                                                <Input
                                                    className='my-3'
                                                    name='cnpjentefederativo'
                                                    type='text'
                                                    label='CNPJ do Município ou Estado/DF:'
                                                    value={dataform.cnpjentefederativo}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Row>
                                    </Group>
                            <div className="header-subtitle"><strong style={{ color: '#1351B4' }}>Informações Gerais do Demandante  </strong></div>
                            <Divider size="sm" my={2}/>
                                    <Group>
                                        <Row>
                                            <Col sm={12} className='mb-12'>
                                                <Input
                                                    className='my-3'
                                                    name='ceparmazenamento'
                                                    type='text'
                                                    label='CEP'
                                                    value={dataform.ceparmazenamento}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Row>
                                    </Group>
                                    <Group>
                                        <Row>
                                            <Col sm={12} className='mb-12'>
                                                <Input
                                                    className='my-3'
                                                    name='enderecoentefederativo'
                                                    type='text'
                                                    label='Endereço'
                                                    value={dataform.enderecoentefederativo}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Row>
                                    </Group>
                                    <Group>
                                        <Row>
                                            <Col sm={12} className='mb-12'>
                                                <Input
                                                    className='my-3'
                                                    name='numeroentefederativo'
                                                    type='text'
                                                    label='Número'
                                                    value={dataform.numeroentefederativo}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Row>
                                    </Group>
                                    <Group>
                                        <Row>
                                            <Col sm={12} className='mb-12'>
                                                <Input
                                                    className='my-3'
                                                    name='emailinstituicao'
                                                    type='text'
                                                    label='E-mail'
                                                    value={dataform.emailinstituicao}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Row>
                                    </Group>
                                    <Card.Header cardSubtitle='Dados do Preposto' style={{fontWeight: 700 , color: '#1351B4' }} />
                                    <Divider size="sm" my={3}/>
                                    <Group>
                                        <Row>
                                            <Col sm={12} className='mb-12'>
                                                <Input
                                                    className='my-3'
                                                    name='cargoresponsavel'
                                                    type='text'
                                                    label='Cargo responsável'
                                                    value={dataform.cargoresponsavel}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Row>
                                    </Group>
                                    <Group>
                                        <Row>
                                            <Col sm={12} className='mb-12'>
                                                <Input
                                                    className='my-3'
                                                    name='nomeresponsavel'
                                                    type='text'
                                                    label='Nome responsável'
                                                    value={dataform.nomeresponsavel}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Row>
                                    </Group>
                                    <Group>
                                        <Row>
                                            <Col sm={12} className='mb-12'>
                                                <Input
                                                    className='my-3'
                                                    name='emailresponsavel'
                                                    type='text'
                                                    label='E-mail responsável'
                                                    value={dataform.emailresponsavel}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Row>
                                    </Group>
                                    <Group>
                                        <Row>
                                            <Col sm={12} className='mb-12'>
                                                <Input
                                                    className='my-3'
                                                    name='telefoneresponsavel'
                                                    type='text'
                                                    label='Telefone responsável'
                                                    value={dataform.telefoneresponsavel}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Row>
                                    </Group>


                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <Card.Header cardSubtitle='Situação/Avaliação' style={{fontWeight: 700 , color: '#1351B4' }} />
                            <Divider size="sm" my={3}/>
                            <div className="p-3xh "   style={{backgroundColor: '#C5D4EB'}}>
                                <Group>
                                    <Row>
                                        <Col sm={12} className='mb-12'>
                                            <Select
                                                id="situacao"
                                                placeholder="Selecione a situação"
                                                label="Situação"
                                                value={dataform.situacaocestas}
                                                options={habilitacaoOptions}
                                            />
                                        </Col>
                                    </Row>
                                </Group>
                                <Group>
                                    <Row>
                                        <Col sm={12} className='mb-12'>
                                            <Textarea
                                                density="large"
                                                name='justificativa'
                                                value={dataform.justificativa}
                                                onChange={handleChange}
                                                label="Justificativa"
                                            />
                                        </Col>
                                    </Row>
                                </Group>
                                <Group>
                                    <Row>
                                        <Col sm={12} className="my-6">
                                            <Upload multiple label="Notas Técnicas" uploadTimeout={() => {
                                                return new Promise((resolve) => {
                                                    return setTimeout(resolve, 300);
                                                });
                                            }}/>
                                            <p className="text-base mt-1">Clique ou arraste os arquivos para
                                                cima do
                                                componente
                                                Upload.</p>
                                        </Col>
                                    </Row>
                                </Group>
                            </div>
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


        </>
    );
};

export default SolicitacaoCestasAvaliacao;
