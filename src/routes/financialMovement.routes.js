import { getFinancialMovement, postFinancialMovement, getName, postlogOut} from "../controllers/financialMovement.js";
import { Router } from "express";
import validateUser from "../middlewares/validateUser.js";

const router = Router();

router.post('/financialMovement', validateUser, postFinancialMovement)

router.get ('/financialMovement', validateUser, getFinancialMovement)



router.get ('/name', getName)
router.post ('/logOut', postlogOut)



export default router;