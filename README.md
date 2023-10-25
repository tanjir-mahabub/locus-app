# Locus-App

![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/License-ISC-brightgreen.svg)

## Description

Locus-App is an application that provides access to 3rd-party PostgreSQL data through JWT authentication for three predefined user roles: admin, normal, and limited. This application is built using technologies such as Express.js, TypeScript, Swagger, TypeORM, and JWT.

## Features

- Feature 1: Have 3 predefined users with their own user roles such as admin, normal, limited.
- Feature 2: Swagger api docs with specific user authentication by jwt token.
- Feature 3: Admin can access all locus data tables such rnc_locus and rnc_locus_members, Normal can only access rnc_locus table, Limited can access data only matched region_id (86118093,86696489,88186467)
- Feature 4: Have filtering option by id, assembly_id, region_id, membership_status, sideloading, pagination
- Feature 5: Have sorting option by several fields
- Feature 6: Available routes - /login, /api-docs

## Login Info
Check src/models/userModel.ts

## Installation

To get started with Locus-App, follow these steps:

1. Clone the repository: `git clone https://github.com/tanjir-mahabub/locus-app`
2. Navigate to the project folder: `cd locus-app`
3. Install the dependencies: `npm install`

## Usage

After installation, you can run the application using the following command:

```
npm run dev
```

## Testing
To run tests, use the following command:

```
npm test
```
