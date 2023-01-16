CREATE TABLE blogs (
id SERIAL PRIMARY KEY,
author text,
url text NOT NULL,
title text NOT NULL,
likes integer DEFAULT 0
);

insert into blogs (author,url,title) values ('Blog 1', 'www.1.com', 'Title 1');
