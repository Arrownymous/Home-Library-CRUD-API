const express = require('express');
const cors = require('cors');
const {MongoClient, ObjectId} = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());  // For parsing JSON data

const uri = "mongodb://localhost:27017";  // MongoDB connection string
const dbName = 'mydb';  // The database we will use
let db;

// Connect to MongoDB
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db(dbName);  // Selecting the 'mydb' database
    console.log('MongoDB connection successful');
  })
  .catch(err => {
    console.error('MongoDB connection failed', err);
  });

  // Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Book Library API!');
});

// Create a book (POST)
app.post('/books', (req, res) => {
  const book = req.body;  // Book data in JSON format
  const collection = db.collection('books');  // Accessing the 'books' collection

  collection.insertOne(book)
    .then(result => {
      res.status(201).send(`Book added: ${result.insertedId}`);
    })
    .catch(err => {
      res.status(500).send('An error occurred while adding the book');
    });
});

// Get all books (GET)
app.get('/books', (req, res) => {
  const collection = db.collection('books');

  collection.find().toArray()
    .then(books => {
      res.json(books);  // Sending books as JSON
    })
    .catch(err => {
      res.status(500).send('An error occurred while retrieving books');
    });
});

// Get a book by id (GET)
app.get('/books/:id', (req, res) => {
  const { id } = req.params;  // Getting the book ID from params
  const collection = db.collection('books');

  collection.findOne({ _id: new ObjectId(id) })
    .then(book => {
      if (!book) {
        res.status(404).send('Book not found');
        return;
      }
      res.json(book);  // Sending the book as JSONnd
    })
    .catch(err => {
      res.status(500).send('An error occurred while retrieving books');
    });
});

// Update a book (PUT)
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const updatedBook = req.body;  // Updated book data
  const collection = db.collection('books');

  collection.updateOne(
    { _id: new ObjectId(id) },  // Finding the book by ID
    { $set: updatedBook }  // Updating the book
  )
    .then(result => {
      if (result.matchedCount === 0) {
        res.status(404).send('Book not found');
        return;
      }
      res.send(`Book updated: ${id}`);
    })
    .catch(err => {
      res.status(500).send('An error occurred while updating the book');
    });
});

// Delete a book (DELETE)
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const collection = db.collection('books');

  collection.deleteOne({ _id: new ObjectId(id) })
    .then(result => {
      if (result.deletedCount === 0) {
        res.status(404).send('Book not found');
        return;
      }
      res.send(`Book deleted: ${id}`);
    })
    .catch(err => {
      res.status(500).send('An error occurred while deleting the book');
    });
});

  // Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});