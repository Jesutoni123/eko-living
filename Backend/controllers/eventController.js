const Event = require("../models/Event");
const getEvents = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = { date: { $gte: new Date() } };
    if (category) {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    const events = await Event.find(filter).sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, category, date, time, location, price, organizerWhatsApp } = req.body;

    if (!title || !description || !category || !date || !time || !location || !price || !organizerWhatsApp) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const event = await Event.create({
      title,
      description,
      category,
      date,
      time,
      location,
      price,
      imageUrl: req.file.path,
      organizerWhatsApp,
      createdBy: req.user.id,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getEvents, getEventById, createEvent,
  
};