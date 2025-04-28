const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const currentDir = path.resolve();
console.log(currentDir);

const { PrismaClient } = require('@prisma/client'); // PrismaClientをインポート
const prisma = new PrismaClient(); // PrismaClientのインスタンスを生成


// GraphQLスキーマの定義
// const typeDefs = require('./schema');
// const resolvers = require('./resolvers'); // Import resolvers

// let links = [
//   {
//     id: 'link-0',
//     url: 'www.howtographql.com',
//     description: 'Fullstack tutorial for GraphQL',
//   },
// ];


/*
GraphQLスキーマを定義するためのものです。typeDefsという定数に、GraphQLのスキーマ定義言語（SDL）を使用してスキーマを定義しています。
スキーマの中で、Queryという型を定義しています。この型には、helloというフィールドが含まれており、そのフィールドのデータ型はStringです。
つまり、このスキーマに基づいてクエリを実行すると、helloフィールドから文字列データを取得できることを示しています。

このようにして、GraphQLサーバーに対してどのようなクエリが可能かを定義することができます。
typeDefsは通常、GraphQLサーバーの設定の一部として使用され、サーバーがクライアントからのクエリをどのように処理するかを決定します。
*/ 
// const typeDefs = gql``;

/*
  リゾルバ関数
  GraphQL クエリが実行されるときに、クエリの結果を返すために使用される関数です。
*/ 
const resolvers = {
  // クエリを処理するためのメソッド
  Query: {
    info: () => 'Hello world!',
    feed: async (parent, args, context) => {
      return context.prisma.user.findMany();
    }
  },

  // 情報を登録/更新/削除するためのメソッド
  Mutation: {
    post: (parent, args, context) => {
      const newUser = context.prisma.user.create({
        data: {
          email: args.email,
          password: args.password,
        },
      });
      return newUser;
    }
  }
};

const server = new ApolloServer({ 
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: {
    prisma,
  },
  introspection: true,
  playground: true, // GraphQL Playgroundを有効にする
  engine: {
    apiKey: 'service:your-graphql-service:your-api-key',
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
