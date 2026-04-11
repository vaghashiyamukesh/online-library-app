import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import BookCard from "../components/BookCard";

function BrowsePage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [view, setView] = useState("catalog");

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await api.get("/books", {
        params: {
          ...(search ? { search } : {}),
          ...(category ? { category } : {}),
        },
      });
      setBooks(response.data);
    };

    fetchBooks().catch((error) => {
      console.error("Failed to load browse books", error);
      setBooks([]);
    });
  }, [search, category]);

  const categories = useMemo(() => {
    const unique = new Set(books.map((book) => book.category));
    return ["", ...Array.from(unique)];
  }, [books]);

  return (
    <main className="page">
      <section className="search-panel browse-filters">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by title or author..."
        />

        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => (
            <option key={item || "all"} value={item}>
              {item || "All Categories"}
            </option>
          ))}
        </select>
      </section>

      <section className="content-block">
        <div className="tab-row">
          <button
            type="button"
            className={view === "catalog" ? "solid-btn" : "ghost-btn"}
            onClick={() => setView("catalog")}
          >
            Catalog
          </button>
          <button
            type="button"
            className={view === "list" ? "solid-btn" : "ghost-btn"}
            onClick={() => setView("list")}
          >
            List
          </button>
        </div>

        {view === "catalog" ? (
          <div className="book-grid browse-grid">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="list-view">
            <div className="list-head">
              <span>Cover</span>
              <span>Title</span>
              <span>Author</span>
              <span>Category</span>
              <span>Action</span>
            </div>
            {books.map((book) => (
              <div className="list-row" key={book._id}>
                <img
                  src={book.coverUrl || `https://picsum.photos/seed/${book._id}/120/160`}
                  alt={book.title}
                  onError={(event) => {
                    event.currentTarget.src = `https://picsum.photos/seed/fallback-${book._id}/120/160`;
                  }}
                />
                <span>{book.title}</span>
                <span>{book.author}</span>
                <span>{book.category}</span>
                <Link className="ghost-btn" to={`/books/${book._id}`}>
                  View
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default BrowsePage;
