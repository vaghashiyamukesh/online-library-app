import { Link } from "react-router-dom";

function BookCard({ book, compact = false }) {
  return (
    <Link to={`/books/${book._id}`} className={`book-card ${compact ? "compact" : ""}`}>
      <img
        className="book-cover"
        src={book.coverUrl || `https://picsum.photos/seed/${book._id}/240/320`}
        alt={book.title}
        onError={(event) => {
          event.currentTarget.src = `https://picsum.photos/seed/fallback-${book._id}/240/320`;
        }}
      />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </Link>
  );
}

export default BookCard;
