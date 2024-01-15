DROP TABLE "time_slots";--> statement-breakpoint
ALTER TABLE "doctors" ALTER COLUMN "spec" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "firstName" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "lastName" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "isActive" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;