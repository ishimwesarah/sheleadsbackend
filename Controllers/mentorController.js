import Mentor from "../model/mentor.js";

// ✅ Add a new mentor
export const addMentor = async (req, res) => {
  try {
    const { name, email, expertise, bio, availability, availableDays, availableTime } = req.body;
    const profilePic = req.file?.path || ""; // Cloudinary URL

    const existingMentor = await Mentor.findOne({ email });
    if (existingMentor) return res.status(400).json({ message: "Mentor already exists" });

    const newMentor = new Mentor({ name, email, expertise, bio, availability, availableDays, availableTime, profilePic });
    await newMentor.save();

    res.status(201).json(newMentor);
  } catch (error) {
    res.status(500).json({ message: "Error adding mentor", error });
  }
};

// ✅ Get all mentors
export const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mentors", error });
  }
};

// ✅ Get a single mentor by ID
export const getMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    res.status(200).json(mentor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mentor", error });
  }
};
export const updateMentorPic = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    mentor.profilePic = req.file.path; // Cloudinary URL
    await mentor.save();

    res.status(200).json({ message: "Mentor profile updated", profilePic: mentor.profilePic });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile picture", error });
  }
};

// ✅ Update a mentor
export const updateMentor = async (req, res) => {
  try {
    const { name, email, expertise, bio, availability, availableDays, availableTime } = req.body;
    
    const updatedMentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      { name, email, expertise, bio, availability, availableDays, availableTime },
      { new: true }
    );

    if (!updatedMentor) return res.status(404).json({ message: "Mentor not found" });

    res.status(200).json(updatedMentor);
  } catch (error) {
    res.status(500).json({ message: "Error updating mentor", error });
  }
};


// ✅ Delete a mentor
export const deleteMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndDelete(req.params.id);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    res.status(200).json({ message: "Mentor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting mentor", error });
  }
};

export const uploadMentorPic = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    mentor.profilePic = req.file.path; // Cloudinary URL
    await mentor.save();

    res.status(200).json({ message: "Mentor profile picture updated", profilePic: mentor.profilePic });
  } catch (error) {
    res.status(500).json({ message: "Error uploading profile picture", error });
  }
};