import { Link } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-12 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-white">
          <Logo />
          EKOLIVING
        </Link>

        <div className="flex gap-6 text-sm">
          <Link to="/explore-events" className="hover:text-orange-400 transition">
            Explore Events
          </Link>
          <Link to="/about" className="hover:text-orange-400 transition">
            About
          </Link>
          <Link to="/login" className="hover:text-orange-400 transition">
            Login
          </Link>
        </div>

        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} EKO Living. Lagos, Nigeria.
        </p>
      </div>
    </footer>
  );
}

export default Footer;