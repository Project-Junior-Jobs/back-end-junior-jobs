import { z } from "zod";
import { createUserCompanySchema, returnUserCompanySchema } from "../schemas/usersCompanies.schema";

export type IUserCompany = z.infer<typeof createUserCompanySchema>;
export type IUserCompanyReturn = z.infer<typeof returnUserCompanySchema>;
