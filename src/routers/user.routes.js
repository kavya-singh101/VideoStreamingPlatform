import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser); // it will send a post request to the registerUser function in the user.controller.js file

// router.route("/login").post(loginUser);

export default router;