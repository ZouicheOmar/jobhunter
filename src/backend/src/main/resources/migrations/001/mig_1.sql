
-- Query: select all constraints in a schema
--
-- select conname, pg_get_constraindef(oid)
-- from pg_constraint 
-- where connamespace = 'public'::regnamespace;

create schema donnees;

CREATE TABLE donnees.candid (
    id integer NOT NULL,
    add_date date,
    answer boolean,
    company character varying(255),
    contract_type character varying(255),
    title character varying(255),
    unsolicited boolean,
    url character varying(255),
    city_id integer NOT NULL,
    website_id integer,
    tech_offer boolean,
    company_id integer,
    contract_id integer,
    CONSTRAINT candid_contract_type_check CHECK (((contract_type)::text = ANY ((ARRAY['CDI'::character varying, 'ALTERNANCE'::character varying, 'CDD'::character varying, 'STAGE'::character varying, 'NONSPECIFIE'::character varying])::text[])))
);


-- ça c'est psq le nom d'utilisateur sur l'application
-- est admin
ALTER TABLE donnees.candid OWNER TO admin;

--
-- Name: candid_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE donnees.candid_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE donnees.candid_seq OWNER TO admin;

--
-- Name: candid_stack; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE donnees.candid_stack (
    candid_id integer NOT NULL,
    tech_id integer NOT NULL
);


ALTER TABLE donnees.candid_stack OWNER TO admin;

