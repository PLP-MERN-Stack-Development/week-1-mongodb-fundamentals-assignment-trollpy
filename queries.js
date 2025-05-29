// find all books 

const { title } = require("process")

db.books.find()

//find book by a specific author

db.books.find({ author: "George Orwell" })

// find books that are in stock
db.books.find({ in_stock: true })

//count the number of books

db.books.countDocuments()

// find books published between certain years

db.books.find({
    published_year: {
        $gte: 1940,
        $lte: 1960
    }
}).sort({ published_year: 1 })

//find books with "The" in the title

db.books.find({
    title: {
        $regex: "The",
        $options: "i" // case-insensitive
    }
})

// update the price of a book
db.books.updateOne(
    { author: "George Orwell",  },
    { $set: { price: 15.99 } }
)

// advanced query
// aggregation: avarage price by genre with book count

db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
      bookCount: { $sum: 1 },
      totalPages: { $sum: "$pages" }
    }
  },
  {
    $sort: { averagePrice: -1 }
  }
])

// find author with multiple books and their details

db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 },
      books: { $push: "$title" },
      avgPrice: { $avg: "$price" }
    }
  },
  {
    $match: { bookCount: { $gt: 1 } }
  },
  {
    $sort: { bookCount: -1 }
  }
])

//create text index for full-text search

// First create the text index
db.books.createIndex({ 
  title: "text", 
  author: "text", 
  genre: "text" 
})

// Then perform text search
db.books.find({ 
  $text: { $search: "brave dystopian" } 
}, {
  score: { $meta: "textScore" }
}).sort({ 
  score: { $meta: "textScore" } 
})