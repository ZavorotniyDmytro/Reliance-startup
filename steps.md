nest generate module user
nest generate service user
nest generate class user user/dto
nest generate class user.exception user/exception
nest generate filter user-exception user/filter
nest generate controller user

----DATA BASE----
npm install --save @nestjs/sequelize sequelize sequelize-typescript
npm install --save-dev @types/sequelize

WE USE Postgres
npm install --save pg pg-hstore

----PIPES----
npm i class-validator class-transformer

----SWAGGER----
npm i @nestjs/swagger swagger-ui-express

----AUTHENTICATIN----
npm install @types/bcrypt bcrypt
npm install @nestjs/passport passport @types/passport-local passport-local @types/express
