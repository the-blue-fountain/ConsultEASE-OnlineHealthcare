-- AlterTable
ALTER TABLE "Offline_Appointment" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "confrimed" BOOLEAN NOT NULL DEFAULT false;
