-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "online_fee" INTEGER;

-- CreateTable
CREATE TABLE "Online_Appointment" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "Symptoms" TEXT,
    "feedback" DOUBLE PRECISION,
    "feedback_given" BOOLEAN NOT NULL DEFAULT false,
    "punctuality" TEXT,
    "clarity" TEXT,
    "comfort" TEXT,
    "communication" TEXT,
    "Comments" TEXT,
    "rejected" BOOLEAN NOT NULL DEFAULT false,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "appointment_date" DATE NOT NULL,
    "appointment_time" TEXT,
    "meeting_link" TEXT,
    "prescription" TEXT,

    CONSTRAINT "Online_Appointment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Online_Appointment" ADD CONSTRAINT "Online_Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Online_Appointment" ADD CONSTRAINT "Online_Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
