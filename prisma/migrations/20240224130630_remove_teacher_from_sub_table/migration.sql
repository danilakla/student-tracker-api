/*
  Warnings:

  - You are about to drop the column `teacherId` on the `user_subjects` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_subjects" DROP CONSTRAINT "user_subjects_teacherId_fkey";

-- AlterTable
ALTER TABLE "user_subjects" DROP COLUMN "teacherId";
