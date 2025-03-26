import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const protect =  (req, res, next) => {
  try {
    console.log("Checking authentication..."); // ✅ Log middleware execution

    const token = req.header("Authorization"); // ✅ Get token from headers
    if (!token) {
      console.error("No token provided");
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const tokenWithoutBearer = token.replace("Bearer ", "").trim(); // ✅ Remove "Bearer " and trim spaces
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    
    req.user = decoded;
    console.log("User authenticated:", decoded); // ✅ Log successful authentication
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};