import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Breadcrumb, Button, Card, Row, Container, Col, Carousel, DateTimePicker, Divider, Input, Radio, Select, Loading, MagicButton, Message, Textarea, Switch, Upload, Wizard, List, Item, Pagination, Tag, Group } from '../../../components/index.ts';
import { useLocation, useNavigate  } from 'react-router-dom';
import axios from 'axios';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import InputCpf from '../../../components/Input/InputCpf';
import {TestaCPF} from '../../../functions/valid.cpf';
import {BASE_URL} from '../../../global';



const EventosCreateEdit: React.FC = () => {

    const urlEventosCreate= BASE_URL+'/api/ada/eventos/create';
    const urlEventosUpdate= BASE_URL+'/api/ada/eventos/update';

    interface FormInterface {
        nometipoevento: string;
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


    const navigate = useNavigate();
    const voltarPagina = () => {
        navigate('/ada/evento/');
    };

    //essas duas linhas tentam ver se veio algum id da pagina anterior para selecionar o objeto que deve ser editado
    const location = useLocation();
    const item_editar = location.state?.itemEditar?.id || null;
    const [eventoData, setEventoData] = useState(null);

    useEffect(() => {
        const fetchEventoData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/ada/eventos/form/${item_editar}`);
                setValue('nometipoevento', response.data.message.evento.nometipoevento);
                setEventoData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do evento:', error);
            }
        };

        if (item_editar) {
            fetchEventoData();
        }
    }, [item_editar]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValue(name, value);
    };


    const enviarParaLaravel = async (data: FormInterface) => {
        try {
            let result = null;
            if(eventoData){
                result = await axios.put(`${urlEventosUpdate}/${eventoData.message.evento.id}`, data);
            }else{
                result = await axios.post(urlEventosCreate, data);
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

    const prevMessage = useRef(message);
    useEffect(() => {
        if (prevMessage.current !== message) {
            navigate('/ada/evento/', { state: { message } });
        }
    }, [message]);

    return (
        <>
            <form onSubmit = { handleSubmit(enviarParaLaravel) } >
                <Container fluid>
                    <Row>
                        <Card>
                            <Card.Header cardTitle='INCLUIR EVENTOS' style={{ color: '#5992ED' }}/>
                            <Card.Content>
                                <Group >
                                    <Row >
                                        <Col className='col-sm-12 px-6'>
                                            <Input
                                                className='my-3'
                                                name='cpfresponsavel'
                                                type='text'
                                                label='Evento'
                                                {...register('nometipoevento', )}
                                                onChange={handleChange}
                                            />
                                            {errors.nometipoevento && (
                                                <Message
                                                    category='feedback'
                                                    messageTitle='ERRO:'
                                                    type='danger'
                                                    icon="fas fa-check-circle"
                                                    onCloseButtonClick={() => setmsg(prevData => ({ ...prevData, open: false }))}
                                                >
                                                    <ErrorMessage errors={errors} name="nometipoevento"></ErrorMessage>
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
                    <br />
                </Container>
            </form>
        </>
    );
};

export default EventosCreateEdit;
