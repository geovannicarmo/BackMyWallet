import { getFinancialMovement, postFinancialMovement} from "../controllers/financialMovement.js";
import { Router } from "express";
import validateUser from "../middlewares/validateUser.js";

const router = Router();

router.post('/financialMovement', validateUser, postFinancialMovement)

router.get ('/financialMovement', validateUser, getFinancialMovement)

export default router;