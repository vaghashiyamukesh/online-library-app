import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";
import BookCard from "../components/BookCard";
import { useAuth } from "../context/AuthContext";

function BookDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  const [book, setBook] = useState(null);
  const [related, setRelated] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [bookResponse, booksResponse] = await Promise.all([
        api.get(`/books/${id}`),
        api.get("/books"),
      ]);

      setBook(bookResponse.data);
      setRelated(booksResponse.data.filter((item) => item._id !== id).slice(0, 4));
    };

    fetchData().catch((error) => {
      console.error(error);
      setMessage("Failed to load book details.");
    });
  }, [id]);

  const addToLibrary = async (status) => {
    if (!isAuthenticated) {
      setMessage("Please login before adding books to your library.");
      return;
    }

    try {
      await api.post("/dashboard/library", { bookId: id, status, progress: status === "reading" ? 10 : 0 });
      setMessage(`Book added to ${status}.`);
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not update library.");
    }
  };

  if (!book) {
    return (
      <main className="page">
        <p>Loading book...</p>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="detail-hero">
        <img
          className="book-cover detail-cover"
          src={book.coverUrl || `https://picsum.photos/seed/${book._id}/300/420`}
          alt={book.title}
          onError={(event) => {
            event.currentTarget.src = `https://picsum.photos/seed/fallback-${book._id}/300/420`;
          }}
        />
        <div>
          <h1>{book.title}</h1>
          <p>{book.author}</p>
          <div className="actions-row">
            <button className="solid-btn" onClick={() => addToLibrary("reading")}>
              Read Now
            </button>
            <button className="ghost-btn" onClick={() => addToLibrary("wishlist")}>
              Add to Wishlist
            </button>
            <button className="ghost-btn" onClick={() => addToLibrary("completed")}>
              Add to Library
            </button>
          </div>
          {message && <small>{message}</small>}
        </div>
      </section>

      <section className="content-block">
        <h2>Book Details</h2>
        <div className="details-grid">
          <p>Genre: {book.genre}</p>
          <p>Pages: {book.pages}</p>
          <p>Published: {book.published}</p>
          <p>Language: {book.language}</p>
        </div>
      </section>

      <section className="content-block">
        <h2>Description</h2>
        <p>{book.description}</p>
      </section>

      <section className="content-block">
        <h2>Reader Reviews</h2>
        <div className="review-grid">
          <article>User Review - Rating: {book.rating}</article>
          <article>User Review - Rating: {book.rating - 0.4}</article>
          <article>User Review - Rating: {book.rating - 0.2}</article>
        </div>
      </section>

      <section className="content-block">
        <h2>Related Books</h2>
        <div className="arrivals-grid">
          {related.map((relatedBook) => (
            <BookCard key={relatedBook._id} book={relatedBook} compact />
          ))}
        </div>
      </section>
    </main>
  );
}

export default BookDetailPage;
