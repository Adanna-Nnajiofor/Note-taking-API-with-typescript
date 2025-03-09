# Note-Taking API

## Overview

This Note-Taking API is a backend service that allows users to create, read, update, and delete (CRUD) notes. The API is built using Node.js, Express, and MongoDB, and follows RESTful principles to ensure efficiency and scalability.

## Features

- Create a new note
- Retrieve all notes
- Retrieve a single note by ID
- Update an existing note
- Delete a note

## Technologies Used

- **Node.js** - JavaScript runtime for building server-side applications
- **Express.js** - Web framework for Node.js to handle API requests
- **MongoDB** - NoSQL database for storing notes
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

- Created `routes/noteRoutes.ts` for handling API endpoints
- Implemented CRUD operations in `controllers/noteController.ts`
- Defined the `Note` model using Mongoose in `models/Note.ts`

### 4. Testing with Postman

- **GET** `/api/notes` - Retrieve all notes
- **GET** `/api/notes/:id` - Retrieve a specific note
- **POST** `/api/notes` - Create a new note (requires title & content in request body)
- **PUT** `/api/notes/:id` - Update a note (requires title & content in request body)
- **DELETE** `/api/notes/:id` - Delete a note

## How to Start the Development Server

1. Start the development server:
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

This Note-Taking API is a simple yet efficient backend system to manage notes with CRUD operations. It follows best practices for RESTful API design and is built with scalability in mind.
