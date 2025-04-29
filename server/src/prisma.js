// DBヘアクセスするためのPrismaクライアントを生成する
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const newNote = await prisma.note.create({
    data: {
      memo: '練習中',
    },
  });
  console.log('新規Note');
  console.log(newNote);
  // console.log('-------------------');
  // PrismaClient(DB操作用のインスタンス)から「note」テーブルのfindMany(データ参照)を実行
  const allNotesBefore = await prisma.note.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });
  console.log('全NoteBefore');
  console.log(allNotesBefore);
  if (allNotesBefore.length > 0) {
    const updatedNote = await prisma.note.update({
      where: { id: allNotesBefore[0].id },
      data: { memo: '更新済みA' },
    });
  }

  const allNotesAfter = await prisma.note.findMany();
  console.log('全NoteAfter');
  console.log(allNotesAfter);


  // 全データを取得
  // await prisma.note.deleteMany();
  // if (allNotes.length > 5) {
  //   console.log('-------------------');
  //   console.log('全てのNoteを削除しました');
  // }
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    // DBの接続を切断する
    await prisma.$disconnect();
  });
