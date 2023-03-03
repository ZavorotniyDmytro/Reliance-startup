nest generate service user
nest generate class user user/dto
nest generate class user.exception user/exception
nest generate filter user-exception user/filter
nest generate controller user

----DATA BASE----
npm install --save @nestjs/sequelize sequelize sequelize-typescript
npm install --save-dev @types/sequelize

++ One of the following:
$ npm install --save pg pg-hstore # Postgres
$ npm install --save mysql2
$ npm install --save mariadb
$ npm install --save sqlite3
$ npm install --save tedious # Microsoft SQL Server
$ npm install --save oracledb # Oracle Database

WE USE Postgres
npm install --save pg pg-hstore

----PIPES----
npm i class-validator class-transformer

----SWAGGER----
npm i @nestjs/swagger swagger-ui-express
