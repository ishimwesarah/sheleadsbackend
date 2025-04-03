import Session from "../model/session.js";
import Mentor from "../model/mentor.js";
import User from "../model/user.js";

export const bookSession = async (req, res) => {
  try {
    const menteeId = req.userId; // Get mentee ID from authenticated user
    const { mentorId, date, time } = req.body;

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    const mentee = await User.findById(menteeId);
    if (!mentee) return res.status(404).json({ message: "Mentee not found" });

    const newSession = new Session({
      mentee: menteeId,
      mentor: mentorId,
      date,
      time,
      status: "Upcoming",
    });

    await newSession.save();

    res.status(201).json({ message: "Session booked successfully", session: newSession });
  } catch (error) {
    res.status(500).json({ message: "Error booking session", error });
  }
};

// Get booked sessions for a mentee
export const getMenteeSessions = async (req, res) => {
  try {
    const { menteeId } = req.params;
    const mentee = await Mentee.findById(menteeId).populate("sessions.mentor", "name email expertise");

    if (!mentee) return res.status(404).json({ message: "Mentee not found" });

    res.status(200).json(mentee.sessions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sessions", error });
  }
};

// Get booked sessions for a mentor
export const getMentorSessions = async (req, res) => {
    try {
      const { mentorId } = req.params;
      
      const sessions = await Session.find({ mentor: mentorId }).populate("mentee", "name email"); // Get mentees' details
  
      res.status(200).json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching mentor's sessions", error });
    }
  };
  