/*
  Warnings:

  - You are about to drop the column `role` on the `Professional` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('admin', 'user', 'professional');

-- AlterTable
ALTER TABLE "Professional" DROP COLUMN "role",
ADD COLUMN     "rol" "Rol" NOT NULL DEFAULT 'professional';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "rol" "Rol" NOT NULL DEFAULT 'user';

-- DropEnum
DROP TYPE "Role";
