# Note-Taking API

## Overview

This Note-Taking API is a backend service that allows users to create, read, update, and delete (CRUD) notes. The API is built using Node.js, Express, and MongoDB, following RESTful principles to ensure efficiency and scalability. It also includes user authentication and category management for better organization of notes.

## Features

- User authentication (Register/Login)
- Create a new note with a title, content, and category
- Retrieve all notes
- Retrieve a single note by ID
- Retrieve notes by category
- Update an existing note
- Delete a note
- Manage categories (CRUD operations for categories)
- Middleware for validation and logging

## Technologies Used

- **Node.js** - JavaScript runtime for building server-side applications
- **Express.js** - Web framework for Node.js to handle API requests
- **MongoDB** - NoSQL database for storing notes and categories
- **Mongoose** - ODM (Object Data Modeling) library for MongoDB
- **TypeScript** - Typed superset of JavaScript for enhanced code quality
- **Postman** - API testing tool
- **Joi** - Data validation library for request validation
- **Bcrypt** - Password hashing for authentication
- **jsonwebtoken** - JWT authentication for users
- **Dotenv** - Environment variable management

## Deployment

This API has been **deployed on Render** and is accessible at:

🚀 **Base URL:** [`https://note-taking-api-with-typescript.onrender.com`](https://note-taking-api-with-typescript.onrender.com)

## Project Implementation

### 1. Setting Up the Project

- Initialized a Node.js project using `npm init -y`
- Installed required dependencies: `express`, `mongoose`, `dotenv`, `cors`, `body-parser`, `joi`, `bcrypt`, `jsonwebtoken`
- Installed development dependencies: `typescript`, `ts-node`, `nodemon`, `@types/node`, `@types/express`
- Configured TypeScript in `tsconfig.json`

### 2. Creating the Server

- Set up an Express server in `index.ts`
- Connected to MongoDB using Mongoose
- Implemented middleware for JSON parsing, CORS, validation, and logging
- Added authentication routes for user registration and login

### 3. Implementing Routes & Controllers

- Created `routes/noteRoutes.ts` for handling note API endpoints
- Created `routes/categoryRoutes.ts` for handling category API endpoints
- Created `routes/authRoutes.ts` for user authentication
- Implemented CRUD operations in `controllers/noteController.ts`
- Defined the `Note` model using Mongoose in `models/Note.ts`
- Defined the `Category` model in `models/Category.ts`
- Defined the `User` model in `models/User.ts`

### 4. Adding Authentication

- Created `routes/authRoutes.ts` for handling authentication endpoints
- Implemented `registerUser` and `loginUser` functions in `controllers/authController.ts`
- Used **bcrypt** to hash passwords
- Used **jsonwebtoken (JWT)** for authentication
- Middleware to protect private routes

### 5. Implementing Middleware

- **Validation Middleware:** Ensures all requests contain the required fields before reaching the controllers (`noteValidationMiddleware.ts`)
- **Logging Middleware:** Logs all incoming requests (`loggerMiddleware.ts`)
- **Error Handling Middleware:** Handles application-wide errors (`errorMiddleware.ts`)

### 6. Testing with Postman

#### Authentication Endpoints:

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login a user and receive a JWT token

#### Notes Endpoints (Protected):

- **GET** `/api/notes` - Retrieve all notes (Requires Authentication)
- **GET** `/api/notes/:id` - Retrieve a specific note (Requires Authentication)
- **GET** `/api/notes/category/:categoryId` - Retrieve notes by category (Requires Authentication)
- **POST** `/api/notes` - Create a new note (Requires title, content, and categoryId in request body) (Requires Authentication)
- **PUT** `/api/notes/:id` - Update a note (Requires title, content, and categoryId in request body) (Requires Authentication)
- **DELETE** `/api/notes/:id` - Delete a note (Requires Authentication)

#### Category Endpoints:

- **GET** `/api/categories` - Retrieve all categories
- **GET** `/api/categories/:id` - Retrieve a specific category by ID
- **POST** `/api/categories` - Create a new category (requires `name` and `description` in request body)
- **PUT** `/api/categories/:id` - Update a category (supports partial updates for `name` and `description`)
- **DELETE** `/api/categories/:id` - Delete a category by ID

## Testing the Note-Taking API on Postman

### 1. Register a User

- Open **Postman**.
- Select **POST** request.
- Enter the endpoint: `https://note-taking-api-with-typescript.onrender.com/api/auth/register`
- Go to the **Body** tab, select **raw**, and set the format to **JSON**.
- Add the following JSON:
  ```json
  {
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```
- Click **Send**.
- A successful response should return a message confirming registration.

### 2. Login a User

- Select **POST** request.
- Enter the endpoint: `https://note-taking-api-with-typescript.onrender.com/api/auth/login`
- Go to the **Body** tab, select **raw**, and set the format to **JSON**.
- Add the following JSON:
  ```json
  {
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```
- Click **Send**.
- A successful response returns a **JWT token**.
- Copy the **token** for authorization in subsequent requests.

### 3. Retrieve All Notes (Requires Authentication)

- Select **GET** request.
- Enter the endpoint: `https://note-taking-api-with-typescript.onrender.com/api/notes`
- Go to the **Headers** tab and add:
  - `Authorization`: `Bearer YOUR_JWT_TOKEN_HERE`
- Click **Send**.
- If successful, a list of notes will be returned.

### 4. Create a New Note (Requires Authentication)

- Select **POST** request.
- Enter the endpoint: `https://note-taking-api-with-typescript.onrender.com/api/notes`
- Go to the **Headers** tab and add:
  - `Authorization`: `Bearer YOUR_JWT_TOKEN_HERE`
- Go to the **Body** tab, select **raw**, and set the format to **JSON**.
- Add the following JSON:
  ```json
  {
    "title": "My First Note",
    "content": "This is the content of my note.",
    "categoryId": "category_id_here"
  }
  ```
- Click **Send**.
- If successful, the new note will be returned.

### 5. Retrieve a Single Note by ID

- Select **GET** request.
- Enter the endpoint: `https://note-taking-api-with-typescript.onrender.com/api/notes/:id`
- Replace `:id` with the actual note ID.
- Add the authorization token in the **Headers**.
- Click **Send**.
- If successful, the requested note is returned.

### 6. Update a Note

- Select **PUT** request.
- Enter the endpoint: `https://note-taking-api-with-typescript.onrender.com/api/notes/:id`
- Replace `:id` with the note ID.
- Add the authorization token in the **Headers**.
- Go to the **Body** tab, select **raw**, and set the format to **JSON**.
- Modify the note data and click **Send**.

### 7. Delete a Note

- Select **DELETE** request.
- Enter the endpoint: `https://note-taking-api-with-typescript.onrender.com/api/notes/:id`
- Replace `:id` with the note ID.
- Add the authorization token in the **Headers**.
- Click **Send**.
- If successful, a confirmation message is returned.

## How to Start the Development Server

1. Clone the repository:
   ```sh
   git clone https://github.com/Adanna-Nnajiofor/Note-taking-API-with-typescript.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Compile TypeScript files:
   ```sh
   tsc
   ```
4. Start the development server:
   ```sh
   node dist/index.js
   ```

## Setting Up Environment Variables

To run this project, you need a MongoDB database and a JWT secret. Follow these steps:

1. **Create a `.env` file** in the root directory.
2. **Copy the contents of `.env.example`** into `.env`.
3. **Replace `<your-username>` and `<your-password>`** with valid MongoDB credentials.
4. **Set a JWT secret key** for authentication.

Example `.env` file:

```env
MONGO_URI=mongodb+srv://<your-username>:<your-password>@cluster.mongodb.net/
JWT_SECRET=your_jwt_secret
PORT=5000
```

If you don't have a database, you can create a free one on [MongoDB Atlas](https://www.mongodb.com/atlas).

## Conclusion

This Note-Taking API is a simple yet efficient backend system to manage user authentication, notes, and categories with CRUD operations. It follows best practices for RESTful API design and is built with scalability in mind. The addition of authentication, validation middleware, and logging ensures data integrity and better debugging, making the system more robust and user-friendly.
