import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js"
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import {errorMiddleware} from "./middlewares/error.js"
import cors from "cors";


export const app = express();

config({
    path:"./data/config.env",
});

// middleware to use json files
app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials: true,
}));

///user will be adddedto the all the routers and no need to write it 
app.use("/api/v1/user",userRouter);
app.use("/api/v1/task",taskRouter);

app.get('/',(req,res)=>{
    res.send("Nicely working");
});


// using error middleware
app.use(errorMiddleware);

// cors for server deploymern
// npm i cors