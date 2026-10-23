import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddEvent() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    location: "",
    price: "",
    organizerWhatsApp: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (!token) {
    navigate("/login");
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!imageFile) {
      setError("Please select an image.");
      return;
    }

    setSubmitting(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    data.append("image", imageFile);

    try {
      const response = await axios.post("http://localhost:5000/events", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/events/${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Add Event</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Event title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2"
          rows={4}
        />

        <input
          type="text"
          name="category"
          placeholder="Category (e.g. Music, Food)"
          value={formData.category}
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="text"
          name="time"
          placeholder="Time (e.g. 7:00 PM)"
          value={formData.time}
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="text"
          name="price"
          placeholder="Price (e.g. Free, ₦5,000)"
          value={formData.price}
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="text"
          name="organizerWhatsApp"
          placeholder="Organizer WhatsApp number (e.g. 2348012345678)"
          value={formData.organizerWhatsApp}
          onChange={handleChange}
          required
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="border rounded-lg px-4 py-2"
        />

        <button
          type="submit"
          disabled={submitting}
          className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}

export default AddEvent;