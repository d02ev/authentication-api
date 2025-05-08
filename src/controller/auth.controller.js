import { asyncHandler } from "../util/async-handler";
import { registerUser, loginUser } from "../service/auth.service";
import RegisterUserDto from "../dto/RegisterUserDto";
import LoginUserDto from "../dto/LoginUserDto";

const cookieOpts = {
  httpOnly: Boolean(process.env.COOKIE_HTTP_ONLY),
  secure: Boolean(process.env.COOKIE_SECURE),
  path: process.env.COOKIE_PATH,
  domain: process.env.COOKIE_DOMAIN
}

export const register = asyncHandler(async (req, res, next) => {
  const registerUserDto = new RegisterUserDto(req);
  const registerUserResponse = await registerUser(registerUserDto);
  return res.status(registerUserResponse.statusCode).json(registerUserResponse);
});

export const login = asyncHandler(async (req, res, next) => {
  const loginUserDto = new LoginUserDto(req);
  const loginUserResponse = await loginUser(loginUserDto);

  res.cookie("access_token", loginUserResponse.accessToken, cookieOpts);
  res.cookie("refresh_token", loginUserResponse.refreshToken, cookieOpts);

  return res.status(loginUserResponse.statusCode).json(loginUserResponse);
});