import {Router} from "express"
import {resgisterUser} from "../utils/asyncHandler.js"

const router = Router();

router.route("/resgister").post(resgisterUser)

export default router;