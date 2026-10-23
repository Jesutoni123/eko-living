import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (isRegistering) {
        await axios.post("http://localhost:5000/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        // After successful registration, log them in right away
        const loginResponse = await axios.post("http://localhost:5000/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", loginResponse.data.token);
      } else {
        const response = await axios.post("http://localhost:5000/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", response.data.token);
      }

      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">
        {isRegistering ? "Create an Account" : "Login"}
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {isRegistering && (
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border rounded-lg px-4 py-2"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2"
        />

        <button
          type="submit"
          disabled={submitting}
          className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
        >
          {submitting ? "Please wait..." : isRegistering ? "Register" : "Login"}
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-600">
        {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-orange-500 font-semibold underline"
        >
          {isRegistering ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
}

export default Login;