import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/library-logo.svg";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="top-nav">
      <Link className="logo" to="/" aria-label="ShelfNest home">
        <img src={logo} alt="ShelfNest logo" className="brand-logo" />
      </Link>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/browse">Browse</NavLink>
        <NavLink to="/browse">Categories</NavLink>
        <NavLink to="/dashboard">My Library</NavLink>
      </nav>

      {isAuthenticated ? (
        <button className="ghost-btn" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link className="ghost-btn" to="/auth">
          Login
        </Link>
      )}
    </header>
  );
}

export default NavBar;
