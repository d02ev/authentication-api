import jwt from "jsonwebtoken";

const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;
const accessTokenExpiry = parseInt(process.env.ACCESS_TOKEN_EXPIRY);
const refreshTokenExpiry = parseInt(process.env.REFRESH_TOKEN_EXPIRY);

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, accessTokenSecretKey, {
    issuer: process.env.TOKEN_ISSUER,
    expiresIn: `${accessTokenExpiry}m`,
    algorithm: "HS256",
  });
}

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, refreshTokenSecretKey, {
    issuer: process.env.TOKEN_ISSUER,
    expiresIn: `${refreshTokenExpiry}D`,
    algorithm: "HS256"
  })
}

export const decodeAccessToken = token => {
  return jwt.verify(token, accessTokenSecretKey);
}