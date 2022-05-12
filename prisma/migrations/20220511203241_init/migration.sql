-- CreateTable
CREATE TABLE "molds" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "molds_pkey" PRIMARY KEY ("id")
);
