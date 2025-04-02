import express from "express";
import { 
  createBooking, 
  getAllBookings, 
  getMentorBookings, 
  getBookingById, 
  updateBookingStatus, 
  deleteBooking 
} from "../Controllers/BooController.js";

const bookrouter = express.Router();

bookrouter.post("/book", createBooking);  // Book a mentor
bookrouter.get("/bookings", getAllBookings);  // Get all bookings
bookrouter.get("/booking/:id", getBookingById);  // Get booking by ID
bookrouter.get("/mentor/:mentorId", getMentorBookings);  // Get all bookings for a mentor
bookrouter.put("/updatebook/:id", updateBookingStatus);  // Update booking status (confirm/cancel)
bookrouter.delete("/deletebook:id", deleteBooking);  // Delete a booking

export default bookrouter;
