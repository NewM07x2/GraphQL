-- CreateTable
CREATE TABLE "note" (
    "id" TEXT NOT NULL,
    "memo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "note_pkey" PRIMARY KEY ("id")
);
