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
export const getAvailableMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find(
      { availability: true },
      "name email expertise profilePic availableDays availableTime"
    );

    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mentors", error });
  }
};
export const updateMentorProfile = async (req, res) => {
  try {
    const { name, email, expertise, bio, availability, availableDays, availableTime } = req.body;
    const mentorId = req.user.id; // Get mentor ID from JWT payload

    // Find the mentor by ID
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    // Update the mentor's details if provided
    if (name) mentor.name = name;
    if (email) mentor.email = email;
    if (expertise) mentor.expertise = expertise;
    if (bio) mentor.bio = bio;
    if (availability !== undefined) mentor.availability = availability;
    if (availableDays) mentor.availableDays = availableDays;
    if (availableTime) mentor.availableTime = availableTime;

    // If a new profile picture is uploaded, upload to Cloudinary and update the mentor's profilePic field
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "MentorProfilePics",
        public_id: `mentor_${mentor._id}`,
      });
      mentor.profilePic = result.secure_url;
    }

    // Save the updated mentor information
    await mentor.save();

    res.status(200).json({ message: "Profile updated successfully", mentor });
  } catch (error) {
    console.error("Error updating mentor profile:", error);
    res.status(500).json({ message: "Error updating profile", error });
  }
};