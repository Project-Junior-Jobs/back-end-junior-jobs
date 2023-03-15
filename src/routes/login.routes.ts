import { Router } from "express";
import { createLoginController } from "../controllers/login.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValidMiddleware.middleware";
import { createLoginSchema } from "../schemas/login.schema";

export const loginRoutes: Router = Router();

loginRoutes.post("", ensureDataIsValidMiddleware(createLoginSchema), createLoginController);