--
-- Name: city; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE donnees.city (
    id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE donnees.city OWNER TO admin;

--
-- Name: city_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE donnees.city_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE donnees.city_seq OWNER TO admin;

--
-- Name: company; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE donnees.company (
    id integer NOT NULL,
    domains character varying(255)[],
    name character varying(255),
    size smallint,
    CONSTRAINT company_size_check CHECK (((size >= 0) AND (size <= 2)))
);


ALTER TABLE donnees.company OWNER TO admin;

--
-- Name: company_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE donnees.company_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE donnees.company_seq OWNER TO admin;

--
-- Name: contract; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE donnees.contract (
    id integer NOT NULL,
    contract_type smallint,
    duration character varying(255),
    occupation character varying(255),
    start_date timestamp(6) without time zone,
    CONSTRAINT contract_contract_type_check CHECK (((contract_type >= 0) AND (contract_type <= 4)))
);


ALTER TABLE donnees.contract OWNER TO admin;

--
-- Name: contract_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE donnees.contract_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE donnees.contract_seq OWNER TO admin;

--
-- Name: flyway_schema_history; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE donnees.flyway_schema_history (
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


ALTER TABLE donnees.flyway_schema_history OWNER TO admin;

--
-- Name: interview_participants; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE donnees.interview_participants (
    interview_id integer NOT NULL,
    person_id integer NOT NULL
);


ALTER TABLE donnees.interview_participants OWNER TO admin;

--
-- Name: interview_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE donnees.interview_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE donnees.interview_seq OWNER TO admin;

--
-- Name: person; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE donnees.person (
    id integer NOT NULL,
    first character varying(255),
    last character varying(255),
    linkedin character varying(255),
    mail character varying(255),
    occupation smallint,
    phone character varying(255),
    "position" smallint,
    CONSTRAINT person_occupation_check CHECK (((occupation >= 0) AND (occupation <= 3))),
    CONSTRAINT person_position_check CHECK ((("position" >= 0) AND ("position" <= 2)))
);


ALTER TABLE donnees.person OWNER TO admin;

--
-- Name: person_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE donnees.person_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE donnees.person_seq OWNER TO admin;

--
-- Name: tech; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE donnees.tech (
    id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE donnees.tech OWNER TO admin;

--
-- Name: tech_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE donnees.tech_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE donnees.tech_seq OWNER TO admin;

--
-- Name: website; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE donnees.website (
    id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE donnees.website OWNER TO admin;

--
-- Name: website_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE donnees.website_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE donnees.website_seq OWNER TO admin;

--
-- Data for Name: candid; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY donnees.candid (id, add_date, answer, company, contract_type, title, unsolicited, url, city_id, website_id, tech_offer, company_id, contract_id) FROM stdin;
1	2025-03-11	f	capgemini	ALTERNANCE	fullstack	f		1	1	\N	\N	\N
2	2025-03-11	f	citalid	ALTERNANCE	fullstack	f		2	1	\N	\N	\N
3	2025-03-11	f	mindflow	ALTERNANCE	fullstack	f		2	1	\N	\N	\N
4	2025-03-11	f	natixis(etreso)	ALTERNANCE	fullstack	f		2	1	\N	\N	\N
5	2025-03-11	f	natixis(summit)	ALTERNANCE	fullstack	f		2	1	\N	\N	\N
6	2025-03-11	f	atos	ALTERNANCE	fullstack	f		3	1	\N	\N	\N
7	2025-03-11	f	meogroup	ALTERNANCE	fullstack	f		4	1	\N	\N	\N
8	2025-03-12	f	atos	ALTERNANCE	fullstack	f		5	2	\N	\N	\N
9	2025-03-12	f	kicklox	ALTERNANCE	fullstack	f		5	3	\N	\N	\N
10	2025-03-12	f	apave	ALTERNANCE	fullstack	f		5	2	\N	\N	\N
11	2025-03-13	f	noous	ALTERNANCE	fullstack	f		5	4	\N	\N	\N
12	2025-03-13	f	noveo	ALTERNANCE	fullstack	f		5	5	\N	\N	\N
13	2025-03-13	f	soprasteria	ALTERNANCE	fullstack	f		2	1	\N	\N	\N
14	2025-03-15	f	bpcetech	ALTERNANCE	fullstack	f		2	1	\N	\N	\N
15	2025-03-15	f	superutech	ALTERNANCE	fullstack	f		6	1	\N	\N	\N
16	2025-03-18	f	Nexa	ALTERNANCE	fullstack	f		7	6	\N	\N	\N
17	2025-03-18	f	AG2Rlamond.	ALTERNANCE	fullstack	f		2	7	\N	\N	\N
18	2025-03-18	f	AG2Rlamond.	ALTERNANCE	fullstack	f		2	7	\N	\N	\N
19	2025-03-26	f	airbus	ALTERNANCE	front	f		5	8	\N	\N	\N
20	2025-03-26	f	kicklox/entr	ALTERNANCE	fullstack	f		8	8	\N	\N	\N
21	2025-05-07	f	ANSSI	ALTERNANCE	fullstack	f		2	1	\N	\N	\N
22	2025-06-12	f	decasoft	ALTERNANCE	fullstack	f		9	9	\N	\N	\N
23	2025-06-13	f	sogeti	ALTERNANCE	fullstack	f		5	9	\N	\N	\N
24	2025-06-13	f	berger-levraut	ALTERNANCE	fullstack	f		5	8	\N	\N	\N
25	2025-06-13	f	eurecia	ALTERNANCE	fullstack	f		5	8	\N	\N	\N
26	2025-06-13	f	lundimatin	ALTERNANCE	fullstack	f		8	10	\N	\N	\N
27	2025-06-13	f	Lynxbusiness	ALTERNANCE	fullstack	f		2	10	\N	\N	\N
28	2025-06-13	f	capgemini	ALTERNANCE	fullstack	f		5	8	\N	\N	\N
29	2025-06-13	f	SAP	ALTERNANCE	fullstack	f		2	10	\N	\N	\N
30	2025-06-13	f	groupeprogress	ALTERNANCE	fullstack	f		2	10	\N	\N	\N
31	2025-07-13	f	decapost	ALTERNANCE	fullstack	f		10	10	\N	\N	\N
32	2025-06-13	f	thequantfact	ALTERNANCE	fullstack	f		2	10	\N	\N	\N
33	2025-06-13	f	groupeBA	ALTERNANCE	fullstack	f		11	10	\N	\N	\N
34	2025-06-23	f	acenture	ALTERNANCE	consultantplm/digital	f		5	9	\N	\N	\N
35	2025-06-23	f	alten	CDI	fullstack	f		5	9	\N	\N	\N
36	2025-06-23	f	clayverest	CDI	frontend	f		5	9	\N	\N	\N
37	2025-06-23	f	aviwell	CDI	fullstack	f		5	9	\N	\N	\N
38	2025-06-23	f	ADP	ALTERNANCE	fullstack	f		5	9	\N	\N	\N
39	2025-06-23	f	meritis	CDI	frontend	f		2	9	\N	\N	\N
40	2025-06-23	f	katchme	CDI	fullstack	f		2	9	\N	\N	\N
41	2025-06-23	f	lacentrale	CDI	frontend	f		2	9	\N	\N	\N
42	2025-06-23	f	sander	CDI	fullstack	f		2	9	\N	\N	\N
43	2025-06-23	f	free	CDI	frontend	f		2	9	\N	\N	\N
44	2025-08-25	f	lalachante	ALTERNANCE	fullstack	f		5	11	\N	\N	\N
45	2025-08-25	f	galadrim	CDI	fullstack	f		2	1	\N	\N	\N
46	2025-08-25	f	diggersfact.	CDI	fullstack	f		2	1	\N	\N	\N
47	2025-08-27	f	notyssol.	ALTERNANCE	fullstack	f		4	4	\N	\N	\N
48	2025-08-27	f	ancenisres.s.	ALTERNANCE	fullstack	f		12	4	\N	\N	\N
49	2025-08-27	f	issig	ALTERNANCE	fullstack	f		13	4	\N	\N	\N
50	2025-08-27	f	koremi	ALTERNANCE	fullstack	f		14	4	\N	\N	\N
51	2025-08-27	f	xefi	ALTERNANCE	fullstack	f		4	4	\N	\N	\N
52	2025-08-27	f	yeswehack	ALTERNANCE	fullstack	f		15	4	\N	\N	\N
53	2025-08-28	f	centralpay	ALTERNANCE	react	f		16	4	\N	\N	\N
54	2025-08-28	f	groupebelmont	ALTERNANCE	fullstack	f		17	2	\N	\N	\N
55	2025-08-28	f	akrecrutement	CDI	fullstack	f		18	2	\N	\N	\N
56	2025-09-01	f	airsupport	ALTERNANCE	informatique	f		19	4	\N	\N	\N
57	2025-09-01	f	dawan	ALTERNANCE	fullstack	f		5	2	\N	\N	\N
58	2025-09-01	f	com6interactive	ALTERNANCE	fullstack	f		20	2	\N	\N	\N
59	2025-09-01	f	capcirsarl	ALTERNANCE	fullstack	f		5	2	\N	\N	\N
60	2025-09-01	f	isi2u	ALTERNANCE	fullstack	f		21	2	\N	\N	\N
61	2025-09-01	f	informaclic-31	ALTERNANCE	fullstack	t		20	9	\N	\N	\N
62	2025-09-01	f	digitanie	ALTERNANCE	fullstack	f		22	4	\N	\N	\N
63	2025-09-01	f	sigmainformatique	ALTERNANCE	fullstack	f		23	12	\N	\N	\N
64	2025-09-01	f	immegris	ALTERNANCE	fullstack	f		24	4	\N	\N	\N
65	2025-09-01	f	sarlrdservices	ALTERNANCE	fullstack	f		25	4	\N	\N	\N
66	2025-09-02	f	xefi	ALTERNANCE	fullstack	f		4	4	\N	\N	\N
67	2025-09-02	f	netstrategy	ALTERNANCE	fullstack	f		26	4	\N	\N	\N
68	2025-09-02	f	SII	ALTERNANCE	fullstack	t		5	13	\N	\N	\N
69	2025-09-02	f	soprasteria	ALTERNANCE	fullstack	t		5	13	\N	\N	\N
70	2025-09-02	f	bergetlevraut	ALTERNANCE	fullstack	t		5	13	\N	\N	\N
71	2025-09-02	f	dailyweb	ALTERNANCE	fullstack	t		5	13	\N	\N	\N
72	2025-09-02	f	dynas+	ALTERNANCE	fullstack	t		5	13	\N	\N	\N
73	2025-09-02	f	saceo	ALTERNANCE	fullstack	t		5	13	\N	\N	\N
74	2025-09-02	f	easymile	ALTERNANCE	fullstack	t		5	13	\N	\N	\N
75	2025-09-02	f	ze-watt	ALTERNANCE	fullstack	t		5	13	\N	\N	\N
76	2025-09-02	f	menaps	ALTERNANCE	fullstack	t		5	14	\N	\N	\N
77	2025-09-02	f	pixpay	ALTERNANCE	fullstack	f		2	1	\N	\N	\N
78	2025-09-06	f	thequanticfactory	ALTERNANCE	fullstack	f		2	1	\N	\N	\N
79	2025-09-06	f	perferoterritoire	ALTERNANCE	fullstack	f		27	4	\N	\N	\N
80	2025-09-06	f	ONaCVG	ALTERNANCE	fullstack	f		2	15	\N	\N	\N
81	2025-09-06	t	avancial	ALTERNANCE	fullstack	f		28	16	\N	\N	\N
82	2025-09-06	f	mewocampus	ALTERNANCE	fullstack	f		29	2	\N	\N	\N
83	2025-09-06	t	absup	ALTERNANCE	fullstack	f		4	2	\N	\N	\N
84	2025-09-06	f	yahade	ALTERNANCE	fullstack	f		2	4	\N	\N	\N
85	2025-09-06	f	koremi	ALTERNANCE	fullstack	f		14	4	\N	\N	\N
86	2025-09-06	f	manpower	ALTERNANCE	fullstack	f		30	4	\N	\N	\N
87	2025-09-15	f	jobposting	ALTERNANCE	fullstack	f		4	2	\N	\N	\N
88	2025-09-15	f	martinbrower	ALTERNANCE	fullstack	f		31	2	\N	\N	\N
89	2025-09-15	f	internetfactory	ALTERNANCE	fullstack	f		2	2	\N	\N	\N
90	2025-09-15	f	engie	ALTERNANCE	fullstack	f		2	9	\N	\N	\N
91	2025-09-15	f	afnorgroup	ALTERNANCE	fullstack	f		28	9	\N	\N	\N
92	2025-09-15	f	cagnot	ALTERNANCE	fullstack	f		2	9	\N	\N	\N
93	2025-09-15	f	innov'atm	ALTERNANCE	fullstack	f		32	9	\N	\N	\N
94	2025-09-15	f	skeepers	ALTERNANCE	fullstack	f		15	9	\N	\N	\N
95	2025-09-15	f	ginger	ALTERNANCE	fullstack	f		5	9	\N	\N	\N
96	2025-09-15	f	dawan	ALTERNANCE	fullstack	f		5	9	\N	\N	\N
97	2025-09-15	f	shippingbo	ALTERNANCE	fullstack	f		5	9	\N	\N	\N
98	2025-09-15	f	mondialtv	ALTERNANCE	fullstack	f		2	9	\N	\N	\N
99	2025-09-15	f	lws	ALTERNANCE	fullstack	f		33	17	\N	\N	\N
100	2025-09-15	f	cirilgroup	ALTERNANCE	fullstack	f		4	18	\N	\N	\N
101	2025-09-15	f	h3hitema(ecole)	ALTERNANCE	fullstack	f		34	18	\N	\N	\N
102	2025-09-15	f	chambresd'agric.	CDD	fullstack	f		5	10	\N	\N	\N
103	2025-09-15	f	infosys	CDI	fullstack	f		5	10	\N	\N	\N
104	2025-09-15	f	wiifor	CDI	fullstack	f		5	17	\N	\N	\N
105	2025-09-16	f	favikon	ALTERNANCE	fullstack	f		2	1	\N	\N	\N
106	2025-09-16	f	iportego	CDI	fullstack	f		27	9	\N	\N	\N
107	2025-09-16	f	cirilgroup	ALTERNANCE	fullstack	f		5	9	\N	\N	\N
108	2025-09-17	f	wrodline	ALTERNANCE	fullstack	f		35	9	\N	\N	\N
152	2025-10-08	f	tf1	\N	FULLSTACK	t	https://www.welcometothejungle.com/fr/companies/groupe-tf1/jobs/cdi-developpeur-fullstack-net-angular-h-f_boulogne-billancourt_GT_41gVPqK	52	1	\N	\N	\N
202	2025-10-08	f	Groupe TF1	\N	BACKEND	t	https://www.welcometothejungle.com/fr/companies/groupe-tf1/jobs/cdi-developpeur-fullstack-net-angular-h-f_boulogne-billancourt_GT_41gVPqK	52	52	\N	\N	\N
203	2025-10-08	f	Groupe TF1	\N	OTHER	t	https://www.welcometothejungle.com/fr/companies/groupe-tf1/jobs/cdi-developpeur-fullstack-net-angular-h-f_boulogne-billancourt_GT_41gVPqK	52	53	\N	\N	\N
204	2025-10-08	f	Groupe TF1	\N	FULLSTACK	t	https://www.welcometothejungle.com/fr/companies/groupe-tf1/jobs/cdi-developpeur-fullstack-net-angular-h-f_boulogne-billancourt_GT_41gVPqK	52	52	\N	\N	\N
252	2025-10-08	f	Simplon	\N	BACKEND	t	https://bloom-alternance.fr/plateforme-alternance/?work_fields=10&range=20&offer_id=16518	102	102	\N	\N	\N
253	2025-10-08	f	bloom	\N	BACKEND	t	https://bloom-alternance.fr/plateforme-alternance/?work_fields=10&range=20&offer_id=16518	2	6	\N	\N	\N
302	2025-10-10	f	CLS	\N	OTHER	t	https://groupecls.softy.pro/offre/163863?idt=92	2	152	\N	\N	\N
303	2025-10-10	f	SYNANTO	\N	FRONTEND	t	https://www.hellowork.com/fr-fr/emplois/71061498.html	152	2	\N	\N	\N
304	2025-10-10	f	Capgemini	\N	FULLSTACK	t	https://www.welcometothejungle.com/fr/companies/capgemini/jobs/stage-developpeuse-developpeur-fullstack_toulouse	153	1	\N	\N	\N
305	2025-10-10	f	Capgemini	\N	FRONTEND	t	https://www.hellowork.com/fr-fr/emplois/71035482.html	153	153	\N	\N	\N
306	2025-10-10	f	Daher	\N	BACKEND	t	https://www.hellowork.com/fr-fr/emplois/67501538.html	154	2	\N	\N	\N
307	2025-10-10	f	Belacom	\N	Développeur Full-Stack en alternance	t	https://www.welcometothejungle.com/fr/companies/belacom-1/jobs/developpeur-full-stack-en-alternance_issy-les-moulineaux	155	154	\N	\N	\N
308	2025-10-10	f	Amiltone	\N	BACKEND	t	https://www.hellowork.com/fr-fr/emplois/71387138.html	156	2	\N	\N	\N
309	2025-10-10	f	NEXTON	\N	FULLSTACK	t	https://jobs.smartrecruiters.com/NEXTON/744000082491106-developpeur-front-end-react-h-f	157	2	\N	\N	\N
310	2025-10-10	f	NEXTON	\N	Développeur Java/React	t	https://jobs.smartrecruiters.com/NEXTON/744000085613035-developpeur-java-react-h-f-	157	2	\N	\N	\N
311	2025-10-10	f	NEXTON	\N	Développeur Fullstack React Python	t	https://jobs.smartrecruiters.com/NEXTON/744000085873986-developpeur-full-stack-react-python-gcp-h-f	158	155	\N	\N	\N
312	2025-10-10	f	Labsoft	\N	Développeur Fullstack Java React	t	https://www.jobposting.pro/emploi-2354733-115	159	2	\N	\N	\N
313	2025-10-10	f	Staffmatch France	\N	Développeur React	t	https://www.hellowork.com/fr-fr/emplois/71113078.html	160	2	\N	\N	\N
314	2025-10-10	f	Systelia	\N	Développeur Fullstack Python React	t	https://www.hellowork.com/fr-fr/emplois/63761793.html	161	2	\N	\N	\N
315	2025-10-10	f	Hoppen	\N	FULLSTACK	t	https://carriere.hoppen.care/fr/offres/developpeur-fullstack---reactnodejs-aa29ab	162	2	\N	\N	\N
352	2025-10-16	f	CLS	\N	Développeur Fullstack	t	https://groupecls.softy.pro/offre/163863	5	202	\N	\N	\N
353	2025-10-16	f	SYNANTO	\N	Développeur Front	t	https://www.hellowork.com/fr-fr/emplois/71061498.html	152	2	\N	\N	\N
354	2025-10-16	f	Sopra Steria	\N	BACKEND	t	https://www.welcometothejungle.com/fr/companies/sopra-steria/jobs/stage-developpeur-se-react-node-js-aeroline-toulouse_colomiers_SS_kkXQp3	154	155	\N	\N	\N
355	2025-10-16	f	Capgemini	\N	BACKEND	t	https://www.welcometothejungle.com/fr/companies/capgemini/jobs/stage-developpeuse-developpeur-fullstack_toulouse	153	203	\N	\N	\N
356	2025-10-16	f	Capgemini	\N	FRONTEND	t	https://www.hellowork.com/fr-fr/emplois/71035482.html	153	153	\N	\N	\N
357	2025-10-16	f	Daher	\N	FRONTEND	t	https://www.hellowork.com/fr-fr/emplois/67501538.html	154	204	\N	\N	\N
358	2025-10-16	f	Belacom	\N	FULLSTACK	t	https://www.welcometothejungle.com/fr/companies/belacom-1/jobs/developpeur-full-stack-en-alternance_issy-les-moulineaux	155	154	\N	\N	\N
359	2025-10-16	f	CREPS	\N	Surveillant CREPS	t	https://choisirleservicedonnees.gouv.fr/offre-emploi/surveillante-reference-2025-2078058/	153	205	\N	\N	\N
360	2025-10-16	f	CAPTRAIN	\N	Opératuer Fret Sol	t	https://www.hellowork.com/fr-fr/emplois/71549050.html	202	2	\N	\N	\N
361	2025-10-16	f	ministre de l'éducation nationale	\N	Enseignant Contractuel Mathématiques	t	https://recrutement.education.gouv.fr/recrutement/candidature/a0yIV000009ybdpYAA/candidature-omar-zouiche	203	206	\N	\N	\N
452	2025-12-03	f	WeVii	\N	Développeur Senior - Java - Spring Boot H/F	t	https://www.hellowork.com/fr-fr/emplois/70445713.html	153	2	\N	\N	\N
453	2025-12-03	f	WeVii	\N	Développeur Senior - Java - Spring Boot H/F	t	https://www.kerhis.com/recrutement/candidature-spontanee/	153	252	\N	\N	\N
454	2025-12-03	f	WeVii	\N	Développeur Fullstack	t	https://www.luklagroup.com/nous-contacter/	153	253	\N	\N	\N
455	2025-12-03	f	Ad4screen	\N	Développeur Front-End H/F (Alternance)	f	https://www.welcometothejungle.com/fr/companies/ad4screen/jobs/developpeur-front-end-h-f-alternance_paris_AD4SC_1Wd4R0O	157	254	\N	\N	\N
502	2025-12-09	f	Hinfact	\N	Développeur(se) Fullstack	t	https://www.welcometothejungle.com/fr/companies/hinfact/jobs/developpeur-se-fullstack_toulouse	153	254	\N	\N	\N
503	2025-12-09	f	BOTdesign	\N	Fullstack e-Santé	t	https://www.welcometothejungle.com/fr/companies/botdesign/jobs/stage-developpement-fullstack_toulouse_BOTDE_P4Al6gk	153	254	\N	\N	\N
504	2025-12-09	f	Onestock	\N	Fullstack	t		153	1	\N	\N	\N
552	2025-12-10	f	Opus Recrutement Solutions	\N	Développeur React	f		102	9	\N	\N	\N
553	2025-12-10	f	Atcon Global	\N	Fullstack	f		102	9	\N	\N	\N
554	2025-12-10	f	SQLI	\N	Fullstack (Stage pré-embauche)	f		153	9	\N	\N	\N
555	2025-12-10	f	Berger-Levraut	\N	Fullstack (orienté front)	f	https://recrute.berger-levrault.com/offre-de-emploi/emploi-developpeur-fullstack-oriente-front-end-f-h_6817.aspx#ancrecontenu	153	9	\N	\N	\N
556	2025-12-10	f	OpenAirlines	\N	Développeur Full-Stack Java	t	https://www.welcometothejungle.com/en/companies/openairlines/jobs/developpeur-full-stack-h-f_toulouse_OPENA_69RlG0w	153	254	\N	\N	\N
602	2025-12-12	f	CLS	\N	Stage développement WEB : visualisation et valorisation de données spatiales - H/F	f	https://groupecls.softy.pro/offre/181835	153	302	\N	\N	\N
\.


--
-- Data for Name: candid_stack; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY donnees.candid_stack (candid_id, tech_id) FROM stdin;
1	1
1	2
2	3
2	4
3	5
3	6
4	7
5	7
6	7
7	7
8	7
9	7
10	7
11	7
12	7
13	7
14	7
15	7
16	7
17	7
18	7
19	7
20	7
21	7
22	7
23	7
24	7
25	7
26	8
27	8
27	9
28	7
29	7
30	8
30	9
31	10
31	3
32	7
33	7
34	7
35	7
36	7
37	7
38	7
39	7
40	3
40	11
41	7
42	7
43	7
44	7
45	3
45	11
46	3
46	11
47	7
48	7
49	7
50	7
51	7
52	12
52	4
52	13
53	11
53	8
54	14
55	11
55	8
56	15
56	16
56	17
57	1
58	7
59	7
60	7
61	7
62	7
63	7
64	7
65	7
66	7
67	8
67	3
68	18
69	7
70	7
71	7
72	7
73	7
74	7
75	7
76	7
77	19
77	20
78	21
78	22
79	7
80	7
81	23
82	7
83	7
84	7
85	7
86	3
86	5
87	8
87	24
88	1
88	8
89	7
90	25
91	26
92	26
93	7
94	7
95	7
96	7
97	27
97	28
97	29
98	7
99	8
100	7
101	7
102	19
102	11
103	1
103	2
104	1
104	2
105	11
105	24
105	30
106	11
106	24
106	30
106	31
107	11
107	8
108	1
108	32
108	2
152	2
152	52
202	103
202	102
202	104
203	102
203	104
204	102
204	104
252	154
252	153
252	152
253	155
253	156
303	202
303	104
305	204
305	203
306	17
306	3
306	5
307	207
307	206
307	205
308	209
308	208
308	202
308	210
309	212
309	153
309	211
309	210
310	213
310	214
310	208
310	210
311	216
311	215
311	217
311	218
311	219
312	223
312	213
312	232
312	227
312	206
312	208
312	205
312	210
312	231
312	220
312	230
312	229
312	225
312	221
312	226
312	211
312	222
312	224
312	228
313	210
314	234
314	154
314	233
314	210
315	207
315	213
315	214
315	205
315	210
315	228
353	207
353	104
354	207
354	210
355	253
355	103
355	252
357	154
357	255
357	256
357	254
358	207
358	257
502	154
502	303
502	302
502	210
503	229
503	208
503	202
503	210
503	304
552	154
552	233
552	210
552	352
553	154
553	210
554	353
554	208
554	352
555	208
555	104
556	208
602	154
602	303
602	233
602	210
602	104
\.


--
-- Data for Name: city; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY donnees.city (id, name) FROM stdin;
1	cherbourg
2	paris
3	clermont-f
4	lyon
5	toulouse
6	nantes
7	bordeaux
8	montpellier
9	TLS/PRS
10	belfort
11	rilleuxlapipe
12	nantes/ancenis
13	chambery
14	nice
15	rennes
16	tours
17	monteux
18	sursense92
19	pujaudran
20	stjean
21	lÃ©guevin
22	saverdun
23	france
24	grabels
25	laglande
26	feyzin
27	marseille
28	stdenis
29	metz
30	stetienne
31	lisses
32	cugnaux
33	nancy
34	stouen
35	louches
52	Boulogne-Billancourt
102	remote
152	Montpellier
153	Toulouse
154	Colomiers
155	Issy-les-Moulineaux
156	Nantes
157	Paris
158	Mougins
159	Brétigny-sur-Orge
160	Levallois-Perret
161	Île-de-France
162	Rennes
202	Portet-sur-Garonne
203	Charente
\.


--
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY donnees.company (id, domains, name, size) FROM stdin;
\.


--
-- Data for Name: contract; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY donnees.contract (id, contract_type, duration, occupation, start_date) FROM stdin;
\.


--
-- Data for Name: flyway_schema_history; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY donnees.flyway_schema_history (installed_rank, version, description, type, script, checksum, installed_by, installed_on, execution_time, success) FROM stdin;
1	1	<< Flyway Baseline >>	BASELINE	<< Flyway Baseline >>	\N	admin	2025-12-17 13:07:18.617168	0	t
\.


--
-- Data for Name: interview_participants; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY donnees.interview_participants (interview_id, person_id) FROM stdin;
\.


--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY donnees.person (id, first, last, linkedin, mail, occupation, phone, "position") FROM stdin;
\.


--
-- Data for Name: tech; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY donnees.tech (id, name) FROM stdin;
1	java
2	angular
3	python
4	django
5	javascript
6	typescript
7	unspecified
8	php
9	laravel
10	c++
11	react
12	vue
13	drm
14	symfony
15	powerbi
16	microsoftaccess
17	sql
18	
19	next
20	nest
21	front
22	data
23	java(angularsurement)
24	node
25	C#(depreference)
26	php(pluginswordpress)
27	ruby
28	rails
29	js
30	redux
31	osint
32	spring
52	.net
102	.NET
103	Full Stack
104	Angular
152	HTML/CSS
153	JavaScript
154	Python
155	technologie
156	informatique
202	Node
203	Back-end
204	Développement Web
205	Git
206	Linux
207	Node.js
208	Java
209	Spring
210	React
211	CSS
212	HTML
213	HTML5
214	CSS3
215	SQL/MySQL
216	React/Next.js
217	GCP (Cloud Run, BigQuery, DataProc, GCS, Airflow)
218	Python (FastAPI)
219	Java Spring Boot
220	RESTful API
221	message brokers (AMQP, Redis, etc.)
222	Azure
223	SVG
224	PostgreSQL
225	Spring Boot
226	H2
227	WSDL
228	TypeScript
229	Docker
230	XML
231	MySQL
232	Gradle
233	Django
234	Fastapi
252	Développeur
253	IT / Digital
254	Data Science
255	Data Engineering
256	Machine Learning
257	GIT
302	C++
303	Vue
304	Spring-boot
352	Typescript
353	Hibernate
\.


--
-- Data for Name: website; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY donnees.website (id, name) FROM stdin;
1	wttj
2	hellowork
3	kicklox
4	labonnealternance
5	talent
6	bloom
7	jobsmakesens
8	sitevialinkedin
9	linkedin
10	indeed
11	meteojob
12	sigma.com
13	labonneboite
14	menaps
15	pass
16	jeunesd'avenirsrecrut
17	email
18	apec
52	https://www.welcometothejungle.com/fr/companies/groupe-tf1/jobs/cdi-developpeur-fullstack-net-angular-h-f_boulogne-billancourt_GT_41gVPqK
53	https://www.groupe-tf1.com/
102	https://bloom-alternance.fr/
152	https://groupecls.softy.pro
153	https://www.hellowork.com/fr-fr/emplois/71035482.html
154	https://www.welcometothejungle.com/fr/companies/belacom-1/jobs/developpeur-full-stack-en-alternance_issy-les-moulineaux
155	
202	http://groupecls.softy.pro
203	https://www.welcometothejungle.com/fr/companies/capgemini/
204	https://www.daher.com/
205	https://choisirleservicedonnees.gouv.fr/
206	education.gouv.fr
252	kerhis
253	luklagroup
254	welcometothejungle
302	softy
\.


--
-- Name: candid_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('donnees.candid_seq', 651, true);


--
-- Name: city_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('donnees.city_seq', 251, true);


--
-- Name: company_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('donnees.company_seq', 1, false);


--
-- Name: contract_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('donnees.contract_seq', 1, false);


--
-- Name: interview_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('donnees.interview_seq', 1, false);


--
-- Name: person_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('donnees.person_seq', 1, false);


--
-- Name: tech_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('donnees.tech_seq', 401, true);


--
-- Name: website_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('donnees.website_seq', 351, true);


--
-- Name: candid candid_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY donnees.candid
    ADD CONSTRAINT candid_pkey PRIMARY KEY (id);


--
-- Name: candid_stack candid_stack_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY donnees.candid_stack
    ADD CONSTRAINT candid_stack_pkey PRIMARY KEY (candid_id, tech_id);


--
-- Name: city city_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY donnees.city
    ADD CONSTRAINT city_pkey PRIMARY KEY (id);


--
-- Name: company company_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY donnees.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);


--
-- Name: contract contract_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY donnees.contract
    ADD CONSTRAINT contract_pkey PRIMARY KEY (id);


--
-- Name: flyway_schema_history flyway_schema_history_pk; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY donnees.flyway_schema_history
    ADD CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank);


--
-- Name: person person_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY donnees.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);


--
-- Name: tech tech_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY donnees.tech
    ADD CONSTRAINT tech_pkey PRIMARY KEY (id);


--
-- Name: candid uk5r3ov5wcky8qmewjaesx6ajrv; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY donnees.candid
    ADD CONSTRAINT uk5r3ov5wcky8qmewjaesx6ajrv UNIQUE (contract_id);


--
-- Name: city unique_city_name; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY donnees.city
    ADD CONSTRAINT unique_city_name UNIQUE (name);


--
-- Name: tech unique_tech_name; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY donnees.tech
    ADD CONSTRAINT unique_tech_name UNIQUE (name);


--
-- Name: website unique_website_name; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY donnees.website
    ADD CONSTRAINT unique_website_name UNIQUE (name);


--
-- Name: website website_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY donnees.website
    ADD CONSTRAINT website_pkey PRIMARY KEY (id);


--
-- Name: flyway_schema_history_s_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX flyway_schema_history_s_idx ON donnees.flyway_schema_history USING btree (success);


--
-- Name: candid_stack fk1cgeii9442lbbejt9rchat583; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY donnees.candid_stack
    ADD CONSTRAINT fk1cgeii9442lbbejt9rchat583 FOREIGN KEY (candid_id) REFERENCES donnees.candid(id);


--
-- Name: candid fk5ep9plgf8d6ytnch5iakbhigk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY donnees.candid
    ADD CONSTRAINT fk5ep9plgf8d6ytnch5iakbhigk FOREIGN KEY (city_id) REFERENCES donnees.city(id);


--
-- Name: candid fkae8m9hsxgt4aebb1ilp5ay9oh; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY donnees.candid
    ADD CONSTRAINT fkae8m9hsxgt4aebb1ilp5ay9oh FOREIGN KEY (contract_id) REFERENCES donnees.contract(id);


--
-- Name: candid fkakpcil6k74sni2r135cp87n6c; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY donnees.candid
    ADD CONSTRAINT fkakpcil6k74sni2r135cp87n6c FOREIGN KEY (website_id) REFERENCES donnees.website(id);


--
-- Name: candid fkdtatwvaygud3wf98752kyrbir; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY donnees.candid
    ADD CONSTRAINT fkdtatwvaygud3wf98752kyrbir FOREIGN KEY (company_id) REFERENCES donnees.company(id);


--
-- Name: interview_participants fkecbuo6e1w16u25d04wq304by3; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY donnees.interview_participants
    ADD CONSTRAINT fkecbuo6e1w16u25d04wq304by3 FOREIGN KEY (person_id) REFERENCES donnees.person(id);


--
-- Name: candid_stack fkohtnmspp2gt4nno50cwfda9oy; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY donnees.candid_stack
    ADD CONSTRAINT fkohtnmspp2gt4nno50cwfda9oy FOREIGN KEY (tech_id) REFERENCES donnees.tech(id);


--
-- PostgreSQL database dump complete
--


