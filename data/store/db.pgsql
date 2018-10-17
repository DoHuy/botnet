drop database if exists webix;
create database webix;

\c webix;

create table if not exists proxies(
    id serial not null primary key,
    ip text not null,
    port text not null,
    proxyType text ,
    responseTime text,
    country text,
    status text

);

create table if not exists credentials(
    id serial not null primary key,
    username text,
    password text,
    tokenId int
);

create table if not exists tokens(
    id serial primary key,
    token text,
    existedTime text
);

create table if not exists monitoredWebsites(
    id serial primary key not null,
    siteName text,
    url text,
    frequently text,
    connectionTimeout text,
    parent text,
    created date,
    modified date,
    deleted date,
    responseTime json,
    notification json
);

create table if not exists webStructs (
    id serial not null primary key,
    webId int not null,
    struct json
);


