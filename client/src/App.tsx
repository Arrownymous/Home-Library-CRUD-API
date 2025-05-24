import { useState, useEffect } from 'react';
import './App.css';

interface Book {
  _id?: string;
  title: string;
  author: string;
  description: string;
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Form fields
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    fetch('http://localhost:3000/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(console.error);
  };

  const addBook = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim()) {
      setMessage('Titel en auteur zijn verplicht.');
      return;
    }

    const newBook = { title: title.trim(), author: author.trim(), description: description.trim() };

    try {
      const res = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });

      if (res.ok) {
        setMessage('Boek toegevoegd!');
        fetchBooks();
        setShowForm(false);
        setTitle('');
        setAuthor('');
        setDescription('');
      } else {
        setMessage('Fout bij toevoegen boek.');
      }
    } catch (error) {
      setMessage('Error: ' + error);
    }
  };

  return (
    <>
      {/* Menu bar */}
      <header className="app-header">
        <div className="app-title">Boekenbibliotheek</div>
        <button
          onClick={() => setShowForm(true)}
          aria-label="Nieuw boek toevoegen"
          className="add-book-btn"
        >
          +
        </button>
      </header>

      {/* Modal form */}
      {showForm && (
        <div className="modal-backdrop">
          <form onSubmit={addBook} className="modal-form">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="modal-close-btn"
              aria-label="Sluit formulier"
            >
              ×
            </button>

            <h2>Nieuw boek toevoegen</h2>

            <label>
              Titel:
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="input-field"
              />
            </label>

            <label>
              Auteur:
              <input
                type="text"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                required
                className="input-field"
              />
            </label>

            <label>
              Beschrijving:
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                className="input-field textarea-field"
              />
            </label>

            <button type="submit" className="submit-btn">
              Voeg toe
            </button>

            {message && <p className="message">{message}</p>}
          </form>
        </div>
      )}

      {/* Books list centered */}
      <main className="books-container">
        {books.length === 0 && (
          <p className="no-books-msg">Geen boeken gevonden.</p>
        )}

        {books.map(book => (
          <div key={book._id} className="book-card">
            <h2>{book.title}</h2>
            <p className="book-author">Auteur: {book.author}</p>
            <p className="book-description">{book.description}</p>
          </div>
        ))}
      </main>
    </>
  );
}

export default App;

