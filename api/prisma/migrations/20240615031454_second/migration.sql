/*
  Warnings:

  - You are about to drop the column `professionalId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `professionalId` on the `HealthInsurance` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `HealthInsurance` table. All the data in the column will be lost.
  - The primary key for the `Professional` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Professional` table. All the data in the column will be lost.
  - You are about to drop the column `obraSocialId` on the `Professional` table. All the data in the column will be lost.
  - You are about to drop the column `professionalId` on the `Schedule` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userDni]` on the table `HealthInsurance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `ObraSocial` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dni]` on the table `Professional` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dni]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `professionalDni` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userDni` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userDni` to the `HealthInsurance` table without a default value. This is not possible if the table is not empty.
  - Made the column `obraSocialId` on table `HealthInsurance` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `nombre` on the `ObraSocial` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `password` to the `Professional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professionalDni` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_professionalId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_userId_fkey";

-- DropForeignKey
ALTER TABLE "HealthInsurance" DROP CONSTRAINT "HealthInsurance_obraSocialId_fkey";

-- DropForeignKey
ALTER TABLE "HealthInsurance" DROP CONSTRAINT "HealthInsurance_userId_fkey";

-- DropForeignKey
ALTER TABLE "Professional" DROP CONSTRAINT "Professional_obraSocialId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_professionalId_fkey";

-- DropIndex
DROP INDEX "HealthInsurance_userId_key";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "professionalId",
DROP COLUMN "userId",
ADD COLUMN     "professionalDni" TEXT NOT NULL,
ADD COLUMN     "userDni" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HealthInsurance" DROP COLUMN "professionalId",
DROP COLUMN "userId",
ADD COLUMN     "userDni" TEXT NOT NULL,
ALTER COLUMN "obraSocialId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ObraSocial" DROP COLUMN "nombre",
ADD COLUMN     "nombre" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Professional" DROP CONSTRAINT "Professional_pkey",
DROP COLUMN "id",
DROP COLUMN "obraSocialId",
ADD COLUMN     "password" TEXT NOT NULL,
ADD CONSTRAINT "Professional_pkey" PRIMARY KEY ("dni");

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "professionalId",
ADD COLUMN     "professionalDni" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("dni");

-- DropEnum
DROP TYPE "ObraSocialNombre";

-- CreateTable
CREATE TABLE "_ProfessionalObraSociales" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessionalObraSociales_AB_unique" ON "_ProfessionalObraSociales"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfessionalObraSociales_B_index" ON "_ProfessionalObraSociales"("B");

-- CreateIndex
CREATE UNIQUE INDEX "HealthInsurance_userDni_key" ON "HealthInsurance"("userDni");

-- CreateIndex
CREATE UNIQUE INDEX "ObraSocial_nombre_key" ON "ObraSocial"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Professional_dni_key" ON "Professional"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "User_dni_key" ON "User"("dni");

-- AddForeignKey
ALTER TABLE "HealthInsurance" ADD CONSTRAINT "HealthInsurance_obraSocialId_fkey" FOREIGN KEY ("obraSocialId") REFERENCES "ObraSocial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthInsurance" ADD CONSTRAINT "HealthInsurance_userDni_fkey" FOREIGN KEY ("userDni") REFERENCES "User"("dni") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userDni_fkey" FOREIGN KEY ("userDni") REFERENCES "User"("dni") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_professionalDni_fkey" FOREIGN KEY ("professionalDni") REFERENCES "Professional"("dni") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_professionalDni_fkey" FOREIGN KEY ("professionalDni") REFERENCES "Professional"("dni") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessionalObraSociales" ADD CONSTRAINT "_ProfessionalObraSociales_A_fkey" FOREIGN KEY ("A") REFERENCES "ObraSocial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessionalObraSociales" ADD CONSTRAINT "_ProfessionalObraSociales_B_fkey" FOREIGN KEY ("B") REFERENCES "Professional"("dni") ON DELETE CASCADE ON UPDATE CASCADE;
