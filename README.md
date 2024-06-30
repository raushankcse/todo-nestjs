NestJS Todo Application Backend
This repository contains the backend API for a Todo application built with NestJS.

Installation
Prerequisites
Node.js (v12 or higher)
npm (or yarn)
PostgreSQL


1. Clone the repository:
  ```bash
  git clone <repository-url>
  cd <project-directory>
 

2. Install dependencies
  ```
  npm install


3. Set up environment variables
  Create a .env file in the root directory based on the .env.example file provided. Replace values with your actual database configuration:
  ```
    FRONTEND_URL=http://localhost:3000

    JWT_SECRET=secret

    DATABASE_HOST=localhost
    DATABASE_PORT=5433
    DATABASE_USERNAME=postgres
    DATABASE_PASSWORD=passowrd
    DATABASE_NAME=todo


4. Database setup
Ensure PostgreSQL is running and create a database named todo.



5. Run migrations (if applicable)
  If using TypeORM migrations:
  ```
    npm run typeorm migration:run


6. Start the application
  ```
  npm run start:dev


# API Endpoints
  ```
  POST /auth/register: Register a new user.
  POST /auth/login: Login with credentials to obtain a JWT token.
  POST /todos: Create a new todo task.
  GET /todos: Retrieve all todo tasks.
  GET /todos/
  : Retrieve a specific todo task by ID.
  PUT /todos/
  : Update a specific todo task by ID.
  DELETE /todos/
  : Delete a specific todo task by ID.
  POST /todos/
  /toggle: Toggle the completion status of a todo task.
