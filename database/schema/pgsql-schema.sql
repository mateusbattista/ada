--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: avaliacoes_executoras; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.avaliacoes_executoras (
    id bigint NOT NULL,
    executora_id bigint NOT NULL,
    nome_avaliador character varying(255) NOT NULL,
    data_avaliacao date NOT NULL,
    situacao character varying(255) NOT NULL,
    justificativa text NOT NULL,
    nota_tecnica character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: avaliacoes_executoras_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.avaliacoes_executoras_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: avaliacoes_executoras_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.avaliacoes_executoras_id_seq OWNED BY public.avaliacoes_executoras.id;


--
-- Name: comum_estado; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comum_estado (
    id integer NOT NULL,
    estado character varying(19) DEFAULT NULL::character varying,
    sigla character varying(2) DEFAULT NULL::character varying
);


--
-- Name: comum_municipio; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comum_municipio (
    ibge character varying(12) DEFAULT NULL::character varying,
    nome character varying(32) DEFAULT NULL::character varying,
    estado_id character varying(2) DEFAULT NULL::character varying
);


--
-- Name: cronograma; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cronograma (
    id bigint NOT NULL,
    mobilizacao character varying(50) NOT NULL,
    diagnostico character varying(50),
    projeto character varying(50),
    liberacao character varying(50),
    visita character varying(50),
    avaliacao character varying(50),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: cronograma_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cronograma_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cronograma_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cronograma_id_seq OWNED BY public.cronograma.id;


--
-- Name: entidades_entidadeexecutora; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.entidades_entidadeexecutora (
    id bigint NOT NULL,
    cnpj character varying(255) NOT NULL,
    razao_social character varying(255),
    nome_fantasia character varying(255) NOT NULL,
    sigla character varying(255) NOT NULL,
    cep character varying(255) NOT NULL,
    endereco character varying(255) NOT NULL,
    telefone_instituicao character varying(255) NOT NULL,
    fax character varying(255),
    email_instituicao character varying(255) NOT NULL,
    site_instituicao character varying(255),
    situacao character varying(255) NOT NULL,
    estado_id character varying(255) NOT NULL,
    municipio_id integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: entidades_entidadeexecutora_documentos_comprobatorios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.entidades_entidadeexecutora_documentos_comprobatorios (
    id bigint NOT NULL,
    entidadegestora_id character varying(255) NOT NULL,
    "arquivocomprovaçao_id" character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: entidades_entidadeexecutora_documentos_comprobatorios_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.entidades_entidadeexecutora_documentos_comprobatorios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: entidades_entidadeexecutora_documentos_comprobatorios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.entidades_entidadeexecutora_documentos_comprobatorios_id_seq OWNED BY public.entidades_entidadeexecutora_documentos_comprobatorios.id;


--
-- Name: entidades_entidadeexecutora_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.entidades_entidadeexecutora_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: entidades_entidadeexecutora_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.entidades_entidadeexecutora_id_seq OWNED BY public.entidades_entidadeexecutora.id;


--
-- Name: entidades_entidadeexecutora_responsaveis; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.entidades_entidadeexecutora_responsaveis (
    id bigint NOT NULL,
    entidadeexecutora_id integer NOT NULL,
    responsaveis_id character varying(30) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: entidades_entidadeexecutora_responsaveis_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.entidades_entidadeexecutora_responsaveis_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: entidades_entidadeexecutora_responsaveis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.entidades_entidadeexecutora_responsaveis_id_seq OWNED BY public.entidades_entidadeexecutora_responsaveis.id;


--
-- Name: entidades_entidadegestora; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.entidades_entidadegestora (
    id bigint NOT NULL,
    cnpj character varying(255) NOT NULL,
    razao_social character varying(255) NOT NULL,
    nome_fantasia character varying(255) NOT NULL,
    sigla character varying(255) NOT NULL,
    cep character varying(255) NOT NULL,
    endereco character varying(255) NOT NULL,
    telefone_instituicao character varying(255) NOT NULL,
    fax character varying(255),
    email_instituicao character varying(255),
    site_instituicao character varying(255),
    situacao character varying(255) NOT NULL,
    estado_id character varying(255) NOT NULL,
    municipio_id integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: entidades_entidadegestora_documentos_comprobatorios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.entidades_entidadegestora_documentos_comprobatorios (
    id bigint NOT NULL,
    entidadegestora_id character varying(255) NOT NULL,
    "arquivocomprovaçao_id" character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: entidades_entidadegestora_documentos_comprobatorios_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.entidades_entidadegestora_documentos_comprobatorios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: entidades_entidadegestora_documentos_comprobatorios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.entidades_entidadegestora_documentos_comprobatorios_id_seq OWNED BY public.entidades_entidadegestora_documentos_comprobatorios.id;


--
-- Name: entidades_entidadegestora_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.entidades_entidadegestora_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: entidades_entidadegestora_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.entidades_entidadegestora_id_seq OWNED BY public.entidades_entidadegestora.id;


--
-- Name: entidades_entidadegestora_responsaveis; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.entidades_entidadegestora_responsaveis (
    id bigint NOT NULL,
    entidadegestora_id integer NOT NULL,
    responsaveis_id character varying(30) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: entidades_entidadegestora_responsaveis_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.entidades_entidadegestora_responsaveis_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: entidades_entidadegestora_responsaveis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.entidades_entidadegestora_responsaveis_id_seq OWNED BY public.entidades_entidadegestora_responsaveis.id;


--
-- Name: entidades_gestoras_executoras; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.entidades_gestoras_executoras (
    id bigint NOT NULL,
    entidade_gestora_id integer NOT NULL,
    entidade_executora_id character varying(30) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: entidades_gestoras_executoras_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.entidades_gestoras_executoras_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: entidades_gestoras_executoras_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.entidades_gestoras_executoras_id_seq OWNED BY public.entidades_gestoras_executoras.id;


--
-- Name: entidades_responsaveis; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.entidades_responsaveis (
    id bigint NOT NULL,
    nome character varying(255) NOT NULL,
    cpf character varying(255) NOT NULL,
    cargo character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    telefone character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: entidades_responsaveis_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.entidades_responsaveis_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: entidades_responsaveis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.entidades_responsaveis_id_seq OWNED BY public.entidades_responsaveis.id;


--
-- Name: equipe_responsaveis; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.equipe_responsaveis (
    id bigint NOT NULL,
    entidade character varying(255) NOT NULL,
    tipo_equipe character varying(255) NOT NULL,
    cpf character varying(255) NOT NULL,
    nome character varying(255) NOT NULL,
    cargo character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    telefone character varying(255) NOT NULL,
    funcao character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: equipe_responsaveis_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.equipe_responsaveis_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: equipe_responsaveis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.equipe_responsaveis_id_seq OWNED BY public.equipe_responsaveis.id;


--
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- Name: metodologia_planotrabalho; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.metodologia_planotrabalho (
    id bigint NOT NULL,
    mobilizacao text NOT NULL,
    diagnostico text NOT NULL,
    estruturacao text NOT NULL,
    acompanhamento text NOT NULL,
    capacitacao text NOT NULL,
    avaliacao text NOT NULL,
    complemento_avaliacao text NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: metodologia_planotrabalho_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.metodologia_planotrabalho_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: metodologia_planotrabalho_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.metodologia_planotrabalho_id_seq OWNED BY public.metodologia_planotrabalho.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


--
-- Name: personal_access_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;


--
-- Name: planotrabalho; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.planotrabalho (
    id bigint NOT NULL,
    tipo_unidade character varying(40) NOT NULL,
    tipo_parceria character varying(10) NOT NULL,
    n_instrumento_parceria character varying(50) NOT NULL,
    n_processo_sei character varying(50) NOT NULL,
    estado_entidade character varying(50) NOT NULL,
    cronograma_id integer NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    entidade_id integer NOT NULL,
    metodologia_id integer NOT NULL
);


--
-- Name: planotrabalho_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.planotrabalho_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: planotrabalho_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.planotrabalho_id_seq OWNED BY public.planotrabalho.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: avaliacoes_executoras id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.avaliacoes_executoras ALTER COLUMN id SET DEFAULT nextval('public.avaliacoes_executoras_id_seq'::regclass);


--
-- Name: cronograma id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cronograma ALTER COLUMN id SET DEFAULT nextval('public.cronograma_id_seq'::regclass);


--
-- Name: entidades_entidadeexecutora id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entidades_entidadeexecutora ALTER COLUMN id SET DEFAULT nextval('public.entidades_entidadeexecutora_id_seq'::regclass);


--
-- Name: entidades_entidadeexecutora_documentos_comprobatorios id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entidades_entidadeexecutora_documentos_comprobatorios ALTER COLUMN id SET DEFAULT nextval('public.entidades_entidadeexecutora_documentos_comprobatorios_id_seq'::regclass);


--
-- Name: entidades_entidadeexecutora_responsaveis id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entidades_entidadeexecutora_responsaveis ALTER COLUMN id SET DEFAULT nextval('public.entidades_entidadeexecutora_responsaveis_id_seq'::regclass);


--
-- Name: entidades_entidadegestora id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entidades_entidadegestora ALTER COLUMN id SET DEFAULT nextval('public.entidades_entidadegestora_id_seq'::regclass);


--
-- Name: entidades_entidadegestora_documentos_comprobatorios id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entidades_entidadegestora_documentos_comprobatorios ALTER COLUMN id SET DEFAULT nextval('public.entidades_entidadegestora_documentos_comprobatorios_id_seq'::regclass);


--
-- Name: entidades_entidadegestora_responsaveis id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entidades_entidadegestora_responsaveis ALTER COLUMN id SET DEFAULT nextval('public.entidades_entidadegestora_responsaveis_id_seq'::regclass);


--
-- Name: entidades_gestoras_executoras id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entidades_gestoras_executoras ALTER COLUMN id SET DEFAULT nextval('public.entidades_gestoras_executoras_id_seq'::regclass);


--
-- Name: entidades_responsaveis id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entidades_responsaveis ALTER COLUMN id SET DEFAULT nextval('public.entidades_responsaveis_id_seq'::regclass);


--
-- Name: equipe_responsaveis id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.equipe_responsaveis ALTER COLUMN id SET DEFAULT nextval('public.equipe_responsaveis_id_seq'::regclass);


--
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- Name: metodologia_planotrabalho id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.metodologia_planotrabalho ALTER COLUMN id SET DEFAULT nextval('public.metodologia_planotrabalho_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: personal_access_tokens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);


--
-- Name: planotrabalho id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.planotrabalho ALTER COLUMN id SET DEFAULT nextval('public.planotrabalho_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: avaliacoes_executoras avaliacoes_executoras_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.avaliacoes_executoras
    ADD CONSTRAINT avaliacoes_executoras_pkey PRIMARY KEY (id);


--
-- Name: cronograma cronograma_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cronograma
    ADD CONSTRAINT cronograma_pkey PRIMARY KEY (id);


--
-- Name: entidades_entidadeexecutora_documentos_comprobatorios entidades_entidadeexecutora_documentos_comprobatorios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entidades_entidadeexecutora_documentos_comprobatorios
    ADD CONSTRAINT entidades_entidadeexecutora_documentos_comprobatorios_pkey PRIMARY KEY (id);


--
-- Name: entidades_entidadeexecutora entidades_entidadeexecutora_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entidades_entidadeexecutora
    ADD CONSTRAINT entidades_entidadeexecutora_pkey PRIMARY KEY (id);


--
-- Name: entidades_entidadeexecutora_responsaveis entidades_entidadeexecutora_responsaveis_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entidades_entidadeexecutora_responsaveis
    ADD CONSTRAINT entidades_entidadeexecutora_responsaveis_pkey PRIMARY KEY (id);


--
-- Name: entidades_entidadegestora_documentos_comprobatorios entidades_entidadegestora_documentos_comprobatorios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entidades_entidadegestora_documentos_comprobatorios
    ADD CONSTRAINT entidades_entidadegestora_documentos_comprobatorios_pkey PRIMARY KEY (id);


--
-- Name: entidades_entidadegestora entidades_entidadegestora_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entidades_entidadegestora
    ADD CONSTRAINT entidades_entidadegestora_pkey PRIMARY KEY (id);


--
-- Name: entidades_entidadegestora_responsaveis entidades_entidadegestora_responsaveis_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entidades_entidadegestora_responsaveis
    ADD CONSTRAINT entidades_entidadegestora_responsaveis_pkey PRIMARY KEY (id);


--
-- Name: entidades_gestoras_executoras entidades_gestoras_executoras_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entidades_gestoras_executoras
    ADD CONSTRAINT entidades_gestoras_executoras_pkey PRIMARY KEY (id);


--
-- Name: entidades_responsaveis entidades_responsaveis_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.entidades_responsaveis
    ADD CONSTRAINT entidades_responsaveis_pkey PRIMARY KEY (id);


--
-- Name: equipe_responsaveis equipe_responsaveis_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.equipe_responsaveis
    ADD CONSTRAINT equipe_responsaveis_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- Name: metodologia_planotrabalho metodologia_planotrabalho_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.metodologia_planotrabalho
    ADD CONSTRAINT metodologia_planotrabalho_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);


--
-- Name: personal_access_tokens personal_access_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);


--
-- Name: personal_access_tokens personal_access_tokens_token_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);


--
-- Name: planotrabalho planotrabalho_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.planotrabalho
    ADD CONSTRAINT planotrabalho_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: personal_access_tokens_tokenable_type_tokenable_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);


--
-- Name: avaliacoes_executoras avaliacoes_executoras_executora_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.avaliacoes_executoras
    ADD CONSTRAINT avaliacoes_executoras_executora_id_foreign FOREIGN KEY (executora_id) REFERENCES public.entidades_entidadeexecutora(id) ON DELETE CASCADE;


--
-- Name: planotrabalho planotrabalho_cronograma_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.planotrabalho
    ADD CONSTRAINT planotrabalho_cronograma_id_foreign FOREIGN KEY (cronograma_id) REFERENCES public.cronograma(id) ON DELETE CASCADE;


--
-- Name: planotrabalho planotrabalho_entidade_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.planotrabalho
    ADD CONSTRAINT planotrabalho_entidade_id_foreign FOREIGN KEY (entidade_id) REFERENCES public.entidades_entidadeexecutora(id) ON DELETE CASCADE;


--
-- Name: planotrabalho planotrabalho_metodologia_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.planotrabalho
    ADD CONSTRAINT planotrabalho_metodologia_id_foreign FOREIGN KEY (metodologia_id) REFERENCES public.metodologia_planotrabalho(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.migrations (id, migration, batch) FROM stdin;
14	2014_10_12_000000_create_users_table	1
15	2014_10_12_100000_create_password_reset_tokens_table	1
16	2019_08_19_000000_create_failed_jobs_table	1
17	2019_12_14_000001_create_personal_access_tokens_table	1
18	2024_01_09_142748_first	2
19	2024_01_15_124419_create_cronograma_table	3
20	2024_01_15_125615_create_planotrabalho_table	4
21	2024_01_15_162221_add_entidade_id_to_planotrabalho_table	5
31	2024_01_16_133305_create_metodologia_planotrabalho_table	6
32	2024_01_16_144717_add_metodologia_id_to_planotrabalho_table	6
33	2024_01_15_114505_create_avaliacoes_executoras_table	7
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.migrations_id_seq', 33, true);


--
-- PostgreSQL database dump complete
--

