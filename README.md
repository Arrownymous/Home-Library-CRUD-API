# 📚 Home Library API

A simple REST API for managing a personal digital book collection. Users can add, update, view, and delete books from their own library.

## 🔧 Built With

- Node.js
- Express.js
- MongoDB (via Mongoose)
- dotenv
- Postman (for API testing)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/arrownymous/home-library-crud-api.git
cd home-library-crud-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root of the project and add your MongoDB connection string:

```
MONGODB_URI=mongodb://localhost:27017/homelibrary
PORT=3000
```

> Replace with your own connection string if using MongoDB Atlas.

### 4. Start the API

```bash
npm start
```

> The server will run on `http://localhost:3000`

---

## 🧪 API Testing with Postman

You can test all endpoints using Postman:

1. Open [Postman](https://www.postman.com/)
2. Create a new request collection
3. Use the following endpoints:

| Method | Endpoint         | Description             |
|--------|------------------|-------------------------|
| GET    | `/api/books`     | Get all books           |
| GET    | `/api/books/:id` | Get one book by ID      |
| POST   | `/api/books`     | Add a new book          |
| PUT    | `/api/books/:id` | Update an existing book |
| DELETE | `/api/books/:id` | Delete a book           |

#### Example JSON body for `POST` and `PUT`:

```json
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "year": "1937",
  "genre": "Fantasy"
}
```

✅ Tip: Set `Content-Type` header to `application/json` in Postman when sending POST/PUT requests.

---

## ✅ Features

- Store books in a MongoDB database
- Basic CRUD functionality (Create, Read, Update, Delete)
- Tested via Postman
- Easy to extend with user accounts or tags

---

## 🛡️ License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## 💡 Future Ideas

- User authentication (JWT)
- Notes per book
- Favorite or wishlist system
- Search & filter functionality
- Frontend interface

---

## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## ✉️ Contact

Made with ❤️ by [Stijn Schoonderwoerd](https://www.linkedin.com/in/stijn-s-1a6b10141/)

---


