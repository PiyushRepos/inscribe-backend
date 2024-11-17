# Inscribe Backend

This repository contains the backend logic for the **Inscribe** application. It handles user authentication, validation, and core API endpoints.

## Features

- **User registration** with unique username generation.
- **User login** and **JWT-based authentication**.
- **Profile management** for users to update their information.
- **User logout** with secure cookie handling.
- Request data validation using **Joi**.
- Global error handling for consistent API responses.
- Modular code structure for scalability and maintainability.

## Tech Stack

- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **MongoDB** - Database (using Mongoose for ODM)
- **Bcrypt** - For hashing passwords securely
- **JWT (jsonwebtoken)** - For handling JSON Web Tokens for authentication
- **Cloudinary** - For media storage and image uploads
- **Multer** - For handling multipart/form-data, especially for image uploads
- **Joi** - For validating and sanitizing user input data
- **Cookie-parser** - For parsing cookies in requests

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or cloud-based instance)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/PiyushRepos/inscribe-backend.git
   ```

2. Install dependencies:
   ```
   npm install
   ```
3. Create a .env file for environment variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   CORS_ORIGIN=your_frontend_url
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. npm run dev
   ```
   npm run dev
   ```

## API Endpoints

**`POST /api/auth/register:`** User registration with validation.

**`POST /api/auth/login:`** Login user with JWT authentication.

**`POST /api/auth/logout:`** Logout user and clear cookies.

**`GET /api/auth/profile:`** Get profile data of the currently logged-in user.

More endpoints **_coming soon_**. 🔜

## Contributing

Contributions are welcome! Please **fork the repository** and create a pull request with your changes.
