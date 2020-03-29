##### What is this:
This is e-commerce project (online store)

We learn how to make an online store.
During creation, we encountered a problem:
Github is full of “helloworld” level tutorials, there are no examples of PRODUCTION READY, a well-designed application on which you can understand how to make your application better.
We want to make an application using the current best practices and share it with community. 
We will accept any help with joy.

We use trello as task tool (right now it has tasks only on Russian but we can start using english only)
##### Current technological stack:
- [x] express
- [x] sequelize
- [x] redis
- [x] nunjucks
##### Roadmap:
###### Phase 1
- [x] Fully working MVP of store

###### Phase 2
- [ ] split project into "frontend server and api server"
- [ ] split "frontend server" and "administration section"(CRM\CMS) and rewrite it with vue.js
###### Phase 3
- [ ] add vue and SSR to frontend server
- [ ] performance optimizations

We adhere to the JSON.API standard, but, you know...

##### Current features:
- [x] session based cart, cart calculator
- [x] mailing for new users, order and so on
- [x] multi auth with passport.js

## How to run:
### 1. [Install postgres](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)

example:
login\password: shop_server\shop_server_db

```console
foo@bar:~$ sudo -u postgres createuser --interactive // type shop_server
Enter name of role to add: shop_server
Shall the new role be a superuser? (y/n) y
foo@bar:~$ sudo -u postgres createdb shop_server_db // creating db
foo@bar:~$ sudo adduser shop_server //create linux user with password shop_server
Добавляется пользователь «shop_server» ...
Добавляется новая группа «shop_server» (1001) ...
Добавляется новый пользователь «shop_server» (1001) в группу «shop_server» ...
Создаётся домашний каталог «/home/shop_server» ...
Копирование файлов из «/etc/skel» ...
Новый пароль : 
Повторите ввод нового пароля : 
passwd: пароль успешно обновлён
Изменение информации о пользователе shop_server
Введите новое значение или нажмите ENTER для выбора значения по умолчанию
        Полное имя []: 
        Номер комнаты []: 
        Рабочий телефон []: 
        Домашний телефон []: 
        Другое []: 
Данная информация корректна? [Y/n] y
foo@bar:~$ sudo -u shop_server psql shop_server_db // enter in postgress console
psql (12.1 (Ubuntu 12.1-1.pgdg19.04+1), server 11.6 (Ubuntu 11.6-1.pgdg19.04+1))
Type "help" for help.
shop_server_db=# 
```
in postgress console:
```console
shop_server_db=# \password shop_server (change password to "shop_server")
```
### 2. Install [pgAdmin]( https://wiki.postgresql.org/wiki/Apt)  or [DBeaver 6.1.5 ;)](https://github.com/dbeaver/dbeaver/releases/tag/6.1.5)

### 3. Install [Redis]( https://tecadmin.net/install-redis-ubuntu/ )
```console
foo@bar:~$  sudo apt-get install redis-server
foo@bar:~$  sudo systemctl enable redis-server.service
foo@bar:~$  sudo snap install redis-desktop-manager
```
Linux Mint users have to add `export PATH=$PATH:/snap/bin` into `.bashrc`
if you dont have icons in apps menu:
```console
foo@bar:~$  sudo ln -s /var/lib/snapd/desktop/applications/ /usr/share/applications/snap (if you dont get icons in search menu)
```

### 4. Install [NVM]( https://github.com/nvm-sh/nvm )
After NVM installation complete tell NVM to install current version:
```console
foo@bar:~$  nvm install node
```
or install latest version:
```console
foo@bar:~$  nvm install --lts
```
you can change default node version
```console
foo@bar:~$  nvm alias default
```
### 5. Install npm dependencies
Install dependencies from package.json
```console
foo@bar:~$  npm install
```
or

Install dependencies from package-lock.json
```console
foo@bar:~$  npm ci
```
### 6. Install  [Gulp]( https://gulpjs.com/docs/en/getting-started/quick-start )
```console
foo@bar:~$  npm install --global gulp-cli
```
### 7. Run Gulp!
```console
foo@bar:~$ gulp
```
### Oops! Fill db with mockup data 
```console
foo@bar:~$ npm run seed
```

___

### Things to discuss:
maybe switch sequelize to objection.js
### Usefull


###### G++
```console
sudo apt-get install build-essential
```
[node-express-sequelize-postgresql-association GIST](https://gist.github.com/thgaskell/e4decde53572664b182e)

find process and kill it
```console
foo@bar:~$  sudo netstat -nlp | grep :3000
foo@bar:~$  kill -9 process_id
foo@bar:~$  fuser -k 3000/tcp
```


>https://www.tutorialspoint.com/expressjs/expressjs_restful_apis.htm


> One day we will use full power of migrations https://gist.github.com/vapurrmaid/a111bf3fc0224751cb2f76532aac2465

```gist
npx sequelize-cli migration:generate --name [modelname]
npx sequelize-cli seed:generate --name users
npx sequelize-cli seed:create --name my-seed-file

npx sequelize-cli db:seed:all
npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data
npx sequelize-cli db:seed --seed 20191011121208-update-feature.js
```

Nice advanced seeding 
https://medium.com/@edtimmer/sequelize-associations-basics-bde90c0deeaa




