create table if not exists proxies(
    id serial not null primary key,
    ip text not null,
    port text not null,
    proxyType text not null,
    responseTime text not null,
    country text not null,
    status text not null

)
