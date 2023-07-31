import {app} from "./app.js";
import {connectDb} from "./data/database.js"

// install jsonwebtoken
// install bcrypt

connectDb();
// console.log(process.env.PORT);
app.listen(process.env.PORT,()=>{
    console.log(`server is working on port :${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

   