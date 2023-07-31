import  express  from "express";
import {login, register, getMyprofile,logout} from '../controllers/user.js';
import {isAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.post("/new",register);

router.post("/login",login);

router.get("/logout",logout);

router.route("/me").get(isAuthenticated,getMyprofile);

export default router;