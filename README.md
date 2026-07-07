# SocialFeed REST API

A RESTful backend API for a social media application built with Node.js, Express.js, MongoDB, JWT Authentication, Multer, and ImageKit.

Users can register, log in, upload image posts, update posts, delete their own posts, and view all posts.

---

## 🚀 Features

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Image Upload using Multer
- Cloud Image Storage with ImageKit
- Create Post
- Update Post
- Delete Post
- Get All Posts
- MongoDB Database Integration

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- ImageKit
- Postman

---

## 📂 Project Structure

```
social-feed-backend/
│
├── config/
├── controller/
├── middleware/
├── model/
├── Routes/
├── service/
├── .env
├── server.js
└── package.json
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | /api/user/register | Register a new user |
| POST   | /api/user/login    | Login user          |

### Posts

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| POST   | /api/post/create      | Create a new post |
| PATCH  | /api/post/update/:id  | Update a post     |
| DELETE | /api/post/delete/:id  | Delete a post     |
| GET    | /api/post/getAllPosts | Get all posts     |

---

## 🔐 Authentication

Protected routes require a Bearer Token.

Example:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🖼 Image Upload

Images are uploaded using Multer and stored on ImageKit Cloud Storage. Only the image URL is saved in MongoDB.

---

## ⚙️ Installation

Clone the repository

```
git clone <repository-url>
```

Install dependencies

```
npm install
```

Create a `.env` file

```
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
JWT_KEY=your_jwt_secret
```

Run the server

```
npm start
```

or

```
npm run dev
```

---

## 📖 Learning Outcomes

This project helped me practice:

- REST API Development
- Authentication & Authorization
- JWT Tokens
- Password Hashing
- MongoDB Relationships
- File Uploads
- Cloud Storage Integration
- CRUD Operations
- Express Middleware
- Backend Project Structure

---

## 👩‍💻 Author

**Radhika Bansal**

Aspiring Full Stack MERN Developer building real-world backend projects to strengthen problem-solving skills and prepare for software development roles.
