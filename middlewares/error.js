export const errorMiddleware = (err,req,res,next)=>{
    err.message = err.message || "INTERNAL SERVER ERROR";
    return res.status(404).json({
        success:false,
        message:err.message,
    });
};