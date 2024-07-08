/*
  Warnings:

  - You are about to drop the column `comfort` on the `Online_Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `communication` on the `Online_Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Online_Appointment" DROP COLUMN "comfort",
DROP COLUMN "communication",
ADD COLUMN     "Comfort" TEXT,
ADD COLUMN     "Communication" TEXT;
