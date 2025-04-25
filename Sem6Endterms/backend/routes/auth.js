import express from "express";
import { signup, signin, signout, verifytoken, googleAuth } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);



router.get("/:id/verify/:token/", verifytoken);
router.post("/signout", signout);
router.post("/google", googleAuth);

export default router;