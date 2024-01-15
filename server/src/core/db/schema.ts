import {
  boolean,
  pgEnum,
  pgTable,
  time,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["DOCTOR", "PATIENT"]);
export const specEnum = pgEnum("spec", [
  "DENTIST",
  "CARDIOLOGIST",
  "NEUROLOGIST",
  "GENERALIST",
]);

export const appointmentsTable = pgTable("appointments", {
  id: varchar("id", { length: 36 }).primaryKey(),
  doctorId: varchar("doctor_id", { length: 36 }).notNull(),
  patientId: varchar("patient_id", { length: 36 }).notNull(),
  startTime: timestamp("start_time", {
    mode: "date",
  }).notNull(),
});

export const userTable = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  isActive: boolean("is_active").notNull(),
  role: roleEnum("role").notNull(),
});

export const doctorTable = pgTable("doctors", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .references(() => userTable.id),
  spec: specEnum("spec").notNull(),
});

export const patientTable = pgTable("patients", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .references(() => userTable.id),
});

export const doctorAvailabilityTable = pgTable("availabilities", {
  id: varchar("id", { length: 36 }).primaryKey(),
  doctorId: varchar("doctor_id", { length: 36 })
    .references(() => doctorTable.id)
    .notNull(),
  day: varchar("day", { length: 3 }).notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
});
