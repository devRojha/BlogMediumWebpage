/*
  Warnings:

  - Added the required column `publishedDate` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "publishedDate" TEXT NOT NULL,
ALTER COLUMN "published" SET DEFAULT 'false';
