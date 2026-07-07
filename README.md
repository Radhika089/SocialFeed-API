# 🚀 SocialFeed

A full-stack social media application built with the MERN stack where users can register, log in, create image posts, edit and delete their own posts, and browse a public feed.

## ✨ Features

* 🔐 JWT Authentication
* 🔒 Password hashing with bcrypt
* 🖼️ Image upload using ImageKit
* ➕ Create posts
* ✏️ Edit posts
* 🗑️ Delete posts
* 📜 View all posts
* 🎨 Responsive UI with Tailwind CSS

## 🛠️ Tech Stack

**Frontend**

* React
* Vite
* Tailwind CSS
* React Router
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer
* ImageKit

## 📂 Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```

Run the backend:

```bash
npm run dev
```

Run the frontend:

```bash
npm run dev
```

## 📌 API Endpoints

| Method | Endpoint                | Description   |
| ------ | ----------------------- | ------------- |
| POST   | `/api/user/register`    | Register user |
| POST   | `/api/user/login`       | Login user    |
| GET    | `/api/post/getAllPosts` | Get all posts |
| POST   | `/api/post/create`      | Create post   |
| PATCH  | `/api/post/update/:id`  | Update post   |
| DELETE | `/api/post/delete/:id`  | Delete post   |

## 🚀 Future Improvements

* Likes & Comments
* User Profiles
* Follow System
* Pagination
* Search
* Deployment

---

Made with ❤️ by **Radhika**
