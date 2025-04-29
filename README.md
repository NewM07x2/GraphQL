初回設定
npm i prisma 
npx prisma init;

更新時
npx prisma migrate dev --name init;
npx prisma migrate dev --name update;
npx prisma generate;
npx prisma studio;


npm i apollo-server 
npm i graphql
node ./src/server.js
node ./src/prisma.js

※.env ファイルの例:
DATABASE_URL="postgresql://postgres:postgres@<host>:<port>/<database>?schema=public"
