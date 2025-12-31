-- TODO, drop the original sql dump 

begin;
set search_path to donnees;

-- cleanup one, remove empty techs

-- candid_stack depends on tech
with cte as (
    select candid_id as cid, tech_id as tid 
    from candid_stack 
    join tech 
    on tech_id = tech.id
    and tech.name = ''
)
delete from candid_stack 
where candid_id = (select cid from cte) 
and tech_id = (select tid from cte);

-- delete from tech where name = '';

-- je delete dans cte,
-- je retourne le resultat
delete from tech where name = '';

-- ça normalement c'est valid;
with cte as (
    delete from tech 
    where name = ''
    returning id as tid
)
delete from candid_stack 
using cte 
where candid_stack.tech_id = cte.tid;

-- replace upper lower duplicates from candid_stack
with cte as (
    select t1.id as t1id,
    t2.id as t2id
    from tech as t1
    inner join tech as t2
    on t1.id != t2.id
    and t1.name = lower(t2.name)
)
update candid_stack
set tech_id = cte.t1id
from cte 
where cte.t2id = candid_stack.tech_id;

-- move 'GIT' to 'Git'  on candid_stack;
with cte as (
    select
    t1.id as t1id, t1.name,
    t2.id as t2id, t2.name
    from tech as t1 
    join tech as t2 
    on t1.id != t2.id and upper(t1.name) = t2.name
)
update candid_stack
set tech_id = t1id 
from cte
where candid_stack.tech_id = cte.t2id
returning *;

-- delete 'GIT'
with cte as (
    select
    t2.id as tid
    from tech as t1 
    join tech as t2 
    on t1.id != t2.id and upper(t1.name) = t2.name
)
delete from tech 
using cte 
where tech.id = cte.tid
returning *;


-- delete duplicates from tech;
with cte as (
    select t2.id as tid 
    from tech as t1
    inner join tech as t2
    on t1.id != t2.id
    and t1.name = lower(t2.name)
)
delete from tech 
using cte 
where tech.id = cte.tid
returning *;

update tech 
set name = lower(name);


-- handle city
create view dupcity as (
    select t1.id as cid1, t1.name as cn1,
    t2.id as cid2, t2.name as cn2
    from city as t1
    join city as t2 
    on t1.id != t2.id 
    and t1.name = lower(t2.name)
);

update candid
set city_id = cid1 
from dupcity
where candid.city_id = dupcity.cid2;

delete from city 
using dupcity 
where city.id = dupcity.cid2;

update city 
set name = lower(name);

-- peut être qu'on peut zapper city;
-- select * from website 
-- where name like '%http%';

update candid set company = lower(company);

insert into company (id, name)
select distinct on (company) nextval('company_seq'), company from candid;

update candid 
set company_id = (select id from company where company.name = candid.company);


alter table candid
drop constraint candid_contract_type_check;

-- je modifie puis j'update
update candid 
set contract_type='FULL_TIME' where contract_type='CDI';

update candid 
set contract_type='PART_TIME' where contract_type='CDD';

update candid 
set contract_type='INTERN' where contract_type='ALTERNANCE';

alter table contract
drop constraint contract_contract_type_check;

alter table contract
alter column contract_type type character varying(255);

with sup as (
    select id, contract_type from candid
),
sub as (
    insert into contract (id, contract_type)
    select id, contract_type from sup
    returning id
)
update candid 
set contract_id = (select id from sub where candid.id = sub.id);

update candid set tech_offer = true;
commit;

-- pas besoin
-- alter table contract
-- add constraint contract_type_check CHECK (((contract_type)::text = ANY
--         ((ARRAY['FULL_TIME'::character varying,
--                 'PART_TIME'::character varying,
--                 'CONTRACTOR'::character varying,
--                 'TEMPORARY'::character varying,
--                 'INTERN'::character varying,
--                 'VOLUNTEER'::character varying,
--                 'PER_DIEM'::character varying,
--                 'OTHER'::character varying])::text[])));
