import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import { auth } from "../../middleware/auth";

const router = Router();

// declare global {
//   namespace Express {
//     interface Request {
//       user?: {
//         email: string;
//         name: string;
//         id: string;
//         role: Role;
//       };
//     }
//   }
// }

router.post("/register", userController.createUser);
router.get(
  "/me",
  //   (req: Request, res: Response, next: NextFunction) => {
  //     const { accessToken } = req.cookies;

  //     const verifiedToken = jwtUtils.verifiedToken(
  //       accessToken,
  //       config.jwt_access_secret,
  //     );
  //     // if (typeof verifiedToken === "string") {
  //     //   throw new Error(verifiedToken);
  //     // }
  //     if (!verifiedToken.success) {
  //       throw new Error(verifiedToken.error);
  //     }
  //     const { email, name, id, role } = verifiedToken.data as JwtPayload;

  //     // const requiredRoles=['ADMIN',"USER","AUTHOR"];
  //     const requiredRoles = [Role.ADMIN, Role.USER];

  //     if (!requiredRoles.includes(role)) {
  //       return res.status(403).json({
  //         success: false,
  //         statusCode: 403,
  //         message: "Forbiden",
  //       });
  //     }
  //     req.user = {
  //       email,
  //       name,
  //       id,
  //       role,
  //     };

  //     next();
  //   },
  auth(Role.ADMIN, Role.USER),
  userController.getMyProfile,
);


router.put("/my-profile",auth(Role.ADMIN,Role.USER),userController.updateMyProfile)

export const UserRoutes = router;

//    || req.headers.authorization?.startsWith("Bearer")
//     ? req.headers.authorization?.split(" ")[1]
//     : req.headers.authorization;
