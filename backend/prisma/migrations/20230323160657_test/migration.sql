/*
  Warnings:

  - Made the column `bio` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `bio` VARCHAR(191) NOT NULL;
