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

/*
responeTime = {
    {
    connectionTime:
    sslHanshakeTime:
    waitTime:
    dowloadingTime:,
    totalTime:,
    created:
    }
}

notification = {
    {
        statusCode:,
        state:,
        message:,
        level:,
        image,
        created:
    }
}

*/
create table if not exists monitoredWebsites(
    id serial primary key not null,
    credentialId int,
    siteName text,
    url text,
    frequently text,
    connectionTimeout text,
    parent int,
    created text,
    modified text,
    deleted text,
    responseTime json,
    notification json
);

create table if not exists webStructs (
    id serial not null primary key,
    webId int not null,
    struct json
);


