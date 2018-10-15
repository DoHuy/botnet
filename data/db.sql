create table if not exists proxies(
    id serial not null primary key,
    ip text not null,
    port text not null,
    proxyType text ,
    responseTime text,
    country text,
    status text

);

create table if not exists users(
    id serial not null primary key,
    username text,
    password text,
    tokenId int,
);

create table if not exists tokens(
    id serial primary key,
    token text,
    time text
);

create table if not exists monitoredwebsites(
    id serial primary key not null,
    siteName text,
    url text,
    frequently text,
    connectionTimeout text,
    parent text,
    created date,
    modified date,
    deleted date,
    responseTime json
);

create table if not exists notifications (
    id serial not null primary key,
    webId int not null,
    notification json
);

create table if not exists webstructs (
    id serial not null primary key,
    webId int not null,
    struct json
);


