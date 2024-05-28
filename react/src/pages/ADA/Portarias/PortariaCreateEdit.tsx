import React, { useRef, useState, useEffect } from 'react';
import {Button, Card, Row, Container, Col, Input, Group, Message} from '../../../components/index.ts';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import {BASE_URL} from '../../../global';


const PortariaCreateEdit: React.FC = () => {
    const urlPortariaCreate = BASE_URL+'/api/ada/portaria/create';
    const urlPortariaUpdate= BASE_URL+'/api/ada/portaria/update';


    interface FormInterface {
        nome_portarias: string;
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

    // voltar para o portariaList
    const navigate = useNavigate();
    const voltarPagina = () => {
        navigate('/ada/portaria');
    };

    //essas duas linhas tentam ver se veio algum id da pagina anterior para selecionar o objeto que deve ser editado
    const location = useLocation();
    const item_editar = location.state?.itemEditar?.id || null;
    const [portariaData, setPortariaData] = useState(null);

    //const [enviado, setEnviado] = useState(false);

    useEffect(() => {
        const fetchPortariaData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/ada/portaria/form/${item_editar}`);
                setValue('nome_portarias', response.data.message.portaria.nome_portarias,
                );
                setPortariaData(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do evento:', error);
            }
        };

        if (item_editar) {
            fetchPortariaData();
        }
    }, [item_editar]);



    // mudar o valor do input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValue(name, value);
    };

    // enviar dados para o laravel
    const enviarParaLaravel = async (data: FormInterface) => {
        try {
            let result = null;
            if(portariaData){
                 result = await axios.put(`${urlPortariaUpdate}/${portariaData.message.portaria.id}`, data);
            }else{
                 result = await axios.post(urlPortariaCreate, data);
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

    const previousMessage = useRef(message);
    useEffect(() => {
      if (message !== previousMessage.current) {
        navigate('/ada/portaria', { state: { message } });
      }
    }, [message]);



    return (
        <>
            <form onSubmit = { handleSubmit(enviarParaLaravel) } >
                <Container fluid>
                <Row>
                    <Card>
                        <Card.Header cardTitle='INCLUIR PORTARIAS' style={{ color: '#5992ED' }}/>
                        <Card.Content>
                            <Group >
                                <Row >
                                    <Col className='col-sm-12 px-6'>
                                        <Input className='my-3'
                                               type='text'
                                               label='Tipo da Portaria'
                                               placeholder='Digite o nome da Portaria'
                                               name='nome_portarias'
                                               {...register('nome_portarias', {
                                                   required: 'Campo Portaria é obrigatório',
                                               })}
                                               onChange={handleChange}
                                        />
                                        {errors.nome_portarias && (
                                            <Message category='feedback' messageTitle= 'ERRO:' type='danger' icon="fas fa-check-circle"
                                                     onCloseButtonClick={() => setMessage(prevData => ({...prevData, open: false}))}>
                                                <ErrorMessage errors = { errors } name="nome_portarias" ></ErrorMessage>
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
                                type='submit'>
                                <i className="fas fa-save "></i>
                                Salvar
                            </Button>
                            <Button primary
                                    onClick={voltarPagina}
                                    style={{ backgroundColor: '#f8f5f5', color: '#1351b4', }}>
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

export default PortariaCreateEdit;

