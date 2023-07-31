import express from "express";
import {deleteTask, getMytasks, newtask, updateTask} from "../controllers/task.js";
import {isAuthenticated} from "../middlewares/auth.js";

const router = express.Router();


router.post("/new", isAuthenticated,newtask);

router.get("/my", isAuthenticated,getMytasks);

router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);

export default  router;