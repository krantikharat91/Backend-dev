import  {User}  from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const login =  async(req,res)=>{
    const {email,password} = req.body;

    let user = await User.findOne({email}).select("+password");

    if(!user) return res.status(404).json({
        success:false,
        message:"Invalid email or password"
    });

    const matched = bcrypt.compare(password,user.password);
    if(!matched) return res.status(200).json({
        success:false,
        message:"Invalid email or password",
    });

    // read
    sendCookie(user,res,`Welcome back, ${user.name}`,200);
};

export const logout = (req,res)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Development"?"lax":'none',
        secure:process.env.NODE_ENV==="Development"?false:true,
    }).json({
        success:true,
        user:req.user
    })
} 
 
export const register = async (req,res)=>{
    const {name,email,password} = req.body;
    let user = await User.findOne({email});
    if(user) return res.status(404).json({
        success:false,
        message:"User already exists",
    });

    const hashedPassword = await bcrypt.hash(password,10);

    user = await User.create({name,email,password:hashedPassword});

    // 201 created 
    sendCookie(user,res,"Registered successfully",201);
};

export const getMyprofile = async (req,res)=>{
    
    res.status(200).json({
        success:true,
        user:req.user
    });
};