import { findByUsername, save, addRefreshToken } from "../repository/user.repository";
import { comparePassword, generatePasswordHash } from "../util/password.service";
import { generateAccessToken, generateRefreshToken } from "../util/token.service";
import BadRequestError from "../error/bad-request.error";
import InternalServerError from "../error/internal-server.error";
import NotFoundError from "../error/not-found.error";
import RegisterUserResponse from "../dto/RegisterUserResponse";
import LoginUserResponse from "../dto/LoginUserResponse";

export const registerUser = async (registerUserDto) => {
  const { username, password } = registerUserDto;
  const existingUser = await findByUsername(username);

  if (existingUser) {
    throw new BadRequestError("User already exists");
  }

  const passwordHash = await generatePasswordHash(password);
  const newUser = await save(username, passwordHash);

  if (!newUser) {
    throw new InternalServerError(
      "An internal error occurred while registering the user. Please try again later."
    );
  }

  return new RegisterUserResponse();
}

export const loginUser = async (loginUserDto) => {
  const { username, password } = loginUserDto;
  const userExists = await findByUsername(username);

  if (!userExists) {
    throw new NotFoundError("User not found.");
  }

  const passwordHash = userExists.passwordHash;
  const passwordMatch = await comparePassword(password, passwordHash);

  if (!passwordMatch) {
    throw new BadRequestError("Invalid credentials.");
  }

  const accessTokenPayload = {
    sub: userExists.id
  }
  const refreshTokenPayload = {
    sub: userExists.id
  }
  const accessToken = generateAccessToken(accessTokenPayload);
  const refreshToken = generateRefreshToken(refreshTokenPayload);

  const saveRefreshToken = await addRefreshToken(userExists.id, refreshToken);
  if (!saveRefreshToken) {
    throw new InternalServerError(
      "An internal error occurred while logging in the user. Please try again later."
    );
  }

  return new LoginUserResponse(accessToken, refreshToken);
}