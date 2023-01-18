-- Create blogs table
CREATE TABLE blogs (
id SERIAL PRIMARY KEY,
author text,
url text NOT NULL,
title text NOT NULL,
likes integer DEFAULT 0
);
-- Insert new blog to the blogs table
insert into blogs (author,url,title) values ('Blog 1', 'www.1.com', 'Title 1');
