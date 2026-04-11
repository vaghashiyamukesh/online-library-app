import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!isAuthenticated) {
        setError("Please log in to view your dashboard.");
        return;
      }

      try {
        const response = await api.get("/dashboard");
        setDashboard(response.data);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Could not load dashboard.");
      }
    };

    fetchDashboard();
  }, [isAuthenticated]);

  if (error) {
    return (
      <main className="page">
        <p>{error}</p>
        <Link className="solid-btn" to="/auth">
          Go to Login
        </Link>
      </main>
    );
  }

  if (!dashboard) {
    return (
      <main className="page">
        <p>Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main className="page dashboard-layout">
      <aside className="dashboard-sidebar">
        <button type="button">Dashboard</button>
        <button type="button">My Books</button>
        <button type="button">Reading List</button>
        <button type="button">Favorites</button>
        <button type="button">Settings</button>
      </aside>

      <section className="dashboard-content">
        <div className="stats-grid">
          <article>
            <h3>Books Reading</h3>
            <p>{dashboard.stats.reading}</p>
          </article>
          <article>
            <h3>Books Completed</h3>
            <p>{dashboard.stats.completed}</p>
          </article>
          <article>
            <h3>Wishlist</h3>
            <p>{dashboard.stats.wishlist}</p>
          </article>
        </div>

        <section className="content-block">
          <h2>Currently Reading</h2>
          <div className="reading-grid">
            {dashboard.currentlyReading.map((item) => (
              <Link to={`/books/${item.book._id}`} className="reading-item" key={item._id}>
                <img
                  className="book-cover dashboard-cover"
                  src={item.book.coverUrl || `https://picsum.photos/seed/${item.book._id}/160/220`}
                  alt={item.book.title}
                  onError={(event) => {
                    event.currentTarget.src = `https://picsum.photos/seed/fallback-${item.book._id}/160/220`;
                  }}
                />
                <div>
                  <h3>{item.book.title}</h3>
                  <p>{item.book.author}</p>
                  <progress value={item.progress} max="100" />
                  <small>Progress: {item.progress}%</small>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="content-block two-col">
          <article>
            <h2>Recent Activity</h2>
            <ul>
              {dashboard.activity.map((item) => (
                <li key={item.id}>{item.text}</li>
              ))}
            </ul>
          </article>

          <article>
            <h2>Recommended for You</h2>
            <ul>
              {dashboard.recommended.map((book) => (
                <li key={book._id}>{book.title}</li>
              ))}
            </ul>
          </article>
        </section>
      </section>
    </main>
  );
}

export default DashboardPage;
