import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Home from "./Pages/Home";
import ExploreEvents from "./pages/ExploreEvents";
import EventDetail from "./pages/EventDetail";
import AddEvent from "./pages/AddEvent";
import About from "./pages/About";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore-events" element={<ExploreEvents />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/events/new" element={<AddEvent />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
