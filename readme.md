The goal of this project is to create an online store using a modern technological stack.
We use express, sequelize, nunjucks.
We adhere to the JSON.API standard.

### 1. [Install postgres](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04) 

example:
login\password: shop_server\shop_server_db

    >sudo -u postgres createuser --interactive // type shop_server

    >sudo -u postgres createdb shop_server_db // creating db

    >sudo adduser shop_server //create linux user with password shop_server

    >sudo -u shop_server psql shop_server_db // enter in postgress console)

in postgress console:

    >"shop_server_db=# \password shop_server //change password to "shop_server"

### 2. Install [pgAdmin)]( https://wiki.postgresql.org/wiki/Apt)  or [DBeaver 6.1.5 ;)](https://github.com/dbeaver/dbeaver/releases/tag/6.1.5) 

### 3. Install [NVM)]( https://github.com/nvm-sh/nvm )
> nvm install --lts

___
### Usefull
[node-express-sequelize-postgresql-association GIST](https://gist.github.com/thgaskell/e4decde53572664b182e)

find process and kill it
> sudo netstat -nlp | grep :3000

> kill -9 process_id

> fuser -k 3000/tcp

> npx sequelize migration:generate --name [modelname]
> npx sequelize-cli seed:generate --name demo-user
>
>https://www.tutorialspoint.com/expressjs/expressjs_restful_apis.htm




