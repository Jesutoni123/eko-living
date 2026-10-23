import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm">
      <Link to="/" className="flex items-center gap-2 font-bold text-lg">
        <Logo />
        EKO LIVING
      </Link>

      <div className="flex gap-6">
        <Link to="/explore-events">Explore Events</Link>
        <Link to="/about">About</Link>
        {isLoggedIn && <Link to="/events/new">Add Event</Link>}
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;