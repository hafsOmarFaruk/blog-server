import express, { Request, Response } from "express";
import httpStatus from "http-status";

import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendREsponse } from "../../utils/sendResponse";





// const createUser = async (req: Request, res: Response) => {
//   try {
//     const payload = req.body;

//     const user = await userService.registerUserIntoDB(payload);

//     res.status(httpStatus.CREATED).json({
//       sucess: true,
//       statusCode: httpStatus.CREATED,
//       message: "User registred successfully",
//       data: user,
//     });
//   } catch (error: any) {
//     res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       sucess: false,
//       statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//       message: "Faild to register user",
//       error: error.message,
//     });
//   }
// };

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const user = await userService.registerUserIntoDB(payload);

  // res.status(httpStatus.CREATED).json({
  //   sucess: true,
  //   statusCode: httpStatus.CREATED,
  //   message: "User registred successfully",
  //   data: user,
  // });

  sendREsponse(res,{
    success:true,
    statusCode:httpStatus.CREATED,
    message:"user created succesfully",
    data:{user}
  })
});

export const userController = {
  createUser,
};
