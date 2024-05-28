
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import AnyAttribute, { asObject, asString } from 'react-any-attr';
import { Breadcrumb, Button, Card, Row, Container, Col, Carousel, Checkbox, DateTimePicker, Divider, Input, Radio, Select, Loading, MagicButton, Message, Textarea, Switch, Upload, Wizard, List, Item, Pagination, Tag } from '../components';
import CustomTag from '../components/CustomTag';
import Table from '../components/Table';
import Menu from '../components/Menu';
import SkipLink from '../components/SkipLink';
import Modal from '../components/Modal';
import Formulario from '../pages/Formulario';
import CookieBar from '../components/CookieBar';
import Step from '../components/Step';
import Tab from '../components/Tab';
import Notification from '../components/Notification';
import { loremIpsum } from 'react-lorem-ipsum';
import Avatar from '../components/Avatar';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import uniqueId from 'lodash.uniqueid';



const Tests : React.FC = () => {
    const [teste, setTeste] = useState<boolean>(true);
    const [teste2, setTeste2] = useState<string>('');
    const [valorSelect, setValorSelect] = useState<string>('1');
    const [valorSelectMultiplo, setValorSelectMultiplo] = useState<string[]>(['1']);
    const [radioSelecionado, setRadioSelecionado] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [currentStep, setCurrentStep] = useState<number>(1);

    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const refAvatar = useRef(null);

    const imageSample = 'data:image/png;base64,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';

    const handleTeste = (valor: any) => {
        setTeste2((teste2ant) => {
            setValorSelect(valor);
            return teste2ant;
        });
    };


    const rotulos = ['RÓTULO 1', 'RÓTULO 2', 'RÓTULO 3'];
    const linhas = ['Texto 1', 'Texto 2', 'Texto 2', 'Texto 3'];
    const [bla, setBla] = useState('');

    return (
        <>
            <Header 
                urlLogo="https://sisweb.tesouro.gov.br/apex/f?p=2501:9::::9:P9_ID_PUBLICACAO_ANEXO:16884" 
                systemName="Assinatura" 
                title="Título do " 
                subTitle="Subtítulo do Header"

                quickAccessLinks={[
                    {label: 'Acesso Rápido 1', href: 'javascript:void(0);'},
                    {label: 'Acesso Rápido 2', href: 'javascript:void(0);'},
                    {label: 'Acesso Rápido 3', href: 'javascript:void(0);'},
                    {label: 'Acesso Rápido 4', href: 'javascript:void(0);'}
                ]}

                features={[
                    {label: 'Funcionalidade 1', icon: 'fas fa-chart-bar', href: 'https://google.com/'},
                    {label: 'Funcionalidade 2', icon: 'fas fa-headset', onClick: () => {alert('Clicou!');} },
                    {label: 'Funcionalidade 3', icon: 'fas fa-comment'},
                    {label: 'Funcionalidade 4', icon: 'fas fa-adjust'},
                ]}

                loggedIn={loggedIn}
                onClickLogin={() => {
                    /** Realizar as ações necessárias para o login */
                    setLoggedIn(true);
                }}
                onSearch={(searchTerm) => {
                    alert(`Buscando o termo "${searchTerm}"`);
                }}
                avatar={<Avatar imageSrc='https://picsum.photos/id/823/400' />}
            />


            <Button circle
                icon='fas fa-ellipsis-v' 
                dropdownItems={
                    <> 
                        <Button isItem icon="fas fa-heartbeat" >Link de Acesso</Button>
                        <Button isItem icon="fas fa-heartbeat" >Link de Acesso</Button>
                        <Button isItem icon="fas fa-heartbeat" >Link de Acesso</Button>
                    </>
                }
            />

            <CookieBar />
            <SkipLink 
                data={[
                    {
                        label: 'Ir para o conteúdo (1/4)',
                        link: '#main-component'
                    },
                    {
                        label: 'Ir para o conteúdo (2/4)',
                        link: '#main-component'
                    },
                    {
                        label: 'Ir para o conteúdo (3/4)',
                        link: '#main-component'
                    },
                    {
                        label: 'Ir para o conteúdo (4/4)',
                        link: '#main-component'
                    }
                ]}        
            />


            <Container fluid>
                <Row>
                    <Breadcrumb>
                        <Breadcrumb.Item home></Breadcrumb.Item>
                        <Breadcrumb.Item href="#" target="_blank">Teste 1</Breadcrumb.Item>
                        <Breadcrumb.Item href="#">Página Ancestral Com Título Grande</Breadcrumb.Item>
                    </Breadcrumb>
                </Row>

                <Row>
                    <Button primary><FontAwesomeIcon icon={faCoffee} className="mr-1" />Primário</Button>
                    <Button secondary><FontAwesomeIcon icon={faCoffee} className="mr-1" />Secundário</Button>
                    <Button>Terceário</Button>
                    <Button primary inverted>Invertido</Button>
                    <Button type="submit" onClick={() => alert('risos')} primary circle><FontAwesomeIcon icon={faCoffee} className="mr-1" /></Button>
                    <Button primary inverted block>Invertido</Button>
                </Row>
                <br />
                <Row>
                    <Col sm={4}>
                        <Card density="small">
                            <Card.Header cardImageUrl='https://picsum.photos/id/823/400' cardTitle='Título' cardSubtitle='Subtítulo'></Card.Header>
                            <Card.Content>Conteúdo</Card.Content>
                            <Card.Footer>Footer do Card</Card.Footer>
                        </Card>
                    </Col>
                    <Col lg={2} sm={3}>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Carousel interno>
                            <Carousel.Page active pageTitle='Teste1' backgroundColor='blue-10' stepName="Step 01">

                            </Carousel.Page>
                            <Carousel.Page pageTitle='Teste2' backgroundColor='blue-10'>

                            </Carousel.Page>

                            <Carousel.Page pageTitle='Teste3' backgroundColor='blue-10'>

                            </Carousel.Page>

                            <Carousel.Page pageTitle='Teste4' backgroundColor='blue-10'>

                            </Carousel.Page>
                            <Carousel.Page pageTitle='Teste5' backgroundColor='blue-10'>

                            </Carousel.Page>
                        </Carousel>
                    </Col>
                </Row>
                <Row></Row>
                <Row>
                    <Col>
                        <Checkbox id="check-1" indeterminate parentGroup="checkgroup01" label="Selecionar Todos"></Checkbox>
                        <Checkbox id="check-2" childOf="checkgroup01" label="Opção 1"></Checkbox>
                        <Checkbox id="check-3" childOf="checkgroup01" label="Opção 2"></Checkbox>
                        <Checkbox id="check-4" childOf="checkgroup01" label="Opção 3"></Checkbox>

                        <div className="mb-1">
                            <div className="br-checkbox">
                                <AnyAttribute attributes={{ indeterminate: 'indeterminate' }}><input id="checkbox-ind1" name="checkbox-ind1" type="checkbox" aria-label="selecionar tudo" defaultChecked={true} data-parent="check-01" /></AnyAttribute>

                                <label htmlFor="checkbox-ind1">Selecionar tudo</label>
                            </div>
                        </div>
                        <div className="mb-1">
                            <div className="br-checkbox">
                                <input id="checkbox-01" name="checkbox-01" type="checkbox" aria-label="opção 1" defaultChecked={true} data-child="check-01" />
                                <label htmlFor="checkbox-01">Opção 1</label>
                            </div>
                        </div>
                        <div className="mb-1">
                            <div className="br-checkbox">
                                <input id="checkbox-02" name="checkbox-02" type="checkbox" aria-label="opção 2" data-child="check-01" />
                                <label htmlFor="checkbox-02">Opção 2</label>
                            </div>
                        </div>
                        <div className="mb-1">
                            <div className="br-checkbox">
                                <input id="checkbox-03" name="checkbox-03" type="checkbox" aria-label="opção 3" data-child="check-01" />
                                <label htmlFor="checkbox-03">Opção 3</label>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <DateTimePicker />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Divider dashed size="lg" mx={2} />
                    </Col>

                </Row>
                <br /><br /><br /><br /><br />

            </Container>

            <Container fluid>
                <Row>
                    <Col sm={2}>
                        <Input  label="Teste de Input" />
                    </Col>
                    <Col>
                        <Input  label="Teste de Input 2" icon="fas fa-user-tie" button={<Button type="button" icon="fas fa-eye" />} />
                    </Col>
                    <Col>
                        <DateTimePicker id="inputDateTime" label="Informe a Data" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input id="testeInput3" label="Teste de Input 2" icon="fas fa-user-tie" highlight />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input id="testeInput4" label="Teste de Input 4" inline value={teste2} onChange={(event) => setTeste2(event.currentTarget.value)} />
                    </Col>
                </Row>
            </Container>

            <Container fluid>
                <Row>
                    <Col>
                        <Radio id="op-1" name="radio" value="op-1" label="opcao-1" checked={radioSelecionado === 'op-1'} onChange={(event) => setRadioSelecionado(event.currentTarget.value)} />
                        <Radio id="op-2" name="radio" value="op-2" label="opcao-2" checked={radioSelecionado === 'op-2'} onChange={(event) => setRadioSelecionado(event.currentTarget.value)} />
                        <Radio id="op-3" name="radio" value="op-3" label="opcao-3" checked={radioSelecionado === 'op-3'} onChange={(event) => setRadioSelecionado(event.currentTarget.value)} />
                    </Col>
                </Row>
            </Container>

            <Container fluid>
                <Row>
                    <Col>
                        <Select id="select1" type="single" label="Selecione abaixo" placeholder='Selecione um item' value={valorSelect}  onChange={(value : string) => { setValorSelect(value); }} options={
                            useMemo(() => [
                                { label: 'Teste 1', value: '1' },
                                { label: 'Teste 2', value: '2' },
                                { label: 'Teste 3', value: '3' },
                                { label: 'Teste 4', value: '4' },
                                { label: 'Teste 5', value: '5' },
                                { label: 'Teste 6', value: '6' },
                                { label: 'Teste 7', value: '7' },
                                { label: 'Teste 8', value: '8' },
                                { label: 'Teste 9', value: '9' },
                                { label: 'Teste 10', value: '10' },
                                { label: 'Teste 11', value: '11' },
                                { label: 'Teste 12', value: '12' },
                                { label: 'Teste 13', value: '13' }
                            ], [])} />
                        

                        <Button onClick={() => setValorSelect('')}>Teste</Button>
                        <span>{valorSelect}</span>

                        <Select id="select2" type="multiple" label="Selecione abaixo" placeholder='Selecione um item' value={valorSelectMultiplo}  onChange={(value : string[]) => { console.log(value); setValorSelectMultiplo(value); }} options={
                            useMemo(() => [
                                { label: 'Teste 1', value: '1' },
                                { label: 'Teste 2', value: '2' },
                                { label: 'Teste 3', value: '3' },
                                { label: 'Teste 4', value: '4' }
                            ], [])
                        } />

                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col>
                        <Loading progress={15} />
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col>
                        <MagicButton>Teste</MagicButton>
                    </Col>
                </Row>
            </Container>
            <br /><br /><br /><br /><br />
            <Container>
                <Row>
                    <Col>
                        <p><Message category='feedback' type="danger" icon="fas fa-times-circle">O CPF deve conter apenas dígitos.</Message></p>
                        <p><Message category='feedback' type="success" icon="fas fa-check-circle">Campo correto.</Message></p>
                        <p><Message category='feedback' type="warning" icon="fas fa-exclamation-triangle">A tecla CAPS-LOCK está ativada.</Message></p>
                        <p><Message category='feedback' type="info" icon="fas fa-check-circle">Os arquivos devem ser no formato PNG, JPG, PDF e ter no máximo 1GB.</Message></p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Message category='message' messageTitle="Data de início do afastamento inválida." type="danger" icon="fas fa-times-circle">O CPF deve conter apenas dígitos.</Message>
                        <Message category='message' messageTitle="Sucesso." type="success" icon="fas fa-check-circle">Campo correto.</Message>
                        <Message category='message' messageTitle="Informação." type="warning" icon="fas fa-exclamation-triangle">A tecla CAPS-LOCK está ativada.</Message>
                        <Message category='message' messageTitle="Atenção." type="info" icon="fas fa-check-circle">Os arquivos devem ser no formato PNG, JPG, PDF e ter no máximo 1GB.</Message>
                    </Col>
                </Row>
            </Container>




            <br /><br /><br /><br /><br />

            <Container fluid>
                <Row>
                    <Col>
                        <Textarea maxLength={100} showCharacterCounter label="teste" status="success" feedbackText="Deu muito ruim kkkk"></Textarea>
                    </Col>
                </Row>

            </Container>

            <br /><br />

            <Container>
                <Row>
                    <Col>
                        <Switch id="testeSwitch" label="Teste" />
                    </Col>
                </Row>
            </Container>

            <br /><br /><br /><br /><br /><br />

            <Container>
                <Row>
                    <Col>
                        <Upload id="meuupload" label="Teste Upload" uploadTimeout={() => {
                            return new Promise((resolve) => {
                                return setTimeout(resolve, 3000);
                            });
                        }} />
                    </Col>
                </Row>
            </Container>


            <br /><br /><br /><br />

            <Container>
                <Row>
                    <Col>
                        <Wizard height="400px" onConclude={(event) => alert('risos')}>
                            <Wizard.Panel title="Dados Pessoais">
                Conteúdo aqui - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </Wizard.Panel>
                            <Wizard.Panel title="Validar Dados">
                Conteúdo aqui - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </Wizard.Panel>
                            <Wizard.Panel title="Habilitar Cadastro">
                Conteúdo aqui - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </Wizard.Panel>
                            <Wizard.Panel title="Cadastrar Senha">
                Conteúdo aqui - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </Wizard.Panel>
                            <Wizard.Panel title="Finalizar">
                Conteúdo aqui - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </Wizard.Panel>
                        </Wizard>

                        <Wizard vertical height="400px" onConclude={(event) => alert('risos')}>
                            <Wizard.Panel title="Dados Pessoais">
                Conteúdo aqui - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </Wizard.Panel>
                            <Wizard.Panel title="Validar Dados">
                Conteúdo aqui - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </Wizard.Panel>
                            <Wizard.Panel title="Habilitar Cadastro">
                Conteúdo aqui - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </Wizard.Panel>
                            <Wizard.Panel title="Cadastrar Senha">
                Conteúdo aqui - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </Wizard.Panel>
                            <Wizard.Panel title="Finalizar">
                Conteúdo aqui - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </Wizard.Panel>
                        </Wizard>
                    </Col>
                </Row>
            </Container>

            <Container>



                <List title="Título (opcional)">
                    {rotulos.map((rotulo, index) => (
                        <CustomTag key={`grupo-${index}`}>
                            <Item 
                                collapsable 
                                showDividerAfter
                                subItems={<>
                                    {linhas.map((linha, index2) => (
                                        <Item key={`item-${index}-${index2}`} >
                                            <Row>
                                                <Col auto>
                                                    <i className="fas fa-heartbeat" aria-hidden="true"></i>
                                                </Col>
                                                <Col>
                                                    ITEM
                                                    {linha}
                                                </Col>
                                                <Col auto>
                                                    META
                                                </Col>
                                            </Row>
                                        </Item>
                                    ))}
                                </>}
                            >{rotulo}</Item>
                        </CustomTag>
                    ))}

                </List>
            </Container>

            <br /><br /><br /><br />

            <List title="Título (opcional)">
                {linhas.map((linha, index) => (
                    <Item key={`item-ex-1-${index}`} className="align-items-center" showDividerAfter>
                        <Row>
                            <Col auto>
                                <i className="fas fa-heartbeat" aria-hidden="true"></i>
                            </Col>
                            <Col>
                ITEM
                                {linha}
                            </Col>
                            <Col auto>
                                <Checkbox id={`check-lista-${index}`} />
                            </Col>
                        </Row>
                    </Item>
                ))}
            </List>

            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

            <Container>
                <Row>
                    <Col>
                        <Table
                            title="Minha Tabela JSON"
                            headers={
                                useMemo(() => ['ID', 'Nome'], [])    
                            }
                            data={
                                useMemo(() =>[
                                    {
                                        id: 1,
                                        nome: 'Josué'
                                    },
                                    {
                                        id: 2,
                                        nome: 'Jacinda'
                                    },
                                    {
                                        id: 3,
                                        nome: 'Cláudia'
                                    }
                                ], [])
                            }

                            showPagination={false}
                            showDensityButtons={false}
                            showSearch={false}
                            showSelectedBar={false}
                            showTopBar={false}
                        />



                    </Col>
                </Row>

            </Container>

            <Container>
                <Row>
                    <Col>
                        <Table
                            id="minhatabela2"
                            title="Minha Tabela"
                            headers={useMemo(() => [
                                { field: 'codigo', label: 'Código' },
                                { field: 'endereco', label: 'Endereço' },
                                { field: 'nome', label: 'Nome' }

                            ], [])}
                            endpoint="https://sisweb.tesouro.gov.br/apex/cosis/public/sistemas?pageSize=10&pageNumber=0"
                        />



                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col>
                        <Button circle icon="fas fa-bars" data-target="#menuprincipal" data-toggle="menu"></Button>Acionar Menu
                        <Menu
                            id="menuprincipal"
                            shadow
                            systemName="Meu Sistema"
                            systemLogoUrl={imageSample}
                            data={[
                                {
                                    label: 'Teste 1',
                                    link: 'https://google.com/',
                                    icon: 'fas fa-moon'
                                },
                                {
                                    label: 'Teste 2',
                                    icon: 'fas fa-moon',
                                    submenu: [
                                        {
                                            label: 'Teste 3',
                                            link: 'https://google.com/',
                                            icon: 'fas fa-moon'
                                        },
                                        {
                                            label: 'Teste 3.4',
                                            icon: 'fas fa-moon',
                                            submenu: [
                                                {
                                                    label: 'Teste X',
                                                    icon: 'fas fa-moon',
                                                    link: 'https://google.com/'
                                                }
                                            ]
                                        },
                                        {
                                            label: 'Teste 4',
                                            link: 'https://google.com/',
                                            icon: 'fas fa-moon'
                                        }
                                    ]
                                }
                            ]}
                            logos={[
                                {
                                    src: imageSample,
                                    alt: 'Logo 01'
                                },
                                {
                                    src: imageSample,
                                    alt: 'Logo 02'
                                },
                            ]}

                            externalLinks={[
                                {
                                    link: 'https://google.com/',
                                    label: 'Link externo 01'
                                },
                                {
                                    link: 'https://google.com/',
                                    label: 'Link externo 02'
                                }
                            ]}

                            socialNetworks={[
                                {
                                    link: 'javascript:void(0)',
                                    icon: 'fab fa-facebook-f',
                                    name: 'Facebook'
                                },
                                {
                                    link: 'javascript:void(0)',
                                    icon: 'fab fa-twitter',
                                    name: 'Twitter'
                                },
                                {
                                    link: 'javascript:void(0)',
                                    icon: 'fab fa-linkedin-in',
                                    name: 'Linkedin'
                                },
                                {
                                    link: 'javascript:void(0)',
                                    icon: 'fab fa-whatsapp',
                                    name: 'Whatsapp'
                                }
                            ]}

                            info={<div className="text-center text-down-01">
                Todo o conteúdo deste site está publicado sob a licença <strong>Creative Commons Atribuição-SemDerivações 3.0</strong>
                            </div>}

                        />
                    </Col>
                </Row>

            </Container>

            <Container>
                <Row>
                    <Col>
                        <Modal title="Retornar para página inicial?" showCloseButton>
                            <Modal.Body>
                  Você está sendo redirecionado para a página inicial do sistema
                            </Modal.Body>
                            <Modal.Footer justify-content='end'>
                                <Button secondary small m={2}>Ação 1</Button>
                                <Button secondary small m={2}>Ação 2</Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col>
                        {currentPage === 1 && <span>Estou na Página 1</span>}
                        {currentPage === 2 && <span>Estou na Página 2</span>}
                        {currentPage === 3 && <span>Estou na Página 3</span>}
              
                        <Pagination onChange={(newPage) => setCurrentPage(newPage)} pageCount={100} ellipsis={
                            useMemo(() => [
                                {start: 5, end: 95}
                            ], [])
                        }/>
                    </Col>
                </Row>
            </Container>
            
            <Container>
                <Row>
                    <Col auto>
                        <Step 
                            steps={['Exemplo de Rótulo 1', 'Exemplo de Rótulo 2', 'Exemplo de Rótulo 3']}
                            orientation="vertical"
                            labelPosition="right" 
                            initialStep={1}
                            onChange={(value) => setCurrentStep(value)}
                        />
                    </Col>
                    <Col auto>
                        <Step 
                            steps={['Exemplo de Rótulo 1', 'Exemplo de Rótulo 2', 'Exemplo de Rótulo 3']}
                            orientation="vertical"
                            labelPosition="left" 
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Step
                            my={5}
                            steps={[
                                {
                                    label: 'Acesse sua conta',
                                    status: 'success'
                                },
                                {
                                    label: 'Dados da entrega',
                                    status: 'info'
                                },
                                {
                                    label: 'Dados de pagamento',
                                    status: 'danger'
                                },
                                {
                                    label: 'Finalizar',
                                    status: 'warning'
                                }
                            ]}
                            labelPosition="top" 
                        />
                        
                        <Step 
                            my={5}
                            steps={['Exemplo de Rótulo 1', 'Exemplo de Rótulo 2', 'Exemplo de Rótulo 3']}
                            orientation="horizontal"
                            labelPosition="bottom" 
                        />
                        <Step 
                            my={5}
                            steps={[
                                {
                                    label: 'Acesse sua conta',
                                    icon: 'fas fa-lock'
                                },
                                {
                                    label: 'Dados da entrega',
                                    icon: 'fas fa-truck'
                                },
                                {
                                    label: 'Dados de pagamento',
                                    icon: 'fas fa-credit-card'
                                },
                                {
                                    label: 'Finalizar',
                                    icon: 'fas fa-check'
                                }
                            ]}
                            orientation="horizontal"
                            labelPosition="right" 
                        />
                        <Step 
                            my={5}
                            steps={['Exemplo de Rótulo 1', 'Exemplo de Rótulo 2', 'Exemplo de Rótulo 3']}
                            orientation="horizontal"
                            labelPosition="left" 
                        />



                        <Step 
                            my={5}
                            type="void"
                            steps={['Exemplo de Rótulo 1', 'Exemplo de Rótulo 2', 'Exemplo de Rótulo 3']}
                            orientation="horizontal"
                            labelPosition="left" 
                        />

                        <Step 
                            my={5}
                            type="void"
                            steps={[
                                {
                                    label: 'Acesse sua conta',
                                    icon: 'fas fa-lock',
                                    status: 'success'
                                },
                                {
                                    label: 'Dados da entrega',
                                    icon: 'fas fa-truck',
                                    status: 'info'
                                },
                                {
                                    label: 'Dados de pagamento',
                                    icon: 'fas fa-credit-card',
                                    status: 'danger'
                                },
                                {
                                    label: 'Finalizar',
                                    icon: 'fas fa-check',
                                    status: 'warning'
                                }
                            ]}
                            orientation="horizontal"
                            labelPosition="left" 
                        />

                        <Step 
                            my={5}
                            type="simple"
                            steps={['Exemplo de Rótulo 1', 'Exemplo de Rótulo 2', 'Exemplo de Rótulo 3']}
                            orientation="horizontal"
                            labelPosition="left" 
                        />

                        <Step 
                            my={5}
                            type="text"
                            steps={['Exemplo de Rótulo 1', 'Exemplo de Rótulo 2', 'Exemplo de Rótulo 3']}
                            orientation="horizontal"
                            labelPosition="left" 
                        />
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col>
                        <Tab>
                            <Tab.Content title="Sobre">
                                Painel Sobre
                            </Tab.Content>
                            <Tab.Content title="Todos">
                                Painel Todos
                            </Tab.Content>
                            <Tab.Content title="Notícias">
                                Painel Notícias
                            </Tab.Content>
                            <Tab.Content title="Serviços">
                                Painel Serviços
                            </Tab.Content>
                            <Tab.Content title="Aplicativos">
                                Painel Aplicativos
                            </Tab.Content>
                            <Tab.Content title="Mídias">
                                Painel Mídias
                            </Tab.Content>
                        </Tab>

                        <Tab>
                            <Tab.Content title="Sobre" icon="fas fa-image">
                                Painel Sobre
                            </Tab.Content>
                            <Tab.Content title="Todos" icon="fas fa-image">
                                Painel Todos
                            </Tab.Content>
                            <Tab.Content title="Notícias" icon="fas fa-image">
                                Painel Notícias
                            </Tab.Content>
                            <Tab.Content title="Serviços" icon="fas fa-image">
                                Painel Serviços
                            </Tab.Content>
                            <Tab.Content title="Aplicativos" icon="fas fa-image">
                                Painel Aplicativos
                            </Tab.Content>
                            <Tab.Content title="Mídias" icon="fas fa-image">
                                Painel Mídias
                            </Tab.Content>
                        </Tab>

                        <Tab>
                            <Tab.Content title="Sobre" subTitle='(124)'>
                                Painel Sobre
                            </Tab.Content>
                            <Tab.Content title="Todos" subTitle='(74)'>
                                Painel Todos
                            </Tab.Content>
                            <Tab.Content title="Notícias" subTitle='(16)'>
                                Painel Notícias
                            </Tab.Content>
                            <Tab.Content title="Aplicativos" subTitle='(12)'>
                                Painel Aplicativos
                            </Tab.Content>
                        </Tab>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col>
                        <Notification name="Fulano da Silva" email="nome.sobrenome@dominio.gov">
                            <Tab>
                                <Tab.Content icon="fas fa-bell" title="Notificações" onlyIcon>
                                    <List>
                                        <Button isItem icon="fas fa-heartbeat" >Link de Acesso</Button>
                                        <Button isItem icon="fas fa-heartbeat" >Link de Acesso</Button>
                                        <Button isItem icon="fas fa-heartbeat" >Link de Acesso</Button>
                                    </List>
                                </Tab.Content>
                                <Tab.Content icon="fas fa-envelope" title="Mensagens" onlyIcon>
                                    <List>
                                        <Button isItem>
                                            <Tag type="status" density='small' status="warning"/><Tag type="status" density='small' status="warning"/>
                                            <span className="text-bold">Título</span><span className="text-medium mb-2">25 de out</span>{loremIpsum({p:1, random:true}).map((text, index) => <span key={index}>{text}</span>)}
                                        </Button>
                                        <Button isItem>
                                            <Tag type="status" density='small' status="warning"/><Tag type="status" density='small' status="warning"/>
                                            <span className="text-bold">Título</span><span className="text-medium mb-2">25 de out</span><span>Nostrud consequat culpa ex mollit aute. Ex ex veniam ea labore laboris duis duis elit. Ex aute dolor enim aute Lorem dolor. Duis labore ad anim culpa. Non aliqua excepteur sunt eiusmod ex consectetur ex esse laborum velit ut aute.</span>
                                        </Button>
                                        <Button isItem>
                                            <Tag type="status" density='small' status="warning"/><Tag type="status" density='small' status="warning"/>
                                            <span className="text-bold">Título</span><span className="text-medium mb-2">25 de out</span><span>Nostrud consequat culpa ex mollit aute. Ex ex veniam ea labore laboris duis duis elit. Ex aute dolor enim aute Lorem dolor. Duis labore ad anim culpa. Non aliqua excepteur sunt eiusmod ex consectetur ex esse laborum velit ut aute.</span>
                                        </Button>
                                    </List>
                                </Tab.Content>
                            </Tab>
                        </Notification>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col>
                        <Avatar onClick={() => console.log(refAvatar.current)} ref={refAvatar} mr={3} icon="fas fa-user" />
                        <Avatar mr={3} icon="fas fa-user" density="medium" /> 
                        <Avatar mr={3} icon="fas fa-user" density="large" /> 
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Avatar mr={3} imageSrc="https://picsum.photos/id/1005/400" />
                        <Avatar mr={3} imageSrc="https://picsum.photos/id/287/400" density="medium" /> 
                        <Avatar mr={3} imageSrc="https://picsum.photos/id/357/400" density="large" /> 
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Avatar mr={3} bgColor="bg-violet-50" letter="W" />
                        <Avatar mr={3} bgColor="bg-orange-50" letter="A" density="medium" /> 
                        <Avatar mr={3} bgColor="bg-green-50"  letter="H" density="large" /> 
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Avatar imageSrc='https://picsum.photos/id/1005/400' dropdown>
                            <List>
                                <Button isItem>
                                    <Tag type="status" density='small' status="warning"/><span className="text-bold">Título</span><span className="d-block text-medium mb-2">25 de out</span>{loremIpsum({p:1, random:true}).map((text, index) => <span key={index}>{text}</span>)}
                                </Button>
                                <Button isItem>
                                    <Tag type="status" density='small' status="warning"/><span className="text-bold">Título</span><span className="d-block text-medium mb-2">25 de out</span>{loremIpsum({p:1, random:true}).map((text, index) => <span key={index}>{text}</span>)}
                                </Button>
                                <Button isItem>
                                    <Tag type="status" density='small' status="warning"/><span className="text-bold">Título</span><span className="d-block text-medium mb-2">25 de out</span>{loremIpsum({p:1, random:true}).map((text, index) => <span key={index}>{text}</span>)}
                                </Button>
                            </List>
                        </Avatar>
                    </Col>
                </Row>
                
            </Container>

  


            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            <Footer 
                urlLogo={'https://cdngovbr-ds.estaleiro.serpro.gov.br/design-system/images/logo-negative.png'} 
                links={[
                    {
                        category: 'Categoria 1',
                        items: [
                            {
                                label: 'Ad deserunt nostrud',
                                link: 'javascript:void(0);'
                            },
                            {
                                label: 'Nulla occaecat eiusmod',
                                link: 'javascript:void(0);'
                            },
                            {
                                label: 'Nulla occaecat eiusmod',
                                link: 'javascript:void(0);'
                            }

                        ]
                    },
                    {
                        category: 'Categoria 2',
                        items: [
                            {
                                label: 'Ex qui laborum consectetur aute commodo',
                                link: 'javascript:void(0);'
                            },
                            {
                                label: 'Nulla occaecat eiusmod',
                                link: 'javascript:void(0);'
                            },
                            {
                                label: 'Ex qui laborum consectetur aute commodo',
                                link: 'javascript:void(0);'
                            }

                        ]
                    },
                    {
                        category: 'Categoria 3',
                        items: [
                            {
                                label: 'Ad deserunt nostrud',
                                link: 'javascript:void(0);'
                            },
                            {
                                label: 'Ex qui laborum consectetur aute commodo',
                                link: 'javascript:void(0);'
                            },
                            {
                                label: 'Nulla occaecat eiusmod',
                                link: 'javascript:void(0);'
                            }

                        ]
                    },
                    {
                        category: 'Categoria 4',
                        items: [
                            {
                                label: 'Ad deserunt nostrud',
                                link: 'javascript:void(0);'
                            },
                            {
                                label: 'Ex qui laborum consectetur aute commodo',
                                link: 'javascript:void(0);'
                            },
                            {
                                label: 'Nulla occaecat eiusmod',
                                link: 'javascript:void(0);'
                            }

                        ]
                    },
                    {
                        category: 'Categoria 5',
                        items: [
                            {
                                label: 'Ex qui laborum consectetur aute commodo',
                                link: 'javascript:void(0);'
                            },
                            {
                                label: 'Nulla occaecat eiusmod',
                                link: 'javascript:void(0);'
                            },
                            {
                                label: 'Nulla occaecat eiusmod',
                                link: 'javascript:void(0);'
                            }

                        ]
                    },
                    {
                        category: 'Categoria 6',
                        items: [
                            {
                                label: 'Ex qui laborum consectetur aute commodo',
                                link: 'javascript:void(0);'
                            },
                            {
                                label: 'Nulla occaecat eiusmod',
                                link: 'javascript:void(0);'
                            },
                            {
                                label: 'Nulla occaecat eiusmod',
                                link: 'javascript:void(0);'
                            }

                        ]
                    },
                ]} 
                socialNetworks={[
                    {name: 'Facebook', link: 'javascript:void(0);', icon: 'fab fa-facebook-square'},
                    {name: 'Twitter', link: 'javascript:void(0);', icon: 'fab fa-twitter-square'},
                    {name: 'Linkedin', link: 'javascript:void(0);', icon: 'fab fa-linkedin'}
                ]}

                userLicenseText={<>Texto destinado a exibição de informações relacionadas à&nbsp;<b>licença de uso.</b></>}
            />
        </>
    );
};

export default Tests;