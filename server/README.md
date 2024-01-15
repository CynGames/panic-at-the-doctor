## Description

DocPanic is a practice fullstack application that seeks to simulate operations related to appointments and its related challenges.

## Link to the application

[//]: # (TODO: Add grok link to the application)

_Note: Since this is meant as a pet project, the env files are included in the repository._

Features

## User Management:
This feature allows the application to maintain a comprehensive database of user profiles, including doctors and patients. The backend will have CRUD operations targeting the following schemas:

Users Table:
- `id`: Primary Key. Uniquely identifies each user.
- `email`: String. Holds the email address of the user.
- `firstName`: String. Holds the first name of the user.
- `lastName`: String. Holds the last name of the user.
- `password`: String. Holds the encrypted password.
- `isActive`: Boolean. Indicates whether the user account is active.
- `role`: Enum. Specifies the role of the user (e.g., Doctor, Patient).

Doctor Table:
- `id`: Primary Key. References the Users table to identify the doctor.
- `spec`: Enum. Specifies the specialization of the doctor.

Patient Table:
- `id`: Primary Key. References the Users table to identify the patient.

## Appointment Management:
This feature enables users to manage doctor appointments. It uses the following schema to store appointment details:

Appointments Table:
- `id`: Primary Key. Uniquely identifies each appointment.
- `doctorId`: Foreign Key. References the Doctors table to identify the doctor.
- `patientId`: Foreign Key. References the Patients table to identify the patient.
- `startTime`: Timestamp. Specifies the start time of the appointment.

## Doctor Availability Management:
This feature allows doctors to manage their availability for appointments. It uses the following schema:

Availabilities Table:
- `id`: Primary Key. Uniquely identifies each availability entry.
- `doctorId`: Foreign Key. References the Doctors table to identify the doctor.
- `day`: String. Specifies the day of the week.
- `startTime`: Time. Specifies the start time of availability.
- `endTime`: Time. Specifies the end time of availability.

## Technology Stack
- **Backend**: Nest.js
- **Database**: PostgreSQL
- **ORM**: Drizzle
- **API Layer**: REST

## Pre-requisites
Before running the application, make sure the following are installed:

- Node.js
- Docker
- Docker Compose

## Basics of running the app

1 - **Clone Repository**: Clone the repository and navigate to its root directory.

```bash 
git clone [repository_url]
cd [repository_name]
```

2 - **Install Dependencies**: Run the following command to install required dependencies.

```bash 
npm install
```
