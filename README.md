# Note-Taking API

## Overview

This Note-Taking API is a backend service that allows users to create, read, update, and delete (CRUD) notes. The API is built using Node.js, Express, and MongoDB, and follows RESTful principles to ensure efficiency and scalability.

## Features

- Create a new note with a title, content, and category
- Retrieve all notes
- Retrieve a single note by ID
- Retrieve notes by category
- Update an existing note
- Delete a note
- Manage categories (CRUD operations for categories)

## Technologies Used

- **Node.js** - JavaScript runtime for building server-side applications
- **Express.js** - Web framework for Node.js to handle API requests
- **MongoDB** - NoSQL database for storing notes and categories
- **Mongoose** - ODM (Object Data Modeling) library for MongoDB
- **TypeScript** - Typed superset of JavaScript for enhanced code quality
- **Postman** - API testing tool

## Deployment

This API has been **deployed on Render** and is accessible at:

🚀 **Base URL:** [`https://note-taking-api-with-typescript.onrender.com`](https://note-taking-api-with-typescript.onrender.com)

## Project Implementation

### 1. Setting Up the Project

- Initialized a Node.js project using `npm init -y`
- Installed required dependencies: `express`, `mongoose`, `dotenv`, `cors`, `body-parser`
- Installed development dependencies: `typescript`, `ts-node`, `nodemon`, `@types/node`, `@types/express`
- Configured TypeScript in `tsconfig.json`

### 2. Creating the Server

- Set up an Express server in `index.ts`
- Connected to MongoDB using Mongoose
- Implemented middleware for JSON parsing and CORS

### 3. Implementing Routes & Controllers

- Created `routes/noteRoutes.ts` for handling note API endpoints
- Created `routes/categoryRoutes.ts` for handling category API endpoints
- Implemented CRUD operations in `controllers/noteController.ts`
- Defined the `Note` model using Mongoose in `models/Note.ts`
- Defined the `Category` model in `models/Category.ts`

### 4. Adding Category Support

- Updated the `Note` model to include a `categoryId` field
- Modified the `createNote` and `updateNote` controllers to require `categoryId`
- Added a new endpoint to retrieve notes by category
- Implemented CRUD operations for categories
- Categories accept either an **ObjectId** reference to the `Category` model or a normal object with `name` and `description`

### 5. Testing with Postman

#### Notes Endpoints:

- **GET** `/api/notes` - Retrieve all notes
- **GET** `/api/notes/:id` - Retrieve a specific note
- **GET** `/api/notes/category/:categoryId` - Retrieve notes by category
- **POST** `/api/notes` - Create a new note (requires title, content, and categoryId in request body)
- **PUT** `/api/notes/:id` - Update a note (requires title, content, and categoryId in request body)
- **DELETE** `/api/notes/:id` - Delete a note

#### Category Endpoints:

- **GET** `/api/categories` - Retrieve all categories
- **GET** `/api/categories/:id` - Retrieve a specific category by ID
- **POST** `/api/categories` - Create a new category (requires `name` and `description` in request body)
- **PUT** `/api/categories/:id` - Update a category (supports partial updates for `name` and `description`)
- **DELETE** `/api/categories/:id` - Delete a category by ID

## How to Start the Development Server

1. Compile TypeScript files:
   ```sh
   tsc
   ```
2. Start the development server:
   ```sh
   node dist/index.js
   ```

## Setting Up Environment Variables

To run this project, you need a MongoDB database. Follow these steps:

1. **Create a `.env` file** in the root directory.
2. **Copy the contents of `.env.example`** into `.env`.
3. **Replace `<your-username>` and `<your-password>`** with valid MongoDB credentials.

If you don't have a database, you can create a free one on [MongoDB Atlas](https://www.mongodb.com/atlas).

## Conclusion

This Note-Taking API is a simple yet efficient backend system to manage notes and categories with CRUD operations. It follows best practices for RESTful API design and is built with scalability in mind. The addition of categories enhances organization and retrieval of notes, making the system more user-friendly and functional.
