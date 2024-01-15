ALTER TABLE "appointments" ADD COLUMN "doctor_id" varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "patient_id" varchar(36) NOT NULL;--> statement-breakpoint
ALTER TABLE "appointments" ADD COLUMN "start_time" timestamp NOT NULL;