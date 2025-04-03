import express from "express";
import { bookSession, getMenteeSessions, getMentorSessions } from "../Controllers/menteeController.js";

const sessionrouter = express.Router();

sessionrouter.post("/book", bookSession); // Book a session
sessionrouter.get("/mentee/:menteeId", getMenteeSessions); // Get mentee's booked sessions
sessionrouter.get("/mentor/:mentorId", getMentorSessions); // Get mentor's sessions

export default sessionrouter;
