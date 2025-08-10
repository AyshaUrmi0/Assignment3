# 📚 Library Management API

A robust and scalable Library Management System API built with **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**. This API provides comprehensive book management, borrowing operations, and advanced analytics using MongoDB aggregation pipelines.

## 🚀 Live Demo

- **🌐 Live Application:** [View Live App](https://l2assignment03-five.vercel.app/)
- **📁 Source Code:** [GitHub Repository](https://github.com/AyshaUrmi0/Assignment3.git)

## ✨ Key Features

- **📖 Book Management:** Complete CRUD operations for books
- **🔄 Borrowing System:** Intelligent book borrowing with business logic validation
- **📊 Analytics:** Advanced borrowing statistics using MongoDB aggregation
- **🔍 Search & Filter:** Comprehensive filtering, sorting, and pagination
- **✅ Validation:** Robust schema validation with Mongoose
- **🔧 Middleware:** Custom pre/post hooks for business logic
- **📚 Methods:** Mongoose static and instance methods
- **🚨 Error Handling:** Comprehensive error handling and user feedback

## 🛠 Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose ODM
- **Middleware:** CORS, dotenv
- **Development:** ts-node-dev, TypeScript compiler

## 📋 API Endpoints

### 📚 Book Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/books` | Create a new book |
| `GET` | `/api/books` | Get all books with filtering & pagination |
| `GET` | `/api/books/:bookId` | Get book by ID |
| `PUT` | `/api/books/:bookId` | Update book information |
| `DELETE` | `/api/books/:bookId` | Delete a book |

### 📖 Borrowing System

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/borrow` | Borrow books |
| `GET` | `/api/borrow` | Get borrowing summary with aggregation |

### 🔍 Query Parameters

The books endpoint supports advanced querying:

```
GET /api/books?filter=GENRE&sortBy=createdAt&sort=asc|desc&limit=5
```

- `filter`: Filter by genre
- `sortBy`: Sort field (e.g., `createdAt`, `title`, `author`)
- `sort`: Sort order (`asc` or `desc`)
- `limit`: Number of results per page

## 📝 Data Models

### Book Schema

```typescript
{
  title: string,           // Book title
  author: string,          // Author name
  genre: BookGenre,        // Book genre
  isbn: string,            // Unique ISBN
  description: string,     // Book description
  copies: number,          // Available copies
  available: boolean       // Availability status
}
```

### Borrow Schema

```typescript
{
  book: ObjectId,          // Reference to book
  quantity: number,        // Number of copies borrowed
  dueDate: Date           // Return due date
}
```

## ✅ Business Rules & Validation

### Genre Constraints
Valid genres: `FICTION`, `NON_FICTION`, `SCIENCE`, `HISTORY`, `BIOGRAPHY`, `FANTASY`

### Business Logic
- ISBN must be unique across all books
- Cannot borrow more copies than available
- Book availability automatically updates when copies reach 0
- Borrowing summary includes book title, ISBN, and total quantity

## 🧪 API Examples

### Create a New Book

```bash
POST /api/books
Content-Type: application/json

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

### Borrow Books

```bash
POST /api/borrow
Content-Type: application/json

{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

### Get Books with Filtering

```bash
GET /api/books?filter=SCIENCE&sortBy=title&sort=asc&limit=10
```

## 🚨 Error Handling

The API provides structured error responses:

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

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB instance
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AyshaUrmi0/Assignment3.git
   cd Assignment3
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/library-api
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5000`

### Production Build

```bash
npm run build
npm start
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build TypeScript project |
| `npm start` | Start production server |
| `npm test` | Run test suite (not implemented) |

## 🏗 Project Structure

```
src/
├── app/
│   ├── controllers/     # Request handlers
│   ├── models/         # Mongoose schemas
│   └── route/          # API routes
├── config/             # Configuration files
├── index.ts            # Application entry point
└── server.ts           # Server setup
```

## 🔧 Development Features

- **TypeScript:** Full type safety and modern JavaScript features
- **Hot Reload:** Automatic server restart on file changes
- **ESLint:** Code quality and consistency
- **MongoDB Aggregation:** Advanced data processing and analytics
- **Middleware Hooks:** Custom business logic integration

## 📊 Performance Features

- **MongoDB Indexing:** Optimized database queries
- **Aggregation Pipelines:** Efficient data processing
- **Connection Pooling:** Database connection optimization
- **Error Boundaries:** Graceful error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 👨‍💻 Author

**Aysha Urmi** - [GitHub Profile](https://github.com/AyshaUrmi0)






