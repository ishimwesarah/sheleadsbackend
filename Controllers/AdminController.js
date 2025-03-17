import Admin from "../model/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Get Admin Details
export const getAdminDetails = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin details", error });
  }
};

// ✅ Update Admin Profile
export const updateAdminProfile = async (req, res) => {
  try {
    const { name, email, profilePic } = req.body;
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.user.id,
      { name, email, profilePic },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

// ✅ Change Admin Password
export const changeAdminPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.findByIdAndUpdate(req.user.id, { password: hashedPassword });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error changing password", error });
  }
};

// ✅ Update Platform Settings
export const updateSettings = async (req, res) => {
  try {
    const { allowRegistration } = req.body;

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.user.id,
      { allowRegistration },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: "Error updating settings", error });
  }
};

// ✅ Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ token, admin: { _id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
