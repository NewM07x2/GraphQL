/*
  Warnings:

  - You are about to drop the `TestPrisma` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TestPrisma";

-- CreateTable
CREATE TABLE "note" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "note_pkey" PRIMARY KEY ("id")
);
