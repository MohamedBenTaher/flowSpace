/*
  Warnings:

  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `gender` VARCHAR(191) NOT NULL,
    MODIFY `bio` VARCHAR(191) NULL,
    MODIFY `country` VARCHAR(191) NULL,
    MODIFY `city` VARCHAR(191) NULL,
    MODIFY `hashRt` VARCHAR(191) NULL;
