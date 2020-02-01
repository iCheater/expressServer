The goal of this project is to create an online store using a modern technological stack.
We use express, sequelize, redis, nunjucks.
Soon administration panel will be migrated to vue.
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

### 3. Install [redis)]( https://tecadmin.net/install-redis-ubuntu/ )
> sudo apt-get install redis-server
> sudo systemctl enable redis-server.service

> sudo snap install snap-store snapd (if you dont have snap)
> sudo snap install redis-desktop-manager
> sometimes you need to add export PATH=$PATH:/snap/bin into .bashrc
if you dont have icons in apps menu:
> sudo ln -s /var/lib/snapd/desktop/applications/ /usr/share/applications/snap (if you dont get icons in search menu)

### 4. Install [NVM)]( https://github.com/nvm-sh/nvm )
> nvm install node (current) or > nvm install --lts (latest)
___
### Usefull
[node-express-sequelize-postgresql-association GIST](https://gist.github.com/thgaskell/e4decde53572664b182e)

find process and kill it
> sudo netstat -nlp | grep :3000

> kill -9 process_id

> fuser -k 3000/tcp

>https://www.tutorialspoint.com/expressjs/expressjs_restful_apis.htm


> One day we will use full power of migrations https://gist.github.com/vapurrmaid/a111bf3fc0224751cb2f76532aac2465
> npx sequelize migration:generate --name [modelname]
> npx sequelize-cli seed:generate --name users
> sequelize seed:create --name my-seed-file
>
> npx sequelize-cli db:seed:all
> npx sequelize-cli db:seed:undo:all
> npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data
> npx sequelize-cli db:seed --seed 20191011121208-update-feature.js




