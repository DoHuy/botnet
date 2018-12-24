--
-- PostgreSQL database dump
--

-- Dumped from database version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: credentials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.credentials (
    id integer NOT NULL,
    credentialname text,
    password text,
    email text,
    phone text,
    created text,
    modified text,
    deleted text,
    token text,
    status text
);


ALTER TABLE public.credentials OWNER TO postgres;

--
-- Name: credentials_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.credentials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.credentials_id_seq OWNER TO postgres;

--
-- Name: credentials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.credentials_id_seq OWNED BY public.credentials.id;


--
-- Name: domains; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.domains (
    id integer NOT NULL,
    domains text[],
    ip text[],
    created text,
    modified text,
    deleted text,
    webid integer
);


ALTER TABLE public.domains OWNER TO postgres;

--
-- Name: domains_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.domains_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.domains_id_seq OWNER TO postgres;

--
-- Name: domains_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.domains_id_seq OWNED BY public.domains.id;


--
-- Name: domainsstates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.domainsstates (
    id integer NOT NULL,
    notification jsonb,
    created text,
    domainsid integer
);


ALTER TABLE public.domainsstates OWNER TO postgres;

--
-- Name: domainsstates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.domainsstates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.domainsstates_id_seq OWNER TO postgres;

--
-- Name: domainsstates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.domainsstates_id_seq OWNED BY public.domainsstates.id;


--
-- Name: logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.logs (
    id integer NOT NULL,
    log text,
    created text,
    credentialid integer
);


ALTER TABLE public.logs OWNER TO postgres;

--
-- Name: logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.logs_id_seq OWNER TO postgres;

--
-- Name: logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.logs_id_seq OWNED BY public.logs.id;


--
-- Name: monitoredwebsites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.monitoredwebsites (
    id integer NOT NULL,
    sitename text,
    url text,
    frequently text,
    connectiontimeout text,
    parent integer,
    created text,
    modified text,
    deleted text,
    credentialid integer
);


ALTER TABLE public.monitoredwebsites OWNER TO postgres;

--
-- Name: monitoredwebsites_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.monitoredwebsites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.monitoredwebsites_id_seq OWNER TO postgres;

--
-- Name: monitoredwebsites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.monitoredwebsites_id_seq OWNED BY public.monitoredwebsites.id;


--
-- Name: proxies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proxies (
    id integer NOT NULL,
    ip text NOT NULL,
    port text NOT NULL,
    proxytype text,
    responsetime text,
    details json,
    status text
);


ALTER TABLE public.proxies OWNER TO postgres;

--
-- Name: proxies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proxies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.proxies_id_seq OWNER TO postgres;

--
-- Name: proxies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proxies_id_seq OWNED BY public.proxies.id;


--
-- Name: responsestates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.responsestates (
    id integer NOT NULL,
    response jsonb,
    notification jsonb,
    created text,
    webid integer
);


ALTER TABLE public.responsestates OWNER TO postgres;

--
-- Name: responsestates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.responsestates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.responsestates_id_seq OWNER TO postgres;

--
-- Name: responsestates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.responsestates_id_seq OWNED BY public.responsestates.id;


--
-- Name: structures; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.structures (
    id integer NOT NULL,
    structure jsonb,
    created text,
    modified text,
    deleted text,
    webid integer
);


ALTER TABLE public.structures OWNER TO postgres;

--
-- Name: structures_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.structures_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.structures_id_seq OWNER TO postgres;

--
-- Name: structures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.structures_id_seq OWNED BY public.structures.id;


--
-- Name: structurestates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.structurestates (
    id integer NOT NULL,
    notification jsonb,
    created text,
    structureid integer
);


ALTER TABLE public.structurestates OWNER TO postgres;

--
-- Name: structurestates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.structurestates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.structurestates_id_seq OWNER TO postgres;

--
-- Name: structurestates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.structurestates_id_seq OWNED BY public.structurestates.id;


--
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    token text NOT NULL,
    created text,
    expired text
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- Name: credentials id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credentials ALTER COLUMN id SET DEFAULT nextval('public.credentials_id_seq'::regclass);


--
-- Name: domains id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domains ALTER COLUMN id SET DEFAULT nextval('public.domains_id_seq'::regclass);


--
-- Name: domainsstates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domainsstates ALTER COLUMN id SET DEFAULT nextval('public.domainsstates_id_seq'::regclass);


--
-- Name: logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logs ALTER COLUMN id SET DEFAULT nextval('public.logs_id_seq'::regclass);


--
-- Name: monitoredwebsites id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monitoredwebsites ALTER COLUMN id SET DEFAULT nextval('public.monitoredwebsites_id_seq'::regclass);


--
-- Name: proxies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proxies ALTER COLUMN id SET DEFAULT nextval('public.proxies_id_seq'::regclass);


--
-- Name: responsestates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.responsestates ALTER COLUMN id SET DEFAULT nextval('public.responsestates_id_seq'::regclass);


--
-- Name: structures id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.structures ALTER COLUMN id SET DEFAULT nextval('public.structures_id_seq'::regclass);


--
-- Name: structurestates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.structurestates ALTER COLUMN id SET DEFAULT nextval('public.structurestates_id_seq'::regclass);


--
-- Data for Name: credentials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.credentials (id, credentialname, password, email, phone, created, modified, deleted, token, status) FROM stdin;
\.


--
-- Data for Name: domains; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.domains (id, domains, ip, created, modified, deleted, webid) FROM stdin;
\.


--
-- Data for Name: domainsstates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.domainsstates (id, notification, created, domainsid) FROM stdin;
\.


--
-- Data for Name: logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.logs (id, log, created, credentialid) FROM stdin;
\.


--
-- Data for Name: monitoredwebsites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.monitoredwebsites (id, sitename, url, frequently, connectiontimeout, parent, created, modified, deleted, credentialid) FROM stdin;
\.


--
-- Data for Name: proxies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proxies (id, ip, port, proxytype, responsetime, details, status) FROM stdin;
45	125.25.202.108	3128	Anonymous	48ms	{"ip":"125.25.202.108","country":"Thailand","region":"Changwat Phitsanulok","city":"Phitsanulok","isp":"TOT Public Company Limited","organization":"TOT Public Company Limited","lat":"16.8333","long":"100.2500"}	active
55	118.97.85.222	8080	Transparent	584ms	\N	active
16	5.16.11.190	8080	Transparent	85ms	{"ip":"5.16.11.190","country":"Russia","region":"Not Available","city":"Not Available","isp":"JSC ER-Telecom Holding","organization":"Enforta","lat":"55.7386","long":"37.6068"}	active
60	110.50.85.174	8080	Transparent	56ms	\N	active
65	36.67.10.77	8888	Transparent	46ms	{"ip":"36.67.10.77","country":"Indonesia","region":"Central Java","city":"Semarang","isp":"PT Telekomunikasi Indonesia","organization":"PT TELKOM INDONESIA","lat":"-6.9931","long":"110.4210"}	active
59	202.138.242.88	8080	Transparent	396ms	{"ip":"202.138.242.88","country":"Indonesia","region":"West Java","city":"Bandung","isp":"Melsa-i-net AS","organization":"Melsa-i-net AS","lat":"-6.9222","long":"107.6070"}	active
89	170.84.4.7	8080	Transparent	193ms	{"ip":"177.154.161.58","country":"Brazil","region":"Espirito Santo","city":"Vila Velha","isp":"Brasil Radiowave Ltda-ME","organization":"Brasil Radiowave Ltda-ME","lat":"-20.3333","long":"-40.2833"}	active
105	72.250.28.64	36851	Elite	657ms	\N	active
81	189.3.160.2	3128	Transparent	201ms	{"ip":"189.3.160.2","country":"Brazil","region":"Acre","city":"Rio Branco","isp":"CLARO S.A.","organization":"CLARO S.A.","lat":"-9.9667","long":"-67.8000"}	active
1357	86.57.176.228	8080	Transparent	573ms	\N	active
19	80.64.105.3	8080	Transparent	69ms	{"ip":"80.64.105.3","country":"Russia","region":"Saint Petersburg City","city":"Saint Petersburg","isp":"CJSC RASCOM","organization":"Life-Link","lat":"59.9321","long":"30.1968"}	active
98	179.109.144.25	8080	Transparent	401ms	{"ip":"179.109.144.25","country":"Brazil","region":"Espirito Santo","city":"Alegre","isp":"DIGITAL NET LTDA","organization":"DIGITAL NET LTDA","lat":"-20.7090","long":"-41.5194"}	active
18	80.244.224.62	8080	Transparent	616ms	\N	active
39	101.108.92.20	8080	Transparent	48ms	{"ip":"101.108.92.20","country":"Thailand","region":"Not Available","city":"Not Available","isp":"TOT Public Company Limited","organization":"TOT Public Company Limited","lat":"13.7500","long":"100.4670"}	active
94	177.10.21.154	8080	Transparent	87ms	{"ip":"177.10.21.154","country":"Brazil","region":"Minas Gerais","city":"Varginha","isp":"Datanet Provedor de Internet Ltda","organization":"Datanet Provedor de Internet Ltda","lat":"-21.5658","long":"-45.4118"}	active
58	36.67.37.203	8080	Transparent	237ms	\N	active
103	98.101.202.219	3128	Transparent	40ms	{"ip":"98.101.202.219","country":"United States","region":"South Carolina","city":"Salters","isp":"Time Warner Cable Internet LLC","organization":"Time Warner Cable Internet LLC","lat":"33.5611","long":"-79.8300"}	active
75	36.89.119.149	8080	Transparent	383ms	{"ip":"36.89.119.149","country":"Indonesia","region":"Not Available","city":"Not Available","isp":"PT Telekomunikasi Indonesia","organization":"PT Telekomunikasi Indonesia","lat":"-6.1750","long":"106.8290"}	active
10	77.75.6.34	8080	Elite	90ms	{"ip":"77.75.6.34","country":"Russia","region":"Moscow","city":"Moscow","isp":"Net By Net Holding LLC","organization":"Net By Net Holding LLC","lat":"55.7522","long":"37.6156"}	active
53	103.217.173.194	80	Transparent	303ms	{"ip":"103.217.173.194","country":"Indonesia","region":"Jakarta Raya","city":"Jakarta","isp":"PT Anugerah Karunia Perkasa Abadi","organization":"PT Anugrah Karunia Perkasa Abadi","lat":"-6.1744","long":"106.8290"}	active
212	103.218.26.54	8080	Transparent	446ms	\N	active
127	43.242.209.1	8080	Transparent	163ms	\N	active
143	103.69.219.81	8080	Elite	310ms	{"ip":"103.69.219.81","country":"India","region":"Uttar Pradesh","city":"Mathura","isp":"ELXIRE DATA SERVICES PVT. LTD.","organization":"ELXIRE DATA SERVICES PVT. LTD.","lat":"27.5000","long":"77.6833"}	active
150	103.218.100.141	8080	Transparent	613ms	\N	active
170	81.17.131.59	8080	Transparent	251ms	{"ip":"81.17.131.59","country":"Ukraine","region":"Kharkivs'ka Oblast'","city":"Kharkiv","isp":"Aviti ltd.","organization":"ipv4 assignment for Bigline","lat":"49.9808","long":"36.2527"}	active
158	62.80.191.90	8080	Transparent	268ms	\N	active
163	31.129.170.186	8080	Elite	109ms	{"ip":"31.129.170.186","country":"Ukraine","region":"Kyiv","city":"Bila Tserkva","isp":"TOV Magnus Limited","organization":"TOV Magnus Limited","lat":"49.8094","long":"30.1121"}	active
1235	216.250.97.119	8080	Transparent	38ms	{"ip":"216.250.97.119","country":"Hong Kong SAR China","region":"HONG KONG","city":"Tai Koo","isp":"SoftLayer Technologies Inc.","organization":"HostHatch Hong Kong","lat":"22.2841","long":"114.2160"}	active
126	103.216.147.45	8080	Transparent	588ms	\N	active
199	183.220.43.89	8080	Anonymous	161ms	\N	active
197	222.88.147.121	8060	Elite	57ms	\N	active
136	103.59.212.93	8080	Transparent	726ms	{"ip":"103.26.55.86","country":"India","region":"Maharashtra","city":"Thane","isp":"Intech Online Private Limited","organization":"Intech Enterprises","lat":"19.2000","long":"72.9667"}	active
141	103.46.233.23	83	Transparent	294ms	\N	active
193	119.28.46.123	8888	Anonymous	857ms	\N	active
128	125.62.194.33	83	Transparent	454ms	\N	active
121	75.149.104.77	38414	Elite	68ms	{"ip":"75.149.104.77","country":"United States","region":"Georgia","city":"Eden","isp":"Comcast Cable Communications, LLC","organization":"Comcast Cable Communications, LLC","lat":"32.1738","long":"-81.3907"}	active
208	103.81.104.122	80	Transparent	152ms	{"ip":"103.81.104.122","country":"Bangladesh","region":"Dhaka Division","city":"Dhaka","isp":"SK Traders","organization":"SK Communication","lat":"23.7418","long":"90.4277"}	active
191	47.104.209.206	8080	Anonymous	495ms	\N	active
485	88.255.101.251	8080	Transparent	110ms	{"ip":"88.255.101.251","country":"Turkey","region":"Hatay","city":"Hatay","isp":"Turk Telekomunikasyon Anonim Sirketi","organization":"Turk Telekomunikasyon Anonim Sirketi","lat":"36.2066","long":"36.1572"}	active
499	82.222.50.194	9090	Transparent	568ms	\N	active
527	185.68.195.103	8080	Transparent	464ms	\N	active
2176	41.60.1.102	80	Anonymous	589ms	\N	active
469	190.152.37.142	8888	Elite	674ms	\N	active
523	142.93.51.134	8080	Transparent	35ms	{"ip":"142.93.51.134","country":"United States","region":"New Jersey","city":"North Bergen","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"40.8043","long":"-74.0121"}	active
526	145.14.163.34	8080	Transparent	587ms	\N	active
226	190.60.69.194	8080	Transparent	538ms	\N	active
260	82.146.236.38	8888	Elite	666ms	\N	active
241	190.147.136.253	8080	Transparent	59ms	\N	active
277	79.127.104.186	8080	Elite	858ms	\N	active
280	217.219.25.19	8080	Anonymous	147ms	\N	active
216	103.218.26.191	8080	Transparent	521ms	\N	active
230	181.143.62.226	8888	Elite	218ms	\N	active
290	185.134.96.42	8081	Anonymous	566ms	\N	active
282	89.37.0.68	8080	Anonymous	763ms	\N	active
240	190.60.69.162	8080	Transparent	357ms	\N	active
223	103.79.117.136	8080	Transparent	236ms	\N	active
285	5.160.137.27	8080	Transparent	293ms	\N	active
236	181.225.65.18	80	Elite	78ms	{"ip":"181.225.65.18","country":"Colombia","region":"Norte de Santander","city":"San José De Cùcuta","isp":"Internexa Global Network","organization":"INTERNEXA S.A. E.S.P","lat":"7.8939","long":"-72.5078"}	active
245	191.102.94.106	80	Elite	391ms	{"ip":"191.102.94.106","country":"Colombia","region":"Not Available","city":"Not Available","isp":"TV AZTECA SUCURSAL COLOMBIA","organization":"TV AZTECA SUCURSAL COLOMBIA","lat":"4.5981","long":"-74.0758"}	active
224	103.239.255.222	8080	Transparent	234ms	\N	active
274	185.151.117.135	8082	Transparent	88ms	{"ip":"185.151.117.135","country":"Poland","region":"Swietokrzyskie","city":"Busko-zdroj","isp":"Stanislaw Dabinski, trading as DBS Internet","organization":"DBS Internet, Busko-Zdroj","lat":"50.4667","long":"20.7167"}	active
258	5.226.70.68	80	Anonymous	903ms	{"ip":"5.226.70.68","country":"Poland","region":"Mazowieckie","city":"Warsaw","isp":"Netia SA","organization":"NOVAMEDIA INNOVISION sp. z o.o.","lat":"52.2500","long":"21.0000"}	active
310	110.74.221.37	8080	Transparent	70ms	\N	active
278	5.202.191.242	8080	Elite	110ms	\N	active
298	188.209.153.86	8080	Transparent	725ms	\N	active
288	91.241.21.121	8080	Transparent	110ms	\N	active
309	203.189.155.117	8080	Transparent	47ms	\N	active
300	93.126.36.253	8080	Transparent	120ms	\N	active
239	190.248.153.162	8080	Transparent	261ms	\N	active
270	79.190.145.142	3128	Transparent	507ms	\N	active
247	181.49.24.126	8081	Anonymous	34ms	\N	active
237	190.121.158.122	8080	Transparent	206ms	\N	active
307	96.9.90.64	80	Transparent	95ms	\N	active
507	38.64.180.133	8080	Transparent	57ms	{"ip":"38.64.180.133","country":"Canada","region":"Ontario","city":"Toronto","isp":"Accelerated Connections Inc.","organization":"Accelerated Connections Inc.","lat":"43.6329","long":"-79.3611"}	active
476	195.175.74.254	80	Transparent	203ms	\N	active
431	188.175.70.98	8080	Transparent	212ms	\N	active
426	82.209.49.200	8080	Transparent	853ms	\N	active
440	185.15.109.80	8080	Transparent	87ms	\N	active
514	68.171.68.0	8081	Transparent	300ms	\N	active
491	78.186.111.109	8080	Elite	192ms	{"ip":"78.186.111.109","country":"Turkey","region":"Istanbul","city":"Istanbul","isp":"Turk Telekomunikasyon Anonim Sirketi","organization":"Turk Telekomunikasyon Anonim Sirketi","lat":"41.0177","long":"28.9744"}	active
432	77.48.136.171	8080	Elite	129ms	\N	active
473	138.122.108.50	8081	Transparent	133ms	\N	active
468	186.178.10.158	8888	Elite	989ms	\N	active
434	146.120.227.3	8080	Transparent	230ms	\N	active
443	217.182.10.106	8080	Elite	76ms	\N	active
450	109.72.10.83	32861	Elite	141ms	\N	active
452	186.47.83.126	80	Transparent	59ms	\N	active
433	188.175.230.225	8080	Transparent	371ms	\N	active
515	198.50.145.28	80	Elite	35ms	\N	active
420	181.10.230.90	3128	Transparent	171ms	{"ip":"181.10.230.90","country":"Argentina","region":"Jujuy","city":"San Salvador De Jujuy","isp":"Telecom Argentina S.A.","organization":"Telecom Argentina S.A.","lat":"-24.1946","long":"-65.2971"}	active
396	83.47.251.143	8080	Transparent	444ms	{"ip":"83.47.251.143","country":"Spain","region":"Extremadura","city":"Barcarrota","isp":"TELEFONICA DE ESPANA","organization":"Telefonica de Espana SAU","lat":"38.5147","long":"-6.8492"}	active
2208	197.243.34.226	3128	Transparent	80ms	\N	active
341	155.232.186.14	3128	Transparent	134ms	\N	active
386	62.82.173.83	8082	Elite	408ms	\N	active
366	109.120.252.51	8080	Elite	102ms	\N	active
370	95.158.128.189	8080	Elite	232ms	\N	active
319	103.246.147.50	8888	Elite	388ms	\N	active
418	170.79.16.19	8080	Transparent	558ms	\N	active
334	41.160.136.66	8080	Transparent	128ms	\N	active
385	188.165.132.181	3128	Transparent	55ms	{"ip":"188.165.132.181","country":"Spain","region":"Madrid","city":"Madrid","isp":"OVH SAS","organization":"OVH Hispano","lat":"40.4165","long":"-3.7026"}	active
407	200.81.160.252	8080	Transparent	361ms	\N	active
421	190.15.216.48	8080	Transparent	163ms	\N	active
392	62.14.178.72	53281	Elite	90ms	\N	active
359	91.134.245.14	9999	Elite	819ms	{"ip":"91.134.137.116","country":"France","region":"Nord-Pas-de-Calais","city":"Roubaix","isp":"OVH SAS","organization":"OVH SAS","lat":"50.6942","long":"3.1746"}	active
415	200.2.125.90	8080	Transparent	589ms	\N	active
348	154.70.134.204	8080	Transparent	332ms	\N	active
402	190.52.34.198	8082	Transparent	88ms	{"ip":"190.52.34.198","country":"Argentina","region":"Jujuy","city":"San Salvador de Jujuy","isp":"TV MUSIC HOUSE JUJUY","organization":"TV MUSIC HOUSE JUJUY","lat":"-24.1833","long":"-65.3000"}	active
350	41.160.136.77	8080	Transparent	144ms	\N	active
331	155.232.186.74	3128	Transparent	327ms	\N	active
413	190.122.15.1	4444	Transparent	91ms	{"ip":"200.50.240.4","country":"Argentina","region":"Buenos Aires","city":"Marcos Paz","isp":"RSONet","organization":"RSONet","lat":"-34.7806","long":"-58.8374"}	active
410	200.5.226.118	80	Transparent	190ms	\N	active
339	41.222.226.47	80	Anonymous	58ms	\N	active
380	195.235.68.61	3128	Transparent	652ms	\N	active
352	82.103.93.22	80	Anonymous	47ms	\N	active
354	95.111.124.24	8888	Elite	803ms	\N	active
343	41.149.76.38	8080	Anonymous	75ms	\N	active
926	86.122.4.13	8080	Elite	352ms	{"ip":"86.122.4.13","country":"Romania","region":"Judetul Botosani","city":"Botoşani","isp":"RCS & RDS SA","organization":"RCS & RDS Business","lat":"47.7500","long":"26.6667"}	active
938	86.34.158.116	8080	Elite	76ms	{"ip":"86.34.158.116","country":"Romania","region":"Not Available","city":"Not Available","isp":"TELEKOM ROMANIA COMMUNICATION S.A","organization":"Romtelecom Data Network","lat":"46.0000","long":"25.0000"}	active
943	86.123.166.109	8080	Elite	255ms	\N	active
947	188.211.227.253	53281	Transparent	978ms	\N	active
948	46.102.73.244	53281	Elite	124ms	{"ip":"46.102.73.244","country":"Romania","region":"Gorj","city":"Târgu Jiu","isp":"Digital Cable Systems S.A.","organization":"DIGITAL CABLE SYSTEMS SA","lat":"45.0500","long":"23.2833"}	active
950	85.186.22.142	8888	Elite	771ms	\N	active
951	213.163.122.198	8080	Transparent	248ms	\N	active
776	201.209.115.171	8080	Anonymous	534ms	\N	active
1549	41.39.63.112	40591	Elite	192ms	\N	active
453	186.178.10.138	8080	Transparent	86ms	{"ip":"186.178.10.138","country":"Ecuador","region":"Provincia de Manabi","city":"Portoviejo","isp":"CORPORACION NACIONAL DE TELECOMUNICACIONES - CNT EP","organization":"CORPORACION NACIONAL DE TELECOMUNICACIONES - CNT EP","lat":"-1.0500","long":"-80.4500"}	active
454	138.122.108.50	8080	Transparent	202ms	\N	active
502	47.206.13.115	40285	Elite	241ms	{"ip":"47.206.13.115","country":"United States","region":"Florida","city":"Clearwater","isp":"Frontier Communications of America, Inc.","organization":"Frontier Communications of America, Inc.","lat":"27.9839","long":"-82.7181"}	active
457	181.211.38.138	8080	Transparent	156ms	\N	active
463	138.122.108.51	8080	Transparent	148ms	\N	active
504	68.171.67.0	8081	Transparent	888ms	\N	active
497	213.74.252.162	8080	Transparent	569ms	\N	active
461	200.107.15.114	8888	Elite	692ms	{"ip":"200.107.15.114","country":"Ecuador","region":"Chimborazo","city":"Riobamba","isp":"CORPORACION NACIONAL DE TELECOMUNICACIONES - CNT EP","organization":"CORPORACION NACIONAL DE TELECOMUNICACIONES - CNT EP","lat":"-1.6667","long":"-78.6333"}	active
516	173.231.106.226	8080	Transparent	154ms	\N	active
27	101.51.106.58	50507	Elite	83ms	\N	active
520	159.203.46.243	8080	Transparent	35ms	{"ip":"159.203.46.243","country":"Canada","region":"Ontario","city":"Toronto","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"43.6555","long":"-79.3626"}	active
479	213.74.252.176	8080	Transparent	145ms	\N	active
477	185.203.170.92	8080	Transparent	78ms	{"ip":"212.175.0.193","country":"Turkey","region":"Usak","city":"Usak","isp":"Turk Telekomunikasyon Anonim Sirketi","organization":"Turk Telekomunikasyon Anonim Sirketi","lat":"38.6735","long":"29.4058"}	active
510	107.161.9.173	8080	Transparent	718ms	\N	active
482	82.222.50.199	9090	Transparent	131ms	\N	active
480	213.74.252.185	8080	Transparent	608ms	\N	active
494	185.203.170.94	8080	Transparent	563ms	\N	active
442	5.59.137.90	8888	Elite	121ms	\N	active
548	94.138.191.38	41258	Elite	288ms	\N	active
616	138.122.96.49	8080	Transparent	580ms	\N	active
559	51.255.161.222	80	Elite	409ms	{"ip":"51.255.161.222","country":"France","region":"Nord-Pas-de-Calais","city":"Roubaix","isp":"OVH SAS","organization":"OVH SAS","lat":"50.6942","long":"3.1746"}	active
622	201.140.116.186	8080	Transparent	67ms	{"ip":"201.140.116.186","country":"Mexico","region":"Sinaloa","city":"Mazatlán","isp":"Operbes, S.A. de C.V.","organization":"Operbes, S.A. de C.V.","lat":"23.2404","long":"-106.4060"}	active
580	124.41.214.113	8080	Transparent	517ms	\N	active
607	177.241.245.218	8888	Elite	184ms	\N	active
587	124.41.215.157	8080	Transparent	235ms	\N	active
591	124.41.214.113	80	Transparent	142ms	\N	active
612	138.122.96.106	8080	Transparent	590ms	\N	active
615	189.199.112.138	8080	Transparent	116ms	\N	active
582	124.41.213.33	8080	Transparent	400ms	\N	active
583	110.44.124.19	8080	Transparent	166ms	\N	active
590	103.1.94.69	8080	Transparent	60ms	{"ip":"103.1.94.69","country":"Nepal","region":"NEPAL","city":"Simara","isp":"Classic Tech Pvt. Ltd.","organization":"ClassicTech Pvt. Ltd.","lat":"27.1667","long":"84.9833"}	active
613	200.188.151.212	8080	Transparent	778ms	\N	active
549	92.245.161.204	53281	Elite	180ms	\N	active
550	88.149.203.30	46909	Elite	107ms	{"ip":"88.149.203.30","country":"Italy","region":"Lombardy","city":"Varese","isp":"EOLO S.p.A.","organization":"EOLO S.p.A.","lat":"45.8000","long":"8.8333"}	active
576	124.41.217.210	8080	Transparent	994ms	{"ip":"124.41.217.210","country":"Nepal","region":"NEPAL","city":"Baijnathpurwa","isp":"WorldLink Communications Pvt Ltd","organization":"Lumbini Net","lat":"28.1667","long":"81.6667"}	active
578	110.44.124.18	8080	Transparent	141ms	\N	active
579	110.44.124.22	8080	Transparent	688ms	\N	active
585	116.66.197.167	8080	Transparent	230ms	{"ip":"116.66.197.167","country":"Nepal","region":"Central Region","city":"Kathmandu","isp":"Subisu Cable Net Nepal","organization":"Subisu Cable Net Nepal","lat":"27.7167","long":"85.3167"}	active
604	187.189.80.114	3128	Transparent	70ms	\N	active
603	187.217.189.229	8081	Anonymous	665ms	\N	active
566	37.59.136.91	80	Elite	64ms	\N	active
599	124.41.213.36	46627	Elite	76ms	\N	active
554	176.31.125.111	80	Elite	28ms	\N	active
555	188.213.31.170	443	Elite	149ms	\N	active
556	51.254.132.238	90	Elite	28ms	\N	active
567	91.134.221.168	80	Anonymous	63ms	\N	active
858	180.210.201.57	3130	Transparent	163ms	\N	active
852	47.88.192.22	8080	Anonymous	778ms	\N	active
853	128.199.242.152	8080	Transparent	556ms	\N	active
778	190.72.144.56	8080	Anonymous	338ms	\N	active
779	186.88.154.153	8080	Anonymous	295ms	\N	active
780	190.206.27.193	8080	Anonymous	799ms	\N	active
781	201.242.158.122	8080	Anonymous	973ms	\N	active
783	186.93.248.249	8080	Transparent	1000ms	\N	active
1037	58.179.14.183	35296	Elite	110ms	{"ip":"58.179.14.183","country":"Australia","region":"New South Wales","city":"Sydney","isp":"Primus Telecommunications","organization":"WBroadband","lat":"-33.8612","long":"151.1980"}	active
1043	139.59.188.36	80	Elite	635ms	\N	active
1048	119.40.109.154	8080	Transparent	569ms	\N	active
711	221.120.219.214	80	Transparent	170ms	{"ip":"221.120.219.214","country":"Pakistan","region":"Not Available","city":"Not Available","isp":"Pakistan Telecommunication Company Limited","organization":"ITI","lat":"30.0000","long":"70.0000"}	active
687	89.216.26.231	8080	Transparent	101ms	\N	active
718	43.245.131.205	8080	Transparent	97ms	{"ip":"43.245.131.205","country":"Pakistan","region":"Sindh","city":"Karachi","isp":"Connect Communications","organization":"Connect Communications","lat":"24.9056","long":"67.0822"}	active
726	185.91.166.212	4550	Elite	85ms	{"ip":"185.91.166.212","country":"Czech Republic","region":"Ustecky kraj","city":"Ustek","isp":"ELDATA prazska s.r.o.","organization":"ELDATA prazska s.r.o.","lat":"50.5833","long":"14.3667"}	active
680	212.200.89.11	8080	Transparent	220ms	\N	active
671	195.123.219.193	3128	Elite	153ms	{"ip":"195.123.219.193","country":"Netherlands","region":"Not Available","city":"Not Available","isp":"ITL Company","organization":"Layer6 Networks","lat":"52.3824","long":"4.8995"}	active
686	212.200.126.14	8080	Transparent	496ms	{"ip":"212.200.23.18","country":"Serbia","region":"SERBIA","city":"Pirot","isp":"TELEKOM SRBIJA a.d.","organization":"TELEKOM SRBIJA","lat":"43.1531","long":"22.5861"}	active
648	185.147.57.89	80	Transparent	153ms	\N	active
700	79.101.98.2	53281	Elite	70ms	\N	active
705	180.92.156.150	8080	Transparent	128ms	{"ip":"180.92.156.150","country":"Pakistan","region":"Sindh","city":"Karachi","isp":"Fiberlink Pvt.Ltd","organization":"Fiberlink Pvt. Ltd.","lat":"24.9056","long":"67.0822"}	active
706	103.18.243.154	8080	Transparent	85ms	\N	active
674	213.125.130.148	8090	Transparent	74ms	\N	active
730	80.95.103.137	8080	Elite	127ms	{"ip":"80.95.103.137","country":"Czech Republic","region":"Kraj Vysocina","city":"Ocmanice","isp":"Vodafone Czech Republic a.s.","organization":"Vodafone Czech Republic a.s.","lat":"49.2333","long":"16.1167"}	active
735	91.245.7.4	23500	Elite	59ms	{"ip":"91.245.7.4","country":"Czech Republic","region":"Stredocesky kraj","city":"Trebonice","isp":"Turk Telekom International SK, s.r.o","organization":"Fast Communication, s.r.o.","lat":"50.0459","long":"14.2788"}	active
690	195.178.56.35	8080	Transparent	167ms	\N	active
694	109.92.223.230	8080	Transparent	173ms	{"ip":"109.92.223.230","country":"Serbia","region":"SERBIA","city":"Sjenica","isp":"TELEKOM SRBIJA a.d.","organization":"TELEKOM SRBIJA","lat":"43.2731","long":"19.9994"}	active
649	185.147.57.238	80	Transparent	257ms	\N	active
650	185.147.57.208	80	Transparent	390ms	\N	active
673	185.179.204.100	3128	Elite	236ms	\N	active
669	51.15.50.22	8118	Elite	68ms	\N	active
652	188.166.203.93	3128	Elite	120ms	\N	active
658	178.62.193.217	3128	Elite	811ms	\N	active
679	212.200.126.16	8080	Transparent	539ms	\N	active
1051	178.128.101.158	80	Transparent	28ms	{"ip":"178.128.101.158","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
1057	178.128.216.69	8080	Transparent	28ms	{"ip":"178.128.216.69","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
953	79.106.45.154	8080	Transparent	1000ms	\N	active
965	79.106.164.74	53281	Elite	85ms	\N	active
755	211.21.120.163	8080	Transparent	173ms	\N	active
756	118.163.168.206	8080	Transparent	592ms	\N	active
764	114.33.13.105	3128	Transparent	45ms	\N	active
766	113.196.135.99	3128	Transparent	23ms	\N	active
768	118.163.168.205	8080	Transparent	74ms	\N	active
754	118.163.168.207	8080	Transparent	540ms	\N	active
790	186.167.49.10	8080	Transparent	67ms	{"ip":"186.167.49.10","country":"Venezuela","region":"Portuguesa","city":"Acarigua","isp":"Corporacion Digitel C.A.","organization":"Corporacion Digitel C.A.","lat":"9.5597","long":"-69.2019"}	active
796	190.201.95.84	8080	Transparent	220ms	\N	active
801	82.206.132.106	3128	Transparent	379ms	\N	active
811	94.177.252.200	8888	Transparent	156ms	\N	active
820	94.177.252.200	3128	Transparent	840ms	\N	active
824	51.38.217.121	808	Transparent	78ms	{"ip":"51.38.217.121","country":"France","region":"Nord-Pas-de-Calais","city":"Roubaix","isp":"OVH SAS","organization":"Infotrade Davit","lat":"50.6942","long":"3.1746"}	active
826	217.112.138.163	8888	Elite	387ms	\N	active
827	91.82.226.125	8080	Elite	66ms	\N	active
829	213.222.174.251	3128	Transparent	60ms	\N	active
830	79.120.177.106	8080	Transparent	95ms	\N	active
832	94.21.177.88	4550	Elite	533ms	{"ip":"94.21.177.88","country":"Hungary","region":"Budapest","city":"Budapest","isp":"DIGI Tavkozlesi es Szolgaltato Kft.","organization":"Fiber fixip","lat":"47.5000","long":"19.0833"}	active
833	46.251.18.129	8888	Elite	727ms	\N	active
839	185.205.249.168	51293	Elite	67ms	{"ip":"185.205.249.168","country":"Hungary","region":"Somogy megye","city":"Siófok","isp":"ZNET Telekom Zrt.","organization":"ZNET Telekom Zrt","lat":"46.9058","long":"18.0485"}	active
843	213.181.202.196	21776	Elite	190ms	{"ip":"213.181.202.196","country":"Hungary","region":"Budapest","city":"Budapest","isp":"Szatmar-Telekom Kft.","organization":"Szatmar-Telekom Kft.","lat":"47.4968","long":"19.0776"}	active
1534	193.227.49.82	8080	Transparent	84ms	\N	active
752	122.116.211.55	32875	Elite	515ms	\N	active
818	80.251.9.246	8080	Transparent	187ms	\N	active
757	1.164.250.10	8080	Transparent	755ms	\N	active
759	61.220.65.151	8080	Elite	30ms	\N	active
760	106.104.12.180	80	Elite	26ms	\N	active
761	59.127.27.243	8080	Elite	30ms	\N	active
763	1.175.141.73	3128	Transparent	459ms	\N	active
765	36.231.109.210	8080	Transparent	26ms	\N	active
769	114.34.206.45	8888	Elite	637ms	\N	active
956	213.163.113.96	8080	Transparent	284ms	\N	active
955	213.163.122.197	8080	Transparent	110ms	\N	active
966	46.183.122.78	40923	Elite	127ms	\N	active
969	213.163.104.65	46841	Elite	65ms	\N	active
970	79.106.48.139	8080	Transparent	275ms	\N	active
989	169.255.10.26	31055	Elite	228ms	\N	active
1148	149.3.91.202	3128	Transparent	251ms	{"ip":"149.3.91.202","country":"Georgia","region":"K'alak'i T'bilisi","city":"Tbilisi","isp":"JSC Silknet","organization":"JSC Silknet","lat":"41.7250","long":"44.7908"}	active
1151	93.113.67.85	8080	Transparent	92ms	{"ip":"93.113.67.85","country":"Moldova","region":"Chișinău Municipality","city":"Cricova","isp":"Moldtelecom SA","organization":"JSC Moldtelecom S.A.","lat":"47.1389","long":"28.8619"}	active
1154	188.138.252.197	3128	Transparent	59ms	\N	active
1158	86.105.81.90	8080	Elite	254ms	\N	active
861	128.199.86.76	3128	Transparent	29ms	\N	active
862	122.50.5.190	8080	Transparent	55ms	{"ip":"122.50.5.190","country":"Indonesia","region":"Banten","city":"Tangerang","isp":"PT.Mora Telematika Indonesia","organization":"PT.Mora Telematika Indonesia","lat":"-6.1781","long":"106.6300"}	active
868	180.210.201.55	3129	Transparent	125ms	\N	active
869	180.210.201.54	3128	Transparent	1000ms	\N	active
872	112.140.186.110	3128	Anonymous	37ms	\N	active
877	41.78.88.190	8080	Transparent	178ms	\N	active
878	41.76.158.86	8080	Elite	106ms	\N	active
880	197.210.129.142	80	Transparent	76ms	\N	active
882	105.112.83.163	8080	Transparent	171ms	\N	active
884	197.210.246.30	8080	Transparent	788ms	{"ip":"197.210.246.30","country":"Nigeria","region":"Delta","city":"Asaba","isp":"MTN NIGERIA Communication limited","organization":"MTN NIGERIA Communication limited","lat":"6.2006","long":"6.7338"}	active
885	105.235.203.230	8080	Elite	256ms	\N	active
888	41.67.135.4	8080	Elite	92ms	{"ip":"41.67.135.4","country":"Nigeria","region":"Lagos","city":"Lagos","isp":"Netcom Africa Limited","organization":"Netcom Africa Limited","lat":"6.4531","long":"3.3958"}	active
896	197.210.252.43	80	Transparent	129ms	{"ip":"197.210.252.43","country":"Nigeria","region":"Delta","city":"Warri","isp":"MTN NIGERIA Communication limited","organization":"MTN NIGERIA Communication limited","lat":"5.4577","long":"6.4333"}	active
897	41.73.251.229	30649	Elite	215ms	\N	active
898	41.73.251.226	30649	Elite	174ms	\N	active
910	136.243.103.94	80	Anonymous	38ms	{"ip":"136.243.103.94","country":"Germany","region":"Bayern","city":"Gunzenhausen","isp":"Hetzner Online GmbH","organization":"Hetzner Online GmbH","lat":"49.1280","long":"10.7704"}	active
911	185.164.111.197	8888	Elite	131ms	\N	active
913	5.9.58.22	3128	Transparent	516ms	\N	active
916	138.68.69.65	3128	Transparent	36ms	{"ip":"138.68.69.65","country":"Germany","region":"Hessen","city":"Frankfurt","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"50.1167","long":"8.6833"}	active
920	213.168.210.76	80	Anonymous	915ms	\N	active
928	46.102.76.70	8080	Transparent	75ms	\N	active
935	89.37.56.138	80	Transparent	80ms	\N	active
937	83.103.155.67	8888	Elite	582ms	\N	active
968	213.163.122.196	8080	Transparent	609ms	\N	active
973	185.188.218.66	33216	Elite	90ms	{"ip":"185.188.218.66","country":"Serbia","region":"Vojvodina","city":"Berisha","isp":"N.P.SH ISP - Broadcast","organization":"N.P.SH ISP - Broadcast","lat":"42.5333","long":"20.8500"}	active
979	197.232.63.200	8888	Elite	421ms	\N	active
980	213.147.83.17	8888	Transparent	173ms	\N	active
982	41.139.141.254	8888	Elite	506ms	{"ip":"41.139.141.254","country":"Kenya","region":"Not Available","city":"Not Available","isp":"Safaricom Limited","organization":"Safaricom Limited","lat":"1.0000","long":"38.0000"}	active
986	41.139.147.34	8080	Transparent	272ms	{"ip":"41.139.147.34","country":"Kenya","region":"Not Available","city":"Not Available","isp":"Safaricom Limited","organization":"Safaricom Limited","lat":"1.0000","long":"38.0000"}	active
987	41.79.169.89	8080	Transparent	275ms	\N	active
988	165.90.15.43	8888	Elite	508ms	\N	active
994	197.248.184.158	53281	Elite	94ms	{"ip":"197.248.184.158","country":"Kenya","region":"Not Available","city":"Not Available","isp":"Safaricom Limited","organization":"For Safaricom KENYA Enterprise Business Unit","lat":"1.0000","long":"38.0000"}	active
996	41.139.138.98	8888	Elite	123ms	\N	active
998	41.79.169.82	8080	Transparent	257ms	\N	active
1003	113.160.99.100	8080	Transparent	66ms	\N	active
1004	103.15.51.160	8080	Anonymous	170ms	{"ip":"103.15.51.160","country":"Vietnam","region":"Not Available","city":"Not Available","isp":"Online data services","organization":"Mat Bao Corp","lat":"16.0000","long":"106.0000"}	active
1007	123.30.172.60	3128	Anonymous	568ms	{"ip":"123.30.172.60","country":"Vietnam","region":"Not Available","city":"Not Available","isp":"VNPT Corp","organization":"VNPT Corp","lat":"16.0000","long":"106.0000"}	active
1008	42.115.26.154	8080	Elite	127ms	\N	active
1009	113.190.234.84	8080	Transparent	259ms	\N	active
1012	123.31.20.75	3128	Transparent	23ms	\N	active
1014	118.69.205.208	4624	Elite	268ms	\N	active
1021	27.72.98.89	8080	Transparent	50ms	{"ip":"27.72.98.89","country":"Vietnam","region":"Hanoi","city":"Hanoi","isp":"Viettel Group","organization":"Viettel Group","lat":"21.0333","long":"105.8500"}	active
1024	27.68.131.218	8080	Elite	216ms	\N	active
1030	125.254.65.98	8080	Transparent	650ms	\N	active
1032	123.50.153.238	8080	Transparent	952ms	\N	active
1035	58.96.152.70	8080	Transparent	826ms	\N	active
1073	178.128.21.245	8080	Transparent	30ms	{"ip":"178.128.21.245","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
1078	95.170.203.115	8080	Transparent	153ms	{"ip":"95.170.203.115","country":"Iraq","region":"Arbil","city":"Erbil","isp":"Newroz Telecom Ltd.","organization":"Rey Telecom in Ainkawa-4","lat":"36.1900","long":"44.0089"}	active
1083	213.32.254.188	8080	Elite	421ms	\N	active
1084	95.170.208.250	8080	Elite	303ms	\N	active
1088	185.37.161.22	58833	Elite	147ms	{"ip":"185.37.161.22","country":"Iraq","region":"Dahuk","city":"Zakho","isp":"Newroz Telecom Ltd.","organization":"Paik Communication Zakho 733","lat":"37.1442","long":"42.6872"}	active
1091	185.187.206.163	61941	Elite	91ms	\N	active
1101	150.95.80.19	3128	Transparent	81ms	\N	active
1105	139.162.77.162	3128	Transparent	314ms	\N	active
1108	157.65.31.220	3128	Elite	32ms	{"ip":"157.65.31.220","country":"Japan","region":"Fukuoka","city":"Nogata","isp":"NTT PC Communications, Inc.","organization":"NTTPC Communications,Inc","lat":"33.7199","long":"130.7400"}	active
1112	222.147.15.161	3128	Transparent	31ms	\N	active
1114	140.227.77.174	3128	Elite	47ms	{"ip":"140.227.77.174","country":"Japan","region":"Not Available","city":"Not Available","isp":"NTT PC Communications, Inc.","organization":"NTTPC Communications,Inc","lat":"35.6900","long":"139.6900"}	active
1118	218.42.252.43	80	Anonymous	175ms	\N	active
1119	202.221.140.183	80	Anonymous	139ms	\N	active
1126	212.72.137.66	3128	Transparent	99ms	\N	active
1127	212.72.137.71	3128	Transparent	287ms	\N	active
1128	146.255.225.146	8080	Transparent	262ms	\N	active
1132	81.16.246.44	8080	Elite	253ms	\N	active
1135	109.234.112.250	46675	Elite	181ms	{"ip":"109.234.112.250","country":"Georgia","region":"K'alak'i T'bilisi","city":"Tbilisi","isp":"DELTA-NET LTD","organization":"DELTA-NET Infrastructure Network","lat":"41.7250","long":"44.7908"}	active
1140	213.131.45.250	8080	Transparent	420ms	\N	active
1141	212.72.159.174	50323	Elite	184ms	{"ip":"212.72.159.174","country":"Georgia","region":"Dushet'is Raioni","city":"Tbilisi","isp":"Magticom Ltd.","organization":"Caucasus Online LLC","lat":"41.7250","long":"44.7908"}	active
1144	31.146.84.142	36657	Elite	90ms	{"ip":"31.146.84.142","country":"Georgia","region":"K'alak'i T'bilisi","city":"Tbilisi","isp":"JSC Silknet","organization":"JSC Silknet","lat":"41.7250","long":"44.7908"}	active
1072	178.128.244.25	8080	Elite	48ms	\N	active
1068	178.128.24.204	8080	Transparent	28ms	{"ip":"178.128.24.204","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
1076	159.255.163.189	80	Transparent	168ms	\N	active
1080	159.255.163.178	80	Transparent	242ms	\N	active
1081	185.89.90.46	8888	Elite	471ms	\N	active
1085	95.170.219.13	8080	Transparent	224ms	\N	active
1086	185.12.25.90	8080	Transparent	145ms	\N	active
1094	185.101.238.34	51994	Elite	111ms	\N	active
1239	58.82.242.25	8080	Elite	887ms	\N	active
1256	185.90.166.78	41862	Elite	61ms	{"ip":"185.90.166.78","country":"Slovakia","region":"Kosice","city":"Snina","isp":"Belnet Snina, s.r.o.","organization":"Belnet Snina, s.r.o.","lat":"48.9886","long":"22.1510"}	active
1260	86.110.229.65	57058	Elite	189ms	{"ip":"86.110.229.65","country":"Slovakia","region":"Bratislava","city":"Petrzalka","isp":"VNET a.s.","organization":"VNET-org-86.110.229.65","lat":"48.1233","long":"17.1287"}	active
1263	80.242.45.120	50454	Elite	156ms	{"ip":"80.242.45.120","country":"Slovakia","region":"Nitra","city":"Topoľčany","isp":"Axalnet, s.r.o.","organization":"Axalnet, s.r.o.","lat":"48.5325","long":"18.1431"}	active
1264	78.141.84.155	60424	Elite	146ms	\N	active
1166	85.204.183.183	53281	Elite	221ms	\N	active
1171	92.115.134.57	8080	Transparent	1000ms	\N	active
1173	195.22.239.170	47246	Elite	50ms	{"ip":"195.22.239.170","country":"Moldova","region":"Not Available","city":"Not Available","isp":"ORANGE MOLDOVA S.A.","organization":"Orange Moldova Network","lat":"47.0188","long":"28.8128"}	active
1182	175.126.192.99	80	Elite	41ms	{"ip":"175.126.192.99","country":"South Korea","region":"Not Available","city":"Not Available","isp":"SK Broadband Co Ltd","organization":"SK Broadband Co Ltd","lat":"37.5112","long":"126.9740"}	active
1184	203.231.7.48	80	Anonymous	185ms	\N	active
1189	219.254.34.231	3128	Transparent	48ms	\N	active
1193	52.79.239.229	3128	Transparent	30ms	{"ip":"52.79.239.229","country":"South Korea","region":"Incheon","city":"Incheon","isp":"Amazon.com, Inc.","organization":"Amazon.com, Inc.","lat":"37.4536","long":"126.7320"}	active
1199	106.240.254.138	80	Elite	474ms	{"ip":"106.240.254.138","country":"South Korea","region":"Gyeonggi-do","city":"Yongin-si","isp":"LG DACOM Corporation","organization":"LG DACOM Corporation","lat":"37.2336","long":"127.2010"}	active
1208	213.6.97.249	36127	Elite	116ms	\N	active
1214	213.6.68.190	36127	Elite	267ms	\N	active
1215	213.6.26.18	36127	Elite	503ms	\N	active
1217	213.6.64.18	8080	Transparent	360ms	\N	active
1224	213.6.65.146	36127	Elite	84ms	{"ip":"213.6.65.146","country":"Palestinian Territories","region":"WEST BANK","city":"Kafr Rumman","isp":"Palestine Telecommunications Company (PALTEL)","organization":"Palestine Telecommunications Company (PALTEL)","lat":"32.3158","long":"35.1258"}	active
1225	213.6.101.42	8080	Elite	407ms	\N	active
1241	223.19.41.6	80	Elite	36ms	\N	active
1242	103.42.213.177	8080	Elite	40ms	\N	active
1243	218.253.66.166	8060	Elite	52ms	\N	active
1245	58.176.13.2	80	Elite	61ms	\N	active
1246	103.218.240.182	80	Elite	44ms	\N	active
68	36.89.78.43	8080	Transparent	103ms	{"ip":"36.89.78.43","country":"Indonesia","region":"Not Available","city":"Not Available","isp":"PT Telekomunikasi Indonesia","organization":"PT Telekomunikasi Indonesia","lat":"-6.1750","long":"106.8290"}	active
1284	87.247.19.126	8888	Elite	699ms	\N	active
1282	85.29.136.212	8085	Transparent	68ms	\N	active
1280	109.248.236.94	8080	Transparent	773ms	\N	active
1279	109.248.236.91	8080	Transparent	588ms	\N	active
1283	85.29.136.212	8080	Transparent	69ms	\N	active
1286	109.248.236.92	8080	Transparent	177ms	\N	active
1287	92.46.240.95	8080	Transparent	810ms	\N	active
70	36.67.10.77	8080	Transparent	669ms	{"ip":"36.67.10.77","country":"Indonesia","region":"Central Java","city":"Semarang","isp":"PT Telekomunikasi Indonesia","organization":"PT TELKOM INDONESIA","lat":"-6.9931","long":"110.4210"}	active
73	101.128.68.123	8080	Transparent	367ms	{"ip":"101.128.68.123","country":"Indonesia","region":"West Java","city":"Bandung","isp":"PT. Cyberindo Aditama","organization":"PT. Cyberindo Aditama","lat":"-6.9222","long":"107.6070"}	active
80	45.6.93.10	8080	Elite	927ms	{"ip":"45.232.183.6","country":"Brazil","region":"Pernambuco","city":"Joao Alfredo","isp":"roberto da silva pessoa me","organization":"roberto da silva pessoa me","lat":"-7.8665","long":"-35.5891"}	active
83	187.103.67.161	8080	Transparent	156ms	{"ip":"187.103.67.161","country":"Brazil","region":"Pernambuco","city":"Recife","isp":"1TELECOM SERVICOS DE TECNOLOGIA EM INTERNET LTDA","organization":"1TELECOM SERVICOS DE TECNOLOGIA EM INTERNET LTDA","lat":"-8.0117","long":"-34.9529"}	active
88	177.54.142.222	8080	Anonymous	457ms	{"ip":"177.54.142.222","country":"Brazil","region":"Maranhao","city":"Sao Jose de Ribamar","isp":"IMAGEM EDITORACAO ELETRONICA E INFORMATICA LTDA","organization":"IMAGEM EDITORACAO ELETRONICA E INFORMATICA LTDA","lat":"-2.5807","long":"-44.1115"}	active
99	143.208.79.223	8080	Transparent	145ms	{"ip":"143.208.79.223","country":"Brazil","region":"Rio Grande do Sul","city":"Itaqui","isp":"Zottis e Costa Telecomunicações ltda","organization":"Zottis e Costa Telecomunicações ltda","lat":"-29.1333","long":"-56.5500"}	active
7	82.151.208.20	8080	Transparent	400ms	{"ip":"82.151.208.20","country":"Russia","region":"Not Available","city":"Not Available","isp":"INSYS LLC","organization":"INSYS LLC","lat":"55.7386","long":"37.6068"}	active
20	88.84.223.56	3128	Transparent	665ms	{"ip":"88.84.223.56","country":"Russia","region":"Moscow Oblast","city":"Noginsk","isp":"Flex Ltd.","organization":"Flex Ltd.","lat":"55.8536","long":"38.4411"}	active
33	183.89.13.36	8080	Transparent	553ms	{"ip":"183.89.13.36","country":"Thailand","region":"Changwat Lampang","city":"Lampang","isp":"Triple T Internet/Triple T Broadband","organization":"3BB Broadband Internet service Thailand","lat":"18.2983","long":"99.5072"}	active
1627	186.96.116.102	999	Transparent	363ms	{"ip":"186.96.116.102","country":"Colombia","region":"Distrito Especial","city":"Bogotá","isp":"TV AZTECA SUCURSAL COLOMBIA","organization":"TV AZTECA SUCURSAL COLOMBIA","lat":"4.6492","long":"-74.0628"}	active
584	116.90.234.122	8080	Transparent	74ms	{"ip":"116.90.234.122","country":"Nepal","region":"Central Region","city":"Kathmandu","isp":"Websurfer Nepal Communication System Pvt.Ltd","organization":"Internet Service Provider","lat":"27.7167","long":"85.3167"}	active
84	187.72.194.162	8080	Transparent	712ms	{"ip":"187.72.194.161","country":"Brazil","region":"Minas Gerais","city":"Planura","isp":"ALGAR TELECOM S/A","organization":"ALGAR TELECOM S/A","lat":"-20.0692","long":"-48.6752"}	active
22	87.103.234.116	3128	Elite	44ms	{"ip":"87.103.234.116","country":"Russia","region":"Zabaykal'skiy Kray","city":"Chita","isp":"PJSC Rostelecom","organization":"access net clients","lat":"52.0333","long":"113.5500"}	active
12	91.122.47.157	8081	Transparent	53ms	\N	active
35	171.99.190.38	8080	Transparent	53ms	\N	active
78	191.252.184.33	8080	Transparent	57ms	{"ip":"191.252.184.33","country":"Brazil","region":"Sao Paulo","city":"Guarulhos","isp":"Locaweb Serviços de Internet S/A","organization":"Locaweb Serviços de Internet S/A","lat":"-23.4120","long":"-46.4435"}	active
1919	31.209.100.211	8080	Transparent	63ms	\N	active
64	36.67.41.125	80	Transparent	269ms	\N	active
54	103.37.168.209	8090	Elite	118ms	\N	active
85	54.233.129.107	80	Elite	55ms	\N	active
2139	178.23.112.180	44563	Elite	816ms	\N	active
106	75.145.243.13	8888	Elite	319ms	\N	active
63	36.67.78.17	8080	Transparent	187ms	\N	active
2039	41.190.147.158	46947	Elite	279ms	\N	active
77	191.252.196.62	3128	Transparent	57ms	\N	active
2128	80.211.226.156	80	Anonymous	107ms	\N	active
48	183.88.238.45	8080	Transparent	212ms	\N	active
112	35.230.34.45	80	Anonymous	39ms	\N	active
151	217.12.212.150	8888	Elite	141ms	\N	active
157	217.12.212.150	304	Elite	541ms	\N	active
155	193.93.216.95	8080	Transparent	68ms	\N	active
164	217.12.212.150	3122	Elite	546ms	\N	active
117	138.68.254.198	33720	Elite	126ms	\N	active
181	103.210.22.85	8080	Elite	121ms	\N	active
176	223.93.145.186	8060	Elite	35ms	\N	active
177	39.137.69.10	8080	Elite	358ms	\N	active
178	39.137.107.98	8080	Elite	88ms	\N	active
109	54.177.53.69	80	Elite	320ms	\N	active
179	39.137.2.210	80	Elite	61ms	\N	active
180	39.137.2.226	80	Elite	59ms	\N	active
182	101.4.136.34	80	Elite	57ms	\N	active
134	103.25.155.5	8080	Transparent	252ms	\N	active
183	222.33.192.238	8118	Elite	79ms	\N	active
184	221.2.174.99	8060	Elite	51ms	\N	active
185	47.104.9.124	8080	Anonymous	888ms	\N	active
145	125.62.193.218	82	Transparent	214ms	\N	active
119	159.203.84.79	3128	Transparent	36ms	\N	active
190	124.89.237.160	8060	Elite	82ms	\N	active
133	103.245.9.30	6666	Elite	170ms	\N	active
1395	82.135.148.168	8080	Elite	245ms	\N	active
1396	78.57.227.227	53281	Transparent	110ms	\N	active
1397	78.58.23.176	34373	Elite	477ms	\N	active
1398	5.20.255.83	8080	Elite	625ms	\N	active
1399	5.20.255.82	8080	Elite	102ms	\N	active
1400	88.119.136.221	40773	Elite	138ms	\N	active
1408	31.47.198.61	80	Elite	300ms	\N	active
174	217.12.212.150	289	Elite	260ms	\N	active
122	208.127.71.43	41750	Elite	408ms	\N	active
148	14.141.38.129	80	Anonymous	60ms	\N	active
171	95.158.45.137	8888	Elite	95ms	\N	active
195	117.191.11.74	8080	Elite	64ms	\N	active
167	109.200.155.198	8080	Transparent	161ms	{"ip":"109.200.155.198","country":"Ukraine","region":"Autonomous Republic of Crimea","city":"Simferopol","isp":"LLC CRELCOM","organization":"LLC CRELCOM","lat":"44.9572","long":"34.1108"}	active
198	39.137.2.214	8080	Elite	52ms	\N	active
200	116.224.105.132	8888	Elite	396ms	\N	active
132	115.42.32.67	8080	Transparent	781ms	\N	active
201	45.249.102.21	8080	Transparent	584ms	{"ip":"45.249.102.6","country":"Bangladesh","region":"Dhaka","city":"Dhaka","isp":"Systems Solutions & development Technologies Limited","organization":"Carnival Internet","lat":"23.7916","long":"90.4152"}	active
189	123.206.31.111	9000	Elite	208ms	\N	active
186	111.43.139.151	80	Elite	61ms	\N	active
205	45.125.223.161	8080	Transparent	677ms	\N	active
192	47.104.193.87	8080	Anonymous	940ms	\N	active
188	123.127.217.170	80	Elite	322ms	\N	active
194	117.191.11.105	8080	Elite	57ms	\N	active
120	165.227.72.164	8080	Transparent	38ms	\N	active
139	203.100.75.133	8888	Elite	68ms	\N	active
175	46.164.140.22	8888	Elite	272ms	\N	active
115	216.56.85.100	8080	Transparent	36ms	\N	active
108	154.48.196.3	8080	Transparent	110ms	{"ip":"154.48.196.3","country":"Germany","region":"Hessen","city":"Frankfurt Am Main","isp":"TelcoVillage GmbH","organization":"Telcovillage GmbH","lat":"50.1019","long":"8.6342"}	active
160	46.172.76.104	8080	Elite	100ms	{"ip":"46.172.76.104","country":"Russia","region":"Moscow City","city":"Moscow","isp":"SKYSTAR TC LLC","organization":"SKYSTAR TC LLC","lat":"55.7522","long":"37.6156"}	active
124	166.159.115.50	39059	Elite	64ms	\N	active
213	103.229.86.249	8080	Transparent	184ms	\N	active
149	14.141.38.130	80	Anonymous	63ms	\N	active
111	166.143.199.252	55086	Elite	586ms	\N	active
225	103.218.26.102	8080	Transparent	232ms	{"ip":"103.218.26.102","country":"Bangladesh","region":"Dhaka","city":"Dhaka","isp":"Systems Solutions & development Technologies Limited","organization":"Carnival Internet","lat":"23.7916","long":"90.4152"}	active
305	110.74.196.232	38801	Elite	70ms	{"ip":"110.74.196.232","country":"Cambodia","region":"Phnom Penh","city":"Phnom Penh","isp":"EZECOM limited","organization":"EZECOM limited","lat":"11.5625","long":"104.9160"}	active
252	46.238.230.25	8080	Elite	120ms	\N	active
313	111.90.179.42	8080	Transparent	33ms	\N	active
263	88.199.164.144	8080	Transparent	139ms	\N	active
273	85.11.124.195	80	Transparent	312ms	\N	active
284	79.127.101.224	8080	Transparent	101ms	\N	active
289	31.47.61.35	8080	Anonymous	61ms	\N	active
262	31.11.177.235	80	Anonymous	56ms	\N	active
281	93.126.62.203	8080	Elite	650ms	\N	active
222	45.125.220.81	8080	Transparent	242ms	\N	active
272	83.144.123.154	8080	Transparent	240ms	\N	active
296	46.21.95.44	3128	Elite	70ms	\N	active
248	190.242.119.194	8085	Anonymous	21ms	\N	active
254	178.19.187.3	88	Anonymous	352ms	\N	active
286	82.99.228.149	8080	Elite	261ms	\N	active
217	103.218.26.74	8080	Transparent	154ms	\N	active
294	5.160.85.5	8080	Transparent	223ms	\N	active
279	46.209.162.201	8080	Elite	117ms	\N	active
251	109.196.127.35	8888	Transparent	59ms	\N	active
265	91.90.191.238	8080	Elite	95ms	{"ip":"91.90.191.238","country":"Poland","region":"Lesser Poland Voivodeship","city":"Krakow","isp":"3S Fibertech Sp. z o.o.","organization":"3S Fibertech Sp. z o.o.","lat":"50.0575","long":"19.9317"}	active
250	191.102.78.190	999	Transparent	220ms	\N	active
297	78.38.153.77	8080	Transparent	105ms	\N	active
269	87.239.45.34	8080	Elite	725ms	\N	active
299	37.32.40.178	8080	Transparent	101ms	\N	active
315	103.16.61.134	8080	Transparent	779ms	\N	active
287	46.36.96.30	8080	Transparent	85ms	\N	active
255	77.55.208.226	80	Anonymous	154ms	{"ip":"77.55.208.226","country":"Poland","region":"Not Available","city":"Not Available","isp":"Nazwa.pl Sp.z.o.o.","organization":"Nazwa.pl Sp.z.o.o.","lat":"52.2394","long":"21.0362"}	active
311	119.15.91.226	8080	Transparent	518ms	{"ip":"119.15.91.226","country":"Cambodia","region":"Phnom Penh","city":"Phnom Penh","isp":"WiCAM Corporation, LTD","organization":"WiCAM Corporation, LTD","lat":"11.5625","long":"104.9160"}	active
267	62.69.229.253	8888	Elite	140ms	\N	active
276	46.34.161.100	80	Transparent	95ms	\N	active
316	203.189.142.74	8080	Transparent	478ms	\N	active
220	120.50.12.146	8080	Transparent	85ms	\N	active
283	93.126.28.112	8080	Elite	111ms	\N	active
293	185.171.54.82	8080	Transparent	133ms	\N	active
295	82.99.228.156	8080	Elite	566ms	\N	active
291	185.161.36.226	8080	Anonymous	158ms	\N	active
232	190.131.254.91	3128	Transparent	228ms	\N	active
1499	219.92.19.185	49928	Elite	83ms	\N	active
1500	175.143.37.203	41960	Elite	445ms	\N	active
1501	190.122.185.202	8080	Transparent	93ms	\N	active
1502	190.122.186.227	8080	Transparent	713ms	\N	active
1240	202.61.87.152	8081	Elite	642ms	{"ip":"202.61.87.152","country":"Hong Kong SAR China","region":"Not Available","city":"Not Available","isp":"Anchnet Asia Limited","organization":"ABCDE GROUP COMPANY LIMITED","lat":"22.2500","long":"114.1670"}	active
346	41.222.226.46	80	Anonymous	70ms	\N	active
391	185.98.233.37	8080	Elite	1000ms	\N	active
365	79.124.2.2	8080	Transparent	692ms	\N	active
412	190.185.178.237	8080	Transparent	276ms	\N	active
353	62.176.123.148	3128	Elite	921ms	\N	active
342	196.30.33.42	3128	Transparent	349ms	{"ip":"196.30.33.42","country":"South Africa","region":"Not Available","city":"Not Available","isp":"MTN SA","organization":"owner = UUN004","lat":"-29.0000","long":"24.0000"}	active
387	88.148.92.23	8080	Transparent	337ms	\N	active
384	31.214.188.189	8080	Transparent	120ms	\N	active
2073	147.75.125.26	8181	Transparent	113ms	\N	active
395	88.148.92.10	8080	Transparent	677ms	\N	active
379	195.77.53.50	3128	Transparent	365ms	\N	active
368	95.158.137.241	8080	Transparent	606ms	\N	active
326	41.193.208.250	3128	Elite	86ms	\N	active
394	5.40.175.105	8082	Transparent	660ms	\N	active
383	185.66.175.156	3128	Transparent	153ms	\N	active
338	41.222.226.44	80	Anonymous	57ms	\N	active
367	91.92.211.248	8080	Transparent	92ms	\N	active
345	41.222.225.141	80	Anonymous	74ms	\N	active
372	213.91.221.33	8888	Elite	394ms	\N	active
330	197.89.116.214	8080	Transparent	241ms	\N	active
375	95.43.220.156	8888	Elite	133ms	\N	active
355	94.26.21.103	80	Transparent	74ms	{"ip":"94.26.21.103","country":"Bulgaria","region":"Sofia-Capital","city":"Sofia","isp":"NETX - NG LTD","organization":"NETX - NG LTD","lat":"42.6833","long":"23.3167"}	active
390	62.82.173.67	8082	Elite	267ms	\N	active
358	91.92.10.112	8080	Elite	65ms	\N	active
1940	62.240.54.176	8080	Transparent	85ms	\N	active
361	46.233.42.29	8080	Elite	175ms	\N	active
344	41.222.226.45	80	Anonymous	71ms	\N	active
340	41.222.225.143	80	Anonymous	70ms	\N	active
381	88.148.92.8	8080	Transparent	401ms	\N	active
325	110.74.195.15	54487	Elite	215ms	\N	active
400	195.235.204.178	8080	Transparent	57ms	\N	active
401	201.190.190.250	80	Transparent	136ms	\N	active
406	181.10.129.85	8080	Transparent	331ms	{"ip":"181.10.129.85","country":"Argentina","region":"Jujuy","city":"Jujuy","isp":"Telecom Argentina S.A.","organization":"MINISTERIO DE SALUD","lat":"-24.2028","long":"-65.1750"}	active
1487	150.242.180.151	80	Elite	107ms	\N	active
335	105.255.223.2	8080	Elite	123ms	\N	active
332	41.193.238.225	8080	Elite	148ms	{"ip":"41.193.238.234","country":"South Africa","region":"Gauteng","city":"Johannesburg","isp":"Vox Telecom Ltd","organization":"Vox Telecom Ltd","lat":"-26.2308","long":"28.0585"}	active
329	41.222.225.140	80	Anonymous	59ms	\N	active
409	181.15.156.126	8080	Transparent	92ms	\N	active
363	79.124.3.141	8081	Transparent	424ms	\N	active
376	5.40.227.209	8080	Transparent	423ms	{"ip":"62.81.76.18","country":"Spain","region":"Canarias","city":"San Miguel","isp":"VODAFONE ONO, S.A.","organization":"ONO","lat":"28.0263","long":"-16.6062"}	active
439	188.175.230.193	8080	Transparent	285ms	\N	active
467	181.211.114.226	3128	Transparent	70ms	\N	active
471	138.122.108.53	8081	Transparent	130ms	\N	active
472	186.46.125.226	8080	Transparent	138ms	\N	active
475	157.100.52.21	999	Transparent	81ms	\N	active
2295	154.66.100.3	31761	Transparent	148ms	\N	active
484	82.222.50.187	9090	Transparent	123ms	\N	active
455	190.63.191.46	8888	Elite	88ms	\N	active
511	142.93.200.42	3128	Transparent	37ms	\N	active
490	82.222.50.196	9090	Transparent	397ms	\N	active
501	142.93.200.42	80	Transparent	35ms	\N	active
446	93.153.95.186	47961	Elite	357ms	\N	active
456	181.198.242.220	8080	Transparent	292ms	\N	active
509	142.93.200.42	8080	Transparent	36ms	\N	active
1503	190.122.186.207	8080	Transparent	85ms	\N	active
496	213.74.252.183	8080	Transparent	597ms	\N	active
470	186.47.83.126	8080	Transparent	66ms	\N	active
466	186.46.125.226	8081	Transparent	71ms	\N	active
519	142.93.181.178	3128	Transparent	34ms	\N	active
498	82.222.50.186	9090	Transparent	538ms	\N	active
512	64.137.236.82	8080	Elite	507ms	\N	active
2325	190.80.97.28	52806	Elite	192ms	\N	active
486	88.255.138.84	23500	Elite	78ms	\N	active
1159	95.153.88.27	8080	Transparent	91ms	\N	active
8	46.0.203.186	8080	Elite	180ms	{"ip":"46.0.203.186","country":"Russia","region":"Samara Oblast","city":"Samara","isp":"JSC ER-Telecom Holding","organization":"JSC ER-Telecom Holding Samara Branch","lat":"53.1835","long":"50.1182"}	active
598	139.5.71.119	23500	Elite	156ms	{"ip":"139.5.71.119","country":"Nepal","region":"NEPAL","city":"Kathmandu","isp":"WorldLink Communications Pvt Ltd","organization":"Fiber Pool","lat":"27.7167","long":"85.3167"}	active
619	187.250.83.249	3128	Transparent	27ms	\N	active
540	217.182.5.191	8080	Elite	88ms	\N	active
545	185.100.13.219	53408	Elite	658ms	\N	active
551	176.31.125.111	77	Elite	67ms	\N	active
571	167.114.250.199	9999	Anonymous	280ms	\N	active
546	185.107.204.112	51016	Elite	217ms	\N	active
1608	200.105.209.118	443	Transparent	53ms	\N	active
1609	181.188.174.178	53281	Elite	42ms	\N	active
1610	200.105.179.250	53281	Elite	397ms	\N	active
1612	181.115.180.178	49233	Elite	224ms	\N	active
1653	77.53.88.246	8080	Elite	87ms	\N	active
537	80.211.3.43	8080	Transparent	54ms	\N	active
618	200.38.19.238	80	Transparent	105ms	\N	active
547	146.48.63.251	46543	Elite	251ms	\N	active
565	212.83.164.85	80	Elite	859ms	\N	active
594	124.41.211.195	33984	Elite	63ms	{"ip":"124.41.211.195","country":"Nepal","region":"NEPAL","city":"Birganj","isp":"WorldLink Communications Pvt Ltd","organization":"Lumbini Net","lat":"27.0000","long":"84.8667"}	active
611	187.141.152.194	59591	Elite	66ms	{"ip":"187.141.152.194","country":"Mexico","region":"Sinaloa","city":"Culiacán","isp":"Uninet S.A. de C.V.","organization":"Uninet S.A. de C.V.","lat":"24.6567","long":"-107.1750"}	active
542	88.86.190.121	58020	Elite	396ms	\N	active
564	51.254.127.194	8081	Elite	65ms	\N	active
605	189.198.224.1	80	Transparent	288ms	{"ip":"189.198.224.1","country":"Mexico","region":"Jalisco","city":"Santa María Tequepexpan","isp":"Mega Cable, S.A. de C.V.","organization":"Mega Cable, S.A. de C.V.","lat":"20.6000","long":"-103.4000"}	active
629	185.147.57.216	80	Transparent	566ms	\N	active
609	200.38.19.239	80	Transparent	539ms	\N	active
568	46.105.51.183	80	Elite	40ms	\N	active
617	187.190.218.136	3128	Transparent	1000ms	\N	active
572	91.206.198.222	80	Anonymous	43ms	\N	active
535	212.237.55.246	3128	Transparent	53ms	\N	active
627	185.147.57.130	80	Transparent	570ms	\N	active
557	51.254.132.238	80	Elite	68ms	\N	active
573	195.154.207.153	80	Anonymous	38ms	\N	active
563	188.213.31.170	80	Elite	514ms	\N	active
2216	41.79.198.36	49421	Elite	231ms	\N	active
531	62.170.140.136	3128	Transparent	500ms	\N	active
626	185.147.57.128	80	Transparent	230ms	\N	active
628	185.147.57.166	80	Transparent	652ms	\N	active
630	185.147.57.12	80	Transparent	210ms	\N	active
631	185.147.57.41	80	Transparent	60ms	\N	active
632	185.147.57.34	80	Transparent	258ms	\N	active
633	185.147.57.227	80	Transparent	106ms	\N	active
1907	94.133.96.104	37395	Elite	59ms	\N	active
561	51.254.127.194	8080	Elite	67ms	\N	active
544	185.73.137.51	40383	Elite	103ms	\N	active
624	38.124.203.98	60995	Elite	26ms	\N	active
574	147.100.164.42	80	Anonymous	49ms	\N	active
623	187.190.109.20	53281	Elite	309ms	\N	active
570	167.114.250.199	80	Anonymous	353ms	\N	active
664	198.199.127.16	80	Elite	49ms	\N	active
698	195.178.56.32	8080	Transparent	301ms	\N	active
704	27.255.4.170	80	Transparent	122ms	\N	active
737	93.99.233.123	9090	Elite	63ms	\N	active
636	185.147.57.164	80	Transparent	185ms	\N	active
663	185.31.192.128	8081	Transparent	45ms	\N	active
703	202.141.248.130	8080	Transparent	654ms	\N	active
662	185.179.204.118	3128	Elite	783ms	\N	active
716	202.166.169.18	80	Transparent	122ms	\N	active
643	185.147.57.107	80	Transparent	924ms	\N	active
683	89.216.17.178	8080	Elite	182ms	\N	active
653	93.190.142.214	80	Anonymous	40ms	\N	active
717	202.142.169.124	8080	Transparent	116ms	\N	active
677	212.200.126.226	8080	Transparent	232ms	\N	active
695	195.178.56.37	8080	Transparent	482ms	\N	active
651	188.166.222.152	3128	Transparent	43ms	\N	active
692	195.178.56.33	8080	Transparent	589ms	\N	active
638	185.147.57.122	80	Transparent	214ms	\N	active
661	185.179.204.108	3128	Elite	293ms	\N	active
665	188.166.95.119	8888	Elite	53ms	\N	active
696	109.122.87.132	41642	Elite	61ms	\N	active
701	210.2.153.149	8080	Transparent	300ms	\N	active
654	93.190.142.240	80	Anonymous	35ms	\N	active
667	185.179.204.112	3128	Elite	102ms	\N	active
707	202.142.158.114	8080	Transparent	115ms	\N	active
709	110.36.181.37	8080	Transparent	277ms	\N	active
642	185.147.57.149	80	Transparent	935ms	\N	active
715	202.142.172.131	8080	Transparent	307ms	\N	active
668	163.158.203.206	8080	Transparent	200ms	\N	active
637	185.147.57.143	80	Transparent	35ms	\N	active
719	27.255.4.170	8080	Transparent	126ms	\N	active
721	110.36.239.235	8080	Transparent	92ms	\N	active
722	110.39.167.90	8080	Transparent	904ms	\N	active
675	77.174.84.240	80	Elite	58ms	\N	active
656	185.179.204.120	3128	Elite	425ms	\N	active
731	82.209.49.196	8080	Transparent	350ms	\N	active
659	185.179.204.95	3128	Elite	592ms	\N	active
725	113.203.251.189	8080	Transparent	148ms	\N	active
660	81.85.232.166	8080	Transparent	150ms	\N	active
647	85.9.250.245	32814	Elite	44ms	{"ip":"85.9.250.245","country":"Latvia","region":"Rezeknes","city":"Berzgale","isp":"Starnet","organization":"DG-Starnet","lat":"56.6333","long":"27.5000"}	active
645	185.147.57.217	80	Transparent	353ms	\N	active
644	185.147.57.135	80	Transparent	724ms	\N	active
640	185.147.57.26	80	Transparent	63ms	\N	active
770	59.127.38.117	8080	Elite	32ms	\N	active
772	211.22.233.69	3128	Transparent	326ms	\N	active
748	93.170.114.228	8080	Elite	59ms	{"ip":"93.170.114.228","country":"Ukraine","region":"Kyyiv","city":"Kiev","isp":"UnionCOM Ltd","organization":"UnionCOM Ltd","lat":"50.4333","long":"30.5167"}	active
773	220.135.26.40	8888	Elite	23ms	\N	active
1741	81.93.87.47	30375	Elite	146ms	\N	active
1743	109.175.6.194	8080	Transparent	253ms	\N	active
1752	200.52.144.170	39150	Elite	99ms	\N	active
1749	168.181.122.97	56221	Elite	117ms	{"ip":"168.181.120.2","country":"Honduras","region":"Departamento de Colon","city":"Tocoa","isp":"ENRED S.DE.R.L","organization":"ENRED S.DE.R.L","lat":"15.6833","long":"-86.0000"}	active
1708	109.201.161.89	30262	Elite	210ms	{"ip":"109.201.161.89","country":"Kyrgyzstan","region":"Not Available","city":"Not Available","isp":"Mega-Line Ltd.","organization":"MEGALINE-NET-WIFI","lat":"41.0000","long":"75.0000"}	active
1755	181.114.56.242	8080	Elite	83ms	\N	active
1757	200.52.144.77	8080	Transparent	405ms	\N	active
1759	181.115.67.59	53281	Elite	148ms	\N	active
1760	190.92.5.158	53281	Elite	161ms	\N	active
1761	138.59.179.14	40523	Elite	199ms	\N	active
1764	181.114.59.238	30397	Elite	497ms	\N	active
1768	103.216.132.179	37336	Elite	823ms	\N	active
1766	170.245.59.250	30740	Elite	771ms	\N	active
1770	210.55.219.202	8080	Transparent	657ms	\N	active
1772	114.134.170.116	53281	Elite	175ms	\N	active
1774	103.193.138.1	8080	Transparent	504ms	\N	active
1776	182.54.160.233	37177	Elite	296ms	\N	active
1779	43.245.240.106	58203	Elite	75ms	\N	active
1784	45.120.116.247	34709	Elite	90ms	\N	active
1785	101.98.247.14	38203	Elite	716ms	\N	active
1791	41.77.13.230	45327	Elite	90ms	\N	active
1794	41.221.97.190	39251	Elite	357ms	\N	active
1792	196.11.80.138	61285	Elite	420ms	\N	active
1801	41.221.106.242	31854	Elite	121ms	\N	active
1710	92.62.68.144	57986	Elite	89ms	\N	active
1713	212.112.114.172	42647	Elite	79ms	{"ip":"212.112.114.172","country":"Kyrgyzstan","region":"Not Available","city":"Not Available","isp":"AKNET Ltd.","organization":"AKNET Ltd.","lat":"41.0000","long":"75.0000"}	active
1763	45.4.85.73	45574	Elite	35ms	\N	active
774	59.125.31.115	45965	Elite	585ms	\N	active
815	79.170.192.143	44879	Elite	74ms	{"ip":"79.170.192.142","country":"United Kingdom","region":"Not Available","city":"Not Available","isp":"KCOM Group Public Limited Company","organization":"Intrahost Limited","lat":"51.4964","long":"-0.1224"}	active
819	46.101.9.221	3128	Transparent	52ms	\N	active
823	178.62.92.127	3128	Transparent	47ms	\N	active
828	89.134.91.149	8888	Elite	461ms	\N	active
836	89.135.125.133	8080	Anonymous	892ms	\N	active
841	92.52.194.129	8888	Elite	708ms	\N	active
1912	78.130.38.10	46876	Elite	478ms	\N	active
2240	190.64.177.70	46918	Elite	904ms	\N	active
762	220.133.218.198	3128	Transparent	27ms	\N	active
753	125.227.83.68	8080	Transparent	549ms	\N	active
751	122.146.176.41	8080	Anonymous	203ms	\N	active
777	186.88.15.10	8080	Anonymous	545ms	\N	active
865	118.189.172.136	80	Elite	482ms	\N	active
867	128.199.67.20	3128	Elite	30ms	{"ip":"128.199.67.20","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
870	119.81.71.27	8123	Elite	517ms	\N	active
875	188.166.255.62	31587	Elite	152ms	{"ip":"188.166.255.62","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
879	41.78.88.186	8080	Transparent	269ms	\N	active
892	41.76.153.61	8080	Transparent	360ms	{"ip":"41.76.152.113","country":"Nigeria","region":"Edo","city":"Benin City","isp":"Swifttalk Limited","organization":"Swifttalk POP Routers","lat":"6.3350","long":"5.6275"}	active
900	197.234.38.42	38944	Elite	278ms	\N	active
1888	190.181.135.98	48458	Elite	45ms	\N	active
1900	88.157.176.94	44091	Elite	40ms	\N	active
1808	201.204.44.100	52972	Elite	459ms	\N	active
1833	162.251.159.22	8080	Elite	330ms	\N	active
1837	24.41.141.102	47718	Elite	236ms	\N	active
1840	67.206.202.138	53281	Elite	35ms	\N	active
1850	103.5.172.21	8080	Transparent	130ms	\N	active
1855	180.94.87.157	37587	Elite	303ms	\N	active
1852	103.215.210.221	39780	Elite	216ms	\N	active
1859	121.127.38.186	53281	Elite	403ms	\N	active
1865	190.52.164.252	48637	Elite	782ms	\N	active
1867	190.52.128.42	8888	Transparent	289ms	\N	active
1870	190.128.150.110	33724	Elite	76ms	\N	active
1879	181.174.162.46	23500	Elite	414ms	\N	active
1884	186.1.32.16	55477	Elite	189ms	\N	active
1893	190.212.134.227	3128	Transparent	657ms	\N	active
1894	190.53.38.98	51174	Elite	153ms	\N	active
1896	200.30.170.142	8888	Elite	695ms	\N	active
1911	212.18.181.98	31912	Elite	96ms	\N	active
1905	82.154.128.250	34995	Elite	76ms	\N	active
1908	213.58.202.70	54214	Elite	124ms	\N	active
1826	170.84.108.87	30401	Elite	575ms	\N	active
1830	24.139.73.82	52665	Elite	192ms	\N	active
1828	67.206.208.117	37257	Elite	39ms	\N	active
1805	41.217.219.61	8888	Elite	346ms	\N	active
1843	162.251.159.2	8080	Elite	338ms	\N	active
1809	186.159.216.173	60620	Elite	68ms	\N	active
1812	201.192.157.36	41052	Elite	337ms	\N	active
1829	162.251.159.25	8080	Elite	280ms	\N	active
1831	24.138.243.38	43577	Elite	527ms	\N	active
1838	67.206.206.138	8888	Elite	206ms	\N	active
1839	162.251.159.17	8080	Elite	83ms	\N	active
1844	162.251.159.26	8080	Elite	235ms	\N	active
1854	103.13.66.10	8080	Transparent	876ms	\N	active
1856	103.224.127.30	37742	Elite	925ms	\N	active
1868	201.217.4.101	53281	Elite	53ms	\N	active
1869	181.126.84.96	53281	Transparent	306ms	\N	active
1871	181.40.40.166	38684	Elite	67ms	\N	active
1872	181.40.127.18	39393	Elite	62ms	\N	active
1885	170.246.152.106	56838	Elite	43ms	\N	active
1886	186.1.4.228	35811	Elite	144ms	\N	active
1909	89.115.227.59	48793	Elite	84ms	\N	active
1814	190.123.130.122	47594	Elite	80ms	\N	active
1887	186.1.4.247	49443	Elite	139ms	\N	active
903	46.4.114.134	3128	Transparent	225ms	{"ip":"46.4.114.134","country":"Germany","region":"Bayern","city":"Gunzenhausen","isp":"Hetzner Online GmbH","organization":"Hetzner Online GmbH","lat":"49.1280","long":"10.7704"}	active
904	136.243.43.126	8888	Elite	632ms	\N	active
908	77.20.171.132	80	Elite	507ms	\N	active
909	46.101.167.43	80	Anonymous	139ms	\N	active
912	185.85.162.32	79	Elite	87ms	\N	active
919	78.47.157.159	80	Elite	57ms	\N	active
922	88.99.217.12	3128	Elite	89ms	{"ip":"88.99.217.12","country":"Germany","region":"Bayern","city":"Gunzenhausen","isp":"Hetzner Online GmbH","organization":"Hetzner Online GmbH","lat":"49.1280","long":"10.7704"}	active
930	81.196.94.69	8888	Elite	474ms	\N	active
1987	195.29.45.100	39740	Elite	1000ms	\N	active
1925	31.209.111.173	43863	Elite	139ms	\N	active
1931	165.16.46.193	8080	Transparent	336ms	\N	active
2006	196.27.108.175	53281	Elite	328ms	\N	active
2010	62.56.240.106	38291	Elite	690ms	\N	active
1943	165.16.113.213	53281	Elite	374ms	\N	active
1951	165.90.66.90	48534	Elite	179ms	\N	active
1952	196.3.97.71	23500	Elite	99ms	\N	active
1956	41.223.155.118	53281	Elite	454ms	\N	active
1965	41.139.51.98	53281	Elite	823ms	\N	active
1961	41.66.205.119	80	Transparent	197ms	\N	active
1964	41.189.164.74	8080	Transparent	137ms	\N	active
2018	84.11.103.18	23500	Elite	450ms	\N	active
1982	197.159.16.2	8080	Transparent	133ms	\N	active
1993	92.242.240.34	53035	Elite	51ms	\N	active
2003	196.27.116.162	41766	Elite	76ms	\N	active
1935	62.240.53.233	8080	Transparent	164ms	\N	active
1936	165.16.113.210	8080	Transparent	103ms	\N	active
1942	62.240.40.94	39715	Elite	43ms	\N	active
1946	196.40.113.242	37527	Elite	289ms	\N	active
1975	197.159.16.2	80	Transparent	77ms	\N	active
1986	85.114.48.146	37092	Elite	95ms	\N	active
1927	31.209.103.79	8080	Transparent	316ms	\N	active
1955	196.3.97.86	23500	Elite	143ms	\N	active
1958	196.3.97.82	23500	Elite	1000ms	\N	active
1963	41.66.244.238	80	Transparent	220ms	\N	active
1967	41.66.205.114	80	Transparent	246ms	\N	active
1968	41.139.45.78	8888	Elite	167ms	\N	active
1969	41.66.205.117	80	Transparent	811ms	\N	active
1970	41.66.205.113	80	Transparent	181ms	\N	active
1974	41.204.87.90	8080	Transparent	75ms	\N	active
1976	41.202.221.22	53281	Elite	546ms	\N	active
1979	41.205.83.154	8080	Transparent	70ms	\N	active
1981	195.24.202.185	8080	Transparent	360ms	\N	active
1984	197.159.0.214	60051	Elite	347ms	\N	active
1989	85.114.43.70	33690	Elite	456ms	\N	active
1990	195.29.45.98	39740	Elite	92ms	\N	active
1992	92.242.254.174	32191	Elite	187ms	\N	active
1994	91.226.8.218	36143	Elite	58ms	\N	active
1995	212.92.192.130	59249	Elite	155ms	\N	active
1996	195.29.106.178	58292	Elite	191ms	\N	active
1997	77.237.121.22	8080	Transparent	131ms	\N	active
2008	41.190.62.215	8888	Elite	677ms	\N	active
1918	31.209.110.52	30960	Elite	114ms	\N	active
1920	31.209.98.54	45586	Elite	64ms	\N	active
931	5.2.156.239	8080	Elite	678ms	{"ip":"5.2.156.239","country":"Romania","region":"Bucuresti","city":"Bucharest","isp":"RCS & RDS SA","organization":"RCS & RDS Business","lat":"44.4914","long":"26.0602"}	active
939	5.2.137.13	3128	Transparent	77ms	\N	active
940	94.177.228.161	8080	Transparent	48ms	\N	active
942	77.81.29.25	8888	Elite	379ms	\N	active
945	94.177.249.225	8080	Transparent	63ms	\N	active
2005	41.57.65.210	57107	Elite	83ms	\N	active
2258	41.242.103.2	8080	Transparent	779ms	\N	active
851	128.199.153.16	8080	Transparent	195ms	\N	active
2033	62.162.195.195	39562	Elite	192ms	\N	active
2124	154.66.216.70	44561	Elite	383ms	\N	active
2036	41.76.44.76	3128	Transparent	535ms	\N	active
2042	105.29.64.195	41130	Elite	85ms	\N	active
2045	178.74.56.167	3128	Transparent	171ms	\N	active
2050	193.213.89.72	51024	Elite	47ms	\N	active
2055	85.93.252.55	59467	Elite	570ms	\N	active
2052	185.89.3.241	34927	Elite	29ms	\N	active
2059	95.45.235.178	40056	Elite	116ms	\N	active
2060	185.64.18.25	8080	Transparent	465ms	\N	active
2062	34.240.97.171	3128	Transparent	403ms	\N	active
2066	147.75.117.108	8080	Transparent	194ms	\N	active
2070	212.147.27.68	31956	Elite	767ms	\N	active
2075	91.208.30.110	80	Elite	485ms	\N	active
2078	196.20.12.21	8080	Elite	215ms	\N	active
2089	77.38.21.239	8080	Elite	628ms	\N	active
2095	94.20.21.37	3128	Transparent	66ms	\N	active
2099	185.129.1.58	50313	Elite	865ms	\N	active
2101	109.127.9.96	40080	Elite	418ms	\N	active
2104	190.94.18.210	53281	Elite	35ms	\N	active
2115	129.205.195.50	52866	Elite	231ms	\N	active
2031	62.162.195.218	34563	Elite	68ms	\N	active
2021	193.56.149.184	39518	Elite	488ms	\N	active
2063	34.240.97.171	3139	Transparent	528ms	\N	active
2085	196.20.12.17	8080	Elite	613ms	\N	active
2087	193.138.50.7	44921	Elite	77ms	\N	active
2092	89.212.18.76	58610	Elite	187ms	\N	active
2125	196.0.109.146	8888	Elite	310ms	\N	active
2034	154.66.245.47	46611	Elite	165ms	\N	active
2035	41.72.204.66	42258	Elite	58ms	\N	active
2051	81.166.242.208	51420	Elite	49ms	\N	active
2056	34.240.97.171	3130	Transparent	227ms	\N	active
2061	34.240.231.232	3139	Transparent	726ms	\N	active
2064	91.102.80.82	3128	Transparent	339ms	\N	active
2065	34.240.231.232	3129	Transparent	696ms	\N	active
2071	147.75.125.20	8181	Transparent	79ms	\N	active
2076	196.20.12.37	8080	Elite	595ms	\N	active
2080	197.188.222.163	61636	Elite	183ms	\N	active
2084	196.20.12.45	8080	Elite	100ms	\N	active
2025	77.28.97.78	38829	Elite	130ms	\N	active
2027	31.3.91.144	56788	Elite	42ms	\N	active
2118	196.0.111.194	34638	Elite	405ms	\N	active
2100	85.132.18.222	31454	Elite	221ms	\N	active
976	197.232.26.216	8080	Transparent	610ms	{"ip":"196.207.162.158","country":"Kenya","region":"Nairobi Area","city":"Madaraka","isp":"Wananchi Group (Kenya) Limited","organization":"Wananchi Group Kenya","lat":"-1.3061","long":"36.8164"}	active
990	196.200.21.194	48503	Elite	149ms	\N	active
997	41.222.11.228	49815	Elite	89ms	\N	active
1002	27.72.45.109	4145	Transparent	275ms	\N	active
1011	27.72.45.109	1031	Transparent	111ms	\N	active
1016	115.78.73.60	3128	Transparent	43ms	{"ip":"115.78.73.60","country":"Vietnam","region":"Not Available","city":"Not Available","isp":"Viettel Group","organization":"Viettel Group","lat":"16.0000","long":"106.0000"}	active
1020	115.78.225.211	8080	Transparent	80ms	\N	active
1023	27.72.45.109	197	Transparent	74ms	\N	active
1026	114.76.220.55	8080	Anonymous	119ms	\N	active
1027	139.59.177.206	3128	Transparent	34ms	\N	active
2147	77.222.20.246	32117	Elite	388ms	\N	active
1029	203.8.108.13	8080	Anonymous	220ms	{"ip":"203.8.108.130","country":"Australia","region":"Not Available","city":"Not Available","isp":"TPG Internet Pty Ltd","organization":"Forestry Commission of NSW","lat":"-33.4940","long":"143.2100"}	active
1033	211.26.76.174	8888	Elite	859ms	\N	active
1039	103.74.187.215	57453	Elite	272ms	\N	active
1041	218.214.206.91	55819	Elite	70ms	\N	active
1044	202.191.8.125	8080	Transparent	915ms	\N	active
1045	202.191.15.154	8080	Transparent	473ms	{"ip":"202.191.8.138","country":"Australia","region":"New South Wales","city":"Galston","isp":"Cirrus Communications Pty Ltd","organization":"Cirrus Communications Pty Ltd","lat":"-33.5578","long":"151.0790"}	active
1046	103.227.60.233	8080	Transparent	57ms	\N	active
1052	178.128.179.46	8080	Transparent	28ms	\N	active
1056	178.128.113.29	3128	Transparent	28ms	\N	active
957	109.69.1.216	57056	Elite	70ms	\N	active
964	80.78.79.109	57656	Elite	146ms	{"ip":"80.78.79.109","country":"Albania","region":"Qarku i Shkodres","city":"Shkoder","isp":"ABCOM Shpk","organization":"ABCOM Shpk","lat":"42.0675","long":"19.5131"}	active
1093	185.185.173.124	53642	Elite	84ms	{"ip":"185.185.173.124","country":"Iraq","region":"Kirkuk","city":"Kirkuk","isp":"Najim Al Iraq Ltd","organization":"Najim Al Iraq Ltd","lat":"35.4681","long":"44.3922"}	active
1097	176.241.92.98	60778	Elite	72ms	{"ip":"176.241.92.98","country":"Iraq","region":"Baghdad","city":"Baghdad","isp":"Hayat for Internet & communication LLC","organization":"ayad@techwaytel.com","lat":"33.3406","long":"44.4009"}	active
1104	153.180.102.104	80	Elite	36ms	\N	active
1111	140.227.63.53	3128	Elite	31ms	\N	active
1120	150.95.80.19	8080	Transparent	47ms	\N	active
1121	140.227.55.231	3128	Elite	31ms	{"ip":"140.227.55.231","country":"Japan","region":"Not Available","city":"Not Available","isp":"NTT PC Communications, Inc.","organization":"NTTPC Communications,Inc","lat":"35.6900","long":"139.6900"}	active
1124	108.61.162.183	808	Elite	27ms	\N	active
1129	212.72.151.70	54960	Elite	341ms	{"ip":"212.72.151.70","country":"Georgia","region":"K'alak'i T'bilisi","city":"Tbilisi","isp":"Magticom Ltd.","organization":"Caucasus Online LLC","lat":"41.7250","long":"44.7908"}	active
1134	31.146.223.218	8888	Elite	292ms	\N	active
1138	80.241.248.254	53282	Elite	63ms	\N	active
1156	89.28.53.42	8080	Transparent	115ms	\N	active
1160	93.116.185.57	59981	Elite	86ms	{"ip":"93.116.185.57","country":"Moldova","region":"Not Available","city":"Not Available","isp":"Moldtelecom SA","organization":"JSC Moldtelecom S.A.","lat":"47.0188","long":"28.8128"}	active
1162	95.65.73.200	43577	Elite	70ms	\N	active
1062	178.128.19.104	3128	Transparent	30ms	{"ip":"178.128.19.104","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
1070	178.128.11.251	3128	Transparent	24ms	\N	active
1066	178.128.133.245	3128	Transparent	35ms	\N	active
1063	178.128.109.137	3128	Elite	29ms	\N	active
1248	223.19.212.30	8197	Elite	62ms	\N	active
1250	223.19.212.30	8380	Elite	58ms	\N	active
1252	158.255.26.221	36242	Elite	97ms	{"ip":"158.255.26.221","country":"Slovakia","region":"Zilina","city":"Žilina","isp":"Orange Slovensko a.s.","organization":"HMZ Radiokomunikacie s.r.o.","lat":"49.1992","long":"18.8215"}	active
1255	92.52.63.115	50896	Elite	62ms	\N	active
1268	46.151.60.99	31611	Elite	46ms	{"ip":"46.151.60.99","country":"Slovakia","region":"Zilina","city":"Žilina","isp":"PRESNET s.r.o.","organization":"TES Media s.r.o.","lat":"49.2406","long":"18.7721"}	active
1271	176.106.186.99	31056	Elite	53ms	{"ip":"176.106.186.99","country":"Slovakia","region":"Trencin","city":"Myjava","isp":"RadioLAN spol. s r.o.","organization":"RadioLAN spol. s r.o.","lat":"48.7936","long":"17.5775"}	active
1733	91.191.33.170	53281	Transparent	361ms	\N	active
1169	92.114.234.206	30475	Elite	47ms	{"ip":"92.114.234.206","country":"Moldova","region":"Not Available","city":"Not Available","isp":"Moldtelecom SA","organization":"JSC Moldtelecom S.A.","lat":"47.0188","long":"28.8128"}	active
1177	36.38.25.245	9999	Elite	48ms	\N	active
1178	218.50.2.102	8080	Elite	49ms	\N	active
1180	14.36.4.200	3128	Transparent	129ms	\N	active
1181	121.140.126.250	3128	Transparent	43ms	\N	active
1186	221.139.49.46	80	Elite	36ms	\N	active
1187	14.63.226.198	80	Elite	70ms	\N	active
1191	52.78.34.242	80	Anonymous	54ms	\N	active
1192	220.127.80.149	80	Elite	42ms	\N	active
1195	121.171.53.249	80	Elite	42ms	\N	active
1196	211.181.19.34	3128	Anonymous	28ms	\N	active
1202	217.78.61.101	48376	Elite	624ms	\N	active
1203	213.6.229.178	36127	Elite	169ms	\N	active
1205	213.6.67.126	36127	Elite	68ms	{"ip":"213.6.67.126","country":"Palestinian Territories","region":"WEST BANK","city":"Kafr Rumman","isp":"Palestine Telecommunications Company (PALTEL)","organization":"Palestine Telecommunications Company (PALTEL)","lat":"32.3158","long":"35.1258"}	active
1206	217.78.62.145	61157	Elite	777ms	\N	active
1210	85.114.107.46	8080	Transparent	72ms	\N	active
1213	213.6.87.158	57414	Elite	277ms	{"ip":"213.6.87.158","country":"Palestinian Territories","region":"WEST BANK","city":"Kafr Rumman","isp":"Palestine Telecommunications Company (PALTEL)","organization":"Palestine Telecommunications Company (PALTEL)","lat":"32.3158","long":"35.1258"}	active
1218	213.6.88.1	36127	Elite	122ms	\N	active
1221	213.6.149.166	41213	Elite	55ms	\N	active
1222	213.6.199.94	56863	Elite	167ms	\N	active
1226	223.19.212.30	80	Elite	59ms	\N	active
1228	103.42.213.176	8080	Elite	60ms	\N	active
1229	113.255.181.197	80	Elite	62ms	\N	active
1230	42.98.46.105	3128	Transparent	33ms	\N	active
2269	94.200.50.66	48219	Elite	936ms	\N	active
2278	41.77.188.81	53432	Elite	162ms	\N	active
2279	41.77.186.14	8080	Elite	74ms	\N	active
2281	196.201.206.129	55625	Elite	74ms	\N	active
2283	154.68.43.182	32755	Elite	90ms	\N	active
2285	188.165.64.114	3128	Transparent	617ms	\N	active
2246	85.9.131.249	3128	Elite	74ms	\N	active
2245	103.55.48.242	3128	Transparent	795ms	\N	active
2248	195.246.102.222	58073	Elite	208ms	\N	active
2250	154.73.45.138	53281	Elite	84ms	\N	active
2254	154.73.45.206	39173	Elite	85ms	\N	active
1233	223.197.56.102	80	Anonymous	52ms	\N	active
1237	223.19.51.247	8080	Elite	50ms	\N	active
1238	223.19.51.247	80	Elite	35ms	\N	active
1236	223.19.51.247	8197	Elite	35ms	\N	active
1234	103.251.36.41	80	Anonymous	75ms	\N	active
1290	92.46.109.74	42683	Elite	74ms	{"ip":"92.46.109.74","country":"Kazakhstan","region":"Astana","city":"Astana","isp":"JSC Kazakhtelecom","organization":"JSC Kazakhtelecom","lat":"51.1811","long":"71.4278"}	active
1293	81.18.33.26	46920	Elite	117ms	\N	active
1294	87.247.24.198	59546	Elite	287ms	\N	active
1295	92.46.35.166	32426	Elite	107ms	{"ip":"92.46.35.166","country":"Kazakhstan","region":"Almaty","city":"Almaty","isp":"JSC Kazakhtelecom","organization":"JSC Kazakhtelecom","lat":"43.2565","long":"76.9285"}	active
1299	195.189.69.236	42126	Elite	71ms	{"ip":"195.189.69.236","country":"Kazakhstan","region":"Almaty City","city":"Almaty","isp":"CTC ASTANA LTD","organization":"CTC ASTANA LTD","lat":"43.2565","long":"76.9285"}	active
1303	190.116.175.234	80	Transparent	703ms	\N	active
1304	190.223.60.178	8080	Transparent	248ms	\N	active
1305	190.42.189.148	8080	Transparent	180ms	{"ip":"190.42.189.148","country":"Peru","region":"Not Available","city":"Not Available","isp":"Telefonica del Peru S.A.A.","organization":"PE-TDPERX8-LACNIC","lat":"-12.0433","long":"-77.0283"}	active
1308	181.176.209.86	8080	Transparent	251ms	{"ip":"181.176.209.86","country":"Peru","region":"Not Available","city":"Not Available","isp":"VIETTEL PERÚ S.A.C.","organization":"VIETTEL PERÚ S.A.C.","lat":"-12.0433","long":"-77.0283"}	active
1311	200.48.129.125	8080	Transparent	78ms	\N	active
1312	190.42.32.154	9999	Transparent	197ms	\N	active
1314	200.37.253.139	3128	Transparent	96ms	{"ip":"181.176.181.10","country":"Peru","region":"Junin","city":"Huancayo","isp":"VIETTEL PERÚ S.A.C.","organization":"VIETTEL PERÚ S.A.C.","lat":"-12.0667","long":"-75.2333"}	active
1316	200.37.231.66	8080	Transparent	84ms	\N	active
1319	209.45.111.195	45729	Elite	303ms	\N	active
1320	209.45.30.2	39033	Elite	41ms	{"ip":"209.45.30.2","country":"Peru","region":"Not Available","city":"Not Available","isp":"Red Cientifica Peruana","organization":"Red Cientifica Peruana","lat":"-12.0433","long":"-77.0283"}	active
1322	181.177.251.7	80	Elite	666ms	\N	active
1325	179.43.81.135	80	Elite	60ms	\N	active
1327	111.68.45.227	8080	Elite	49ms	{"ip":"111.68.45.227","country":"Philippines","region":"Not Available","city":"Not Available","isp":"SKYBROADBAND","organization":"SKYBROADBAND","lat":"14.5955","long":"120.9720"}	active
1330	111.125.71.108	39949	Elite	44ms	\N	active
1331	103.86.187.242	8080	Transparent	448ms	\N	active
1332	103.16.168.77	8080	Elite	48ms	{"ip":"103.16.168.77","country":"Philippines","region":"Not Available","city":"Not Available","isp":"RADIUS TELECOMS, INC.","organization":"RADIUS TELECOMS, INC.","lat":"14.5955","long":"120.9720"}	active
1334	58.69.12.210	8080	Transparent	362ms	\N	active
1337	203.177.41.30	49887	Elite	479ms	{"ip":"203.177.41.30","country":"Philippines","region":"Not Available","city":"Not Available","isp":"Globe Telecoms","organization":"Globe Telecoms","lat":"14.5955","long":"120.9720"}	active
1342	116.50.208.114	8080	Transparent	449ms	{"ip":"116.50.208.114","country":"Philippines","region":"Metro Manila","city":"Makati City","isp":"Eastern Telecoms Phils., Inc.","organization":"Eastern Telecoms Philippines, Inc.","lat":"14.5646","long":"121.0490"}	active
1345	43.255.216.138	35737	Elite	60ms	{"ip":"43.255.216.138","country":"Philippines","region":"Calabarzon","city":"Muntinlupa","isp":"SKYBROADBAND","organization":"Sky Cable Corporation","lat":"14.4031","long":"121.0310"}	active
1346	122.54.149.199	8080	Transparent	645ms	\N	active
1350	202.57.55.242	53785	Elite	64ms	{"ip":"202.57.55.242","country":"Philippines","region":"Paranaque","city":"Merville","isp":"A Multihomed ISP Company","organization":"PHILCOM CORPORATION INTERNET SERVICE","lat":"14.5007","long":"121.0290"}	active
1351	86.57.219.179	23500	Elite	294ms	\N	active
1354	86.57.219.182	23500	Elite	350ms	\N	active
1355	93.125.120.1	42099	Elite	135ms	\N	active
1356	37.17.48.12	49339	Elite	61ms	{"ip":"37.17.48.12","country":"Belarus","region":"Minsk City","city":"Minsk","isp":"Velcom UE","organization":"VELCOM 3G subscibers","lat":"53.9000","long":"27.5667"}	active
1361	91.149.180.96	35833	Elite	49ms	{"ip":"91.149.180.96","country":"Belarus","region":"Minsk City","city":"Minsk","isp":"Anitex Ltd","organization":"ANITEX Ltd.","lat":"53.9000","long":"27.5667"}	active
1363	37.17.12.33	39719	Elite	221ms	{"ip":"37.17.12.33","country":"Belarus","region":"Not Available","city":"Not Available","isp":"Velcom UE","organization":"VELCOM 3G subscibers","lat":"53.0000","long":"28.0000"}	active
47	180.180.216.196	8080	Transparent	43ms	{"ip":"180.180.216.196","country":"Thailand","region":"Phetchaburi","city":"Ban Pong","isp":"TOT Public Company Limited","organization":"TOT Public Company Limited","lat":"13.0500","long":"99.8667"}	active
56	101.255.51.30	3128	Transparent	177ms	{"ip":"101.255.51.30","country":"Indonesia","region":"Jakarta","city":"Jakarta","isp":"PT Remala Abadi","organization":"PT Remala Abadi","lat":"-6.1744","long":"106.8290"}	active
1367	185.20.115.114	57236	Elite	143ms	{"ip":"185.20.115.114","country":"Belarus","region":"Not Available","city":"Not Available","isp":"Mobile TeleSystems JLLC","organization":"Mobile TeleSystems JLLC","lat":"53.0000","long":"28.0000"}	active
1371	82.209.251.75	3128	Elite	278ms	\N	active
1372	87.252.252.169	56425	Elite	76ms	{"ip":"213.184.226.166","country":"Belarus","region":"Minsk City","city":"Minsk","isp":"Velcom UE","organization":"Velcom AZS LLC","lat":"53.9000","long":"27.5667"}	active
1375	86.57.219.178	23500	Elite	769ms	{"ip":"86.57.219.178","country":"Belarus","region":"Minsk","city":"Zhodzina","isp":"Republican Unitary Telecommunication Enterprise Beltelecom","organization":"BELTELECOM","lat":"54.0985","long":"28.3331"}	active
1377	82.135.148.169	8080	Elite	157ms	\N	active
1277	89.40.52.204	80	Transparent	62ms	\N	active
1281	188.0.138.147	8080	Elite	65ms	\N	active
1278	82.200.163.178	8080	Transparent	61ms	\N	active
1401	5.77.252.88	8080	Transparent	424ms	{"ip":"5.77.252.88","country":"Armenia","region":"Yerevan","city":"Yerevan","isp":"Ucom LLC","organization":"Ucom LLC","lat":"40.1811","long":"44.5136"}	active
1405	212.34.254.34	46533	Elite	78ms	{"ip":"212.34.254.34","country":"Armenia","region":"Not Available","city":"Not Available","isp":"Ucom LLC","organization":"Ucom LLC.","lat":"40.0000","long":"45.0000"}	active
1409	109.75.44.42	50936	Elite	65ms	{"ip":"109.75.44.42","country":"Armenia","region":"Yerevan","city":"Yerevan","isp":"Ucom LLC","organization":"Ucom LLC","lat":"40.1811","long":"44.5136"}	active
1412	62.89.31.55	52795	Elite	924ms	\N	active
1413	185.44.230.100	60548	Elite	64ms	{"ip":"185.44.230.100","country":"Armenia","region":"Yerevan","city":"Yerevan","isp":"Ucom LLC","organization":"Ucom LLC","lat":"40.1811","long":"44.5136"}	active
1416	5.63.165.178	40561	Elite	58ms	{"ip":"5.63.165.178","country":"Armenia","region":"Yerevan","city":"Yerevan","isp":"GNC-Alfa CJSC","organization":"GNC-Alfa CJSC","lat":"40.1811","long":"44.5136"}	active
1420	109.75.43.120	59771	Elite	170ms	{"ip":"109.75.43.120","country":"Armenia","region":"Yerevan","city":"Yerevan","isp":"Ucom LLC","organization":"Ucom LLC","lat":"40.1811","long":"44.5136"}	active
1421	109.75.37.36	31655	Elite	75ms	\N	active
1424	185.44.229.243	32038	Elite	89ms	{"ip":"185.44.229.243","country":"Armenia","region":"Yerevan","city":"Yerevan","isp":"Ucom LLC","organization":"Ucom LLC","lat":"40.1811","long":"44.5136"}	active
1426	190.151.10.226	8080	Transparent	236ms	\N	active
1427	131.221.32.60	3128	Transparent	63ms	\N	active
1429	164.77.134.13	8080	Transparent	273ms	\N	active
1434	138.186.122.105	43602	Elite	53ms	\N	active
1436	200.54.194.10	53281	Elite	44ms	{"ip":"200.54.194.10","country":"Chile","region":"Region Metropolitana","city":"Santiago","isp":"Telefonica Empresas","organization":"Agricola Pihue Limitada","lat":"-33.4500","long":"-70.6667"}	active
1440	190.162.152.122	33505	Elite	415ms	\N	active
1441	201.236.136.106	47246	Elite	44ms	{"ip":"201.236.136.106","country":"Chile","region":"O'Higgins Region","city":"Rengo","isp":"Telefonica Empresas","organization":"Telefonica Empresas","lat":"-34.4167","long":"-70.8667"}	active
1445	201.236.143.243	52817	Elite	53ms	{"ip":"201.236.143.242","country":"Chile","region":"Santiago Metropolitan","city":"Santiago","isp":"Telefonica Empresas","organization":"Telefonica Empresas","lat":"-33.4500","long":"-70.6667"}	active
1447	186.10.80.226	80	Elite	48ms	\N	active
1449	190.196.72.166	61213	Elite	527ms	\N	active
1451	213.173.93.232	8888	Elite	432ms	\N	active
1452	85.124.7.234	8080	Elite	632ms	\N	active
1453	93.82.240.214	46179	Elite	133ms	\N	active
1455	185.69.236.143	40619	Elite	483ms	\N	active
1456	185.110.136.23	31532	Elite	451ms	\N	active
1457	194.208.49.52	30107	Elite	452ms	{"ip":"194.208.49.52","country":"Austria","region":"Vorarlberg","city":"Schruns","isp":"Russmedia IT GmbH","organization":"Russmedia IT GmbH","lat":"47.0611","long":"9.9378"}	active
1460	83.64.253.167	80	Elite	278ms	\N	active
1461	83.64.253.168	80	Elite	612ms	\N	active
1463	185.212.102.253	8080	Elite	145ms	{"ip":"185.212.102.253","country":"Austria","region":"Not Available","city":"Not Available","isp":"Liberty Global Operations B.V.","organization":"Liberty Global Operations B.V.","lat":"48.2000","long":"16.3667"}	active
1468	83.215.45.146	8888	Elite	194ms	\N	active
1469	80.120.86.242	46771	Elite	68ms	\N	active
1470	93.185.138.149	51940	Elite	88ms	{"ip":"93.185.142.130","country":"Austria","region":"Karnten","city":"Klagenfurt","isp":"oja.at GmbH","organization":"xpirio Telekommunikation & Service GmbH","lat":"46.6247","long":"14.3053"}	active
1471	91.114.42.62	8080	Transparent	282ms	\N	active
1472	185.199.80.12	37522	Elite	155ms	\N	active
1473	46.75.5.174	8080	Transparent	239ms	\N	active
1474	212.236.44.232	80	Transparent	23ms	\N	active
1476	60.54.121.201	3128	Transparent	77ms	{"ip":"60.54.121.201","country":"Malaysia","region":"Selangor","city":"Puchong","isp":"TMnet, Telekom Malaysia","organization":"TMNST","lat":"3.0471","long":"101.6290"}	active
1477	149.129.132.93	80	Elite	78ms	\N	active
1478	149.129.128.148	8080	Elite	73ms	\N	active
1479	211.24.103.228	80	Anonymous	72ms	\N	active
1481	58.26.10.67	8080	Elite	43ms	\N	active
1482	45.126.88.6	8080	Transparent	166ms	\N	active
1485	210.48.204.134	35186	Elite	104ms	\N	active
1382	5.20.255.88	8080	Elite	520ms	\N	active
1384	82.135.148.156	8080	Elite	474ms	\N	active
24	185.134.150.160	8080	Elite	946ms	{"ip":"185.134.150.160","country":"Russia","region":"Samara Oblast","city":"Samara","isp":"OJSC Volgainformnet","organization":"JSC VolgoInformNet, Russia","lat":"53.1835","long":"50.1182"}	active
32	1.20.99.163	8080	Elite	102ms	{"ip":"1.20.99.163","country":"Thailand","region":"Not Available","city":"Not Available","isp":"TOT Public Company Limited","organization":"TOT Mobile Co LTD","lat":"13.7500","long":"100.4670"}	active
41	118.174.145.114	8080	Transparent	52ms	{"ip":"101.51.67.94","country":"Thailand","region":"Changwat Maha Sarakham","city":"Maha Sarakham","isp":"TOT Public Company Limited","organization":"TOT Public Company Limited","lat":"15.9550","long":"103.1870"}	active
49	1.179.157.114	3128	Anonymous	87ms	{"ip":"118.174.100.19","country":"Thailand","region":"Lamphun","city":"Lamphun","isp":"TOT Public Company Limited","organization":"TOT Public Company Limited","lat":"18.5811","long":"99.0092"}	active
51	139.255.40.130	8080	Transparent	878ms	{"ip":"139.255.40.130","country":"Indonesia","region":"Jawa Barat","city":"Lippocikarang","isp":"Linknet ASN","organization":"PT. First Media,Tbk","lat":"-6.3350","long":"107.1420"}	active
52	103.23.101.58	8080	Elite	286ms	{"ip":"103.23.101.58","country":"Indonesia","region":"Central Java","city":"Semarang","isp":"Universitas Negeri Semarang","organization":"Universitas Negeri Semarang","lat":"-6.9931","long":"110.4210"}	active
57	137.59.162.10	3128	Transparent	150ms	{"ip":"137.59.162.10","country":"Indonesia","region":"Jakarta","city":"Jakarta","isp":"PT SUMBER KONEKSI INDOTELEMATIKA","organization":"PT Sumber Koneksi Indonesia","lat":"-6.1818","long":"106.8220"}	active
31	14.207.123.149	8080	Transparent	74ms	{"ip":"14.207.123.149","country":"Thailand","region":"Changwat Samut Sakhon","city":"Samut Sakhon","isp":"Triple T Internet/Triple T Broadband","organization":"Triple T Internet/Triple T Broadband","lat":"13.5333","long":"100.2830"}	active
66	101.255.124.242	8080	Elite	568ms	{"ip":"101.255.124.242","country":"Indonesia","region":"Jakarta","city":"Jakarta","isp":"PT Remala Abadi","organization":"PT Remala Abadi","lat":"-6.1744","long":"106.8290"}	active
118	18.234.209.2	3128	Transparent	38ms	{"ip":"18.234.209.2","country":"United States","region":"Virginia","city":"Ashburn","isp":"Amazon.com, Inc.","organization":"Amazon Technologies Inc.","lat":"39.0481","long":"-77.4728"}	active
125	142.0.60.27	32884	Elite	59ms	{"ip":"142.0.60.27","country":"United States","region":"Indiana","city":"Evansville","isp":"SIT-CO, LLC","organization":"SITCO","lat":"38.0281","long":"-87.5119"}	active
110	97.73.9.50	87	Transparent	249ms	\N	active
1510	190.122.185.218	8080	Transparent	128ms	\N	active
187	118.190.149.36	8080	Anonymous	631ms	\N	active
1389	78.58.136.55	39232	Elite	65ms	{"ip":"78.58.136.55","country":"Lithuania","region":"Kaunas","city":"Kaunas","isp":"Telia Lietuva, AB","organization":"Telia Lietuva, AB","lat":"54.9000","long":"23.9000"}	active
1385	78.61.252.47	21231	Elite	153ms	{"ip":"78.61.252.47","country":"Lithuania","region":"Vilnius","city":"Vilnius","isp":"Telia Lietuva, AB","organization":"Telia Lietuva, AB","lat":"54.6741","long":"25.3194"}	active
1391	213.226.181.86	42599	Elite	84ms	{"ip":"213.226.181.86","country":"Lithuania","region":"Kaunas","city":"Kaunas","isp":"UAB \\"Bite Lietuva\\"","organization":"\\"UAB \\"\\"Bite Lietuva\\"\\"\\"","lat":"54.9000","long":"23.9000"}	active
1505	190.149.248.242	49469	Elite	417ms	\N	active
1507	190.4.33.106	36653	Elite	84ms	{"ip":"190.4.33.106","country":"Guatemala","region":"Guatemala","city":"Santa Catarina Pinula","isp":"METRORED S.A. DE C.V.","organization":"TIGO-CORPORATIVO","lat":"14.5689","long":"-90.4953"}	active
1509	190.149.165.214	49750	Elite	471ms	\N	active
1511	190.115.1.184	31466	Elite	273ms	\N	active
1512	181.174.76.254	40538	Elite	477ms	\N	active
1513	190.149.216.146	47463	Elite	340ms	\N	active
1514	190.149.7.211	38082	Elite	149ms	{"ip":"190.149.7.211","country":"Guatemala","region":"Guatemala","city":"Petapa","isp":"Telgua","organization":"Telgua","lat":"14.5028","long":"-90.5517"}	active
1515	190.149.221.250	33425	Elite	129ms	\N	active
1517	190.122.186.230	8080	Transparent	73ms	\N	active
1520	190.122.186.226	8080	Transparent	471ms	\N	active
1521	190.122.185.217	8080	Transparent	165ms	\N	active
1522	190.115.9.113	53281	Elite	63ms	{"ip":"190.115.9.113","country":"Guatemala","region":"Not Available","city":"Not Available","isp":"UFINET PANAMA S.A.","organization":"UFINET Guatemala S. A.","lat":"15.5000","long":"-90.2500"}	active
1523	190.143.193.210	35596	Elite	22ms	\N	active
1525	190.122.186.199	8080	Transparent	213ms	\N	active
1526	195.246.57.154	8080	Transparent	595ms	\N	active
1527	197.44.60.44	8080	Transparent	236ms	\N	active
1528	41.65.186.106	8080	Transparent	83ms	\N	active
1529	41.65.0.173	8080	Transparent	89ms	\N	active
1530	41.33.108.28	8080	Transparent	74ms	\N	active
1531	41.65.186.169	8080	Transparent	83ms	\N	active
1532	41.33.229.154	8080	Transparent	53ms	\N	active
1533	41.196.22.230	8080	Transparent	344ms	\N	active
1535	41.65.89.35	8080	Transparent	91ms	\N	active
1536	197.51.146.78	3128	Elite	104ms	\N	active
1537	41.33.22.186	8080	Transparent	80ms	\N	active
1538	193.227.49.82	80	Transparent	54ms	\N	active
1539	197.50.129.248	80	Transparent	81ms	\N	active
1540	41.33.22.186	80	Transparent	75ms	\N	active
1541	41.65.0.164	8080	Transparent	69ms	\N	active
1542	41.65.146.242	8080	Transparent	79ms	\N	active
1543	196.219.194.131	8080	Transparent	75ms	\N	active
1544	41.39.241.119	8080	Transparent	677ms	\N	active
1545	197.45.158.91	3128	Elite	103ms	\N	active
1546	197.45.195.155	30437	Elite	591ms	\N	active
1547	41.32.57.59	8080	Transparent	921ms	\N	active
1548	197.50.17.35	80	Transparent	507ms	\N	active
1550	197.45.118.152	43631	Elite	292ms	\N	active
1552	212.28.241.6	8080	Transparent	105ms	\N	active
1553	185.38.30.69	34415	Elite	307ms	\N	active
1555	212.98.158.245	48263	Transparent	214ms	{"ip":"212.98.158.245","country":"Lebanon","region":"Beyrouth","city":"Beirut","isp":"TerraNet sal","organization":"TerraNet sal","lat":"33.8719","long":"35.5097"}	active
1558	109.75.78.18	44151	Elite	121ms	\N	active
1560	185.156.214.34	80	Transparent	53ms	\N	active
1561	185.103.88.10	53281	Elite	331ms	{"ip":"185.103.88.10","country":"Lebanon","region":"Beqaa","city":"Maallaqa","isp":"CHAWICH GROUP LTD","organization":"CHAWICH GROUP LTD","lat":"33.8431","long":"35.9208"}	active
1563	109.75.78.30	44151	Elite	595ms	\N	active
1565	212.28.237.132	61723	Transparent	190ms	{"ip":"212.28.237.130","country":"Lebanon","region":"Beyrouth","city":"Beirut","isp":"Transmog Inc S.A.L","organization":"ps3 dsl 2 M","lat":"33.8719","long":"35.5097"}	active
1568	85.112.76.58	38404	Transparent	96ms	{"ip":"85.112.76.58","country":"Lebanon","region":"Not Available","city":"Not Available","isp":"FRANSABANK SAL","organization":"TerraNet sal","lat":"33.8333","long":"35.8333"}	active
1570	89.249.211.162	48320	Elite	308ms	\N	active
1573	212.30.52.254	8080	Transparent	180ms	{"ip":"212.30.52.243","country":"Lebanon","region":"Beyrouth","city":"Birut","isp":"M Nets SAL","organization":"M Nets SAL","lat":"33.8889","long":"35.4944"}	active
1576	196.41.60.218	47358	Elite	110ms	\N	active
1577	154.72.79.37	23500	Elite	1000ms	{"ip":"154.72.79.37","country":"Tanzania","region":"Dar es Salaam","city":"Kinondoni","isp":"RAHA Ltd","organization":"RAHA Ltd","lat":"-6.7833","long":"39.2667"}	active
1578	154.72.66.106	23500	Elite	793ms	\N	active
1582	154.72.78.62	53376	Elite	142ms	{"ip":"154.72.78.62","country":"Tanzania","region":"Dar es Salaam","city":"Kinondoni","isp":"RAHA Ltd","organization":"RAHA Ltd","lat":"-6.7833","long":"39.2667"}	active
1586	154.73.65.129	30713	Elite	103ms	\N	active
138	103.205.14.1	8080	Transparent	776ms	{"ip":"103.255.146.202","country":"India","region":"Andhra Pradesh","city":"Anantapur","isp":"CtrlS Datacenters Ltd.","organization":"CtrlS Datacenters Limited","lat":"14.6833","long":"77.6000"}	active
90	201.62.125.229	8080	Transparent	368ms	{"ip":"201.62.125.229","country":"Brazil","region":"Sao Paulo","city":"Mogi Mirim","isp":"CLARO S.A.","organization":"CLARO S.A.","lat":"-22.4498","long":"-46.9897"}	active
91	200.201.29.2	3128	Elite	78ms	{"ip":"200.150.115.244","country":"Brazil","region":"Parana","city":"União Da Vitória","isp":"COPEL Telecomunicações S.A.","organization":"COPEL Telecomunicações S.A.","lat":"-26.2167","long":"-51.0833"}	active
131	103.46.233.17	83	Transparent	52ms	{"ip":"103.46.233.17","country":"India","region":"Andhra Pradesh","city":"Rajamahendri","isp":"LS FIBERNET PRIVATE LIMITED","organization":"APPLE BROADBAND SERVICES PVT. LTD","lat":"16.9833","long":"81.7833"}	active
135	125.62.199.1	84	Transparent	420ms	{"ip":"123.108.200.110","country":"India","region":"Andhra Pradesh","city":"Visakhapatnam","isp":"VOL Broadband","organization":"VOL Broadband","lat":"17.7000","long":"83.3000"}	active
147	103.69.220.14	3128	Transparent	255ms	{"ip":"103.69.220.14","country":"India","region":"Karnataka","city":"Not Available","isp":"SAMPARK ESTATES PVT. LTD.","organization":"Sampark Infotainment Pvt Ltd","lat":"12.9833","long":"77.5833"}	active
154	193.19.242.213	80	Transparent	81ms	{"ip":"193.19.242.213","country":"Ukraine","region":"Dnipropetrovs'ka Oblast'","city":"Vilnohirsk","isp":"Private Enterprise Enterra","organization":"Private Enterprise Enterra","lat":"48.4855","long":"34.0230"}	active
165	82.207.56.146	8888	Elite	248ms	{"ip":"82.207.56.146","country":"Ukraine","region":"Cherkas'ka Oblast'","city":"Vatutino","isp":"PJSC \\"Ukrtelecom\\"","organization":"\\"PJSC \\"\\"Ukrtelecom\\"\\"\\"","lat":"49.0150","long":"31.0621"}	active
202	123.200.16.51	8080	Transparent	684ms	{"ip":"123.200.16.51","country":"Bangladesh","region":"Dhaka Division","city":"Dhaka","isp":"Link3 Technologies Ltd.","organization":"Corporate-Subscriber","lat":"23.7290","long":"90.4112"}	active
203	103.218.26.90	8080	Transparent	166ms	{"ip":"103.218.26.94","country":"Bangladesh","region":"Dhaka","city":"Dhaka","isp":"Systems Solutions & development Technologies Limited","organization":"Carnival Internet","lat":"23.7916","long":"90.4152"}	active
74	202.162.214.118	3128	Anonymous	267ms	{"ip":"202.162.214.118","country":"Indonesia","region":"Jakarta","city":"Jakarta","isp":"PT Indonesia Comnets Plus","organization":"PT INDONESIA COMNETS PLUS","lat":"-6.1744","long":"106.8290"}	active
227	190.60.69.50	8080	Transparent	393ms	{"ip":"190.60.69.50","country":"Colombia","region":"Cundinamarca","city":"Bogotá","isp":"IFX Corporation","organization":"IFX NETWORKS COLOMBIA","lat":"4.6492","long":"-74.0628"}	active
1587	154.72.85.198	51830	Elite	115ms	{"ip":"154.72.85.198","country":"Tanzania","region":"Not Available","city":"Not Available","isp":"RAHA Ltd","organization":"RAHA Ltd","lat":"-6.8227","long":"39.2910"}	active
1902	213.58.181.244	37610	Elite	348ms	\N	active
1906	2.81.229.208	49265	Elite	453ms	\N	active
1910	212.18.171.161	35410	Elite	81ms	\N	active
1590	154.73.65.125	48108	Elite	60ms	{"ip":"154.73.65.125","country":"Tanzania","region":"Not Available","city":"Not Available","isp":"Power and Network, Backup Company Ltd","organization":"Power-and-Network Customers","lat":"-6.8227","long":"39.2910"}	active
1488	203.142.58.21	43268	Elite	335ms	\N	active
1491	219.92.233.9	33511	Elite	75ms	\N	active
1497	210.48.204.118	49275	Elite	66ms	{"ip":"210.48.204.118","country":"Malaysia","region":"Terengganu","city":"Ajil","isp":"DiGi Telecommunications Sdn. Bhd.","organization":"DiGi Telecommunications Sdn. Bhd.","lat":"5.0829","long":"103.0860"}	active
1492	182.54.207.74	31581	Elite	365ms	\N	active
1498	113.23.179.116	36808	Elite	153ms	\N	active
244	152.204.130.62	8080	Transparent	267ms	{"ip":"152.204.130.62","country":"Colombia","region":"Departamento de Sucre","city":"Tolú","isp":"COLOMBIA TELECOMUNICACIONES S.A. ESP","organization":"COLOMBIA TELECOMUNICACIONES S.A. ESP","lat":"9.5239","long":"-75.5814"}	active
301	203.189.136.139	8080	Transparent	208ms	\N	active
1783	121.99.229.29	32473	Elite	387ms	\N	active
246	190.60.69.202	8080	Transparent	638ms	{"ip":"190.60.69.202","country":"Colombia","region":"Cundinamarca","city":"Bogotá","isp":"IFX Corporation","organization":"IFX NETWORKS COLOMBIA","lat":"4.6492","long":"-74.0628"}	active
1613	190.186.1.46	38671	Elite	278ms	{"ip":"190.186.1.46","country":"Bolivia","region":"El Beni","city":"Santa Cruz","isp":"COTAS LTDA.","organization":"COTAS LTDA.","lat":"-12.2833","long":"-66.2500"}	active
1615	190.104.18.156	8080	Transparent	38ms	\N	active
1616	190.180.49.85	8080	Transparent	236ms	\N	active
1617	200.105.209.118	8080	Transparent	422ms	\N	active
1618	200.105.209.250	8080	Transparent	120ms	\N	active
1619	190.180.113.138	51341	Elite	719ms	\N	active
1620	181.115.168.35	51824	Elite	81ms	\N	active
1623	200.105.170.52	36829	Elite	91ms	{"ip":"200.105.170.52","country":"Bolivia","region":"La Paz","city":"La Paz","isp":"AXS Bolivia S. A.","organization":"AXS Bolivia S. A.","lat":"-16.5000","long":"-68.1500"}	active
1625	190.11.80.201	30970	Elite	64ms	\N	active
1628	190.122.166.35	8080	Transparent	400ms	\N	active
1629	186.96.106.37	8181	Transparent	563ms	\N	active
1630	186.96.99.202	53281	Elite	86ms	{"ip":"186.96.99.202","country":"Colombia","region":"Distrito Especial","city":"Bogotá","isp":"TV AZTECA SUCURSAL COLOMBIA","organization":"TV AZTECA SUCURSAL COLOMBIA","lat":"4.6492","long":"-74.0628"}	active
1632	131.108.6.118	50435	Elite	323ms	\N	active
1633	186.96.106.36	8181	Transparent	464ms	\N	active
1634	186.96.106.35	8181	Transparent	440ms	\N	active
1638	190.141.56.50	30263	Elite	53ms	{"ip":"190.141.56.50","country":"Panama","region":"Panama","city":"Parque Lefevre","isp":"Cable Onda","organization":"Cable Onda","lat":"9.0167","long":"-79.4833"}	active
1641	186.96.98.84	36550	Elite	85ms	\N	active
1642	186.148.173.163	8080	Transparent	64ms	\N	active
1643	186.96.101.123	8080	Elite	46ms	\N	active
1644	186.96.100.234	999	Transparent	31ms	{"ip":"186.96.100.234","country":"Colombia","region":"Distrito Especial","city":"Bogotá","isp":"TV AZTECA SUCURSAL COLOMBIA","organization":"TV AZTECA SUCURSAL COLOMBIA","lat":"4.6492","long":"-74.0628"}	active
1648	186.148.167.134	8181	Transparent	365ms	\N	active
1649	191.98.198.45	39868	Elite	82ms	{"ip":"191.98.198.42","country":"Panama","region":"Panama","city":"Paitilla","isp":"WNET, S. A.","organization":"WNET, S. A.","lat":"8.9833","long":"-79.5167"}	active
1651	78.71.26.52	3128	Transparent	48ms	\N	active
1652	78.67.175.238	80	Anonymous	552ms	\N	active
1655	217.119.171.126	36090	Elite	512ms	{"ip":"217.119.171.126","country":"Sweden","region":"Vastra Gotaland","city":"Eklanda","isp":"Tele2 Sverige AB","organization":"Hallens Transport AB","lat":"57.6500","long":"11.9500"}	active
1656	90.229.216.218	46796	Elite	118ms	\N	active
1665	213.100.166.196	58297	Elite	66ms	{"ip":"213.100.166.196","country":"Latvia","region":"Riga","city":"Not Available","isp":"TELE2","organization":"Tele2 Latvia","lat":"56.9500","long":"24.1000"}	active
1661	217.10.117.57	52606	Elite	567ms	{"ip":"217.10.117.57","country":"Sweden","region":"Västra Götaland","city":"Alingsas","isp":"Net at Once Sweden AB","organization":"Net at Once Sweden AB","lat":"57.9303","long":"12.5334"}	active
1666	92.33.17.248	8080	Elite	171ms	\N	active
1667	185.2.154.85	4444	Transparent	43ms	\N	active
1672	77.243.151.109	8888	Elite	237ms	\N	active
1670	31.31.162.37	43706	Elite	108ms	{"ip":"31.31.162.37","country":"Sweden","region":"Vastra Gotaland","city":"Boatorp","isp":"Bogalnet AB","organization":"Bogal AB","lat":"58.0333","long":"13.0667"}	active
1674	213.141.93.60	58875	Elite	57ms	\N	active
1677	103.9.88.205	8080	Transparent	786ms	\N	active
1678	103.9.88.206	8080	Transparent	274ms	\N	active
1679	103.9.89.186	40422	Elite	227ms	\N	active
1680	202.21.114.130	57154	Elite	76ms	\N	active
1681	202.131.234.142	42238	Elite	68ms	{"ip":"202.131.234.142","country":"Mongolia","region":"Ulaanbaatar Hot","city":"Ulan Bator","isp":"Mobinet ISP, MobiCom Corporation","organization":"Mobinet LLC","lat":"47.9167","long":"106.9170"}	active
1682	180.149.93.226	53281	Transparent	77ms	\N	active
1684	202.70.44.194	8080	Transparent	60ms	\N	active
1685	202.179.7.182	30063	Elite	442ms	\N	active
1688	59.153.84.250	47163	Elite	76ms	{"ip":"59.153.84.250","country":"Mongolia","region":"Ulaanbaatar","city":"Chingeltei","isp":"Kewiko LLC","organization":"Kewiko LLC","lat":"48.0215","long":"106.8870"}	active
1689	202.131.248.69	44749	Elite	716ms	\N	active
1691	202.21.120.6	8080	Transparent	766ms	\N	active
1693	202.131.249.202	8080	Elite	465ms	\N	active
1697	180.149.96.134	8080	Transparent	844ms	\N	active
1696	66.181.167.72	53281	Elite	190ms	{"ip":"66.181.167.72","country":"Mongolia","region":"Ulaanbaatar Hot","city":"Ulan Bator","isp":"The first E-commerce and TriplePlay Service ISP in Mongolia.","organization":"The first E-commerce and TriplePlay Service ISP in Mongolia.","lat":"47.9167","long":"106.9170"}	active
1599	41.76.91.202	8080	Elite	160ms	{"ip":"41.76.91.202","country":"Tanzania","region":"Not Available","city":"Not Available","isp":"Spice Net Tanzania Ltd","organization":"Spice Net Tanzania Ltd","lat":"-6.8227","long":"39.2910"}	active
1604	181.188.132.133	41058	Elite	156ms	{"ip":"181.188.132.133","country":"Bolivia","region":"El Beni","city":"Santa Cruz","isp":"Telefónica Celular de Bolivia S.A.","organization":"Telefónica Celular de Bolivia S.A.","lat":"-12.2833","long":"-66.2500"}	active
371	95.158.137.253	8081	Transparent	290ms	\N	active
328	41.193.219.2	8080	Transparent	131ms	{"ip":"41.193.219.2","country":"South Africa","region":"Western Cape","city":"Cape Town","isp":"Vox Telecom Ltd","organization":"Vox - Fibre to the Home IP Reservation","lat":"-33.9167","long":"18.4167"}	active
1751	190.92.93.178	30289	Elite	287ms	\N	active
1607	181.188.166.74	8080	Transparent	712ms	\N	active
1603	190.104.18.154	8080	Transparent	820ms	\N	active
1717	158.181.16.17	39394	Elite	135ms	{"ip":"158.181.16.17","country":"Kyrgyzstan","region":"Gorod Bishkek","city":"Bishkek","isp":"Mega-Line Ltd.","organization":"MEGALINE-NET-LTE","lat":"42.8731","long":"74.6003"}	active
1722	92.62.72.183	44129	Elite	62ms	\N	active
1720	92.245.106.242	42464	Elite	228ms	{"ip":"92.245.106.242","country":"Kyrgyzstan","region":"Bishkek","city":"Tokol'dosh","isp":"Mega-Line Ltd.","organization":"Mega-Line Ltd.","lat":"42.8667","long":"74.6333"}	active
1723	158.181.239.219	36643	Elite	64ms	\N	active
1727	91.205.70.170	37614	Elite	75ms	{"ip":"91.205.70.170","country":"Bosnia & Herzegovina","region":"Federation of Bosnia and Herzegovina","city":"Kostrc","isp":"Telesat d.o.o.","organization":"DSL-Elektronika d.o.o.","lat":"45.0247","long":"18.6622"}	active
1730	77.239.65.111	52437	Elite	165ms	{"ip":"77.239.65.111","country":"Bosnia & Herzegovina","region":"Republika Srpska","city":"Bijeljina","isp":"Telrad doo","organization":"Telrad doo","lat":"44.7587","long":"19.2144"}	active
1731	91.191.63.162	53281	Elite	51ms	\N	active
1732	185.125.120.135	41441	Elite	773ms	\N	active
1734	217.75.204.2	8080	Transparent	65ms	\N	active
1735	89.111.246.228	49164	Elite	53ms	\N	active
1738	91.191.3.114	53281	Transparent	627ms	\N	active
1740	31.216.188.107	33824	Elite	318ms	{"ip":"31.216.188.107","country":"Bosnia & Herzegovina","region":"Republika Srpska","city":"Bijeljina","isp":"Telrad doo","organization":"Telrad doo","lat":"44.7587","long":"19.2144"}	active
1744	109.175.26.117	31824	Elite	92ms	\N	active
1750	138.59.178.154	60590	Elite	66ms	\N	active
1753	131.161.52.234	56414	Elite	58ms	\N	active
1748	181.114.57.250	54300	Elite	701ms	\N	active
1745	176.108.56.170	44194	Elite	354ms	\N	active
1756	181.189.235.134	54463	Elite	135ms	\N	active
1754	190.181.205.45	39469	Elite	42ms	\N	active
1746	91.191.33.165	53281	Transparent	251ms	\N	active
1758	138.117.99.37	53281	Elite	41ms	\N	active
1762	131.161.55.28	53942	Elite	134ms	\N	active
1767	45.7.238.250	61189	Elite	492ms	\N	active
1769	103.85.0.55	53176	Elite	452ms	\N	active
1771	202.37.70.163	53281	Transparent	59ms	\N	active
1773	202.49.183.33	57350	Elite	94ms	\N	active
1775	43.254.21.250	42935	Elite	72ms	\N	active
1778	45.120.119.38	42362	Elite	308ms	\N	active
1777	45.120.119.14	54340	Elite	389ms	\N	active
1781	103.247.194.33	58693	Elite	91ms	\N	active
1780	103.226.33.170	58531	Elite	96ms	\N	active
1782	202.49.183.168	54601	Elite	78ms	\N	active
1787	45.120.116.39	34242	Elite	65ms	\N	active
1786	103.226.33.170	59828	Elite	131ms	\N	active
1788	196.216.13.27	51121	Elite	151ms	\N	active
1789	154.66.122.198	34647	Elite	269ms	\N	active
1790	41.217.219.53	52283	Elite	91ms	\N	active
1793	41.217.216.45	30549	Elite	956ms	\N	active
1796	41.216.230.154	32309	Elite	94ms	\N	active
1795	41.75.123.67	60909	Elite	78ms	\N	active
1797	41.75.123.46	34609	Elite	81ms	\N	active
1798	196.11.81.250	50247	Elite	105ms	\N	active
1799	154.66.122.90	49715	Elite	83ms	\N	active
1800	41.217.216.10	50767	Elite	91ms	\N	active
1804	154.66.125.18	43597	Elite	77ms	\N	active
1803	41.75.126.52	35989	Elite	628ms	\N	active
1707	212.112.98.73	53558	Elite	262ms	\N	active
1711	213.145.137.102	39364	Elite	120ms	\N	active
1703	185.53.106.158	8080	Transparent	72ms	\N	active
1813	186.159.215.225	45537	Elite	36ms	\N	active
1824	201.204.174.226	3130	Transparent	218ms	\N	active
1818	170.81.33.174	30492	Elite	42ms	\N	active
1819	170.81.35.26	35199	Elite	46ms	\N	active
1820	201.204.46.10	39371	Elite	73ms	\N	active
1892	190.181.140.78	8888	Elite	246ms	\N	active
1895	190.124.34.221	44167	Elite	242ms	\N	active
1825	186.15.15.121	50885	Elite	487ms	\N	active
1835	147.92.87.181	44561	Elite	249ms	\N	active
1836	67.206.202.28	51973	Elite	41ms	\N	active
1842	72.50.10.98	55167	Elite	28ms	\N	active
1847	103.241.156.246	58917	Elite	90ms	\N	active
1848	103.5.173.53	8080	Transparent	83ms	\N	active
1849	103.5.174.138	41179	Elite	360ms	\N	active
1851	103.235.176.34	48386	Elite	78ms	\N	active
1858	103.5.173.25	8080	Transparent	349ms	\N	active
1861	103.215.210.194	48652	Elite	463ms	\N	active
1864	181.40.121.179	57797	Elite	160ms	\N	active
1863	103.5.172.182	49311	Elite	106ms	\N	active
1874	190.52.162.108	42252	Elite	191ms	\N	active
1876	168.194.242.26	56537	Elite	279ms	\N	active
1877	131.196.192.31	34355	Elite	63ms	\N	active
1878	138.59.166.199	42187	Elite	147ms	\N	active
1881	170.246.152.93	33359	Elite	95ms	\N	active
1883	186.1.40.91	58101	Elite	69ms	\N	active
1810	186.176.196.242	59551	Elite	72ms	\N	active
1817	186.177.141.223	57522	Elite	117ms	\N	active
1816	190.211.115.66	57808	Elite	568ms	\N	active
1890	186.1.4.178	59541	Elite	42ms	\N	active
1821	186.4.4.74	44384	Elite	40ms	\N	active
1823	168.181.161.78	59914	Elite	400ms	\N	active
1898	185.31.159.62	3128	Transparent	568ms	\N	active
437	89.239.25.218	8080	Elite	198ms	\N	active
5	91.217.42.2	8080	Transparent	177ms	{"ip":"91.217.42.64","country":"Russia","region":"Chelyabinsk","city":"Ufaley","isp":"Uralskie Kabelnye Seti Ltd.","organization":"Uralskie Kabelnye Seti Ltd.","lat":"56.0567","long":"60.2306"}	active
784	190.73.41.200	8080	Anonymous	94ms	\N	active
423	200.5.226.118	3128	Transparent	248ms	\N	active
786	200.84.107.201	8080	Anonymous	350ms	\N	active
787	186.91.194.31	8080	Anonymous	154ms	\N	active
788	190.203.13.51	8080	Anonymous	801ms	\N	active
1899	62.48.171.181	44578	Elite	138ms	\N	active
1903	94.62.99.99	80	Transparent	149ms	\N	active
1904	185.37.211.222	36963	Elite	61ms	\N	active
1875	190.128.176.250	55540	Elite	73ms	\N	active
1815	201.204.174.226	3128	Transparent	39ms	\N	active
1827	192.254.101.17	8888	Elite	1000ms	\N	active
1832	70.45.92.86	46544	Elite	35ms	\N	active
1834	67.206.201.10	33240	Elite	61ms	\N	active
1841	104.219.28.167	60728	Elite	104ms	\N	active
1845	162.251.158.227	53955	Elite	44ms	\N	active
1857	103.5.173.105	8080	Transparent	297ms	\N	active
1860	180.94.77.242	8080	Transparent	233ms	\N	active
1866	200.85.39.138	53250	Elite	319ms	\N	active
1873	181.120.146.211	30370	Elite	71ms	\N	active
1880	138.59.167.44	40504	Elite	529ms	\N	active
1882	170.246.152.6	45885	Elite	60ms	\N	active
1889	190.53.46.14	56450	Elite	445ms	\N	active
1897	186.1.17.4	53445	Elite	353ms	\N	active
1807	154.66.125.18	55174	Elite	221ms	\N	active
1811	170.81.35.158	48787	Elite	75ms	\N	active
1921	213.149.174.241	3128	Transparent	614ms	\N	active
1922	31.209.105.244	59195	Elite	364ms	\N	active
1923	213.149.183.112	31527	Elite	524ms	\N	active
1926	31.209.105.248	54341	Elite	755ms	\N	active
2000	196.27.112.190	36764	Elite	88ms	\N	active
1930	165.16.32.1	8080	Transparent	124ms	\N	active
1929	31.209.105.250	44107	Elite	667ms	\N	active
1934	165.16.30.2	8080	Transparent	226ms	\N	active
1941	62.240.54.126	8080	Transparent	73ms	\N	active
2014	156.0.249.10	46697	Elite	147ms	\N	active
1949	165.90.66.230	44090	Elite	93ms	\N	active
1950	41.223.154.170	23500	Elite	312ms	\N	active
1957	196.32.109.174	35191	Elite	81ms	\N	active
1962	41.66.252.134	53281	Elite	66ms	\N	active
1972	41.66.205.115	80	Transparent	898ms	\N	active
1980	197.159.12.167	42612	Elite	189ms	\N	active
1977	41.204.87.10	41769	Elite	192ms	\N	active
1985	41.211.125.45	53418	Elite	1000ms	\N	active
1915	93.109.241.246	33647	Elite	93ms	\N	active
1917	31.209.104.209	41250	Elite	66ms	\N	active
1924	31.209.103.77	8080	Transparent	236ms	\N	active
1916	31.209.110.193	57404	Elite	66ms	\N	active
1913	193.126.23.235	39783	Elite	903ms	\N	active
2001	154.119.81.98	8080	Transparent	272ms	\N	active
2002	196.201.17.154	43129	Elite	109ms	\N	active
1928	31.209.104.52	41278	Elite	1000ms	\N	active
2009	41.190.62.191	34554	Elite	142ms	\N	active
2011	172.87.233.1	8080	Transparent	268ms	\N	active
1939	62.68.59.106	8080	Transparent	44ms	\N	active
2013	193.56.149.229	50208	Elite	107ms	\N	active
2015	95.210.44.45	55605	Elite	166ms	\N	active
2016	81.199.32.150	56412	Elite	437ms	\N	active
2017	5.175.78.47	45630	Elite	266ms	\N	active
1947	196.32.106.169	46299	Elite	82ms	\N	active
1959	41.139.9.47	8080	Elite	84ms	\N	active
1966	41.66.205.118	80	Transparent	675ms	\N	active
1973	41.211.116.134	49079	Elite	69ms	\N	active
2004	196.43.112.118	39714	Elite	324ms	\N	active
2007	197.211.238.220	42095	Elite	98ms	\N	active
1914	31.209.104.41	33989	Elite	67ms	\N	active
1932	165.16.33.1	8080	Transparent	142ms	\N	active
1933	165.16.113.195	53281	Elite	674ms	\N	active
1937	165.16.113.205	53281	Elite	211ms	\N	active
1938	169.239.92.1	8080	Transparent	117ms	\N	active
1944	165.16.113.197	53281	Elite	523ms	\N	active
1945	165.90.67.102	59570	Elite	137ms	\N	active
1948	196.40.123.202	31683	Elite	167ms	\N	active
1953	196.22.51.6	50107	Elite	224ms	\N	active
1960	41.57.210.137	80	Transparent	269ms	\N	active
1983	169.255.4.150	54392	Elite	79ms	\N	active
1991	31.45.232.138	61081	Elite	56ms	\N	active
1998	196.27.115.138	54803	Elite	120ms	\N	active
1999	209.88.95.218	36813	Elite	93ms	\N	active
2012	193.57.43.131	36096	Elite	74ms	\N	active
2030	95.180.179.203	57683	Elite	166ms	\N	active
2109	190.122.97.138	52622	Elite	1000ms	\N	active
2038	41.190.128.150	39239	Elite	254ms	\N	active
2044	105.27.154.210	60379	Elite	463ms	\N	active
2047	79.160.140.118	37682	Elite	143ms	\N	active
2046	84.202.248.254	8080	Elite	532ms	\N	active
2054	195.18.224.21	32317	Elite	64ms	\N	active
2053	62.97.195.155	8080	Elite	985ms	\N	active
2069	217.162.74.172	80	Elite	209ms	\N	active
2020	70.35.146.34	47854	Elite	513ms	\N	active
2079	196.20.12.49	8080	Elite	280ms	\N	active
2088	46.248.82.123	34242	Elite	51ms	\N	active
2094	89.212.7.87	80	Elite	215ms	\N	active
2098	213.172.90.76	61500	Elite	70ms	\N	active
792	200.35.106.182	8080	Elite	249ms	\N	active
793	186.91.223.189	8080	Anonymous	305ms	\N	active
794	186.95.71.199	8080	Transparent	284ms	\N	active
795	150.185.252.214	8080	Transparent	438ms	\N	active
798	200.11.136.58	3130	Transparent	78ms	\N	active
799	186.94.6.219	8080	Anonymous	741ms	\N	active
2022	62.162.73.54	56920	Elite	292ms	\N	active
2108	186.150.111.158	61903	Elite	453ms	\N	active
2110	66.98.56.237	8080	Elite	335ms	\N	active
2111	83.143.24.27	60669	Elite	97ms	\N	active
2114	169.255.81.138	54856	Elite	494ms	\N	active
2117	41.75.4.208	53281	Elite	522ms	\N	active
2122	62.56.249.138	35730	Elite	83ms	\N	active
2119	41.138.208.193	56148	Elite	80ms	\N	active
2032	89.205.3.188	37832	Elite	58ms	\N	active
2040	41.190.128.82	47131	Elite	316ms	\N	active
2048	81.167.244.62	50172	Elite	51ms	\N	active
2049	193.213.211.94	60659	Elite	219ms	\N	active
2068	82.136.122.127	80	Anonymous	47ms	\N	active
2074	81.221.235.173	80	Elite	492ms	\N	active
2086	193.77.45.19	21776	Elite	449ms	\N	active
2024	77.28.98.28	48936	Elite	415ms	\N	active
2026	31.3.90.52	47370	Elite	83ms	\N	active
2037	41.72.213.22	53281	Elite	1000ms	\N	active
2067	212.23.250.46	80	Anonymous	37ms	\N	active
2028	77.28.97.34	48458	Elite	723ms	\N	active
2029	77.28.96.206	48782	Elite	542ms	\N	active
2041	105.27.204.62	50182	Elite	116ms	\N	active
2043	105.27.202.26	58387	Elite	76ms	\N	active
2058	52.169.139.131	80	Elite	217ms	\N	active
2072	185.36.220.109	80	Transparent	36ms	\N	active
2077	196.20.12.6	8080	Elite	169ms	\N	active
2082	160.242.31.126	54220	Elite	217ms	\N	active
2090	212.18.38.201	47085	Elite	234ms	\N	active
2091	77.38.21.145	55547	Elite	239ms	\N	active
2096	185.161.226.66	45276	Elite	762ms	\N	active
2097	185.129.1.149	55733	Elite	233ms	\N	active
2103	181.36.42.109	8081	Anonymous	27ms	\N	active
2102	85.132.12.75	42627	Elite	57ms	\N	active
2107	190.166.249.44	30357	Elite	127ms	\N	active
2105	190.211.190.11	51184	Elite	67ms	\N	active
2106	190.80.255.2	55928	Elite	45ms	\N	active
2113	169.255.81.32	43872	Elite	352ms	\N	active
2116	41.75.13.79	52120	Elite	163ms	\N	active
2120	41.77.73.230	21776	Elite	548ms	\N	active
2121	154.72.199.38	32954	Elite	272ms	\N	active
2023	77.28.96.196	39969	Elite	227ms	\N	active
2083	197.234.101.90	53281	Elite	787ms	\N	active
2145	109.72.103.41	32231	Elite	218ms	\N	active
2148	69.63.73.172	47206	Elite	306ms	\N	active
2150	69.63.72.26	34314	Elite	71ms	\N	active
2158	41.86.244.89	44480	Elite	81ms	\N	active
2159	41.74.9.238	8080	Elite	114ms	\N	active
2168	41.78.198.243	23500	Elite	365ms	\N	active
2163	81.165.193.209	31952	Elite	53ms	\N	active
2166	213.251.79.138	8181	Transparent	565ms	\N	active
2167	197.255.178.101	3128	Transparent	495ms	\N	active
2174	197.255.178.6	23500	Elite	974ms	\N	active
2172	41.79.233.45	8080	Elite	132ms	\N	active
2173	41.79.233.108	8080	Elite	114ms	\N	active
2177	41.60.216.43	8080	Anonymous	265ms	\N	active
2179	155.0.181.254	34479	Elite	596ms	\N	active
2180	41.60.24.46	8080	Transparent	151ms	\N	active
2181	41.60.229.170	47149	Elite	128ms	\N	active
2182	64.57.127.9	8080	Transparent	254ms	\N	active
2184	154.66.109.209	32745	Elite	373ms	\N	active
2183	64.57.127.1	8080	Transparent	228ms	\N	active
2186	41.191.204.95	8888	Elite	397ms	\N	active
2187	41.191.204.146	36284	Elite	762ms	\N	active
2189	195.158.92.164	46273	Elite	139ms	\N	active
2188	212.56.139.253	80	Anonymous	843ms	\N	active
2191	212.56.145.18	8999	Transparent	376ms	\N	active
2199	81.218.224.14	80	Anonymous	428ms	\N	active
2205	41.242.141.31	23500	Elite	306ms	\N	active
2202	77.138.123.51	8888	Elite	796ms	\N	active
2203	192.116.49.15	80	Elite	499ms	\N	active
2204	105.179.0.74	53390	Elite	672ms	\N	active
2207	196.223.245.36	23500	Elite	3ms	\N	active
2219	212.11.176.156	8080	Anonymous	50ms	\N	active
2213	41.203.251.107	39041	Elite	281ms	\N	active
2223	31.167.77.13	8080	Transparent	937ms	\N	active
2221	87.101.142.238	8080	Elite	510ms	\N	active
2225	105.174.19.194	53019	Elite	86ms	\N	active
2229	183.182.101.32	40792	Elite	36ms	\N	active
2228	41.223.100.50	8080	Transparent	309ms	\N	active
2232	202.123.183.180	50860	Elite	96ms	\N	active
2127	212.237.30.203	3128	Transparent	69ms	\N	active
2126	213.32.254.189	8080	Elite	544ms	\N	active
2132	2.105.235.34	38048	Elite	118ms	\N	active
2133	87.57.101.134	8080	Transparent	451ms	\N	active
2135	185.68.210.43	49512	Elite	639ms	\N	active
2153	160.119.211.81	23500	Elite	1000ms	\N	active
2155	154.127.32.89	60020	Elite	152ms	\N	active
2169	197.255.179.179	54268	Elite	385ms	\N	active
2170	169.255.67.130	36157	Elite	295ms	\N	active
2171	41.189.196.23	38410	Elite	266ms	\N	active
2175	41.243.7.251	38817	Elite	88ms	\N	active
2178	41.60.228.33	46764	Elite	71ms	\N	active
2185	41.191.204.142	8888	Elite	550ms	\N	active
2192	213.165.171.55	49058	Elite	57ms	\N	active
2190	212.56.145.23	8999	Transparent	469ms	\N	active
569	37.187.121.205	3128	Transparent	36ms	{"ip":"37.187.121.205","country":"France","region":"Nord-Pas-de-Calais","city":"Roubaix","isp":"OVH SAS","organization":"OVH SAS","lat":"50.6942","long":"3.1746"}	active
595	139.5.71.220	8080	Transparent	389ms	\N	active
575	81.252.195.242	3128	Transparent	43ms	{"ip":"81.252.195.242","country":"France","region":"Midi-Pyrenees","city":"Cornebarrieu","isp":"Orange S.A.","organization":"Orange S.A.","lat":"43.6490","long":"1.3241"}	active
634	185.147.57.203	80	Transparent	108ms	\N	active
2194	202.21.32.148	8080	Elite	499ms	\N	active
2193	213.165.171.106	42484	Elite	91ms	\N	active
2200	192.117.146.110	80	Elite	117ms	\N	active
2196	116.12.89.113	8080	Transparent	655ms	\N	active
2197	116.12.89.89	8080	Transparent	118ms	\N	active
2198	116.12.89.65	8080	Transparent	176ms	\N	active
2201	80.250.156.184	41703	Elite	70ms	\N	active
2211	41.86.56.224	31801	Elite	742ms	\N	active
2206	197.243.34.228	3128	Transparent	89ms	\N	active
2209	196.13.208.22	8080	Anonymous	80ms	\N	active
2210	41.86.57.65	32638	Elite	217ms	\N	active
2212	154.70.168.206	37115	Elite	156ms	\N	active
2214	154.73.45.138	53281	Elite	84ms	\N	active
2215	41.78.75.21	53281	Elite	112ms	\N	active
2220	31.167.77.13	80	Transparent	626ms	\N	active
2217	154.73.45.206	39173	Elite	85ms	\N	active
2218	154.118.243.18	38964	Elite	873ms	\N	active
2222	37.224.85.67	42362	Elite	114ms	\N	active
2224	154.66.83.1	30512	Elite	73ms	\N	active
2226	41.63.170.82	36972	Elite	72ms	\N	active
2227	197.216.101.106	35350	Elite	84ms	\N	active
2230	115.84.92.134	58017	Elite	234ms	\N	active
2231	202.123.178.202	54919	Elite	123ms	\N	active
2130	93.176.85.253	35555	Elite	63ms	\N	active
2131	93.176.85.228	35555	Elite	58ms	\N	active
2134	90.190.58.88	8080	Elite	127ms	\N	active
2136	185.68.210.42	49512	Elite	234ms	\N	active
2137	95.153.48.2	37490	Elite	75ms	\N	active
2138	80.79.114.253	9999	Transparent	8ms	\N	active
2140	195.250.188.210	8080	Transparent	568ms	\N	active
2141	62.4.37.76	56206	Elite	379ms	\N	active
2142	62.4.54.158	53102	Elite	324ms	\N	active
2143	62.4.49.18	42899	Elite	49ms	\N	active
2144	109.72.103.40	39462	Elite	809ms	\N	active
2146	46.161.70.131	40795	Elite	401ms	\N	active
2149	160.119.211.99	23500	Elite	134ms	\N	active
2151	160.119.211.27	23500	Elite	426ms	\N	active
2154	160.119.211.89	23500	Elite	560ms	\N	active
2156	154.127.32.245	60020	Elite	866ms	\N	active
2157	164.160.143.88	61167	Elite	195ms	\N	active
2161	91.134.165.198	9999	Elite	396ms	\N	active
2160	41.222.193.24	34539	Elite	80ms	\N	active
2164	212.123.1.243	8080	Elite	53ms	\N	active
2162	212.71.16.166	8888	Anonymous	322ms	\N	active
2165	84.194.120.151	80	Elite	31ms	\N	active
2255	197.155.158.22	80	Elite	390ms	\N	active
2260	41.77.23.91	42374	Elite	141ms	\N	active
2261	41.78.243.242	53281	Elite	526ms	\N	active
2266	197.255.178.6	23500	Elite	974ms	\N	active
2277	103.43.147.56	33987	Anonymous	464ms	\N	active
2286	190.93.23.4	44700	Elite	659ms	\N	active
2280	196.201.206.219	55625	Elite	354ms	\N	active
2287	190.93.23.27	44700	Elite	541ms	\N	active
2290	190.6.84.170	8080	Anonymous	448ms	\N	active
2291	200.55.142.166	3128	Elite	326ms	\N	active
2288	103.21.231.132	53281	Elite	448ms	\N	active
2292	94.187.213.251	60072	Elite	96ms	\N	active
2293	94.187.197.252	52473	Elite	965ms	\N	active
2296	38.99.117.71	54645	Elite	71ms	\N	active
2297	38.99.116.81	34354	Elite	234ms	\N	active
2298	82.137.209.90	8080	Transparent	142ms	\N	active
2301	41.216.148.55	47998	Elite	295ms	\N	active
2300	41.216.148.140	33108	Elite	346ms	\N	active
2307	199.127.197.12	23500	Elite	57ms	\N	active
2304	181.36.42.109	8081	Anonymous	27ms	\N	active
2305	190.94.18.210	53281	Elite	35ms	\N	active
2308	190.80.255.2	55928	Elite	45ms	\N	active
2313	41.111.211.235	8080	Transparent	143ms	\N	active
2311	190.122.97.138	52622	Elite	1000ms	\N	active
2316	217.29.114.40	44523	Elite	443ms	\N	active
2318	186.159.101.69	8080	Transparent	59ms	\N	active
2315	198.36.31.36	32515	Elite	108ms	\N	active
2317	194.54.183.82	48988	Elite	180ms	\N	active
2324	109.74.39.43	8080	Elite	85ms	\N	active
2326	91.187.75.48	58000	Elite	34ms	\N	active
2327	202.128.22.65	41084	Elite	599ms	\N	active
2328	197.149.128.190	35620	Anonymous	214ms	\N	active
1	91.203.240.210	80	Transparent	234ms	\N	active
114	204.29.115.149	8080	Transparent	43ms	\N	active
2329	60.246.91.223	53281	Elite	65ms	\N	active
2241	200.125.40.254	3128	Transparent	78ms	\N	active
2244	150.242.108.125	8080	Transparent	66ms	\N	active
2233	183.182.103.98	8080	Transparent	1000ms	\N	active
2234	203.81.75.37	8080	Transparent	479ms	\N	active
2235	103.81.114.182	53281	Elite	78ms	\N	active
2236	103.76.184.146	8080	Transparent	143ms	\N	active
2237	203.81.74.46	35572	Elite	644ms	\N	active
2238	164.73.191.2	8080	Transparent	246ms	\N	active
2239	179.27.50.102	61350	Elite	113ms	\N	active
672	217.101.32.27	8080	Elite	225ms	{"ip":"217.101.32.27","country":"Netherlands","region":"South Holland","city":"Gorinchem","isp":"Vodafone Libertel B.V.","organization":"Ziggo Consumers","lat":"51.8350","long":"4.9948"}	active
1846	103.96.233.249	8080	Transparent	858ms	\N	active
2243	103.26.95.78	57106	Elite	138ms	\N	active
2242	150.242.109.18	8080	Transparent	412ms	\N	active
2247	185.121.2.20	59197	Elite	932ms	\N	active
2249	176.113.139.96	3128	Elite	83ms	\N	active
2252	217.64.109.234	45282	Elite	922ms	\N	active
2253	41.79.198.36	49421	Elite	231ms	\N	active
2251	41.78.75.21	53281	Elite	112ms	\N	active
2256	217.64.109.231	45282	Elite	92ms	\N	active
2257	154.118.243.18	38964	Elite	873ms	\N	active
2263	41.78.243.218	53281	Elite	156ms	\N	active
2259	41.77.23.238	44593	Elite	97ms	\N	active
2262	41.78.243.233	53281	Elite	339ms	\N	active
2264	197.255.178.101	3128	Transparent	495ms	\N	active
2265	197.255.179.179	54268	Elite	385ms	\N	active
2268	5.32.86.42	61115	Elite	405ms	\N	active
2270	160.238.136.17	23500	Elite	227ms	\N	active
2267	141.105.167.107	41307	Elite	388ms	\N	active
2272	160.238.136.129	23500	Elite	575ms	\N	active
2282	160.120.131.3	60148	Elite	114ms	\N	active
2284	195.181.198.178	8118	Elite	46ms	\N	active
2289	103.21.231.131	53281	Elite	295ms	\N	active
2294	41.79.25.204	40269	Elite	183ms	\N	active
2299	82.137.250.139	8080	Transparent	284ms	\N	active
2302	197.148.74.154	8080	Transparent	230ms	\N	active
2303	190.120.24.9	53281	Elite	276ms	\N	active
2309	190.166.249.44	30357	Elite	127ms	\N	active
2306	190.211.190.11	51184	Elite	67ms	\N	active
2310	186.150.111.158	61903	Elite	453ms	\N	active
2312	66.98.56.237	8080	Elite	335ms	\N	active
2314	80.250.45.103	47834	Elite	170ms	\N	active
2322	115.126.167.71	32141	Elite	321ms	\N	active
2319	41.57.84.250	54592	Elite	91ms	\N	active
2321	162.211.139.90	57206	Elite	93ms	\N	active
2320	74.116.59.8	53281	Elite	208ms	\N	active
2323	103.43.147.56	33987	Anonymous	464ms	\N	active
2274	41.205.231.202	8080	Transparent	382ms	\N	active
2275	196.2.10.56	53281	Elite	107ms	\N	active
2276	196.2.11.143	53281	Transparent	395ms	\N	active
95	131.161.26.90	8080	Transparent	140ms	{"ip":"131.161.26.90","country":"Brazil","region":"Alagoas","city":"Not Available","isp":"Start Telecomunicacoes LTDA - EPP","organization":"Start Telecomunicacoes LTDA - EPP","lat":"-9.6667","long":"-35.7167"}	active
87	191.17.255.164	8080	Transparent	254ms	{"ip":"191.17.255.164","country":"Brazil","region":"Sao Paulo","city":"São Paulo","isp":"TELEFÔNICA BRASIL S.A","organization":"TELEFÔNICA BRASIL S.A","lat":"-23.6270","long":"-46.6350"}	active
97	201.17.147.203	3128	Transparent	477ms	{"ip":"201.17.147.203","country":"Brazil","region":"Minas Gerais","city":"Belo Horizonte","isp":"CLARO S.A.","organization":"CLARO S.A.","lat":"-19.8993","long":"-43.9570"}	active
102	40.114.14.173	80	Elite	778ms	{"ip":"40.114.14.173","country":"United States","region":"Virginia","city":"Washington","isp":"Microsoft Corporation","organization":"Microsoft Corporation","lat":"38.7078","long":"-78.1566"}	active
9	5.139.213.154	8080	Elite	58ms	{"ip":"5.139.213.154","country":"Russia","region":"Astrakhanskaya Oblast'","city":"Astrakhan","isp":"PJSC Rostelecom","organization":"PJSC Rostelecom","lat":"46.3400","long":"48.0400"}	active
25	176.111.97.18	8080	Elite	85ms	{"ip":"176.111.97.18","country":"Russia","region":"Moscow","city":"Moscow","isp":"Digit One LLC","organization":"Limited Liability Company Bit Com","lat":"55.7522","long":"37.6156"}	active
30	183.88.214.47	8080	Transparent	102ms	{"ip":"183.88.214.47","country":"Thailand","region":"Changwat Amnat Charoen","city":"Phana","isp":"Triple T Internet/Triple T Broadband","organization":"3BB Broadband Internet service Thailand","lat":"15.6983","long":"104.8930"}	active
14	46.151.10.69	8080	Elite	84ms	{"ip":"46.151.10.69","country":"Russia","region":"Saint Petersburg City","city":"Saint Petersburg","isp":"Pioner-Lan Ltd.","organization":"Pioner-Lan Ltd.","lat":"59.9321","long":"30.1968"}	active
15	78.109.47.7	8080	Transparent	70ms	{"ip":"46.48.134.74","country":"Russia","region":"Sakha","city":"Aldan","isp":"PJSC Rostelecom","organization":"Sakhatelecom, Kurashova Street, 22","lat":"58.6102","long":"125.3960"}	active
21	95.79.53.112	8080	Transparent	88ms	{"ip":"95.79.53.112","country":"Russia","region":"Nizhny Novgorod Oblast","city":"Dzerzhinsk","isp":"JSC ER-Telecom Holding","organization":"JSC ER-Telecom Holding Nizhny Novgorod","lat":"56.2389","long":"43.4631"}	active
23	185.158.112.209	3128	Transparent	47ms	{"ip":"185.158.112.209","country":"Russia","region":"Moscow","city":"Moscow","isp":"IT Expert LLC","organization":"IT Expert LLC","lat":"55.7522","long":"37.6156"}	active
44	58.82.175.214	8080	Transparent	33ms	{"ip":"58.82.175.214","country":"Thailand","region":"Bangkok","city":"Bangkok","isp":"OpenNet ISP Cambodia","organization":"Opennet","lat":"13.7833","long":"100.5170"}	active
50	182.53.201.5	8080	Transparent	73ms	{"ip":"182.53.201.5","country":"Thailand","region":"Changwat Chon Buri","city":"Pattaya","isp":"TOT Public Company Limited","organization":"TOT Public Company Limited","lat":"13.0500","long":"100.9330"}	active
37	113.53.91.214	8080	Transparent	40ms	{"ip":"113.53.91.214","country":"Thailand","region":"Prachin Buri","city":"Prachin Buri","isp":"TOT Public Company Limited","organization":"TOT Public Company Limited","lat":"14.0503","long":"101.3700"}	active
38	182.52.51.171	8080	Transparent	54ms	{"ip":"182.52.51.171","country":"Thailand","region":"Changwat Ratchaburi","city":"Ratchaburi","isp":"TOT Public Company Limited","organization":"TOT Public Company Limited","lat":"13.8167","long":"99.8833"}	active
40	134.236.252.126	8080	Transparent	54ms	{"ip":"134.236.252.126","country":"Thailand","region":"Changwat Phra Nakhon Si Ayutthaya","city":"Ayutthaya","isp":"CAT TELECOM Public Company Ltd,CAT","organization":"10 Fl. 72. CAT TELECOM TOWER Bangrak Bangkok Thailand","lat":"14.3738","long":"100.5630"}	active
800	190.8.168.86	8080	Transparent	188ms	\N	active
802	163.172.134.194	3128	Transparent	27ms	\N	active
803	51.15.147.94	80	Elite	26ms	\N	active
805	185.28.89.86	8080	Anonymous	49ms	\N	active
806	139.59.174.174	3128	Transparent	43ms	\N	active
807	178.62.34.179	3128	Transparent	42ms	\N	active
76	177.182.15.124	8080	Elite	211ms	{"ip":"186.250.107.74","country":"Brazil","region":"Minas Gerais","city":"General Carneiro","isp":"REDE MINAS TELECOM LTDA","organization":"REDE MINAS TELECOM LTDA","lat":"-19.8333","long":"-43.8333"}	active
71	43.243.141.114	8080	Transparent	156ms	{"ip":"182.253.179.63","country":"Indonesia","region":"Jakarta","city":"Jakarta","isp":"BIZNET NETWORKS","organization":"Biznet ISP","lat":"-6.1744","long":"106.8290"}	active
67	118.97.169.170	3128	Transparent	58ms	{"ip":"118.97.169.170","country":"Indonesia","region":"Not Available","city":"Not Available","isp":"PT Telekomunikasi Indonesia","organization":"PT Telkom Indonesia's customer","lat":"-6.1750","long":"106.8290"}	active
82	189.125.170.36	80	Elite	460ms	\N	active
93	177.92.19.38	3128	Transparent	60ms	{"ip":"177.92.19.38","country":"Brazil","region":"Parana","city":"Ponta Grossa","isp":"COPEL Telecomunicações S.A.","organization":"COPEL Telecomunicações S.A.","lat":"-25.0833","long":"-50.1500"}	active
92	187.63.111.37	3128	Transparent	107ms	{"ip":"190.180.160.127","country":"Brazil","region":"Rio de Janeiro","city":"Campos dos Goytacazes","isp":"Ver Tv Comunicações S/A","organization":"Ver Tv Comunicações S/A","lat":"-21.6774","long":"-41.4553"}	active
96	189.63.111.115	8080	Transparent	91ms	{"ip":"189.63.111.115","country":"Brazil","region":"Goias","city":"Goiânia","isp":"CLARO S.A.","organization":"CLARO S.A.","lat":"-16.6402","long":"-49.2599"}	active
100	187.87.206.10	8080	Transparent	68ms	{"ip":"187.87.206.10","country":"Brazil","region":"Bahia","city":"Madre de Deus","isp":"Screen Saver Informática LTDA","organization":"Screen Saver Informática LTDA","lat":"-12.7381","long":"-38.6254"}	active
1486	203.142.58.69	30755	Elite	602ms	\N	active
13	89.104.127.174	8080	Elite	84ms	{"ip":"89.104.127.174","country":"Russia","region":"Moscow City","city":"Moscow","isp":"Vysokie tehnologii Limited Liability Company","organization":"MDC Telecom Ltd.","lat":"55.7522","long":"37.6156"}	active
61	36.66.190.139	8080	Transparent	278ms	{"ip":"36.66.190.139","country":"Indonesia","region":"Central Java","city":"Cilacap","isp":"PT Telekomunikasi Indonesia","organization":"PT TELKOM INDONESIA","lat":"-7.7264","long":"109.0090"}	active
62	36.68.17.169	8080	Transparent	375ms	{"ip":"36.68.17.169","country":"Indonesia","region":"Riau","city":"Pekanbaru","isp":"PT Telekomunikasi Indonesia","organization":"PT TELKOM INDONESIA","lat":"1.0128","long":"100.5040"}	active
72	103.255.123.38	8080	Transparent	73ms	{"ip":"103.255.123.38","country":"Indonesia","region":"Bali","city":"Denpasar","isp":"PT Bali Soket Informindo","organization":"PT Bali Soket Informindo","lat":"-8.6500","long":"115.2170"}	active
79	179.106.88.162	80	Elite	50ms	{"ip":"179.106.88.162","country":"Brazil","region":"Rio Grande do Sul","city":"Julio de Castilhos","isp":"JCVirtual - Solucoes CC Telecomunicacoes LTDA","organization":"JCVirtual - Solucoes CC Telecomunicacoes LTDA","lat":"-29.2645","long":"-53.6246"}	active
86	201.62.125.30	8080	Transparent	369ms	{"ip":"201.62.125.30","country":"Brazil","region":"Sao Paulo","city":"Mogi Mirim","isp":"CLARO S.A.","organization":"CLARO S.A.","lat":"-22.4498","long":"-46.9897"}	active
215	103.239.253.165	8080	Transparent	977ms	\N	active
17	90.189.145.99	8080	Elite	59ms	{"ip":"90.189.145.99","country":"Russia","region":"Novosibirsk Oblast","city":"Novosibirsk","isp":"PJSC Rostelecom","organization":"OJSC Sibirtelecom","lat":"55.0411","long":"82.9344"}	active
104	24.35.1.5	36624	Elite	962ms	{"ip":"24.35.1.5","country":"United States","region":"Maryland","city":"Glen Burnie","isp":"WideOpenWest Finance LLC","organization":"Broadstripe","lat":"39.1702","long":"-76.5798"}	active
123	100.39.36.100	35531	Elite	43ms	{"ip":"100.39.36.100","country":"United States","region":"California","city":"Huntington Beach","isp":"Frontier Communications of America, Inc.","organization":"MCI Communications Services, Inc. d/b/a Verizon Business","lat":"33.7180","long":"-118.0500"}	active
129	49.207.32.106	8080	Transparent	49ms	{"ip":"49.207.32.106","country":"India","region":"INDIA","city":"Kachiguda","isp":"Atria Convergence Technologies Pvt. Ltd. Broadband Internet Service Provider INDIA","organization":"Beam Telecom Pvt Ltd","lat":"17.3896","long":"78.4962"}	active
142	103.46.243.222	8080	Elite	229ms	{"ip":"103.46.243.222","country":"India","region":"Madhya Pradesh","city":"Raipur","isp":"Sun Broadband And Data Services Pvt Ltd","organization":"Sun Broadband And Data Services Pvt Ltd","lat":"22.7500","long":"77.7833"}	active
152	195.60.71.85	8080	Transparent	106ms	{"ip":"195.60.71.85","country":"Ukraine","region":"Poltavs'ka Oblast'","city":"Poltava","isp":"VAK Ltd.","organization":"VAK Ltd.","lat":"49.5937","long":"34.5407"}	active
161	178.151.34.43	8080	Elite	577ms	{"ip":"178.151.34.43","country":"Ukraine","region":"Kharkivs'ka Oblast'","city":"Kharkiv","isp":"CONTENT DELIVERY NETWORK LTD","organization":"CONTENT DELIVERY NETWORK LTD","lat":"49.9808","long":"36.2527"}	active
169	92.242.117.166	8888	Transparent	81ms	{"ip":"92.242.117.166","country":"Ukraine","region":"Donets'ka Oblast'","city":"Selidovo","isp":"LLC FTICOM","organization":"LLC FTICOM","lat":"48.1471","long":"37.3003"}	active
204	103.218.26.77	8080	Transparent	110ms	{"ip":"103.239.254.222","country":"Bangladesh","region":"Dhaka","city":"Dhaka","isp":"Systems Solutions & development Technologies Limited","organization":"Carnival Internet","lat":"23.7916","long":"90.4152"}	active
207	103.209.83.155	8080	Elite	854ms	{"ip":"103.209.83.155","country":"Bangladesh","region":"Not Available","city":"Not Available","isp":"Maxnet Online Limited","organization":"Abdul Mannan T/A Maxnet Online Limited","lat":"23.7000","long":"90.3750"}	active
211	115.127.31.194	8080	Transparent	671ms	{"ip":"115.127.31.194","country":"Bangladesh","region":"Not Available","city":"Not Available","isp":"BRAC BDMail Network Ltd.","organization":"BRACNet Limited","lat":"23.7000","long":"90.3750"}	active
842	87.229.89.144	44875	Elite	484ms	{"ip":"87.229.89.144","country":"Hungary","region":"Zala","city":"Nagyrecse","isp":"ZNET Telekom Zrt.","organization":"ZNET Telekom Zrt.","lat":"46.4833","long":"17.0500"}	active
846	185.145.144.177	41148	Elite	639ms	\N	active
116	75.117.151.165	53068	Elite	196ms	{"ip":"75.117.151.164","country":"United States","region":"Georgia","city":"Douglas","isp":"Windstream Communications LLC","organization":"Windstream Communications LLC","lat":"31.4973","long":"-82.8465"}	active
140	103.194.89.161	8080	Elite	100ms	{"ip":"103.206.130.11","country":"India","region":"Uttar Pradesh","city":"Greater Noida","isp":"Elyzium Technologies Pvt. Ltd.","organization":"Elyzium Securitech Pvt. Ltd.","lat":"28.4962","long":"77.5360"}	active
130	117.211.166.214	3128	Transparent	80ms	{"ip":"117.211.166.214","country":"India","region":"Kerala","city":"Alappuzha","isp":"National Internet Backbone","organization":"O/o DGM BB, NOC BSNL Bangalore","lat":"9.4942","long":"76.3275"}	active
137	43.239.79.20	3128	Transparent	131ms	{"ip":"43.239.79.20","country":"India","region":"Gujarat","city":"Bhatha","isp":"CYBER CLOUD SHIELD BROADBAND SERVICES PRIVATE LIMITED","organization":"CYBER CLOUD SHIELD BROADBAND SERVICES PRIVATE LIMITED","lat":"21.1833","long":"72.7667"}	active
146	103.75.32.113	8080	Elite	194ms	{"ip":"103.75.32.72","country":"India","region":"Uttar Pradesh","city":"Noida","isp":"Elyzium Technologies Pvt. Ltd.","organization":"Elyzium Softech","lat":"28.5700","long":"77.3200"}	active
159	37.57.163.30	8080	Transparent	102ms	{"ip":"37.57.163.30","country":"Ukraine","region":"Dnipropetrovsk","city":"Dnipro","isp":"CONTENT DELIVERY NETWORK LTD","organization":"CONTENT DELIVERY NETWORK LTD","lat":"48.4593","long":"35.0386"}	active
153	193.19.242.213	8080	Transparent	82ms	{"ip":"193.19.242.213","country":"Ukraine","region":"Dnipropetrovs'ka Oblast'","city":"Vilnohirsk","isp":"Private Enterprise Enterra","organization":"Private Enterprise Enterra","lat":"48.4855","long":"34.0230"}	active
168	176.36.94.183	8080	Transparent	281ms	{"ip":"176.36.94.183","country":"Ukraine","region":"Not Available","city":"Not Available","isp":"Lanet Network Ltd","organization":"Lanet Network Ltd","lat":"50.4500","long":"30.5233"}	active
162	109.254.91.44	80	Anonymous	510ms	{"ip":"109.254.91.44","country":"Ukraine","region":"Donets'ka Oblast'","city":"Donetsk","isp":"Donbass Electronic Communications Ltd.","organization":"Matrix broadband customers Voroshilovskiy area","lat":"47.9917","long":"37.7759"}	active
166	91.218.47.128	8080	Elite	79ms	{"ip":"91.218.47.128","country":"Ukraine","region":"Chernivets'ka Oblast'","city":"Chernovtsi","isp":"PP Neiron Systems","organization":"Ltd. DSS Group","lat":"48.2915","long":"25.9403"}	active
196	47.104.159.60	8080	Anonymous	567ms	{"ip":"47.104.159.60","country":"China","region":"Not Available","city":"Not Available","isp":"Hangzhou Alibaba Advertising Co.,Ltd.","organization":"Aliyun Computing Co., LTD","lat":"34.7725","long":"113.7270"}	active
209	103.36.100.234	80	Transparent	79ms	{"ip":"103.36.100.234","country":"Bangladesh","region":"Dhaka","city":"Tongi","isp":"MetroNet Bangladesh Limited, Fiber Optic Based Metropolitan Data","organization":"MetroNet","lat":"23.8915","long":"90.4023"}	active
210	103.218.27.204	8080	Transparent	150ms	{"ip":"103.239.255.233","country":"Bangladesh","region":"Dhaka","city":"Dhaka","isp":"Systems Solutions & development Technologies Limited","organization":"Carnival Internet","lat":"23.7916","long":"90.4152"}	active
156	188.115.185.129	8080	Transparent	256ms	{"ip":"188.115.185.129","country":"Ukraine","region":"Odessa","city":"Odesa","isp":"TeNeT Scientific Production Enterprise LLC","organization":"TeNeT Networking Centre","lat":"46.4775","long":"30.7326"}	active
206	103.218.26.195	8080	Transparent	202ms	{"ip":"103.239.254.161","country":"Bangladesh","region":"Dhaka","city":"Dhaka","isp":"Systems Solutions & development Technologies Limited","organization":"Carnival Internet","lat":"23.7916","long":"90.4152"}	active
233	147.75.125.27	8181	Transparent	71ms	{"ip":"147.75.125.28","country":"Colombia","region":"Not Available","city":"Not Available","isp":"TV AZTECA SUCURSAL COLOMBIA","organization":"Azteca Comunicaciones Colombia SAS","lat":"4.5981","long":"-74.0758"}	active
214	103.239.255.21	8080	Transparent	563ms	{"ip":"103.239.255.214","country":"Bangladesh","region":"Dhaka","city":"Dhaka","isp":"Systems Solutions & development Technologies Limited","organization":"Carnival Internet","lat":"23.7916","long":"90.4152"}	active
218	45.125.220.31	8080	Transparent	87ms	{"ip":"45.125.220.242","country":"Bangladesh","region":"Dhaka","city":"Dhaka","isp":"Systems Solutions & development Technologies Limited","organization":"Carnival Internet","lat":"23.7916","long":"90.4152"}	active
221	203.202.248.35	8080	Transparent	450ms	{"ip":"203.202.248.35","country":"Bangladesh","region":"Dhaka","city":"Dhaka","isp":"aamra networks limited,","organization":"Assigned for CTG based Wireless network backbone","lat":"23.7931","long":"90.4048"}	active
228	190.147.208.143	8080	Transparent	184ms	{"ip":"186.86.177.49","country":"Colombia","region":"Departamento de Santander","city":"Bucaramanga","isp":"Telmex Colombia S.A.","organization":"Telmex Colombia S.A.","lat":"7.1254","long":"-73.1198"}	active
234	186.179.97.158	8080	Transparent	90ms	{"ip":"186.179.97.158","country":"Colombia","region":"Not Available","city":"Not Available","isp":"TV AZTECA SUCURSAL COLOMBIA","organization":"TV AZTECA SUCURSAL COLOMBIA","lat":"4.5981","long":"-74.0758"}	active
229	190.14.229.196	8080	Elite	150ms	{"ip":"190.14.229.196","country":"Colombia","region":"La Guajira","city":"Ríohacha","isp":"Media Commerce Partners S.A","organization":"Universidad de La Guajira","lat":"11.5444","long":"-72.9072"}	active
242	181.143.71.234	8080	Transparent	80ms	{"ip":"181.143.71.234","country":"Colombia","region":"Antioquia","city":"Medellín","isp":"EPM Telecomunicaciones S.A. E.S.P.","organization":"EPM Telecomunicaciones S.A. E.S.P.","lat":"6.2518","long":"-75.5636"}	active
235	190.156.228.138	8080	Elite	80ms	{"ip":"190.156.228.138","country":"Colombia","region":"Departamento del Valle del Cauca","city":"Santiago de Cali","isp":"Telmex Colombia S.A.","organization":"Telmex Colombia S.A.","lat":"3.4372","long":"-76.5225"}	active
238	190.60.69.114	8080	Transparent	204ms	{"ip":"190.60.69.114","country":"Colombia","region":"Cundinamarca","city":"Bogotá","isp":"IFX Corporation","organization":"IFX NETWORKS COLOMBIA","lat":"4.6492","long":"-74.0628"}	active
905	88.99.110.138	3128	Transparent	56ms	{"ip":"88.99.110.138","country":"Germany","region":"Bayern","city":"Gunzenhausen","isp":"Hetzner Online GmbH","organization":"Hetzner Online GmbH","lat":"49.1280","long":"10.7704"}	active
952	185.62.174.162	54700	Elite	117ms	\N	active
29	14.207.112.71	8080	Transparent	73ms	{"ip":"14.207.112.71","country":"Thailand","region":"Changwat Samut Songkhram","city":"Samut Songkhram","isp":"Triple T Internet/Triple T Broadband","organization":"Triple T Internet/Triple T Broadband","lat":"13.4667","long":"99.9333"}	active
219	203.202.249.58	80	Transparent	247ms	{"ip":"203.202.249.58","country":"Bangladesh","region":"Dhaka","city":"Dhaka","isp":"aamra networks limited,","organization":"aamra networks limited,","lat":"23.7931","long":"90.4048"}	active
249	190.60.69.170	8080	Transparent	567ms	{"ip":"190.60.69.170","country":"Colombia","region":"Cundinamarca","city":"Bogotá","isp":"IFX Corporation","organization":"IFX NETWORKS COLOMBIA","lat":"4.6492","long":"-74.0628"}	active
253	80.94.30.227	8080	Elite	137ms	{"ip":"80.94.30.227","country":"Poland","region":"West Pomerania","city":"Szczecin","isp":"Zachodniopomorski Uniwersytet Technologiczny w Szczecinie, Akademickie Centrum Informatyki","organization":"Xtra Maciej Matecki","lat":"53.4518","long":"14.4743"}	active
256	145.239.81.238	80	Anonymous	302ms	{"ip":"145.239.81.238","country":"Poland","region":"Dolnoslaskie","city":"Wroclaw","isp":"OVH SAS","organization":"OVH Sp. z o. o.","lat":"51.1000","long":"17.0333"}	active
264	91.207.184.63	8080	Elite	239ms	{"ip":"91.207.184.63","country":"Poland","region":"Mazowieckie","city":"Wyszków","isp":"IT4 Polska Sp. z o.o.","organization":"IT 4 Polska","lat":"52.6000","long":"21.4667"}	active
259	145.239.93.131	80	Anonymous	310ms	{"ip":"145.239.93.131","country":"Poland","region":"Dolnoslaskie","city":"Wroclaw","isp":"OVH SAS","organization":"OVH Sp. z o. o.","lat":"51.1000","long":"17.0333"}	active
292	46.225.128.250	8080	Transparent	189ms	\N	active
268	88.199.21.75	80	Transparent	91ms	{"ip":"88.199.21.75","country":"Poland","region":"Dolnoslaskie","city":"Wroclaw","isp":"TK Telekom sp. z o.o.","organization":"Polmer sp. z o.o.","lat":"51.1000","long":"17.0333"}	active
266	77.237.15.225	8080	Elite	85ms	{"ip":"77.237.15.225","country":"Poland","region":"Łódź Voivodeship","city":"Łódź","isp":"Toya sp.z.o.o","organization":"Toya Sp. z o.o.","lat":"51.7719","long":"19.3471"}	active
271	185.93.240.132	8080	Transparent	681ms	{"ip":"5.226.125.10","country":"Poland","region":"Mazowieckie","city":"Warsaw","isp":"Netia SA","organization":"PATROL GROUP Spolka z ograniczona odpowiedzialnoscia S.K.A","lat":"52.2500","long":"21.0000"}	active
275	80.87.32.30	8080	Transparent	83ms	{"ip":"80.87.32.30","country":"Poland","region":"Greater Poland","city":"Ostrów Wielkopolski","isp":"INEA S.A.","organization":"INEA Network","lat":"51.6468","long":"17.8108"}	active
320	49.156.44.150	61684	Elite	151ms	{"ip":"49.156.44.150","country":"Cambodia","region":"Phnom Penh","city":"Phnom Penh","isp":"WiCAM Corporation, LTD","organization":"WiCAM Corporation, LTD","lat":"11.5625","long":"104.9160"}	active
303	103.6.10.252	8080	Transparent	439ms	{"ip":"103.6.10.252","country":"Cambodia","region":"Kratie","city":"Kratie","isp":"Telecom Cambodia","organization":"Telecom Cambodia (T.C.)","lat":"12.4881","long":"106.0190"}	active
302	103.197.106.15	8080	Elite	111ms	{"ip":"103.197.106.15","country":"Cambodia","region":"Phnum Penh","city":"Phnom Penh","isp":"KINGTEL COMMUNICATIONS LIMITED","organization":"KINGTEL COMMUNICATIONS LIMITED","lat":"11.5625","long":"104.9160"}	active
321	202.178.123.92	33594	Elite	388ms	{"ip":"202.178.123.92","country":"Australia","region":"Western Australia","city":"Exmouth","isp":"MekongNet Technical","organization":"MekongNet Hong Kong Reach and Availability","lat":"-21.9402","long":"114.1250"}	active
306	36.37.134.18	80	Transparent	187ms	{"ip":"36.37.134.18","country":"Cambodia","region":"Phnom Penh","city":"Phnom Penh","isp":"ISP/IXP IN CAMBODIA WITH THE BEST VERVICE IN THERE.","organization":"VIETTEL (CAMBODIA) PTE, LTD","lat":"11.5625","long":"104.9160"}	active
308	36.37.134.18	8080	Transparent	574ms	{"ip":"36.37.134.18","country":"Cambodia","region":"Phnom Penh","city":"Phnom Penh","isp":"ISP/IXP IN CAMBODIA WITH THE BEST VERVICE IN THERE.","organization":"VIETTEL (CAMBODIA) PTE, LTD","lat":"11.5625","long":"104.9160"}	active
312	116.212.152.248	8080	Transparent	49ms	{"ip":"116.212.152.248","country":"Australia","region":"Western Australia","city":"Exmouth","isp":"MekongNet Technical","organization":"MekongNet Hong Kong Reach and Availability","lat":"-21.9402","long":"114.1250"}	active
314	103.197.106.110	8080	Elite	216ms	{"ip":"103.197.106.110","country":"Cambodia","region":"Phnum Penh","city":"Phnom Penh","isp":"KINGTEL COMMUNICATIONS LIMITED","organization":"KINGTEL COMMUNICATIONS LIMITED","lat":"11.5625","long":"104.9160"}	active
317	36.37.185.253	44594	Elite	39ms	{"ip":"36.37.185.253","country":"Cambodia","region":"Kampot","city":"Kampot","isp":"ISP/IXP IN CAMBODIA WITH THE BEST VERVICE IN THERE.","organization":"VIETTEL (CAMBODIA) PTE., LTD.","lat":"10.6104","long":"104.1810"}	active
318	36.37.219.198	53281	Elite	181ms	{"ip":"36.37.219.198","country":"Cambodia","region":"Phnum Penh","city":"Not Available","isp":"ISP/IXP IN CAMBODIA WITH THE BEST VERVICE IN THERE.","organization":"VIETTEL (CAMBODIA) PTE., LTD.","lat":"11.5500","long":"104.9170"}	active
324	114.134.186.59	59268	Elite	69ms	{"ip":"114.134.186.59","country":"Cambodia","region":"Phnom Penh","city":"Phnom Penh","isp":"CAMBODIAN SINGMENG TELEMEDIA CO., LTD","organization":"Digi more than internet, Largest content distribution","lat":"11.5625","long":"104.9160"}	active
322	175.100.16.20	37725	Elite	192ms	{"ip":"175.100.16.20","country":"Cambodia","region":"Phnom Penh","city":"Phnom Penh","isp":"ISP/IXP IN CAMBODIA WITH THE BEST VERVICE IN THERE.","organization":"VIETTEL (CAMBODIA) PTE., LTD.","lat":"11.5625","long":"104.9160"}	active
261	185.78.149.213	8080	Transparent	694ms	{"ip":"185.78.149.213","country":"Poland","region":"Pomerania","city":"Czluchow","isp":"Westkomp Sp. z o.o.","organization":"Westkomp Sp. z o.o.","lat":"53.6690","long":"17.3639"}	active
257	93.159.188.250	8888	Elite	981ms	{"ip":"93.159.188.250","country":"Poland","region":"Malopolskie","city":"Jurgów","isp":"Krzysztof Trzop trading as KTM Telekom","organization":"KTM TELEKOM Krzysztof Trzop","lat":"49.3333","long":"20.1500"}	active
1802	41.190.92.99	54408	Elite	96ms	\N	active
974	178.132.220.241	8080	Transparent	152ms	{"ip":"178.132.220.241","country":"Albania","region":"Not Available","city":"Not Available","isp":"Kujtesa Net Sh.p.k.","organization":"Kujtesa Net Sh.p.k.","lat":"41.0000","long":"20.0000"}	active
333	41.193.238.234	8080	Elite	464ms	{"ip":"41.193.238.234","country":"South Africa","region":"Gauteng","city":"Johannesburg","isp":"Vox Telecom Ltd","organization":"Vox Telecom Ltd","lat":"-26.2308","long":"28.0585"}	active
336	197.148.64.194	8080	Transparent	107ms	{"ip":"197.148.64.194","country":"South Africa","region":"Gauteng","city":"Modderfontein","isp":"Network Platforms (PTY) LTD","organization":"Network Platforms (PTY) LTD","lat":"-26.0910","long":"28.1669"}	active
337	41.169.157.170	8080	Elite	326ms	{"ip":"41.169.157.170","country":"South Africa","region":"Gauteng","city":"Johannesburg","isp":"Liquid Telecommunications South Africa (Pty) Ltd","organization":"Liquid Telecommunications Ltd","lat":"-26.2308","long":"28.0585"}	active
347	41.160.96.250	8080	Elite	272ms	{"ip":"41.160.96.250","country":"South Africa","region":"Gauteng","city":"Johannesburg","isp":"Liquid Telecommunications South Africa (Pty) Ltd","organization":"Liquid Telecommunications South Africa (Pty) Ltd","lat":"-26.2309","long":"28.0583"}	active
349	41.169.146.2	8080	Elite	782ms	{"ip":"41.169.146.2","country":"South Africa","region":"Gauteng","city":"Katlehong","isp":"Liquid Telecommunications South Africa (Pty) Ltd","organization":"Liquid Telecommunications Ltd","lat":"-26.3333","long":"28.1500"}	active
351	85.217.137.77	3128	Transparent	183ms	{"ip":"85.217.137.77","country":"Spain","region":"Not Available","city":"Not Available","isp":"Mdc Datacenter S.L.","organization":"Avatel & Wikiker Telecom, S.L.","lat":"40.4172","long":"-3.6840"}	active
356	80.72.66.212	8081	Transparent	172ms	{"ip":"80.72.66.212","country":"Bulgaria","region":"Grad Sofiya","city":"Boyana","isp":"Cores Networks Ltd.","organization":"CoresNET Ltd.","lat":"42.6500","long":"23.2667"}	active
357	185.108.141.114	8080	Elite	380ms	{"ip":"185.108.141.49","country":"Bulgaria","region":"Not Available","city":"Not Available","isp":"NETX - NG LTD","organization":"NETX - NG LTD","lat":"42.7000","long":"23.3333"}	active
360	77.85.169.44	8080	Elite	70ms	{"ip":"77.85.169.44","country":"Bulgaria","region":"Sofiya","city":"Svoge","isp":"Bulgarian Telecommunications Company Plc.","organization":"BTC Broadband Service","lat":"42.9333","long":"23.3833"}	active
373	79.110.125.201	8080	Elite	99ms	{"ip":"79.110.125.201","country":"Bulgaria","region":"Varna","city":"Yablanovo","isp":"Rutil Ltd.","organization":"Rutil Ltd.","lat":"42.9833","long":"26.5500"}	active
403	190.185.178.242	8080	Transparent	655ms	{"ip":"190.185.178.239","country":"Argentina","region":"La Pampa","city":"Eduardo Castex","isp":"Red Intercable Digital S.A.","organization":"Red Intercable Digital S.A.","lat":"-35.9150","long":"-64.2945"}	active
389	185.177.74.179	3128	Transparent	261ms	{"ip":"185.177.73.222","country":"Spain","region":"Comunidad Valenciana","city":"La Cañada","isp":"Solucions Valencianes i Noves Tecnologies SL","organization":"SOLUCIONS VALENCIANES I NOVES TECNOLOGIES SL","lat":"39.5333","long":"-0.4833"}	active
374	78.90.204.39	80	Transparent	86ms	{"ip":"78.90.204.39","country":"Bulgaria","region":"Sofia-Capital","city":"Sofia","isp":"A1 Bulgaria EAD","organization":"A1 Bulgaria EAD","lat":"42.6833","long":"23.3167"}	active
378	178.60.28.98	9999	Anonymous	365ms	{"ip":"178.60.28.98","country":"Spain","region":"Galicia","city":"A Coruña","isp":"R Cable y Telecomunicaciones Galicia, S.A.","organization":"A Coruna","lat":"43.3666","long":"-8.4068"}	active
382	195.53.86.82	3128	Transparent	553ms	{"ip":"195.53.86.82","country":"Spain","region":"Galicia","city":"Orense","isp":"TELEFONICA DE ESPANA","organization":"CASA DE LINCORA S.A.","lat":"42.3313","long":"-7.8627"}	active
388	80.32.132.176	3128	Transparent	308ms	{"ip":"95.60.255.37","country":"Spain","region":"Galicia","city":"Vigo","isp":"VODAFONE ESPANA S.A.U.","organization":"VODAFONE ESPANA S.A.U.","lat":"42.2328","long":"-8.7226"}	active
393	195.235.202.130	3128	Transparent	406ms	{"ip":"195.235.202.130","country":"Spain","region":"Andalucia","city":"Sevilla","isp":"TELEFONICA DE ESPANA","organization":"MELIA HOTELS INTERNATIONAL S.A.","lat":"37.3824","long":"-5.9761"}	active
397	213.98.84.56	37652	Elite	83ms	{"ip":"213.98.84.56","country":"Spain","region":"Catalonia","city":"Barcelona","isp":"TELEFONICA DE ESPANA","organization":"Telefonica de Espana SAU (NCC # 2001015139)","lat":"41.3984","long":"2.1741"}	active
398	185.152.12.42	33364	Elite	839ms	{"ip":"185.152.12.42","country":"Spain","region":"Andalucia","city":"Olivares","isp":"Green Way Telecomunicaciones S.L.","organization":"Green Way Telecomunicaciones S.L.","lat":"37.4180","long":"-6.1560"}	active
399	185.37.213.76	30695	Elite	325ms	{"ip":"185.37.213.76","country":"Spain","region":"Catalonia","city":"Barcelona","isp":"APFUTURA INTERNACIONAL SOLUCIONES SL","organization":"APFUTURA INTERNACIONAL SOLUCIONES SL","lat":"41.3888","long":"2.1590"}	active
364	95.87.255.120	8080	Transparent	49ms	{"ip":"95.87.255.120","country":"Bulgaria","region":"Grad Sofiya","city":"Gorublene","isp":"NET1 Ltd.","organization":"NET1 Ltd.","lat":"42.6333","long":"23.4000"}	active
404	190.122.14.14	4444	Transparent	78ms	{"ip":"190.122.14.14","country":"Argentina","region":"Buenos Aires","city":"Marcos Paz","isp":"RSONet","organization":"RSONet Las Heras","lat":"-34.7806","long":"-58.8374"}	active
405	181.29.206.71	8080	Transparent	87ms	{"ip":"181.29.206.71","country":"Argentina","region":"Buenos Aires F.D.","city":"Not Available","isp":"Telecom Argentina S.A.","organization":"Telecom Argentina S.A.","lat":"-34.5875","long":"-58.6725"}	active
408	190.14.158.102	8080	Elite	451ms	{"ip":"190.14.158.102","country":"Argentina","region":"Santa Fe","city":"Granadero Baigorria","isp":"TELCOCOM","organization":"TELCOCOM","lat":"-32.8667","long":"-60.7000"}	active
411	200.50.240.4	4444	Transparent	68ms	{"ip":"200.50.240.4","country":"Argentina","region":"Buenos Aires","city":"Marcos Paz","isp":"RSONet","organization":"RSONet","lat":"-34.7806","long":"-58.8374"}	active
362	95.158.137.221	8080	Transparent	191ms	{"ip":"79.124.2.2","country":"Bulgaria","region":"Grad Sofiya","city":"Sofia","isp":"Aspilink Ltd.","organization":"Aspilink Ltd.","lat":"42.6833","long":"23.3167"}	active
429	79.110.39.165	8080	Elite	71ms	{"ip":"79.110.37.6","country":"Czech Republic","region":"Jihocesky kraj","city":"Strakonice","isp":"OtavaNet s.r.o.","organization":"OtavaNet s.r.o.","lat":"49.2667","long":"13.9000"}	active
1038	203.173.10.117	34748	Elite	88ms	{"ip":"203.173.10.117","country":"Australia","region":"Australian Capital Territory","city":"Canberra","isp":"Internode Pty Ltd","organization":"iiNet Limited","lat":"-35.2760","long":"149.1340"}	active
1040	45.126.46.140	37960	Elite	92ms	{"ip":"45.126.46.140","country":"Australia","region":"Victoria","city":"Rowville","isp":"B2B Wholesale Pty Ltd","organization":"B2B Wholesale Pty Ltd","lat":"-37.9333","long":"145.2330"}	active
419	200.69.136.198	3128	Transparent	96ms	{"ip":"200.69.136.198","country":"Argentina","region":"Distrito Federal","city":"San Telmo","isp":"AMX Argentina S.A.","organization":"Sistemas De Procesamiento De Datos Para Sociedades","lat":"-34.6167","long":"-58.3667"}	active
422	201.231.42.67	8080	Transparent	97ms	{"ip":"201.231.42.67","country":"Argentina","region":"Neuquen","city":"Neuquén","isp":"Telecom Argentina S.A.","organization":"Telecom Argentina S.A.","lat":"-38.9500","long":"-68.0667"}	active
424	200.81.160.251	8080	Transparent	85ms	{"ip":"200.81.160.250","country":"Argentina","region":"Not Available","city":"Not Available","isp":"SION S.A","organization":"SION S.A","lat":"-34.6033","long":"-58.3817"}	active
425	200.114.80.220	8080	Transparent	284ms	{"ip":"200.114.80.226","country":"Argentina","region":"Buenos Aires","city":"Florencio Varela","isp":"CITARELLA S.A.","organization":"CITARELLA S.A.","lat":"-34.8272","long":"-58.3956"}	active
427	213.155.250.46	3128	Anonymous	183ms	{"ip":"213.155.250.46","country":"Czech Republic","region":"Moravskoslezsky kraj","city":"Opava","isp":"SMART Comp. a.s.","organization":"OpavaNet a.s.","lat":"49.9500","long":"17.8667"}	active
441	89.31.45.115	8080	Elite	87ms	{"ip":"89.31.45.115","country":"Czech Republic","region":"Central Bohemia","city":"Kladno","isp":"STARNET, s.r.o.","organization":"STARNET, s.r.o.","lat":"50.1500","long":"14.1000"}	active
430	88.146.227.253	8080	Elite	436ms	{"ip":"88.146.227.253","country":"Czech Republic","region":"Plzensky kraj","city":"Blovice","isp":"Liberty Global Operations B.V.","organization":"PLnet s.r.o., Prostejov","lat":"49.5833","long":"13.5500"}	active
435	85.207.92.34	8080	Transparent	239ms	{"ip":"85.207.93.64","country":"Czech Republic","region":"Moravskoslezsky kraj","city":"Koprivnice","isp":"RADIOKOMUNIKACE a.s.","organization":"WIFCOM a.s.","lat":"49.6000","long":"18.1500"}	active
438	188.175.231.1	8080	Transparent	243ms	{"ip":"188.175.70.98","country":"Czech Republic","region":"Olomoucky kraj","city":"Olomouc","isp":"RIO Media a.s.","organization":"RIOMEDIA","lat":"49.5917","long":"17.2500"}	active
447	85.207.251.5	57386	Elite	53ms	{"ip":"85.207.251.5","country":"Czech Republic","region":"Moravskoslezsky kraj","city":"Opava","isp":"RADIOKOMUNIKACE a.s.","organization":"Opava","lat":"49.8833","long":"17.9833"}	active
444	79.98.77.242	8080	Elite	1000ms	{"ip":"79.98.77.96","country":"Czech Republic","region":"Central Bohemia","city":"Revnice","isp":"Sys-DataCom s.r.o.","organization":"network DATA-CONNECT","lat":"49.9167","long":"14.2500"}	active
449	31.30.70.74	35280	Elite	87ms	{"ip":"31.30.70.74","country":"Czech Republic","region":"Pardubicky kraj","city":"Bitovany","isp":"Vodafone Czech Republic a.s.","organization":"Vodafone Czech Republic a.s.","lat":"49.9000","long":"15.8500"}	active
448	77.240.100.230	51266	Elite	32ms	{"ip":"77.240.100.230","country":"Czech Republic","region":"Central Bohemia","city":"Kraluv Dvur","isp":"Druzstvo EUROSIGNAL","organization":"Druzstvo Eurosignal - Ohrada","lat":"49.9333","long":"14.0500"}	active
451	186.46.92.83	8080	Transparent	232ms	{"ip":"186.46.92.83","country":"Ecuador","region":"Morona-Santiago","city":"General Plaza","isp":"CORPORACION NACIONAL DE TELECOMUNICACIONES - CNT EP","organization":"CORPORACION NACIONAL DE TELECOMUNICACIONES - CNT EP","lat":"-2.9667","long":"-78.4167"}	active
458	181.196.137.2	8080	Transparent	82ms	{"ip":"181.196.137.2","country":"Ecuador","region":"Provincia del Guayas","city":"Guayaquil","isp":"CORPORACION NACIONAL DE TELECOMUNICACIONES - CNT EP","organization":"CORPORACION NACIONAL DE TELECOMUNICACIONES - CNT EP","lat":"-2.1667","long":"-79.9000"}	active
459	186.4.227.121	999	Transparent	74ms	{"ip":"186.4.227.121","country":"Ecuador","region":"Guayas","city":"Guayaquil","isp":"Telconet S.A","organization":"Clientes NETLIFE Quito - gepon","lat":"-2.1667","long":"-79.9000"}	active
460	138.122.108.52	8080	Transparent	753ms	{"ip":"138.122.108.50","country":"Ecuador","region":"Provincia del Guayas","city":"Milagro","isp":"IN.PLANET S. A","organization":"DATACENTER MILAGRO","lat":"-2.0667","long":"-79.5333"}	active
42	183.88.238.243	8080	Transparent	365ms	{"ip":"183.88.238.243","country":"Thailand","region":"Changwat Phra Nakhon Si Ayutthaya","city":"Not Available","isp":"Triple T Internet/Triple T Broadband","organization":"3BB Broadband Internet service Thailand","lat":"14.1833","long":"100.2830"}	active
465	190.12.12.30	39501	Elite	74ms	{"ip":"190.12.12.30","country":"Ecuador","region":"Not Available","city":"Not Available","isp":"PUNTONET S.A.","organization":"PUNTONET S.A.","lat":"-2.0000","long":"-77.5000"}	active
462	181.211.191.227	8080	Transparent	59ms	{"ip":"181.211.191.227","country":"Ecuador","region":"Provincia del Guayas","city":"Guayaquil","isp":"CORPORACION NACIONAL DE TELECOMUNICACIONES - CNT EP","organization":"CORPORACION NACIONAL DE TELECOMUNICACIONES - CNT EP","lat":"-2.1667","long":"-79.9000"}	active
464	138.122.108.198	8080	Transparent	327ms	{"ip":"138.122.108.50","country":"Ecuador","region":"Provincia del Guayas","city":"Milagro","isp":"IN.PLANET S. A","organization":"DATACENTER MILAGRO","lat":"-2.0667","long":"-79.5333"}	active
474	181.113.27.99	80	Elite	82ms	{"ip":"181.113.27.98","country":"Ecuador","region":"Not Available","city":"Not Available","isp":"CORPORACION NACIONAL DE TELECOMUNICACIONES - CNT EP","organization":"CORPORACION NACIONAL DE TELECOMUNICACIONES - CNT EP","lat":"-2.0000","long":"-77.5000"}	active
478	185.203.170.95	8080	Transparent	118ms	{"ip":"212.175.0.193","country":"Turkey","region":"Usak","city":"Usak","isp":"Turk Telekomunikasyon Anonim Sirketi","organization":"Turk Telekomunikasyon Anonim Sirketi","lat":"38.6735","long":"29.4058"}	active
417	190.211.80.77	8080	Transparent	92ms	{"ip":"190.211.80.77","country":"Argentina","region":"Mendoza","city":"Maipu","isp":"Patagonia Green S.A.","organization":"Patagonia Green S.A.","lat":"-32.9667","long":"-68.7500"}	active
2093	5.32.138.254	41316	Elite	215ms	\N	active
1098	213.32.252.237	32825	Elite	91ms	{"ip":"213.32.252.237","country":"Iraq","region":"Arbil","city":"Erbil","isp":"Kurdistan Net Company for Computer and Internet Ltd.","organization":"EXABYT for Communication & General Trading /Ltd","lat":"36.1900","long":"44.0089"}	active
1152	37.233.9.131	8080	Elite	88ms	\N	active
483	88.255.101.247	8080	Transparent	102ms	{"ip":"88.255.101.247","country":"Turkey","region":"Hatay","city":"Hatay","isp":"Turk Telekomunikasyon Anonim Sirketi","organization":"Turk Telekomunikasyon Anonim Sirketi","lat":"36.2066","long":"36.1572"}	active
488	78.189.230.165	32299	Elite	100ms	{"ip":"78.189.230.165","country":"Turkey","region":"Izmir","city":"Izmir","isp":"Turk Telekomunikasyon Anonim Sirketi","organization":"TT ADSL-TTnet _static_aci","lat":"38.4067","long":"27.1400"}	active
492	79.123.213.7	8080	Transparent	124ms	\N	active
489	88.255.213.234	8080	Transparent	91ms	{"ip":"88.255.213.234","country":"Turkey","region":"Usak","city":"Usak","isp":"Turk Telekomunikasyon Anonim Sirketi","organization":"Turk Telekomunikasyon Anonim Sirketi","lat":"38.5698","long":"29.4064"}	active
505	142.93.143.125	8080	Elite	582ms	{"ip":"142.93.143.125","country":"Netherlands","region":"Noord-Holland","city":"Amsterdam","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"52.3666","long":"4.9027"}	active
493	213.144.123.146	8080	Transparent	404ms	{"ip":"213.144.123.146","country":"Turkey","region":"Istanbul","city":"Göztepe","isp":"TEKNOTEL TELEKOMUNIKASYON SANAYI VE TICARET A.S.","organization":"TEKNOTEL TELEKOMUNIKASYON SANAYI VE TICARET A.S.","lat":"40.9667","long":"29.1000"}	active
495	95.0.176.198	8080	Transparent	248ms	{"ip":"176.235.240.3","country":"Turkey","region":"Not Available","city":"Not Available","isp":"TELLCOM ILETISIM HIZMETLERI A.S.","organization":"Superonline Iletisim Hizmetleri A.S.","lat":"41.0214","long":"28.9948"}	active
500	88.255.101.245	8080	Transparent	88ms	{"ip":"88.255.101.245","country":"Turkey","region":"Hatay","city":"Hatay","isp":"Turk Telekomunikasyon Anonim Sirketi","organization":"Turk Telekomunikasyon Anonim Sirketi","lat":"36.2066","long":"36.1572"}	active
503	47.251.50.29	3128	Transparent	30ms	{"ip":"47.251.50.29","country":"United States","region":"California","city":"San Mateo","isp":"Alibaba (China) Technology Co., Ltd.","organization":"Alibaba (China) Technology Co., Ltd.","lat":"37.5507","long":"-122.3280"}	active
508	24.201.226.243	8080	Transparent	381ms	{"ip":"24.201.226.243","country":"Canada","region":"Quebec","city":"Québec","isp":"Videotron Telecom Ltee","organization":"Videotron Ltee","lat":"46.8140","long":"-71.2194"}	active
506	159.89.201.18	8080	Transparent	28ms	{"ip":"159.89.201.18","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
517	70.83.106.82	8888	Elite	569ms	{"ip":"70.83.106.82","country":"Canada","region":"Quebec","city":"Montreal","isp":"Videotron Telecom Ltee","organization":"Videotron Ltee","lat":"45.5115","long":"-73.5683"}	active
513	159.89.204.52	8080	Transparent	35ms	{"ip":"159.89.204.52","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
518	68.171.68.0	8080	Transparent	600ms	{"ip":"68.171.65.230","country":"Canada","region":"Quebec","city":"Val-des-Monts","isp":"Reseau Picanoc.net Inc.","organization":"Reseau Picanoc.net Inc.","lat":"45.6501","long":"-75.6660"}	active
521	158.69.206.181	8888	Transparent	37ms	{"ip":"158.69.206.181","country":"Canada","region":"Quebec","city":"Montreal","isp":"OVH SAS","organization":"OVH Hosting, Inc.","lat":"45.5000","long":"-73.5833"}	active
522	142.93.236.49	3128	Elite	196ms	{"ip":"142.93.236.49","country":"Netherlands","region":"Noord-Holland","city":"Amsterdam","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"52.3666","long":"4.9027"}	active
524	64.137.191.20	3128	Elite	34ms	{"ip":"64.137.191.20","country":"Canada","region":"Ontario","city":"Kitchener","isp":"DataCity","organization":"KW Datacenter","lat":"43.4106","long":"-80.5011"}	active
525	142.93.128.104	8080	Transparent	49ms	{"ip":"142.93.128.104","country":"Netherlands","region":"Noord-Holland","city":"Amsterdam","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"52.3666","long":"4.9027"}	active
529	185.61.180.77	8080	Transparent	729ms	{"ip":"185.61.180.77","country":"Italy","region":"Piedmont","city":"Vercelli","isp":"Windsl S.r.l.","organization":"Windsl S.r.l.","lat":"45.3216","long":"8.4199"}	active
530	88.44.106.139	80	Elite	693ms	{"ip":"88.44.106.139","country":"Italy","region":"Lazio","city":"Forcella","isp":"Telecom Italia S.p.a.","organization":"REGIONE ABRUZZO","lat":"41.7500","long":"13.6333"}	active
533	185.68.195.89	8080	Transparent	135ms	{"ip":"185.68.195.89","country":"Italy","region":"Campania","city":"Angri","isp":"Cogent Communications","organization":"Cogent Communications","lat":"40.7333","long":"14.5667"}	active
534	77.239.133.146	3128	Transparent	116ms	{"ip":"77.239.133.146","country":"Italy","region":"Lombardia","city":"Milan","isp":"TWT S.p.A.","organization":"TWT S.p.A.","lat":"45.4643","long":"9.1895"}	active
536	77.239.133.146	80	Transparent	87ms	{"ip":"77.239.133.146","country":"Italy","region":"Lombardia","city":"Milan","isp":"TWT S.p.A.","organization":"TWT S.p.A.","lat":"45.4643","long":"9.1895"}	active
539	93.67.154.125	8080	Transparent	305ms	{"ip":"93.67.154.125","country":"Italy","region":"Campania","city":"Naples","isp":"Vodafone Italia S.p.A.","organization":"Vodafone Italia S.p.A.","lat":"40.8522","long":"14.2681"}	active
543	93.147.181.90	54949	Elite	102ms	{"ip":"93.147.181.90","country":"Italy","region":"Sicily","city":"Trapani","isp":"Vodafone Italia S.p.A.","organization":"Vodafone Italia S.p.A.","lat":"38.0176","long":"12.5362"}	active
552	137.74.254.242	3128	Elite	334ms	{"ip":"137.74.254.242","country":"France","region":"Nord-Pas-de-Calais","city":"Roubaix","isp":"OVH SAS","organization":"OVH SAS","lat":"50.6942","long":"3.1746"}	active
553	213.32.67.76	9999	Elite	27ms	{"ip":"213.32.67.76","country":"France","region":"Nord-Pas-de-Calais","city":"Roubaix","isp":"OVH SAS","organization":"OVH SAS","lat":"50.6942","long":"3.1746"}	active
487	88.255.101.242	8080	Transparent	169ms	{"ip":"88.255.101.242","country":"Turkey","region":"Hatay","city":"Hatay","isp":"Turk Telekomunikasyon Anonim Sirketi","organization":"Turk Telekomunikasyon Anonim Sirketi","lat":"36.2066","long":"36.1572"}	active
1157	217.19.209.253	8080	Transparent	69ms	{"ip":"217.19.209.253","country":"Moldova","region":"Bender Municipality","city":"Tighina","isp":"JSCC Interdnestrcom","organization":"JSCC Interdnestrcom","lat":"46.8306","long":"29.4711"}	active
1183	121.162.160.66	3128	Transparent	41ms	\N	active
1207	213.6.65.30	8080	Transparent	359ms	\N	active
1822	190.171.101.106	40651	Elite	47ms	\N	active
577	202.79.48.51	8080	Transparent	121ms	{"ip":"202.79.48.51","country":"Nepal","region":"Central Region","city":"Kathmandu","isp":"WorldLink Communications Pvt Ltd","organization":"Wlink-Static Pool","lat":"27.7167","long":"85.3167"}	active
581	49.236.212.161	8080	Transparent	58ms	{"ip":"49.236.212.161","country":"Nepal","region":"Central Region","city":"Kathmandu","isp":"Classic Tech Pvt. Ltd.","organization":"ClassicTech Pvt. Ltd.","lat":"27.7167","long":"85.3167"}	active
586	202.63.243.236	8888	Elite	595ms	{"ip":"202.63.243.236","country":"Nepal","region":"Central Region","city":"Kathmandu","isp":"Subisu Cable Net Nepal","organization":"SUBISU_Corporate_Pool24","lat":"27.7167","long":"85.3167"}	active
588	124.41.240.226	8080	Transparent	334ms	{"ip":"124.41.240.226","country":"Nepal","region":"NEPAL","city":"Pokhara","isp":"WorldLink Communications Pvt Ltd","organization":"Lumbini Net","lat":"28.2333","long":"83.9833"}	active
589	103.214.77.34	8080	Transparent	202ms	{"ip":"103.214.77.34","country":"Nepal","region":"NEPAL","city":"Balaju","isp":"Cherry World Communication Pvt Ltd","organization":"Cherry World Communication Pvt Ltd","lat":"27.7333","long":"85.3000"}	active
592	202.52.234.198	80	Elite	180ms	{"ip":"202.52.234.198","country":"Nepal","region":"Bagmati","city":"Putalisadak","isp":"Mercantile Office Systems","organization":"Mercantile Communications Pvt. Ltd","lat":"27.7032","long":"85.3258"}	active
593	124.41.217.210	80	Transparent	244ms	{"ip":"124.41.217.210","country":"Nepal","region":"NEPAL","city":"Baijnathpurwa","isp":"WorldLink Communications Pvt Ltd","organization":"Lumbini Net","lat":"28.1667","long":"81.6667"}	active
596	202.79.59.173	39307	Elite	90ms	{"ip":"202.79.59.173","country":"Nepal","region":"NEPAL","city":"Itahari","isp":"WorldLink Communications Pvt Ltd","organization":"Wlink-Static Pool","lat":"26.6667","long":"87.2833"}	active
597	139.5.71.233	35863	Elite	392ms	{"ip":"139.5.71.233","country":"Nepal","region":"NEPAL","city":"Kathmandu","isp":"WorldLink Communications Pvt Ltd","organization":"Fiber Pool","lat":"27.7167","long":"85.3167"}	active
600	103.58.145.18	49209	Elite	166ms	{"ip":"103.58.145.18","country":"Nepal","region":"NEPAL","city":"Patan","isp":"Arrownet Pvt.Ltd","organization":"Arrownet Pvt.Ltd","lat":"27.6667","long":"85.3333"}	active
608	45.5.94.161	36218	Elite	60ms	{"ip":"45.5.94.99","country":"Mexico","region":"Coahuila de Zaragoza","city":"Saltillo","isp":"Señal Interactiva, S.A De C.V","organization":"Señal Interactiva, S.A De C.V","lat":"25.4167","long":"-101.0000"}	active
601	201.150.255.185	3128	Transparent	49ms	{"ip":"201.150.255.185","country":"Mexico","region":"Not Available","city":"Not Available","isp":"TV Rey de Occidente, S.A. de C.V.","organization":"TV Rey de Occidente, S.A. de C.V.","lat":"19.4371","long":"-99.0111"}	active
602	201.132.155.10	8080	Transparent	63ms	{"ip":"201.132.155.10","country":"Mexico","region":"Sinaloa","city":"Culiacán","isp":"Mega Cable, S.A. de C.V.","organization":"Mega Cable, S.A. de C.V.","lat":"24.8254","long":"-107.5350"}	active
606	201.147.242.186	8080	Anonymous	33ms	{"ip":"189.253.172.185","country":"Mexico","region":"Guanajuato","city":"León","isp":"Uninet S.A. de C.V.","organization":"Uninet S.A. de C.V.","lat":"20.9322","long":"-101.6560"}	active
621	187.188.213.249	8080	Transparent	65ms	{"ip":"187.188.213.249","country":"Mexico","region":"Veracruz","city":"Juchique de Ferrer","isp":"TOTAL PLAY TELECOMUNICACIONES SA DE CV","organization":"TOTAL PLAY TELECOMUNICACIONES SA DE CV","lat":"19.8399","long":"-96.6946"}	active
610	200.79.180.115	8080	Transparent	47ms	{"ip":"200.79.180.115","country":"Mexico","region":"Hidalgo","city":"Pachuca","isp":"Grupo Hidalguense de Desarrollo, S.A. de C.V.","organization":"Grupo Hidalguense de Desarrollo, S.A. de C.V.","lat":"20.4696","long":"-98.8957"}	active
614	187.190.221.71	3129	Transparent	488ms	{"ip":"187.190.221.71","country":"Mexico","region":"Estado de Baja California","city":"Tijuana","isp":"TOTAL PLAY TELECOMUNICACIONES SA DE CV","organization":"TOTAL PLAY TELECOMUNICACIONES SA DE CV","lat":"32.5027","long":"-117.0040"}	active
620	189.204.158.161	8080	Transparent	54ms	{"ip":"189.204.152.145","country":"Mexico","region":"Mexico City","city":"Mexico City","isp":"Operbes, S.A. de C.V.","organization":"Operbes, S.A. de C.V.","lat":"19.4357","long":"-99.1439"}	active
625	201.158.107.109	44906	Elite	50ms	{"ip":"201.158.107.109","country":"Mexico","region":"Estado de Mexico","city":"Coacalco","isp":"COMUNICALO DE MEXICO S.A. DE C.V","organization":"COMUNICALO DE MEXICO S.A. DE C.V","lat":"19.6345","long":"-99.1005"}	active
635	185.147.57.152	80	Transparent	187ms	\N	active
655	185.179.204.217	3128	Elite	621ms	\N	active
639	217.199.96.138	53281	Elite	58ms	{"ip":"217.199.96.138","country":"Latvia","region":"Riga","city":"Riga","isp":"SIA Baltcom","organization":"Interneta Pasaule","lat":"56.9500","long":"24.1000"}	active
641	85.15.216.56	53540	Elite	54ms	{"ip":"85.15.216.56","country":"Latvia","region":"Vecumnieku Novads","city":"Vecumnieki","isp":"Latvenergo","organization":"Latvenergo","lat":"56.6064","long":"24.5222"}	active
646	87.226.37.80	60505	Elite	56ms	{"ip":"87.226.37.80","country":"Latvia","region":"Riga","city":"Riga","isp":"SIA Baltcom","organization":"SIA Baltcom","lat":"56.9500","long":"24.1000"}	active
657	185.179.204.35	3128	Elite	641ms	{"ip":"162.253.153.79","country":"United States","region":"Nevada","city":"Las Vegas","isp":"Reprise Hosting","organization":"Reprise Hosting","lat":"36.1008","long":"-115.1360"}	active
560	51.254.50.239	3128	Transparent	533ms	{"ip":"51.254.50.239","country":"Ghana","region":"Ashanti","city":"Kumasi","isp":"OVH SAS","organization":"OVH SAS","lat":"6.6833","long":"-1.6167"}	active
676	188.255.187.226	8080	Transparent	358ms	{"ip":"188.255.187.226","country":"Serbia","region":"Belgrade","city":"Belgrade","isp":"Orion Telekom Tim d.o.o.Beograd","organization":"Orion Telekom Tim IP Network in Pancevo","lat":"44.8186","long":"20.4681"}	active
1227	1.65.169.12	8080	Elite	55ms	\N	active
1247	202.60.227.65	57887	Elite	69ms	{"ip":"202.60.227.65","country":"Hong Kong SAR China","region":"Not Available","city":"Not Available","isp":"Cyber Express Communication Ltd.","organization":"Superhub Ltd.","lat":"22.2500","long":"114.1670"}	active
678	79.101.33.118	8080	Elite	266ms	{"ip":"79.101.33.118","country":"Serbia","region":"SERBIA","city":"Subotica","isp":"TELEKOM SRBIJA a.d.","organization":"TELEKOM SRBIJA a.d.","lat":"46.1000","long":"19.6667"}	active
684	176.108.47.38	3128	Transparent	37ms	{"ip":"212.200.70.114","country":"Serbia","region":"SERBIA","city":"Backa Palanka","isp":"TELEKOM SRBIJA a.d.","organization":"TELEKOM SRBIJA a.d.","lat":"45.2508","long":"19.3919"}	active
697	185.37.168.42	49652	Elite	249ms	{"ip":"185.37.168.42","country":"Serbia","region":"SERBIA","city":"Pancevo","isp":"Sat-Trakt D.O.O.","organization":"Sabotronic D.O.O. Senta","lat":"44.8708","long":"20.6403"}	active
685	79.101.42.13	8080	Elite	1000ms	{"ip":"79.101.42.13","country":"Serbia","region":"Not Available","city":"Not Available","isp":"TELEKOM SRBIJA a.d.","organization":"TELEKOM SRBIJA a.d.","lat":"44.0000","long":"21.0000"}	active
688	212.200.246.24	80	Elite	286ms	{"ip":"212.200.246.24","country":"Serbia","region":"Belgrade","city":"Belgrade","isp":"Drustvo za telekomunikacije \\"MTEL\\" DOO","organization":"TELEKOM SRBIJA","lat":"44.8186","long":"20.4681"}	active
689	92.244.158.101	8080	Transparent	59ms	{"ip":"92.244.158.101","country":"Serbia","region":"Belgrade","city":"Belgrade","isp":"RADIJUS VEKTOR DOO","organization":"Radijus Vektor doo","lat":"44.8186","long":"20.4681"}	active
693	178.79.24.36	8080	Transparent	134ms	{"ip":"178.79.24.36","country":"Serbia","region":"Podunavlje","city":"Smederevo","isp":"Preduzece za proizvodnju, promet i inzenjering Kopernikus technology D.O.O","organization":"KTI-Jagodina","lat":"44.6628","long":"20.9300"}	active
699	93.87.66.66	31375	Elite	64ms	{"ip":"93.87.66.66","country":"Serbia","region":"Not Available","city":"Not Available","isp":"TELEKOM SRBIJA a.d.","organization":"TELEKOM SRBIJA a.d.","lat":"44.0000","long":"21.0000"}	active
702	111.68.108.34	8080	Anonymous	27ms	{"ip":"111.68.108.34","country":"Pakistan","region":"Sindh","city":"Karachi","isp":"PERN AS Content Servie Provider, Islamabad, Pakistan","organization":"PERN, IP Allocation","lat":"24.9056","long":"67.0822"}	active
708	125.209.123.186	8080	Transparent	248ms	{"ip":"125.209.123.186","country":"Pakistan","region":"Not Available","city":"Not Available","isp":"Multinet Pakistan Pvt. Ltd.","organization":"Multinet Pakistan Pvt. Ltd.","lat":"30.0000","long":"70.0000"}	active
710	125.209.88.46	8080	Transparent	230ms	{"ip":"125.209.88.46","country":"Pakistan","region":"Punjab","city":"Rawalpindi","isp":"Multinet Pakistan Pvt. Ltd.","organization":"Multinet Pakistan Pvt. Ltd.","lat":"33.6333","long":"73.0667"}	active
712	182.176.147.18	8080	Transparent	102ms	{"ip":"182.176.147.18","country":"Pakistan","region":"Not Available","city":"Not Available","isp":"Pakistan Telecommunication Company Limited","organization":"Pakistan Telecommuication company limited","lat":"30.0000","long":"70.0000"}	active
887	41.78.88.178	8080	Transparent	403ms	{"ip":"41.78.88.236","country":"Nigeria","region":"Kano","city":"Kano","isp":"Electronic Connections Limitied","organization":"ECNX Servers","lat":"11.9944","long":"8.5138"}	active
713	110.37.217.253	8080	Transparent	308ms	{"ip":"110.37.217.253","country":"Pakistan","region":"Sindh","city":"Karachi","isp":"National WiMAX/IMS environment","organization":"National WiMAX/IMS environment","lat":"24.9056","long":"67.0822"}	active
714	110.36.234.210	8080	Transparent	114ms	{"ip":"110.38.8.253","country":"Pakistan","region":"Punjab","city":"Lahore","isp":"National WiMAX/IMS environment","organization":"National WiMAX/IMS environment","lat":"31.4888","long":"74.3686"}	active
720	203.170.66.202	3128	Transparent	106ms	{"ip":"203.170.66.202","country":"Pakistan","region":"Not Available","city":"Not Available","isp":"NetSol Connect","organization":"Internet Services, DSL, Wireless, Hosting Pakistan","lat":"30.0000","long":"70.0000"}	active
723	110.37.216.6	8080	Transparent	294ms	{"ip":"110.37.221.130","country":"Pakistan","region":"Sindh","city":"Karachi","isp":"National WiMAX/IMS environment","organization":"National WiMAX/IMS environment","lat":"24.9056","long":"67.0822"}	active
724	202.166.169.18	8080	Transparent	111ms	{"ip":"202.166.169.18","country":"Pakistan","region":"Punjab","city":"Lahore","isp":"141-143 Maulana Shaukat Ali Road","organization":"ConnecTel Internet Services, Lahore.","lat":"31.5497","long":"74.3436"}	active
727	89.103.128.10	8080	Elite	360ms	{"ip":"89.103.128.10","country":"Czech Republic","region":"Hlavni mesto Praha","city":"Prague","isp":"Liberty Global Operations B.V.","organization":"UPC Ceska republika, a.s.","lat":"50.1444","long":"14.4833"}	active
728	5.59.54.14	8080	Elite	755ms	{"ip":"5.59.54.14","country":"Ukraine","region":"Transcarpathia","city":"Kivyazhd","isp":"ISP DIPNET Ltd.","organization":"ISP DIPNET Ltd.","lat":"48.2801","long":"22.9404"}	active
729	79.98.78.7	8080	Transparent	78ms	{"ip":"79.98.78.7","country":"Czech Republic","region":"Stredocesky kraj","city":"Branik","isp":"Sys-DataCom s.r.o.","organization":"Sys-DataCom s.r.o.","lat":"50.0398","long":"14.4222"}	active
732	89.31.44.108	3128	Transparent	213ms	{"ip":"89.31.44.108","country":"Czech Republic","region":"Central Bohemia","city":"Kladno","isp":"STARNET, s.r.o.","organization":"STARNET, s.r.o.","lat":"50.1500","long":"14.1000"}	active
733	95.80.253.11	41258	Elite	303ms	{"ip":"95.80.253.11","country":"Czech Republic","region":"Olomoucky kraj","city":"Sternberk","isp":"Dial Telecom, a.s.","organization":"Jiri Vlacil - WELLNET","lat":"49.7333","long":"17.3000"}	active
734	94.143.172.42	33500	Elite	192ms	{"ip":"94.143.172.42","country":"Czech Republic","region":"Hlavni mesto Praha","city":"Zatisi","isp":"CentroNet a.s.","organization":"CentroNet a.s.","lat":"50.0167","long":"14.4333"}	active
670	185.179.204.228	3128	Elite	365ms	{"ip":"162.253.153.79","country":"United States","region":"Nevada","city":"Las Vegas","isp":"Reprise Hosting","organization":"Reprise Hosting","lat":"36.1008","long":"-115.1360"}	active
682	212.200.27.134	8080	Elite	259ms	{"ip":"212.200.27.134","country":"Serbia","region":"SERBIA","city":"Pirot","isp":"TELEKOM SRBIJA a.d.","organization":"Telekom Srbija a.d.","lat":"43.1531","long":"22.5861"}	active
1307	200.60.118.75	8080	Transparent	81ms	{"ip":"200.60.118.75","country":"Peru","region":"Arequipa","city":"Arequipa","isp":"Telefonica del Peru S.A.A.","organization":"Telefonica del Peru S.A.A.","lat":"-16.3989","long":"-71.5350"}	active
1313	148.102.57.122	8080	Transparent	56ms	{"ip":"181.224.226.153","country":"Peru","region":"Lima","city":"Lima","isp":"ECONOCABLE MEDIA SAC","organization":"ECONOCABLE MEDIA SAC","lat":"-12.0500","long":"-77.0500"}	active
738	81.30.251.216	31516	Elite	162ms	{"ip":"81.30.251.216","country":"Czech Republic","region":"Moravskoslezsky kraj","city":"Trebovice","isp":"ha-vel internet s.r.o.","organization":"ha-vel internet spol. s r.o.","lat":"49.8310","long":"18.1935"}	active
739	95.47.116.184	60722	Elite	67ms	{"ip":"95.47.116.184","country":"Ukraine","region":"Kyyiv","city":"Kiev","isp":"PP Levin Oleksandr Arkadiyovych","organization":"PP Levin Oleksandr Arkadiyovych","lat":"50.4333","long":"30.5167"}	active
740	90.176.152.12	45514	Elite	55ms	\N	active
741	89.176.251.2	55102	Elite	201ms	{"ip":"89.176.251.2","country":"Czech Republic","region":"South Moravian","city":"Brno","isp":"Liberty Global Operations B.V.","organization":"UPC Ceska republika, a.s.","lat":"49.2333","long":"16.6500"}	active
742	109.105.51.18	53281	Elite	584ms	{"ip":"109.105.51.18","country":"Czech Republic","region":"South Moravian","city":"Břeclav","isp":"itself s.r.o.","organization":"itself s.r.o.","lat":"48.7667","long":"16.8500"}	active
743	77.92.223.19	32231	Elite	57ms	{"ip":"77.92.223.19","country":"Czech Republic","region":"Jihomoravsky kraj","city":"Velke Pavlovice","isp":"InterneXt 2000, s.r.o.","organization":"Robert Kostka - Coolnet","lat":"48.9023","long":"16.8149"}	active
745	5.59.35.43	38014	Elite	78ms	{"ip":"5.59.35.43","country":"Russia","region":"Kaluga","city":"Kaluga","isp":"LLC GC Start","organization":"LLC GC Start","lat":"54.2596","long":"36.1436"}	active
746	213.235.177.112	39616	Elite	334ms	{"ip":"213.235.177.112","country":"Czech Republic","region":"Central Bohemia","city":"Hostivice","isp":"CD-Telematika a.s.","organization":"Dialognet","lat":"50.0833","long":"14.2667"}	active
747	193.85.228.180	58262	Elite	38ms	{"ip":"193.85.228.178","country":"Czech Republic","region":"Stredocesky kraj","city":"Drasov","isp":"T-Mobile Czech Republic a.s.","organization":"T-Mobile Czech Republic a.s.","lat":"49.7017","long":"14.1192"}	active
749	188.120.216.137	53281	Elite	549ms	{"ip":"188.120.216.137","country":"Czech Republic","region":"Central Bohemia","city":"Mladá Boleslav","isp":"IP4ISP z.s.p.o","organization":"NECOSS s.r.o main block by IP4ISP z.s.p.o","lat":"50.4135","long":"14.9125"}	active
750	213.226.253.26	32920	Elite	240ms	{"ip":"213.226.253.26","country":"Czech Republic","region":"Kraj Vysocina","city":"Havlíčkův Brod","isp":"M-SOFT, spol. s r.o.","organization":"HBNET","lat":"49.6167","long":"15.5833"}	active
758	114.33.148.203	3128	Transparent	561ms	{"ip":"114.33.148.203","country":"Taiwan","region":"Not Available","city":"Not Available","isp":"Data Communication Business Group","organization":"Data Communication Business Group","lat":"23.5000","long":"121.0000"}	active
767	123.110.185.95	8888	Elite	684ms	{"ip":"123.110.185.95","country":"Taiwan","region":"Not Available","city":"Not Available","isp":"Digital United Inc.","organization":"TBC","lat":"23.5000","long":"121.0000"}	active
771	118.163.168.208	8080	Transparent	253ms	{"ip":"118.163.168.205","country":"Taiwan","region":"Taipei City","city":"Taipei","isp":"Data Communication Business Group","organization":"Data Communication Business Group","lat":"25.0478","long":"121.5320"}	active
782	201.210.118.161	8080	Anonymous	986ms	\N	active
785	190.121.227.174	3128	Transparent	53ms	{"ip":"190.121.227.174","country":"Venezuela","region":"Carabobo","city":"Valencia","isp":"Corporacion Digitel C.A.","organization":"Corporacion Digitel C.A.","lat":"10.1806","long":"-68.0039"}	active
789	190.121.229.130	8080	Transparent	81ms	{"ip":"190.121.229.130","country":"Nicaragua","region":"Managua","city":"Managua","isp":"Corporacion Digitel C.A.","organization":"Corporacion Digitel C.A.","lat":"12.1508","long":"-86.2683"}	active
791	201.208.144.253	8080	Transparent	624ms	\N	active
804	51.38.71.101	8080	Elite	41ms	{"ip":"51.38.71.101","country":"France","region":"Nord-Pas-de-Calais","city":"Roubaix","isp":"OVH SAS","organization":"OVH Ltd","lat":"50.6942","long":"3.1746"}	active
808	138.68.132.204	8080	Transparent	45ms	{"ip":"138.68.132.204","country":"United Kingdom","region":"London, City of","city":"London","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"51.5127","long":"-0.4285"}	active
814	81.136.143.191	41352	Elite	81ms	{"ip":"81.136.143.191","country":"United Kingdom","region":"England","city":"Ipswich","isp":"British Telecommunications PLC","organization":"British Telecommunications PLC","lat":"52.0417","long":"1.1866"}	active
816	51.75.109.88	3128	Transparent	45ms	{"ip":"51.75.109.88","country":"France","region":"Nord-Pas-de-Calais","city":"Roubaix","isp":"OVH SAS","organization":"Butler cody","lat":"50.6942","long":"3.1746"}	active
817	62.7.85.234	8080	Anonymous	36ms	{"ip":"62.7.85.234","country":"United Kingdom","region":"London, City of","city":"London","isp":"British Telecommunications PLC","organization":"FTIP003284698 The Princes Trust","lat":"51.5191","long":"-0.0882"}	active
821	176.35.85.11	8080	Transparent	471ms	{"ip":"176.35.85.11","country":"United Kingdom","region":"England","city":"Crewe","isp":"Daisy Communications Ltd","organization":"Daisy Communications Ltd","lat":"52.9896","long":"-2.5071"}	active
822	178.62.111.181	8080	Transparent	50ms	{"ip":"178.62.111.181","country":"United Kingdom","region":"London, City of","city":"London","isp":"DigitalOcean, LLC","organization":"DigitalOcean London","lat":"51.5127","long":"-0.4285"}	active
825	51.75.109.90	3128	Transparent	43ms	{"ip":"51.75.109.90","country":"France","region":"Nord-Pas-de-Calais","city":"Roubaix","isp":"OVH SAS","organization":"Butler cody","lat":"50.6942","long":"3.1746"}	active
831	109.74.50.66	8080	Transparent	97ms	{"ip":"109.74.50.66","country":"Hungary","region":"Pest megye","city":"Gyal","isp":"ACE Telecom Kft","organization":"Ace Telecom Kft.","lat":"47.3833","long":"19.2333"}	active
1362	86.57.170.111	58536	Elite	61ms	{"ip":"86.57.170.111","country":"Belarus","region":"Minsk City","city":"Minsk","isp":"Republican Unitary Telecommunication Enterprise Beltelecom","organization":"BELTELECOM","lat":"53.9000","long":"27.5667"}	active
1364	80.249.81.248	45710	Elite	56ms	{"ip":"80.249.81.248","country":"Belarus","region":"Minsk City","city":"Minsk","isp":"Business Network Ltd","organization":"Business network LTD","lat":"53.9000","long":"27.5667"}	active
835	81.182.186.238	8080	Transparent	498ms	{"ip":"81.182.186.238","country":"Hungary","region":"Fejer","city":"Tordas","isp":"Magyar Telekom plc.","organization":"Magyar Telekom customers using dynamic IP","lat":"47.3440","long":"18.7525"}	active
837	213.16.81.131	21231	Elite	108ms	{"ip":"213.16.81.131","country":"Hungary","region":"Pest","city":"Budaörs","isp":"Invitech Megoldasok Zrt.","organization":"Invitech Megoldasok Zrt.","lat":"47.4531","long":"18.9602"}	active
844	86.101.159.189	37638	Elite	40ms	{"ip":"86.101.159.189","country":"Hungary","region":"Budapest","city":"Budapest","isp":"Liberty Global Operations B.V.","organization":"UPC Magyarorszag Kft.","lat":"47.4926","long":"19.0516"}	active
845	31.46.30.230	41258	Elite	48ms	{"ip":"31.46.30.230","country":"Hungary","region":"Győr-Moson-Sopron","city":"Sopron","isp":"Magyar Telekom plc.","organization":"Internet service SG960144","lat":"47.6720","long":"16.5852"}	active
847	89.132.84.108	36268	Elite	396ms	{"ip":"89.132.84.108","country":"Hungary","region":"Budapest","city":"Budapest","isp":"Liberty Global Operations B.V.","organization":"UPC Magyarorszag Kft.","lat":"47.5000","long":"19.0833"}	active
849	188.36.229.210	43129	Elite	102ms	{"ip":"188.36.229.210","country":"Hungary","region":"Budapest","city":"Budapest","isp":"Magyar Telekom plc.","organization":"Customer connectivity link addresses","lat":"47.5000","long":"19.0833"}	active
854	128.199.247.214	8080	Transparent	32ms	{"ip":"128.199.247.214","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
855	122.50.5.190	80	Transparent	256ms	{"ip":"122.50.5.190","country":"Indonesia","region":"Banten","city":"Tangerang","isp":"PT.Mora Telematika Indonesia","organization":"PT.Mora Telematika Indonesia","lat":"-6.1781","long":"106.6300"}	active
857	128.199.196.40	8080	Transparent	30ms	{"ip":"128.199.196.40","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
859	202.166.198.229	8080	Transparent	57ms	{"ip":"202.166.198.229","country":"Nepal","region":"NEPAL","city":"Jawalakhel","isp":"WorldLink Communications Pvt Ltd","organization":"Fiber POOL","lat":"27.6667","long":"85.3167"}	active
860	128.199.72.47	8080	Transparent	33ms	{"ip":"128.199.72.47","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
863	139.59.240.227	3128	Transparent	31ms	{"ip":"139.59.240.227","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
864	128.199.156.51	8080	Transparent	29ms	{"ip":"128.199.156.51","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
866	128.199.176.5	8080	Transparent	34ms	{"ip":"128.199.176.5","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
871	128.199.247.214	3128	Transparent	775ms	{"ip":"128.199.247.214","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
873	128.199.175.71	8080	Transparent	31ms	{"ip":"128.199.175.71","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
874	52.221.202.92	55441	Elite	329ms	{"ip":"52.221.202.92","country":"Singapore","region":"Central Singapore Community Development Council","city":"Singapore","isp":"Amazon.com, Inc.","organization":"Amazon Data Services Singapore","lat":"1.2931","long":"103.8560"}	active
876	197.149.96.3	8080	Transparent	386ms	{"ip":"197.149.96.3","country":"Nigeria","region":"Lagos","city":"Ikoyi","isp":"Cobranet Limited","organization":"Cobranet Limited","lat":"6.4561","long":"3.4422"}	active
881	197.210.191.131	8888	Elite	311ms	{"ip":"197.210.191.131","country":"Nigeria","region":"FCT","city":"Abuja","isp":"MTN NIGERIA Communication limited","organization":"MTN NIGERIA Communication limited","lat":"9.0833","long":"7.5333"}	active
883	197.210.252.39	8080	Transparent	95ms	{"ip":"197.210.252.39","country":"Nigeria","region":"Delta","city":"Warri","isp":"MTN NIGERIA Communication limited","organization":"MTN NIGERIA Communication limited","lat":"5.4577","long":"6.4333"}	active
886	197.210.252.43	8080	Transparent	580ms	{"ip":"197.210.252.43","country":"Nigeria","region":"Delta","city":"Warri","isp":"MTN NIGERIA Communication limited","organization":"MTN NIGERIA Communication limited","lat":"5.4577","long":"6.4333"}	active
889	83.229.106.210	8080	Transparent	327ms	{"ip":"83.229.106.210","country":"Nigeria","region":"Adamawa","city":"Yola","isp":"SkyVision Global Networks Ltd","organization":"American University of Nigeria Yola Adamawa","lat":"9.2000","long":"12.4833"}	active
890	41.76.153.1	8080	Transparent	191ms	{"ip":"41.76.152.113","country":"Nigeria","region":"Edo","city":"Benin City","isp":"Swifttalk Limited","organization":"Swifttalk POP Routers","lat":"6.3350","long":"5.6275"}	active
891	41.76.153.2	8080	Transparent	163ms	{"ip":"41.76.152.113","country":"Nigeria","region":"Edo","city":"Benin City","isp":"Swifttalk Limited","organization":"Swifttalk POP Routers","lat":"6.3350","long":"5.6275"}	active
893	41.76.152.18	8080	Transparent	609ms	{"ip":"41.76.152.113","country":"Nigeria","region":"Edo","city":"Benin City","isp":"Swifttalk Limited","organization":"Swifttalk POP Routers","lat":"6.3350","long":"5.6275"}	active
1414	130.193.124.174	8080	Transparent	259ms	{"ip":"5.77.252.88","country":"Armenia","region":"Yerevan","city":"Yerevan","isp":"Ucom LLC","organization":"Ucom LLC","lat":"40.1811","long":"44.5136"}	active
894	41.86.146.6	8888	Elite	368ms	{"ip":"41.86.146.6","country":"Nigeria","region":"Not Available","city":"Not Available","isp":"Cobranet Limited","organization":"UGO","lat":"10.0000","long":"8.0000"}	active
895	41.222.40.39	8080	Transparent	238ms	{"ip":"41.222.40.39","country":"Nigeria","region":"Not Available","city":"Not Available","isp":"ODUA TELECOMS LTD","organization":"ODUA TELECOMS LTD","lat":"10.0000","long":"8.0000"}	active
840	84.21.27.205	51962	Elite	142ms	{"ip":"84.21.27.205","country":"Hungary","region":"Somogy megye","city":"Balatonmariafurdo","isp":"WLA Interservice Ltd.","organization":"WLA Interservice Ltd.","lat":"46.7000","long":"17.3833"}	active
906	80.147.158.52	3128	Anonymous	73ms	{"ip":"80.147.158.52","country":"Germany","region":"Baden-Württemberg Region","city":"Buhlerzell","isp":"Deutsche Telekom AG","organization":"Deutsche Telekom AG","lat":"49.0033","long":"9.9206"}	active
907	95.89.19.67	3128	Anonymous	33ms	{"ip":"95.89.19.67","country":"Germany","region":"Rheinland-Pfalz","city":"Dudenhofen","isp":"Vodafone Kabel Deutschland GmbH","organization":"Kabel Deutschland Breitband Customer 18","lat":"49.3186","long":"8.3886"}	active
914	212.66.152.231	8080	Transparent	544ms	{"ip":"212.66.152.231","country":"Germany","region":"Nordrhein-Westfalen","city":"Aachen","isp":"NetAachen GmbH","organization":"NetAachen GmbH","lat":"50.7884","long":"6.1044"}	active
915	85.10.195.74	3128	Elite	257ms	{"ip":"85.10.195.74","country":"Germany","region":"Baden-Württemberg Region","city":"Landkreis Tuebingen","isp":"Hetzner Online GmbH","organization":"Hetzner Online AG","lat":"48.5311","long":"9.0705"}	active
917	149.172.217.53	8080	Transparent	75ms	{"ip":"149.172.217.53","country":"Germany","region":"Baden-Württemberg Region","city":"Backnang","isp":"Unitymedia BW GmbH","organization":"Kabel BW GmbH","lat":"48.9474","long":"9.4372"}	active
918	138.68.72.159	80	Transparent	65ms	{"ip":"138.68.72.159","country":"Germany","region":"Hessen","city":"Frankfurt","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"50.1167","long":"8.6833"}	active
921	144.76.76.25	3128	Transparent	49ms	{"ip":"144.76.76.25","country":"Germany","region":"Bayern","city":"Gunzenhausen","isp":"Hetzner Online GmbH","organization":"Hetzner Online GmbH","lat":"49.1280","long":"10.7704"}	active
923	188.40.166.196	3128	Transparent	53ms	{"ip":"188.40.166.196","country":"Germany","region":"Bayern","city":"Gunzenhausen","isp":"Hetzner Online GmbH","organization":"Hetzner Online GmbH","lat":"49.1280","long":"10.7704"}	active
924	5.1.68.227	3128	Transparent	49ms	{"ip":"5.1.68.227","country":"United Kingdom","region":"England","city":"London","isp":"VooServers Ltd","organization":"GaiacomLC","lat":"51.5062","long":"-0.0196"}	active
925	46.4.35.218	8080	Transparent	687ms	{"ip":"46.4.35.218","country":"Germany","region":"Bayern","city":"Gunzenhausen","isp":"Hetzner Online GmbH","organization":"Hetzner Online GmbH","lat":"49.1280","long":"10.7704"}	active
927	89.122.148.121	8888	Elite	321ms	{"ip":"89.122.148.121","country":"Romania","region":"Harghita","city":"Bradesti","isp":"TELEKOM ROMANIA COMMUNICATION S.A","organization":"Romtelecom Data Network","lat":"46.3667","long":"25.3500"}	active
929	89.37.56.138	8080	Transparent	78ms	{"ip":"89.37.56.138","country":"Romania","region":"Sibiu","city":"Sibiu","isp":"NEXT LEVEL BUSINESS SRL","organization":"NEXT LEVEL BUSINESS SRL","lat":"45.8000","long":"24.1500"}	active
932	109.166.159.170	8888	Transparent	609ms	{"ip":"109.166.159.170","country":"Romania","region":"Bucuresti","city":"Bucharest","isp":"Orange Romania S.A.","organization":"Orange Romania","lat":"44.4180","long":"26.1691"}	active
933	81.180.26.18	8080	Elite	511ms	{"ip":"81.180.26.18","country":"Romania","region":"ROMANIA","city":"Bucuresti","isp":"SC TELECOMUNICATII CFR SA","organization":"S.C. TELECOMUNICATII CFR S.A","lat":"44.4280","long":"26.0967"}	active
934	217.10.218.90	8080	Transparent	69ms	{"ip":"217.10.218.90","country":"Romania","region":"Not Available","city":"Not Available","isp":"Vodafone Romania S.A.","organization":"Vodafone Romania S.A.","lat":"46.0000","long":"25.0000"}	active
936	93.113.181.100	3128	Transparent	518ms	{"ip":"93.113.181.100","country":"Romania","region":"Not Available","city":"Not Available","isp":"S.C. ENVIRONMENT TRADE S.R.L.","organization":"GLOBAL CITY NET S.R.L.","lat":"46.0000","long":"25.0000"}	active
941	5.2.230.40	8080	Elite	278ms	{"ip":"5.2.230.40","country":"Romania","region":"Constanta","city":"Constanta","isp":"RCS & RDS SA","organization":"RCS & RDS Business","lat":"44.1833","long":"28.6500"}	active
944	86.125.17.173	53281	Elite	262ms	{"ip":"86.125.17.173","country":"Romania","region":"Dolj","city":"Craiova","isp":"RCS & RDS SA","organization":"RCS & RDS Business","lat":"44.3167","long":"23.8000"}	active
946	89.40.218.5	39787	Elite	131ms	{"ip":"89.40.218.5","country":"Romania","region":"ROMANIA","city":"Bucuresti","isp":"INSTITUTUL NATIONAL DE CERCETARE-DEZVOLTARE TURBOMOTOARE - COMOTI","organization":"INSTITUTUL NATIONAL DE CERCETARE-DEZVOLTARE","lat":"44.4280","long":"26.0967"}	active
949	195.222.105.51	36619	Elite	94ms	{"ip":"195.222.105.51","country":"Romania","region":"Harghita","city":"Szekelyudvarhely","isp":"SIGMA SOFT SRL","organization":"SIGMA SOFT SRL","lat":"46.3000","long":"25.3000"}	active
954	37.26.64.44	8888	Elite	125ms	{"ip":"37.26.64.44","country":"Albania","region":"Not Available","city":"Not Available","isp":"N.SH.T ATI-KOS sh.p.k","organization":"ATI-KOS-NAT-M1","lat":"41.0000","long":"20.0000"}	active
958	109.69.0.2	36583	Elite	75ms	{"ip":"109.69.0.2","country":"Albania","region":"Tirana","city":"Not Available","isp":"ABCOM Shpk","organization":"ABCOM Shpk","lat":"41.3275","long":"19.8189"}	active
959	80.78.75.59	37764	Elite	132ms	{"ip":"80.78.75.59","country":"Albania","region":"Not Available","city":"Not Available","isp":"ABCOM Shpk","organization":"Abcom Small business pppoe Clients","lat":"41.0000","long":"20.0000"}	active
960	134.0.63.134	8000	Transparent	517ms	{"ip":"134.0.63.134","country":"Albania","region":"Tirana","city":"Tirana","isp":"Agjencia Kombetare Shoqerise se Informacionit","organization":"Govnet Institutions Public Services","lat":"41.3275","long":"19.8189"}	active
962	91.187.97.235	53281	Elite	60ms	{"ip":"91.187.97.235","country":"Albania","region":"Not Available","city":"Not Available","isp":"IPKO Telecommunications LLC","organization":"Ipko GMDS SHPK Prishtine","lat":"41.0000","long":"20.0000"}	active
1480	43.252.214.195	80	Elite	65ms	{"ip":"43.252.214.195","country":"Malaysia","region":"Sarawak","city":"Not Available","isp":"Exa Bytes Network Sdn.Bhd.","organization":"Exa Bytes Network Sdn.Bhd.","lat":"1.5500","long":"110.3330"}	active
963	80.80.172.26	8080	Elite	442ms	{"ip":"80.80.172.26","country":"Albania","region":"Not Available","city":"Not Available","isp":"IPKO Telecommunications LLC","organization":"Ipko Tabe PoP point-to-point clients","lat":"41.0000","long":"20.0000"}	active
902	144.76.189.74	8080	Transparent	136ms	{"ip":"144.76.189.74","country":"Germany","region":"Bayern","city":"Gunzenhausen","isp":"Hetzner Online GmbH","organization":"Hetzner Online GmbH","lat":"49.1280","long":"10.7704"}	active
975	82.114.92.122	52526	Elite	143ms	{"ip":"82.114.92.122","country":"Albania","region":"Not Available","city":"Not Available","isp":"Kujtesa Net Sh.p.k.","organization":"Kujtesa Net Sh.p.k.","lat":"41.0000","long":"20.0000"}	active
977	213.147.83.1	8888	Transparent	180ms	{"ip":"41.206.61.118","country":"Kenya","region":"Nairobi Area","city":"Irobi","isp":"ACCESSKENYA GROUP LTD is an ISP serving","organization":"ACCESSKENYA GROUP LTD is an ISP serving","lat":"-1.2833","long":"36.8167"}	active
978	41.139.234.110	8888	Elite	1000ms	{"ip":"41.139.234.110","country":"Kenya","region":"Western","city":"Kakamega","isp":"Safaricom Limited","organization":"Safaricom Limited","lat":"0.2833","long":"34.7500"}	active
981	197.232.36.43	8080	Transparent	87ms	{"ip":"197.232.36.43","country":"Kenya","region":"Nairobi Area","city":"Kileleshwa","isp":"Jamii Telecommunications Limited","organization":"Jamii Telecommunications Limited","lat":"-1.2833","long":"36.7833"}	active
983	41.90.104.38	8080	Elite	563ms	{"ip":"41.90.104.38","country":"Kenya","region":"Not Available","city":"Not Available","isp":"Safaricom Limited","organization":"Safaricom Limited","lat":"1.0000","long":"38.0000"}	active
984	41.215.26.182	8080	Elite	508ms	{"ip":"41.215.26.182","country":"Kenya","region":"Nairobi Area","city":"Irobi","isp":"ACCESSKENYA GROUP LTD is an ISP serving","organization":"ACCESSKENYA GROUP LTD is an ISP serving","lat":"-1.2833","long":"36.8167"}	active
985	217.21.124.73	80	Transparent	378ms	{"ip":"41.60.233.38","country":"Kenya","region":"Not Available","city":"Not Available","isp":"Liquid Telecommunications Ltd","organization":"Liquid Telecommunications Ltd","lat":"1.0000","long":"38.0000"}	active
991	41.203.215.126	57715	Elite	228ms	{"ip":"41.203.215.126","country":"Kenya","region":"Not Available","city":"Not Available","isp":"Safaricom Limited","organization":"Safaricom Limited","lat":"1.0000","long":"38.0000"}	active
992	197.254.108.134	54960	Elite	443ms	{"ip":"197.254.108.134","country":"Kenya","region":"Not Available","city":"Not Available","isp":"ACCESSKENYA GROUP LTD is an ISP serving","organization":"AccessKenya Group Ltd","lat":"1.0000","long":"38.0000"}	active
993	197.254.103.126	30308	Elite	201ms	{"ip":"197.254.103.126","country":"Kenya","region":"Nairobi Area","city":"Irobi","isp":"ACCESSKENYA GROUP LTD is an ISP serving","organization":"LANDMARK CYBER","lat":"-1.2833","long":"36.8167"}	active
995	196.207.29.66	37940	Elite	127ms	{"ip":"196.207.29.66","country":"Kenya","region":"Nairobi Area","city":"Irobi","isp":"ACCESSKENYA GROUP LTD is an ISP serving","organization":"Areva T&D","lat":"-1.2833","long":"36.8167"}	active
999	41.90.127.42	58383	Elite	607ms	{"ip":"41.90.127.42","country":"Kenya","region":"Not Available","city":"Not Available","isp":"Safaricom Limited","organization":"Safaricom Limited","lat":"1.0000","long":"38.0000"}	active
1000	197.232.55.224	50726	Elite	83ms	{"ip":"197.232.55.224","country":"Kenya","region":"Nairobi Area","city":"Madaraka","isp":"Jamii Telecommunications Limited","organization":"Jamii Telecommunications Limited","lat":"-1.3061","long":"36.8164"}	active
1001	42.112.209.164	8080	Transparent	310ms	{"ip":"42.112.209.164","country":"Vietnam","region":"Hanoi","city":"Hanoi","isp":"The Corporation for Financing & Promoting Technology","organization":"FPT Telecom Company","lat":"21.0333","long":"105.8500"}	active
1005	123.31.47.8	3128	Elite	186ms	{"ip":"123.31.47.8","country":"Vietnam","region":"Not Available","city":"Not Available","isp":"VNPT Corp","organization":"VNPT Corp","lat":"16.0000","long":"106.0000"}	active
1006	101.99.23.136	3128	Transparent	69ms	{"ip":"113.190.252.73","country":"Vietnam","region":"Hanoi","city":"Hanoi","isp":"VNPT Corp","organization":"VNPT Corp","lat":"21.0333","long":"105.8500"}	active
1010	27.72.56.239	8080	Transparent	41ms	{"ip":"27.72.56.239","country":"Vietnam","region":"Hanoi","city":"Hanoi","isp":"Viettel Group","organization":"Viettel Group","lat":"21.0333","long":"105.8500"}	active
1013	14.161.25.161	8080	Elite	270ms	{"ip":"14.161.25.161","country":"Vietnam","region":"Ho Chi Minh","city":"Ho Chi Minh City","isp":"VNPT Corp","organization":"VNPT Corp","lat":"10.8142","long":"106.6440"}	active
1015	113.161.173.10	3128	Transparent	29ms	{"ip":"113.161.173.14","country":"Vietnam","region":"Ho Chi Minh","city":"Ho Chi Minh City","isp":"VNPT Corp","organization":"VNPT Corp","lat":"10.8142","long":"106.6440"}	active
1017	113.160.158.49	8080	Transparent	396ms	{"ip":"113.160.158.49","country":"Vietnam","region":"Hanoi","city":"Hanoi","isp":"VNPT Corp","organization":"VNPT Corp","lat":"21.0333","long":"105.8500"}	active
1018	115.78.160.247	8080	Transparent	40ms	{"ip":"115.78.160.247","country":"Vietnam","region":"Ho Chi Minh","city":"Ho Chi Minh City","isp":"Viettel Group","organization":"Viettel Group","lat":"10.8142","long":"106.6440"}	active
1019	27.72.45.109	45	Transparent	650ms	{"ip":"27.72.45.109","country":"Vietnam","region":"Tinh Nam GJinh","city":"Nam Định","isp":"Viettel Group","organization":"Viettel Group","lat":"20.4167","long":"106.1670"}	active
1022	163.44.206.148	8888	Transparent	33ms	{"ip":"163.44.206.148","country":"Vietnam","region":"Not Available","city":"Not Available","isp":"GMO-Z.com Runsystem Joint Stock Company","organization":"GMO-Z.com Runsystem Joint Stock Company","lat":"16.0000","long":"106.0000"}	active
1025	27.72.45.109	670	Transparent	560ms	{"ip":"27.72.45.109","country":"Vietnam","region":"Tinh Nam GJinh","city":"Nam Định","isp":"Viettel Group","organization":"Viettel Group","lat":"20.4167","long":"106.1670"}	active
1028	203.8.108.18	8080	Anonymous	140ms	{"ip":"203.8.108.130","country":"Australia","region":"Not Available","city":"Not Available","isp":"TPG Internet Pty Ltd","organization":"Forestry Commission of NSW","lat":"-33.4940","long":"143.2100"}	active
1581	154.72.82.170	58319	Elite	112ms	{"ip":"154.72.82.170","country":"Tanzania","region":"Not Available","city":"Not Available","isp":"RAHA Ltd","organization":"RAHA Ltd","lat":"-6.8227","long":"39.2910"}	active
1583	154.73.65.75	50476	Elite	72ms	{"ip":"154.73.65.75","country":"Tanzania","region":"Not Available","city":"Not Available","isp":"Power and Network, Backup Company Ltd","organization":"Power-and-Network Customers","lat":"-6.8227","long":"39.2910"}	active
1031	139.130.233.254	8080	Transparent	60ms	{"ip":"139.130.233.254","country":"Australia","region":"Victoria","city":"Oakleigh","isp":"Telstra Pty Ltd","organization":"Telstra Internet","lat":"-37.8981","long":"145.0880"}	active
971	77.242.21.10	8080	Transparent	185ms	{"ip":"77.242.21.10","country":"Albania","region":"Qarku i Fierit","city":"Lushnje","isp":"Abissnet sh.a.","organization":"Business Static Pool","lat":"40.9419","long":"19.7050"}	active
1042	203.17.150.95	39546	Elite	93ms	{"ip":"203.17.150.95","country":"Australia","region":"Victoria","city":"Bendigo","isp":"Bendigo Telco Limited","organization":"Bendigo Community Telco Limited","lat":"-36.7582","long":"144.2800"}	active
1047	58.162.210.160	53281	Elite	280ms	{"ip":"58.162.210.160","country":"Australia","region":"New South Wales","city":"Wamberal North","isp":"Telstra Pty Ltd","organization":"Telstra Internet","lat":"-33.4155","long":"151.4460"}	active
1049	210.11.189.43	58993	Elite	423ms	{"ip":"210.11.189.43","country":"Australia","region":"Victoria","city":"Richmond North","isp":"AAPT Limited","organization":"AAPT Limited","lat":"-37.8167","long":"145.0000"}	active
1050	210.11.178.95	46484	Elite	260ms	{"ip":"118.107.191.209","country":"Australia","region":"New South Wales","city":"Sydney","isp":"Gtelecom-AUSTRALIA","organization":"Goldenit Pty Ltd","lat":"-33.8612","long":"151.1980"}	active
1053	178.128.145.181	8080	Transparent	34ms	{"ip":"178.128.145.181","country":"United States","region":"New Jersey","city":"North Bergen","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"40.8043","long":"-74.0121"}	active
1054	178.128.88.182	8080	Transparent	27ms	{"ip":"178.128.88.182","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
1055	178.128.101.234	8080	Transparent	30ms	{"ip":"178.128.101.234","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
1059	178.128.20.6	8080	Transparent	31ms	{"ip":"178.128.20.6","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
1060	178.128.90.128	8080	Transparent	28ms	{"ip":"178.128.90.128","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
1061	178.128.154.246	8080	Transparent	33ms	{"ip":"178.128.154.246","country":"United States","region":"New Jersey","city":"North Bergen","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"40.8043","long":"-74.0121"}	active
1064	178.128.31.91	8080	Transparent	29ms	{"ip":"178.128.31.91","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
1065	178.128.88.172	8080	Transparent	28ms	{"ip":"178.128.88.172","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
1067	178.128.150.225	8080	Transparent	34ms	{"ip":"178.128.150.225","country":"United States","region":"New Jersey","city":"North Bergen","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"40.8043","long":"-74.0121"}	active
1069	178.128.212.228	8080	Transparent	27ms	{"ip":"178.128.212.228","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
1071	178.128.21.245	3128	Transparent	25ms	{"ip":"178.128.21.245","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
1074	178.128.24.244	8080	Transparent	46ms	{"ip":"178.128.24.244","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
1075	178.128.240.201	8080	Transparent	56ms	{"ip":"178.128.240.201","country":"Netherlands","region":"Noord-Holland","city":"Amsterdam","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"52.3666","long":"4.9027"}	active
1077	109.224.34.226	8888	Elite	192ms	{"ip":"109.224.34.226","country":"Iraq","region":"Baghdad","city":"Baghdad","isp":"EarthLink Ltd. Communications&Internet Services","organization":"Earthlink-Band-Clients","lat":"33.3386","long":"44.3939"}	active
1079	213.32.253.184	8080	Transparent	277ms	{"ip":"213.32.253.184","country":"Iraq","region":"Arbil","city":"Erbil","isp":"Kurdistan Net Company for Computer and Internet Ltd.","organization":"EXABYT for Communication & General Trading /Ltd","lat":"36.1900","long":"44.0089"}	active
1082	159.255.167.227	8080	Transparent	562ms	{"ip":"159.255.167.227","country":"Iraq","region":"Muhafazat Arbil","city":"Erbil","isp":"Newroz Telecom Ltd.","organization":"TarinNet","lat":"36.1833","long":"44.0119"}	active
1087	213.32.253.165	46356	Elite	111ms	{"ip":"213.32.253.165","country":"Iraq","region":"Arbil","city":"Erbil","isp":"Kurdistan Net Company for Computer and Internet Ltd.","organization":"EXABYT for Communication & General Trading /Ltd","lat":"36.1900","long":"44.0089"}	active
1089	185.138.122.226	57458	Elite	286ms	{"ip":"185.138.122.226","country":"Iraq","region":"Not Available","city":"Not Available","isp":"Horizon Scope Mobile Telecom WLL","organization":"Horizon Scope Mobile Telecom WLL","lat":"33.0000","long":"44.0000"}	active
1090	62.201.221.26	46985	Elite	82ms	{"ip":"62.201.221.26","country":"Iraq","region":"As Sulaymaniyah","city":"Sulaimanieh","isp":"IQ Networks","organization":"IQ Networks","lat":"35.5617","long":"45.4408"}	active
1639	200.46.148.100	3128	Transparent	468ms	{"ip":"200.46.148.100","country":"Panama","region":"PANAMA","city":"Panama","isp":"Cable Onda","organization":"Sky Chefs","lat":"8.9936","long":"-79.5197"}	active
1640	201.182.223.16	37492	Elite	70ms	{"ip":"201.182.223.16","country":"Brazil","region":"Tocantins","city":"Sítio Novo Do Tocantins","isp":"BRASILNET INTERNET BANDA LARGA LTDA-ME","organization":"BRASILNET INTERNET BANDA LARGA LTDA-ME","lat":"-5.5183","long":"-47.4611"}	active
1092	212.126.125.226	36776	Elite	72ms	{"ip":"212.126.125.226","country":"Iraq","region":"Muhafazat as Sulaymaniyah","city":"Sulaymanah","isp":"AL-SARD FIBER Co. for Internet Fiber and Optical Cable Services /Ltd.","organization":"AL-SARD FIBER Co. for Internet Fiber and Optical Cable Services /Ltd.","lat":"35.4983","long":"45.7675"}	active
1036	210.11.181.221	41314	Elite	339ms	{"ip":"210.11.181.221","country":"Australia","region":"Victoria","city":"Richmond North","isp":"AAPT Limited","organization":"AAPT Limited","lat":"-37.8167","long":"145.0000"}	active
1099	88.202.44.210	47605	Elite	179ms	{"ip":"88.202.44.210","country":"Italy","region":"Piemonte","city":"Venaria Reale","isp":"SKYLOGIC S.P.A.","organization":"SKYLOGIC SATELLITE --> TOOWAY SERVICE","lat":"45.1333","long":"7.6333"}	active
1100	85.194.198.78	44588	Elite	81ms	{"ip":"85.194.198.78","country":"Iraq","region":"Baghdad","city":"Baghdad","isp":"ScopeSky Communication and Internet Ltd.","organization":"ScopeSky Communication and Internet Ltd.","lat":"33.3406","long":"44.4009"}	active
1103	140.227.75.107	3128	Elite	31ms	{"ip":"140.227.75.107","country":"Japan","region":"Not Available","city":"Not Available","isp":"NTT PC Communications, Inc.","organization":"NTTPC Communications,Inc","lat":"35.6900","long":"139.6900"}	active
1106	140.227.208.20	3128	Elite	29ms	{"ip":"140.227.208.20","country":"Japan","region":"Not Available","city":"Not Available","isp":"NTT PC Communications, Inc.","organization":"NTTPC Communications,Inc","lat":"35.6900","long":"139.6900"}	active
1107	140.227.26.104	3128	Elite	31ms	{"ip":"140.227.26.104","country":"Japan","region":"Kanagawa","city":"Yokohama","isp":"NTT PC Communications, Inc.","organization":"NTTPC Communications,Inc","lat":"35.4939","long":"139.6710"}	active
1109	163.44.173.238	3128	Transparent	24ms	{"ip":"163.44.173.238","country":"Japan","region":"Tokyo","city":"Tokyo","isp":"GMO Internet,Inc","organization":"GMO Internet, Inc.","lat":"35.6850","long":"139.7510"}	active
1110	140.227.207.20	3128	Elite	30ms	{"ip":"140.227.207.20","country":"Japan","region":"Not Available","city":"Not Available","isp":"NTT PC Communications, Inc.","organization":"NTTPC Communications,Inc","lat":"35.6900","long":"139.6900"}	active
1115	140.227.204.12	3128	Elite	48ms	{"ip":"140.227.204.12","country":"Japan","region":"Not Available","city":"Not Available","isp":"NTT PC Communications, Inc.","organization":"NTTPC Communications,Inc","lat":"35.6900","long":"139.6900"}	active
1116	140.227.81.53	3128	Elite	29ms	{"ip":"140.227.81.53","country":"Japan","region":"Not Available","city":"Not Available","isp":"NTT PC Communications, Inc.","organization":"NTTPC Communications,Inc","lat":"35.6900","long":"139.6900"}	active
1117	150.95.131.24	8181	Elite	900ms	{"ip":"157.65.169.143","country":"Japan","region":"Ōsaka","city":"Hirakata","isp":"NTT PC Communications, Inc.","organization":"NTTPC Communications,Inc","lat":"34.7984","long":"135.6310"}	active
1122	140.227.78.185	3128	Elite	31ms	{"ip":"140.227.78.185","country":"Japan","region":"Not Available","city":"Not Available","isp":"NTT PC Communications, Inc.","organization":"NTTPC Communications,Inc","lat":"35.6900","long":"139.6900"}	active
1123	140.227.206.20	3128	Elite	31ms	{"ip":"140.227.206.20","country":"Japan","region":"Not Available","city":"Not Available","isp":"NTT PC Communications, Inc.","organization":"NTTPC Communications,Inc","lat":"35.6900","long":"139.6900"}	active
1125	140.227.68.82	3128	Elite	31ms	{"ip":"140.227.68.82","country":"Japan","region":"Not Available","city":"Not Available","isp":"NTT PC Communications, Inc.","organization":"NTTPC Communications,Inc","lat":"35.6900","long":"139.6900"}	active
1130	188.169.176.74	45885	Elite	105ms	{"ip":"188.169.176.74","country":"Georgia","region":"K'alak'i T'bilisi","city":"Tbilisi","isp":"JSC Silknet","organization":"JSC Silknet","lat":"41.7250","long":"44.7908"}	active
1131	94.43.142.221	53281	Elite	59ms	{"ip":"94.43.142.221","country":"Georgia","region":"K'alak'i T'bilisi","city":"Tbilisi","isp":"JSC Silknet","organization":"JSC Silknet","lat":"41.7250","long":"44.7908"}	active
1133	178.134.71.138	47621	Elite	84ms	{"ip":"178.134.71.138","country":"Georgia","region":"K'alak'i T'bilisi","city":"Tbilisi","isp":"JSC Silknet","organization":"JSC Silknet","lat":"41.7250","long":"44.7908"}	active
1136	92.51.114.106	53281	Elite	884ms	{"ip":"92.51.114.106","country":"Georgia","region":"Not Available","city":"Not Available","isp":"DELTA-NET LTD","organization":"DELTA NET Network - Tbilisi","lat":"42.0000","long":"43.5000"}	active
1137	37.131.227.98	58914	Elite	219ms	{"ip":"37.131.227.98","country":"Georgia","region":"Dushet'is Raioni","city":"T'bilisi","isp":"DELTA-NET LTD","organization":"DELTA-NET LTD","lat":"41.7250","long":"44.7908"}	active
1139	212.72.137.75	3128	Transparent	656ms	{"ip":"212.72.137.66","country":"Georgia","region":"Dushet'is Raioni","city":"Tbilisi","isp":"Magticom Ltd.","organization":"Caucasus Online LLC","lat":"41.7250","long":"44.7908"}	active
1142	212.72.138.155	59798	Elite	176ms	{"ip":"212.72.138.155","country":"Georgia","region":"Dushet'is Raioni","city":"Tbilisi","isp":"Magticom Ltd.","organization":"Caucasus Online LLC","lat":"41.7250","long":"44.7908"}	active
1143	31.146.84.90	50639	Elite	64ms	{"ip":"31.146.84.90","country":"Georgia","region":"K'alak'i T'bilisi","city":"Tbilisi","isp":"JSC Silknet","organization":"JSC Silknet","lat":"41.7250","long":"44.7908"}	active
1145	212.72.144.226	59026	Elite	314ms	{"ip":"212.72.144.226","country":"Georgia","region":"K'alak'i T'bilisi","city":"Tbilisi","isp":"Magticom Ltd.","organization":"Magticom Ltd.","lat":"41.7250","long":"44.7908"}	active
1146	178.134.79.18	8080	Transparent	227ms	{"ip":"178.134.79.18","country":"Georgia","region":"K'alak'i T'bilisi","city":"Tbilisi","isp":"JSC Silknet","organization":"JSC Silknet","lat":"41.7250","long":"44.7908"}	active
1700	178.217.172.234	57908	Elite	119ms	{"ip":"178.217.172.234","country":"Kyrgyzstan","region":"Chuy","city":"Bichkek","isp":"KRENA - Kyrgyz research and education network association","organization":"KRENA - Kyrgyz research and education network association","lat":"42.8700","long":"74.5900"}	active
231	191.102.93.66	8181	Elite	852ms	{"ip":"191.102.93.66","country":"Colombia","region":"Bogota D.C.","city":"Bogotá","isp":"TV AZTECA SUCURSAL COLOMBIA","organization":"TV AZTECA SUCURSAL COLOMBIA","lat":"4.6492","long":"-74.0628"}	active
1147	178.134.248.126	48080	Elite	59ms	{"ip":"178.134.248.126","country":"Georgia","region":"K'alak'i T'bilisi","city":"Tbilisi","isp":"JSC Silknet","organization":"JSC Silknet","lat":"41.7250","long":"44.7908"}	active
1149	146.255.224.190	39779	Elite	60ms	{"ip":"146.255.224.190","country":"Georgia","region":"Not Available","city":"Not Available","isp":"JSC Silknet","organization":"JSC Silknet","lat":"42.0000","long":"43.5000"}	active
1150	46.49.34.47	46869	Elite	104ms	{"ip":"46.49.34.47","country":"Georgia","region":"K'alak'i T'bilisi","city":"Tbilisi","isp":"Magticom Ltd.","organization":"Magticom","lat":"41.7250","long":"44.7908"}	active
1096	176.241.92.39	39133	Elite	179ms	{"ip":"176.241.92.39","country":"Iraq","region":"Baghdad","city":"Baghdad","isp":"Hayat for Internet & communication LLC","organization":"ayad@techwaytel.com","lat":"33.3406","long":"44.4009"}	active
1161	178.168.28.199	33557	Elite	288ms	{"ip":"178.168.28.199","country":"Moldova","region":"Chișinău Municipality","city":"Chisinau","isp":"StarNet Solutii SRL","organization":"SC STARNET SRL","lat":"47.0056","long":"28.8575"}	active
1163	178.76.66.18	45906	Elite	99ms	{"ip":"178.76.66.18","country":"Moldova","region":"Orhei","city":"Orhei","isp":"Metical SRL","organization":"Metical","lat":"47.3831","long":"28.8231"}	active
1165	92.39.55.186	44404	Elite	156ms	{"ip":"92.39.55.186","country":"Moldova","region":"Chișinău Municipality","city":"Chisinau","isp":"Legal Support Center NATIONALS, LLC","organization":"Legal Support Center NATIONALS, LLC","lat":"47.0056","long":"28.8575"}	active
1167	93.116.57.4	50407	Elite	46ms	{"ip":"93.116.57.4","country":"Moldova","region":"Not Available","city":"Not Available","isp":"Moldtelecom SA","organization":"JSC Moldtelecom S.A.","lat":"47.0188","long":"28.8128"}	active
1168	92.39.56.3	52081	Elite	57ms	{"ip":"92.39.56.3","country":"Moldova","region":"Chișinău Municipality","city":"Chisinau","isp":"Legal Support Center NATIONALS, LLC","organization":"Legal Support Center NATIONALS, LLC","lat":"47.0056","long":"28.8575"}	active
1170	37.26.136.181	52270	Elite	153ms	{"ip":"37.26.136.181","country":"Moldova","region":"Unitatea Teritoriala din Stinga Nistrului","city":"Tiraspol","isp":"JSCC Interdnestrcom","organization":"JSCC Interdnestrcom","lat":"46.8403","long":"29.6433"}	active
1172	185.195.185.192	46581	Elite	906ms	{"ip":"185.195.185.192","country":"Moldova","region":"Not Available","city":"Not Available","isp":"HARTUM TV SRL","organization":"HARTUM TV SRL","lat":"47.0188","long":"28.8128"}	active
1174	178.168.81.42	33362	Elite	150ms	{"ip":"178.168.81.42","country":"Moldova","region":"Chișinău Municipality","city":"Chisinau","isp":"StarNet Solutii SRL","organization":"SC STARNET SRL","lat":"47.0056","long":"28.8575"}	active
1175	178.168.13.143	50565	Elite	159ms	{"ip":"178.168.13.143","country":"Moldova","region":"Chisinau","city":"Buiucani","isp":"StarNet Solutii SRL","organization":"SC STARNET SRL","lat":"47.0186","long":"28.7922"}	active
1179	52.79.116.117	3128	Transparent	39ms	{"ip":"52.79.116.117","country":"South Korea","region":"Incheon","city":"Incheon","isp":"Amazon.com, Inc.","organization":"Amazon.com, Inc.","lat":"37.4536","long":"126.7320"}	active
1185	112.175.62.24	8080	Transparent	18ms	{"ip":"112.175.62.24","country":"South Korea","region":"Not Available","city":"Not Available","isp":"Korea Telecom","organization":"Korea Telecom","lat":"37.5112","long":"126.9740"}	active
1188	112.217.219.179	3128	Transparent	258ms	{"ip":"112.217.219.179","country":"South Korea","region":"Not Available","city":"Not Available","isp":"LG DACOM Corporation","organization":"LG DACOM Corporation","lat":"37.5112","long":"126.9740"}	active
1190	112.175.32.88	8080	Elite	25ms	{"ip":"183.111.172.105","country":"South Korea","region":"Not Available","city":"Not Available","isp":"Korea Telecom","organization":"Korea Telecom","lat":"37.5112","long":"126.9740"}	active
1194	114.202.2.185	80	Anonymous	449ms	{"ip":"114.202.2.185","country":"South Korea","region":"Not Available","city":"Not Available","isp":"SK Broadband Co Ltd","organization":"SK Broadband Co Ltd","lat":"37.5112","long":"126.9740"}	active
1197	222.122.202.175	80	Elite	439ms	{"ip":"222.122.202.175","country":"South Korea","region":"Not Available","city":"Not Available","isp":"Korea Telecom","organization":"Korea Telecom","lat":"37.5112","long":"126.9740"}	active
1198	220.230.120.101	80	Elite	440ms	{"ip":"220.230.120.101","country":"South Korea","region":"Not Available","city":"Not Available","isp":"NBP","organization":"DREAMLINE CO.","lat":"37.5112","long":"126.9740"}	active
1200	114.108.181.130	61772	Elite	80ms	{"ip":"114.108.181.130","country":"South Korea","region":"Not Available","city":"Not Available","isp":"LG DACOM Corporation","organization":"LG DACOM KIDC","lat":"37.5112","long":"126.9740"}	active
1201	213.6.229.238	36127	Elite	608ms	{"ip":"213.6.229.238","country":"Palestinian Territories","region":"Not Available","city":"Not Available","isp":"Palestine Telecommunications Company (PALTEL)","organization":"Palestine Telecommunications Company (PALTEL)","lat":"32.0000","long":"35.2500"}	active
1204	213.6.199.122	8080	Transparent	179ms	{"ip":"213.6.199.122","country":"Palestinian Territories","region":"Not Available","city":"Not Available","isp":"Palestine Telecommunications Company (PALTEL)","organization":"Palestine Telecommunications Company (PALTEL)","lat":"32.0000","long":"35.2500"}	active
1209	85.114.96.246	36590	Elite	224ms	{"ip":"85.114.96.246","country":"Palestinian Territories","region":"Not Available","city":"Gaza","isp":"fusion services","organization":"fusion company IP's","lat":"31.5000","long":"34.4667"}	active
1211	85.114.105.58	46897	Elite	64ms	{"ip":"85.114.105.58","country":"Palestinian Territories","region":"Not Available","city":"Not Available","isp":"fusion services","organization":"Fusion corporate & servers","lat":"32.0000","long":"35.2500"}	active
1254	62.197.206.135	31390	Elite	290ms	{"ip":"62.197.206.135","country":"Slovakia","region":"Trnava","city":"Trnava","isp":"SWAN, a.s.","organization":"Trnava","lat":"48.3774","long":"17.5872"}	active
681	93.186.65.252	8080	Transparent	290ms	{"ip":"93.186.65.252","country":"Serbia","region":"SERBIA","city":"Surdulica","isp":"Orion Telekom Tim d.o.o.Beograd","organization":"Orion Telekom Tim d.o.o","lat":"42.6906","long":"22.1708"}	active
744	62.168.50.2	41258	Elite	33ms	{"ip":"62.168.50.2","country":"Czech Republic","region":"Not Available","city":"Not Available","isp":"T-Mobile Czech Republic a.s.","organization":"N.T.INVE s.r.o.","lat":"50.0848","long":"14.4112"}	active
850	185.199.28.33	57813	Elite	960ms	{"ip":"185.199.28.33","country":"Hungary","region":"Budapest","city":"Budapest","isp":"Rendszerinformatika Zrt.","organization":"Rendszerinformatika Zrt.","lat":"47.5000","long":"19.0833"}	active
1698	103.9.88.204	8080	Transparent	434ms	\N	active
961	109.69.4.175	58146	Elite	77ms	{"ip":"109.69.4.175","country":"Albania","region":"Durres","city":"Durrës","isp":"ABCOM Shpk","organization":"ABCOM-RESIDENTIAL-NAT IP used for NAT","lat":"41.3231","long":"19.4414"}	active
1257	81.161.61.110	58274	Elite	51ms	{"ip":"81.161.61.110","country":"Slovakia","region":"Banska Bystrica","city":"Banská Bystrica","isp":"LIFEPC, s.r.o.","organization":"LIFEPC, s.r.o.","lat":"48.7395","long":"19.1535"}	active
1102	140.227.210.13	3128	Elite	34ms	{"ip":"140.227.210.13","country":"Japan","region":"Not Available","city":"Not Available","isp":"NTT PC Communications, Inc.","organization":"NTTPC Communications,Inc","lat":"35.6900","long":"139.6900"}	active
1231	113.254.114.24	8380	Elite	56ms	\N	active
1244	47.89.37.177	3128	Transparent	48ms	{"ip":"47.89.37.177","country":"Hong Kong SAR China","region":"HONG KONG","city":"Hong Kong","isp":"Alibaba (China) Technology Co., Ltd.","organization":"Alibaba (China) Technology Co., Ltd.","lat":"22.2833","long":"114.1500"}	active
1275	195.146.133.144	53664	Elite	68ms	{"ip":"195.146.133.144","country":"Slovakia","region":"Presov","city":"Vrbov","isp":"Slovak Telecom, a. s.","organization":"Slovak Telecom, a. s.","lat":"49.0833","long":"20.4333"}	active
1212	213.6.229.14	36127	Elite	917ms	{"ip":"213.6.229.14","country":"Palestinian Territories","region":"Not Available","city":"Not Available","isp":"Palestine Telecommunications Company (PALTEL)","organization":"Palestine Telecommunications Company (PALTEL)","lat":"32.0000","long":"35.2500"}	active
1216	213.6.137.250	53281	Elite	220ms	{"ip":"213.6.137.250","country":"Palestinian Territories","region":"Not Available","city":"Not Available","isp":"Palestine Telecommunications Company (PALTEL)","organization":"Palestine Telecommunications Company (PALTEL)","lat":"32.0000","long":"35.2500"}	active
1219	213.6.229.230	36127	Elite	107ms	{"ip":"213.6.229.230","country":"Palestinian Territories","region":"Not Available","city":"Not Available","isp":"Palestine Telecommunications Company (PALTEL)","organization":"Palestine Telecommunications Company (PALTEL)","lat":"32.0000","long":"35.2500"}	active
1806	41.87.29.130	8080	Elite	214ms	\N	active
1155	178.168.67.89	4645	Elite	115ms	{"ip":"178.168.67.89","country":"Moldova","region":"Chişinău","city":"Ciocana","isp":"StarNet Solutii SRL","organization":"SC STARNET SRL","lat":"47.0328","long":"28.8997"}	active
1249	103.44.61.5	41389	Elite	82ms	{"ip":"103.44.61.5","country":"Hong Kong SAR China","region":"Not Available","city":"Not Available","isp":"Internet Solutions Limited","organization":"Internet Solutions Limited","lat":"22.2500","long":"114.1670"}	active
1251	213.160.167.238	33952	Elite	676ms	{"ip":"213.160.167.238","country":"Slovakia","region":"Nitra","city":"Podhajska","isp":"Slovak Telecom, a. s.","organization":"Slovak Telecom, a. s.","lat":"48.1020","long":"18.3397"}	active
1253	109.230.60.3	41945	Elite	84ms	{"ip":"109.230.60.3","country":"Slovakia","region":"Bratislava","city":"Bratislava","isp":"Orange Slovensko a.s.","organization":"Orange Slovensko, a.s.","lat":"48.1482","long":"17.1067"}	active
1258	87.197.164.22	51431	Elite	43ms	{"ip":"87.197.164.22","country":"Slovakia","region":"Nitra","city":"Komárno","isp":"Slovak Telecom, a. s.","organization":"Slovak Telecom, a. s.","lat":"47.8877","long":"18.0177"}	active
1259	94.136.157.121	48154	Elite	128ms	{"ip":"94.136.157.114","country":"Slovakia","region":"Kosice","city":"Tusicka Nova Ves","isp":"Minet s.r.o.","organization":"Minet Slovakia(trebisov)s.r.o.","lat":"48.7164","long":"21.7546"}	active
1261	185.69.106.194	34081	Elite	317ms	{"ip":"185.69.106.194","country":"Slovakia","region":"Trnava","city":"Dolné Zelenice","isp":"AIRNET s.r.o.","organization":"AIRNET s.r.o.","lat":"48.3760","long":"17.7476"}	active
436	109.238.42.135	8080	Elite	90ms	{"ip":"109.238.42.135","country":"Czech Republic","region":"Kraj Vysocina","city":"Třebíč","isp":"ha-vel internet s.r.o.","organization":"ha-vel internet s.r.o.","lat":"49.2167","long":"15.8833"}	active
1702	109.201.191.239	43806	Elite	64ms	{"ip":"109.201.191.239","country":"Kyrgyzstan","region":"Gorod Bishkek","city":"Bishkek","isp":"Mega-Line Ltd.","organization":"MEGALINE-NET-WIFI","lat":"42.8731","long":"74.6003"}	active
34	183.89.203.176	8080	Transparent	259ms	{"ip":"183.89.203.176","country":"Thailand","region":"Changwat Songkhla","city":"Songkhla","isp":"Triple T Internet/Triple T Broadband","organization":"3BB Broadband Internet service Thailand","lat":"7.1000","long":"100.4170"}	active
2112	41.75.13.65	44451	Elite	945ms	\N	active
4	91.122.191.212	3128	Elite	53ms	{"ip":"91.122.191.212","country":"Russia","region":"St.-Petersburg","city":"St Petersburg","isp":"PJSC Rostelecom","organization":"OJSC Rostelecom","lat":"59.8944","long":"30.2642"}	active
1262	95.105.250.126	43741	Elite	309ms	{"ip":"95.105.250.126","country":"Slovakia","region":"Trnava","city":"Vrbové","isp":"Orange Slovensko a.s.","organization":"CUSTOMER","lat":"48.6197","long":"17.7226"}	active
1265	81.92.248.214	60689	Elite	308ms	{"ip":"81.92.248.214","country":"Slovakia","region":"Bratislava","city":"Bratislava","isp":"RadioLAN spol. s r.o.","organization":"Airwave broadband customers","lat":"48.1500","long":"17.1167"}	active
1266	92.245.4.223	30602	Elite	49ms	{"ip":"92.245.4.223","country":"Slovakia","region":"Presov","city":"Not Available","isp":"Condornet, s.r.o.","organization":"Condornet, s.r.o.","lat":"49.0000","long":"21.2500"}	active
1336	103.240.120.72	57951	Elite	479ms	{"ip":"103.240.120.72","country":"Philippines","region":"Metro Manila","city":"Quezon City","isp":"Converge ICT Solutions Inc.","organization":"CONVERGE ICT Net blocks","lat":"14.6274","long":"121.0400"}	active
1269	194.160.223.35	53281	Elite	140ms	{"ip":"194.160.223.35","country":"Slovakia","region":"Banska Bystrica","city":"Podlavice","isp":"Zdruzenie pouzivatelov Slovenskej akademickej datovej siete","organization":"Associated Secondary School, Skolska 7, Banska Bystrica","lat":"48.7500","long":"19.1167"}	active
1270	178.18.65.194	53680	Elite	707ms	{"ip":"178.18.65.194","country":"Slovakia","region":"Presov","city":"Haniska","isp":"PRESNET s.r.o.","organization":"PRESNET s.r.o.","lat":"48.9544","long":"21.2389"}	active
1272	213.108.123.193	8080	Transparent	138ms	{"ip":"213.108.120.2","country":"Slovakia","region":"Kosice","city":"Malcice","isp":"Ing. Jan Mindzak - Maximal Net","organization":"Ing. Jan Mindzak - Maximal Net","lat":"48.5779","long":"21.8524"}	active
1273	86.110.240.166	32246	Elite	63ms	{"ip":"86.110.240.166","country":"Slovakia","region":"Bratislava","city":"Petrzalka","isp":"VNET a.s.","organization":"VNET-org-86.110.240.166","lat":"48.1233","long":"17.1287"}	active
1274	94.136.148.86	61603	Elite	0ms	{"ip":"94.136.148.86","country":"Slovakia","region":"Kosice","city":"Michalovce","isp":"Minet s.r.o.","organization":"Minet s.r.o.","lat":"48.7543","long":"21.9195"}	active
1276	89.40.48.186	8080	Elite	74ms	{"ip":"89.40.48.186","country":"Kazakhstan","region":"Qaraghandy","city":"Satpayev","isp":"Kar-Tel LLC","organization":"Not Available","lat":"47.9042","long":"67.5433"}	active
1285	91.185.21.124	8123	Transparent	395ms	{"ip":"91.185.21.124","country":"Kazakhstan","region":"Almaty","city":"Almaty","isp":"JSC Transtelecom","organization":"JSC Transtelecom","lat":"43.2565","long":"76.9285"}	active
1288	89.218.22.178	8080	Elite	242ms	{"ip":"89.218.22.178","country":"Kazakhstan","region":"Almaty","city":"Almaty","isp":"JSC Kazakhtelecom","organization":"JSC Kazakhtelecom","lat":"43.2565","long":"76.9285"}	active
1289	89.218.170.58	59659	Elite	264ms	{"ip":"89.218.170.54","country":"Kazakhstan","region":"Atyrau","city":"Atyrau","isp":"JSC Kazakhtelecom","organization":"JSC Kazakhtelecom","lat":"47.1167","long":"51.8833"}	active
1291	77.245.108.242	45746	Elite	126ms	{"ip":"77.245.108.242","country":"Kazakhstan","region":"Astana Qalasy","city":"Astana","isp":"JSC Kaztranscom","organization":"Kaztranscom JSC","lat":"51.1811","long":"71.4278"}	active
1292	178.89.188.46	47598	Elite	110ms	{"ip":"178.89.188.46","country":"Kazakhstan","region":"West Kazakhstan","city":"Karagandy","isp":"JSC Kazakhtelecom","organization":"JSC Kazakhtelecom","lat":"50.7047","long":"52.1509"}	active
1296	92.47.148.10	60227	Elite	75ms	{"ip":"92.47.148.10","country":"Kazakhstan","region":"Almaty","city":"Esik","isp":"JSC Kazakhtelecom","organization":"JSC Kazakhtelecom","lat":"43.3550","long":"77.4633"}	active
1297	37.151.106.166	32042	Elite	196ms	{"ip":"37.151.106.166","country":"Kazakhstan","region":"Astana","city":"Astana","isp":"JSC Kazakhtelecom","organization":"JSC Kazakhtelecom","lat":"51.1811","long":"71.4278"}	active
1298	217.196.25.130	36638	Elite	247ms	{"ip":"217.196.25.130","country":"Kazakhstan","region":"Qaraghandy","city":"Karaganda","isp":"JSC Kaztranscom","organization":"Kaztranscom JSC","lat":"49.8119","long":"73.0969"}	active
1300	79.142.63.186	52160	Elite	203ms	{"ip":"79.142.63.186","country":"Kazakhstan","region":"Almaty City","city":"Not Available","isp":"SMARTNET TOO","organization":"SMARTNET TOO","lat":"43.2500","long":"76.9500"}	active
1301	181.65.203.90	80	Transparent	105ms	{"ip":"181.65.203.90","country":"Peru","region":"Not Available","city":"Not Available","isp":"Telefonica del Peru S.A.A.","organization":"Telefonica del Peru S.A.A.","lat":"-12.0433","long":"-77.0283"}	active
1302	181.65.168.76	3128	Transparent	140ms	{"ip":"181.65.168.76","country":"Peru","region":"Callao","city":"Carmen de La Legua","isp":"Telefonica del Peru S.A.A.","organization":"Telefonica del Peru S.A.A.","lat":"-12.0405","long":"-77.0877"}	active
856	128.199.154.45	8080	Transparent	34ms	{"ip":"128.199.154.45","country":"Singapore","region":"SINGAPORE","city":"Singapore","isp":"DigitalOcean, LLC","organization":"DigitalOcean, LLC","lat":"1.2931","long":"103.8560"}	active
369	94.156.59.49	8181	Transparent	170ms	{"ip":"94.156.59.235","country":"Bulgaria","region":"Gabrovo","city":"Gabrovo","isp":"Kivi TV Ltd.","organization":"Kivi TV","lat":"42.8747","long":"25.3342"}	active
3	62.78.89.161	3128	Transparent	247ms	{"ip":"62.78.89.161","country":"Russia","region":"Altai Krai","city":"Aleysk","isp":"LLC Milecom","organization":"LLC Milecom","lat":"52.4900","long":"82.7700"}	active
538	194.243.194.60	80	Elite	94ms	{"ip":"194.243.194.51","country":"Italy","region":"Sicily","city":"Carini","isp":"Telecom Italia S.p.a.","organization":"Telecom Italia S.p.a.","lat":"38.1324","long":"13.1827"}	active
2	188.93.246.34	80	Transparent	309ms	{"ip":"188.93.246.34","country":"Russia","region":"St.-Petersburg","city":"St Petersburg","isp":"Smart Telecom Limited","organization":"Smart Telecom Company","lat":"59.8944","long":"30.2642"}	active
107	160.2.52.234	8080	Elite	275ms	{"ip":"160.2.52.234","country":"United States","region":"Idaho","city":"Pocatello","isp":"CABLE ONE, INC.","organization":"CABLE ONE, INC.","lat":"42.8713","long":"-112.4460"}	active
113	66.191.121.167	54342	Elite	226ms	{"ip":"66.191.121.167","country":"United States","region":"Wisconsin","city":"Clintonville","isp":"Charter Communications","organization":"Charter Communications","lat":"44.6205","long":"-88.7623"}	active
1853	61.5.192.14	56547	Elite	106ms	\N	active
1901	194.38.137.252	3128	Transparent	52ms	\N	active
1954	196.22.55.22	53281	Elite	154ms	\N	active
1988	46.229.250.111	54431	Elite	420ms	\N	active
2019	194.156.230.109	80	Elite	65ms	\N	active
2195	116.12.89.97	8080	Transparent	526ms	\N	active
775	59.126.48.8	48791	Elite	74ms	{"ip":"59.126.48.8","country":"Taiwan","region":"Taichung City","city":"Taichung","isp":"Data Communication Business Group","organization":"Data Communication Business Group","lat":"24.1469","long":"120.6840"}	active
28	183.88.212.141	8080	Transparent	84ms	{"ip":"183.88.212.141","country":"Thailand","region":"Not Available","city":"Not Available","isp":"Triple T Internet/Triple T Broadband","organization":"3BB Broadband Internet service Thailand","lat":"13.7500","long":"100.4670"}	active
36	134.236.255.33	8080	Transparent	63ms	{"ip":"134.236.255.33","country":"Thailand","region":"Changwat Phra Nakhon Si Ayutthaya","city":"Ayutthaya","isp":"CAT TELECOM Public Company Ltd,CAT","organization":"10 Fl. 72. CAT TELECOM TOWER Bangrak Bangkok Thailand","lat":"14.3738","long":"100.5630"}	active
1223	213.6.146.6	32231	Elite	61ms	{"ip":"213.6.146.6","country":"Palestinian Territories","region":"Not Available","city":"Gaza","isp":"Palestine Telecommunications Company (PALTEL)","organization":"Palestine Telecommunications Company (PALTEL)","lat":"31.5000","long":"34.4667"}	active
1309	181.65.168.76	80	Transparent	251ms	{"ip":"181.65.168.76","country":"Peru","region":"Callao","city":"Carmen de La Legua","isp":"Telefonica del Peru S.A.A.","organization":"Telefonica del Peru S.A.A.","lat":"-12.0405","long":"-77.0877"}	active
1310	181.65.168.76	8080	Transparent	418ms	{"ip":"181.65.168.76","country":"Peru","region":"Callao","city":"Carmen de La Legua","isp":"Telefonica del Peru S.A.A.","organization":"Telefonica del Peru S.A.A.","lat":"-12.0405","long":"-77.0877"}	active
1315	190.42.32.154	82	Transparent	86ms	{"ip":"190.42.32.154","country":"Peru","region":"Arequipa","city":"Arequipa","isp":"Telefonica del Peru S.A.A.","organization":"PE-TDPERX2-LACNIC","lat":"-16.3989","long":"-71.5350"}	active
1317	181.199.129.78	38938	Elite	325ms	{"ip":"181.199.129.78","country":"Peru","region":"Not Available","city":"Not Available","isp":"NewCom International, Inc.","organization":"NEWCOM PERU","lat":"-12.0433","long":"-77.0283"}	active
1406	109.75.42.231	53597	Elite	76ms	{"ip":"109.75.42.231","country":"Armenia","region":"Not Available","city":"Not Available","isp":"Ucom LLC","organization":"Ucom LLC","lat":"40.0000","long":"45.0000"}	active
809	139.59.186.109	3128	Transparent	49ms	\N	active
173	109.254.93.195	3128	Transparent	78ms	{"ip":"109.254.93.195","country":"Ukraine","region":"Donets'ka Oblast'","city":"Donetsk","isp":"Donbass Electronic Communications Ltd.","organization":"Donbass Electronic Communications Ltd.","lat":"47.9917","long":"37.7759"}	active
810	139.59.190.231	3128	Transparent	45ms	\N	active
812	46.101.9.171	3128	Transparent	49ms	\N	active
813	139.59.188.76	3128	Transparent	51ms	\N	active
1318	190.116.178.27	57338	Elite	149ms	{"ip":"190.116.178.27","country":"Peru","region":"Not Available","city":"Not Available","isp":"America Movil Peru S.A.C.","organization":"America Movil Peru S.A.C.","lat":"-12.0433","long":"-77.0283"}	active
1321	181.65.181.70	32933	Elite	217ms	{"ip":"181.65.181.70","country":"Peru","region":"Junin","city":"Huancayo","isp":"Telefonica del Peru S.A.A.","organization":"Telefonica del Peru S.A.A.","lat":"-12.0667","long":"-75.2333"}	active
1323	209.45.111.194	45729	Elite	454ms	{"ip":"209.45.111.194","country":"Peru","region":"Lima","city":"Lima","isp":"Red Cientifica Peruana","organization":"Red Cientifica Peruana","lat":"-12.0500","long":"-77.0500"}	active
1324	190.12.95.170	30828	Elite	53ms	{"ip":"190.12.95.170","country":"Peru","region":"Lima","city":"Salamanca","isp":"OPTICAL TECHNOLOGIES S.A.C.","organization":"OPTICAL TECHNOLOGIES S.A.C.","lat":"-12.0833","long":"-77.0000"}	active
1326	112.198.21.117	80	Transparent	73ms	{"ip":"112.198.21.117","country":"Philippines","region":"Bulacan","city":"Masalipit","isp":"Globe Telecoms","organization":"Globe Telecom/Innove Communication","lat":"15.1511","long":"121.0360"}	active
1328	121.58.212.162	8080	Transparent	78ms	{"ip":"121.58.212.162","country":"Philippines","region":"Metro Manila","city":"Pasig","isp":"Converge ICT Solutions Inc.","organization":"Converge ICT Network","lat":"14.5732","long":"121.0700"}	active
1329	180.232.77.107	43153	Elite	67ms	{"ip":"180.232.77.107","country":"Philippines","region":"Metro Manila","city":"Manila","isp":"Eastern Telecoms Phils., Inc.","organization":"Eastern Telecom's DSL-Client","lat":"14.5833","long":"120.9670"}	active
1333	45.64.122.210	30262	Elite	66ms	{"ip":"45.64.122.210","country":"Philippines","region":"Metro Manila","city":"Pasig","isp":"A Multihomed ISP Company","organization":"PhilCom Corporation","lat":"14.5818","long":"121.0760"}	active
1338	202.57.55.194	43529	Elite	267ms	{"ip":"202.57.55.194","country":"Philippines","region":"Paranaque","city":"Merville","isp":"A Multihomed ISP Company","organization":"PHILCOM CORPORATION INTERNET SERVICE","lat":"14.5007","long":"121.0290"}	active
1339	210.5.106.202	60156	Elite	116ms	{"ip":"210.5.106.202","country":"Philippines","region":"Not Available","city":"Mandaluyong","isp":"Philippine Long Distance Telephone Company","organization":"Philippine Long Distance Telephone Company","lat":"14.5832","long":"121.0410"}	active
1340	182.18.200.92	8080	Transparent	733ms	{"ip":"182.18.200.92","country":"Philippines","region":"Eastern Visayas","city":"Manajao","isp":"SkyBroadband Provincial Network","organization":"PILIPINO CABLE CORPORATION","lat":"12.5036","long":"124.9540"}	active
1341	119.93.148.144	51391	Elite	278ms	{"ip":"119.93.148.144","country":"Philippines","region":"Not Available","city":"Mandaluyong","isp":"Philippine Long Distance Telephone Company","organization":"Philippine Long Distance Telephone Company","lat":"14.5832","long":"121.0410"}	active
1343	120.28.59.70	8090	Transparent	351ms	{"ip":"112.200.81.192","country":"Philippines","region":"Quezon City","city":"Malitlit","isp":"Philippine Long Distance Telephone Company","organization":"PLDT_GPKC10Ki01_DHCP","lat":"14.6333","long":"121.0000"}	active
1344	120.29.124.97	32431	Elite	221ms	{"ip":"120.29.124.97","country":"Philippines","region":"Angeles","city":"Balibago","isp":"Converge ICT Solutions Inc.","organization":"ComClark Network & Technology Corp","lat":"15.1639","long":"120.5950"}	active
1347	122.54.20.218	8090	Transparent	292ms	{"ip":"122.54.20.218","country":"Philippines","region":"Not Available","city":"Mandaluyong","isp":"Philippine Long Distance Telephone Company","organization":"1-OPNI3L_SOUTHERN LUZON STATE UNIVERSITY","lat":"14.5832","long":"121.0410"}	active
1348	103.57.227.70	53281	Elite	715ms	{"ip":"103.57.227.70","country":"Philippines","region":"Manila","city":"Makati","isp":"IT-Corea-NET, Content Provider, Quezon City, Philippines","organization":"U506 Executive Bldg 369 G. Puyat Ave cor Makati Ave","lat":"14.4595","long":"121.1580"}	active
1349	111.125.87.199	53281	Elite	480ms	{"ip":"111.125.87.199","country":"Philippines","region":"Metro Manila","city":"San Juan","isp":"Converge ICT Solutions Inc.","organization":"ConvergeICT NetBLOCK","lat":"14.6000","long":"121.0330"}	active
1352	93.125.1.183	48317	Elite	97ms	{"ip":"93.125.1.183","country":"Belarus","region":"Not Available","city":"Not Available","isp":"PE \\"NETBERRY\\"","organization":"PE NETBERRY","lat":"53.0000","long":"28.0000"}	active
1353	86.57.183.106	59929	Elite	643ms	{"ip":"86.57.183.106","country":"Belarus","region":"Vitsyebskaya Voblasts'","city":"Vitebsc","isp":"Republican Unitary Telecommunication Enterprise Beltelecom","organization":"Belarus, Vitebsk, OOO ArtWebBy","lat":"55.1904","long":"30.2049"}	active
1365	213.184.251.123	45530	Elite	155ms	{"ip":"213.184.251.123","country":"Belarus","region":"Minsk City","city":"Minsk","isp":"Velcom UE","organization":"Velcom AZS LLC","lat":"53.9000","long":"27.5667"}	active
1366	213.184.251.36	37928	Elite	55ms	{"ip":"213.184.251.36","country":"Belarus","region":"Minsk City","city":"Minsk","isp":"Velcom UE","organization":"Velcom AZS LLC","lat":"53.9000","long":"27.5667"}	active
1368	82.209.250.246	35044	Elite	135ms	{"ip":"82.209.250.246","country":"Belarus","region":"Minsk","city":"Priluki","isp":"Republican Unitary Telecommunication Enterprise Beltelecom","organization":"Republican Unitary Telecommunication Enterprise Beltelecom","lat":"53.7865","long":"27.4125"}	active
1369	46.216.45.206	53281	Elite	617ms	{"ip":"46.216.45.206","country":"Belarus","region":"Minsk City","city":"Minsk","isp":"Mobile TeleSystems JLLC","organization":"Mobile TeleSystems JLLC","lat":"53.9000","long":"27.5667"}	active
1370	91.149.142.148	37613	Elite	34ms	{"ip":"91.149.142.148","country":"Belarus","region":"Minsk City","city":"Minsk","isp":"COSMOS TV JLLC","organization":"Belarusian-American joint venture Cosmos TV, Ltd.","lat":"53.9000","long":"27.5667"}	active
1971	41.66.205.112	80	Transparent	761ms	\N	active
2057	188.165.5.140	3128	Transparent	394ms	\N	active
2081	197.234.117.126	8888	Elite	422ms	\N	active
2123	196.0.110.146	46123	Elite	82ms	\N	active
1153	89.28.38.35	8080	Transparent	294ms	{"ip":"89.28.38.35","country":"Moldova","region":"Chișinău Municipality","city":"Chisinau","isp":"StarNet Solutii SRL","organization":"StarNet Solutii SRL","lat":"47.0056","long":"28.8575"}	active
1220	213.6.148.94	42668	Elite	72ms	{"ip":"213.6.148.94","country":"Palestinian Territories","region":"Not Available","city":"Gaza","isp":"Palestine Telecommunications Company (PALTEL)","organization":"Palestine Telecommunications Company (PALTEL)","lat":"31.5000","long":"34.4667"}	active
1267	87.197.137.223	55622	Elite	155ms	{"ip":"87.197.137.223","country":"Slovakia","region":"Trencin","city":"Trenčín","isp":"Slovak Telecom, a. s.","organization":"Slovak Telecom, a. s.","lat":"48.8945","long":"18.0444"}	active
1335	203.160.182.115	58733	Elite	60ms	{"ip":"203.160.182.115","country":"Philippines","region":"Metro Manila","city":"Manila","isp":"Philippine Telegraph and Telephone Corporation,","organization":"Philippine Telegraph and Telephone Corporation","lat":"14.6000","long":"120.9670"}	active
1358	86.57.181.186	31966	Elite	212ms	{"ip":"86.57.181.186","country":"Belarus","region":"Vitsyebskaya Voblasts'","city":"Zhabinka","isp":"Republican Unitary Telecommunication Enterprise Beltelecom","organization":"BELTELECOM","lat":"55.1531","long":"27.7630"}	active
1467	185.68.5.36	44473	Elite	210ms	{"ip":"185.68.5.36","country":"Austria","region":"Oberosterreich","city":"Arbing","isp":"Elektro Puehringer GmbH","organization":"Elektro Puehringer GmbH","lat":"48.0500","long":"13.4667"}	active
1718	217.29.18.30	53155	Elite	72ms	{"ip":"217.29.18.30","country":"Kyrgyzstan","region":"Bishkek","city":"Not Available","isp":"Saimanet Telecomunications","organization":"Saimanet Telecomunications Chui 121 Bishkek, Kyrgyzstan, 720011","lat":"42.8731","long":"74.6003"}	active
2129	212.237.30.203	8888	Transparent	327ms	\N	active
2152	41.84.228.100	8080	Elite	385ms	\N	active
1373	134.17.25.211	48352	Elite	109ms	{"ip":"134.17.25.211","country":"Belarus","region":"Minsk City","city":"Minsk","isp":"Mobile TeleSystems JLLC","organization":"Mobile TeleSystems JLLC","lat":"53.9000","long":"27.5667"}	active
1374	134.17.27.214	49134	Elite	59ms	{"ip":"134.17.27.214","country":"Belarus","region":"Minsk City","city":"Minsk","isp":"Mobile TeleSystems JLLC","organization":"Mobile TeleSystems JLLC","lat":"53.9000","long":"27.5667"}	active
1376	85.206.189.249	8080	Elite	742ms	{"ip":"85.206.189.249","country":"Lithuania","region":"Kauno Apskritis","city":"Sanciai","isp":"Telia Lietuva, AB","organization":"Telia Lietuva, AB","lat":"54.8667","long":"23.9500"}	active
1378	82.135.245.222	50739	Elite	297ms	{"ip":"82.135.245.222","country":"Lithuania","region":"Vilnius","city":"Širvintos","isp":"Telia Lietuva, AB","organization":"Telia Lietuva, AB","lat":"55.0500","long":"24.9500"}	active
1379	5.20.196.90	80	Transparent	561ms	{"ip":"5.20.196.90","country":"Lithuania","region":"Vilnius","city":"Vilnius","isp":"UAB Cgates","organization":"UAB Cgates","lat":"54.6841","long":"25.3170"}	active
1380	88.119.50.248	8080	Transparent	105ms	{"ip":"88.119.50.248","country":"Lithuania","region":"Vilniaus Apskritis","city":"Salininkai","isp":"Telia Lietuva, AB","organization":"Telia Lietuva, AB","lat":"54.6000","long":"25.2667"}	active
1381	93.93.61.93	53281	Elite	71ms	{"ip":"93.93.61.93","country":"Lithuania","region":"Vilniaus Apskritis","city":"Vilnius","isp":"Ogmios centras","organization":"Ogmios centras","lat":"54.6833","long":"25.3167"}	active
1383	193.201.32.251	55520	Elite	57ms	{"ip":"193.201.32.251","country":"Lithuania","region":"Not Available","city":"Not Available","isp":"Ashburn International Ltd.","organization":"Ashburn International Ltd.","lat":"56.0000","long":"24.0000"}	active
1386	78.61.157.167	49539	Elite	153ms	{"ip":"78.61.157.167","country":"Lithuania","region":"Vilnius","city":"Vilnius","isp":"Telia Lietuva, AB","organization":"Telia Lietuva, AB","lat":"54.6918","long":"25.3302"}	active
1387	217.117.24.6	53281	Elite	194ms	{"ip":"217.117.24.6","country":"Lithuania","region":"Vilniaus Apskritis","city":"Vilnius","isp":"UAB \\"Baltnetos komunikacijos\\"","organization":"Pikselis, UAB","lat":"54.6833","long":"25.3167"}	active
1388	217.117.25.182	8080	Transparent	148ms	{"ip":"217.117.25.182","country":"Lithuania","region":"Vilniaus Apskritis","city":"Vilnius","isp":"UAB \\"Baltnetos komunikacijos\\"","organization":"\\"UAB \\"\\"Baltnetos komunikacijos\\"\\"\\"","lat":"54.6833","long":"25.3167"}	active
377	80.25.19.165	3128	Transparent	160ms	{"ip":"80.35.62.49","country":"Spain","region":"Not Available","city":"Not Available","isp":"TELEFONICA DE ESPANA","organization":"TELEFONICA DE ESPANA","lat":"40.4172","long":"-3.6840"}	active
1164	185.162.142.81	53281	Elite	82ms	{"ip":"185.162.142.81","country":"Moldova","region":"Not Available","city":"Not Available","isp":"Societatea Comerciala Click-COM SRL","organization":"Societatea Comerciala Click-COM SRL","lat":"47.0188","long":"28.8128"}	active
1306	190.234.55.135	8080	Transparent	484ms	{"ip":"190.234.55.135","country":"Peru","region":"Lima","city":"Lima","isp":"Telefonica del Peru S.A.A.","organization":"PE-TDP-GRS","lat":"-12.0500","long":"-77.0500"}	active
445	77.104.250.236	53281	Elite	83ms	{"ip":"77.104.250.236","country":"Czech Republic","region":"Liberecky kraj","city":"Jablonec Nad Nisou","isp":"CoProSys a.s.","organization":"CoProSys a.s.","lat":"50.7205","long":"15.1711"}	active
46	101.109.242.3	8080	Transparent	87ms	{"ip":"101.109.242.3","country":"Thailand","region":"Bangkok","city":"Bang Khae","isp":"TOT Public Company Limited","organization":"TOT Public Company Limited","lat":"13.7167","long":"100.4170"}	active
69	182.253.141.156	8080	Transparent	379ms	{"ip":"182.253.141.156","country":"Indonesia","region":"Central Java","city":"Semarang","isp":"BIZNET NETWORKS","organization":"Biznet ISP","lat":"-6.9931","long":"110.4210"}	active
26	1.179.189.217	8080	Transparent	112ms	{"ip":"1.179.189.217","country":"Thailand","region":"Not Available","city":"Not Available","isp":"TOT Public Company Limited","organization":"TOT Public Company Limited","lat":"13.7500","long":"100.4670"}	active
43	125.25.162.221	8080	Transparent	129ms	\N	active
6	94.23.157.1	8081	Elite	45ms	\N	active
11	46.191.226.105	3128	Elite	93ms	\N	active
1360	93.125.110.112	31959	Elite	634ms	{"ip":"93.125.110.112","country":"Belarus","region":"Minsk","city":"Masyukovshchina","isp":"The state institution The Main Economic Office of the Administrative Affairs Office of the President of the Republic of Belarus","organization":"The state institution The Main Economic Office of the Administrative Affairs Office of the President of the Republic of Belarus","lat":"53.9232","long":"27.4680"}	active
1410	212.73.77.200	38720	Elite	63ms	{"ip":"212.73.69.6","country":"Armenia","region":"Not Available","city":"Not Available","isp":"VEON Armenia CJSC","organization":"VEON Armenia CJSC","lat":"40.0000","long":"45.0000"}	active
1437	186.103.153.82	35750	Elite	246ms	{"ip":"186.103.153.82","country":"Chile","region":"Not Available","city":"Not Available","isp":"Telefonica Empresas","organization":"Telefonica Empresas","lat":"-33.4378","long":"-70.6503"}	active
1518	190.149.212.170	33777	Elite	96ms	{"ip":"190.149.212.170","country":"Guatemala","region":"Departamento de San Marcos","city":"San Marcos","isp":"Telgua","organization":"Telgua","lat":"14.9667","long":"-91.8000"}	active
1579	154.73.66.38	51029	Elite	209ms	{"ip":"154.73.66.38","country":"Tanzania","region":"Not Available","city":"Not Available","isp":"Power and Network, Backup Company Ltd","organization":"Power-and-Network","lat":"-6.8227","long":"39.2910"}	active
1176	220.90.147.137	80	Elite	42ms	\N	active
1658	81.230.228.89	80	Elite	262ms	\N	active
2271	138.185.76.78	23500	Elite	582ms	\N	active
2273	196.216.220.130	53281	Elite	70ms	\N	active
1978	41.205.24.167	8080	Transparent	169ms	\N	active
1765	179.49.118.234	3128	Transparent	116ms	\N	active
528	95.229.199.194	8080	Elite	592ms	\N	active
834	212.96.56.164	8888	Elite	168ms	\N	active
1862	103.5.173.61	8080	Transparent	529ms	\N	active
1891	186.1.3.37	52333	Elite	27ms	\N	active
1584	196.41.45.166	61226	Elite	283ms	{"ip":"196.41.45.166","country":"Tanzania","region":"Arusha","city":"Arusha","isp":"RAHA Ltd","organization":"RAHA Ltd","lat":"-3.3667","long":"36.6833"}	active
1390	84.46.167.73	42567	Elite	76ms	{"ip":"84.46.167.73","country":"Lithuania","region":"Not Available","city":"Not Available","isp":"SC Lithuanian Radio and TV Center","organization":"Point to point client networks","lat":"56.0000","long":"24.0000"}	active
1392	78.62.214.242	60678	Elite	64ms	{"ip":"78.62.214.242","country":"Lithuania","region":"Kaunas","city":"Kaunas","isp":"Telia Lietuva, AB","organization":"Telia Lietuva, AB","lat":"54.9000","long":"23.9000"}	active
1393	46.36.70.175	49797	Elite	225ms	{"ip":"46.36.70.175","country":"Lithuania","region":"Telsiu Apskritis","city":"Vieksniai","isp":"KLI LT, UAB","organization":"KLI LT, UAB","lat":"56.2333","long":"22.5167"}	active
1394	88.119.205.34	47983	Elite	120ms	{"ip":"88.119.205.34","country":"Lithuania","region":"Kaunas","city":"Kaunas","isp":"Telia Lietuva, AB","organization":"Telia Lietuva, AB","lat":"54.9000","long":"23.9000"}	active
1402	46.162.197.248	80	Anonymous	383ms	{"ip":"46.162.197.248","country":"Armenia","region":"Yerevan","city":"Yerevan","isp":"Ucom LLC","organization":"UCOM LLC","lat":"40.1811","long":"44.5136"}	active
1403	130.193.124.167	8080	Transparent	1000ms	{"ip":"5.77.252.88","country":"Armenia","region":"Yerevan","city":"Yerevan","isp":"Ucom LLC","organization":"Ucom LLC","lat":"40.1811","long":"44.5136"}	active
1404	130.193.124.146	56955	Elite	459ms	{"ip":"5.77.254.106","country":"Armenia","region":"Not Available","city":"Not Available","isp":"Ucom LLC","organization":"Ucom LLC","lat":"40.0000","long":"45.0000"}	active
1407	109.68.122.122	49263	Elite	82ms	{"ip":"109.68.122.122","country":"Armenia","region":"Ararat","city":"Darakert","isp":"ARMINCO LIMITED LIABILITY COMPANY","organization":"ARMINCO LIMITED LIABILITY COMPANY","lat":"40.1058","long":"44.4139"}	active
1359	185.204.117.26	41258	Elite	64ms	{"ip":"185.204.117.26","country":"Belarus","region":"Not Available","city":"Not Available","isp":"Adelfina LLC","organization":"Not Available","lat":"53.0000","long":"28.0000"}	active
1415	212.73.67.22	30096	Elite	197ms	{"ip":"212.73.67.22","country":"Armenia","region":"Not Available","city":"Not Available","isp":"VEON Armenia CJSC","organization":"VEON Armenia CJSC","lat":"40.0000","long":"45.0000"}	active
1417	37.252.67.184	49693	Elite	60ms	{"ip":"37.252.67.184","country":"Armenia","region":"Yerevan","city":"Yerevan","isp":"Ucom LLC","organization":"UCOM LLC.","lat":"40.1811","long":"44.5136"}	active
1418	212.42.197.170	42370	Elite	57ms	{"ip":"212.42.197.170","country":"Armenia","region":"Not Available","city":"Not Available","isp":"GNC-Alfa CJSC","organization":"GNC Alfa Retail","lat":"40.0000","long":"45.0000"}	active
1419	185.44.229.80	42007	Elite	55ms	{"ip":"185.44.229.80","country":"Armenia","region":"Yerevan","city":"Yerevan","isp":"Ucom LLC","organization":"Ucom LLC","lat":"40.1811","long":"44.5136"}	active
1422	46.162.193.21	59684	Elite	89ms	{"ip":"46.162.193.21","country":"Armenia","region":"Yerevan","city":"Yerevan","isp":"Ucom LLC","organization":"UCOM LLC","lat":"40.1811","long":"44.5136"}	active
1423	91.196.37.202	53703	Elite	77ms	{"ip":"91.196.37.202","country":"Armenia","region":"Yerevan","city":"Erebuni","isp":"BioNet LLC","organization":"BioNet LLC","lat":"40.1331","long":"44.5301"}	active
1425	94.228.29.152	8080	Transparent	83ms	{"ip":"94.228.29.152","country":"Armenia","region":"Not Available","city":"Not Available","isp":"Supercom LLC","organization":"KT 3G Network","lat":"40.0000","long":"45.0000"}	active
1428	190.96.91.243	8080	Transparent	185ms	{"ip":"164.77.134.10","country":"Chile","region":"Santiago Metropolitan","city":"Santiago","isp":"ENTEL CHILE S.A.","organization":"ENTEL CHILE S.A.","lat":"-33.4500","long":"-70.6667"}	active
1430	190.164.140.70	8080	Transparent	892ms	{"ip":"190.164.140.70","country":"Chile","region":"Santiago Metropolitan","city":"Santiago","isp":"VTR BANDA ANCHA S.A.","organization":"VTR BANDA ANCHA S.A.","lat":"-33.4500","long":"-70.6667"}	active
1432	200.54.108.54	80	Anonymous	327ms	{"ip":"200.54.108.54","country":"Chile","region":"Santiago Metropolitan","city":"Santiago","isp":"Derco S.A.","organization":"Derco S.A.","lat":"-33.4500","long":"-70.6667"}	active
1433	164.77.134.10	8080	Transparent	132ms	{"ip":"164.77.134.10","country":"Chile","region":"Santiago Metropolitan","city":"Santiago","isp":"ENTEL CHILE S.A.","organization":"ENTEL CHILE S.A.","lat":"-33.4500","long":"-70.6667"}	active
1435	186.10.19.34	58925	Elite	204ms	{"ip":"186.10.19.34","country":"Chile","region":"Santiago Metropolitan","city":"Santiago","isp":"ENTEL CHILE S.A.","organization":"ENTEL CHILE S.A.","lat":"-33.4500","long":"-70.6667"}	active
1438	200.54.44.140	45714	Elite	280ms	{"ip":"200.54.44.140","country":"Chile","region":"Santiago Metropolitan","city":"Santiago","isp":"CTC. CORP S.A. (TELEFONICA EMPRESAS)","organization":"CL-TEEMSR-LACNIC","lat":"-33.4500","long":"-70.6667"}	active
1439	190.215.110.197	51703	Elite	250ms	{"ip":"190.215.110.197","country":"Chile","region":"Santiago Metropolitan","city":"Santiago","isp":"Gtd Internet S.A.","organization":"Gtd Internet S.A.","lat":"-33.4500","long":"-70.6667"}	active
1442	190.82.82.146	48302	Elite	52ms	{"ip":"190.82.82.146","country":"Chile","region":"Region Metropolitana","city":"Santiago","isp":"Telefonica Empresas","organization":"Telefonica Empresas","lat":"-33.4500","long":"-70.6667"}	active
1443	190.171.133.35	59848	Elite	41ms	{"ip":"190.171.133.35","country":"Chile","region":"Not Available","city":"Not Available","isp":"CTC. CORP S.A. (TELEFONICA EMPRESAS)","organization":"CTC. CORP S.A. (TELEFONICA EMPRESAS)","lat":"-33.4378","long":"-70.6503"}	active
1444	190.151.126.106	58527	Elite	201ms	{"ip":"190.151.126.106","country":"Chile","region":"Santiago Metropolitan","city":"Santiago","isp":"ENTEL CHILE S.A.","organization":"ENTEL CHILE S.A.","lat":"-33.4500","long":"-70.6667"}	active
1446	164.77.77.58	61708	Elite	39ms	{"ip":"164.77.77.58","country":"Chile","region":"Not Available","city":"Not Available","isp":"ENTEL CHILE S.A.","organization":"ENTEL CHILE S.A.","lat":"-33.4378","long":"-70.6503"}	active
1448	164.77.147.93	53281	Elite	46ms	{"ip":"164.77.147.93","country":"Chile","region":"Coquimbo Region","city":"Vicuna","isp":"ENTEL CHILE S.A.","organization":"ENTEL CHILE S.A.","lat":"-30.0319","long":"-70.7081"}	active
1450	131.0.55.121	35001	Elite	325ms	{"ip":"190.216.147.70","country":"Chile","region":"Region Metropolitana","city":"Santiago","isp":"Level 3 Parent, LLC","organization":"Level 3 Parent, LLC","lat":"-33.4500","long":"-70.6667"}	active
1454	77.119.242.147	32697	Elite	218ms	{"ip":"77.119.242.147","country":"Austria","region":"Lower Austria","city":"Ternitz","isp":"Hutchison Drei Austria GmbH","organization":"APN static.drei.at","lat":"47.7157","long":"16.0357"}	active
1458	178.188.61.156	48047	Elite	210ms	{"ip":"178.188.61.156","country":"Austria","region":"Wien","city":"Vienna","isp":"A1 Telekom Austria AG","organization":"hsm edv GmbH","lat":"48.1981","long":"16.3948"}	active
1459	46.243.108.72	47221	Elite	516ms	{"ip":"46.243.108.72","country":"Austria","region":"Tyrol","city":"Imst","isp":"Stadtgemeinde/Stadtwerke Imst","organization":"Stadtgemeinde/Stadtwerke Imst","lat":"47.2450","long":"10.7397"}	active
1462	88.116.12.182	32871	Elite	53ms	{"ip":"88.116.12.182","country":"Austria","region":"Wien","city":"Vienna","isp":"A1 Telekom Austria AG","organization":"A1 Telekom Austria AG","lat":"48.1981","long":"16.3948"}	active
1464	194.208.49.64	58091	Elite	118ms	{"ip":"194.208.49.64","country":"Austria","region":"Vorarlberg","city":"Schruns","isp":"Russmedia IT GmbH","organization":"Russmedia IT GmbH","lat":"47.0611","long":"9.9378"}	active
1465	178.188.209.242	58488	Elite	157ms	{"ip":"178.188.209.242","country":"Austria","region":"Wien","city":"Vienna","isp":"A1 Telekom Austria AG","organization":"A1 Telekom Austria AG","lat":"48.1981","long":"16.3948"}	active
1466	176.96.154.150	35933	Elite	167ms	{"ip":"176.96.154.150","country":"Austria","region":"Tirol","city":"Lechaschau","isp":"Telenet Systems GmbH","organization":"Telenet Systems GmbH","lat":"47.4833","long":"10.7000"}	active
1411	217.113.17.226	44820	Elite	48ms	{"ip":"217.113.17.226","country":"Armenia","region":"Aragatsotn","city":"Aparan","isp":"GNC-Alfa CJSC","organization":"GNC-Alfa CJSC","lat":"40.5932","long":"44.3589"}	active
1483	60.54.119.89	53281	Elite	788ms	{"ip":"60.54.119.89","country":"Malaysia","region":"Kuala Lumpur","city":"Kuala Lumpur","isp":"TMnet, Telekom Malaysia","organization":"TMNST","lat":"3.1340","long":"101.6870"}	active
1484	121.122.43.161	52890	Elite	475ms	{"ip":"175.139.190.165","country":"Malaysia","region":"Selangor","city":"Seri Kembangan","isp":"TMnet, Telekom Malaysia","organization":"TMNST","lat":"3.0383","long":"101.7090"}	active
1489	61.6.50.119	53281	Elite	841ms	{"ip":"61.6.50.119","country":"Malaysia","region":"Selangor","city":"Puchong","isp":"TIME dotCom Berhad","organization":"TIME dotCom Berhad","lat":"3.0757","long":"101.6200"}	active
1490	223.25.252.22	53281	Elite	144ms	{"ip":"223.25.252.22","country":"Bangladesh","region":"Rangpur Division","city":"Rangpur City","isp":"Maya Cyber World","organization":"Maya Cyber World","lat":"25.7320","long":"89.2649"}	active
1494	45.121.38.189	46685	Elite	220ms	{"ip":"103.61.124.37","country":"Malaysia","region":"Kuala Lumpur","city":"Kuala Lumpur","isp":"YTL Communications Sdn Bhd","organization":"YTL Broadband Sdn. Bhd","lat":"3.1911","long":"101.6930"}	active
1495	1.9.167.36	38697	Elite	182ms	{"ip":"1.9.167.35","country":"Malaysia","region":"Terengganu","city":"Kuala Terengganu","isp":"TMnet, Telekom Malaysia","organization":"Tmnet, Telekom Malaysia Bhd.","lat":"5.3165","long":"103.1250"}	active
1496	115.164.151.7	50870	Elite	65ms	{"ip":"115.164.151.7","country":"Malaysia","region":"Selangor","city":"Bandar","isp":"DiGi Telecommunications Sdn. Bhd.","organization":"DiGi Telecommunications Sdn Bhd","lat":"2.7526","long":"101.7670"}	active
1504	190.149.165.154	32452	Elite	217ms	{"ip":"190.149.165.154","country":"Guatemala","region":"Departamento de Guatemala","city":"Guatemala City","isp":"Telgua","organization":"Telgua","lat":"14.6328","long":"-90.5199"}	active
1506	190.115.1.181	60846	Elite	29ms	{"ip":"190.115.1.181","country":"Mexico","region":"Veracruz-Llave","city":"Banderilla","isp":"UFINET PANAMA S.A.","organization":"UFINET PANAMA S.A.","lat":"19.5833","long":"-96.9333"}	active
1508	186.151.177.102	36442	Elite	275ms	{"ip":"186.151.177.102","country":"Guatemala","region":"Sacatepequez","city":"Antigua","isp":"Telgua","organization":"Telgua","lat":"14.5611","long":"-90.7344"}	active
1516	190.122.187.230	55578	Elite	19ms	{"ip":"190.122.187.230","country":"Guatemala","region":"Guatemala","city":"Santa Catarina Pinula","isp":"CABLECOLOR S.A.","organization":"MEGARED","lat":"14.5689","long":"-90.4953"}	active
1519	190.149.216.246	56587	Elite	353ms	{"ip":"190.149.216.246","country":"Guatemala","region":"Departamento de Guatemala","city":"Villa Canales","isp":"Telgua","organization":"Telgua","lat":"14.4814","long":"-90.5317"}	active
1524	190.149.165.162	51489	Elite	192ms	{"ip":"190.149.165.162","country":"Guatemala","region":"Departamento de Guatemala","city":"Guatemala City","isp":"Telgua","organization":"Telgua","lat":"14.6328","long":"-90.5199"}	active
1551	185.107.50.1	8080	Transparent	286ms	{"ip":"185.107.48.1","country":"Lebanon","region":"Beyrouth","city":"Beirut","isp":"Libalink SARL","organization":"Libalink SARL","lat":"33.8719","long":"35.5097"}	active
1554	92.62.175.2	59461	Elite	263ms	{"ip":"92.62.175.2","country":"Lebanon","region":"Beyrouth","city":"Beirut","isp":"Transmog Inc S.A.L","organization":"dsl","lat":"33.8719","long":"35.5097"}	active
1556	77.42.244.177	42629	Elite	92ms	{"ip":"94.187.60.201","country":"Lebanon","region":"Beyrouth","city":"Beirut","isp":"LIBANTELECOM","organization":"2nd allocation inetnum8","lat":"33.8719","long":"35.5097"}	active
1557	141.105.86.130	39806	Transparent	66ms	{"ip":"141.105.86.130","country":"Lebanon","region":"Mont-Liban","city":"Bhamdoûn","isp":"Transmog Inc S.A.L","organization":"CYBERIA-3G","lat":"33.7958","long":"35.6497"}	active
1559	85.112.71.26	49855	Elite	94ms	{"ip":"85.112.71.26","country":"Lebanon","region":"Beyrouth","city":"Beirut","isp":"Asesoft International SA","organization":"TerraNet sal","lat":"33.8719","long":"35.5097"}	active
1562	194.126.25.28	57709	Elite	158ms	{"ip":"194.126.25.28","country":"Lebanon","region":"Beyrouth","city":"Beirut","isp":"IncoNet Data Management sal","organization":"IncoNet Data Management sal","lat":"33.8719","long":"35.5097"}	active
1564	85.112.70.126	59016	Transparent	424ms	{"ip":"85.112.70.126","country":"Lebanon","region":"Not Available","city":"Not Available","isp":"TerraNet sal","organization":"TerraNet sal","lat":"33.8333","long":"35.8333"}	active
1566	185.156.213.146	46709	Transparent	669ms	{"ip":"185.156.213.146","country":"Lebanon","region":"Not Available","city":"Not Available","isp":"WI-TECH wireless technologies S.A.R.L","organization":"WI-TECH wireless technologies S.A.R.L","lat":"33.8333","long":"35.8333"}	active
1567	185.104.252.9	9090	Elite	412ms	{"ip":"185.104.252.9","country":"Lebanon","region":"Not Available","city":"Not Available","isp":"B SMART.NET S.A.R.L","organization":"B SMART.NET S.A.R.L","lat":"33.8333","long":"35.8333"}	active
1569	212.22.80.224	34822	Elite	62ms	{"ip":"212.22.80.224","country":"Russia","region":"Dagestan","city":"Derbent","isp":"LLC Perepelka","organization":"Not Available","lat":"42.0558","long":"48.2903"}	active
1571	185.107.49.1	8080	Transparent	423ms	{"ip":"185.107.48.1","country":"Lebanon","region":"Beyrouth","city":"Beirut","isp":"Libalink SARL","organization":"Libalink SARL","lat":"33.8719","long":"35.5097"}	active
1572	77.42.155.117	61386	Elite	83ms	{"ip":"77.42.222.102","country":"Lebanon","region":"Mont-Liban","city":"Monteverde","isp":"LIBANTELECOM","organization":"OGERO ISP Needs 2","lat":"33.8500","long":"35.5900"}	active
1574	185.107.51.1	8080	Transparent	228ms	{"ip":"185.107.51.1","country":"Lebanon","region":"Not Available","city":"Not Available","isp":"Libalink SARL","organization":"Libalink SARL","lat":"33.8333","long":"35.8333"}	active
1575	185.82.96.131	23500	Elite	48ms	{"ip":"185.82.96.131","country":"Lebanon","region":"Liban-Nord","city":"Tripoli","isp":"NET 360 S.A.R.L","organization":"NET 360 S.A.R.L","lat":"34.4333","long":"35.8500"}	active
1475	85.238.167.170	41440	Elite	78ms	{"ip":"85.238.167.170","country":"Austria","region":"Styria","city":"Frohnleiten","isp":"Stadtwerke Kapfenberg","organization":"Stadtwerke Kapfenberg","lat":"47.2667","long":"15.3167"}	active
1585	196.41.62.186	54483	Elite	130ms	{"ip":"196.41.62.186","country":"Tanzania","region":"Dar es Salaam Region","city":"Dar es Salaam","isp":"RAHA Ltd","organization":"Startel (T) Ltd - RAHA","lat":"-6.8000","long":"39.2833"}	active
1588	154.72.86.243	51966	Elite	100ms	{"ip":"154.72.86.243","country":"Tanzania","region":"Not Available","city":"Not Available","isp":"RAHA Ltd","organization":"RAHA Ltd","lat":"-6.8227","long":"39.2910"}	active
1589	41.220.129.45	51702	Elite	122ms	{"ip":"41.220.129.45","country":"Tanzania","region":"Not Available","city":"Not Available","isp":"Habari Node Public Limited","organization":"Habari Node Ltd","lat":"-6.8227","long":"39.2910"}	active
1591	154.72.87.34	57561	Elite	289ms	{"ip":"154.72.87.34","country":"Tanzania","region":"Not Available","city":"Not Available","isp":"RAHA Ltd","organization":"RAHA Ltd","lat":"-6.8227","long":"39.2910"}	active
1592	41.222.57.164	53281	Elite	206ms	{"ip":"41.222.57.164","country":"Tanzania","region":"Not Available","city":"Not Available","isp":"Arusha Art Limited","organization":"Cybernet wirelessISP Network","lat":"-6.8227","long":"39.2910"}	active
1593	41.75.211.203	38515	Elite	52ms	{"ip":"41.75.211.203","country":"Tanzania","region":"Not Available","city":"Not Available","isp":"Airtel Tanzania","organization":"Airtel Tanzania","lat":"-6.8227","long":"39.2910"}	active
1594	154.72.82.250	23500	Elite	113ms	{"ip":"154.72.82.250","country":"Tanzania","region":"Not Available","city":"Not Available","isp":"RAHA Ltd","organization":"RAHA Ltd","lat":"-6.8227","long":"39.2910"}	active
1595	154.72.82.186	23500	Elite	174ms	{"ip":"154.72.66.106","country":"Tanzania","region":"Not Available","city":"Not Available","isp":"RAHA Ltd","organization":"Simply Computers (T) Ltd","lat":"-6.8227","long":"39.2910"}	active
1597	41.59.209.36	48457	Elite	278ms	{"ip":"41.59.209.36","country":"Tanzania","region":"Kigoma","city":"Kasulu","isp":"TANZANIA TELECOMMUNICATIONS CO. LTD","organization":"TANZANIA TELECOMMUNICATIONS CO. LTD","lat":"-4.5767","long":"30.1025"}	active
1598	154.72.84.212	43827	Elite	86ms	{"ip":"154.72.84.212","country":"Tanzania","region":"Not Available","city":"Not Available","isp":"RAHA Ltd","organization":"RAHA Ltd","lat":"-6.8227","long":"39.2910"}	active
1600	41.188.149.42	8080	Elite	1000ms	{"ip":"41.188.149.42","country":"Tanzania","region":"Not Available","city":"Not Available","isp":"Simbanet (T) Limited","organization":"Simbanet (T) Limited","lat":"-6.8227","long":"39.2910"}	active
1601	200.105.209.170	443	Transparent	297ms	{"ip":"200.105.209.170","country":"Bolivia","region":"Departamento de La Paz","city":"La Paz","isp":"AXS Bolivia S. A.","organization":"AXS Bolivia S. A.","lat":"-16.5000","long":"-68.1500"}	active
1602	186.121.247.131	8080	Transparent	1000ms	{"ip":"186.121.247.131","country":"Bolivia","region":"Departamento de La Paz","city":"La Paz","isp":"AXS Bolivia S. A.","organization":"AXS Bolivia S. A.","lat":"-16.5000","long":"-68.1500"}	active
1605	181.115.241.90	8080	Transparent	613ms	{"ip":"181.115.241.90","country":"Bolivia","region":"Departamento de Pando","city":"Cobija","isp":"Entel S.A. - EntelNet","organization":"Entel S.A. - EntelNet","lat":"-11.0333","long":"-68.7333"}	active
1606	200.119.203.242	43076	Elite	87ms	{"ip":"200.119.203.242","country":"Bolivia","region":"Santa Cruz","city":"Santa Cruz De La Sierra","isp":"COTAS LTDA.","organization":"COTAS LTDA.","lat":"-17.8000","long":"-63.1667"}	active
1611	181.188.181.186	23500	Elite	219ms	{"ip":"181.188.181.186","country":"Bolivia","region":"Departamento de La Paz","city":"La Paz","isp":"Telefónica Celular de Bolivia S.A.","organization":"Telefónica Celular de Bolivia S.A.","lat":"-16.5000","long":"-68.1500"}	active
1614	190.186.132.204	8080	Transparent	360ms	{"ip":"190.186.132.204","country":"Bolivia","region":"Santa Cruz","city":"Hamacas","isp":"COTAS LTDA.","organization":"COTAS LTDA.","lat":"-17.7333","long":"-63.1833"}	active
1621	181.115.185.42	8080	Transparent	66ms	{"ip":"181.115.185.42","country":"Bolivia","region":"Departamento de Chuquisaca","city":"Sucre","isp":"Entel S.A. - EntelNet","organization":"Entel S.A. - EntelNet","lat":"-19.0431","long":"-65.2592"}	active
1622	200.119.209.85	53231	Elite	52ms	{"ip":"200.119.209.85","country":"Bolivia","region":"Cochabamba","city":"Cochabamba","isp":"COTAS LTDA.","organization":"COTAS LTDA.","lat":"-17.3833","long":"-66.1500"}	active
1624	181.115.183.170	56500	Elite	74ms	{"ip":"181.115.183.170","country":"Bolivia","region":"Departamento de La Paz","city":"La Paz","isp":"Entel S.A. - EntelNet","organization":"Entel S.A. - EntelNet","lat":"-16.5000","long":"-68.1500"}	active
1626	190.218.161.2	3128	Transparent	81ms	{"ip":"190.218.161.2","country":"Panama","region":"Provincia de Panama","city":"Panama City","isp":"Cable Onda","organization":"Cable Onda","lat":"8.9936","long":"-79.5197"}	active
1631	186.96.112.38	999	Transparent	456ms	{"ip":"186.96.112.38","country":"Colombia","region":"Distrito Especial","city":"Bogotá","isp":"TV AZTECA SUCURSAL COLOMBIA","organization":"TV AZTECA SUCURSAL COLOMBIA","lat":"4.6492","long":"-74.0628"}	active
1635	186.96.103.14	38857	Elite	199ms	{"ip":"186.96.103.14","country":"Colombia","region":"Distrito Especial","city":"Bogotá","isp":"TV AZTECA SUCURSAL COLOMBIA","organization":"TV AZTECA SUCURSAL COLOMBIA","lat":"4.6492","long":"-74.0628"}	active
1636	186.148.168.94	33019	Elite	207ms	{"ip":"186.148.168.94","country":"Colombia","region":"Antioquia","city":"Medellín","isp":"TV AZTECA SUCURSAL COLOMBIA","organization":"TV AZTECA SUCURSAL COLOMBIA","lat":"6.2518","long":"-75.5636"}	active
1580	154.72.84.51	52042	Elite	110ms	{"ip":"154.72.84.51","country":"Tanzania","region":"Not Available","city":"Not Available","isp":"RAHA Ltd","organization":"RAHA Ltd","lat":"-6.8227","long":"39.2910"}	active
1645	200.124.9.206	55952	Elite	138ms	{"ip":"200.124.9.206","country":"Panama","region":"Panama","city":"Carrasquilla","isp":"Cable Onda","organization":"Cable Onda","lat":"9.0000","long":"-79.5167"}	active
1646	201.218.64.130	44595	Elite	230ms	{"ip":"201.218.64.130","country":"Panama","region":"Panama Oeste","city":"La Chorrera","isp":"Cable Onda","organization":"Cable Onda","lat":"8.8803","long":"-79.7833"}	active
1647	186.96.102.250	999	Transparent	376ms	{"ip":"186.96.102.250","country":"Colombia","region":"Distrito Especial","city":"Bogotá","isp":"TV AZTECA SUCURSAL COLOMBIA","organization":"TV AZTECA SUCURSAL COLOMBIA","lat":"4.6492","long":"-74.0628"}	active
1650	190.5.225.178	45133	Elite	57ms	{"ip":"190.5.225.178","country":"Panama","region":"Panama","city":"Panama City","isp":"Cable Onda","organization":"Cable Onda","lat":"8.9667","long":"-79.5333"}	active
1654	92.244.209.86	57412	Elite	274ms	{"ip":"92.244.209.86","country":"Sweden","region":"Jönköping","city":"Bredaryd","isp":"Varnamo Energi AB","organization":"Varnamo Energi AB - Dynamic customers","lat":"57.1667","long":"13.7333"}	active
1657	158.174.63.117	39761	Elite	40ms	{"ip":"158.174.63.117","country":"Sweden","region":"Skåne","city":"OErkelljunga","isp":"Bahnhof AB","organization":"Bahnhof AB","lat":"56.2834","long":"13.2777"}	active
1659	84.217.82.227	60702	Elite	49ms	{"ip":"84.217.82.227","country":"Sweden","region":"Stockholms Lan","city":"Skeppsholmen","isp":"Telenor Norge AS","organization":"Ownit Broadband AB","lat":"59.3167","long":"18.0833"}	active
1660	31.13.15.94	21776	Elite	62ms	{"ip":"31.13.15.94","country":"Sweden","region":"Kronoberg","city":"Ljungby","isp":"Systempartner i Ljungby AB","organization":"Systempartner i Ljungby AB","lat":"56.8332","long":"13.9408"}	active
1662	217.10.117.58	52606	Elite	297ms	{"ip":"217.10.117.57","country":"Sweden","region":"Västra Götaland","city":"Alingsas","isp":"Net at Once Sweden AB","organization":"Net at Once Sweden AB","lat":"57.9303","long":"12.5334"}	active
1663	212.112.177.186	55211	Elite	276ms	{"ip":"212.112.177.186","country":"Sweden","region":"Östergötland","city":"Mjoelby","isp":"IP-Only Networks AB","organization":"IP-Only Networks AB","lat":"58.3259","long":"15.1236"}	active
1664	90.225.86.74	50206	Elite	76ms	{"ip":"90.225.86.74","country":"Sweden","region":"Västra Götaland","city":"Älvängen","isp":"Telia Company AB","organization":"Telia Company AB","lat":"57.9667","long":"12.1167"}	active
1668	85.30.48.222	30228	Elite	49ms	{"ip":"85.30.48.222","country":"Sweden","region":"Hallands Lan","city":"Fyllinge","isp":"A3 Sverige AB","organization":"AllTele Broadband Hitnet","lat":"56.6500","long":"12.9167"}	active
1669	213.65.167.62	39470	Elite	83ms	{"ip":"213.65.167.62","country":"Sweden","region":"Kronoberg","city":"Markaryd","isp":"Telia Company AB","organization":"Telia Network services","lat":"56.4614","long":"13.5964"}	active
1671	31.208.19.143	54671	Elite	77ms	{"ip":"31.208.19.143","country":"Sweden","region":"Vastra Gotaland","city":"Gräfsnäs","isp":"Bredband2 AB","organization":"Bredband2 AB","lat":"58.0833","long":"12.4833"}	active
1673	217.70.39.12	80	Elite	830ms	{"ip":"217.70.39.12","country":"Sweden","region":"Stockholms Lan","city":"Solna","isp":"Levonline AB","organization":"Levonline AB","lat":"59.3600","long":"18.0009"}	active
1675	46.59.56.191	39791	Elite	269ms	{"ip":"46.59.56.191","country":"Sweden","region":"Västra Götaland","city":"Alvhem","isp":"Bahnhof AB","organization":"Bahnhof AB","lat":"58.0000","long":"12.1500"}	active
1676	103.48.116.106	80	Anonymous	621ms	{"ip":"103.48.116.106","country":"Mongolia","region":"Not Available","city":"Not Available","isp":"National Data Center building","organization":"National Data Center of Mongolia","lat":"46.0000","long":"105.0000"}	active
1683	202.179.3.210	49405	Elite	265ms	{"ip":"202.179.3.210","country":"Mongolia","region":"Not Available","city":"Not Available","isp":"Mongolia Telecom","organization":"Mongolia Telecom","lat":"46.0000","long":"105.0000"}	active
1686	202.131.248.94	49255	Elite	212ms	{"ip":"202.131.248.94","country":"Mongolia","region":"Ulaanbaatar Hot","city":"Ulan Bator","isp":"Mobinet ISP, MobiCom Corporation","organization":"Mobinet LLC","lat":"47.9167","long":"106.9170"}	active
1687	203.91.112.45	8080	Transparent	544ms	{"ip":"203.91.112.45","country":"Mongolia","region":"Ulaanbaatar Hot","city":"Ulan Bator","isp":"G-Mobile Corporation","organization":"G-Mobile, Baga-Toiruu 3/9, Chingeltei district-1,","lat":"47.9167","long":"106.9170"}	active
1690	183.81.168.30	38539	Elite	74ms	{"ip":"183.81.168.30","country":"Mongolia","region":"Ulaanbaatar Hot","city":"Ulan Bator","isp":"Homenet","organization":"Homenet","lat":"47.9167","long":"106.9170"}	active
1692	202.179.3.14	51272	Elite	1ms	{"ip":"202.179.3.14","country":"Mongolia","region":"Not Available","city":"Not Available","isp":"Mongolia Telecom","organization":"Mongolia Telecom","lat":"46.0000","long":"105.0000"}	active
1694	202.131.229.98	50909	Elite	471ms	{"ip":"202.131.229.98","country":"Mongolia","region":"Ulaanbaatar Hot","city":"Ulan Bator","isp":"Mobinet ISP, MobiCom Corporation","organization":"Mobinet LLC","lat":"47.9167","long":"106.9170"}	active
1695	43.242.242.196	8080	Transparent	305ms	{"ip":"43.242.242.196","country":"Mongolia","region":"Ulaanbaatar Hot","city":"Ulan Bator","isp":"The first E-commerce and TriplePlay Service ISP in Mongolia.","organization":"The first E-commerce and TriplePlay Service ISP in Mongolia.","lat":"47.9167","long":"106.9170"}	active
1637	186.148.166.246	999	Transparent	523ms	{"ip":"186.148.166.246","country":"Colombia","region":"Not Available","city":"Not Available","isp":"TV AZTECA SUCURSAL COLOMBIA","organization":"TV AZTECA SUCURSAL COLOMBIA","lat":"4.5981","long":"-74.0758"}	active
1701	158.181.17.191	54820	Elite	171ms	{"ip":"158.181.17.191","country":"Kyrgyzstan","region":"Gorod Bishkek","city":"Bishkek","isp":"Mega-Line Ltd.","organization":"MEGALINE-NET-LTE","lat":"42.8731","long":"74.6003"}	active
1704	92.62.72.23	56115	Elite	218ms	{"ip":"92.62.72.23","country":"Kyrgyzstan","region":"Not Available","city":"Not Available","isp":"Saimanet Telecomunications","organization":"Saimanet Telecomunications","lat":"41.0000","long":"75.0000"}	active
1705	81.20.22.30	61065	Elite	70ms	{"ip":"81.20.22.30","country":"Kyrgyzstan","region":"Not Available","city":"Not Available","isp":"comintech","organization":"comintech","lat":"41.0000","long":"75.0000"}	active
1706	213.145.145.78	46079	Elite	242ms	{"ip":"89.237.192.133","country":"Kyrgyzstan","region":"Osh","city":"Osh","isp":"OJSC Kyrgyztelecom","organization":"KYRGYZTELEKOM-PPPOE-OSH","lat":"40.5294","long":"72.7900"}	active
1709	158.181.18.136	56073	Elite	83ms	{"ip":"158.181.18.136","country":"Kyrgyzstan","region":"Gorod Bishkek","city":"Bishkek","isp":"Mega-Line Ltd.","organization":"MEGALINE-NET-LTE","lat":"42.8731","long":"74.6003"}	active
1712	91.205.51.27	60916	Elite	65ms	{"ip":"91.205.51.27","country":"Kyrgyzstan","region":"Bishkek","city":"Tokol'dosh","isp":"FastNet Ltd.","organization":"FastNet Ltd.","lat":"42.8667","long":"74.6333"}	active
1714	212.112.110.101	30630	Elite	62ms	{"ip":"212.112.110.101","country":"Kyrgyzstan","region":"Gorod Bishkek","city":"Bishkek","isp":"AKNET Ltd.","organization":"AKNET Educational and Science","lat":"42.8667","long":"74.6000"}	active
1715	158.181.19.142	57461	Elite	63ms	{"ip":"158.181.19.142","country":"Kyrgyzstan","region":"Not Available","city":"Not Available","isp":"Mega-Line Ltd.","organization":"MEGALINE-NET-LTE","lat":"41.0000","long":"75.0000"}	active
1716	31.186.53.149	32231	Elite	220ms	{"ip":"31.186.53.149","country":"Kyrgyzstan","region":"Gorod Bishkek","city":"Bishkek","isp":"AKNET Ltd.","organization":"AKNET Ltd.","lat":"42.8731","long":"74.6003"}	active
1719	46.235.74.101	30546	Elite	74ms	{"ip":"46.235.75.251","country":"Kyrgyzstan","region":"Bishkek","city":"Bishkek","isp":"GlobalAsia Telecom Ltd","organization":"GlobalAsia Telecom Ltd","lat":"42.8731","long":"74.6003"}	active
1721	158.181.16.205	54820	Elite	199ms	{"ip":"158.181.17.191","country":"Kyrgyzstan","region":"Gorod Bishkek","city":"Bishkek","isp":"Mega-Line Ltd.","organization":"MEGALINE-NET-LTE","lat":"42.8731","long":"74.6003"}	active
1724	176.108.57.160	41702	Elite	47ms	{"ip":"176.108.57.160","country":"Bosnia & Herzegovina","region":"Federation of Bosnia and Herzegovina","city":"Vrazici","isp":"Telesat d.o.o.","organization":"DSL-Elektronika d.o.o.","lat":"44.7397","long":"18.7461"}	active
1725	185.50.56.230	32231	Elite	429ms	{"ip":"185.50.56.230","country":"Bosnia & Herzegovina","region":"Federation of Bosnia and Herzegovina","city":"Simin Han","isp":"SOFTNET d.o.o.","organization":"NEON SOLUCIJE d.o.o. za telekomunikacije, inzinjering, konsalting i usluge","lat":"44.5313","long":"18.7584"}	active
1726	95.47.212.118	49616	Elite	77ms	{"ip":"95.47.212.118","country":"Bosnia & Herzegovina","region":"Republika Srpska","city":"Not Available","isp":"Telesat d.o.o.","organization":"DSL-Elektronika d.o.o.","lat":"44.9561","long":"18.3020"}	active
1728	81.93.73.25	8080	Elite	122ms	{"ip":"81.93.73.25","country":"Bosnia & Herzegovina","region":"Republika Srpska","city":"Tanackovici","isp":"\\"Telekomunikacije Republike Srpske\\" akcionarsko drustvo Banja Luka","organization":"Telekomunikacije Republike Srpske akcionarsko drustvo Banja Luka","lat":"44.4367","long":"19.1178"}	active
1729	93.157.196.90	39016	Elite	249ms	{"ip":"93.157.196.90","country":"Bosnia & Herzegovina","region":"Federation of B&H","city":"Gradacac","isp":"Telesat d.o.o.","organization":"DSL-Elektronika d.o.o.","lat":"44.8785","long":"18.4276"}	active
1736	195.222.61.29	43655	Elite	192ms	{"ip":"195.222.61.29","country":"Bosnia & Herzegovina","region":"Federation of Bosnia and Herzegovina","city":"Sarajevo","isp":"BH Telecom d.d. Sarajevo","organization":"BH Telecom d.d. Sarajevo","lat":"43.8500","long":"18.3833"}	active
1737	109.175.29.7	23500	Elite	63ms	{"ip":"109.175.29.7","country":"Bosnia & Herzegovina","region":"Federation of B&H","city":"Zepce","isp":"BH Telecom d.d. Sarajevo","organization":"Wirac.net d.o.o","lat":"44.4267","long":"18.0378"}	active
1739	81.93.71.178	53281	Elite	212ms	{"ip":"81.93.71.178","country":"Bosnia & Herzegovina","region":"Republika Srpska","city":"Banja Vrucica","isp":"\\"Telekomunikacije Republike Srpske\\" akcionarsko drustvo Banja Luka","organization":"Telekomunikacije Republike Srpske akcionarsko drustvo","lat":"44.5906","long":"17.8794"}	active
1742	95.47.221.225	30551	Elite	55ms	{"ip":"95.47.221.225","country":"Bosnia & Herzegovina","region":"Republika Srpska","city":"Not Available","isp":"Telesat d.o.o.","organization":"DSL-Elektronika d.o.o.","lat":"44.9561","long":"18.3020"}	active
1747	164.163.72.58	999	Transparent	225ms	{"ip":"164.163.72.58","country":"Honduras","region":"Copan","city":"Santa Rosa De Copán","isp":"GRUPO INMA S.A","organization":"DISER SOLUTION","lat":"14.7667","long":"-88.7833"}	active
1232	118.140.150.74	3128	Anonymous	57ms	{"ip":"118.140.151.98","country":"Hong Kong SAR China","region":"HONG KONG","city":"Ma Tau Kok","isp":"HGC Global Communications Limited","organization":"HGC Global Communications Limited","lat":"22.3167","long":"114.1830"}	active
144	103.72.217.173	8080	Elite	205ms	{"ip":"103.72.217.173","country":"India","region":"Manipur","city":"Imphal","isp":"Soibam Technology Private Limited","organization":"Soibam Technology Private Limited","lat":"24.8167","long":"93.9500"}	active
1699	43.242.242.176	43203	Elite	87ms	{"ip":"43.242.242.176","country":"Mongolia","region":"Ulaanbaatar Hot","city":"Ulan Bator","isp":"The first E-commerce and TriplePlay Service ISP in Mongolia.","organization":"The first E-commerce and TriplePlay Service ISP in Mongolia.","lat":"47.9167","long":"106.9170"}	active
1431	200.27.12.83	8080	Transparent	600ms	{"ip":"200.27.12.83","country":"Chile","region":"Santiago Metropolitan","city":"Santiago","isp":"Telmex Chile Internet S.A.","organization":"Telmex Chile Internet S.A.","lat":"-33.4500","long":"-70.6667"}	active
1493	175.139.218.221	35732	Elite	92ms	{"ip":"175.139.218.221","country":"Malaysia","region":"Johor","city":"Masai","isp":"TMnet, Telekom Malaysia","organization":"TMNST","lat":"1.5641","long":"103.7840"}	active
1596	154.72.79.252	41230	Elite	121ms	{"ip":"154.72.79.252","country":"Tanzania","region":"Dar es Salaam","city":"Kinondoni","isp":"RAHA Ltd","organization":"RAHA Ltd","lat":"-6.7833","long":"39.2667"}	active
323	175.100.16.215	41986	Elite	46ms	{"ip":"175.100.16.215","country":"Cambodia","region":"Phnom Penh","city":"Phnom Penh","isp":"ISP/IXP IN CAMBODIA WITH THE BEST VERVICE IN THERE.","organization":"VIETTEL (CAMBODIA) PTE., LTD.","lat":"11.5625","long":"104.9160"}	active
428	82.209.49.194	8080	Transparent	764ms	{"ip":"82.209.49.200","country":"Czech Republic","region":"Moravskoslezsky kraj","city":"Havířov","isp":"PODA a.s.","organization":"PODA a.s.","lat":"49.8500","long":"18.3667"}	active
532	185.68.195.104	8080	Transparent	662ms	{"ip":"185.68.195.103","country":"Italy","region":"Campania","city":"Angri","isp":"Cogent Communications","organization":"Cogent Communications","lat":"40.7333","long":"14.5667"}	active
172	194.44.246.82	8080	Transparent	106ms	{"ip":"194.44.246.82","country":"Ukraine","region":"L'vivs'ka Oblast'","city":"Lviv","isp":"State Enterprise Scientific and Telecommunication Centre Ukrainian Academic and Research Network of the Institute for Condensed Matter Physics of the National Academy of Science of Ukraine (UARNet)","organization":"UARNet","lat":"49.8383","long":"24.0232"}	active
243	181.143.204.2	8080	Transparent	76ms	{"ip":"181.143.204.2","country":"Colombia","region":"Not Available","city":"Not Available","isp":"EPM Telecomunicaciones S.A. E.S.P.","organization":"EPM Telecomunicaciones S.A. E.S.P.","lat":"4.5981","long":"-74.0758"}	active
304	103.14.250.219	8080	Elite	262ms	{"ip":"103.14.250.219","country":"Cambodia","region":"Phnom Penh","city":"Phnom Penh","isp":"SINET, Cambodia's specialist Internet and Telecom Service Provider.","organization":"SINET, Dedicated Fiber, Dedicated Speed, Dedicated Support, Dedicated Always.","lat":"11.5625","long":"104.9160"}	active
327	197.81.195.28	3128	Transparent	88ms	{"ip":"197.81.195.28","country":"South Africa","region":"Gauteng","city":"Centurion","isp":"Dimension Data (Pty) Ltd - Optinet","organization":"Dimension Data (Pty) Ltd - Optinet","lat":"-25.8744","long":"28.1706"}	active
414	200.50.240.120	4444	Transparent	152ms	{"ip":"200.50.240.4","country":"Argentina","region":"Buenos Aires","city":"Marcos Paz","isp":"RSONet","organization":"RSONet","lat":"-34.7806","long":"-58.8374"}	active
481	212.174.201.70	9090	Transparent	379ms	{"ip":"212.174.201.70","country":"Turkey","region":"Sakarya","city":"Sakarya","isp":"Turk Telekomunikasyon Anonim Sirketi","organization":"Turk Telekomunikasyon Anonim Sirketi","lat":"40.6532","long":"30.4397"}	active
541	83.211.86.245	32541	Elite	70ms	{"ip":"83.211.86.242","country":"Italy","region":"Liguria","city":"Sarzana","isp":"CLOUDITALIA TELECOMUNICAZIONI S.P.A.","organization":"CLOUDITALIA TELECOMUNICAZIONI S.P.A.","lat":"44.1167","long":"9.9667"}	active
101	173.0.96.46	34746	Elite	56ms	{"ip":"173.0.96.46","country":"United States","region":"Virginia","city":"Lancaster","isp":"Northern Neck Wireless Internet Services LLC","organization":"Northern Neck Wireless Internet Services LLC","lat":"37.7395","long":"-76.5002"}	active
558	51.255.58.83	8080	Elite	376ms	{"ip":"51.255.58.83","country":"India","region":"Andhra Pradesh","city":"Hyderabad","isp":"OVH SAS","organization":"OVH SAS","lat":"17.3753","long":"78.4744"}	active
562	37.187.99.146	3128	Transparent	256ms	{"ip":"37.187.99.146","country":"France","region":"Nord-Pas-de-Calais","city":"Roubaix","isp":"OVH SAS","organization":"OVH SAS","lat":"50.6942","long":"3.1746"}	active
666	178.62.203.177	8080	Transparent	44ms	{"ip":"178.62.203.177","country":"Netherlands","region":"Noord-Holland","city":"Amsterdam","isp":"DigitalOcean, LLC","organization":"DigitalOcean Amsterdam","lat":"52.3666","long":"4.9027"}	active
691	188.255.187.222	8080	Transparent	123ms	{"ip":"188.255.187.222","country":"Serbia","region":"Belgrade","city":"Belgrade","isp":"Orion Telekom Tim d.o.o.Beograd","organization":"Orion Telekom Tim IP Network in Pancevo","lat":"44.8186","long":"20.4681"}	active
736	217.30.77.209	53281	Elite	97ms	{"ip":"217.30.64.26","country":"Czech Republic","region":"Hlavni mesto Praha","city":"Prague","isp":"Planet A, a.s.","organization":"Planet A, a.s.","lat":"50.1167","long":"14.5000"}	active
797	190.202.22.146	8888	Transparent	214ms	{"ip":"190.202.22.146","country":"Venezuela","region":"Nueva Esparta","city":"El Yaque","isp":"CANTV Servicios, Venezuela","organization":"CANTV Servicios, Venezuela","lat":"10.8833","long":"-63.9333"}	active
838	94.21.118.140	46215	Elite	99ms	{"ip":"94.21.118.140","country":"Hungary","region":"Nograd megye","city":"Paszto","isp":"DIGI Tavkozlesi es Szolgaltato Kft.","organization":"DIGI Tavkozlesi es Szolgaltato Kft.","lat":"47.9167","long":"19.7000"}	active
848	89.134.137.103	41258	Elite	371ms	{"ip":"89.134.137.103","country":"Hungary","region":"Borsod-Abaúj-Zemplén","city":"Miskolc","isp":"Liberty Global Operations B.V.","organization":"UPC Magyarorszag Kft.","lat":"48.1000","long":"20.7833"}	active
899	41.242.92.252	46506	Elite	121ms	{"ip":"41.242.92.252","country":"Nigeria","region":"Not Available","city":"Not Available","isp":"Ambion Wireless LTD","organization":"Ambion Wireless LTD","lat":"10.0000","long":"8.0000"}	active
901	85.10.195.89	3128	Elite	686ms	{"ip":"85.10.195.89","country":"Germany","region":"Baden-Württemberg Region","city":"Landkreis Tuebingen","isp":"Hetzner Online GmbH","organization":"Hetzner Online AG","lat":"48.5311","long":"9.0705"}	active
967	130.0.30.41	51024	Elite	60ms	{"ip":"130.0.30.41","country":"Albania","region":"Not Available","city":"Not Available","isp":"I.B.C shpk","organization":"I.B.C shpk","lat":"41.0000","long":"20.0000"}	active
972	46.99.162.77	58449	Elite	130ms	{"ip":"46.99.162.77","country":"Albania","region":"Not Available","city":"Not Available","isp":"IPKO Telecommunications LLC","organization":"Ipko Telecommunications - Fushe Kosova Business Clients 2","lat":"41.0000","long":"20.0000"}	active
1034	202.124.37.94	36988	Elite	37ms	{"ip":"202.124.37.94","country":"Cambodia","region":"Phnom Penh","city":"Phnom Penh","isp":"NEOCOMISP LIMITED, IPTX Transit and Network Service Provider in Cambodia.","organization":"NeocomISP Limited","lat":"11.5625","long":"104.9160"}	active
1058	80.106.195.144	3128	Transparent	74ms	{"ip":"80.106.195.144","country":"Greece","region":"Central Macedonia","city":"Thessaloniki","isp":"Ote SA (Hellenic Telecommunications Organisation)","organization":"Ote SA (Hellenic Telecommunications Organisation)","lat":"40.6403","long":"22.9439"}	active
1095	95.159.105.229	31076	Elite	215ms	{"ip":"95.159.105.229","country":"Iraq","region":"Muhafazat as Sulaymaniyah","city":"Sulaymaniyah","isp":"Goran Net ISP Ltd.","organization":"Goran Net ISP Ltd.","lat":"35.5650","long":"45.4329"}	active
1113	140.227.205.11	3128	Elite	33ms	{"ip":"140.227.205.11","country":"Japan","region":"Not Available","city":"Not Available","isp":"NTT PC Communications, Inc.","organization":"NTTPC Communications,Inc","lat":"35.6900","long":"139.6900"}	active
416	131.255.4.221	5836	Elite	342ms	{"ip":"131.255.4.221","country":"United States","region":"Indiana","city":"Indianapolis","isp":"InterBS S.R.L. (BAEHOST)","organization":"InterBS S.R.L. (BAEHOST)","lat":"39.8588","long":"-86.0133"}	active
\.


--
-- Data for Name: responsestates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.responsestates (id, response, notification, created, webid) FROM stdin;
\.


--
-- Data for Name: structures; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.structures (id, structure, created, modified, deleted, webid) FROM stdin;
\.


--
-- Data for Name: structurestates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.structurestates (id, notification, created, structureid) FROM stdin;
\.


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tokens (token, created, expired) FROM stdin;
\.


--
-- Name: credentials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.credentials_id_seq', 1, false);


--
-- Name: domains_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.domains_id_seq', 1, false);


--
-- Name: domainsstates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.domainsstates_id_seq', 1, false);


--
-- Name: logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.logs_id_seq', 1, false);


--
-- Name: monitoredwebsites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.monitoredwebsites_id_seq', 1, false);


--
-- Name: proxies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proxies_id_seq', 2329, true);


--
-- Name: responsestates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.responsestates_id_seq', 1, false);


--
-- Name: structures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.structures_id_seq', 1, false);


--
-- Name: structurestates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.structurestates_id_seq', 1, false);


--
-- Name: credentials credentials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT credentials_pkey PRIMARY KEY (id);


--
-- Name: domains domains_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domains
    ADD CONSTRAINT domains_pkey PRIMARY KEY (id);


--
-- Name: domainsstates domainsstates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domainsstates
    ADD CONSTRAINT domainsstates_pkey PRIMARY KEY (id);


--
-- Name: logs logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_pkey PRIMARY KEY (id);


--
-- Name: monitoredwebsites monitoredwebsites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monitoredwebsites
    ADD CONSTRAINT monitoredwebsites_pkey PRIMARY KEY (id);


--
-- Name: proxies proxies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proxies
    ADD CONSTRAINT proxies_pkey PRIMARY KEY (id);


--
-- Name: responsestates responsestates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.responsestates
    ADD CONSTRAINT responsestates_pkey PRIMARY KEY (id);


--
-- Name: structures structures_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.structures
    ADD CONSTRAINT structures_pkey PRIMARY KEY (id);


--
-- Name: structurestates structurestates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.structurestates
    ADD CONSTRAINT structurestates_pkey PRIMARY KEY (id);


--
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (token);


--
-- Name: domainsstates_domainsid_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX domainsstates_domainsid_idx ON public.domainsstates USING btree (domainsid);


--
-- Name: responsestates_webid_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX responsestates_webid_idx ON public.responsestates USING btree (webid);


--
-- PostgreSQL database dump complete
--

