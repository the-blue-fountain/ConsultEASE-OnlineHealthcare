/*
  Warnings:

  - You are about to drop the column `confrimed` on the `Offline_Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Offline_Appointment" DROP COLUMN "confrimed",
ADD COLUMN     "confirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rejected" BOOLEAN NOT NULL DEFAULT false;
