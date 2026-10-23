import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

const categories = ["Entertainment", "Food", "Nightlife", "Arts", "Outdoor/Leisure"];

function ExploreEvents() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "";

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const url = activeCategory
          ? `http://localhost:5000/events?category=${activeCategory}`
          : "http://localhost:5000/events";
        const response = await axios.get(url);
        setEvents(response.data);
      } catch (err) {
        setError("Could not load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [activeCategory]);

  const handleCategoryClick = (category) => {
    if (category === activeCategory) {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Explore Events</h1>

      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === category
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center py-16 text-gray-500">Loading events...</p>
      ) : error ? (
        <p className="text-center py-16 text-red-500">{error}</p>
      ) : events.length === 0 ? (
        <p className="text-gray-500">No upcoming events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              to={`/events/${event._id}`}
              key={event._id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition block"
            >
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-xs uppercase tracking-wide text-orange-500 font-semibold">
                  {event.category}
                </span>
                <h2 className="text-lg font-bold mt-1">{event.title}</h2>
                <p className="text-gray-500 text-sm mt-1">{event.location}</p>
                <p className="text-gray-900 font-medium mt-2">{event.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExploreEvents;