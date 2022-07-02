import { signUp, logIn } from "../controllers/authenticationController.js";
import { Router } from "express";

const router = Router();

router.post('/signUp', signUp)

router.post('/', logIn)

export default router;