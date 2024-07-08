-- AlterTable
ALTER TABLE "Offline_Appointment" ADD COLUMN     "Comfort" TEXT,
ADD COLUMN     "Comments" TEXT,
ADD COLUMN     "Communication" TEXT,
ADD COLUMN     "clarity" TEXT,
ADD COLUMN     "feedback_given" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "punctuality" TEXT;
