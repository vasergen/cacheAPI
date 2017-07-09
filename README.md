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

### APP
*CACHE OWERWRITE*

In config there are options
 - `maxItemCount` - maximux items cache allowed
 - `whipeCount` - how many cache items will be dropped if we reach maxItemCount
 - `ttlMS` - TTL for cache

There are middleware `checkOldCache` which is responsible for CACHE OWERWRITE logic, basically we are checking cache count and if it maximum amout is reached then remove some old chache sorted by TTL

*ROUTES*
- `GET /cache` - get all cache keys
- `DELETE /cache` - delete all cache
- `GET /cache/:key` - get cache by key
- `PUT /cache/:key` - insert / update cache by key, *note* you have to provide also payload with 'data' key
- `DELETE /cache/:key` - delete cache by key

### Change Mongo Config

There are possible issues with connection to mongo as I don't know  `credentials` and `port` on which mongo db will be running. By default it expect mongo db running on port 27017 without authentication.

To change it need to change two config files for each enviroment
 - test enviroment `config/test.json`
 - dev enviroment `config/dev.json`

 If you have any issue with this just email me `vasergen@gmail.com`, cheers)




