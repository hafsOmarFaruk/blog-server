import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { error } from "node:console";

const createToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: SignOptions,
) => {
  const token = jwt.sign(payload, secret, { expiresIn } as SignOptions);

  return token;
};

const verifiedToken = (token: string, secret: string) => {
  //  const verifiedToken=jwt.verify(token,secret);
  //  return verifiedToken;
  try {
    const verifiedToken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifiedToken,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const jwtUtils = {
  createToken,
  verifiedToken,
};
