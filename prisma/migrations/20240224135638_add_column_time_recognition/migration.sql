/*
  Warnings:

  - Added the required column `lastTimeScan` to the `user_subjects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_subjects" ADD COLUMN     "lastTimeScan" TEXT NOT NULL;
