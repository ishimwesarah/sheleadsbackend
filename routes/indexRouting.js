import express from "express";
import router from "./courseRoutes.js";
import communityrouter from "./communityRoutes.js";
import authrouter from "./authRoutes.js";
import mentorrouter from "./mentorRoute.js";
import adminrouter from "./AdminRoutes.js";
import blogrouter from "./blogRoutes.js";
import bookrouter from "./Book.js";
import sessionrouter from "./session.js";


const mainRouter=express.Router();
mainRouter.use("/user",authrouter)
mainRouter.use("/community", communityrouter)
mainRouter.use("/mentor", mentorrouter)
mainRouter.use("/Admin", adminrouter)
mainRouter.use("/course", router)
mainRouter.use("/Blog", blogrouter)
mainRouter.use("/booking", bookrouter)
mainRouter.use("/session", sessionrouter)



export default mainRouter;