# webtech-prj-restaurant

# Descriere proiect

Construiesc o baza de date pt a tine evidenta comenzilor dintr-un restaurant(ce meniu isi alege fiecare client)

# Entitati

Menu
* id
* name
* description
* price

Client
* id_client
* first_name
* last_name
* payment_type
* id
Tipul de legatura dintre tabele este 1:n => un meniu poate fi ales de mai multi clienti, deci id primaryKey in tabela Menu
si foreignKey in tabela Client.

# Tehologii

* NodeJs 
* NodeAdmin
* MySQL

# ToDo
* install mysql [done]
* install node admin [done]
* create the database [done]
* install sequelize [done]
* create a model [done]
* CRUD articles 
* interfata adaugare menu/client [done]
* intefrata upload fisiere bibtext

# Deployment
* 

# Resources
* https://community.c9.io/t/setting-up-mysql/1718
* https://www.npmjs.com/package/nodeadmin
* https://github.com/projectkudu/kudu/wiki/MySQL-in-app-(preview)
