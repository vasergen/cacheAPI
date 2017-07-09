# Cache API

### Required software

- node.js >= `8.1.3`
- npm >= `5.0.3`
- running mongo db instance on port 27017 without authentication!

*NOTE*: If you have running mongodb on different port or with enabled authentication, plase go to section 'Change Mongo Config' below on this page

### Install locally


-  Go to directory you want to install this repo and run shell command

    `git clone https://github.com/vasergen/cacheAPI.git`

-  Go to repo directory

    `cd cacheAPI`

- Run npm install

    `npm install`

- To run test, execute

    `npm run test`

- To start app

    `npm run start`

### Change Mongo Config

There are possible issues with connection to mongo as I don't know  `credentials` and `port` on which mongo db will be running. By default it expect mongo db running on port 27017 without authentication.

To change it need to change two config files for each enviroment
 - test enviroment `config/test.json`
 - dev enviroment `config/dev.json`

 If you have any issue with this just email me `vasergen@gmail.com`, cheers)




