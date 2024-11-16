# Inscribe Backend

This repository contains the backend logic for the **Inscribe** application. It handles user authentication, validation, and core API endpoints.

## Features

- User registration with unique username generation.
- Request data validation using **Joi**.
- Global error handling for consistent API responses.
- Modular code structure for scalability and maintainability.

## Tech Stack

- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - Object Data Modeling (ODM) library
- **Joi** - Schema validation
- **Cloudinary** - Media storage (optional for image uploads)

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or cloud-based instance)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/PiyushRepos/inscribe-backend.git
   ```

   ```
   cd inscribe-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```
3. Create a .env file for environment variables:

   ```
   PORT=5000

   MONGODB_URI=your_mongodb_uri

   CORS_ORIGIN=

   CLOUDINARY_CLOUD_NAME=your_cloud_name

   CLOUDINARY_API_KEY=your_api_key

   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### API Endpoints

- `POST /api/auth/register`: User registration with validation.
- `POST /api/auth/login`: Login user with JWT authentication.
- More endpoints coming soon.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

```
Let me know if you'd like to tweak or add anything! 😊
```
