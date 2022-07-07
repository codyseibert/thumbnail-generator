## Welcome

### Prerequisites

1. install mysql locally on your machine (or use a docker image)
2. ask for the .env file secrets

### First Time Setup

1. `npm install`
2. create two databases in your mysql server: `thumbnail_generator` and `thumbnail_generator_shadow` by using `CREATE DATABASE thumbnail_generator` and `CREATE DATABASE thumbnail_generator_shadow`
3. Initialize database `npx prisma migrate dev`

### How to Run

1. Run server `npm run dev`
2. Run stripe webhook listener `npm run stripe:listen`
