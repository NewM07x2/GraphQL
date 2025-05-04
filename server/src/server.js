const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const path = require('path');

const currentDir = path.resolve();
console.log(currentDir);

const { PrismaClient } = require('@prisma/client'); // PrismaClientをインポート
const prisma = new PrismaClient(); // PrismaClientのインスタンスを生成

/*
  リゾルバ関数
  GraphQL クエリが実行されるときに、クエリの結果を返すために使用される関数です。
*/ 
const resolvers = {
  // クエリを処理するためのメソッド
  Query: {
    message: () => 'Hello world!',
    note: async (parent, args, context) => {
      return context.prisma.note.findMany();
    },
    user: async (parent, args, context) => {
      return context.prisma.user.findMany();
    }
  },

  // 情報を登録/更新/削除するためのメソッド
  Mutation: {
    insert: (parent, args, context) => {
      const newNote = context.prisma.note.create({
        data: {
          memo: args.memo
        },
      });
      return newNote;
    },
    update: (parent, args, context) => {
      const updatedNote = context.prisma.note.update({
        where: { id: args.id },
        data: { memo: args.memo },
      });
      return updatedNote;
    },
    delete: (parent, args, context) => {
      const deletedNote = context.prisma.note.delete({
        where: { id: args.id },
      });
      return deletedNote;
    },
  }
};

const server = new ApolloServer({ 
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  cors: {
    origin: '*', // 必要に応じて特定のオリジンを指定
    credentials: true,
  },
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
