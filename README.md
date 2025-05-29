# MongoDB Bookstore Database Setup

A comprehensive MongoDB database setup script for a bookstore application with sample data and example queries for learning and development purposes.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Script](#running-the-script)
- [Sample Data](#sample-data)
- [Example Queries](#example-queries)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🎯 Overview

This project provides a MongoDB database setup for a bookstore application. It includes:

- **12 sample books** with comprehensive metadata
- **Automated database population** script
- **Example queries** from beginner to advanced level
- **Complete documentation** for easy setup and learning

### Database Schema

Each book document contains:
- `title` - Book title
- `author` - Author name
- `genre` - Book genre/category
- `published_year` - Year of publication
- `price` - Book price (USD)
- `in_stock` - Availability status
- `pages` - Number of pages
- `publisher` - Publishing company

## 🔧 Prerequisites

Before running this project, ensure you have:

### Required Software
- **Node.js** (version 14.0 or higher)
- **MongoDB** (version 4.4 or higher)
- **npm** (comes with Node.js)

### MongoDB Installation Options

#### Option 1: Local MongoDB Installation
- [Download MongoDB Community Server](https://www.mongodb.com/try/download/community)
- Follow the installation guide for your operating system
- Start MongoDB service: `mongod`

#### Option 2: MongoDB Atlas (Cloud)
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a new cluster
- Get your connection string

#### Option 3: Docker (Recommended for Development)
```bash
docker run --name mongodb -d -p 27017:27017 mongo:latest
```

## 🚀 Installation

1. **Clone or download the project files**
   ```bash
   git clone <your-repository-url>
   cd mongodb-bookstore-setup
   ```

2. **Install Node.js dependencies**
   ```bash
   npm init -y
   npm install mongodb
   ```

3. **Verify MongoDB connection**
   - For local MongoDB: Ensure MongoDB is running on `mongodb://localhost:27017`
   - For Atlas: Update the connection string in `insert_books.js`

## 🗄️ Database Setup

### Configuration

The script uses the following default configuration:
- **Database Name**: `plp_bookstore`
- **Collection Name**: `books`
- **Connection URI**: `mongodb://localhost:27017`

### Customizing Connection

To use a different MongoDB instance, update the connection URI in `insert_books.js`:

```javascript
// For MongoDB Atlas
const uri = 'mongodb+srv://username:password@cluster.mongodb.net/';

// For local MongoDB with authentication
const uri = 'mongodb://username:password@localhost:27017';

// For different host/port
const uri = 'mongodb://your-host:your-port';
```

## ▶️ Running the Script

### Basic Execution

```bash
node insert_books.js
```

### Expected Output

```
Connected to MongoDB server
Collection already contains X documents. Dropping collection...
Collection dropped successfully
12 books were successfully inserted into the database

Inserted books:
1. "To Kill a Mockingbird" by Harper Lee (1960)
2. "1984" by George Orwell (1949)
3. "The Great Gatsby" by F. Scott Fitzgerald (1925)
...
Connection closed
```

### Script Behavior

- **Automatic cleanup**: Drops existing collection if it contains data
- **Fresh data**: Ensures clean insertion of sample books
- **Verification**: Displays all inserted books with confirmation
- **Error handling**: Provides clear error messages if issues occur

## 📚 Sample Data

The database includes 12 carefully selected books spanning different genres and time periods:

| Title | Author | Genre | Year | Price | In Stock |
|-------|--------|-------|------|-------|----------|
| To Kill a Mockingbird | Harper Lee | Fiction | 1960 | $12.99 | ✅ |
| 1984 | George Orwell | Dystopian | 1949 | $10.99 | ✅ |
| The Great Gatsby | F. Scott Fitzgerald | Fiction | 1925 | $9.99 | ✅ |
| Brave New World | Aldous Huxley | Dystopian | 1932 | $11.50 | ❌ |
| The Hobbit | J.R.R. Tolkien | Fantasy | 1937 | $14.99 | ✅ |
| ... | ... | ... | ... | ... | ... |

## 🔍 Example Queries

### Quick Start Queries

Connect to your MongoDB instance and try these basic queries:

```javascript
// Connect to the database
use plp_bookstore

// Find all books
db.books.find()

// Find books by George Orwell
db.books.find({ author: "George Orwell" })

// Find books under $10
db.books.find({ price: { $lt: 10 } })

// Count total books
db.books.countDocuments()
```

### Advanced Query Examples

```javascript
// Books by genre with average price
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
      bookCount: { $sum: 1 }
    }
  },
  { $sort: { averagePrice: -1 } }
])

// Find books with text search (after creating text index)
db.books.createIndex({ title: "text", author: "text" })
db.books.find({ $text: { $search: "orwell dystopian" } })
```

For a complete list of beginner, intermediate, and advanced queries, see the [MongoDB Queries Documentation](./queries.md).

## 📁 Project Structure

```
mongodb-bookstore-setup/
│
├── insert_books.js          # Main database setup script
├── README.md               # This documentation
├── queries.md              # Example queries (optional)
├── package.json            # Node.js dependencies
└── .gitignore             # Git ignore file
```

## 🔧 Troubleshooting

### Common Issues and Solutions

#### "MongoServerError: Authentication failed"
```bash
# Solution: Check your connection string credentials
const uri = 'mongodb://correct-username:correct-password@localhost:27017';
```

#### "Error: connect ECONNREFUSED"
```bash
# Solution: Ensure MongoDB is running
# For local installation:
mongod

# For Docker:
docker start mongodb
```

#### "Module 'mongodb' not found"
```bash
# Solution: Install the MongoDB driver
npm install mongodb
```

#### "Database connection timeout"
```bash
# Solution: Check network connectivity and firewall settings
# For Atlas: Ensure IP address is whitelisted
```

### Verification Steps

1. **Check MongoDB Status**
   ```bash
   # Local MongoDB
   mongosh --eval "db.adminCommand('ismaster')"
   
   # Docker
   docker ps | grep mongo
   ```

2. **Verify Data Insertion**
   ```bash
   mongosh plp_bookstore --eval "db.books.countDocuments()"
   ```

3. **Test Connection**
   ```javascript
   // Simple connection test
   const { MongoClient } = require('mongodb');
   const client = new MongoClient('your-connection-string');
   client.connect().then(() => console.log('Connected!')).catch(console.error);
   ```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-feature`
3. **Make your changes** and test thoroughly
4. **Commit changes**: `git commit -am 'Add new feature'`
5. **Push to branch**: `git push origin feature/new-feature`
6. **Submit a Pull Request**

### Contribution Ideas

- Add more sample books
- Include additional genres
- Create more complex example queries
- Add data validation schemas
- Include performance optimization examples

**Happy coding! 🚀**

*Last updated: May 2025*