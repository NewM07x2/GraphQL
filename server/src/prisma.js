// DBヘアクセスするためのPrismaクライアントを生成する
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: 'Tom',
      age: 10,
    },
  });
  // PrismaClient(DB操作用のインスタンス)から「user」テーブルのfindMany(データ参照)を実行
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    // DBの接続を切断する
    await prisma.$disconnect();
  });
