/*
  Warnings:

  - Added the required column `hash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashRt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `hash` VARCHAR(191) NOT NULL,
    ADD COLUMN `hashRt` VARCHAR(191) NOT NULL;
