drop database if exists webix;
create database webix;

\c webix;


/*
details = {
    continents: Asia,
    country: Vietnam,
    city: hanoi,
    region: DNA,
    lat: 1313,
    lon: 12313
}
*/

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
    created date,
    modified date,
    deleted date,
    token text
);

create table if not exists roles(
    id serial not null primary key,
    role text,
    created text,
    modified text,
    deleted text
)

create table if not exists profiles(
    id serial primary key,
    fullname text,
    email text,
    phone text,
    created date,
    modified date,
    deleted date,
    credentialId int

);

create table if not exists tokens(
    token text primary key,
    created date,
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


