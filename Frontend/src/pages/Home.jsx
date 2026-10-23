import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import heroImage from "../assets/heroImage.jpg";

const categories = ["Entertainment", "Food", "Nightlife", "Arts", "Outdoor/Leisure"];

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/events");
        setEvents(response.data.slice(0, 6));
      } catch (err) {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {/* Hero section */}
      <div
        className="relative h-[80vh] bg-cover bg-center flex items-center px-8 md:px-16"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-xl text-white">
          <p className="uppercase tracking-widest text-sm font-semibold mb-4 text-orange-300">
            Lagos Events & Experiences
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Lagos is Live.
          </h1>
          <p className="text-lg mb-8 text-gray-200">
            Discover events, places, and things to do, all in one place.
          </p>
          <Link
            to="/explore-events"
            className="inline-block bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Explore Events
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 py-10 px-4">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/explore-events?category=${category}`}
            className="border-2 border-orange-200 text-gray-700 px-5 py-2 rounded-full text-sm font-medium hover:border-orange-500 hover:text-orange-600 cursor-pointer transition"
          >
            {category}
          </Link>
        ))}
      </div>

      {/* Upcoming events */}
      <div className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <Link to="/explore-events" className="text-orange-500 font-semibold text-sm">
            See all
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-500">No upcoming events yet. Be the first to add one.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link
                to={`/events/${event._id}`}
                key={event._id}
                className="rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition block"
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
                  <h3 className="text-lg font-bold mt-1">{event.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{event.location}</p>
                  <p className="text-gray-900 font-medium mt-2">{event.price}</p>
                </div>
              </Link>
            ))}
          </div> 
        )}
      </div>

      {/* Why EKO Living */}
      <div className="bg-gray-50 px-6 py-16 text-center">
        <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold uppercase px-3 py-1 rounded-full mb-4">
          Why EKO Living
        </span>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 max-w-xl mx-auto">
          Lagos never runs out of things happening, you just haven't found them yet.
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Picnics, beach days, poetry nights, small gatherings someone's
          putting together. EKO Living brings it all into one place, so
          finding something to do stops being the hard part.
        </p>
      </div>

      {/* How it works */}
      <div className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-xl p-6 text-center">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold mb-4 mx-auto">
              1
            </div>
            <h3 className="font-bold mb-2">Browse</h3>
            <p className="text-gray-600 text-sm">
              No account needed. Explore events by category.
            </p>
          </div>

          <div className="border rounded-xl p-6 text-center">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold mb-4 mx-auto">
              2
            </div>
            <h3 className="font-bold mb-2">RSVP</h3>
            <p className="text-gray-600 text-sm">
              Found something you like? Connect with the host on WhatsApp by
              clicking the RSVP link.
            </p>
          </div>

          <div className="border rounded-xl p-6 text-center">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold mb-4 mx-auto">
              3
            </div>
            <h3 className="font-bold mb-2">Host</h3>
            <p className="text-gray-600 text-sm">
              Create a free account and let Lagos find your event.
            </p>
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      <div className="bg-black text-white px-6 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Got something happening?
        </h2>
        <p className="text-gray-300 mb-8 max-w-md mx-auto">
          Share it with Lagos. Add your event and let people find you.
        </p>
        <Link
          to={localStorage.getItem("token") ? "/events/new" : "/login"}
          className="inline-block bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Add Your Event
        </Link>
      </div>
    </div>
  );
}

export default Home;