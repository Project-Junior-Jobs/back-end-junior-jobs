import { Router } from "express";
import { createUserDevController } from "../controllers/userDev.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValidMiddleware.middleware";
import { createUserDevSchema } from "../schemas/usersDev.schema";
import { createUserCompanySchema } from "../schemas/usersCompanies.schema";
import { createUserCompanyController } from "../controllers/userCompany.controller";
export const registerRoutes: Router = Router();

registerRoutes.post(
  "/dev",
  ensureDataIsValidMiddleware(createUserDevSchema),
  createUserDevController
);

registerRoutes.post(
  "/company",
  ensureDataIsValidMiddleware(createUserCompanySchema),
  createUserCompanyController
);
