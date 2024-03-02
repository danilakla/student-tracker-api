/*
  Warnings:

  - Added the required column `name` to the `quize_form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quize_form" ADD COLUMN     "name" TEXT NOT NULL;
