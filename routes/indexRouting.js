import express from "express";
import router from "./courseRoutes.js";
import communityrouter from "./communityRoutes.js";
import authrouter from "./authRoutes.js";


const mainRouter=express.Router();
mainRouter.use("/user",authrouter)
mainRouter.use("/community", communityrouter)
mainRouter.use("/course", router)
export default mainRouter;