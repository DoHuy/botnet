drop database if exists webix;
create database webix;

\c webix;


create table if not exists proxies(
    id serial not null primary key,
    ip text not null,
    port text not null,
    proxyType text ,
    responseTime text,
    details json,
    status text

);

create table if not exists credentials(
    id serial not null primary key,
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

create table if not exists tokens(
    token text primary key,
    created text,
    expired text
);

create table if not exists MonitoredWebsites(
    id serial primary key not null,
    siteName text,
    url text,
    frequently text,
    connectionTimeout text,
    parent int,
    created text,
    modified text,
    deleted text,
    credentialId int
);

create table if not exists ResponseStates (
    id serial not null primary key,
    response json,
    notification json,
    created text,
    webId int
);

create table if not exists Structures(
    id serial not null primary key,
    structure json,
    created text,
    modified text,
    deleted text,
    webId int
);

create table if not exists StructureStates (
    id serial not null primary key,
    notification json,
    created text,
    structureId int
);

create table if not exists Domains (
    id serial not null primary key,
    domains text[],
    ip text[],
    created text,
    modified text,
    deleted text,
    webId int
);

create table if not exists DomainsStates (
    id serial not null primary key,
    notification json,
    created text,
    domainsId int
);


