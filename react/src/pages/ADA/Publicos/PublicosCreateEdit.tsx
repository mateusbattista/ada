import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Breadcrumb, Button, Card, Row, Container, Col, Carousel, Checkbox, DateTimePicker, Divider, Input, Radio, Select, Loading, MagicButton, Message, Textarea, Switch, Upload, Wizard, List, Item, Pagination, Tag, Group , Header, Avatar, Menu, Table} from '../../../components/index.ts';
const imageSample = '';
import axios from 'axios';
import { Form, useLocation, useNavigate } from 'react-router-dom';


import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import {BASE_URL} from '../../../global';

const PublicosCreateEdit: React.FC =() =>{


    const urlPublicosCreate= BASE_URL+'/api/ada/publicos/create';
    const urlPublicosUpdate= BASE_URL+'/api/ada/publicos/update';

    interface FormInterface {
        nometipopublico: string;
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

    const location = useLocation();
    const item_editar = location.state?.itemEditar?.id || null;
    const [publicoData, setPublicoData] = useState(null);


    useEffect(() => {
        const fetchPublicoData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/ada/publicos/form/${item_editar}`);
                setValue('nometipopublico', response.data.message.publico.nometipopublico,);
                setPublicoData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do público:', error);
            }
        };

        if (item_editar) {
            fetchPublicoData();
        }
    }, [item_editar]);

    const navigate = useNavigate();
    const voltarPagina = () => {
        navigate('/ada/publico/');
    };

    const currentEndpoint= BASE_URL+':/api/ada/publicos/create';



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValue(name, value);
    };

    const prevMessage = useRef(message);
    useEffect(() => {
        if (prevMessage.current !== message) {
            navigate('/ada/publico/', { state: { message } });

        }
    }, [message]);



    const enviarParaLaravel = async (data: FormInterface) => {
        try {
            let result = null;
            if(publicoData){
                 result = await axios.put(`${urlPublicosUpdate}/${publicoData.message.publico.id}`, data);
            }else{
                 result = await axios.post(urlPublicosCreate, data);
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

    return(
        <>
            <form onSubmit = { handleSubmit(enviarParaLaravel) } >
                <Container fluid>
            <Row>
                <Card>
                        <Card.Header cardTitle='INCLUIR PÚBLICOS' style={{ color: '#5992ED' }}/>
                            <Card.Content>
                                <Group >
                                    <Row >
                                        <Col className='col-sm-12 px-6'>
                                            <Input className='my-3'
                                                name='nometipopublico'
                                                type='text'
                                                label='Tipo do Público'
                                                placeholder='Digite o nome do Público'
                                                   {...register('nometipopublico', {
                                                       required: 'Campo Tipo do Público é obrigatório',
                                                   })}
                                                   onChange={handleChange}
                                            />
                                            {errors.nometipopublico && (
                                                <Message category='feedback' messageTitle= 'ERRO:' type='danger' icon="fas fa-check-circle"
                                                         onCloseButtonClick={() => setMessage(prevData => ({...prevData, open: false}))}>
                                                    <ErrorMessage errors = { errors } name="nometipopublico" ></ErrorMessage>
                                                </Message>
                                            )}
                                        </Col>
                                    </Row>
                                </Group>
                            </Card.Content>
                                <Card.Footer className='mx-3'>
                                <Button
                                    primary
                                    className='mr-3'
                                    type='submit'
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
        </Container>
            </form>
        </>
    );
};


export default PublicosCreateEdit;
