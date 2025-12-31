\restrict c8yuBTNcsEHfIgZDnyks4ibFU6EPZmGWuteHmz0RgdypveeYfv1ut0ttsYZTmMs

CREATE TABLE public.candid (
    answer boolean,
    city_id integer,
    company_id integer,
    contract_id integer,
    date_apply date,
    id integer NOT NULL,
    rejected boolean,
    tech_offer boolean,
    unsolicited boolean,
    website_id integer,
    title character varying(255),
    url character varying(255)
);


ALTER TABLE public.candid OWNER TO admin;

--
-- Name: candid_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.candid_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.candid_seq OWNER TO admin;

--
-- Name: candid_stack; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.candid_stack (
    candid_id integer NOT NULL,
    tech_id integer NOT NULL
);


ALTER TABLE public.candid_stack OWNER TO admin;

--
-- Name: city; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.city (
    id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE public.city OWNER TO admin;

--
-- Name: city_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.city_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.city_seq OWNER TO admin;

--
-- Name: company; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.company (
    id integer NOT NULL,
    name character varying(255),
    size character varying(255),
    domains character varying(255)[],
    CONSTRAINT company_size_check CHECK (((size)::text = ANY ((ARRAY['GE'::character varying, 'ETI'::character varying, 'PME'::character varying])::text[])))
);


ALTER TABLE public.company OWNER TO admin;

--
-- Name: company_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.company_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.company_seq OWNER TO admin;

--
-- Name: contract; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.contract (
    id integer NOT NULL,
    start_date timestamp(6) without time zone,
    contract_type character varying(255),
    duration character varying(255),
    occupation character varying(255),
    CONSTRAINT contract_contract_type_check CHECK (((contract_type)::text = ANY ((ARRAY['FULL_TIME'::character varying, 'PART_TIME'::character varying, 'CONTRACTOR'::character varying, 'TEMPORARY'::character varying, 'INTERN'::character varying, 'VOLUNTEER'::character varying, 'PER_DIEM'::character varying, 'OTHER'::character varying])::text[])))
);


ALTER TABLE public.contract OWNER TO admin;

--
-- Name: contract_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.contract_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contract_seq OWNER TO admin;

--
-- Name: flyway_schema_history; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.flyway_schema_history (
    installed_rank integer NOT NULL,
    version character varying(50),
    description character varying(200) NOT NULL,
    type character varying(20) NOT NULL,
    script character varying(1000) NOT NULL,
    checksum integer,
    installed_by character varying(100) NOT NULL,
    installed_on timestamp without time zone DEFAULT now() NOT NULL,
    execution_time integer NOT NULL,
    success boolean NOT NULL
);


ALTER TABLE public.flyway_schema_history OWNER TO admin;

--
-- Name: interview; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.interview (
    candid_id integer,
    id integer NOT NULL,
    interview_number integer,
    interview_type smallint,
    remote boolean,
    CONSTRAINT interview_interview_type_check CHECK (((interview_type >= 0) AND (interview_type <= 2)))
);


ALTER TABLE public.interview OWNER TO admin;

--
-- Name: interview_participants; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.interview_participants (
    interview_id integer NOT NULL,
    person_id integer NOT NULL
);


ALTER TABLE public.interview_participants OWNER TO admin;

--
-- Name: interview_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.interview_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.interview_seq OWNER TO admin;

--
-- Name: person; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.person (
    company_id integer,
    id integer NOT NULL,
    occupation smallint,
    "position" smallint,
    first_name character varying(255),
    last_name character varying(255),
    linkedin character varying(255),
    mail character varying(255),
    phone character varying(255),
    CONSTRAINT person_occupation_check CHECK (((occupation >= 0) AND (occupation <= 3))),
    CONSTRAINT person_position_check CHECK ((("position" >= 0) AND ("position" <= 2)))
);


ALTER TABLE public.person OWNER TO admin;

--
-- Name: person_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.person_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.person_seq OWNER TO admin;

--
-- Name: tech; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.tech (
    id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE public.tech OWNER TO admin;

--
-- Name: tech_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.tech_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tech_seq OWNER TO admin;

--
-- Name: website; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.website (
    id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE public.website OWNER TO admin;

--
-- Name: website_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.website_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.website_seq OWNER TO admin;

--
-- Data for Name: candid; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.candid (answer, city_id, company_id, contract_id, date_apply, id, rejected, tech_offer, unsolicited, website_id, title, url) FROM stdin;
\.


--
-- Data for Name: candid_stack; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.candid_stack (candid_id, tech_id) FROM stdin;
\.


--
-- Data for Name: city; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.city (id, name) FROM stdin;
\.


--
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.company (id, name, size, domains) FROM stdin;
\.


--
-- Data for Name: contract; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.contract (id, start_date, contract_type, duration, occupation) FROM stdin;
\.


--
-- Data for Name: flyway_schema_history; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.flyway_schema_history (installed_rank, version, description, type, script, checksum, installed_by, installed_on, execution_time, success) FROM stdin;
1	1	<< Flyway Baseline >>	BASELINE	<< Flyway Baseline >>	\N	admin	2025-12-17 13:07:18.617168	0	t
\.


--
-- Data for Name: interview; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.interview (candid_id, id, interview_number, interview_type, remote) FROM stdin;
\.


--
-- Data for Name: interview_participants; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.interview_participants (interview_id, person_id) FROM stdin;
\.


--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.person (company_id, id, occupation, "position", first_name, last_name, linkedin, mail, phone) FROM stdin;
\.


--
-- Data for Name: tech; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.tech (id, name) FROM stdin;
\.


--
-- Data for Name: website; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.website (id, name) FROM stdin;
\.


--
-- Name: candid_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.candid_seq', 1, false);


--
-- Name: city_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.city_seq', 1, false);


--
-- Name: company_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.company_seq', 1, false);


--
-- Name: contract_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.contract_seq', 1, false);


--
-- Name: interview_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.interview_seq', 1, false);


--
-- Name: person_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.person_seq', 1, false);


--
-- Name: tech_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.tech_seq', 1, false);


--
-- Name: website_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.website_seq', 1, false);


--
-- Name: candid candid_contract_id_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.candid
    ADD CONSTRAINT candid_contract_id_key UNIQUE (contract_id);


--
-- Name: candid candid_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.candid
    ADD CONSTRAINT candid_pkey PRIMARY KEY (id);


--
-- Name: candid_stack candid_stack_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.candid_stack
    ADD CONSTRAINT candid_stack_pkey PRIMARY KEY (candid_id, tech_id);


--
-- Name: city city_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT city_pkey PRIMARY KEY (id);


--
-- Name: company company_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);


--
-- Name: contract contract_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.contract
    ADD CONSTRAINT contract_pkey PRIMARY KEY (id);


--
-- Name: flyway_schema_history flyway_schema_history_pk; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.flyway_schema_history
    ADD CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank);


--
-- Name: interview interview_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.interview
    ADD CONSTRAINT interview_pkey PRIMARY KEY (id);


--
-- Name: person person_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);


