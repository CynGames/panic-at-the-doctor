DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('DOCTOR', 'PATIENT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "spec" AS ENUM('DENTIST', 'CARDIOLOGIST', 'NEUROLOGIST', 'GENERALIST');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "doctors" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"spec" "spec"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "patients" (
	"id" varchar(36) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "time_slots" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"doctorId" varchar(36),
	"patientId" varchar(36),
	"start" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"email" varchar(255),
	"firstName" varchar(100),
	"lastName" varchar(100),
	"password" varchar(255),
	"isActive" boolean,
	"role" "role"
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "doctors" ADD CONSTRAINT "doctors_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patients" ADD CONSTRAINT "patients_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "time_slots" ADD CONSTRAINT "time_slots_doctorId_doctors_id_fk" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "time_slots" ADD CONSTRAINT "time_slots_patientId_patients_id_fk" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
