import e from "express";
import {Task} from "../models/task.js";

export const newtask=async(req,res)=>{
    try {
        const{title,description}=req.body;
        // const task = new Task({task,description});
        // await task.save()
        await Task.create({title,description,user:req.user});
        
        res.status(201).json({
            success:true,
            message:"Task added successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const getMytasks = async(req,res)=>{
    try {
        const userid = req.user._id;

        const tasks = await Task.find({user:userid});

        res.status(200).json({
            success:true,
            tasks
        });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async(req,res,next)=>{
    try {
        const {id} = req.params;

        const task = await Task.findById(id);

        if(!task) return next(new Error("Task not found"));

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            success:true,
            message:"Task updated"
        })
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async(req,res,next)=>{
    try {
        const {id} = req.params;

        const task = await Task.findById(id);

        if(!task) return next(new Error("Task not found"));
        
        await task.deleteOne();

        res.status(200).json({
            success:true,
            message:"Task deleted"
        })
    } catch (error) {
        next(error);
    }
};
