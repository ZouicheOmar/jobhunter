-- SETUP FINI

-- DATA INSERTION 
-- THIS WORKS
-- ==================================================
begin;
set constraints all deferred;
set search_path to public;

insert into city (id, name)
select id, name from donnees.city;

insert into website (id, name)
select id, name from donnees.website;

insert into tech (id, name)
select id, name from donnees.tech;

insert into company (id, name)
select id, name from donnees.company;

insert into contract (id, contract_type)
select id, contract_type from donnees.contract;

-- create view pcandid as (
--     select column_name as publicCol from information_schema.columns 
--     where table_schema = 'public' and table_name = 'candid'
--     order by column_name
-- )
--
-- create view tcandid as (
--     select column_name as targetCol from information_schema.columns 
--     where table_schema = 'target' and table_name = 'candid'
--     order by column_name
-- )
--
-- create view diffCandid as (
--     select pcandid.publicCol,
--     tcandid.targetCol 
--     from pcandid 
--     full join tcandid 
--     on pcandid.publicCol = tcandid.targetCol
-- );

insert into candid 
(answer, city_id, company_id, contract_id, date_apply, id, tech_offer, title, unsolicited, url, website_id)
select
answer, city_id, company_id, contract_id, add_date, id, tech_offer, title, unsolicited, url, website_id
from donnees.candid;

select setval('city_seq', (select last_value from donnees.city_seq), true);
select setval('website_seq', (select last_value from donnees.website_seq), true);
select setval('tech_seq', (select last_value from donnees.tech_seq), true);
select setval('company_seq', (select last_value from donnees.company_seq), true);
select setval('candid_seq', (select last_value from donnees.candid_seq), true);


--
insert into candid_stack (candid_id, tech_id)
select candid_id, tech_id from donnees.candid_stack;
-- ==================================================
--
-- TODO handle constraints
-- TODO update sequences
drop schema donnees cascade;
commit;
