CREATE TABLE IF NOT EXISTS "availabilities" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"doctor_id" varchar(36) NOT NULL,
	"day_of_week" varchar(3) NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "firstName" TO "first_name";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "lastName" TO "last_name";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "isActive" TO "is_active";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "availabilities" ADD CONSTRAINT "availabilities_doctor_id_doctors_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