--
-- Name: tech tech_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tech
    ADD CONSTRAINT tech_pkey PRIMARY KEY (id);


--
-- Name: city unique_city_name; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT unique_city_name UNIQUE (name);


--
-- Name: company unique_company_name; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT unique_company_name UNIQUE (name);


--
-- Name: tech unique_tech_name; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tech
    ADD CONSTRAINT unique_tech_name UNIQUE (name);


--
-- Name: website unique_website_name; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.website
    ADD CONSTRAINT unique_website_name UNIQUE (name);


--
-- Name: website website_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.website
    ADD CONSTRAINT website_pkey PRIMARY KEY (id);


--
-- Name: flyway_schema_history_s_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX flyway_schema_history_s_idx ON public.flyway_schema_history USING btree (success);


--
-- Name: candid_stack fk1cgeii9442lbbejt9rchat583; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.candid_stack
    ADD CONSTRAINT fk1cgeii9442lbbejt9rchat583 FOREIGN KEY (candid_id) REFERENCES public.candid(id);


--
-- Name: candid fk5ep9plgf8d6ytnch5iakbhigk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.candid
    ADD CONSTRAINT fk5ep9plgf8d6ytnch5iakbhigk FOREIGN KEY (city_id) REFERENCES public.city(id);


--
-- Name: candid fkae8m9hsxgt4aebb1ilp5ay9oh; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.candid
    ADD CONSTRAINT fkae8m9hsxgt4aebb1ilp5ay9oh FOREIGN KEY (contract_id) REFERENCES public.contract(id);


--
-- Name: candid fkakpcil6k74sni2r135cp87n6c; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.candid
    ADD CONSTRAINT fkakpcil6k74sni2r135cp87n6c FOREIGN KEY (website_id) REFERENCES public.website(id);


--
-- Name: candid fkdtatwvaygud3wf98752kyrbir; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.candid
    ADD CONSTRAINT fkdtatwvaygud3wf98752kyrbir FOREIGN KEY (company_id) REFERENCES public.company(id);


--
-- Name: interview_participants fkecbuo6e1w16u25d04wq304by3; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.interview_participants
    ADD CONSTRAINT fkecbuo6e1w16u25d04wq304by3 FOREIGN KEY (person_id) REFERENCES public.person(id);


--
-- Name: interview_participants fkjm1tgf7sdcndjwgyxevjisw90; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.interview_participants
    ADD CONSTRAINT fkjm1tgf7sdcndjwgyxevjisw90 FOREIGN KEY (interview_id) REFERENCES public.interview(id);


--
-- Name: interview fkmh3d478oitn16dwfoxprj2mtf; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.interview
    ADD CONSTRAINT fkmh3d478oitn16dwfoxprj2mtf FOREIGN KEY (candid_id) REFERENCES public.candid(id);


--
-- Name: candid_stack fkohtnmspp2gt4nno50cwfda9oy; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.candid_stack
    ADD CONSTRAINT fkohtnmspp2gt4nno50cwfda9oy FOREIGN KEY (tech_id) REFERENCES public.tech(id);


--
-- Name: person fkq9cb6xydynxpqhnmif18lmx83; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT fkq9cb6xydynxpqhnmif18lmx83 FOREIGN KEY (company_id) REFERENCES public.company(id);


--
-- PostgreSQL database dump complete
--

\unrestrict c8yuBTNcsEHfIgZDnyks4ibFU6EPZmGWuteHmz0RgdypveeYfv1ut0ttsYZTmMs

