/*
  Warnings:

  - You are about to alter the column `due_date` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Task` MODIFY `due_date` DATETIME NULL,
    MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `updated_at` DATETIME(3) NULL;
