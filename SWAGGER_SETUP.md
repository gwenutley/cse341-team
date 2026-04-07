# Swagger Documentation Setup

## Overview

Your API now has complete Swagger/OpenAPI documentation with interactive UI.

## Getting the MongoDB URI

**Yes, you MUST have a MongoDB URI!** This is required to connect to your database. Here are your options:

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier available)
4. Click "Connect" and select "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Your URI will look like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/databasename?retryWrites=true&w=majority`

### Option 2: Local MongoDB

1. Install [MongoDB Community Edition](https://docs.mongodb.com/manual/installation/)
2. Start MongoDB service
3. Your URI will be: `mongodb://localhost:27017/cse341-team`

### Option 3: MongoDB in Docker

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

Then use: `mongodb://localhost:27017/cse341-team`

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install the new Swagger packages:

- `swagger-autogen` - generates Swagger docs from your routes
- `swagger-ui-express` - provides the interactive UI

### 2. Configure Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/databasename?retryWrites=true&w=majority
PORT=2000
```

### 3. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

### 4. Access Swagger UI

Open your browser and go to:

```
http://localhost:2000/api-docs
```

You'll see an interactive interface where you can:

- View all available endpoints
- See request/response schemas
- Try out API calls directly from the browser
- Read descriptions for each endpoint

## Available Endpoints

### Foods

- `GET /foods` - Get all foods
- `POST /foods` - Create a new food
- `GET /foods/:id` - Get food by ID
- `PUT /foods/:id` - Update food by ID
- `DELETE /foods/:id` - Delete food by ID

### Users

- `GET /users` - Get all users
- `POST /users` - Create a new user
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user by ID
- `DELETE /users/:id` - Delete user by ID

## Food Schema

```json
{
  "name": "string (required)",
  "calories": "number (required)",
  "protein": "number",
  "carbs": "number",
  "fat": "number",
  "fiber": "number",
  "sugar": "number",
  "servingSize": "string",
  "category": "vegetable|protein|grain|fruit|fat|dairy|snack|meat|beverage|other"
}
```

## User Schema

```json
{
  "username": "string (required, unique)",
  "email": "string (required, unique)",
  "role": "admin|user (default: user)",
  "password": "string",
  "googleId": "string"
}
```

## Regenerate Swagger Docs

If you add new routes, regenerate the Swagger documentation:

```bash
npm run swagger
```

Then restart your server.

## Troubleshooting

### Issue: Cannot find module 'swagger-ui-express'

**Solution:** Run `npm install`

### Issue: MongoDB connection error

**Solution:** Check your MONGO_URI in `.env` file. Make sure:

- The connection string is correct
- Your MongoDB cluster is running
- Network access is allowed (for Atlas)

### Issue: Swagger docs not loading

**Solution:** Make sure `swagger_output.json` exists and your server has restarted

## Notes

- All timestamps (createdAt, updatedAt) are automatically managed by MongoDB
- IDs are MongoDB ObjectIds (strings starting with hex characters)
- Validation errors return 400 status code
- Not found errors return 404 status code
- Server errors return 500 status code
