```markdown
# 📚 Library Management API

A robust Library Management System API built with **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**. This API handles book management, borrowing operations, and borrowing summary statistics using aggregation pipelines.

---

## 🚀 Live Project

**🔗 Live URL:** https://l2assignment03-five.vercel.app/ 
**📁 GitHub Repository:**https://github.com/AyshaUrmi0/Assignment3.git
---

## 📦 Features

- ✅ Book CRUD operations
- 📖 Borrowing books with business logic validation
- 📊 Borrowed books summary using MongoDB aggregation
- ✅ Filtering, sorting & pagination support
- 📎 Schema validation with Mongoose
- 🔁 Middleware (pre/post hooks)
- 📌 Mongoose static & instance methods
- 🚫 Proper error handling and validation feedback

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** MongoDB + Mongoose
- **Other:** Mongoose Middleware, Aggregation Pipelines

---


## 📋 API Endpoints

### 🔹 Book Endpoints

#### ➕ Create Book

```
POST /api/books
```

#### 📥 Get All Books

```
GET /api/books?filter=GENRE&sortBy=createdAt&sort=asc|desc&limit=5
```

#### 🔍 Get Book by ID

```
GET /api/books/:bookId
```

#### ✏️ Update Book

```
PUT /api/books/:bookId
```

#### ❌ Delete Book

```
DELETE /api/books/:bookId
```

---

### 🔹 Borrow Endpoints

#### 📚 Borrow Book

```
POST /api/borrow
```

#### 📊 Borrowed Book Summary

```
GET /api/borrow
```

---

## ✅ Validation & Business Rules

- Genre must be one of:  
  `FICTION`, `NON_FICTION`, `SCIENCE`, `HISTORY`, `BIOGRAPHY`, `FANTASY`
- ISBN must be unique.
- Cannot borrow more than available copies.
- If copies become `0`, book `available = false`.
- Borrowed book summary includes book title, ISBN, and total quantity.

---

## 🧪 Sample Request Payloads

### Create Book

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

### Borrow Book

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

---

## ⚠️ Error Response Structure

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "kind": "min",
        "value": -5
      }
    }
  }
}
```

---

## ⚙️ Setup Instructions

1. **Clone the repo**

   ```bash
   git clone https://github.com/yourusername/library-api.git
   cd library-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure `.env`**

   Create a `.env` file and add:

   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/library-api
   ```

4. **Run the server**

   ```bash
   npm run dev
   ```

---

## 👨‍💻 Developer Scripts

| Command         | Description               |
|----------------|---------------------------|
| `npm run dev`  | Run in development mode   |
| `npm run build`| Build TypeScript project  |
| `npm start`    | Run compiled project      |

---

## ✨ Bonus Marks Highlights

- ✅ **Code Quality:** Clean & modular structure
- ✅ **Error Handling:** Centralized and descriptive
- ✅ **Aggregation:** MongoDB aggregation used in `/api/borrow`
- ✅ **Middleware:** Mongoose `pre/post` hooks implemented
- ✅ **Instance Methods:** Used to update availability after borrowing

---


