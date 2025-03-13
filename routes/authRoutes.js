import express from "express";
import { register, login, getUsers } from "../Controllers/authController.js";

const authrouter = express.Router();

// User Registration
authrouter.post("/register", register);

// User Login
authrouter.post("/login", login);
authrouter.get("/getUser", getUsers);

export default authrouter;
