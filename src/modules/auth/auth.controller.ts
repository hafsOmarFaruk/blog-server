import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendREsponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const logingUser=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const payload=req.body;
    const logingUserResult=await authService.logingUser(payload);

    sendREsponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:"user looged in successfully",
        data:logingUserResult
    })
})

export const authController={
    logingUser
}