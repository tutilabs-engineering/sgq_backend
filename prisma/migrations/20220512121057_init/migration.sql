/*
  Warnings:

  - You are about to drop the `Machines` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Machines";

-- CreateTable
CREATE TABLE "machines" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "machines_pkey" PRIMARY KEY ("id")
);
