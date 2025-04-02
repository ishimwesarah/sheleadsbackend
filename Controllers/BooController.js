import Booking from "../model/booking.js";
import Mentor from "../model/mentor.js";

// Create a new booking
export const createBooking = async (req, res) => {
    try {
      const { mentorId, menteeName, menteeEmail, date, time } = req.body;
  
      // Fetch mentor details automatically
      const mentor = await Mentor.findById(mentorId);
      if (!mentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }
  
      // Create booking and save to DB
      const booking = new Booking({
        mentor: mentorId,
        menteeName,
        menteeEmail,
        date,
        time
      });
  
      await booking.save();
      res.status(201).json({ message: "Booking successful", booking });
    } catch (error) {
      res.status(500).json({ message: "Error creating booking", error });
    }
  };

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("mentor", "name email expertise");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

// Get all bookings for a specific mentor
export const getMentorBookings = async (req, res) => {
  try {
    const mentorId = req.params.mentorId;
    const bookings = await Booking.find({ mentor: mentorId }).populate("mentor", "name email expertise");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mentor's bookings", error });
  }
};

// Get a single booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("mentor", "name email expertise");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking", error });
  }
};

// Update a booking status (confirm/cancel)
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ message: "Booking status updated", booking });
  } catch (error) {
    res.status(500).json({ message: "Error updating booking", error });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error });
  }
};
