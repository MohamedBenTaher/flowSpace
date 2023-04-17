-- AlterTable
ALTER TABLE `user` ADD COLUMN `provider` VARCHAR(191) NULL,
    ADD COLUMN `socialId` VARCHAR(191) NULL;
