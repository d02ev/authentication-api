import { Router } from "express";
import { login, register } from "../controller/auth.controller";
import authHandler from "../middleware/auth-handler.middleware";

const authRoutes = Router();

authRoutes.post("/register", register).post("/login", login);

export default authRoutes;