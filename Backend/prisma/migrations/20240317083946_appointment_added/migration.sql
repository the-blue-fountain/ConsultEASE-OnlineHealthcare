-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "clinic_days" TEXT[];

-- CreateTable
CREATE TABLE "Offline_Appointment" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "Symptoms" TEXT,
    "appointment_date" DATE NOT NULL,
    "appointment_time" TIME,

    CONSTRAINT "Offline_Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Offline_Appointment_patientId_key" ON "Offline_Appointment"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "Offline_Appointment_doctorId_key" ON "Offline_Appointment"("doctorId");

-- AddForeignKey
ALTER TABLE "Offline_Appointment" ADD CONSTRAINT "Offline_Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offline_Appointment" ADD CONSTRAINT "Offline_Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
