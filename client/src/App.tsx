import { useEffect, useState } from 'react';
import './App.css';

type Book = {
  _id: string;
  title: string;
  author: string;
};

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/books')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="center-text">Loading books...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div className="app-container top-align">
      <h1 className="app-title">Boekenlijst 📚</h1>

      {books.length === 0 ? (
        <p className="center-text">Geen boeken gevonden.</p>
      ) : (
        <ul className="book-list">
          {books.map((book) => (
            <li key={book._id} className="book-item">
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">door {book.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;