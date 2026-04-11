import { useEffect, useMemo, useState } from "react";
import api from "../api/client";
import BookCard from "../components/BookCard";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await api.get("/books", {
          params: {
            ...(search ? { search } : {}),
            ...(selectedCategory ? { category: selectedCategory } : {}),
          },
        });
        setBooks(response.data);
      } catch (error) {
        console.error("Failed to load books", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [search, selectedCategory]);

  const featuredBooks = useMemo(() => books.slice(0, 4), [books]);
  const categories = useMemo(() => {
    const unique = new Set(books.map((book) => book.category));
    return Array.from(unique).slice(0, 8);
  }, [books]);
  const arrivals = useMemo(() => books.slice(0, 5), [books]);

  return (
    <main className="page">
      <section className="search-panel">
        <input
          type="text"
          placeholder="Search for books..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </section>

      <section className="content-block">
        <h2>Featured Books</h2>
        {loading ? <p>Loading books...</p> : <div className="book-grid">{featuredBooks.map((book) => <BookCard key={book._id} book={book} />)}</div>}
      </section>

      <section className="content-block">
        <h2>Popular Categories</h2>
        <div className="tag-grid">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={`tag-chip ${selectedCategory === category ? "active-tag" : ""}`}
              onClick={() => setSelectedCategory((prev) => (prev === category ? "" : category))}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="content-block">
        <h2>New Arrivals</h2>
        <div className="arrivals-grid">
          {arrivals.map((book) => (
            <BookCard key={`arrival-${book._id}`} book={book} compact />
          ))}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
