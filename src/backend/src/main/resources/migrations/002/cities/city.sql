BEGIN;
  create table cities (
    # id serial,
    name varchar(100),
    label varchar(100),
    zipcode integer,
    dep_id varchar(20),
    reg_id integer,
  )

  copy cities 
  from '/home/cities.csv'
  delimiter ',' header csv;


with cte as (
  select t1.id, t2.label, t2.zipcode, t2.dep_id, t2.reg_id from evocity as t1 
  join cities as t2
  on t1.name like t2.name
) update evocity 
set label = cte.label, 
zipcode = cte.zipcode, 
dep_id = cte.dep_id, 
reg_id = cte.reg_id
from cte
where evocity.id = cte.id;

update evocity set (name , label , zipcode , dep_id , reg_id ) 
= (cities.name, cities.label, cities.zipcode, cities.dep_id, cities.reg_id)
from cities where evocity.id = 203 and cities.zipcode = '17000';

select * from cities where name like '%rochell%';


-------------------------------- 
drop table evocity;
create table evocity as select * from bakevocity;

COMMIT;


SELECT *
FROM   evocity
FULL   OUTER JOIN cities USING (name)
WHERE  cities.name IS NULL OR
       evocity.name IS NULL;


SELECT *
FROM   cities
WHERE  NOT EXISTS
       (SELECT FROM evocity WHERE evocity.name = cities.name);

BEGIN;
with cte as (
  select t1.name, t1.label, t1.zipcode, t1.dep_id, t1.reg_id
  from cities as t1
  left join evocity as t2
  on t1.name = t2.name 
  where t2.name is null
)
insert into evocity (id, name , label , zipcode , dep_id , reg_id )
select nextval('evocity_seq'), name, label , zipcode , dep_id , reg_id from cte;
COMMIT;

select * from cities 
except select * from evocity;

create sequence evocity_seq 
start with 1
increment by 1;

select count(*) from cities;

select count(*) from evocity;

select count(*) from cities
full outer join evocity
on cities.name = evocity.name;

BEGIN;
  insert into evocity (id, name, label, zipcode, dep_id, reg_id)
  select nextval('evocity_seq'), name, label, zipcode, dep_id, reg_id 
  from cities 
  where 
COMMIT;

BEGIN;
  delete from evocity 
  where id = 161 
  or id = 23
  or id = 25
  or id = 9;
COMMIT;

BEGIN;
  update candid 
  set city_id = 2
  where city_id = 161
  or city_id = 23
  or city_id = 25;
COMMIT;

  update candid
  set city_id = 5
  where city_id = 9;
COMMIT;

begin;
DELETE FROM
    evocity a
        USING evocity b
WHERE
    a.id < b.id
    AND a.name = b.name;
commit;


begin;
set constraints all deferred;

alter table candid 
drop constraint "fk5ep9plgf8d6ytnch5iakbhigk";

delete from city;

alter table city
add column label varchar(100),
add column zipcode integer,
add column dep_id varchar(100),
add column reg_id integer;

insert into city (id, name, label, zipcode, dep_id, reg_id)
select id, name, label, zipcode, dep_id, reg_id from evocity;

alter table candid 
add constraint "fk5ep9plgf8d6ytnch5iakbhigk"
foreign key (city_id) references city(id);

commit;
select setval('city_seq', (select currval('evocity_seq')), true);



-- lever les contraintes
--
-- copier evocity dans city
-- incrémenter city_seq 

