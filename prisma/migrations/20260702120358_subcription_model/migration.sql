-- CreateEnum
CREATE TYPE "SubcriptionStatus" AS ENUM ('ACTIVE', 'CANCENLD', 'EXPIRED');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "isPremium" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Subcription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "SubcriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subcription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subcription_userId_key" ON "Subcription"("userId");

-- AddForeignKey
ALTER TABLE "Subcription" ADD CONSTRAINT "Subcription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
