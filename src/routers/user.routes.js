import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from '../middlewares/multer.middleware.js';

const router = Router();

router.route("/register").post(
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 }
    ]),
    // accept multiple files with the same fieldname 

    registerUser); // it will send a post request to the registerUser function in the user.controller.js file

// router.route("/login").post(loginUser);

export default router;