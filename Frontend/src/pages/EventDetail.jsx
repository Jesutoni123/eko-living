import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        setError("Could not load this event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <p className="text-center py-16 text-gray-500">Loading event...</p>;
  }

  if (error) {
    return <p className="text-center py-16 text-red-500">{error}</p>;
  }

  const whatsappMessage = encodeURIComponent(`Hi, I'd like to attend ${event.title}`);
  const whatsappLink = `https://wa.me/${event.organizerWhatsApp}?text=${whatsappMessage}`;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <img
        src={event.imageUrl}
        alt={event.title}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />

      <span className="text-xs uppercase tracking-wide text-orange-500 font-semibold">
        {event.category}
      </span>

      <h1 className="text-3xl font-bold mt-2 mb-4">{event.title}</h1>

      <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
        <span>📅 {new Date(event.date).toLocaleDateString()}</span>
        <span>🕒 {event.time}</span>
        <span>📍 {event.location}</span>
      </div>

      <p className="text-gray-800 mb-6">{event.description}</p>

      <p className="text-xl font-bold mb-6">{event.price}</p>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        RSVP
      </a>
    </div>
  );
}

export default EventDetail;